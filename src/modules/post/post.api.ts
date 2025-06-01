import { api } from '@/plugins/axios';
import type {
  PostCreateInput,
  Post,
  PostUpdateInput,
} from './post.types';
import type { PaginatedPostResponse } from './post.dto';

export const getAllPostsApi = async (params: any = {}): Promise<PaginatedPostResponse> => {
  const response = await api.get<PaginatedPostResponse>('/post', { params }).catch((err) => {
    throw new Error(err.response?.data?.message || err.message);
  });
  return response.data;
};

export const getPostByIdApi = async (id: string): Promise<Post> => {
  const response = await api.get(`/post/${id}`).catch((err) => {
    throw new Error(err.response?.data?.message || err.message);
  });
  return response.data;
};

export const createPostApi = async (data: PostCreateInput): Promise<Post> => {
  const response = await api.post('/post', data).catch((err) => {
    throw new Error(err.response?.data?.message || err.message);
  });
  return response.data;
};

export const updatePostApi = async (id: string, data: PostUpdateInput): Promise<Post> => {
  const response = await api.put(`/post/${id}`, data).catch((err) => {
    throw new Error(err.response?.data?.message || err.message);
  });
  return response.data;
};

export const deletePostApi = async (id: string): Promise<void> => {
  await api.delete(`/post/${id}`).catch((err) => {
    throw new Error(err.response?.data?.message || err.message);
  });
};
