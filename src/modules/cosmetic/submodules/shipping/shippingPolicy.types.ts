export interface ShippingFeature {
  id: string
  shippingPolicyId: string
  title: string
  description: string
  icon: string
  orderIndex: number
}

export interface ShippingPolicy {
  id: string
  name: string
  description: string
  deliveryTime: string
  freeShippingThreshold?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  features: ShippingFeature[]
}
