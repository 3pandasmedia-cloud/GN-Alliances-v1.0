# Cleanup report — 22 October 2026

## Verified application structure

The deployed application is built from `frontend/` and started from `backend/`.
The old root application had no imports from either active application. Its public
assets were checked byte-for-byte: all 94 root public files already existed under
`frontend/public/`. Root dependencies were not needed by the active frontend.

Before deleting root source, a ZIP archive of 253 root files was written to the OS
temporary directory and verified with SHA-256 hashes for every file. Previous local
preview files and editing scripts were archived separately. Tracked deleted files
remain recoverable from Git history after this cleanup is committed.

## Removed

- The obsolete root `app`, `components`, `constants`, `data`, `lib`, `public`,
  `sections`, and `types` trees: 247 tracked files, including about 61 MB of duplicate images.
- Old root Next.js/TypeScript/PostCSS/ESLint configuration files. The active copies
  are in `frontend/`; Next.js now explicitly resolves from that directory.
- 51 unreachable frontend source files after tracing framework routes, static imports,
  re-exports, literal dynamic imports and shared helpers imported by backend tests.
  This includes 11 empty files, old sidebars/modals, unused landing sections,
  duplicate sample content and the unused mock-login credential array.
- Unused frontend dependencies `multer`, `@types/multer` and `swiper`.
- Obsolete root dependency installations, pruned using npm after converting the root
  package to documented development shortcuts.
- The obsolete root `.next` build cache, local `tmp` previews/scripts and compiler cache.
- One-off account/data maintenance scripts: `create-demo-merchant.ts`,
  `create-gn-admin.ts`, `remove-demo-partners.ts`, `update-client-admin-email.ts`.
  These were not imported by the server or referenced by package commands. Removing
  them did not execute their account or deletion operations.

## Improved for editing

- `GN-Alliances.code-workspace`: a VS Code workspace with named frontend/backend,
  TypeScript and test tasks. Generated dependencies/build outputs are hidden.
- `docs/EDITING_GUIDE.md`: maps business changes to exact source files/settings.
- Root and frontend README files now explain the real two-folder application.
- Key source entry points have short `EDIT GUIDE` comments.
- `.editorconfig` standardizes UTF-8 text and line endings for future edits.
- Frontend, backend and test type-check commands have separate project boundaries.
- The reusable `scripts/audit-unused.cjs` is read-only and never deletes candidates.
- Local environment variants, generated declarations/caches and temporary artifacts
  are ignored. Existing `frontend/.env.local` and `frontend/next-env.d.ts` remain on
  disk but are no longer tracked. `frontend/.env.example` documents safe defaults.
- Super Admin bootstrap now requires private environment values rather than embedding
  an account password. `seed.ts` delegates to that same explicit bootstrap command.

## Preserved intentionally

- Backend uploads, existing local `.env` files, database records, migrations and tests.
- Active `frontend/public` assets, including assets referenced by saved database
  content or constructed URLs. No asset was deleted solely for lacking a text match.
- All active route entry files, redirects and role navigation, even where the page
  is still unfinished. Route files can be reached directly or from saved links and
  must not be classified as unused just because another source file does not import them.
- The active frontend dependency installation and build output. These are required
  to run locally and are ignored in Git, not application source.

## Unfinished routes/features to review separately

These are retained features, not completed by this cleanup:

| Location | Current status |
| --- | --- |
| `/resources`, `/solutions` | Minimal index page shells |
| `/login/forgot-password`, `/login/reset-password` | Page shells; no complete reset workflow |
| `/platform/partner/campaigns`, `/platform/super-admin/clients/fintechs` | Minimal page shells |
| `/platform/partner` dashboard | Still contains static demonstration metrics/rows; preserved because the dashboard is active, not silently converted to live data |
| Some client/employee/partner settings and role pages | Presentational or early-stage forms; check each handler before treating changes as persisted |
| Bank analytics “Coming Soon” section | Intentionally unfinished analytics area |

