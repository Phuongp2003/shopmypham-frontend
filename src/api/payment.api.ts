import { apiRequest } from '@/common/utils/apiUtils'

// Payment DTOs
interface CreatePaymentDTO {
  orderId: string
  method: string
  amount: number
}

interface CreateMomoPaymentDTO {
  orderId: string
  amount: number
  redirectUrl: string
}

// Payment types
interface Payment {
  id: string
  orderId: string
  method: string
  amount: number
  status: string
  transactionId?: string
  createdAt: string
  updatedAt: string
}

interface MomoPaymentResponse {
  payUrl: string
  transactionId: string
}

/**
 * Create a new payment
 */
export async function createPayment(data: CreatePaymentDTO): Promise<Payment> {
  return apiRequest<Payment>({
    method: 'POST',
    url: '/payment',
    data,
  }) as Promise<Payment>
}

/**
 * Create a MOMO payment
 */
export async function createMomoPayment(data: CreateMomoPaymentDTO): Promise<MomoPaymentResponse> {
  return apiRequest<MomoPaymentResponse>({
    method: 'POST',
    url: '/payment/momo',
    data,
  }) as Promise<MomoPaymentResponse>
}

/**
 * Get payment by ID
 */
export async function getPaymentById(id: string): Promise<Payment> {
  return apiRequest<Payment>({
    method: 'GET',
    url: `/payment/${id}`,
  }) as Promise<Payment>
}
