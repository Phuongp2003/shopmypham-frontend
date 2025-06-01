<script setup lang="ts">
import { useCosmeticCreateStore } from '@/modules/cosmetic/stores/useCosmeticCreateStore'
import type { BadgeType } from '@/modules/cosmetic/submodules/badge/cosmeticBadge.types'
const cosmetic = useCosmeticCreateStore()
const badgeTypeOptions = [
  { label: 'MADE_IN', value: 'MADE_IN' },
  { label: 'QUALITY', value: 'QUALITY' },
  { label: 'SHIPPING', value: 'SHIPPING' },
  { label: 'RETURN_POLICY', value: 'RETURN_POLICY' },
  { label: 'WARRANTY', value: 'WARRANTY' },
  { label: 'CERTIFICATION', value: 'CERTIFICATION' }
]
</script>
<template>
  <div class="space-y-4 border rounded-lg shadow p-6">
    <div v-for="(badge, idx) in cosmetic.form.badges" :key="idx" class="border rounded-lg shadow p-4 relative bg-primary-200 dark:bg-primary-900">
      <div class="absolute top-2 right-2">
        <UButton size="xs" color="red" @click="cosmetic.removeBadge(idx)">Xóa</UButton>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
        <UFormField label="Loại badge" :name="`badgeType-${idx}`">
          <USelect v-model="badge.badgeType" :items="badgeTypeOptions" placeholder="Loại badge" class="w-full" />
        </UFormField>
        <UFormField label="Tiêu đề" :name="`title-${idx}`">
          <UInput v-model="badge.title" placeholder="Tiêu đề" class="w-full" />
        </UFormField>
        <UFormField label="Icon" :name="`icon-${idx}`">
          <UInput v-model="badge.icon" placeholder="Icon (tùy chọn)" class="w-full" />
        </UFormField>
        <UFormField label="Màu sắc" :name="`color-${idx}`">
          <UInput v-model="badge.color" placeholder="Màu sắc (tùy chọn)" class="w-full" />
        </UFormField>
        <UFormField label="Thứ tự" :name="`orderIndex-${idx}`">
          <UInput v-model.number="badge.orderIndex" type="number" min="0" placeholder="Order (tùy chọn)" class="w-full" />
        </UFormField>
        <UFormField label="Kích hoạt" :name="`isActive-${idx}`">
          <UCheckbox v-model="badge.isActive" label="" />
        </UFormField>
      </div>
    </div>
    <div class="flex justify-start">
      <UButton size="xs" @click="cosmetic.addBadge">Thêm badge</UButton>
    </div>
  </div>
</template>
