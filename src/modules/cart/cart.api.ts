import { api } from '@/plugins/axios';
import type { AddToCartDto, UpdateCartItemDto, RemoveCartItemDto } from './cart.dto';
import type { GetUserCartRes } from './cart.dto';
import type { CosmeticVariant } from '../cosmetic/submodules/variant/cosmeticVariant.types';

export const getCartApi = async (userId: string): Promise<GetUserCartRes> => {
    const response = await api.get<GetUserCartRes>(`/cart`, { params: { userId } });
    return response.data;
};

export const addToCartApi = async (data: AddToCartDto): Promise<GetUserCartRes> => {
    const response = await api.post<GetUserCartRes>('/cart/items', data);
    return response.data;
};

export const updateCartItemApi = async (data: UpdateCartItemDto): Promise<CosmeticVariant> => {
    const response = await api.put<CosmeticVariant>(`/cart`, data);
    return response.data;
};

export const removeCartItemApi = async (data: RemoveCartItemDto): Promise<GetUserCartRes> => {
    const response = await api.delete<GetUserCartRes>(`/cart/${data.variantId}`);
    return response.data;
};

export const clearCartApi = async (): Promise<GetUserCartRes> => {
    const response = await api.delete<GetUserCartRes>('/cart');
    return response.data;
};
