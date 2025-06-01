<template>
    <div class="max-w-3xl mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
        <div v-if="loading" class="text-center">Đang tải...</div>
        <div
            v-else-if="!cart || !Array.isArray(cart.items) || !cart.items.length"
            class="text-center"
        >
            Giỏ hàng trống.
        </div>
        <div v-else>
            <div
                v-for="item in cart.items"
                :key="item.id"
                class="flex items-center gap-4 border-b py-4"
            >
                <img
                    :src="item?.image || '/api/placeholder/80/80'"
                    class="w-20 h-20 object-cover rounded"
                />
                <div class="flex-1">
                    <div class="font-semibold">{{ item.cosmeticName }}</div>
                    <div class="text-gray-500">{{ item.price.toLocaleString() }}₫</div>
                </div>
                <div class="flex items-center gap-2">
                    <UButton
                        @click="updateQuantity(item, item.quantity - 1)"
                        :disabled="item.quantity <= 1"
                        color="neutral"
                        variant="outline"
                        size="sm"
                        icon="i-heroicons-minus"
                    />
                    <span>{{ item.quantity }}</span>
                    <UButton
                        @click="updateQuantity(item, item.quantity + 1)"
                        :disabled="item.quantity >= item.stock"
                        color="neutral"
                        variant="outline"
                        size="sm"
                        icon="i-heroicons-plus"
                    />
                </div>
                <button @click="removeItem(item)" class="text-red-500 ml-2">Xóa</button>
            </div>
            <div class="flex justify-between items-center mt-8">
                <div class="text-lg font-bold">
                    Tổng:
                    {{
                        cart.items
                            .reduce((sum, item) => sum + item.price * item.quantity, 0)
                            .toLocaleString()
                    }}₫
                </div>
                <router-link to="/checkout">
                    <button
                        class="bg-pink-500 text-white px-6 py-2 rounded shadow hover:bg-pink-600"
                    >
                        Tiến hành đặt hàng
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useCartStore } from '../cart.store';
import type { CosmeticVariant } from '@/modules/cosmetic/submodules/variant/cosmeticVariant.types';

const cartStore = useCartStore();
const { cart, loading, updateCartItem, removeCartItem } = cartStore;

function updateQuantity(item: CosmeticVariant, quantity: number) {
    if (quantity < 1) return;
    updateCartItem(item.variantId, quantity).then((res) => {
        if (res) {
            item.quantity = quantity;
        }
    });
}
function removeItem(item: CosmeticVariant) {
    removeCartItem(item.variantId);
}
</script>
