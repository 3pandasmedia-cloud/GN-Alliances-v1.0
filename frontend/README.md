# GN Alliances frontend

This is the active Next.js website and platform source. Open the root
`GN-Alliances.code-workspace` in VS Code, then read
[the editing guide](../docs/EDITING_GUIDE.md).

- `app/`: public and authenticated routes.
- `components/`: shared navigation, dialogs, authorization UI and website content provider.
- `sections/`: landing page sections.
- `lib/`: API helpers, frontend permissions and content defaults.
- `public/`: images, logos and other URL-addressable assets.

Run `npm run dev`, `npm run typecheck`, or `npm run build` from this folder.
Do not edit `.next/`, `node_modules/` or generated `next-env.d.ts`.
