import { getAllCosmeticsApi } from './cosmetic.api';
import { ref } from 'vue';
import type { CosmeticResponse } from './cosmetic.types';
import type { CosmeticQueryParams } from './cosmetic.dto';

interface GetCosmeticsParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?:
        | 'price'
        | 'name'
        | 'createdAt'
        | 'latest'
        | 'popular'
        | 'price_asc'
        | 'price_desc'
        | 'rating_desc'
        | 'name_asc'
        | 'name_desc';
    priceRange?: string;
    minRating?: string;
}

export const useCosmetic = () => {
    const cosmetics = ref<CosmeticResponse[]>([]);
    const loading = ref(false);
    const error = ref<Error | null>(null);
    const total = ref(0);
    const totalPages = ref(0);

    const getCosmetics = async (params: GetCosmeticsParams = {}) => {
        try {
            loading.value = true;
            error.value = null;

            // Convert our params to API params
            const apiParams: CosmeticQueryParams & { page: number; limit: number } = {
                page: params.page || 1,
                limit: params.limit || 10,
            };

            // Map sortBy values to API-compatible values
            if (params.sortBy) {
                switch (params.sortBy) {
                    case 'price_asc':
                    case 'price_desc':
                        apiParams.sortBy = 'price';
                        break;
                    case 'name_asc':
                    case 'name_desc':
                        apiParams.sortBy = 'name';
                        break;
                    case 'latest':
                        apiParams.sortBy = 'createdAt';
                        break;
                    default:
                        if (['price', 'name', 'createdAt'].includes(params.sortBy)) {
                            apiParams.sortBy = params.sortBy as 'price' | 'name' | 'createdAt';
                        }
                }
            }

            // Handle price range
            if (params.priceRange) {
                const [min, max] = params.priceRange
                    .split('-')
                    .map((p) => (p ? parseInt(p) : undefined));
                if (min !== undefined) apiParams.minPrice = min;
                if (max !== undefined) apiParams.maxPrice = max;
            }

            const res = await getAllCosmeticsApi(apiParams);

            cosmetics.value = res.cosmetics as CosmeticResponse[];
            total.value = res.total || 0;
            totalPages.value = res.totalPages || 0;
        } catch (err) {
            error.value = err as Error;
            cosmetics.value = [];
            total.value = 0;
            totalPages.value = 0;
        } finally {
            loading.value = false;
        }
    };

    return {
        cosmetics,
        loading,
        error,
        total,
        totalPages,
        getCosmetics,
    };
};