The complete file map is in EDITING_GUIDE.md. Removing an unfinished feature from the
product also requires deciding what happens to its sidebar links, access rules and URLs.

## Validation

- Production Next.js build passed and all application routes compiled.
- All 16 backend tests passed.
- Frontend and backend type checks passed.
- Backend test TypeScript check passed with its separate configuration.
- Read-only import audit: 0 remaining unused frontend source candidates.
- Git whitespace/diff checks passed.

The import audit is conservative static analysis, not proof that every asset or exported
function is used at runtime. Existing repository-wide lint issues are outside this
cleanup; they were not silently disabled. No production server or database was changed.

## Removed unused frontend files

- `frontend/app/platform/AdminSidebar.tsx`
- `frontend/app/platform/Sidebar.tsx`
- `frontend/app/platform/partner/components/AnalyticsStatsCard.tsx`
- `frontend/app/platform/partner/components/BrandingSettings.tsx`
- `frontend/app/platform/partner/components/CampaignStatsCard.tsx`
- `frontend/app/platform/partner/components/CompanySettings.tsx`
- `frontend/app/platform/partner/components/IntegrationSettings.tsx`
- `frontend/app/platform/partner/components/PartnerStatsCard.tsx`
- `frontend/app/platform/partner/components/ReconciliationStatsCard.tsx`
- `frontend/app/platform/partner/components/SecuritySettings.tsx`
- `frontend/app/platform/super-admin/components/CreateCampaignModal.tsx`
- `frontend/app/platform/super-admin/lakeeshop/ApiChecks.tsx`
- `frontend/app/platform/super-admin/landing-offers/AddOfferModal.tsx`
- `frontend/app/platform/super-admin/landing-offers/DeleteOfferModal.tsx`
- `frontend/app/platform/super-admin/landing-offers/EditOfferModal.tsx`
- `frontend/app/platform/super-admin/merchants/modals/CreateCampaignModal.tsx`
- `frontend/app/platform/super-admin/merchants/modals/EditMerchantModal.tsx`
- `frontend/app/platform/super-admin/merchants/types/merchant.ts`
- `frontend/components/LandingOffers.tsx`
- `frontend/components/common/AnimatedReveal.tsx`
- `frontend/components/common/EcosystemNode/EcosystemNode.tsx`
- `frontend/components/navigation/MobileMenu/MobileMenu.tsx`
- `frontend/components/ui/Button/Button.tsx`
- `frontend/constants/brand.ts`
- `frontend/constants/navigation.ts`
- `frontend/constants/permissions.ts`
- `frontend/constants/routes.ts`
- `frontend/data/ecosystem.ts`
- `frontend/lib/auth.ts`
- `frontend/sections/Benefits/benefitsData.ts`
- `frontend/sections/HowItWorks/processData.ts`
- `frontend/sections/Industries/Industries.tsx`
- `frontend/sections/Industries/IndustryCard.tsx`
- `frontend/sections/Industries/industriesData.ts`
- `frontend/sections/Metrics/metricsData.ts`
- `frontend/sections/PlatformCapabilities/AnalyticsReportsShowcase.tsx`
- `frontend/sections/PlatformCapabilities/CampaignManagementShowcase.tsx`
- `frontend/sections/PlatformCapabilities/CapabilityCard.tsx`
- `frontend/sections/PlatformCapabilities/DashboardShowcase.tsx`
- `frontend/sections/PlatformCapabilities/MerchantManagementShowcase.tsx`
- `frontend/sections/PlatformCapabilities/OfferManagementShowcase.tsx`
- `frontend/sections/PlatformCapabilities/ReconciliationPayoutsShowcase.tsx`
- `frontend/sections/PlatformCapabilities/capabilitiesData.ts`
- `frontend/sections/TopOffers/Carousel.tsx`
- `frontend/sections/WhyGN/whyGNData.ts`
- `frontend/types/analytics.ts`
- `frontend/types/campaign.ts`
- `frontend/types/merchant.ts`
- `frontend/types/offer.ts`
- `frontend/types/redemption.ts`
- `frontend/types/user.ts`
