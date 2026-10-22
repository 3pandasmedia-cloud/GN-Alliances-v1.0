CREATE TABLE IF NOT EXISTS "EmailSettings" (
  "id" TEXT NOT NULL DEFAULT 'email',
  "useCustom" BOOLEAN NOT NULL DEFAULT false,
  "host" TEXT NOT NULL DEFAULT '',
  "port" INTEGER NOT NULL DEFAULT 587,
  "username" TEXT NOT NULL DEFAULT '',
  "passwordEncrypted" TEXT,
  "fromEmail" TEXT NOT NULL DEFAULT '',
  "fromName" TEXT NOT NULL DEFAULT 'GN Alliances',
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "EmailSettings_pkey" PRIMARY KEY ("id")
);
