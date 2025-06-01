<template>
    <div class="max-w-3xl mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6">Xác nhận đơn hàng</h1>
        <div v-if="!cart || !cart.items.length" class="text-center">Giỏ hàng trống.</div>
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
                    <div>Số lượng: {{ item.quantity }}</div>
                </div>
            </div>
            <UForm :state="checkoutFormState" @submit="submitOrder" class="mt-8 space-y-4">
                <UFormField label="Địa chỉ nhận hàng" name="addressId" required>
                    <template #default="{ error }">
                        <USelectMenu
                            v-if="addresses.length"
                            v-model="selectedAddressId"
                            create-item
                            :loading="isLoading"
                            :items="
                                addresses.map((address) => ({
                                    ...address,
                                    label: `${address.addressLine}, ${address.district}, ${address.city}`,
                                }))
                            "
                            value-key="id"
                            placeholder="Chọn địa chỉ giao hàng"
                            class="w-full"
                            @create="openCreateAddress()"
                            :error="error"
                        >
                        </USelectMenu>
                        <div v-else class="text-gray-500 mb-2">Bạn chưa có địa chỉ giao hàng.</div>
                    </template>
                </UFormField>
                <UFormField label="Phương thức thanh toán" name="paymentMethod" required>
                    <USelectMenu
                        v-model="paymentMethod"
                        :items="paymentMethods"
                        value-key="value"
                        class="w-full"
                    >
                    </USelectMenu>
                </UFormField>
                <div class="flex justify-between items-center mt-4">
                    <div class="text-lg font-bold">
                        Tổng:
                        {{
                            cart.items
                                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                                .toLocaleString()
                        }}₫
                    </div>
                    <UButton
                        type="submit"
                        color="primary"
                        class="px-6 py-2 rounded shadow"
                        :disabled="!selectedAddressId"
                    >
                        Xác nhận đặt hàng
                    </UButton>
                </div>
            </UForm>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useCartStore } from '@/modules/cart/cart.store';
import { useRouter } from 'vue-router';
import { createOrderApi } from '@/modules/order/order.api';
import { useUserAddresses } from '@/modules/user/submodules/address/address.composable';
import CreateAddressModal from '@/modules/checkout/components/modal/CreateAddressModal.vue';
import type { CreateAddressDto } from '@/modules/user/submodules/address/address.dto';

const cartStore = useCartStore();
const { cart, clearCart } = cartStore;
const paymentMethod = ref('COD');
const router = useRouter();

// Address logic
const { addresses, isLoading, selectedAddressId, fetchAddresses, addAddress } = useUserAddresses();

const paymentMethods = ref([
    {
        label: 'Thanh toán khi nhận hàng',
        value: 'COD',
    },
    {
        label: 'Chuyển khoản ngân hàng',
        value: 'BANK',
    },
    {
        label: 'Thanh toán qua MoMo',
        value: 'MOMO',
    },
]);

// State cho UForm checkout
const checkoutFormState = reactive({
    addressId: '',
    paymentMethod: 'COD',
});

const overlay = useOverlay();

onMounted(() => {
    fetchAddresses();
});

async function openCreateAddress() {
    const modal = overlay.create(CreateAddressModal);
    await modal.open().then((result: any) => {
        if (result) {
            addAddress(result.address as CreateAddressDto);
        }
    });
}

async function submitOrder() {
    if (!selectedAddressId.value) return;
    await createOrderApi({
        addressId: selectedAddressId.value,
        payment: {
            paymentMethod: paymentMethod.value,
            amount: cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0,
        },
        details:
            cart?.items.map((item) => ({
                variantId: item.variantId,
                quantity: item.quantity,
                price: item.price,
            })) || [],
    });
    await clearCart();
    router.push('/order/list');
}
</script>
