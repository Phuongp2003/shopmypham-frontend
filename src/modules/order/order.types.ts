import type { User } from '@/modules/user/user.types';
import type { CosmeticVariant } from '@/modules/cosmetic/submodules/variant/cosmeticVariant.types';

export type Order = {
    id: string;
    userId: string;
    status: OrderStatus;
    addressId: string;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
    address: Address;
    user: User;
    details: OrderDetail[];
    payments: Payment[];
};

export type OrderDetail = {
    id: string;
    orderId: string;
    variantId: string;
    quantity: number;
    price: number;
    order: Order;
    variant: CosmeticVariant;
};

export type Address = {
    id: string;
    userId: string;
    recipientName: string;
    phone: string;
    addressLine: string;
    district: string;
    city: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type Payment = {
    id: string;
    amount: number;
    status: OrderStatus;
    paymentMethod: string;
    transactionId: string;
    createdAt: Date;
    updatedAt: Date;
    order: Order;
};

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
