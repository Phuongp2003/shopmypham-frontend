import type { Paginated } from '@/common/api.type';

export interface PostQueryParamsSchema {
    authorId?: string; // ID người dùng (nếu cần lọc theo người dùng)
    published?: boolean;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface CreatePostDto {
    title: string;
    content: string;
    published: boolean; // Trạng thái công khai của bài viết
    description: string;
    image: string;
    createdAt?: Date; // Ngày tạo bài viết
    updatedAt?: Date; // Ngày cập nhật bài viết
}

export interface PostResponse {
    id: string;
    title: string;
    content: string;
    published: boolean;
    description: string;
    image: string;
    slug: string;
    authorId: string; // ID của người viết bài
    comments?: string[]; // ID của các bình luận liên quan
    createdAt: Date; // Ngày tạo bài viết
    updatedAt: Date; // Ngày cập nhật bài viết
}

export interface PaginatedPostResponse extends Paginated {
    posts: PostResponse[];
}

export type SuccessResponse = {
    message: string;
};
