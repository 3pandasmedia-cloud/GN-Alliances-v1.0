import "dotenv/config";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import prisma from "./config/prisma";

async function main() {
  const email = process.env.CLIENT_ADMIN_EMAIL || "admin@gnalliances.com";
  if (await prisma.user.findUnique({ where: { email } })) {
    throw new Error("This email already exists. No account or password was changed.");
  }
  const password = randomBytes(18).toString("base64url") + "!a9";
  await prisma.user.create({ data: {
    name: "GN Client Admin", email, password: await bcrypt.hash(password, 12),
    role: "admin", status: "ACTIVE", twoFactor: false,
  } });
  console.log(JSON.stringify({ email, password, role: "admin", twoFactor: false }));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(() => prisma.$disconnect());
