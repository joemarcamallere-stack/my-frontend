import axios from 'axios';

export const API_BASE = 'https://jojoscoops.kesug.com/';

const adminApi = axios.create({
  baseURL: `${API_BASE}/backend/admin_api.php`,
  withCredentials: true,
});

export function projectAsset(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE}/${path.replace(/^\//, '')}`;
}

export async function fetchStats() {
  const { data } = await adminApi.get('', { params: { action: 'stats' } });
  return data;
}

export async function fetchNotifications(limit = 20) {
  const { data } = await adminApi.get('', { params: { action: 'notifications', limit } });
  return data;
}

export async function notificationAction(payload) {
  const { data } = await adminApi.post('', payload, { params: { action: 'notification_action' } });
  return data;
}

export async function fetchUsers() {
  const { data } = await adminApi.get('', { params: { action: 'users' } });
  return data;
}

export async function fetchUser(id) {
  const { data } = await adminApi.get('', { params: { action: 'user', id } });
  return data;
}

export async function updateUser(payload) {
  const { data } = await adminApi.post('', payload, { params: { action: 'update_user' } });
  return data;
}

export async function resetUserPassword(id) {
  const { data } = await adminApi.post('', { id }, { params: { action: 'reset_user_password' } });
  return data;
}

export async function fetchAdminProducts() {
  const { data } = await adminApi.get('', { params: { action: 'products' } });
  return data;
}

export async function fetchProduct(id) {
  const { data } = await adminApi.get('', { params: { action: 'product', id } });
  return data;
}

export async function addProduct(formData) {
  const { data } = await axios.post(`${API_BASE}/backend/admin_api.php?action=add_product`, formData, {
    withCredentials: true,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateProduct(formData) {
  const { data } = await axios.post(`${API_BASE}/backend/admin_api.php?action=update_product`, formData, {
    withCredentials: true,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function fetchStaffList() {
  const { data } = await adminApi.get('', { params: { action: 'staff_list' } });
  return data;
}

export async function fetchStaffMember(id) {
  const { data } = await adminApi.get('', { params: { action: 'staff_member', id } });
  return data;
}

export async function addStaff(payload) {
  const { data } = await adminApi.post('', payload, { params: { action: 'add_staff' } });
  return data;
}

export async function updateStaff(payload) {
  const { data } = await adminApi.post('', payload, { params: { action: 'update_staff' } });
  return data;
}

export async function deleteStaff(id) {
  const { data } = await adminApi.post('', { id }, { params: { action: 'delete_staff' } });
  return data;
}

export async function fetchOrders() {
  const { data } = await adminApi.get('', { params: { action: 'orders' } });
  return data;
}

export async function updateOrderStatus(id, status) {
  const { data } = await adminApi.post('', { id, status }, { params: { action: 'update_order_status' } });
  return data;
}

export async function checkAuth() {
  const { data } = await axios.get(`${API_BASE}/backend/auth_api.php?action=check_auth`, { withCredentials: true });
  return data;
}

export async function logout() {
  const { data } = await axios.post(
    `${API_BASE}/backend/auth_api.php?action=logout`,
    {},
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return data;
}

/** Clear client-side session hint used after logout */
export function clearAuthClientState() {
  try {
    sessionStorage.removeItem('creamy_auth');
    localStorage.removeItem('creamy_auth');
  } catch {
    /* ignore */
  }
}

export function markAuthClientState(role, user) {
  try {
    sessionStorage.setItem('creamy_auth', JSON.stringify({ role, user, at: Date.now() }));
  } catch {
    /* ignore */
  }
}

export default adminApi;
