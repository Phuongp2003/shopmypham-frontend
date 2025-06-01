import type { User } from '@/modules/user/user.types';
import type { Order } from '@/modules/order/order.types';
import type { Address } from './order.types';
import type { Paginated } from '@/common/api.type';
import type { OrderStatus } from '@/modules/order/order.types';

export interface CreateOrderDto {
    addressId: string | null;
    note?: string;
    payment?: {
        paymentMethod: string;
        amount: number;
        transactionId?: string;
        createdAt?: Date;
        updatedAt?: Date;
        status?: 'PENDING' | 'COMPLETED' | 'FAILED';
    };
    details: {
        variantId: string;
        quantity: number;
        price: number;
        name: string;
        image: string;
    }[];
}

export interface OrderQueryDto {
    status?: OrderStatus;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface OrderResponse {
    id: Order['id'];
    userId: string;
    status: OrderStatus;
    address: Address;
    note?: string;
    payment: {
        id: string;
        paymentMethod: string;
        amount: number;
        status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
        transactionId?: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    details: {
        variantId: string;
        quantity: number;
        price: number;
    }[];
    createdAt: Order['createdAt'];
    updatedAt: Order['updatedAt'];
}

export interface PaginatedOrderResponse extends Paginated {
    orders: OrderResponse[];
}
