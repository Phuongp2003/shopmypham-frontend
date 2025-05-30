<template>
    <div class="space-y-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">Lợi ích chính</h3>
        <div v-if="benefits && benefits.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
                v-for="benefit in benefits"
                :key="benefit.id"
                class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors"
            >
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                    {{ benefit.benefitKey }}
                </h4>
                <p class="text-gray-600 dark:text-gray-400">{{ benefit.benefitValue }}</p>
            </div>
        </div>
        <div v-else class="text-center py-8">
            <p class="text-gray-500 dark:text-gray-400">Chưa có thông tin về lợi ích sản phẩm.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CosmeticBenefit } from '@/modules/cosmetic/submodules/benefit/cosmeticBenefit.types';

defineProps<{
    benefits: CosmeticBenefit[];
}>();
</script>
