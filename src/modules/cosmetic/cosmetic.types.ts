import type { CosmeticBadge } from './submodules/badge/cosmeticBadge.types'
import type { CosmeticBenefit } from './submodules/benefit/cosmeticBenefit.types'
import type { CosmeticDistributor } from './submodules/distributor/cosmeticDistributor.types'
import type { VariantResponse } from './submodules/option/cosmesticOptions.types'
import type { CosmeticReview } from './submodules/review/cosmeticReview.types'
import type { ShippingPolicy } from './submodules/shipping/shippingPolicy.types'
import type { CosmeticSpecification } from './submodules/specification/cosmeticSpecification.types'

export interface CosmeticResponse {
  id: string
  name: string
  image: string
  price: number
  stock: number
  description?: string
  distributor?: CosmeticDistributor
  variants: VariantResponse[]
  usageInstructions?: string
  averageRating?: number
  totalReviews?: number
  benefits?: CosmeticBenefit[]
  badges?: CosmeticBadge[]
  shippingPolicy?: ShippingPolicy
  reviews?: CosmeticReview[]
  specifications?: CosmeticSpecification[]
  createdAt: string
  updatedAt: string
}
