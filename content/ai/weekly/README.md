# Weekly content

Each publishable MDX file uses `YYYY-MM-DD.mdx`; the filename and quoted `date` must match.

```yaml
---
title: "A specific editorial headline"
description: "A concise summary for the homepage, archive, search, and RSS."
date: "2026-09-21"
kind: report
tags: ["Models", "Research"]
draft: true
---
```

Write Markdown below the frontmatter. A report should include **What happened**, **Why it matters**, **What comes next**, and primary HTTPS source links beside factual claims. MDX supports JSX, tables, lists and blockquotes. Keep paragraphs short; use H2s below the generated H1.

Change `draft` to `false` after human editorial review. Future-dated content stays excluded until a build on or after its UTC publication date. Monday's scheduled build at 12:15 UTC makes eligible editions public; a main push or manual workflow also rebuilds. Scheduled GitHub jobs can be delayed and may be disabled after repository inactivity, so check Actions for time-sensitive releases.

`2026-09-21.mdx` generates `/ai/weekly/2026-09-21/`, joins the archive and feed, and becomes featured if it is the newest published item. No route edits are needed.

The initial `2026-09-14.mdx` is explicitly a launch editorial, not news reporting. Do not use synthetic news or invented sources to populate the archive. Set `kind: editorial` for editorial notes and `kind: report` for sourced weekly reports. Report builds require at least one HTTPS link; this is a mechanical guard and does not replace source verification.

MDX executes at build time. Accept content only from trusted repository contributors. Never evaluate untrusted uploads. Relative site links should use root-relative trailing-slash URLs, e.g. `/methodology/`. Add a dated correction note when materially changing an article.
