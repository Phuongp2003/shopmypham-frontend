<template>
  <div class="space-y-4">
    <!-- Quantity and Add to Cart -->
    <div class="flex items-center space-x-4">
      <div class="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
        <UButton
          @click="$emit('decrement')"
          :disabled="quantity <= 1"
          color="gray"
          variant="ghost"
          size="sm"
          icon="i-heroicons-minus"
        />
        <span class="px-4 py-2 min-w-[3rem] text-center text-gray-900 dark:text-white">{{ quantity }}</span>
        <UButton
          @click="$emit('increment')"
          :disabled="quantity >= maxStock"
          color="gray"
          variant="ghost"
          size="sm"
          icon="i-heroicons-plus"
        />
      </div>
      <UButton
        @click="$emit('addToCart')"
        :disabled="!canAddToCart"
        color="primary"
        size="lg"
        block
      >
        {{ maxStock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng' }}
      </UButton>
    </div>

    <!-- Trust Badges from Database -->
    <div v-if="activeBadges && activeBadges.length > 0" class="grid grid-cols-3 gap-4 text-center text-sm">
      <div
        v-for="badge in activeBadges.slice(0, 3)"
        :key="badge.id"
        class="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors"
      >
        <div class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2">
          <span class="text-gray-600 dark:text-gray-400">{{ badge.icon }}</span>
        </div>
        <span class="text-gray-600 dark:text-gray-400">{{ badge.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CosmeticBadge } from '@/modules/cosmetic/submodules/badge/cosmeticBadge.types'

const props = defineProps<{
  quantity: number
  maxStock: number
  canAddToCart: boolean
  badges?: CosmeticBadge[]
}>()

defineEmits<{
  increment: []
  decrement: []
  addToCart: []
}>()

const activeBadges = computed(() => {
  if (!props.badges) return []
  return props.badges
    .filter(badge => badge.isActive)
    .sort((a, b) => a.orderIndex - b.orderIndex)
})
</script>
