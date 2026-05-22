export const STANDARD_SHIPPING_FEE = 45;
export const DELIVERY_SERVICE_AREAS = ['Loon, Bohol', 'Calape, Bohol', 'Tubigon, Bohol'];
export const DELIVERY_KEYWORDS = ['loon', 'calape', 'tubigon'];
export const PICKUP_BRANCHES = [
  { value: 'Barangay Poblacion, Loon, Bohol', label: 'Loon Branch' },
  { value: 'Barangay Poblacion, Calape, Bohol', label: 'Calape Branch' },
  { value: 'Barangay Poblacion, Tubigon, Bohol', label: 'Tubigon Branch' },
];

export function normalizeLocationText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isAllowedDeliveryLocation(value) {
  const normalized = normalizeLocationText(value);
  if (!normalized) return false;
  return DELIVERY_KEYWORDS.some((kw) => normalized.includes(kw))
    || DELIVERY_SERVICE_AREAS.some((area) => normalized.includes(normalizeLocationText(area)));
}

export function formatMoney(amount) {
  return `₱${Number(amount || 0).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function projectImage(path) {
  if (!path) return 'https://jojoscoops.kesug.com/Project/images/ice_cream.png';
  if (path.startsWith('http')) return path;
  return `https://jojoscoops.kesug.com/Project/${path.replace(/^\//, '')}`;
}
