# Wavemetrik website

The site at [www.wavemetrik.com](https://www.wavemetrik.com): products, solutions, guides and contact pages for Wavemetrik's Wi-Fi test and measurement systems.

It is a [Next.js](https://nextjs.org) App Router project (see `package.json` for the version) with Tailwind CSS. Every page is prerendered at build time. There is no database, no API route and no server-side secret. Usage analytics and browser error reports go to PostHog.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, without building |
| `npm run test:site` | Checks a running build from the outside (see below) |

Next.js changes between versions. Before writing code, read the guide for the feature in `node_modules/next/dist/docs/`, as `AGENTS.md` says.

## Check a build before it ships

```bash
npm run lint && npm run build
npm run start                 # in one terminal
npm run test:site             # in another
```

`scripts/site.test.mjs` fetches the running site and fails if a page in the sitemap is missing its title, description, canonical address or structured data, if a link between pages is broken, if an unknown address does not answer 404, if a redirect from the previous site is gone, or if a security header is missing. Set `SITE_URL` to check a different server, for example `SITE_URL=https://www.wavemetrik.com npm run test:site`.

## Deployment

Vercel builds and deploys the `main` branch of this repository to production. A push to `main` goes live, and the repository is public.

| Variable | Needed | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | The address used in canonical links, the sitemap and structured data. Defaults to `https://www.wavemetrik.com`. |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | For analytics | The PostHog project token. It is public: it ships to the browser. |
| `NEXT_PUBLIC_POSTHOG_HOST` | For analytics | The PostHog ingestion address, for example `https://eu.i.posthog.com`. The Content Security Policy is built from it, so it must be set when the site is built. |

Copy `.env.example` to `.env.local` and fill in the two PostHog values. Without them analytics is switched off, and the development console says so once. Set both in Vercel for analytics to work on the live site.

## Where things are

- `app/` holds the pages. Each route keeps its own `_components` and `_data`.
- `components/` holds what pages share: header, footer, forms, charts and diagrams.
- `lib/site.ts` has the company's name, addresses and phone number. `lib/seo.ts` builds each page's metadata and structured data from it.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt`. Add a new page to the sitemap by hand.
- `next.config.ts` sets the security headers and the redirects.
- `proxy.ts` answers 404 for guide addresses that match no guide.

## Rules worth knowing

- **Documents are sent on request.** The presentation and the datasheets are not in this repository and are not served by the site. The forms that ask for them open an email to support@wavemetrik.com. Do not add these files under `public/` or anywhere else here.
- **Forms send nothing from the page.** They prepare an email in the visitor's own email app.
- **The Content Security Policy is in `next.config.ts`.** A new third-party script, frame, font or API host has to be added there, or the browser will block it. The Vercel preview toolbar is not allowed by the policy.
- **Analytics is PostHog in cookieless mode, configured in `lib/posthog.ts`.** It sets no cookie and stores nothing in the browser, so the site needs no cookie banner. This relies on "Cookieless server hash mode" being switched on in the PostHog project (Settings > Web analytics). The library is downloaded after the page has loaded, so import it only through `lib/posthog.ts`, never directly. Three events are sent from the forms (`contact_email_draft_opened`, `document_request_email_draft_opened`, `datasheet_request_opened`), with the kind of enquiry, document or product only. Never add what a visitor typed (name, email, company, message) to an event, a log line or an identifier.
- **The privacy policy describes what the site does today.** It names PostHog, says it runs without cookies, lists what it collects, and says that what visitors type into forms is not collected. If that changes (cookies or session recording switched on, another analytics or embedded service, a form that posts to a server, a new event property), update `app/privacy-policy/page.tsx` and its "last updated" date in the same change.
