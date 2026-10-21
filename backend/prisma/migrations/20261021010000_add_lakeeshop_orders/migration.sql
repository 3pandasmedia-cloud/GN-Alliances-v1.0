CREATE TABLE "LakeeshopOrder" (
    "id" TEXT NOT NULL,
    "clientOrderId" TEXT NOT NULL,
    "providerOrderId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "productCode" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "customer" JSONB NOT NULL,
    "providerResponse" JSONB,
    "statusResponse" JSONB,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LakeeshopOrder_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "LakeeshopOrder_clientOrderId_key" ON "LakeeshopOrder"("clientOrderId");
CREATE INDEX "LakeeshopOrder_status_idx" ON "LakeeshopOrder"("status");
CREATE INDEX "LakeeshopOrder_createdAt_idx" ON "LakeeshopOrder"("createdAt");
