<template>
    <div class="page-soft min-h-screen">
        <!-- Header Section -->
        <div class="bg-soft-elevated border-b border-pink-200/30 dark:border-pink-400/20">
            <div class="max-w-7xl mx-auto px-4 py-8">
                <div class="text-center">
                    <h1 class="text-4xl font-bold text-pink-gradient mb-4">Sản phẩm mỹ phẩm</h1>
                    <p class="text-soft-secondary text-lg max-w-2xl mx-auto">
                        Khám phá bộ sưu tập mỹ phẩm chất lượng cao với thành phần thiên nhiên
                    </p>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 py-8">
            <!-- Search and Filters Bar -->
            <div
                class="bg-soft-elevated rounded-lg shadow-sm border border-pink-200/30 dark:border-pink-400/20 p-6 mb-8"
            >
                <div
                    class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
                >
                    <!-- Search Input -->
                    <div class="flex-1 max-w-md">
                        <UInput
                            v-model="searchQuery"
                            placeholder="Tìm kiếm sản phẩm..."
                            icon="i-lucide-search"
                            :ui="{
                                icon: { trailing: { pointer: '' } },
                            }"
                            class="w-full"
                        >
                            <template #trailing>
                                <UButton
                                    v-if="searchQuery"
                                    variant="ghost"
                                    icon="i-lucide-x"
                                    size="xs"
                                    @click="searchQuery = ''"
                                />
                            </template>
                        </UInput>
                    </div>

                    <!-- Filters and Sort -->
                    <div class="flex flex-wrap gap-3">
                        <!-- Sort Dropdown -->
                        <USelect
                            v-model="sortBy"
                            :options="sortOptions"
                            placeholder="Sắp xếp theo"
                            class="w-40"
                        />

                        <!-- Price Range Filter -->
                        <USelect
                            v-model="priceRange"
                            :options="priceRangeOptions"
                            placeholder="Khoảng giá"
                            class="w-40"
                        />

                        <!-- Rating Filter -->
                        <USelect
                            v-model="ratingFilter"
                            :options="ratingOptions"
                            placeholder="Đánh giá"
                            class="w-32"
                        />

                        <!-- Clear Filters -->
                        <UButton
                            v-if="hasActiveFilters"
                            variant="ghost"
                            color="gray"
                            icon="i-lucide-filter-x"
                            @click="clearFilters"
                        >
                            Xóa bộ lọc
                        </UButton>
                    </div>
                </div>
            </div>

            <!-- Results Info -->
            <div class="flex items-center justify-between mb-6">
                <div class="text-soft-secondary">
                    <span v-if="!loading">
                        Hiển thị {{ (currentPage - 1) * limit + 1 }}-{{
                            Math.min(currentPage * limit, total)
                        }}
                        trong tổng số {{ total }} sản phẩm
                    </span>
                </div>

                <!-- View Toggle -->
                <div class="flex items-center gap-2">
                    <UButton
                        :variant="viewMode === 'grid' ? 'solid' : 'ghost'"
                        :color="viewMode === 'grid' ? 'primary' : 'gray'"
                        icon="i-lucide-grid-3x3"
                        size="sm"
                        @click="viewMode = 'grid'"
                    />
                    <UButton
                        :variant="viewMode === 'list' ? 'solid' : 'ghost'"
                        :color="viewMode === 'list' ? 'primary' : 'gray'"
                        icon="i-lucide-list"
                        size="sm"
                        @click="viewMode = 'list'"
                    />
                </div>
            </div>

            <!-- Loading State -->
            <div
                v-if="loading"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                <div v-for="i in 8" :key="i" class="animate-pulse">
                    <div
                        class="bg-soft-elevated rounded-lg h-80 border border-pink-200/30 dark:border-pink-400/20"
                    ></div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-12">
                <div
                    class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 max-w-md mx-auto"
                >
                    <div class="text-red-500 mb-4">
                        <UIcon name="i-lucide-alert-circle" class="w-12 h-12 mx-auto" />
                    </div>
                    <h3 class="text-lg font-medium text-red-900 dark:text-red-100 mb-2">
                        Có lỗi xảy ra
                    </h3>
                    <p class="text-red-700 dark:text-red-300 mb-4">
                        {{ error.message || 'Không thể tải danh sách sản phẩm' }}
                    </p>
                    <UButton color="red" variant="soft" @click="loadCosmetics"> Thử lại </UButton>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="!cosmetics.length" class="text-center py-12">
                <div class="text-gray-400 mb-4">
                    <UIcon name="i-lucide-package-search" class="w-16 h-16 mx-auto" />
                </div>
                <h3 class="text-lg font-medium text-soft-primary mb-2">Không tìm thấy sản phẩm</h3>
                <p class="text-soft-secondary mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                <UButton variant="soft" @click="clearFilters"> Xóa bộ lọc </UButton>
            </div>

            <!-- Products Grid/List -->
            <div v-else>
                <!-- Grid View -->
                <div
                    v-if="viewMode === 'grid'"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
                >
                    <CosmeticCard
                        v-for="cosmetic in cosmetics"
                        :key="cosmetic.id"
                        :cosmetic="cosmetic"
                        class="card-hover"
                    />
                </div>

                <!-- List View -->
                <div v-else class="space-y-4 mb-8">
                    <div
                        v-for="cosmetic in cosmetics"
                        :key="cosmetic.id"
                        class="bg-soft-elevated rounded-lg shadow-sm border border-pink-200/30 dark:border-pink-400/20 p-6 hover:shadow-md transition-all duration-200"
                    >
                        <div class="flex flex-col md:flex-row gap-4">
                            <!-- Product Image -->
                            <div class="flex-shrink-0">
                                <img
                                    :src="cosmetic.image"
                                    :alt="cosmetic.name"
                                    class="w-32 h-32 object-cover rounded-lg"
                                />
                            </div>

                            <!-- Product Info -->
                            <div class="flex-1 min-w-0">
                                <div
                                    class="flex flex-col md:flex-row md:items-start md:justify-between gap-4"
                                >
                                    <div class="flex-1">
                                        <h3
                                            class="text-lg font-semibold text-soft-primary mb-2 line-clamp-2"
                                        >
                                            {{ cosmetic.name }}
                                        </h3>
                                        <p class="text-soft-secondary mb-3 line-clamp-2">
                                            {{ cosmetic.description }}
                                        </p>

                                        <!-- Rating and Stock -->
                                        <div class="flex items-center gap-4 mb-3">
                                            <div class="flex items-center gap-1">
                                                <UIcon
                                                    name="i-lucide-star"
                                                    class="w-4 h-4 text-yellow-400 fill-current"
                                                />
                                                <span class="text-sm font-medium">{{
                                                    cosmetic.averageRating || 0
                                                }}</span>
                                            </div>
                                            <div class="text-sm text-soft-secondary">
                                                Còn {{ cosmetic.stock }} sản phẩm
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Price and Actions -->
                                    <div class="flex flex-col items-end gap-3">
                                        <div
                                            class="text-2xl font-bold text-pink-600 dark:text-pink-400"
                                        >
                                            {{ formatPrice(cosmetic.price) }}
                                        </div>
                                        <div class="flex gap-2">
                                            <UButton
                                                :to="`/cosmetic/${cosmetic.id}`"
                                                variant="outline"
                                                size="sm"
                                            >
                                                Xem chi tiết
                                            </UButton>
                                            <UButton
                                                color="primary"
                                                size="sm"
                                                icon="i-lucide-shopping-cart"
                                            >
                                                Thêm vào giỏ
                                            </UButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div v-if="totalPages > 1" class="flex justify-center">
                    <UPagination
                        v-model="currentPage"
                        :total="total"
                        :page-count="limit"
                        :max="7"
                        :ui="{
                            wrapper: 'flex items-center gap-1',
                            base: 'min-w-[2rem] min-h-[2rem] flex items-center justify-center text-sm font-medium rounded-lg transition-colors',
                            default: {
                                color: 'primary',
                                variant: 'ghost',
                            },
                        }"
                        @update:model-value="onPageChange"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useCosmetic } from '../cosmetic.composable';
