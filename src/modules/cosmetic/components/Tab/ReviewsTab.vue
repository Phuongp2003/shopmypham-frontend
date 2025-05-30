<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">Đánh giá sản phẩm</h3>
      <UButton color="primary">
        Viết đánh giá
      </UButton>
    </div>

    <!-- Reviews Summary -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700">
      <div class="flex items-center space-x-4">
        <div class="text-center">
          <div class="text-3xl font-bold text-gray-900 dark:text-white">{{ averageRating?.toFixed(1) || '0.0' }}</div>
          <div class="flex items-center justify-center">
            <span v-for="i in 5" :key="i" :class="{
              'text-yellow-400': i <= Math.floor(averageRating || 0),
              'text-gray-300 dark:text-gray-600': i > Math.floor(averageRating || 0)
            }">★</span>
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ totalReviews || 0 }} đánh giá</div>
        </div>
        <div class="flex-1">
          <!-- Rating breakdown would go here -->
        </div>
      </div>
    </div>

    <!-- Reviews List -->
    <div v-if="reviews && reviews.length > 0" class="space-y-4">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700"
      >
        <div class="flex items-start justify-between mb-3">
          <div>
            <div class="flex items-center space-x-2">
              <span class="font-semibold text-gray-900 dark:text-white">{{ review.userName || 'Người dùng ẩn danh' }}</span>
              <UBadge v-if="review.isVerified" color="green" size="sm">
                Đã mua hàng
              </UBadge>
            </div>
            <div class="flex items-center">
              <span v-for="i in 5" :key="i" :class="{
                'text-yellow-400': i <= review.rating,
                'text-gray-300 dark:text-gray-600': i > review.rating
              }">★</span>
            </div>
          </div>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(review.createdAt) }}</span>
        </div>
        <h4 v-if="review.title" class="font-semibold text-gray-900 dark:text-white mb-2">{{ review.title }}</h4>
        <p class="text-gray-700 dark:text-gray-300">{{ review.content }}</p>
      </div>
    </div>
    <div v-else class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">Chưa có đánh giá nào cho sản phẩm này.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CosmeticReview } from '@/modules/cosmetic/submodules/review/cosmeticReview.types'

defineProps<{
  reviews: CosmeticReview[]
  averageRating?: number
  totalReviews?: number
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('vi-VN')
}
</script>
