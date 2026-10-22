// EDIT GUIDE: All OTP/demo sending uses this service. Mailbox values belong in Website Settings, not code.
import crypto from "crypto";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import prisma from "../config/prisma";

export class EmailSettingsValidationError extends Error {}

export const emailPattern = /^[^\s@,;<>\r\n]+@[^\s@,;<>\r\n]+\.[^\s@,;<>\r\n]+$/;
const encryptionKey = () => {
  const raw = process.env.EMAIL_SETTINGS_ENCRYPTION_KEY || process.env.LAKEESHOP_ENCRYPTION_KEY || process.env.JWT_SECRET;
  if (!raw) throw new EmailSettingsValidationError("Email credential encryption is unavailable.");
  return crypto.createHash("sha256").update("gn-email-settings:v1:").update(raw).digest();
};
export const encryptEmailPassword = (password: string) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const data = Buffer.concat([cipher.update(password, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), data].map(value => value.toString("base64")).join(".");
};
const decryptPassword = (encrypted: string) => {
  const [iv, tag, data] = encrypted.split(".").map(value => Buffer.from(value, "base64"));
  const decipher = crypto.createDecipheriv("aes-256-gcm", encryptionKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
};
export type EmailConfig = { host: string; port: number; username: string; password: string; fromEmail: string; fromName: string };
const serverConfig = (): EmailConfig => ({ host: process.env.SMTP_HOST || "", port: Number(process.env.SMTP_PORT || 587), username: process.env.SMTP_USER || "", password: process.env.SMTP_PASS || "", fromEmail: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "", fromName: process.env.SMTP_FROM_NAME || "GN Alliances" });
export const getEmailSettings = async () => {
  const saved = await prisma.emailSettings.findUnique({ where: { id: "email" } });
  const server = serverConfig();
  // Explicit allowlist: never return either the plaintext or encrypted password.
  return { useCustom: saved?.useCustom || false, host: saved?.host || "", port: saved?.port || 587, username: saved?.username || "", fromEmail: saved?.fromEmail || "", fromName: saved?.fromName || "GN Alliances", passwordConfigured: !!saved?.passwordEncrypted, serverConfigured: !!(server.host && server.username && server.password && server.fromEmail), activeFromEmail: saved?.useCustom ? saved.fromEmail : server.fromEmail };
};
export const resolveEmailConfig = async (): Promise<EmailConfig> => {
  const saved = await prisma.emailSettings.findUnique({ where: { id: "email" } });
  return saved?.useCustom ? { host: saved.host, port: saved.port, username: saved.username, password: saved.passwordEncrypted ? decryptPassword(saved.passwordEncrypted) : "", fromEmail: saved.fromEmail, fromName: saved.fromName } : serverConfig();
};
export const emailReady = async () => {
  const config = await resolveEmailConfig();
  return !!(config.host && config.username && config.password && config.fromEmail);
};
export const emailTransport = (config: EmailConfig) => nodemailer.createTransport({ host: config.host, port: config.port, secure: config.port === 465, requireTLS: config.port !== 465, auth: { user: config.username, pass: config.password }, connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000 });
export const sendEmail = async (mail: Omit<Mail.Options, "from">) => {
  const config = await resolveEmailConfig();
  if (!config.host || !config.username || !config.password || !config.fromEmail) throw new EmailSettingsValidationError("Email sending is not configured.");
  return emailTransport(config).sendMail({ ...mail, from: config.fromName ? { name: config.fromName, address: config.fromEmail } : config.fromEmail });
};
export async function saveEmailConfig(body: Record<string, unknown>) {
  if (typeof body.useCustom !== "boolean") throw new EmailSettingsValidationError("Choose the email configuration to use.");
  const current = await prisma.emailSettings.findUnique({ where: { id: "email" } });
  if (!body.useCustom) {
    const fallback = serverConfig();
    if (!fallback.host || !fallback.username || !fallback.password || !fallback.fromEmail) throw new EmailSettingsValidationError("Server email is not configured. Keep a configured sender enabled.");
    await prisma.emailSettings.upsert({ where: { id: "email" }, update: { useCustom: false }, create: { id: "email", useCustom: false } });
    return getEmailSettings();
  }
  const text = (key: string) => typeof body[key] === "string" ? (body[key] as string).trim() : "";
  const host = text("host"), username = text("username"), fromEmail = text("fromEmail"), fromName = text("fromName");
  const port = Number(body.port);
  const password = typeof body.password === "string" ? body.password : "";
  if (!/^(?=.{1,253}$)[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?$/.test(host) || ![465,587,2525].includes(port) || !username || username.length > 254 || /[\r\n]/.test(username) || !emailPattern.test(fromEmail) || fromEmail.length > 254 || fromName.length > 100 || /[\r\n]/.test(fromName) || password.length > 4000) throw new EmailSettingsValidationError("Enter a valid SMTP host, port (465, 587 or 2525), username and sender email.");
  if (!password && current && (current.host !== host || current.port !== port || current.username !== username)) throw new EmailSettingsValidationError("Enter the password when changing the SMTP server or mailbox.");
  const passwordEncrypted = password ? encryptEmailPassword(password) : current?.passwordEncrypted;
  if (!passwordEncrypted) throw new EmailSettingsValidationError("Enter the mailbox SMTP password or app password.");
  try { await emailTransport({ host, port, username, fromEmail, fromName, password: password || decryptPassword(passwordEncrypted) }).verify(); }
  catch { throw new EmailSettingsValidationError("SMTP verification failed. Check the host, port, username and app password. Your previous sender is still active."); }
  const data = { useCustom: true, host, port, username, fromEmail, fromName, passwordEncrypted };
  await prisma.emailSettings.upsert({ where: { id: "email" }, update: data, create: { id: "email", ...data } });
  return getEmailSettings();
}
