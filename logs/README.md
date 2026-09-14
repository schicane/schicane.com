# Operational logs

- `npm run build` writes timestamped compiler output to `logs/build.log`.
- `npm run verify` writes route, asset, anchor, metadata, RSS and domain checks to `logs/verification.json`.
- GitHub Actions uploads these logs even when a build fails; retained for 14 days.
- The deploy job records the deployed URL and commit in the Actions summary and checks HTTPS routes after publishing.
- Generated logs are ignored by Git. No analytics, visitor tracking, credentials or personal data are collected by the site.

Historical implementation decisions and verification outcomes are in `docs/IMPLEMENTATION_LOG.md`.
