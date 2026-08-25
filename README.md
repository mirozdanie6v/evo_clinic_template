# EVO Beauty Space MiniApp

Production Next.js + React + TypeScript MiniApp for EVO Beauty Space, Nha Trang.

## Current product state

P0 demo product restored on top of the Cloudflare/OpenNext production stack:
- RU / EN / VI with browser-language detection and persisted manual choice;
- real EVO NORTH cosmetology snapshot from Altegio, refreshed 2026-08-25;
- 14 cosmetology categories and 74 real catalog positions with Altegio pricing;
- service details and real service↔staff mappings where Altegio exposes them;
- explicit booking fallback for services whose public snapshot has no staff mapping;
- six-step demo booking flow: service → specialist → date → time → contact → review;
- local demo appointment storage and profile history;
- catalog-backed deterministic AI demo with medical disclaimer;
- demo admin with appointment/client/catalog stats and local broadcast draft;
- official EVO NORTH Altegio link as the real-booking fallback;
- iOS safe areas, 16px form inputs and Android/desktop responsive layout.

## Data architecture

`tools/altegio-network-extractor.mjs` extracts the EVO network. `tools/normalize-altegio.mjs` selects the cosmetology scope for EVO NORTH and writes the versioned `data/altegio-snapshot.json`. `data/evo.ts` turns that snapshot into the typed UI model, formats VND prices and adds localized category metadata. UI code does not contain a duplicated hand-written catalog.

## Stack
- Next.js / React / TypeScript
- Cloudflare Workers via OpenNext
- GitHub Actions CI + production deployment smoke checks

## Branches
- `develop` — integration and QA
- `production` — production releases / Cloudflare deploy
- `main` — preserved legacy baseline

## Commands
`npm run dev` · `npm run build` · `npm run preview` · `npm run deploy`

Production deployment expects GitHub secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
