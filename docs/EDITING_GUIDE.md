# Editing GN Alliances in VS Code

All application source is editable TypeScript/TSX, CSS and JSON. No generated bundle
needs to be edited. Open `GN-Alliances.code-workspace`; it hides dependency/build
folders and provides named tasks under **Terminal → Run Task**.

## Which file changes what

Paths below are relative to the repository root. Ctrl+P in VS Code opens a path.

| Change | File or folder | Effect |
| --- | --- | --- |
| Saved homepage text, contact, WhatsApp, footer, demo recipients, sender | Super Admin → Website Settings | Changes database content without a code deployment |
| Order/visibility of homepage sections | `frontend/app/page.tsx` | Composes the public homepage |
| Header, frosted scroll effect, mobile navigation | `frontend/components/navigation/Header/Header.tsx` | Public-site navigation and demo button |
| Hero title layout, typography and feature icons | `frontend/sections/Hero/HeroContent.tsx` | Hero presentation; text comes from saved website settings |
| Hero background and desktop artwork | `frontend/sections/Hero/Hero.tsx`, `HeroVisual.tsx` | Hero layout and assets |
| Homepage sections | `frontend/sections/` | How it works, benefits, platform, metrics, offers and CTA |
| About/founder presentation | `frontend/sections/AboutHero/Founders.tsx` | Founder photos, names and biographies |
| Footer layout | `frontend/components/navigation/Footer/Footer.tsx` | Footer presentation; content comes from settings |
| Floating chat and WhatsApp URL validation | `frontend/components/WhatsAppChat.tsx`, `frontend/lib/whatsapp.ts` | Chat location, visibility and destination |
| Demo request popup | `frontend/components/modals/RequestDemoModal.tsx` | Form fields, validation and dialog interaction |
| Shared popup appearance | `frontend/components/ui/modal-theme.css`, `Popup.module.css` | Dialog sizing, spacing, typography and backdrop |
| Global theme, pointer cursor and responsive basics | `frontend/app/globals.css` | Shared site/platform styles |
| Public page gutters/max width | `frontend/components/common/Container/Container.tsx` | Shared public-site container |
| Platform shell, mobile drawer, scrolling | `frontend/app/platform/layout.tsx` | Authenticated layout across roles |
| Dashboard title, avatar and sign out | `frontend/app/platform/Topbar.tsx` | Platform header |
| Sidebar menu items and destinations | `frontend/app/platform/*Sidebar.tsx` | Role-specific navigation; backend permissions must agree |
| Admin accounts and module permissions | `frontend/app/platform/super-admin/admins/`, `frontend/lib/adminAccess.ts`, `backend/middleware/adminModuleAccess.ts` | Account management and access enforcement |
| Merchants list | `frontend/app/platform/super-admin/merchants/page.tsx`, `frontend/app/platform/partner/components/PartnerTable.tsx` | List, cached loading, logo and status |
| Merchant overview data | `backend/controllers/merchantOverviewController.ts`, `backend/services/merchantConnectionService.ts` | Merchant API status and overview response |
| Lakeeshop catalogue and shared navigation | `frontend/app/platform/super-admin/lakeeshop/LakeeshopClient.tsx` | Product listing and Lakeeshop pages |
| Order list, date filters, Excel export and order details | `frontend/app/platform/super-admin/lakeeshop/OrderHistory.tsx` | Orders UI and export columns |
| Product details and checkout | `frontend/app/platform/super-admin/lakeeshop/ProductDetail.tsx`, `Checkout.tsx` | Product and delivery form presentation |
| Integration settings and merchant logo upload | `frontend/app/platform/super-admin/lakeeshop/SettingsPanel.tsx` | Lakeeshop settings UI |
| Lakeeshop API paths, authentication, orders | `backend/services/lakeeshopEndpoints.ts`, `lakeeshopService.ts`, `backend/controllers/lakeeshopController.ts` | Provider requests and stored order behavior |
| Website Settings editor | `frontend/app/platform/super-admin/website-settings/page.tsx` | Tabs and public-content editor |
| Email sender form | `frontend/app/platform/super-admin/website-settings/EmailSenderSettings.tsx` | SMTP configuration and test email UI |
| Sending account, SMTP encryption, verification and delivery | `backend/services/emailService.ts`, `backend/controllers/emailSettingsController.ts` | Shared OTP and demo sender; see backend email documentation |
| Login and OTP authentication | `backend/controllers/authController.ts` | Login challenge and session creation |
| Security verification OTP | `backend/controllers/twoFactorController.ts`, `backend/utils/sendMail.ts` | Two-factor setup and email message template |
| Demo recipients, public content validation and enquiries | `backend/controllers/websiteController.ts` | Saved website content and demo request delivery |
| API endpoint registration | `backend/app.ts`, `backend/routes/` | Exposed backend routes and permission middleware |
| Backend startup and port | `backend/server.ts` | API listener |
| Database tables and fields | `backend/prisma/schema.prisma`, `backend/prisma/migrations/` | Requires a migration and regenerated Prisma client |
| Frontend proxy and remote image hosts | `frontend/next.config.ts` | API forwarding and allowed image origins |
| Browser API base | `frontend/lib/config.ts`, `frontend/.env.local` | Browser requests; NEXT_PUBLIC values are public |
| Private database, token and mail configuration | `backend/.env` | Server secrets; never commit this file |
| Logos, founder photos and illustrations | `frontend/public/` | `/logos/...` and `/images/...` URLs map here |

