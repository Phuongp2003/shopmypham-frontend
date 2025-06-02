<template>
    <div class="mt-12">
        <UTabs :items="tabs" v-model="currentTab">
            <template #content="{ item }">
                <div
                    class="mt-2 shadow-lg shadow-primary-500/25 rounded-lg p-4 bg-soft-elevated border border-gray-200 dark:border-gray-700"
                >
                    <!-- Description Tab -->
                    <DescriptionTab v-if="item.value === 'description'" :cosmetic="cosmetic" />

                    <!-- Benefits Tab -->
                    <BenefitsTab v-else-if="item.value === 'benefits'" :benefits="sortedBenefits" />

                    <!-- Application Tab -->
                    <ApplicationTab
                        v-else-if="item.value === 'application'"
                        :usageInstructions="cosmetic?.usageInstructions"
                    />

                    <!-- Shipping Tab -->
                    <ShippingTab
                        v-else-if="item.value === 'shipping'"
                        :shippingPolicy="cosmetic?.shippingPolicy"
                    />

                    <!-- Reviews Tab -->
                    <ReviewsTab
                        v-else-if="item.value === 'reviews'"
                        :reviews="approvedReviews"
                        :averageRating="cosmetic?.averageRating"
                        :totalReviews="cosmetic?.totalReviews"
                        :cosmeticId="cosmetic.id"
                    />
                </div>
            </template>
        </UTabs>
    </div>
</template>

<script setup lang="ts">
import type { CosmeticResponse } from '@/modules/cosmetic/cosmetic.types';
import DescriptionTab from './DescriptionTab.vue';
import BenefitsTab from './BenefitsTab.vue';
import ApplicationTab from './ApplicationTab.vue';
import ShippingTab from './ShippingTab.vue';
import ReviewsTab from './ReviewsTab.vue';

const props = defineProps<{
    cosmetic: CosmeticResponse;
    activeTab: string;
}>();

const emit = defineEmits<{
    tabChange: [tab: string];
}>();

const tabs = [
    { value: 'description', label: 'Mô tả' },
    { value: 'benefits', label: 'Lợi ích' },
    { value: 'application', label: 'Cách sử dụng' },
    { value: 'shipping', label: 'Giao hàng' },
    { value: 'reviews', label: 'Đánh giá' },
];

const currentTab = computed({
    get: () => props.activeTab,
    set: (value) => emit('tabChange', value),
});

const sortedBenefits = computed(() => {
    if (!props.cosmetic?.benefits) return [];
    return props.cosmetic.benefits.sort((a, b) => a.orderIndex - b.orderIndex);
});

const approvedReviews = computed(() => {
    if (!props.cosmetic?.reviews) return [];
    return props.cosmetic.reviews
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
});
</script>
