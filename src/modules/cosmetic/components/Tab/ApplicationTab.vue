<template>
  <div class="space-y-6">
    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Cách sử dụng</h3>
    <div
      v-if="usageInstructions"
      class="prose prose-gray dark:prose-invert max-w-none"
      v-html="usageInstructions"
    ></div>
    <div v-else class="text-center py-8">
      <p class="text-gray-500 dark:text-gray-400">Chưa có hướng dẫn sử dụng sản phẩm.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  usageInstructions?: string
}>()
</script>

<style scoped>
.prose {
  color: #374151;
}

.prose h3 {
  color: #111827;
  font-weight: 700;
}

.dark .prose {
  color: #d1d5db;
}

.dark .prose h3 {
  color: #f9fafb;
}
</style>
