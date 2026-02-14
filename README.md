# Church of Christ Jacksonville — Website

The official website for the Church of Christ Jacksonville conference, built with **Next.js** and powered by **TinaCMS** for visual content editing.

🔗 **Live site:** [website-cocj.vercel.app](https://website-cocj.vercel.app)

## Tech Stack

- **Next.js** (TypeScript)
- **TinaCMS** — headless CMS with Git-backed content (Markdown/JSON)
- **Vercel** — hosting & deployment
- **pnpm** — package manager

## Getting Started

### Prerequisites

- Node.js (see `.nvmrc` for version)
- pnpm

### Install & Run

```bash
pnpm install
pnpm dev
```

**Local URLs:**

- `http://localhost:3000` — site
- `http://localhost:3000/admin` — CMS editor (requires TinaCMS account)
- `http://localhost:4001/altair/` — GraphQL playground

### Environment Variables

Copy `.env.example` to `.env` and fill in your TinaCMS credentials:

```
NEXT_PUBLIC_TINA_CLIENT_ID=<from app.tina.io>
TINA_TOKEN=<from app.tina.io>
NEXT_PUBLIC_TINA_BRANCH=<branch with Tina configured>
```

## Deployment

The site auto-deploys to **Vercel** on push to main.

For **GitHub Pages** deployment, a workflow is included at `.github/workflows/build-and-deploy.yml`. Requires `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` as repository secrets.

## License

[Apache 2.0](./LICENSE)
