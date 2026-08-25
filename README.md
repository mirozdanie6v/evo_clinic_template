# EVO Beauty Space MiniApp

Production Next.js + TypeScript MiniApp for EVO Beauty Space, Nha Trang.

## Stack
- Next.js / React / TypeScript
- Cloudflare Workers via OpenNext
- RU / EN / VI with browser language detection
- iOS / Android / desktop responsive UI
- Official EVO Altegio booking link

## Branches
- `develop` — integration and QA
- `production` — production releases / Cloudflare deploy
- `main` — preserved legacy baseline

## Commands
`npm run dev` · `npm run build` · `npm run preview` · `npm run deploy`

Production deployment expects GitHub secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
