<template>
    <div v-if="variants && variants.length > 0" class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Chọn phiên bản:</h3>
        <div
            v-for="(variant, index) in variants"
            :key="index"
            class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-all duration-200"
            :class="{
                'shadow-lg shadow-primary-500/25 border-primary-900 scale-105 ':
                    selectedVariantIndex === index,
            }"
        >
            <div class="flex justify-between items-center mb-2">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ variant.name }}</h3>
                <span class="text-lg font-bold text-gray-900 dark:text-white"
                    >{{ formatPrice(variant.price) }}₫</span
                >
            </div>
            <div
                class="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-3"
            >
                <span class="text-gray-500 dark:text-gray-400">
                    <span v-for="(option, optIndex) in variant.options" :key="optIndex">
                        {{ option.optionKey }}: {{ option.optionValue }}
                        <span v-if="optIndex < variant.options.length - 1"> • </span>
                    </span>
                </span>
                <UBadge :color="variant.inStock > 0 ? 'green' : 'red'" size="sm">
                    {{ variant.inStock > 0 ? `Còn hàng (${variant.inStock})` : 'Hết hàng' }}
                </UBadge>
            </div>
            <UButton
                @click="$emit('selectVariant', variant, index)"
                :disabled="variant.inStock === 0"
                color="primary"
                block
                size="sm"
            >
                {{ variant.inStock > 0 ? 'Chọn phiên bản này' : 'Hết hàng' }}
            </UButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { VariantResponse } from '@/modules/cosmetic/submodules/option/cosmesticOptions.types';

defineProps<{
    variants: VariantResponse[];
    selectedVariantIndex: number;
}>();

defineEmits<{
    selectVariant: [variant: VariantResponse, index: number];
}>();

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
};
</script>
