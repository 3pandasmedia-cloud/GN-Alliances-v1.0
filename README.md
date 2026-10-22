# GN Alliances

The editable application has two source folders:

- `frontend/`: Next.js website and all platform dashboards.
- `backend/`: Express API, authentication, email, Lakeeshop integration and Prisma database definitions.

Open **GN-Alliances.code-workspace** in VS Code. Start with the
[editing guide](docs/EDITING_GUIDE.md) for a feature-to-file map and setup steps.
The [cleanup report](docs/CLEANUP_REPORT.md) records what was removed and what remains unfinished.

## Development

Install dependencies separately with `npm ci --prefix frontend` and `npm ci --prefix backend`.
Keep your existing local environment files. For a new checkout, copy each folder's
`.env.example` to its local environment file and fill in private configuration.

Run the API and website in separate terminals:

```sh
npm run dev:backend
npm run dev:frontend
```

The website runs at http://localhost:3000 and proxies `/api` to the API at port 5000.

## Checks

```sh
npm run typecheck
npm test
npm --prefix backend run test:typecheck
npm run audit:unused
npm run build
```

The audit reports candidates for manual review; it never deletes files.
Builds can require network access to download the Google fonts used by Next.js.
Existing lint warnings/errors are tracked separately from TypeScript and tests.

## Content editing

Use **Super Admin → Website Settings** for saved public content, contact details,
WhatsApp, demo recipients and email sender configuration. Editing default JSON does
not overwrite values already saved in the database. See the editing guide before changing defaults.

No credentials, uploads, database dumps or generated build files belong in Git.
