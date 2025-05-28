import { OrderStatus } from './order.enum'

export interface CreateOrderDTO {
  shippingAddress: string
  note?: string
  items: {
    cosmeticId: string
    quantity: number
  }[]
}

export interface UpdateOrderStatusDTO {
  status: OrderStatus
}
