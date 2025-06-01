import { api } from '@/plugins/axios';
import type { CosmeticBadgeCreateReq, CosmeticBadgeUpdateReq } from './cosmeticBadge.dto';

export const getAllBadgesApi = async () => {
    const response = await api.get('/cosmetics/badges').catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const getBadgeByIdApi = async (id: string) => {
    const response = await api.get(`/cosmetics/badges/${id}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const createBadgeApi = async (data: CosmeticBadgeCreateReq) => {
    const response = await api.post('/cosmetics/badges/create', data).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const updateBadgeApi = async (id: string, data: CosmeticBadgeUpdateReq) => {
    const response = await api.put(`/cosmetics/badges/${id}`, data).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const deleteBadgeApi = async (id: string) => {
    const response = await api.delete(`/cosmetics/badges/${id}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};
