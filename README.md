# EVO Beauty Space MiniApp

Production Next.js + React + TypeScript MiniApp for EVO Beauty Space, Nha Trang.

## Current product state

P0 demo product restored on top of the Cloudflare/OpenNext production stack:
- RU / EN / VI with browser-language detection and persisted manual choice;
- structured service catalog and service details;
- specialist directory and service-to-specialist links;
- six-step demo booking flow: service → specialist → date → time → contact → review;
- local demo appointment storage and profile history;
- catalog-backed deterministic AI demo with medical disclaimer;
- demo admin with appointment/client/catalog stats and local broadcast draft;
- official EVO Altegio link as the real-booking fallback;
- iOS safe areas, 16px form inputs and Android/desktop responsive layout.

## Data architecture

`data/evo.ts` is the normalized fallback data layer. `tools/altegio-network-extractor.mjs` extracts categories, services, staff and service↔staff mappings from EVO Altegio locations. The next integration gate is to normalize fresh extractor output into versioned app data so demo specialist placeholders and fallback pricing can be replaced by actual Altegio records without rewriting UI.

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
