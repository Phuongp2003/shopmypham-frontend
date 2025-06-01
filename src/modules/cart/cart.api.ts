import { api } from '@/plugins/axios';
import type { AddToCartDto, UpdateCartItemDto, RemoveCartItemDto } from './cart.dto';
import type { GetUserCartRes } from './cart.dto';
import type { CosmeticVariant } from '../cosmetic/submodules/variant/cosmeticVariant.types';

export const getCartApi = async (userId: string): Promise<GetUserCartRes> => {
    const response = await api.get<GetUserCartRes>(`/cart`, { params: { userId } }).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const addToCartApi = async (
    variantId: string,
    quantity: number,
): Promise<GetUserCartRes> => {
    const response = await api
        .put<GetUserCartRes>(`/cart/${variantId}`, { quantity })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return response.data;
};

export const updateCartItemApi = async (data: UpdateCartItemDto): Promise<CosmeticVariant> => {
    const response = await api.put<CosmeticVariant>(`/cart`, data).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const removeCartItemApi = async (data: RemoveCartItemDto): Promise<GetUserCartRes> => {
    const response = await api.delete<GetUserCartRes>(`/cart/${data.variantId}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const clearCartApi = async (): Promise<GetUserCartRes> => {
    const response = await api.delete<GetUserCartRes>('/cart').catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};
