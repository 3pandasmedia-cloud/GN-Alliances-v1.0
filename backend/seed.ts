import bcrypt from "bcryptjs";
import prisma from "./config/prisma";

async function main() {
  const existing = await prisma.user.findUnique({
    where: {
      email: "3pandasgn@3pandasmedia.com",
    },
  });

  if (existing) {
    console.log("Super Admin already exists");
    return;
  }

  const password = await bcrypt.hash(
    "PARIDHIGN@2025",
    10
  );

  await prisma.user.create({
    data: {
      name: "3Pandas Media",
      email: "3pandasgn@3pandasmedia.com",
      password,
      role: "super-admin",
      status: "ACTIVE",
    },
  });

  console.log("✅ Super Admin created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });