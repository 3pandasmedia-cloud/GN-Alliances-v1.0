import bcrypt from "bcryptjs";
import prisma from "./config/prisma";

async function main() {
  const password =
    await bcrypt.hash("PARIDHIGN@2025", 10);

  await prisma.user.create({
    data: {
      name: "3Pandas Media",
      email: "3pandasgn@3pandasmedia.com",
      password,
      role: "super-admin",
    },
  });

  console.log("Super Admin created");
}

main();