import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const host = 'https://n1324284.alteg.io';
const form = 1324284;
const locations = [251848, 1258225, 1343574];
const outDir = process.env.ALTEGIO_OUT_DIR || 'artifacts/altegio';
const pause = ms => new Promise(r => setTimeout(r, ms));
await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  locale: 'ru-RU',
  viewport: { width: 1440, height: 1000 },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36',
});

function replayHeaders(headers) {
  const out = {};
  for (const [k, v] of Object.entries(headers)) {
    const key = k.toLowerCase();
    if (key === 'authorization' || key === 'accept' || key === 'accept-language' || key === 'origin' || key === 'referer' || key === 'user-agent' || key.startsWith('x-')) out[k] = v;
  }
  return out;
}

async function loadLocation(id) {
  const page = await context.newPage();
  const serviceWait = page.waitForResponse(r => r.url().includes(`/api/v1/book_services/${id}`) && r.status() === 200, { timeout: 45000 });
  const staffWait = page.waitForResponse(r => r.url().includes(`/api/v1/book_staff/${id}`) && !r.url().includes('service_ids') && r.status() === 200, { timeout: 45000 });
  const companyWait = page.waitForResponse(r => r.url().includes(`/api/v1/company/${id}?`) && r.status() === 200, { timeout: 45000 });
  await page.goto(`${host}/company/${id}/personal/menu?o=`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const [serviceResponse, staffResponse, companyResponse] = await Promise.all([serviceWait, staffWait, companyWait]);
  const [catalog, staff, company] = await Promise.all([serviceResponse.json(), staffResponse.json(), companyResponse.json()]);
  const headers = replayHeaders(await serviceResponse.request().allHeaders());
  const serviceStaff = {};
  const services = catalog.services || [];

  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    const url = `${host}/api/v1/book_staff/${id}?datetime=&without_seances=1&service_ids[]=${service.id}`;
    const response = await context.request.get(url, { headers });
    if (!response.ok()) throw new Error(`mapping ${id}/${service.id} -> ${response.status()}`);
    const filtered = await response.json();
    serviceStaff[String(service.id)] = (filtered || []).map(s => ({
      id: s.id,
      name: s.name,
      specialization: s.specialization || '',
      bookable: Boolean(s.bookable),
      seanceLength: s.seance_length ?? null,
      price: s.price ?? null,
    }));
    if ((i + 1) % 20 === 0 || i === services.length - 1) console.log(`${id}: ${i + 1}/${services.length}`);
    await pause(230);
  }

  const data = {
    extractedAt: new Date().toISOString(),
    bookingFormId: form,
    locationId: id,
    company,
    categories: catalog.category || [],
    services,
    staff: staff || [],
    serviceStaff,
  };
  const links = Object.values(serviceStaff).reduce((n, x) => n + x.length, 0);
  data.stats = {
    categories: data.categories.length,
    services: data.services.length,
    staff: data.staff.length,
    bookableStaff: data.staff.filter(s => s.bookable).length,
    serviceStaffLinks: links,
    unmappedServices: data.services.filter(s => !(serviceStaff[String(s.id)] || []).length).length,
  };
  await fs.writeFile(path.join(outDir, `${id}.json`), JSON.stringify(data, null, 2) + '\n');
  await page.close();
  return { id, title: company.title, publicTitle: company.public_title, stats: data.stats };
}

const summary = [];
try {
  for (const id of locations) summary.push(await loadLocation(id));
  await fs.writeFile(path.join(outDir, 'summary.json'), JSON.stringify({ extractedAt: new Date().toISOString(), locations: summary }, null, 2) + '\n');
  console.log(JSON.stringify(summary, null, 2));
} finally {
  await browser.close();
}
