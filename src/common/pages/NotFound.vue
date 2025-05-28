<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="flex flex-col items-center gap-6 p-8 rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800">
      <UAvatar icon="i-heroicons-exclamation-triangle" size="xl" class="mb-2 text-yellow-500 dark:text-yellow-400" />
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Không tìm thấy trang này</h1>
      <p class="text-gray-600 dark:text-gray-300 text-center max-w-xs">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <UButton to="/" color="primary" size="lg" class="mt-4">
        Quay về trang chủ
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// Nuxt UI components are auto-imported if @nuxt/ui is set up
</script>
