import { API_BASE } from './cartApi';

export async function fetchTracking(trackingId) {
  const normalized = String(trackingId || '').trim().toUpperCase().replace(/\s+/g, '');
  const res = await fetch(
    `${API_BASE}/backend/tracking_api.php?tracking_id=${encodeURIComponent(normalized)}`,
    { headers: { Accept: 'application/json' }, credentials: 'include' }
  );
  const data = await res.json();
  if (!res.ok && data?.message) {
    return { ok: false, message: data.message };
  }
  return data;
}
