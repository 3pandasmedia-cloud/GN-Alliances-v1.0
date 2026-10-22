import "dotenv/config";
import assert from "node:assert/strict";
import { test } from "node:test";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import prisma from "../config/prisma";
import { websiteDefaults } from "../controllers/websiteController";
import websiteRoutes from "../routes/websiteRoutes";
import { sendOTPEmail } from "../utils/sendMail";
import { login, resendLoginOTP } from "../controllers/authController";

test("only the owner can change the encrypted sender; all OTP and demo mail share the current configuration", async () => {
  const original = { find: prisma.emailSettings.findUnique, upsert: prisma.emailSettings.upsert, website: prisma.websiteSettings.upsert, lead: prisma.demoRequest.create, updateLead: prisma.demoRequest.update, user: prisma.user.findUnique, mail: nodemailer.createTransport };
  const env = { SMTP_HOST: process.env.SMTP_HOST, SMTP_PORT: process.env.SMTP_PORT, SMTP_USER: process.env.SMTP_USER, SMTP_PASS: process.env.SMTP_PASS, EMAIL_SETTINGS_ENCRYPTION_KEY: process.env.EMAIL_SETTINGS_ENCRYPTION_KEY };
  Object.assign(process.env, { SMTP_HOST: "smtp.old.example", SMTP_PORT: "587", SMTP_USER: "old@example.com", SMTP_PASS: "old-test-pass", EMAIL_SETTINGS_ENCRYPTION_KEY: "test-only-encryption-key" });
  let saved: any = null, transport: any, sent: any;
  let verifyFails = false;
  const passwordHash = await bcrypt.hash("login-test-password", 4);
  (prisma.emailSettings as any).findUnique = async () => saved;
  (prisma.emailSettings as any).upsert = async ({ update, create }: any) => saved = saved ? { ...saved, ...update } : create;
  (prisma.user as any).findUnique = async ({ where }: any) => where.email ? { id: "login-user", status: "ACTIVE", password: passwordHash, twoFactor: true, twoFactorEmail: "otp@example.com" } : { id: where.id, role: where.id === "owner" ? "super-admin" : "admin", status: "ACTIVE" };
  (prisma.websiteSettings as any).upsert = async () => ({ content: websiteDefaults, demoRecipients: ["recipient@example.com"] });
  (prisma.demoRequest as any).create = async ({ data }: any) => ({ id: "demo", ...data });
  (prisma.demoRequest as any).update = async () => ({});
  (nodemailer as any).createTransport = (options: any) => { transport = options; return { verify: async () => { if (verifyFails) throw new Error("provider error with sensitive data"); return true; }, sendMail: async (options: any) => { sent = options; return { accepted: [options.to], rejected: [] }; } }; };
  const app = express(); app.use(express.json()); app.use("/website", websiteRoutes); app.post("/login", login); app.post("/resend", resendLoginOTP);
  const server = app.listen(0, "127.0.0.1"); await new Promise<void>(resolve => server.once("listening", resolve));
  const address = server.address() as import("node:net").AddressInfo;
  const request = (path: string, method = "GET", body?: any, role = "owner") => fetch(`http://127.0.0.1:${address.port}${path}`, { method, headers: { "Content-Type": "application/json", ...(role ? { Authorization: `Bearer ${jwt.sign({ id: role }, process.env.JWT_SECRET!)}` } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
  const config = { useCustom: true, host: "smtp.gn.example", port: 465, username: "gn@example.com", password: "new-test-password", fromEmail: "gn@example.com", fromName: "GN Alliances" };
  try {
    for (const [path, method, body] of [["/website/email", "GET", undefined], ["/website/email", "PUT", config], ["/website/email/test", "POST", { to: "test@example.com" }]] as const) {
      assert.equal((await request(path, method, body, "")).status, 401);
      assert.equal((await request(path, method, body, "admin")).status, 403);
    }
    assert.equal((await request("/website/email")).status, 200);
    const response = await request("/website/email", "PUT", config);
    assert.equal(response.status, 200);
    const publicSettings = await response.json();
    assert.equal(publicSettings.passwordConfigured, true);
    assert.equal(publicSettings.password, undefined); assert.equal(publicSettings.passwordEncrypted, undefined);
    assert.notEqual(saved.passwordEncrypted, config.password);
    assert.equal(transport.secure, true);
    await sendOTPEmail("otp@example.com", "123456");
    assert.equal(sent.from.address, "gn@example.com"); assert.equal(transport.auth.pass, config.password);
    assert.equal((await request("/login", "POST", { email: "user@example.com", password: "login-test-password" }, "")).status, 200);
    assert.equal(sent.from.address, "gn@example.com");
    assert.equal((await request("/resend", "POST", { email: "otp@example.com" }, "")).status, 200);
    assert.equal(sent.from.address, "gn@example.com");
    await request("/website/email", "PUT", { ...config, password: "", fromName: "GN Support" });
    await sendOTPEmail("otp@example.com", "123456"); assert.equal(sent.from.name, "GN Support");
    assert.equal((await request("/website/email", "PUT", { ...config, username: "different@example.com", password: "" })).status, 400);
    verifyFails = true;
    const failure = await request("/website/email", "PUT", { ...config, fromEmail: "changed@example.com" });
    assert.equal(failure.status, 400); assert.doesNotMatch(JSON.stringify(await failure.json()), /sensitive data/);
    assert.equal(saved.fromEmail, "gn@example.com"); verifyFails = false;
    const publicWebsite = JSON.stringify(await (await request("/website/public", "GET", undefined, "")).json());
    assert.doesNotMatch(publicWebsite, /smtp.gn.example|passwordEncrypted|new-test-password/);
    assert.equal((await request("/website/email/test", "POST", { to: "test@example.com" })).status, 200);
    assert.equal(sent.to, "test@example.com"); assert.equal(sent.from.address, "gn@example.com");
    assert.equal((await request("/website/email/test", "POST", { to: "test@example.com" })).status, 429);
    const previousEnv = { SMTP_HOST: process.env.SMTP_HOST, SMTP_PORT: process.env.SMTP_PORT, SMTP_USER: process.env.SMTP_USER, SMTP_PASS: process.env.SMTP_PASS };
    Object.assign(process.env, { SMTP_HOST: "", SMTP_USER: "", SMTP_PASS: "" });
    assert.equal((await request("/website/demo-request", "POST", { name: "Visitor", company: "Example", email: "visitor@example.com", phone: "9876543210", message: "Test" }, "")).status, 200);
    assert.equal(sent.from.address, "gn@example.com"); assert.deepEqual(sent.to, ["recipient@example.com"]); assert.equal(sent.replyTo, "visitor@example.com");
    assert.equal((await request("/website/email", "PUT", { useCustom: false })).status, 400);
    Object.assign(process.env, previousEnv);
    assert.equal((await request("/website/email", "PUT", { useCustom: false })).status, 200);
    await sendOTPEmail("otp@example.com", "123456"); assert.equal(sent.from.address, "old@example.com");
  } finally {
    prisma.emailSettings.findUnique = original.find; prisma.emailSettings.upsert = original.upsert; prisma.websiteSettings.upsert = original.website; prisma.demoRequest.create = original.lead; prisma.demoRequest.update = original.updateLead; prisma.user.findUnique = original.user; nodemailer.createTransport = original.mail;
    for (const [key,value] of Object.entries(env)) if (value === undefined) delete process.env[key]; else process.env[key] = value;
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
});
