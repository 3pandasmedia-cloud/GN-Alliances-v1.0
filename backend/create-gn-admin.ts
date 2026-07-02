import bcrypt from "bcryptjs";
import prisma from "./config/prisma";

async function main() {
  const password =
    await bcrypt.hash("Admin@123", 10);

  await prisma.user.create({
    data: {
      name: "GN Operations",
      email: "operations@gnalliances.com",
      password,
      role: "admin",
    },
  });

  console.log("GN Admin created");
}

main();