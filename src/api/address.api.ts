import { apiRequest } from '@/common/utils/apiUtils'
import type { Address, CreateAddressDTO, UpdateAddressDTO } from '@/types/address'

/**
 * Get all addresses for the current user
 */
export async function getUserAddresses(): Promise<Address[]> {
  return apiRequest<Address[]>({
    method: 'GET',
    url: '/users/me/addresses',
  }) as Promise<Address[]>
}

/**
 * Get all addresses for a specific user (admin only)
 */
export async function getAddressesByUserId(userId: string): Promise<Address[]> {
  return apiRequest<Address[]>({
    method: 'GET',
    url: `/users/${userId}/addresses`,
  }) as Promise<Address[]>
}

/**
 * Get an address by ID
 */
export async function getAddressById(id: string): Promise<Address> {
  return apiRequest<Address>({
    method: 'GET',
    url: `/users/addresses/${id}`,
  }) as Promise<Address>
}

/**
 * Create a new address for the current user
 */
export async function createAddress(data: Omit<CreateAddressDTO, 'userId'>): Promise<Address> {
  return apiRequest<Address>({
    method: 'POST',
    url: '/users/addresses',
    data,
  }) as Promise<Address>
}

/**
 * Update an address
 */
export async function updateAddress(id: string, data: UpdateAddressDTO): Promise<Address> {
  return apiRequest<Address>({
    method: 'PUT',
    url: `/users/addresses/${id}`,
    data,
  }) as Promise<Address>
}

/**
 * Delete an address
 */
export async function deleteAddress(id: string): Promise<void> {
  return apiRequest({
    method: 'DELETE',
    url: `/users/addresses/${id}`,
  }) as Promise<void>
}
