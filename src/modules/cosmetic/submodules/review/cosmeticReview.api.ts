import { api } from '@/plugins/axios';
import type { CosmeticReviewCreateReq, CosmeticReviewUpdateReq } from './cosmeticReview.dto';

export const getAllReviewsApi = async () => {
    const response = await api.get('/cosmetics/reviews').catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const getReviewByIdApi = async (id: string) => {
    const response = await api.get(`/cosmetics/reviews/${id}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const getReviewsByCosmeticApi = async (cosmeticId: string) => {
    const response = await api.get(`/cosmetics/reviews/cosmetic/${cosmeticId}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const createReviewApi = async (data: CosmeticReviewCreateReq) => {
    const response = await api.post('/cosmetics/reviews', data).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const updateReviewApi = async (id: string, data: CosmeticReviewUpdateReq) => {
    const response = await api.put(`/cosmetics/reviews/${id}`, data).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const deleteReviewApi = async (id: string) => {
    const response = await api.delete(`/cosmetics/reviews/${id}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};
