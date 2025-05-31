import { api } from '@/plugins/axios';
import type { MomoPaymentRequest, MomoPaymentResponse, Payment } from './payment.types';

export const getPaymentsByOrderIdApi = async (orderId: string): Promise<Payment[]> => {
    const response = await api.get<Payment[]>(`/orders/${orderId}/payments`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const createPaymentApi = async (
    orderId: string,
    payment: Partial<Payment>,
): Promise<Payment> => {
    const response = await api
        .post<Payment>(`/orders/${orderId}/payments`, payment)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return response.data;
};

export const paymentViaMomoApi = async (
    payment: Partial<MomoPaymentRequest>,
): Promise<MomoPaymentResponse> => {
    const response = await api
        .post<MomoPaymentResponse>(`/payment/momo`, {
            orderId: payment.orderId,
            amount: payment.amount,
        })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return response.data;
};
