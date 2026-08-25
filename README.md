# EVO Beauty Space MiniApp

Production Next.js + React + TypeScript MiniApp for EVO Beauty Space, Nha Trang.

## Current product state

P1 product prototype on the Cloudflare/OpenNext production stack:
- RU / EN / VI with browser-language detection and persisted manual choice;
- official EVO branding and administrator Telegram `@evo_vn`;
- real EVO NORTH cosmetology snapshot from Altegio, refreshed 2026-08-25;
- 14 cosmetology categories and 74 real catalog positions with Altegio pricing;
- EN / VI service-title translations while preserving product and brand names;
- service search and category filters for the full catalog;
- service details and real service↔staff mappings where Altegio exposes them;
- real specialist profiles from Altegio plus an explicit booking fallback when no direct staff mapping is exposed;
- six-step demo booking flow: service → specialist → date → time → contact → review;
- local demo appointment storage and profile history;
- catalog-backed deterministic AI demo with medical disclaimer;
- demo admin with appointment/client/catalog stats, catalog source and local broadcast draft;
- official EVO NORTH Altegio link as the real-booking fallback;
- iOS safe areas, 16px form inputs and responsive mobile/desktop layout;
- automated Chromium Android-size and WebKit iPhone-size E2E coverage in CI.

## Data architecture

`tools/altegio-network-extractor.mjs` extracts the EVO network. `tools/normalize-altegio.mjs` selects the cosmetology scope for EVO NORTH and writes the versioned `data/altegio-snapshot.json`. `data/evo.ts` turns that snapshot into the typed UI model, formats VND prices, maps real staff and adds localized category metadata. `data/service-translations.ts` contains EN/VI presentation translations for official cosmetology service names.

UI code does not contain a duplicated hand-written service catalog.

## Demo vs live data

Live/current data:
- catalog categories, services and prices;
- EVO NORTH location and contact details;
- service↔staff mappings and public staff profiles exposed by Altegio;
- official Altegio booking link and EVO Telegram contact.

Demo/local-only data:
- appointment dates/times generated inside the prototype;
- appointments stored in browser localStorage;
- client profile/history derived from local demo appointments;
- Demo Admin appointments/clients/broadcast;
- deterministic catalog assistant (no OpenAI backend yet).

## Stack
- Next.js / React / TypeScript
- Cloudflare Workers via OpenNext
- GitHub Actions CI + production deployment smoke checks
- Playwright Chromium + WebKit mobile E2E

## Branches
- `develop` — integration and QA
- `production` — production releases / Cloudflare deploy
- `main` — preserved legacy baseline

## Commands
`npm run dev` · `npm run build` · `npm run test:e2e` · `npm run preview` · `npm run deploy`

Production deployment expects GitHub secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