import CosmeticCard from '../components/Card/CosmeticCard.vue';
import type { CosmeticQueryParams } from '../cosmetic.dto';

// Reactive state
const searchQuery = ref('');
const sortBy = ref('latest');
const priceRange = ref('');
const ratingFilter = ref('');
const viewMode = ref<'grid' | 'list'>('grid');
const currentPage = ref(1);
const limit = ref(12);

// Composable
const { cosmetics, loading, error, total, totalPages, getCosmetics } = useCosmetic();

// Options for filters
const sortOptions = [
    { label: 'Mới nhất', value: 'latest' },
    { label: 'Phổ biến nhất', value: 'popular' },
    { label: 'Giá: Thấp đến cao', value: 'price_asc' },
    { label: 'Giá: Cao đến thấp', value: 'price_desc' },
    { label: 'Đánh giá cao nhất', value: 'rating_desc' },
    { label: 'Tên A-Z', value: 'name_asc' },
    { label: 'Tên Z-A', value: 'name_desc' },
];

const priceRangeOptions = [
    { label: 'Tất cả', value: '' },
    { label: 'Dưới 100.000₫', value: '0-100000' },
    { label: '100.000₫ - 300.000₫', value: '100000-300000' },
    { label: '300.000₫ - 500.000₫', value: '300000-500000' },
    { label: 'Trên 500.000₫', value: '500000-' },
];

const ratingOptions = [
    { label: 'Tất cả', value: '' },
    { label: '4+ sao', value: '4' },
    { label: '3+ sao', value: '3' },
    { label: '2+ sao', value: '2' },
    { label: '1+ sao', value: '1' },
];

// Computed
const hasActiveFilters = computed(() => {
    return searchQuery.value || priceRange.value || ratingFilter.value || sortBy.value !== 'latest';
});

// Methods
const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price);
};

const clearFilters = () => {
    searchQuery.value = '';
    sortBy.value = 'latest';
    priceRange.value = '';
    ratingFilter.value = '';
    currentPage.value = 1;
};

const onPageChange = (page: number) => {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const loadCosmetics = () => {
    const params = {
        page: currentPage.value,
        limit: limit.value,
        search: searchQuery.value || undefined,
        sortBy: sortBy.value,
        priceRange: priceRange.value || undefined,
        minRating: ratingFilter.value || undefined,
    };

    getCosmetics(params as CosmeticQueryParams);
};

// Watchers
watch(
    [searchQuery, sortBy, priceRange, ratingFilter],
    () => {
        currentPage.value = 1;
        loadCosmetics();
    },
    { debounce: 300 },
);

watch(currentPage, () => {
    loadCosmetics();
});

// Lifecycle
onMounted(() => {
    loadCosmetics();
});
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
