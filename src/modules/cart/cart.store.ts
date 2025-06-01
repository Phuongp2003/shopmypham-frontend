import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
    getCartApi,
    addToCartApi,
    updateCartItemApi,
    removeCartItemApi,
    clearCartApi,
} from './cart.api';
import type { GetUserCartRes } from './cart.dto';

export const useCartStore = defineStore('cart', () => {
    const cart = ref<GetUserCartRes | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchCart = async (userId: string) => {
        loading.value = true;
        try {
            cart.value = await getCartApi(userId);
            error.value = null;
        } catch (err: any) {
            error.value = err.message || 'Lỗi lấy giỏ hàng';
        } finally {
            loading.value = false;
        }
    };

    const addToCart = async (variantId: string, quantity: number) => {
        loading.value = true;
        try {
            cart.value = await addToCartApi(variantId, quantity);
            error.value = null;
        } catch (err: any) {
            error.value = err.message || 'Lỗi thêm vào giỏ hàng';
        } finally {
            loading.value = false;
        }
    };

    const updateCartItem = async (variantId: string, quantity: number) => {
        loading.value = true;
        try {
            const changedVariant = await updateCartItemApi({ variantId, quantity });
            if (cart.value) {
                const index = cart.value.items.findIndex((item) => item.variantId === variantId);
                if (index !== -1) cart.value.items[index] = changedVariant;
            }
            error.value = null;
            return true;
        } catch (err: any) {
            error.value = err.message || 'Lỗi cập nhật giỏ hàng';
        } finally {
            loading.value = false;
        }
    };

    const removeCartItem = async (variantId: string) => {
        loading.value = true;
        try {
            await removeCartItemApi({ variantId });
            if (cart.value) {
                cart.value.items = cart.value.items.filter(
                    (predicate) => predicate.variantId !== variantId,
                );
            }
            error.value = null;
        } catch (err: any) {
            error.value = err.message || 'Lỗi xóa sản phẩm';
        } finally {
            loading.value = false;
        }
    };

    const clearCart = async () => {
        await clearCartApi();
        if (cart.value) cart.value.items = [];
    };

    const getCartItemCount = computed(() => {
        return cart.value?.items?.length || 0;
    });

    return {
        cart,
        loading,
        error,
        fetchCart,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
        getCartItemCount,
    };
});