## Website defaults versus saved content

`frontend/lib/websiteDefaults.json` provides initial browser content.
`backend/config/websiteDefaults.json` provides database defaults and validation shape.
Keep their structure in sync when introducing a content field. The provider in
`frontend/components/WebsiteContent.tsx` loads saved database content over defaults.
Changing either JSON file does not overwrite existing saved content. Use Website
Settings for ordinary business text/contact changes. Founder presentation is currently
edited in its TSX component; it is not part of the Website Settings editor.

## Start a new development checkout

1. Install Node.js/npm, then run `npm ci --prefix frontend` and `npm ci --prefix backend`.
2. Copy `backend/.env.example` to `backend/.env`; configure the development database and secrets.
3. Copy `frontend/.env.example` to `frontend/.env.local` if needed. Existing local files were preserved.
4. From `backend`, run `npx prisma generate`. Set up the development schema using the project's migrations.
5. Start `npm run dev:backend` and `npm run dev:frontend` in separate root terminals.
6. Run the named checks in README before committing a change.

The root package provides shortcuts; it is not another Next.js application.
Install dependencies into the folder that imports them. Do not recreate root copies of
`app`, `components`, `public` or the frontend config files.

## Database and account tools

Do not reset or seed the production database during ordinary deployment. Older server
installations have an unbaselined migration history; follow the relevant feature's
SQL migration instructions rather than resetting the database to resolve that state.

`npm --prefix backend run create-admin` is a manual first-account tool. Configure
ADMIN_NAME, ADMIN_EMAIL and a private ADMIN_PASSWORD of at least 12 characters before
running it. It refuses to overwrite an existing account. `backend/create-client-admin.ts`
is a separate manual Admin bootstrap tool. Neither runs automatically with the server.

## Comments and editing markers

Key entry files include `EDIT GUIDE` comments directing you to this document. Those
comments describe ownership; actual business values should stay in settings or environment
files, rather than hardcoded passwords, phone numbers or one-off account scripts.

## Generated and retained files

Do not edit `node_modules`, `.next`, `dist`, `.tsbuildinfo` or generated `next-env.d.ts`.
They are recreated by dependency installation, type checks or builds. `.env` variants,
uploads and preview files are local-only. Examples are safe templates.

Active but unfinished routes remain in place so sidebar links and bookmarked URLs
continue working. See CLEANUP_REPORT.md for their status before promising those features.
