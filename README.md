# EVO Beauty Space MiniApp

Production Next.js + React + TypeScript MiniApp for EVO Beauty Space, Nha Trang.

## Current product state

P1 full-service product prototype on the Cloudflare/OpenNext production stack:
- RU / EN / VI with browser-language detection and persisted manual choice;
- official EVO branding and administrator Telegram `@evo_vn`;
- real full EVO NORTH public snapshot from Altegio, refreshed 2026-08-25;
- 40 public categories and 257 current catalog positions with Altegio pricing;
- eight mobile-first service groups: Hair & barber, Nails & podology, Laser, Brows/lashes/PMU, Tattoo & body aesthetics, Cosmetology, Massage and Training;
- localized RU / EN / VI group/category navigation; existing detailed EN / VI cosmetology service translations remain active while official service names are preserved when a detailed translation is not yet curated;
- service search, top-level group filters and real Altegio subcategory filters;
- the same group navigation is available on the first booking step so the 257-service catalog stays usable on mobile;
- service details and real service↔staff mappings where Altegio exposes them;
- real specialist profiles from Altegio plus an explicit booking fallback when no direct staff mapping is exposed;
- six-step demo booking flow: service → specialist → date → time → contact → review;
- local demo appointment storage and profile history;
- catalog-backed deterministic AI demo across the full service catalog;
- demo admin with appointment/client/catalog stats, catalog source and local broadcast draft;
- official EVO booking link and administrator Telegram as live conversion fallbacks;
- iOS safe areas, 16px form inputs and responsive mobile/desktop layout;
- automated Chromium Android-size and WebKit iPhone-size E2E coverage in CI.

## Public service scope

The current EVO NORTH Altegio source includes haircuts/styling, hair treatments, coloring, barber services, manicure, pedicure, podology, female and male laser hair removal, brows, lashes, lash extensions, permanent makeup and correction, artistic tattoo/dermopigmentation, laser tattoo removal, body aesthetics, massage, cosmetology/injections/device treatments and public training services.

The EVO marketing site also advertises the same core beauty directions, including artistic tattoo and laser tattoo removal. Gift certificates are presented on the marketing site but are not currently represented as a normal bookable service in the validated Altegio snapshot.

## Data architecture

`tools/altegio-network-extractor.mjs` extracts the EVO network. `tools/normalize-altegio.mjs` keeps the complete active public EVO NORTH catalog and writes the versioned `data/altegio-snapshot.json`. `data/evo.ts` turns that snapshot into the typed UI model, formats VND prices, maps real staff and organizes raw Altegio categories into localized mobile service groups. `data/service-translations.ts` contains curated EN/VI presentation translations for service names where available.

UI code does not contain a duplicated hand-written service catalog.

## Demo vs live data

Live/current data:
- 40 catalog categories, 257 services and prices from the validated EVO NORTH snapshot;
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
