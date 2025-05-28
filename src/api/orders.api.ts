import { apiRequest } from '@/common/utils/apiUtils'
import type { PaginatedResponse, QueryParams } from '@/types/api.type'
import type { Order } from '@/types/order/order.type'
import type { CreateOrderDTO, UpdateOrderStatusDTO } from '@/types/order/order.dto'

/**
 * Get all orders with optional filtering and pagination
 */
export async function getOrders(params?: QueryParams): Promise<PaginatedResponse<Order>> {
  return apiRequest<PaginatedResponse<Order>>({
    method: 'GET',
    url: '/orders',
    params,
  }) as Promise<PaginatedResponse<Order>>
}

/**
 * Get an order by ID
 */
export async function getOrderById(id: string): Promise<Order> {
  return apiRequest<Order>({
    method: 'GET',
    url: `/orders/${id}`,
  }) as Promise<Order>
}

/**
 * Create a new order
 */
export async function createOrder(data: CreateOrderDTO): Promise<Order> {
  return apiRequest<Order>({
    method: 'POST',
    url: '/orders',
    data,
  }) as Promise<Order>
}

/**
 * Update order status
 */
export async function updateOrderStatus(id: string, data: UpdateOrderStatusDTO): Promise<Order> {
  return apiRequest<Order>({
    method: 'PATCH',
    url: `/orders/${id}/status`,
    data,
  }) as Promise<Order>
}

/**
 * Cancel an order
 */
export async function cancelOrder(id: string): Promise<Order> {
  return apiRequest<Order>({
    method: 'POST',
    url: `/orders/${id}/cancel`,
  }) as Promise<Order>
}
