import { api } from '@/plugins/axios';
import type { CosmeticReviewCreateReq, CosmeticReviewUpdateReq } from './cosmeticReview.dto';

export const getAllReviewsApi = async () => {
  const response = await api.get('/cosmetics/reviews');
  return response.data;
};

export const getReviewByIdApi = async (id: string) => {
  const response = await api.get(`/cosmetics/reviews/${id}`);
  return response.data;
};

export const getReviewsByCosmeticApi = async (cosmeticId: string) => {
  const response = await api.get(`/cosmetics/reviews/cosmetic/${cosmeticId}`);
  return response.data;
};

export const createReviewApi = async (data: CosmeticReviewCreateReq) => {
  const response = await api.post('/cosmetics/reviews', data);
  return response.data;
};

export const updateReviewApi = async (id: string, data: CosmeticReviewUpdateReq) => {
  const response = await api.put(`/cosmetics/reviews/${id}`, data);
  return response.data;
};

export const deleteReviewApi = async (id: string) => {
  const response = await api.delete(`/cosmetics/reviews/${id}`);
  return response.data;
};
