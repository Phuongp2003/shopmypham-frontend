import { OrderStatus } from './order.enum'

export interface OrderDetail {
  id: string
  orderId: string
  cosmeticId: string
  quantity: number
  price: number
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  status: OrderStatus
  shippingAddress: string
  note: string
  details: OrderDetail[]
  createdAt: string
  updatedAt: string
}
