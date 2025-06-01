import { api } from '@/plugins/axios';
import type {
    CreateOrderDto,
    OrderQueryDto,
    OrderResponse,
    PaginatedOrderResponse,
} from './order.dto';

export const getAllOrdersApi = async (params: OrderQueryDto): Promise<PaginatedOrderResponse> => {
    const response = await api.get<PaginatedOrderResponse>('/orders', { params }).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const getAllOrdersManagerApi = async (
    params: OrderQueryDto,
): Promise<PaginatedOrderResponse> => {
    const response = await api
        .get<PaginatedOrderResponse>('/orders/admin', { params })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return response.data;
};

export const getOrderByIdApi = async (id: string): Promise<OrderResponse> => {
    const response = await api.get<OrderResponse>(`/orders/${id}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const createOrderApi = async (order: CreateOrderDto): Promise<OrderResponse> => {
    const response = await api.post<OrderResponse>('/orders', order).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const updateOrderApi = async (
    id: string,
    order: Partial<CreateOrderDto>,
): Promise<OrderResponse> => {
    const response = await api.put<OrderResponse>(`/orders/${id}`, order).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};
export const updateOrderStatusApi = async (id: string, status: string): Promise<void> => {
    await api.patch(`/orders/${id}`, { status }).catch((err) => {
        throw new Error(err.response.data.message);
    });
};

export const deleteOrderApi = async (id: string): Promise<void> => {
    await api.delete(`/orders/${id}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
};
