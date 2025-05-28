import { apiRequest } from '@/common/utils/apiUtils'
import type { PaginatedResponse, QueryParams } from '@/types/api.type'
import type { Cosmetic } from '@/types/cosmetic/cosmetic.type'
import type { CreateCosmeticDTO, UpdateCosmeticDTO } from '@/types/cosmetic/cosmetic.dto'

/**
 * Get all cosmetics with optional filtering and pagination
 */
export async function getCosmetics(params?: QueryParams): Promise<PaginatedResponse<Cosmetic>> {
  return apiRequest<PaginatedResponse<Cosmetic>>({
    method: 'GET',
    url: '/cosmetics',
    params,
  }) as Promise<PaginatedResponse<Cosmetic>>
}

/**
 * Get a cosmetic by ID
 */
export async function getCosmeticById(id: string): Promise<Cosmetic> {
  return apiRequest<Cosmetic>({
    method: 'GET',
    url: `/cosmetics/${id}`,
  }) as Promise<Cosmetic>
}

/**
 * Create a new cosmetic
 */
export async function createCosmetic(data: CreateCosmeticDTO): Promise<Cosmetic> {
  return apiRequest<Cosmetic>({
    method: 'POST',
    url: '/cosmetics',
    data,
  }) as Promise<Cosmetic>
}

/**
 * Update an existing cosmetic
 */
export async function updateCosmetic(id: string, data: UpdateCosmeticDTO): Promise<Cosmetic> {
  return apiRequest<Cosmetic>({
    method: 'PUT',
    url: `/cosmetics/${id}`,
    data,
  }) as Promise<Cosmetic>
}

/**
 * Delete a cosmetic
 */
export async function deleteCosmetic(id: string): Promise<void> {
  return apiRequest({
    method: 'DELETE',
    url: `/cosmetics/${id}`,
  }) as Promise<void>
}
