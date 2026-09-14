# SCHICANE

Independent AI intelligence at **https://schicane.com**. A static editorial publication built with Next.js App Router, TypeScript, Tailwind CSS and MDX. GitHub Pages serves prebuilt HTML; no database, authentication, server backend, Vercel or Supabase is required.

## Local development

Use Node.js 24 (22+ supported) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Routes: `/`, `/ai/`, `/ai/weekly/`, `/about/`, `/methodology/`, and `/ai/weekly/YYYY-MM-DD/` for published editions.

## Production build and checks

```sh
npm run build
npm run typecheck
npm test
npm run verify
npm run preview
```

The production build uses `output: 'export'` and `trailingSlash: true`, producing a self-contained `out/` directory with real HTML for every route. Preview serves this directory at http://127.0.0.1:3000 with genuine 404 responses (no SPA fallback). Stop an existing dev server before using preview on the same port.

The build copies the original root `CNAME` into `public/CNAME`, which Next.js includes in the export. `public/.nojekyll` is also exported. Never change the domain or set a repository-name base path for this custom-domain deployment.

Verification checks all exported internal links and anchors, local assets, page metadata, H1s, language/main landmarks, RSS article URLs and the CNAME. Validate visual changes at desktop, tablet and 390px mobile widths. Animation respects reduced-motion preferences. Navigation is usable without client-side JavaScript.

## Structure

```text
app/                        Page layouts, static routes, RSS, sitemap and robots
components/                 Editorial sections and original SVG signal artwork
content/ai/weekly/           Date-named MDX editions
lib/content.ts              Validated content loading and MDX compilation
public/                     Favicon, social image and Pages files
scripts/                    Logged builds, export verification, static preview
.github/workflows/pages.yml  CI and production Pages deployment
logs/                       Generated diagnostic output (Git-ignored)
docs/                       Implementation history and verification notes
CNAME                       Preserved canonical custom domain
```

## Add a weekly article

1. Create `content/ai/weekly/2026-09-21.mdx` using the metadata example in [the content guide](content/ai/weekly/README.md).
2. Write the report with source links and clear fact/analysis distinctions. Only trusted contributors should author MDX, because it executes at build time.
3. Review factual claims, then set `draft: false`. The quoted date must match the filename. Drafts and future editions are excluded.
4. Run the production checks and push to `main`. The article route, homepage feature, archive, RSS and sitemap update automatically.

An example future filename is documentation only, not a fabricated edition. The launch editorial is the only initial published content. RSS lives at `/rss.xml`; it is a real feed, not an email subscription form.

## GitHub Pages deployment

The production repository is `schicane/schicane.com`; its production branch is `main`. The older `saarushjaiswal/schicane` coming-soon repository is separate and is not modified by this project.

In repository **Settings → Pages**, set **Source → GitHub Actions**, retain **Custom domain → schicane.com**, and keep **Enforce HTTPS** enabled. Existing DNS records should be preserved. The initial domain already resolves to GitHub Pages and has a valid HTTPS response.

`.github/workflows/pages.yml` builds and verifies pushes to `main` and pull requests. Only `main` deploys, using `actions/upload-pages-artifact` and `actions/deploy-pages`. The deploy job uses the `github-pages` environment with `pages: write` and `id-token: write`; the build needs only read access. A manual run and Monday 12:15 UTC schedule also support publication of eligible future-dated articles.

If a deployment fails, inspect the Actions run and its `build-logs` artifact. Check Pages source, environment protection and domain configuration before retrying. Do not delete/recreate the Pages site or remove CNAME to fix routine build errors. Restore a prior version by reverting the relevant commit and allowing CI to redeploy; do not force-push production history.

## Logs

`logs/build.log` contains timestamped build output; `logs/verification.json` records route validation. Actions retains diagnostic logs for 14 days, records the deployed URL and commit in its summary, and checks public HTTPS routes. Generated logs are not committed. See [logs/README.md](logs/README.md) and [the implementation log](docs/IMPLEMENTATION_LOG.md). The public site does not collect visitor analytics or personal data.

## Implementation references

- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
