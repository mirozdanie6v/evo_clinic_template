import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const bookingUrl = process.env.ALTEGIO_BOOKING_URL || 'https://n1324284.alteg.io/company/1258225/personal/menu?o=';
const outDir = process.env.ALTEGIO_OUT_DIR || 'artifacts/altegio';
const maxClicks = Number(process.env.ALTEGIO_MAX_CLICKS || 80);

await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  locale: 'ru-RU',
  viewport: { width: 1440, height: 1000 },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36',
});
const page = await context.newPage();

const network = [];
const seen = new Set();

page.on('response', async (response) => {
  try {
    const url = response.url();
    const headers = response.headers();
    const ct = headers['content-type'] || '';
    if (!ct.includes('json') && !url.includes('api.alteg') && !url.includes('api.yclients')) return;

    const key = `${response.request().method()} ${url} ${response.status()}`;
    let body;
    try {
      body = await response.json();
    } catch {
      const text = await response.text().catch(() => '');
      body = text.slice(0, 200000);
    }

    network.push({
      key,
      url,
      status: response.status(),
      method: response.request().method(),
      requestPostData: response.request().postData(),
      body,
    });
    seen.add(key);
  } catch (err) {
    network.push({ error: String(err) });
  }
});

function walk(value, fn, trail = []) {
  if (Array.isArray(value)) {
    fn(value, trail);
    value.forEach((v, i) => walk(v, fn, [...trail, i]));
    return;
  }
  if (value && typeof value === 'object') {
    fn(value, trail);
    for (const [k, v] of Object.entries(value)) walk(v, fn, [...trail, k]);
  }
}

function asNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function getName(o) {
  if (!o || typeof o !== 'object') return null;
  for (const k of ['title', 'name', 'booking_title', 'service_title', 'staff_name', 'display_name']) {
    if (typeof o[k] === 'string' && o[k].trim()) return o[k].trim();
  }
  return null;
}

function detectServices(payloads) {
  const items = [];
  const unique = new Set();
  for (const payload of payloads) {
    walk(payload.body, (node) => {
      if (!node || Array.isArray(node) || typeof node !== 'object') return;
      const name = getName(node);
      if (!name) return;
      const id = node.id ?? node.service_id ?? node.serviceId ?? null;
      const categoryId = node.category_id ?? node.categoryId ?? node.service_category_id ?? null;
      const priceMin = asNum(node.price_min ?? node.priceMin ?? node.price ?? node.cost ?? node.min_price);
      const priceMax = asNum(node.price_max ?? node.priceMax ?? node.max_price);
      const duration = asNum(node.seance_length ?? node.duration ?? node.duration_seconds ?? node.length);
      const looksLikeService =
        categoryId !== null || priceMin !== null || priceMax !== null || duration !== null ||
        'service_id' in node || 'booking_title' in node;
      if (!looksLikeService) return;
      const key = `${id ?? ''}|${name}|${categoryId ?? ''}|${priceMin ?? ''}|${priceMax ?? ''}|${duration ?? ''}`;
      if (unique.has(key)) return;
      unique.add(key);
      items.push({
        id,
        categoryId,
        name,
        priceMin,
        priceMax,
        durationSeconds: duration,
        active: node.active ?? node.is_active ?? null,
        image: node.image ?? node.image_url ?? node.avatar ?? null,
        raw: node,
      });
    });
  }
  return items;
}

function detectStaff(payloads) {
  const items = [];
  const unique = new Set();
  for (const payload of payloads) {
    walk(payload.body, (node) => {
      if (!node || Array.isArray(node) || typeof node !== 'object') return;
      const name = getName(node);
      if (!name) return;
      const id = node.id ?? node.staff_id ?? node.staffId ?? null;
      const hasStaffHints =
        'staff_id' in node || 'specialization' in node || 'position' in node ||
        'avatar' in node || 'rating' in node || 'votes_count' in node;
      if (!hasStaffHints) return;
      const key = `${id ?? ''}|${name}`;
      if (unique.has(key)) return;
      unique.add(key);
      items.push({
        id,
        name,
        specialization: node.specialization ?? node.position ?? node.position_title ?? null,
        rating: node.rating ?? null,
        votesCount: node.votes_count ?? node.votesCount ?? null,
        image: node.avatar ?? node.image ?? node.image_url ?? null,
        serviceIds: node.services ?? node.service_ids ?? null,
        raw: node,
      });
    });
  }
  return items;
}

