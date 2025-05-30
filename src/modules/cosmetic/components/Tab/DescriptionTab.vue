<template>
    <div class="prose prose-gray dark:prose-invert max-w-none">
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {{ cosmetic?.description }}
        </p>

        <!-- Specifications -->
        <div v-if="cosmetic?.specifications && cosmetic.specifications.length > 0" class="mt-8">
            <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Thông số sản phẩm</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                    v-for="spec in cosmetic.specifications"
                    :key="spec.id"
                    class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                >
                    <div class="font-semibold text-gray-900 dark:text-white">
                        {{ spec.specKey }}
                    </div>
                    <div class="text-gray-600 dark:text-gray-400">{{ spec.specValue }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CosmeticResponse } from '@/modules/cosmetic/cosmetic.types';

defineProps<{
    cosmetic?: CosmeticResponse;
}>();
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
