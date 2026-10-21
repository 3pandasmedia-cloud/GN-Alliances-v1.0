import { Request, Response } from "express";
import nodemailer from "nodemailer";
import prisma from "../config/prisma";
export const websiteDefaults = require("../config/websiteDefaults.json");
const emailPattern = /^[^\s@,;<>\r\n]+@[^\s@,;<>\r\n]+\.[^\s@,;<>\r\n]+$/;
export const safeWebsiteUrl = (value: string) => value === "" || /^\/(?!\/)[^\\\s]*$/.test(value) || (() => { try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password; } catch { return false; } })();
export function validContent(value: any, template: any = websiteDefaults, key = ""): boolean {
  if (typeof template === "string") return typeof value === "string" && value.length <= 4000 && (!/^(href|icon|creditUrl|image|logo|creditLogo)$/.test(key) || safeWebsiteUrl(value));
  if (typeof template === "boolean") return typeof value === "boolean";
  if (Array.isArray(template)) return Array.isArray(value) && value.length <= 30 && value.every(item => validContent(item, template[0]));
  return value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === Object.keys(template).length && Object.keys(template).every(k => validContent(value[k], template[k], k));
}
// Fill newly introduced fields without restoring deliberately cleared text or lists.
export const mergeWebsiteDefaults = (value: any, template: any = websiteDefaults): any => {
  if (value === undefined || value === null) return template;
  if (Array.isArray(template)) return Array.isArray(value) ? value.map(item => mergeWebsiteDefaults(item, template[0])) : template;
  if (typeof template === "object") return Object.fromEntries(Object.keys(template).map(key => [key, mergeWebsiteDefaults(value[key], template[key])]));
  return typeof value === typeof template ? value : template;
};
const settings = async () => {
  const row = await prisma.websiteSettings.upsert({ where: { id: "website" }, update: {}, create: { id: "website", content: websiteDefaults, demoRecipients: [] } });
  return { ...row, content: mergeWebsiteDefaults(row.content) };
};
const smtpReady = () => !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_PORT);
export const getPublicWebsite = async (_: Request, res: Response) => {
  try { res.setHeader("Cache-Control", "no-store"); res.json({ content: (await settings()).content }); }
  catch { res.status(503).json({ message: "Website settings unavailable." }); }
};
export const getWebsiteSettings = async (_: Request, res: Response) => {
  try { res.setHeader("Cache-Control", "no-store"); res.json({ ...await settings(), smtpReady: smtpReady() }); }
  catch { res.status(500).json({ message: "Unable to load website settings." }); }
};
export const saveWebsiteSettings = async (req: Request, res: Response) => {
  const { content, demoRecipients } = req.body || {};
  if (!validContent(content) || !Array.isArray(demoRecipients) || demoRecipients.length > 10 || !demoRecipients.every(item => typeof item === "string" && item.length <= 254 && emailPattern.test(item)) || (content?.contact?.email && !emailPattern.test(content.contact.email)) || (content?.whatsapp?.number && !/^[1-9][0-9]{6,14}$/.test(content.whatsapp.number))) return res.status(400).json({ message: "Check the content, email addresses, links and WhatsApp number (country code followed by digits)." });
  try { const data = { content, demoRecipients: [...new Set(demoRecipients)] }; res.json(await prisma.websiteSettings.upsert({ where: { id: "website" }, update: data, create: { id: "website", ...data } })); }
  catch { res.status(500).json({ message: "Unable to save website settings." }); }
};
export const listDemoRequests = async (_: Request, res: Response) => {
  try { res.json(await prisma.demoRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100 })); }
  catch { res.status(500).json({ message: "Unable to load demo requests." }); }
};
export const deleteDemoRequest = async (req: Request, res: Response) => {
  try { await prisma.demoRequest.delete({ where: { id: String(req.params.id) } }); res.json({ ok: true }); }
  catch { res.status(404).json({ message: "Demo request not found." }); }
};
const limits = new Map<string, { count: number; until: number }>();
export const submitDemoRequest = async (req: Request, res: Response) => {
  const body = req.body || {};
  if (body.website) return res.status(400).json({ message: "Unable to submit this request." });
  if (!["name", "company", "email", "phone"].every(key => typeof body[key] === "string" && body[key].trim() && body[key].length <= 254) || !emailPattern.test(body.email) || !/^\+?[0-9 ()-]{7,25}$/.test(body.phone) || (body.message !== undefined && (typeof body.message !== "string" || body.message.length > 4000))) return res.status(400).json({ message: "Please enter valid contact details and a message under 4,000 characters." });
  const now = Date.now();
  for (const [key, limit] of limits) if (limit.until <= now) limits.delete(key);
  const keys = [`ip:${req.ip}`, `email:${body.email.toLowerCase()}`];
  if (keys.some((key, index) => (limits.get(key)?.count || 0) >= (index ? 3 : 60))) return res.status(429).json({ message: "Too many requests. Please try again in a few minutes." });
  keys.forEach(key => limits.set(key, { count: (limits.get(key)?.count || 0) + 1, until: limits.get(key)?.until || now + 5 * 60 * 1000 }));
  let id: string | undefined;
  try {
    const saved = await settings(); const recipients = saved.demoRecipients as string[];
    if (!smtpReady() || !recipients.length) return res.status(503).json({ message: "Demo requests are temporarily unavailable. Please contact us by phone or email." });
    const lead = await prisma.demoRequest.create({ data: { name: body.name.trim(), company: body.company.trim(), email: body.email.trim().toLowerCase(), phone: body.phone.trim(), message: (body.message || "").trim() } }); id = lead.id;
    const port = Number(process.env.SMTP_PORT);
    const transport = nodemailer.createTransport({ host: process.env.SMTP_HOST, port, secure: port === 465, requireTLS: port !== 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }, connectionTimeout: 10000, socketTimeout: 15000 });
    const result = await transport.sendMail({ from: process.env.SMTP_USER, to: recipients, replyTo: lead.email, subject: "GN Alliances — New demo request", text: `Name: ${lead.name}\nCompany: ${lead.company}\nEmail: ${lead.email}\nPhone: ${lead.phone}\n\n${lead.message}` });
    if (!result.accepted?.length) throw new Error("Delivery failed");
    await prisma.demoRequest.update({ where: { id }, data: { status: result.rejected?.length ? "PARTIAL" : "SENT" } }).catch(() => {});
    res.json({ success: true });
  } catch {
    if (id) await prisma.demoRequest.update({ where: { id }, data: { status: "FAILED" } }).catch(() => {});
    res.status(503).json({ message: "Unable to email your request right now. Please contact us by phone or email." });
  }
};
