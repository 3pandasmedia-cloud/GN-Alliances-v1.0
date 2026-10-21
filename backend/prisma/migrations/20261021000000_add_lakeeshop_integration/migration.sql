CREATE TABLE "LakeeshopApiConfig" (
    "id" TEXT NOT NULL,
    "integrationName" TEXT NOT NULL DEFAULT 'Lakeeshop',
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "environment" TEXT NOT NULL DEFAULT 'sandbox',
    "baseUrl" TEXT NOT NULL DEFAULT 'https://lsorder.lakeetech.com',
    "authEndpoint" TEXT NOT NULL DEFAULT 'https://lvalidate.lakeetech.com/token',
    "merchantId" TEXT,
    "secretEncrypted" TEXT,
    "requestTimeoutMs" INTEGER NOT NULL DEFAULT 15000,
    "endpoints" JSONB NOT NULL,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "LakeeshopApiConfig_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LakeeshopApiTestLog" (
    "id" TEXT NOT NULL,
    "apiName" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "httpStatus" INTEGER,
    "responseTimeMs" INTEGER,
    "message" TEXT NOT NULL,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LakeeshopApiTestLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "LakeeshopApiTestLog_createdAt_idx" ON "LakeeshopApiTestLog"("createdAt");
CREATE INDEX "LakeeshopApiTestLog_apiName_status_idx" ON "LakeeshopApiTestLog"("apiName", "status");
