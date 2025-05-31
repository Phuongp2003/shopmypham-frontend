import { api } from '@/plugins/axios';
import type { Payment } from './payment.types';

export const getPaymentsByOrderIdApi = async (orderId: string): Promise<Payment[]> => {
    const response = await api.get<Payment[]>(`/orders/${orderId}/payments`);
    return response.data;
};

export const createPaymentApi = async (orderId: string, payment: Partial<Payment>): Promise<Payment> => {
    const response = await api.post<Payment>(`/orders/${orderId}/payments`, payment);
    return response.data;
};
