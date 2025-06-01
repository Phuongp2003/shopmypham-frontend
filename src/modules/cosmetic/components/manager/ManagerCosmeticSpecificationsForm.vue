<script setup lang="ts">
import { useCosmeticCreateStore } from '@/modules/cosmetic/stores/useCosmeticCreateStore'
const cosmetic = useCosmeticCreateStore()
</script>
<template>
  <div class="space-y-4 border rounded-lg shadow p-6">
    <div v-for="(spec, idx) in cosmetic.form.specifications" :key="idx" class="border rounded-lg shadow p-4 relative bg-primary-200 dark:bg-primary-900">
      <div class="absolute top-2 right-2">
        <UButton size="xs" color="red" @click="cosmetic.removeSpecification(idx)">Xóa</UButton>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField label="Key" :name="`specKey-${idx}`">
          <UInput v-model="spec.key" placeholder="Key" class="w-full" />
        </UFormField>
        <UFormField label="Value" :name="`specValue-${idx}`">
          <UInput v-model="spec.value" placeholder="Value" class="w-full" />
        </UFormField>
      </div>
    </div>
    <div class="flex justify-start">
      <UButton size="xs" @click="cosmetic.addSpecification">Thêm thông số</UButton>
    </div>
  </div>
</template>
