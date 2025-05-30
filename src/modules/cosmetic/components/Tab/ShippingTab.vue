<template>
  <div class="space-y-6">
    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Thông tin giao hàng</h3>
    <div v-if="shippingPolicy" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
      <h4 class="font-semibold text-gray-900 dark:text-white mb-2">{{ shippingPolicy.name }}</h4>
      <p class="text-gray-600 dark:text-gray-400 mb-4">{{ shippingPolicy.description }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Thời gian giao hàng: {{ shippingPolicy.deliveryTime }}</p>

      <div v-if="sortedShippingFeatures && sortedShippingFeatures.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div
          v-for="feature in sortedShippingFeatures"
          :key="feature.id"
          class="flex items-center space-x-3"
        >
          <span class="text-green-600 dark:text-green-400">{{ feature.icon || '✓' }}</span>
          <div>
            <span class="text-gray-700 dark:text-gray-300 font-medium">{{ feature.title }}</span>
            <span v-if="feature.description" class="text-gray-500 dark:text-gray-400 ml-1">{{ feature.description }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">Chưa có thông tin chính sách giao hàng.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ShippingPolicy } from '@/modules/cosmetic/submodules/shipping/shippingPolicy.types'

const props = defineProps<{
  shippingPolicy?: ShippingPolicy
}>()

const sortedShippingFeatures = computed(() => {
  if (!props.shippingPolicy?.features) return []
  return props.shippingPolicy.features
    .sort((a, b) => a.orderIndex - b.orderIndex)
})
</script>
