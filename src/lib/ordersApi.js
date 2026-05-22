import axios from 'axios';
import { API_BASE } from './cartApi';

const ordersApi = axios.create({
  baseURL: `${API_BASE}/backend/orders_api.php`,
  withCredentials: true,
});

export async function fetchOrders(highlight = null) {
  const params = { action: 'list' };
  if (highlight) params.highlight = highlight;
  const { data } = await ordersApi.get('', { params });
  return data;
}

export async function cancelOrder(orderId) {
  const { data } = await ordersApi.post('', { action: 'cancel', order_id: orderId });
  return data;
}

export async function buyAgain(orderId) {
  const { data } = await ordersApi.post('', { action: 'buy_again', order_id: orderId });
  return data;
}
