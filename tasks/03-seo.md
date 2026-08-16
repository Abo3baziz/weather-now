# Task 03 — SEO

## Overview

Give the app production-grade metadata and crawlability. The biggest structural limitation is that weather content is fetched client-side, so dynamic per-city pages aren't currently in the initial HTML — this task maximizes what's achievable with the site-level metadata and flags the server-rendering path as a follow-up.

## Current Issues

- **Minimal metadata** — `app/layout.tsx:5-9` has only `title` and `description`.
- **No `metadataBase`** — OG/Twitter URLs can't be made absolute, which most social platforms require.
- **No social cards** — missing Open Graph (`og:title`, `og:description`, `og:image`, `og:type`, `og:url`) and Twitter card tags.
- **No canonical URL** — duplicate/query-string access has no declared canonical.
- **No `robots.txt` / `sitemap`** — crawler guidance and indexing signals absent.
- **No structured data** — no JSON-LD, so search engines get no entity context.
- **Icons not declared** — `app/favicon.ico` and `public/images/favicon-32x32.png` exist but `icons` metadata isn't set; no `apple-touch-icon`.
- **No `theme-color` / viewport customization** beyond Next defaults.
- **Content is client-only** — `app/page.tsx` is `"use client"` and weather data is fetched via React Query, so crawlers executing limited JS see an empty loading shell.

## Task Checklist

### Core metadata (`app/layout.tsx`)

- [x] Add `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")` (or a hardcoded production URL) so relative URLs resolve to absolute.
- [x] Add `alternates.canonical: "/"` for the root page.
- [x] Add `icons` pointing at `/favicon.ico` and `/images/favicon-32x32.png`, plus an `apple-touch-icon`. *(generated `public/apple-touch-icon.png` 180×180)*
- [x] Add `themeColor` (match the `--surface-primary` dark background).
- [x] Set `viewport` metadata explicitly (`width: device-width`, `initialScale: 1`).
- [x] Refresh `title`/`description` to be keyword-appropriate ("Weather Now — live conditions, hourly & 7-day forecast") and under ~155 chars for the description.

### Social sharing (Open Graph / Twitter)

- [x] Add `openGraph` block: `title`, `description`, `type: "website"`, `url`, `siteName: "Weather Now"`, and `images` (create/commit an OG image, e.g. `public/images/og-image.png` at 1200×630). *(generated 1200×630 PNG via sharp)*
- [x] Add `twitter` card metadata (`summary_large_image` + title/description/image).

### Crawlability

- [x] Add `app/robots.ts` allowing all crawlers and referencing the sitemap.
- [x] Add `app/sitemap.ts` emitting the root URL from `metadataBase`.

### Structured data

- [x] Add JSON-LD `WebSite` + `WebApplication` (or `SoftwareApplication`) schema in the root layout (server component) with `name`, `description`, `url`, and `applicationCategory: "WeatherApplication"`.
- [x] (Follow-up, do not block) Document the path to dynamic per-city pages: a server-rendered route (`/city/[slug]` or search-param pages) that renders weather in the initial HTML, since client-only React Query data can't be indexed today. *(still client-rendered — flagged as future work; see README roadmap)*

### Verified in markup

- [x] `next build` output confirms `<html>` contains viewport, meta description, OG/Twitter tags, canonical, theme-color, and JSON-LD.
- [x] `robots.txt` and `sitemap.xml` resolve at `/robots.txt` and `/sitemap.xml`.

## Acceptance Criteria

- [ ] Lighthouse SEO category scores 100% on the built site (or only "content not server-rendered" warnings that are documented follow-ups). *(manual audit — markup prerequisites verified below)*
- [ ] A social-share checker (e.g. opengraph.xyz) shows a complete card with image. *(manual check — OG tags verified present in markup)*
- [x] `curl /robots.txt` and `/sitemap.xml` return valid content.
- [x] `<head>` contains one canonical, one `og:url`, one JSON-LD block, and no duplicate title/description.
