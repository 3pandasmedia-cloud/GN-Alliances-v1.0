import "dotenv/config";
import prisma from "./config/prisma";

// Match only the demo identities explicitly identified for removal.
const targets = [
  { email: "icici@test.com", type: "BANK", names: ["icici", "icici bank"] },
  { email: "hdfc@test.com", type: "BANK", names: ["hdfc", "hdfc bank"] },
  { email: "ccd@test.com", type: "MERCHANT", names: ["cafe coffee day"] },
];

async function main() {
  const result = await prisma.$transaction(async tx => {
    let partnersRemoved = 0;
    let loginsRemoved = 0;
    for (const target of targets) {
      const partner = await tx.partner.findUnique({ where: { email: target.email } });
      if (!partner) continue;
      if (partner.type !== target.type || !target.names.includes(partner.name.trim().toLowerCase())) {
        throw new Error(`Identity mismatch for ${target.email}. No records were removed.`);
      }
      const campaigns = await tx.campaign.count({ where: { OR: [{ bankId: partner.id }, { merchantId: partner.id }] } });
      const offers = await tx.offer.count({ where: { partnerId: partner.id } });
      if (campaigns || offers) {
        throw new Error(`${target.email} has ${campaigns} campaigns and ${offers} offers. No records were removed.`);
      }
      const login = await tx.user.findUnique({ where: { email: target.email } });
      if (login && login.role !== "partner" && login.role !== "client") {
        throw new Error(`Protected login role for ${target.email}. No records were removed.`);
      }
      await tx.partner.delete({ where: { id: partner.id } });
      if (login) {
        await tx.user.delete({ where: { id: login.id } });
        loginsRemoved++;
      }
      partnersRemoved++;
    }
    return { partnersRemoved, loginsRemoved };
  });
  console.log("Demo cleanup completed:", result);
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
