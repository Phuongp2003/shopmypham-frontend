import { apiRequest } from '@/utils/apiUtils'
import type { Cart } from '@/types/cart/cart.type'
import type { AddToCartDTO, UpdateCartItemDTO } from '@/types/cart/cart.dto'

/**
 * Get the current user's cart
 */
export async function getCart(): Promise<Cart> {
  return apiRequest<Cart>({
    method: 'GET',
    url: '/cart',
  }) as Promise<Cart>
}

/**
 * Get cart summary
 */
export interface CartSummary {
  totalItems: number
  subtotal: number
  totalAmount: number
}

export async function getCartSummary(): Promise<CartSummary> {
  return apiRequest<CartSummary>({
    method: 'GET',
    url: '/cart/summary',
  }) as Promise<CartSummary>
}

/**
 * Create a new cart with items
 */
export async function createCart(items: AddToCartDTO[]): Promise<Cart> {
  return apiRequest<Cart>({
    method: 'POST',
    url: '/cart',
    data: { items },
  }) as Promise<Cart>
}

/**
 * Add item to cart
 */
export async function addToCart(item: AddToCartDTO): Promise<Cart> {
  return apiRequest<Cart>({
    method: 'PUT',
    url: '/cart',
    data: { items: [item] },
  }) as Promise<Cart>
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(itemId: string, data: UpdateCartItemDTO): Promise<Cart> {
  return apiRequest<Cart>({
    method: 'PUT',
    url: '/cart',
    data: {
      items: [
        {
          id: itemId,
          quantity: data.quantity,
        },
      ],
    },
  }) as Promise<Cart>
}

/**
 * Remove item from cart
 */
export async function removeFromCart(itemId: string): Promise<Cart> {
  return apiRequest<Cart>({
    method: 'DELETE',
    url: `/cart/items/${itemId}`,
  }) as Promise<Cart>
}

/**
 * Clear the cart
 */
export async function clearCart(): Promise<void> {
  return apiRequest({
    method: 'DELETE',
    url: '/cart',
  }) as Promise<void>
}
