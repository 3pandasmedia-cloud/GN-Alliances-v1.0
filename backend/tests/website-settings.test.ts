import "dotenv/config";
import assert from "node:assert/strict";
import { test } from "node:test";
import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import prisma from "../config/prisma";
import websiteRoutes from "../routes/websiteRoutes";
import { websiteDefaults, validContent, safeWebsiteUrl, mergeWebsiteDefaults } from "../controllers/websiteController";

test("website content is owner-only, recipients stay private and demo mail reports actual delivery", async () => {
  const originals = { user: prisma.user.findUnique, settings: prisma.websiteSettings.upsert, create: prisma.demoRequest.create, update: prisma.demoRequest.update, mail: nodemailer.createTransport };
  const env = { SMTP_HOST: process.env.SMTP_HOST, SMTP_PORT: process.env.SMTP_PORT, SMTP_USER: process.env.SMTP_USER, SMTP_PASS: process.env.SMTP_PASS };
  Object.assign(process.env, { SMTP_HOST: "smtp.example.com", SMTP_PORT: "587", SMTP_USER: "sender@example.com", SMTP_PASS: "test-only" });
  let saved: any = { content: structuredClone(websiteDefaults), demoRecipients: ["private@example.com"] };
  let deliveryFails = false; let sent: any; let status = ""; let nextId = 0;
  (prisma.user as any).findUnique = async ({ where }: any) => ({ id: where.id, role: where.id === "owner" ? "super-admin" : "admin", status: "ACTIVE" });
  (prisma.websiteSettings as any).upsert = async ({ update }: any) => { if (update.content) saved = update; return saved; };
  (prisma.demoRequest as any).create = async ({ data }: any) => ({ id: String(++nextId), ...data });
  (prisma.demoRequest as any).update = async ({ data }: any) => { status = data.status; return data; };
  (nodemailer as any).createTransport = () => ({ sendMail: async (message: any) => { sent = message; if (deliveryFails) throw new Error("test failure"); return { accepted: saved.demoRecipients, rejected: [] }; } });
  const app = express(); app.use(express.json()); app.use("/website", websiteRoutes);
  const server = app.listen(0, "127.0.0.1"); await new Promise<void>(resolve => server.once("listening", resolve));
  const address = server.address() as import("node:net").AddressInfo;
  const request = (path: string, method = "GET", body?: any, role = "") => fetch(`http://127.0.0.1:${address.port}/website${path}`, { method, headers: { "Content-Type": "application/json", ...(role ? { Authorization: `Bearer ${jwt.sign({ id: role }, process.env.JWT_SECRET!)}` } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
  try {
    assert.equal(validContent(websiteDefaults), true);
    const merged = mergeWebsiteDefaults({ contact: { email: "" }, footer: { columns: [] } });
    assert.equal(merged.contact.email, ""); assert.deepEqual(merged.footer.columns, []); assert.equal(merged.hero.title, websiteDefaults.hero.title);
    for (const url of ["javascript:alert(1)", "//evil.example.com", "data:text/html,bad", "/\\evil.example.com"]) assert.equal(safeWebsiteUrl(url), false);
    const publicData = await (await request("/public")).json();
    assert.equal(publicData.demoRecipients, undefined); assert.equal(publicData.smtpReady, undefined);
    assert.equal(JSON.stringify(publicData).includes("private@example.com"), false);
    assert.equal((await request("/")).status, 401);
    assert.equal((await request("/", "GET", undefined, "admin")).status, 403);
    assert.equal((await request("/requests", "GET", undefined, "admin")).status, 403);
    assert.equal((await request("/", "PUT", saved, "admin")).status, 403);
    const content = structuredClone(websiteDefaults); content.contact.email = ""; content.footer.columns = []; content.sections.metrics = false; content.whatsapp.number = "919876543210";
    assert.equal((await request("/", "PUT", { content, demoRecipients: ["private@example.com"] }, "owner")).status, 200);
    assert.equal(saved.content.contact.email, ""); assert.deepEqual(saved.content.footer.columns, []);
    assert.equal((await request("/", "PUT", { ...saved, demoRecipients: ["bad\nBcc:evil@example.com"] }, "owner")).status, 400);
    content.whatsapp.number = "https://evil.example.com";
    assert.equal((await request("/", "PUT", { ...saved, content }, "owner")).status, 400);
    for (const formatted of ["+91 8123455657", "91 (81234) 55657", "  +91-8123455657  "]) {
      content.whatsapp.number = formatted;
      assert.equal((await request("/", "PUT", { ...saved, content }, "owner")).status, 200);
      assert.equal(saved.content.whatsapp.number, "918123455657");
    }
    for (const invalid of ["abc918123455657", "++918123455657", "000123", "https://example.com/918123455657"]) {
      content.whatsapp.number = invalid;
      const result = await request("/", "PUT", { ...saved, content }, "owner");
      assert.equal(result.status, 400);
      assert.match((await result.json()).message, /WhatsApp/);
    }
    content.whatsapp.number = "";
    assert.equal((await request("/", "PUT", { ...saved, content }, "owner")).status, 200);
    assert.equal(saved.content.whatsapp.number, "");
    const lead = { name: "Test Visitor", company: "Example", email: "visitor@example.com", phone: "9876543210", message: "Please arrange a demo." };
    assert.equal((await request("/demo-request", "POST", { ...lead, email: "bad" })).status, 400);
    assert.equal((await request("/demo-request", "POST", lead)).status, 200);
    assert.deepEqual(sent.to, ["private@example.com"]); assert.equal(sent.replyTo, lead.email); assert.equal(sent.from, "sender@example.com"); assert.match(sent.text, /Test Visitor/); assert.equal(status, "SENT");
    deliveryFails = true;
    assert.equal((await request("/demo-request", "POST", { ...lead, email: "another@example.com" })).status, 503); assert.equal(status, "FAILED");
    saved.demoRecipients = [];
    assert.equal((await request("/demo-request", "POST", { ...lead, email: "third@example.com" })).status, 503);
  } finally {
    prisma.user.findUnique = originals.user; prisma.websiteSettings.upsert = originals.settings; prisma.demoRequest.create = originals.create; prisma.demoRequest.update = originals.update; nodemailer.createTransport = originals.mail;
    for (const [key, value] of Object.entries(env)) if (value === undefined) delete process.env[key]; else process.env[key] = value;
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
});
