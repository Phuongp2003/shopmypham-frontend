<template>
  <div class="p-4 max-w-3xl mx-auto">
    <UCard v-if="post">
      <template #header>
        <h1 class="text-2xl font-bold mb-2">{{ post.title }}</h1>
        <div class="text-gray-500 text-sm mb-4">
          Đăng bởi {{ post.author?.name || 'Ẩn danh' }} lúc {{ formatDate(post.createdAt) }}
        </div>
      </template>
      <div class="prose prose-lg max-w-none" v-html="post.content"></div>
    </UCard>
    <div v-else class="text-center text-gray-400 py-16">Đang tải bài viết...</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Post } from '../post.types';
import { usePostManagerStore } from '../post.manager.store';

const postStore = usePostManagerStore();
const post = ref<Post | null>(postStore.currentForm as Post);

function formatDate(date: string | Date) {
  return new Date(date).toLocaleString('vi-VN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
}
</script>
