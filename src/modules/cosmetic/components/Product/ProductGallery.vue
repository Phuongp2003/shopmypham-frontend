<template>
    <div class="space-y-4">
        <!-- Main Product Image -->
        <div
            class="relative aspect-square bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors"
        >
            <UModal
                class="w-[75vw] h-[75vh]"
                :ui="{
                    base: 'bg-soft-elevated border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg shadow-primary-500/25',
                    content: 'p-4 w-[75vw] h-[75vh]',
                    body: 'p-4',
                    header: 'p-4',
                    footer: 'p-4',
                }"
            >
                <img
                    :src="selectedImage || cosmetic?.image || '/api/placeholder/600/600'"
                    :alt="cosmetic?.name"
                    class="w-full h-full object-cover cursor-zoom-in"
                />
                <template #content>
                    <div class="p-4">
                        <img
                            :src="selectedImage"
                            :alt="cosmetic?.name"
                            class="max-w-full max-h-full object-contain"
                        /></div
                ></template>
            </UModal>
            <div class="absolute top-4 left-4">
                <UBadge
                    v-if="
                        cosmetic?.badges?.some(
                            (badge) => badge.badgeType === 'sale' && badge.isActive,
                        )
                    "
                    color="red"
                    size="sm"
                >
                    SALE
                </UBadge>
            </div>
        </div>

        <!-- Thumbnail Carousel -->
        <div v-if="images.length > 1" class="w-full">
            <UCarousel
                v-slot="{ item: image, index }"
                :items="images"
                :ui="{ item: 'basis-1/4 min-w-0' }"
                class="w-full"
            >
                <div
                    class="relative aspect-square bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 mx-1"
                    :class="{
                        'ring-2 ring-pink-500 dark:ring-pink-400 shadow-lg shadow-pink-500/20':
                            selectedImage === image,
                        'hover:ring-1 hover:ring-pink-300 dark:hover:ring-pink-500':
                            selectedImage !== image,
                    }"
                    @click="$emit('selectImage', image)"
                >
                    <img
                        :src="image"
                        :alt="`${cosmetic?.name} - Image ${index + 1}`"
                        class="w-full h-full object-cover"
                    />
                    <!-- Selected indicator overlay -->
                    <div
                        v-if="selectedImage === image"
                        class="absolute inset-0 bg-pink-500/10 dark:bg-pink-400/20 border-2 border-pink-500 dark:border-pink-400 rounded-lg"
                    />
                </div>
            </UCarousel>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CosmeticResponse } from '@/modules/cosmetic/cosmetic.types';

defineProps<{
    images: string[];
    selectedImage: string;
    cosmetic?: CosmeticResponse;
}>();

defineEmits<{
    selectImage: [image: string];
    openModal: [];
}>();
</script>

<style scoped>
/* Custom styling for carousel arrows with pink theme */
:deep(.carousel) {
    position: relative;
}

:deep(.carousel .carousel-button) {
    transition: all 0.2s ease;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

:deep(.carousel .carousel-button:hover) {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(236, 72, 153, 0.2);
}

/* Ensure proper spacing for thumbnails */
:deep(.carousel-item) {
    padding: 0 2px;
}
</style>
