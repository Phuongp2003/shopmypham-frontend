import { api } from '@/plugins/axios';
import type { Comment } from './comment.types';

export const getCommentsByPostIdApi = async (postId: string): Promise<Comment[]> => {
    const response = await api.get<Comment[]>(`/posts/${postId}/comments`).catch((err) => {
        throw new Error(err.response.data.message);
    });
    return response.data;
};

export const createCommentApi = async (postId: string, content: string): Promise<Comment> => {
    const response = await api
        .post<Comment>(`/posts/${postId}/comments`, { content })
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return response.data;
};

export const deleteCommentApi = async (commentId: string): Promise<void> => {
    await api.delete(`/comments/${commentId}`).catch((err) => {
        throw new Error(err.response.data.message);
    });
};
