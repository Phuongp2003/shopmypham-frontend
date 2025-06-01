<script setup lang="ts">
import { useCosmeticCreateStore } from '@/modules/cosmetic/stores/useCosmeticCreateStore'
const cosmetic = useCosmeticCreateStore()
</script>
<template>
  <div class="space-y-4 border rounded-lg shadow p-6">
    <div v-for="(benefit, idx) in cosmetic.form.benefits" :key="idx" class="border rounded-lg shadow p-4 relative bg-primary-200 dark:bg-primary-900">
      <div class="absolute top-2 right-2">
        <UButton size="xs" color="red" @click="cosmetic.removeBenefit(idx)">Xóa</UButton>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <UFormField label="Key" :name="`benefitKey-${idx}`">
          <UInput v-model="benefit.benefitKey" placeholder="Benefit Key" class="w-full" />
        </UFormField>
        <UFormField label="Value" :name="`benefitValue-${idx}`">
          <UInput v-model="benefit.benefitValue" placeholder="Benefit Value" class="w-full" />
        </UFormField>
        <UFormField label="Thứ tự" :name="`orderIndex-${idx}`">
          <UInput v-model.number="benefit.orderIndex" type="number" min="0" placeholder="Order" class="w-full" />
        </UFormField>
      </div>
    </div>
    <div class="flex justify-start">
      <UButton size="xs" @click="cosmetic.addBenefit">Thêm benefit</UButton>
    </div>
  </div>
</template>
