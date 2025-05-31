import { api } from '@/plugins/axios';
import type { CosmeticDistributorCreateReq, CosmeticDistributorUpdateReq } from './cosmeticDistributor.dto';

export const getAllDistributorsApi = async (params: any = {}) => {
  const response = await api.get('/cosmetics/distributors', { params });
  return response.data;
};

export const getDistributorByIdApi = async (id: string) => {
  const response = await api.get(`/cosmetics/distributors/${id}`);
  return response.data;
};

export const createDistributorApi = async (data: CosmeticDistributorCreateReq) => {
  const response = await api.post('/cosmetics/distributors/create', data);
  return response.data;
};

export const updateDistributorApi = async (id: string, data: CosmeticDistributorUpdateReq) => {
  const response = await api.put(`/cosmetics/distributors/${id}`, data);
  return response.data;
};

export const deleteDistributorApi = async (id: string) => {
  const response = await api.delete(`/cosmetics/distributors/${id}`);
  return response.data;
};
