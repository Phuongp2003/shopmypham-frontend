<template>
  <div class="space-y-4 ">
    <!-- Product Title and Brand -->
    <div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
        {{ cosmetic?.distributor?.name || 'Premium Brand' }}
      </p>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {{ cosmetic?.name }}
      </h1>

      <!-- Reviews and Ratings -->
      <div class="flex items-center space-x-2">
        <div class="flex items-center">
          <span v-for="i in 5" :key="i" :class="{
            'text-yellow-400': i <= Math.floor(cosmetic?.averageRating || 0),
            'text-gray-300 dark:text-gray-600': i > Math.floor(cosmetic?.averageRating || 0)
          }">★</span>
          <span class="text-gray-600 dark:text-gray-400 ml-2">
            ({{ cosmetic?.averageRating?.toFixed(1) || '0.0' }}) {{ cosmetic?.totalReviews || 0 }} đánh giá
          </span>
        </div>
      </div>
    </div>

    <!-- Pricing -->
    <div class="border-t border-b border-gray-200 dark:border-gray-700 py-4">
      <div class="flex items-center space-x-4">
        <span class="text-3xl font-bold text-green-600 dark:text-green-400">
          {{ formatPrice(cosmetic?.price || 0) }}₫
        </span>
        <span v-if="isOnSale" class="text-xl text-gray-500 dark:text-gray-400 line-through">
          {{ formatPrice((cosmetic?.price || 0) * 1.2) }}₫
        </span>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Giá sản phẩm</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CosmeticResponse } from '@/modules/cosmetic/cosmetic.types'

defineProps<{
  cosmetic?: CosmeticResponse
  isOnSale?: boolean
}>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}
</script>
