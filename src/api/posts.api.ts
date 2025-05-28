import { apiRequest } from '@/utils/apiUtils'
import type { PaginatedResponse, QueryParams } from '@/types/api.type'
import type { Post } from '@/types/post/post.type'
import type { CreatePostDTO, UpdatePostDTO } from '@/types/post/post.dto'

/**
 * Get all posts with optional filtering and pagination
 */
export async function getPosts(params?: QueryParams): Promise<PaginatedResponse<Post>> {
  return apiRequest<PaginatedResponse<Post>>({
    method: 'GET',
    url: '/posts',
    params,
  }) as Promise<PaginatedResponse<Post>>
}

/**
 * Get a post by ID
 */
export async function getPostById(id: string): Promise<Post> {
  return apiRequest<Post>({
    method: 'GET',
    url: `/posts/${id}`,
  }) as Promise<Post>
}

/**
 * Create a new post
 */
export async function createPost(data: CreatePostDTO): Promise<Post> {
  return apiRequest<Post>({
    method: 'POST',
    url: '/posts',
    data,
  }) as Promise<Post>
}

/**
 * Update an existing post
 */
export async function updatePost(id: string, data: UpdatePostDTO): Promise<Post> {
  return apiRequest<Post>({
    method: 'PUT',
    url: `/posts/${id}`,
    data,
  }) as Promise<Post>
}

/**
 * Delete a post
 */
export async function deletePost(id: string): Promise<void> {
  return apiRequest({
    method: 'DELETE',
    url: `/posts/${id}`,
  }) as Promise<void>
}
