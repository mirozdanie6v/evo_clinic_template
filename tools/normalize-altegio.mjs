import fs from 'node:fs/promises';
import path from 'node:path';

const input = process.env.ALTEGIO_INPUT || 'artifacts/altegio/251848.json';
const output = process.env.ALTEGIO_NORMALIZED_OUT || 'data/altegio-snapshot.json';

const raw = JSON.parse(await fs.readFile(input, 'utf8'));

// EVO NORTH currently exposes the broadest public Nha Trang catalog. Keep the
// complete active public catalog so the MiniApp covers hair, nails, laser,
// podology, PMU, brows/lashes, tattoo, massage and cosmetology in one source.
const categories = (raw.categories || [])
  .map(category => ({ id: category.id, title: category.title }))
  .filter(category => category.id && category.title);

const categorySet = new Set(categories.map(category => category.id));
const services = (raw.services || [])
  .filter(service => categorySet.has(service.category_id) && service.active !== 0)
  .map(service => {
    const staff = raw.serviceStaff?.[String(service.id)] || [];
    return {
      id: service.id,
      title: service.title,
      categoryId: service.category_id,
      priceMin: service.price_min ?? 0,
      priceMax: service.price_max ?? 0,
      priceUnit: 'thousand-vnd',
      durationSeconds: service.seance_length ?? null,
      specialistIds: staff.map(item => item.id),
    };
  });

const serviceIdSet = new Set(services.map(service => service.id));
const links = new Map();
for (const service of services) {
  for (const staffId of service.specialistIds) {
    if (!links.has(staffId)) links.set(staffId, []);
    links.get(staffId).push(service.id);
  }
}

const specialists = (raw.staff || [])
  .filter(staff => links.has(staff.id))
  .map(staff => ({
    id: staff.id,
    name: staff.name,
    specialization: staff.specialization || '',
    position: staff.position?.title || '',
    avatar: staff.avatar || '',
    bookable: Boolean(staff.bookable),
    serviceIds: links.get(staff.id).filter(id => serviceIdSet.has(id)),
  }));

const normalized = {
  meta: {
    source: 'Altegio public booking catalog',
    scope: 'EVO NORTH full public catalog',
    extractedAt: raw.extractedAt,
    normalizedAt: new Date().toISOString(),
    sourceLocationId: raw.locationId,
    priceUnit: 'thousand-vnd',
  },
  location: {
    id: raw.locationId,
    title: raw.company?.title || '',
    publicTitle: raw.company?.public_title || '',
    address: raw.company?.address || '',
    phone: raw.company?.phone || '',
    email: raw.company?.email || '',
    lat: raw.company?.coordinate_lat ?? null,
    lon: raw.company?.coordinate_lon ?? null,
    currency: raw.company?.currency_short_title || '₫',
  },
  categories,
  services,
  specialists,
  stats: {
    categories: categories.length,
    services: services.length,
    specialists: specialists.length,
    mappedServices: services.filter(service => service.specialistIds.length).length,
    unmappedServices: services.filter(service => !service.specialistIds.length).length,
  },
};

await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, JSON.stringify(normalized, null, 2) + '\n');
console.log(normalized.stats);
