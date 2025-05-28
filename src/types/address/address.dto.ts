export interface CreateAddressDTO {
  userId: string
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  isDefault?: boolean
}

export interface UpdateAddressDTO {
  street?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  isDefault?: boolean
}
