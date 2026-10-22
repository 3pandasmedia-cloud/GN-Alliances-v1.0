# Email sender settings

Super Admin → Website Settings → Email sender manages the sender for login OTPs,
security verification OTPs, and demo request notifications. Demo recipients and
public contact addresses are separate settings.

Apply prisma/migrations/20261022010000_add_email_settings/migration.sql and run
`npx prisma generate` before restarting the backend with this feature. Normal
migration-managed installations can use `npx prisma migrate deploy`. The SQL is
idempotent for existing installations whose database was not migration-baselined.

Existing SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS continue to work until a
custom sender is saved. Optional SMTP_FROM_EMAIL and SMTP_FROM_NAME customize the
environment sender. Saving custom SMTP settings verifies authentication first.
The test email checks provider acceptance; verify actual delivery and the From
address in the recipient inbox. SMTP authentication does not by itself prove that
an alternate sender is authorized by the provider.

Passwords use AES-256-GCM encryption, with a purpose-specific key derived from the
first configured value of EMAIL_SETTINGS_ENCRYPTION_KEY,
LAKEESHOP_ENCRYPTION_KEY, or JWT_SECRET. Back up and retain the effective secret
with the database. When introducing or rotating a higher-priority key, re-enter
the SMTP password and save settings. Never commit credentials or encryption keys.
Only Super Admin can read or change these settings. Responses omit both plaintext
and encrypted passwords; public website responses never include email settings.
