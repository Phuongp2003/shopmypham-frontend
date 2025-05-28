export interface CreateCosmeticDTO {
  name: string
  description: string
  price: number
  stock: number
  image: string
  category: string
  brand: string
}

export interface UpdateCosmeticDTO {
  name?: string
  description?: string
  price?: number
  stock?: number
  image?: string
  category?: string
  brand?: string
}
