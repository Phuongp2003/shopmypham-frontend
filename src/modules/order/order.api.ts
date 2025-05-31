import { api } from '@/plugins/axios';
import type {
    CreateOrderDto,
    OrderQueryDto,
    OrderResponse,
    PaginatedOrderResponse
} from './order.dto';

export const getAllOrdersApi = async (
    params: OrderQueryDto
): Promise<PaginatedOrderResponse> => {
    const response = await api.get<PaginatedOrderResponse>('/orders', { params });
    return response.data;
};

export const getOrderByIdApi = async (id: string): Promise<OrderResponse> => {
    const response = await api.get<OrderResponse>(`/orders/${id}`);
    return response.data;
};

export const createOrderApi = async (order: CreateOrderDto): Promise<OrderResponse> => {
    const response = await api.post<OrderResponse>('/orders', order);
    return response.data;
};

export const updateOrderApi = async (
    id: string,
    order: Partial<CreateOrderDto>
): Promise<OrderResponse> => {
    const response = await api.put<OrderResponse>(`/orders/${id}`, order);
    return response.data;
};

export const deleteOrderApi = async (id: string): Promise<void> => {
    await api.delete(`/orders/${id}`);
};
