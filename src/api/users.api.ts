import { apiRequest } from '@/common/utils/apiUtils'
import type { PaginatedResponse, QueryParams } from '@/types/api.type'
import type { User } from '@/types/user/user.type'
import type { LoginDTO, CreateUserDTO, UpdateUserDTO, TokenResponse } from '@/types/user/user.dto'
import { setTokens, clearTokens } from '@/plugins/axios'

interface LoginResponse extends TokenResponse {
  user: User
}

/**
 * Login a user
 */
export async function login(credentials: LoginDTO): Promise<LoginResponse> {
  const response = (await apiRequest<LoginResponse>({
    method: 'POST',
    url: '/auth/login',
    data: credentials,
  })) as LoginResponse

  // Store tokens
  setTokens(response.accessToken, response.refreshToken)

  return response
}

/**
 * Register a new user
 */
export async function register(data: CreateUserDTO): Promise<User> {
  return apiRequest<User>({
    method: 'POST',
    url: '/auth/register',
    data,
  }) as Promise<User>
}

/**
 * Refresh the access token using the refresh token
 */
export async function refreshToken(): Promise<TokenResponse> {
  const response = (await apiRequest<TokenResponse>({
    method: 'POST',
    url: '/auth/refresh-token',
  })) as TokenResponse

  // Update stored tokens
  setTokens(response.accessToken, response.refreshToken)

  return response
}

/**
 * Logout the current user
 */
export async function logout(): Promise<void> {
  await apiRequest({
    method: 'POST',
    url: '/auth/logout',
  })

  // Clear stored tokens
  clearTokens()
}

/**
 * Get the current user's information
 */
export async function getCurrentUser(): Promise<User> {
  return apiRequest<User>({
    method: 'GET',
    url: '/users/me',
  }) as Promise<User>
}

/**
 * Update the current user's information
 */
export async function updateCurrentUser(data: UpdateUserDTO): Promise<User> {
  return apiRequest<User>({
    method: 'PUT',
    url: '/users/me',
    data,
  }) as Promise<User>
}

/**
 * Get all users (admin only)
 */
export async function getUsers(params?: QueryParams): Promise<PaginatedResponse<User>> {
  return apiRequest<PaginatedResponse<User>>({
    method: 'GET',
    url: '/users',
    params,
  }) as Promise<PaginatedResponse<User>>
}

/**
 * Get a user by ID
 */
export async function getUserById(id: string): Promise<User> {
  return apiRequest<User>({
    method: 'GET',
    url: `/users/${id}`,
  }) as Promise<User>
}

/**
 * Update a user
 */
export async function updateUser(id: string, data: UpdateUserDTO): Promise<User> {
  return apiRequest<User>({
    method: 'PUT',
    url: `/users/${id}`,
    data,
  }) as Promise<User>
}

/**
 * Delete a user
 */
export async function deleteUser(id: string): Promise<void> {
  return apiRequest({
    method: 'DELETE',
    url: `/users/${id}`,
  }) as Promise<void>
}
