<template>
  <div class="page-soft min-h-screen">
    <!-- Header Section -->
    <div class="bg-soft-elevated border-b border-pink-200/30 dark:border-pink-400/20">
      <div class="max-w-5xl mx-auto px-4 py-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-pink-gradient mb-4">Bài viết</h1>
          <p class="text-soft-secondary text-lg max-w-2xl mx-auto">
            Khám phá các bài viết, tin tức và chia sẻ mới nhất từ cộng đồng
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Search and Filters Bar -->
      <div class="bg-soft-elevated rounded-lg shadow-sm border border-pink-200/30 dark:border-pink-400/20 p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <!-- Search Input -->
          <div class="flex-1 max-w-md">
            <UInput
              v-model="search"
              placeholder="Tìm kiếm bài viết..."
              icon="i-lucide-search"
              class="w-full"
              @keyup.enter="applyFilters"
            >
              <template #trailing>
                <UButton v-if="search" variant="ghost" icon="i-lucide-x" size="xs" @click="search = ''; applyFilters()" />
              </template>
            </UInput>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="i in 6" :key="i" class="animate-pulse">
          <div class="bg-soft-elevated rounded-lg h-48 border border-pink-200/30 dark:border-pink-400/20"></div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="posts.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <UIcon name="i-lucide-package-search" class="w-16 h-16 mx-auto" />
        </div>
        <h3 class="text-lg font-medium text-soft-primary mb-2">Không tìm thấy bài viết</h3>
        <p class="text-soft-secondary mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        <UButton variant="soft" @click="resetFilters">Xóa bộ lọc</UButton>
      </div>

      <!-- Posts Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UCard v-for="post in posts" :key="post.id" class="hover:shadow-lg transition flex flex-col h-full min-h-[320px]">
          <div v-if="post.image" class="w-full overflow-hidden rounded-t-lg mb-2" style="height:180px;">
            <img :src="post.image" :alt="post.title" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 flex flex-col">
            <router-link :to="`/post/${post.id}`" class="text-xl font-semibold hover:text-primary-500 line-clamp-2 mb-1 min-h-[48px] flex items-center">{{ post.title }}</router-link>
            <div class="line-clamp-3 text-gray-800 dark:text-gray-300  mb-2 min-h-[48px] flex items-center">{{ post.description }}</div>
            <div class="mt-auto">
              <UButton :to="`/post/${post.id}`" color="primary" variant="soft" size="sm">Xem chi tiết</UButton>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllPostsApi } from '../post.api';
import type { Post } from '../post.types';
import type { PostResponse } from '../post.dto';
import type { User } from '@/modules/user/user.types';

const posts = ref<Post[]>([]);
const loading = ref(true);
const search = ref('');

function formatDate(date: string | Date) {
  return new Date(date).toLocaleString('vi-VN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
}

async function fetchPosts() {
  loading.value = true;
  try {
    const params: any = { published: true };
    if (search.value) params.search = search.value;
    const res = await getAllPostsApi(params);
    posts.value = (res.posts || []).map((p: PostResponse) => ({
      ...p,
      authorId: p.authorId || '',
      author: {
        id: '',
        email: '',
        name: 'Ẩn danh',
        phone: null,
        role: 'user',
        googleId: null,
        googleName: null,
        googleEmail: null,
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
        posts: [],
        comments: [],
        orders: [],
        cart: null,
        isNoPassword: false,
      } as User,
      comments: [],
    })) as Post[];
  } finally {
    loading.value = false;
  }
}

function applyFilters() {
  fetchPosts();
}

function resetFilters() {
  search.value = '';
  fetchPosts();
}

onMounted(fetchPosts);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.text-pink-gradient {
  background: linear-gradient(90deg, #ec4899 0%, #f472b6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
</style>
