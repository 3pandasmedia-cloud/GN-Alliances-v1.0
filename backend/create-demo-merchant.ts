import bcrypt from "bcryptjs";
import prisma from "./config/prisma";

async function main() {
  const password = await bcrypt.hash("MerchantDemo2026!", 10);

  await prisma.user.upsert({
    where: { email: "merchant.demo@gnalliances.local" },
    update: {
      name: "Demo Merchant",
      password,
      role: "partner",
      status: "ACTIVE",
      twoFactor: false,
      twoFactorEmail: null,
    },
    create: {
      name: "Demo Merchant",
      email: "merchant.demo@gnalliances.local",
      password,
      role: "partner",
      status: "ACTIVE",
      twoFactor: false,
    },
  });

  console.log("Local demo merchant is ready.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