function detectCategories(payloads) {
  const items = [];
  const unique = new Set();
  for (const payload of payloads) {
    walk(payload.body, (node) => {
      if (!node || Array.isArray(node) || typeof node !== 'object') return;
      const name = getName(node);
      if (!name) return;
      const id = node.id ?? node.category_id ?? node.categoryId ?? null;
      const looksLikeCategory =
        'category_id' in node || 'service_category_id' in node ||
        Array.isArray(node.services) || Array.isArray(node.items) ||
        node.type === 'category';
      if (!looksLikeCategory) return;
      const key = `${id ?? ''}|${name}`;
      if (unique.has(key)) return;
      unique.add(key);
      items.push({ id, name, raw: node });
    });
  }
  return items;
}

async function saveState(label) {
  const safe = label.replace(/[^a-z0-9_-]+/gi, '-').toLowerCase();
  const bodyText = await page.locator('body').innerText().catch(() => '');
  await fs.writeFile(path.join(outDir, `${safe}.txt`), bodyText, 'utf8');
  await page.screenshot({ path: path.join(outDir, `${safe}.png`), fullPage: true }).catch(() => {});
}

async function tryUsefulClicks() {
  const selectors = [
    'button',
    '[role="button"]',
    'a',
    '[data-testid]',
  ];
  const candidates = page.locator(selectors.join(','));
  const count = Math.min(await candidates.count(), 250);
  let clicked = 0;

  const skip = /confirm|подтверд|оплат|payment|pay|заверш|finish|создать запись|book now|записаться$/i;
  const useful = /услуг|service|мастер|специалист|staff|категор|hair|nail|spa|космет|лазер|бров|педик|маник|стриж|окраш/i;

  for (let i = 0; i < count && clicked < maxClicks; i++) {
    const el = candidates.nth(i);
    const text = ((await el.innerText().catch(() => '')) || (await el.getAttribute('aria-label').catch(() => '')) || '').trim();
    if (!text || skip.test(text) || !useful.test(text)) continue;
    if (!(await el.isVisible().catch(() => false))) continue;
    try {
      await el.click({ timeout: 1500 });
      clicked++;
      await page.waitForTimeout(700);
    } catch {}
  }
  return clicked;
}

let failure = null;
try {
  console.log(`Opening ${bookingUrl}`);
  await page.goto(bookingUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(7000);
  await saveState('initial');

  const storage = await page.evaluate(() => ({
    href: location.href,
    title: document.title,
    localStorage: { ...localStorage },
    sessionStorage: { ...sessionStorage },
    scripts: [...document.scripts].map(s => s.src).filter(Boolean),
    resources: performance.getEntriesByType('resource').map(r => r.name),
  }));
  await fs.writeFile(path.join(outDir, 'browser-state.json'), JSON.stringify(storage, null, 2));

  const clicks = await tryUsefulClicks();
  console.log(`Useful clicks attempted: ${clicks}`);
  await page.waitForTimeout(4000);
  await saveState('after-clicks');
} catch (err) {
  failure = String(err?.stack || err);
  console.error(failure);
} finally {
  await browser.close();
}

await fs.writeFile(path.join(outDir, 'network.json'), JSON.stringify(network, null, 2));

const result = {
  source: bookingUrl,
  extractedAt: new Date().toISOString(),
  companyId: 1258225,
  networkResponsesCaptured: network.length,
  failure,
  categories: detectCategories(network),
  services: detectServices(network),
  staff: detectStaff(network),
};

await fs.writeFile(path.join(outDir, 'evo-altegio.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify({
  networkResponsesCaptured: result.networkResponsesCaptured,
  categories: result.categories.length,
  services: result.services.length,
  staff: result.staff.length,
  failure: result.failure,
}, null, 2));

if (failure) process.exitCode = 1;
