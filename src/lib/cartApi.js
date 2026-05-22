import axios from 'axios';

export const API_BASE = 'http://localhost/Project';

const cartApi = axios.create({
  baseURL: `${API_BASE}/backend/cart_api.php`,
  withCredentials: true,
});

export async function fetchCart(buyId = null) {
  const params = { action: 'get' };
  if (buyId) params.buy = buyId;
  const { data } = await cartApi.get('', { params });
  return data;
}

export async function fetchCartConfig() {
  const { data } = await cartApi.get('', { params: { action: 'config' } });
  return data;
}

export async function addToCart(payload) {
  const { data } = await cartApi.post('', { action: 'add', ...payload });
  return data;
}

export async function updateCartItem(payload) {
  const { data } = await cartApi.post('', { action: 'update', ...payload });
  return data;
}

export async function removeCartItem(productId) {
  const { data } = await cartApi.post('', { action: 'remove', product_id: productId });
  return data;
}

export async function clearCart() {
  const { data } = await cartApi.post('', { action: 'clear' });
  return data;
}

export async function placeOrder(payload) {
  const { data } = await cartApi.post('', { action: 'place_order', ...payload });
  return data;
}

export async function fetchCartCount() {
  const res = await fetch(`${API_BASE}/backend/cart_count.php`, { credentials: 'include' });
  return res.json();
}
