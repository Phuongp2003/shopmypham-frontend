export interface CartItem {
  id: string
  cartId: string
  cosmeticId: string
  quantity: number
  createdAt: string
  updatedAt: string
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  createdAt: string
  updatedAt: string
}
