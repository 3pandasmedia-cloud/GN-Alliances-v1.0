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
    let campaignsRemoved = 0;
    let offersRemoved = 0;
    for (const target of targets) {
      const partner = await tx.partner.findUnique({ where: { email: target.email } });
      if (!partner) continue;
      if (partner.type !== target.type || !target.names.includes(partner.name.trim().toLowerCase())) {
        throw new Error(`Identity mismatch for ${target.email}. No records were removed.`);
      }
      const campaigns = await tx.campaign.findMany({ where: { OR: [{ bankId: partner.id }, { merchantId: partner.id }] }, select: { id: true } });
      const campaignIds = campaigns.map(item => item.id);
      const offers = await tx.offer.findMany({ where: { OR: [{ partnerId: partner.id }, { campaignId: { in: campaignIds } }] }, select: { id: true } });
      const offerIds = offers.map(item => item.id);
      if (await tx.redemption.count({ where: { offerId: { in: offerIds } } })) {
        throw new Error(`${target.email} has recorded redemptions requiring review. No records were removed.`);
      }
      const login = await tx.user.findUnique({ where: { email: target.email } });
      if (login && login.role !== "partner" && login.role !== "client") {
        throw new Error(`Protected login role for ${target.email}. No records were removed.`);
      }
      await tx.offer.deleteMany({ where: { id: { in: offerIds } } });
      await tx.campaignReport.deleteMany({ where: { OR: [{ campaignId: { in: campaignIds } }, { partnerId: partner.id }] } });
      await tx.campaign.deleteMany({ where: { id: { in: campaignIds } } });
      await tx.landingOffer.deleteMany({ where: { merchantId: partner.id } });
      await tx.partner.delete({ where: { id: partner.id } });
      campaignsRemoved += campaigns.length;
      offersRemoved += offers.length;
      if (login) {
        await tx.user.delete({ where: { id: login.id } });
        loginsRemoved++;
      }
      partnersRemoved++;
    }
    return { partnersRemoved, loginsRemoved, campaignsRemoved, offersRemoved };
  });
  console.log("Demo cleanup completed:", result);
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
