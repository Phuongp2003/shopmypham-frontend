import { api } from '@/plugins/axios';
import type { UploadResponse } from './upload.types';

/**
 * Upload an image file to the server
 * @param file File object (image)
 * @returns UploadResponse
 */
export const uploadImageApi = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post<UploadResponse>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
