import { api } from '@/plugins/axios';
import type { ShippingPolicy } from './shippingPolicy.types';

export const getAllShippingPoliciesApi = async () => {
    const response = await api.get('/cosmetics/shipping-policies').catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const getShippingPolicyByIdApi = async (id: string) => {
    const response = await api.get(`/cosmetics/shipping-policies/${id}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const createShippingPolicyApi = async (data: any) => {
    const response = await api.post('/cosmetics/shipping-policies/create', data).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const updateShippingPolicyApi = async (id: string, data: any) => {
    const response = await api.put(`/cosmetics/shipping-policies/${id}`, data).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const deleteShippingPolicyApi = async (id: string) => {
    const response = await api.delete(`/cosmetics/shipping-policies/${id}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};
