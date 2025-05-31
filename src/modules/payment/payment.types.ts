import type { Order } from '@/modules/order/order.types';
export type Payment = {
    id: string;
    orderId: string;
    amount: number;
    status: PaymentStatus;
    paymentMethod: string;
    transactionId?: string;
    createdAt: Date;
    updatedAt: Date;
    order: Order;
};

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export type MomoPaymentRequest = {
    orderId: string;
    amount: number;
}

export type MomoPaymentResponse = {
    partnerCode: string;
    orderId: string;
    requestId: string;
    amount: number;
    responseTime: number;
    message: string;
    resultCode: number;
    payUrl: string;
    deeplink: string;
    qrCodeUrl: string;
    deeplinkMiniApp: string;
}
