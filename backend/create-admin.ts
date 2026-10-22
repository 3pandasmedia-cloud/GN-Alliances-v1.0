import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "./config/prisma";

// EDIT GUIDE: Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD privately before running.
// This is a manual bootstrap command, never a server startup step.
async function main() {
  const name = process.env.ADMIN_NAME?.trim();
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || password.length < 12) {
    throw new Error("Set ADMIN_NAME, a valid ADMIN_EMAIL, and ADMIN_PASSWORD (at least 12 characters). No account was changed.");
  }
  if (await prisma.user.findUnique({ where: { email } })) throw new Error("This email already exists. No account or password was changed.");
  await prisma.user.create({ data: { name, email, password: await bcrypt.hash(password, 12), role: "super-admin", status: "ACTIVE" } });
  console.log("Super Admin created. Credentials were not printed.");
}
main().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(() => prisma.$disconnect());
