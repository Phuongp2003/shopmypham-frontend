<template>
    <div class="bg-gray-50 dark:bg-gray-900 transition-colors">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center">
            <LoadingComponent />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="flex justify-center items-center">
            <ErrorLoadingComponent :errorMessage="error" />
        </div>

        <!-- Product Detail -->
        <div v-else-if="cosmetic" class="max-w-7xl mx-auto px-4 py-8">
            <div
                class="grid grid-cols-1 lg:grid-cols-2 gap-8 shadow-lg shadow-primary-500/25 rounded-lg p-4 bg-soft-elevated border border-gray-200 dark:border-gray-700"
            >
                <!-- Product Images Gallery -->
                <ProductGallery
                    :images="productImages"
                    :selectedImage="selectedImage"
                    :cosmetic="cosmetic"
                    @selectImage="selectedImage = $event"
                    @openModal="openImageModal"
                />

                <!-- Product Information -->
                <div class="space-y-6">
                    <ProductInfo :cosmetic="cosmetic" :isOnSale="isOnSale" />

                    <VariantSelector
                        v-if="cosmetic.variants && cosmetic.variants.length > 0"
                        :variants="cosmetic.variants"
                        :selectedVariantIndex="selectedVariantIndex"
                        @selectVariant="selectVariant"
                    />

                    <AddToCartSection
                        :quantity="quantity"
                        :maxStock="getMaxStock()"
                        :canAddToCart="canAddToCart"
                        :badges="cosmetic.badges"
                        @increment="incrementQuantity"
                        @decrement="decrementQuantity"
                        @addToCart="addToCart"
                    />
                </div>
            </div>

            <!-- Product Details Tabs -->
            <DetailTabs
                :cosmetic="cosmetic"
                :activeTab="activeTab"
                @tabChange="activeTab = $event"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import router from '@/router';
import { getCosmeticByIdApi } from '../cosmetic.api';
import type { CosmeticResponse } from '../cosmetic.types';
import LoadingComponent from '@/common/components/LoadingComponent.vue';
import ErrorLoadingComponent from '@/common/components/ErrorLoadingComponent.vue';
import ProductGallery from '../components/Product/ProductGallery.vue';
import ProductInfo from '../components/Product/ProductInfo.vue';
import VariantSelector from '../components/Product/VariantSelector.vue';
import AddToCartSection from '../components/Product/AddToCartSection.vue';
import DetailTabs from '../components/Tab/DetailTabs.vue';
import type { VariantResponse } from '../submodules/option/cosmesticOptions.types';
import { addToCartApi } from '@/modules/cart/cart.api';
import { useCartStore } from '@/modules/cart/cart.store';
import { useAuthStore } from '@/modules/auth/auth.store';

console.log(router.currentRoute.value);
const cosmeticId = router.currentRoute.value.params.id;

const cosmetic = ref<CosmeticResponse | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

// Product display state
const selectedVariant = ref<VariantResponse | null>(null);
const selectedVariantIndex = ref<number>(-1);
const quantity = ref(1);
const activeTab = ref('description');
const selectedImage = ref('');
const showImageModal = ref(false);

// Mock data for enhanced display - will be populated from API
const productImages = ref<string[]>([]);
const isOnSale = ref(true);
const toast = useToast();
// Computed properties
const canAddToCart = computed(() => {
    const stock = getMaxStock();
    return stock > 0 && quantity.value <= stock;
});

// Methods
const getMaxStock = () => {
    if (selectedVariant.value) {
        return selectedVariant.value.inStock;
    }
    return cosmetic.value?.stock || 0;
};

const selectVariant = (variant: VariantResponse, index: number) => {
    selectedVariant.value = variant;
    selectedVariantIndex.value = index;
    quantity.value = 1;
    // Update selected image to variant image
    if (variant.image) {
        selectedImage.value = variant.image;
    }
};

const incrementQuantity = () => {
    const maxStock = getMaxStock();
    if (quantity.value < maxStock) {
        quantity.value++;
    }
};

const decrementQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

const addToCart = () => {
    addToCartApi(selectedVariant.value?.id!, quantity.value)
        .then(() => {
            toast.add({
                title: 'Thêm vào giỏ hàng thành công',
                color: 'success',
            });
            useCartStore().fetchCart(useAuthStore().user?.id!);
        })
        .catch((err) => {
            toast.add({
                title: err.message,
                color: 'error',
            });
        });
};

const openImageModal = () => {
    showImageModal.value = true;
};

onMounted(async () => {
    if (!cosmeticId) {
        console.log('cosmeticId', cosmeticId);
        error.value = 'Không tìm thấy sản phẩm';
        return;
    }
    try {
        loading.value = true;
        const cosmeticRes = (await getCosmeticByIdApi(
            cosmeticId as string,
        )) as unknown as CosmeticResponse;
        cosmetic.value = cosmeticRes;

        // Set up product images
        const images = [cosmeticRes.image];
        if (cosmeticRes.variants && cosmeticRes.variants.length > 0) {
            // Add variant images
            cosmeticRes.variants.forEach((variant) => {
                if (variant.image && !images.includes(variant.image)) {
                    images.push(variant.image);
                }
            });
            // Set first variant as default if available
            selectedVariant.value = cosmeticRes.variants[0];
            selectedVariantIndex.value = 0;
        }

        productImages.value = images;
        selectedImage.value = images[0] || '/api/placeholder/600/600';
    } catch (error: any) {
        error.value = error.message;
    } finally {
        loading.value = false;
    }
});
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
