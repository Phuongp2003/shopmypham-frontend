<template>
  <RouterLink :to="`/cosmetic/${cosmetic.id}`" class="flex flex-col items-center p-4 mx-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow hover:shadow-lg transition-all">
    <img :src="cosmetic.image || 'https://placehold.co/600x600'" :alt="cosmetic.name" class="w-40 h-40 object-cover rounded-lg mb-2" />
    <div class="font-medium text-center text-gray-800 dark:text-gray-100">
      {{ cosmetic.name }}
    </div>
    <div class="flex flex-col items-center gap-2">
      <div class="font-medium text-sm text-center text-green-700 dark:text-green-400">
        {{ formatPrice(cosmetic.price) }}₫
      </div>
      <div class="text-center text-xs text-gray-500 dark:text-gray-400 truncate w-40">
        {{ cosmetic.description }}
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { CosmeticResponse } from '@/modules/cosmetic/cosmetic.types'
const props = defineProps<{ cosmetic: CosmeticResponse }>()
const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price)
</script>
