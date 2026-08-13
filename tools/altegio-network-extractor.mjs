import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const host = 'https://n1324284.alteg.io';
const form = 1324284;
const ids = [251848, 1258225, 1343574];
const out = 'data/altegio-network';
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ locale: 'ru-RU', userAgent: 'Mozilla/5.0 Chrome/130 Safari/537.36' });
const page = await ctx.newPage();
const pause = ms => new Promise(r => setTimeout(r, ms));

async function get(url) {
  return page.evaluate(async url => {
    const r = await fetch(url, { credentials: 'include', headers: { Accept: 'application/json' } });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.json();
  }, url);
}

await page.goto(`${host}/company/1258225/personal/menu?o=`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(6000);
await get(`${host}/api/v1/booking/chains/1245784/locations/?include[]=city&bookform_id=${form}`);

const summary = [];
for (const id of ids) {
  const api = `${host}/api/v1`;
  const company = await get(`${api}/company/${id}?forBooking=1&bookform_id=${form}&include=has_cashback`);
  const catalog = await get(`${api}/book_services/${id}?without_seances=1`);
  const staff = await get(`${api}/book_staff/${id}?datetime=&without_seances=1`);
  const serviceStaff = {};
  for (const service of catalog.services || []) {
    const filtered = await get(`${api}/book_staff/${id}?datetime=&without_seances=1&service_ids[]=${service.id}`);
    serviceStaff[String(service.id)] = (filtered || []).map(s => ({ id: s.id, name: s.name, specialization: s.specialization || '', bookable: Boolean(s.bookable), seance_length: s.seance_length ?? null, price: s.price ?? null }));
    await pause(260);
  }
  const data = { extractedAt: new Date().toISOString(), bookingFormId: form, company, categories: catalog.category || [], services: catalog.services || [], staff: staff || [], serviceStaff };
  await fs.writeFile(path.join(out, `${id}.json`), JSON.stringify(data, null, 2) + '\n');
  const links = Object.values(serviceStaff).reduce((n, list) => n + list.length, 0);
  summary.push({ id, title: company.title, categories: data.categories.length, services: data.services.length, staff: data.staff.length, links, unmappedServices: data.services.filter(s => !(serviceStaff[String(s.id)] || []).length).length });
  console.log(summary.at(-1));
}
await browser.close();
await fs.writeFile(path.join(out, 'summary.json'), JSON.stringify({ extractedAt: new Date().toISOString(), locations: summary }, null, 2) + '\n');
