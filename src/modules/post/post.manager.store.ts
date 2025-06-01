import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  getAllPostsApi,
  getPostByIdApi,
  createPostApi,
  updatePostApi,
  deletePostApi,
} from './post.api';
import type { Post, PostCreateInput, PostUpdateInput } from './post.types';

export const usePostManagerStore = defineStore('postManager', () => {
  const posts = ref<Post[]>([]);
  const total = ref(0);
  const loading = ref(false);
  const current = ref<Post | null>(null); // chi tiết bài viết đang xem/sửa
  const currentForm = ref<Partial<PostCreateInput> & { description?: string; image?: string }>({}); // state form cho ArticleEditView và các step

  async function fetchPosts(params: any = {}) {
    loading.value = true;
    try {
      const res = await getAllPostsApi(params);
      posts.value = res.items || res || [];
      total.value = res.total || posts.value.length;
    } finally {
      loading.value = false;
    }
  }

  async function fetchPost(id: string) {
    loading.value = true;
    try {
      current.value = await getPostByIdApi(id);
      // Khi vào sửa, copy dữ liệu sang form
      if (current.value) {
        currentForm.value = {
          title: current.value.title,
          content: current.value.content,
          description: (current.value as any).description || '',
          published: current.value.published,
          image: (current.value as any).image || '',
        };
      }
    } finally {
      loading.value = false;
    }
  }

  function resetCurrentForm() {
    currentForm.value = { title: '', content: '', description: '', published: false, image: '' };
  }

  async function createPost(data: PostCreateInput & { description?: string; image?: string }) {
    loading.value = true;
    try {
      const post = await createPostApi(data);
      posts.value.unshift(post);
      return post;
    } finally {
      loading.value = false;
    }
  }

  async function updatePost(id: string, data: PostUpdateInput & { description?: string; image?: string }) {
    loading.value = true;
    try {
      const post = await updatePostApi(id, data);
      const idx = posts.value.findIndex(p => p.id === id);
      if (idx !== -1) posts.value[idx] = post;
      if (current.value?.id === id) current.value = post;
      return post;
    } finally {
      loading.value = false;
    }
  }

  async function deletePost(id: string) {
    loading.value = true;
    try {
      await deletePostApi(id);
      posts.value = posts.value.filter(p => p.id !== id);
      if (current.value?.id === id) current.value = null;
    } finally {
      loading.value = false;
    }
  }

  return {
    posts,
    total,
    loading,
    current,
    currentForm,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    resetCurrentForm,
  };
});
