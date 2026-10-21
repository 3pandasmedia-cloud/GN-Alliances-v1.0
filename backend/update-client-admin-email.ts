import "dotenv/config";
import prisma from "./config/prisma";
async function main() {
  const result = await prisma.$transaction(async tx => {
    const source = await tx.user.findUnique({ where: { email: "clientadmin@gnalliances.com" } });
    if (!source || source.role !== "admin") throw new Error("Expected client Admin account was not found. No changes made.");
    if (await tx.user.findUnique({ where: { email: "admin@gnalliances.com" } })) throw new Error("Requested email is already in use. No changes made.");
    const updated = await tx.user.update({ where: { id: source.id }, data: { email: "admin@gnalliances.com" }, select: { id: true, email: true, role: true, twoFactor: true } });
    return updated;
  });
  console.log(JSON.stringify(result));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(() => prisma.$disconnect());
