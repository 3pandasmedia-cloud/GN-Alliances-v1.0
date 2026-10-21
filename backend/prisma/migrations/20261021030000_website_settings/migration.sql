CREATE TABLE IF NOT EXISTS "WebsiteSettings" (
  "id" TEXT NOT NULL DEFAULT 'website', "content" JSONB NOT NULL,
  "demoRecipients" JSONB NOT NULL, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "WebsiteSettings_pkey" PRIMARY KEY ("id")
);
CREATE TABLE IF NOT EXISTS "DemoRequest" (
  "id" TEXT NOT NULL, "name" TEXT NOT NULL, "company" TEXT NOT NULL,
  "email" TEXT NOT NULL, "phone" TEXT NOT NULL, "message" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "DemoRequest_pkey" PRIMARY KEY ("id")
);
