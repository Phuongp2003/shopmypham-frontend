import { api } from '@/plugins/axios';
import type {
    PostCreateInput,
    PostUpdateInput,
    PostQueryParams,
    PostResponse
} from './post.types';

export const getAllPostsApi = async (
    params: PostQueryParams
): Promise<PostResponse[]> => {
    const response = await api.get<PostResponse[]>('/posts', { params });
    return response.data;
};

export const getPostByIdApi = async (id: string): Promise<PostResponse> => {
    const response = await api.get<PostResponse>(`/posts/${id}`);
    return response.data;
};

export const createPostApi = async (data: PostCreateInput): Promise<PostResponse> => {
    const response = await api.post<PostResponse>('/posts', data);
    return response.data;
};

export const updatePostApi = async (
    id: string,
    data: PostUpdateInput
): Promise<PostResponse> => {
    const response = await api.put<PostResponse>(`/posts/${id}`, data);
    return response.data;
};

export const deletePostApi = async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}`);
};
