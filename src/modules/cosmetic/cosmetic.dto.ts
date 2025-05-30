import type { QueryParams, Paginated } from '@/common/api.type'
import type { VariantResponse, Cosmetic, CosmeticType } from './cosmetic.types'

export interface CosmeticRes {
  id: Cosmetic['id']
  name: Cosmetic['name']
  description: Cosmetic['description']
  price: Cosmetic['price']
  distributor?: Cosmetic['distributor']
  specifications: Cosmetic['specifications']
  image: Cosmetic['image']
  variants: VariantResponse[]
  stock: Cosmetic['stock']
}
export interface GetAllCosmeticRes {
  id: Cosmetic['id']
  name: Cosmetic['name']
  description: Cosmetic['description']
  price: Cosmetic['price']
  stock: Cosmetic['stock']
}
export interface PaginatedCosmeticRes extends Paginated {
  cosmetics: GetAllCosmeticRes[]
}
export type CosmeticQueryParams = QueryParams & {
  type?: CosmeticType
  minPrice?: number
  maxPrice?: number
  sortBy?: 'price' | 'name' | 'createdAt'
  inStock?: boolean
  hasVariants?: boolean
}
export type CosmeticVariantInput = {
  name: string
  sku: string
  price: number
  stock: number
  optionIds: string[]
}

export type CosmeticSpecificationInput = {
  key: string
  value: string
}

export type CosmeticCreateReq = {
  name: string
  description?: string
  price: number
  stock: number
  type: CosmeticType
  distributorId: string
  specifications?: CosmeticSpecificationInput[]
  variants?: CosmeticVariantInput[]
}

export type CosmeticUpdateReq = Partial<Omit<CosmeticCreateReq, 'variants'>> & {
  variants?: {
    create?: CosmeticVariantInput[]
    update?: (CosmeticVariantInput & { id: string })[]
    delete?: string[]
  }
}
