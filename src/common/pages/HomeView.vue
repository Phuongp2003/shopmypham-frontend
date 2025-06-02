<template>
    <div class="flex flex-col min-h-screen w-full bg-gray-50 dark:bg-gray-900 mb-10">
        <!-- Banner -->
        <section
            class="w-full h-[60vh] flex items-center justify-center bg-white dark:bg-gray-900 mb-10"
        >
            <div
                class="w-full h-full px-6 py-4 bg-transparent shadow-none border-none dark:bg-transparent"
            >
                <img class="object-cover w-full h-full" src="/banner-beauty.jpg" alt="Banner" />
            </div>
        </section>

        <!-- Featured Cosmetics Slider -->
        <section
            class="w-full h-[50vh] flex flex-col items-center justify-center bg-soft-elevated dark:bg-gray-900 py-8 mb-10"
        >
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Sản phẩm nổi bật
            </h2>
            <UCarousel
                :items="groupedCosmetics"
                class="w-3/4 shadow-lg shadow-gray-200 dark:shadow-gray-800 px-2 py-4 border border-gray-300 dark:border-gray-800 rounded-lg"
                :autoplay="{ delay: 2000 }"
                loop
                :ui="{
                    item: 'basis-[70%] transition-opacity [&:not(.is-snapped)]:opacity-10 py-4',
                    controls: 'absolute top-1/2 -translate-y-1/2 inset-x-12',
                }"
                class-names
                arrows
            >
                <template #default="{ item: group }">
                    <div class="flex gap-4 w-full">
                        <div v-for="cosmetic in group" :key="cosmetic.id" class="flex-1 hover:scale-105 transition-all duration-200">
                            <RouterLink
                                :to="`/cosmetic/${cosmetic.id}`"
                                class="flex flex-col items-center p-4 mx-2 bg-gray-100 dark:bg-gray-900 rounded-lg shadow"
                            >
                                <img
                                    :src="cosmetic.image"
                                    :alt="cosmetic.name"
                                    class="w-40 h-40 object-cover rounded-lg mb-2"
                                />
                                <div class="flex items-center gap-4 mb-3">
                                    <div class="flex items-center gap-1">
                                        <UIcon
                                            name="i-lucide-star"
                                            class="w-4 h-4 text-yellow-400 fill-current"
                                        />
                                        <span class="text-sm font-medium">
                                            {{ cosmetic.averageRating || 0 }}
                                        </span>
                                    </div>
                                    <div class="text-sm text-soft-secondary">
                                        Còn {{ cosmetic.stock }} sản phẩm
                                    </div>
                                </div>
                                <div class="flex flex-col items-end gap-3">
                                  <div
                                      class="text-2xl font-bold text-pink-600 dark:text-pink-400"
                                  >
                                      {{ formatPrice(cosmetic.price) }}
                                  </div>
                              </div>
                                <div
                                    class="font-medium text-center text-gray-800 dark:text-gray-100"
                                >
                                    {{ cosmetic.name }}
                                </div>
                            </RouterLink>
                        </div>
                    </div>
                </template>
            </UCarousel>
            <div class="flex justify-center mt-5">
                <UButton color="primary" to="/cosmetic/list" size="xl">Xem tất cả</UButton>
            </div>
        </section>

        <!-- Top Blog Section -->
        <section
            class="w-full h-[60vh] flex flex-col items-center justify-center bg-soft-elevated dark:bg-gray-900 py-4 mb-10"
        >
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Bài viết nổi bật
            </h2>
            <div class="grid grid-cols-2 gap-6 w-3/4 h-[90%]" v-if="posts.length > 0">
                <RouterLink
                    :to="`/post/${posts[0].id}`"
                    class="row-span-2 flex flex-col p-0 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow h-full hover:scale-105 transition-all duration-200"
                >
                    <div class="flex flex-col h-full">
                        <div class="flex-3/4 flex items-center justify-center overflow-hidden">
                            <img
                                :src="posts[0].image"
                                alt="Blog 1"
                                class="object-cover w-full h-full"
                            />
                        </div>
                        <div class="flex-1/4 flex flex-col justify-center px-4 py-2">
                            <div
                                class="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1"
                            >
                                {{ posts[0].title }}
                            </div>
                            <div class="text-gray-600 dark:text-gray-300 text-sm">
                                {{ posts[0].description }}
                            </div>
                        </div>
                    </div>
                </RouterLink>
                <!-- Blog 2: 1 row, 1 col, horizontal split -->
                <RouterLink
                    :to="`/post/${posts[1].id}`"
                    class="flex flex-row items-stretch p-0 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow h-full hover:scale-105 transition-all duration-200"
                >
                    <div class="flex-1 flex items-center justify-center overflow-hidden">
                        <img
                            :src="posts[1].image"
                            alt="Blog 2"
                            class="object-cover w-full h-full"
                        />
                    </div>
                    <div class="flex-1 flex flex-col justify-center px-4 py-2">
                        <div class="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
                            {{ posts[1].title }}
                        </div>
                        <div class="text-gray-600 dark:text-gray-300 text-sm">
                            {{ posts[1].description }}
                        </div>
                    </div>
                </RouterLink>
                <!-- Blog 3: 1 row, 1 col, horizontal split -->
                <RouterLink
                    :to="`/post/${posts[2].id}`"
                    class="flex flex-row items-stretch p-0 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow h-full hover:scale-105 transition-all duration-200"
                >
                    <div class="flex-1 flex items-center justify-center overflow-hidden">
                        <img
                            :src="posts[2].image"
                            alt="Blog 3"
                            class="object-cover w-full h-full"
                        />
                    </div>
                    <div class="flex-1 flex flex-col justify-center px-4 py-2">
                        <div class="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
                            {{ posts[2].title }}
                        </div>
                        <div class="text-gray-600 dark:text-gray-300 text-sm">
                            {{ posts[2].description }}
                        </div>
                    </div>
                </RouterLink>
            </div>
            <div class="flex justify-center mt-5">
                <UButton color="primary" to="/post/list" size="xl">Xem tất cả</UButton>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCosmetic } from '@/modules/cosmetic/cosmetic.composable';
import { getAllPostsApi } from '@/modules/post/post.api';
import type { PostResponse } from '@/modules/post/post.types';

const { cosmetics, getCosmetics } = useCosmetic();
const posts = ref<PostResponse[]>([]);

// Group cosmetics into arrays of 3
const groupedCosmetics = computed(() => {
    const groups = [];
    for (let i = 0; i < cosmetics.value.length; i += 3) {
        groups.push(cosmetics.value.slice(i, i + 3));
    }
    return groups;
});

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price);
};

onMounted(async () => {
    await getCosmetics({
        page: 1,
        limit: 9,
    });
    posts.value = (await getAllPostsApi({
        page: 1,
        limit: 3,
    }).then((res) => {
        return res.posts;
    })) as PostResponse[];
});
</script>
