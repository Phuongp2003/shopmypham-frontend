<template>
    <div class="max-w-3xl mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6">Chi tiết đơn hàng</h1>
        <div v-if="loading" class="text-center">Đang tải...</div>
        <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
        <div v-else-if="!order" class="text-center">Không tìm thấy đơn hàng.</div>
        <div v-else>
            <div class="mb-4 space-y-1">
                <div><b>Mã đơn:</b> {{ order.id }}</div>
                <div>
                    <b>Ngày đặt:</b> {{ new Date(order.payment.createdAt).toLocaleString('vi-VN') }}
                </div>
                <div class="flex items-center gap-2">
                    <b>Trạng thái đơn hàng:</b>
                    <UBadge :color="statusColor(order.status)">{{ order.status }}</UBadge>
                    <b>Trạng thái thanh toán:</b>
                    <UBadge :color="statusColor(order.payment.status)">{{
                        order.payment.status
                    }}</UBadge>
                </div>
                <div>
                    <b>Địa chỉ:</b> {{ order.address?.addressLine }}, {{ order.address?.district }},
                    {{ order.address?.city }}
                </div>
            </div>
            <div>
                <h2 class="font-semibold mb-2">Sản phẩm</h2>
                <UTable :data="order.details" :columns="columns" class="mb-2" />
            </div>
            <div class="mt-4 text-lg font-semibold">
                <b>Tổng tiền:</b> {{ calcTotal(order).toLocaleString() }}₫
            </div>
            <div class="my-4 text-lg font-semibold">
                <b>Phương thức thanh toán:</b> {{ order.payment.paymentMethod }}
            </div>
            <UButton
                v-if="order.payment.status === 'PENDING' && order.payment.paymentMethod === 'MOMO'"
                color="primary"
                @click="handlePay"
                >Thanh toán</UButton
            >
            <UButton
                v-if="order.payment.status === 'PENDING' && order.payment.paymentMethod === 'BANK'"
                color="primary"
                @click="handleFakePayment"
                >Thanh toán</UButton
            >
            <UButton
                v-if="order.payment.status === 'COMPLETED' && order.status === 'DELIVERED'"
                color="primary"
                @click="handleOpenReviewModal"
                >Đánh giá</UButton
            >
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, h, resolveComponent } from 'vue';
import { getOrderByIdApi } from '../order.api';
import { useRoute } from 'vue-router';
import type { OrderResponse } from '../order.dto';
import type { TableColumn } from '@nuxt/ui/dist/runtime/types';
import { paymentViaMomoApi, createPaymentApi } from '@/modules/payment/payment.api';
import type { PaymentStatus } from '@/modules/payment/payment.types';
import { statusColor } from '../order.helper';
import ReviewModal from '@/modules/order/components/Modal/ReviewsModal.vue';

import {
    createReviewApi,
    updateReviewApi,
} from '@/modules/cosmetic/submodules/review/cosmeticReview.api';

const UBadge = resolveComponent('UBadge');
const UButton = resolveComponent('UButton');
const UIcon = resolveComponent('UIcon');
const order = ref<OrderResponse | null>(null);
const loading = ref(false);
const error = ref('');
const route = useRoute();
const overlay = useOverlay();

const reviewModal = overlay.create(ReviewModal);

async function handleOpenReviewModal(row: any, type: 'create' | 'edit' = 'create') {
    const instance = reviewModal.open({ review: getReview(row.cosmeticId) });
    await instance.then((res: any) => {
        if (!res) return;
        if (type === 'create') {
            createReviewApi({
                cosmeticId: row.cosmeticId,
                orderId: route.params.id as string,
                rating: res.review.rating,
                title: res.review.title,
                content: res.review.content,
            }).then(async () => {
                loading.value = true;
                try {
                    order.value = await getOrderByIdApi(route.params.id as string);
                } catch (err: any) {
                    error.value = err.message || 'Lỗi tải đơn hàng';
                } finally {
                    loading.value = false;
                }
            });
        } else {
            updateReviewApi(row.review.id, {
                rating: res.review.rating,
                title: res.review.title,
                content: res.review.content,
            }).then(async () => {
                loading.value = true;
                try {
                    order.value = await getOrderByIdApi(route.params.id as string);
                } catch (err: any) {
                    error.value = err.message || 'Lỗi tải đơn hàng';
                } finally {
                    loading.value = false;
                }
            });
        }
    });
}

function calcTotal(order: OrderResponse) {
    return order.details.reduce((sum, d) => sum + d.price * d.quantity, 0);
}

const columns: TableColumn<any>[] = [
    {
        accessorKey: 'image',
        header: 'Ảnh',
        cell: ({ row }: { row: { original: any } }) =>
            h('img', { src: row.original.image, width: 50, height: 50 }),
    },
    {
        accessorKey: 'name',
        header: 'Tên sản phẩm',
    },
    {
        accessorKey: 'quantity',
        header: 'Số lượng',
    },
    {
        accessorKey: 'price',
        header: 'Giá',
        cell: ({ row }: { row: { original: any } }) => `${row.original.price.toLocaleString()}₫`,
    },
    {
        accessorKey: 'review',
        header: 'Đánh giá',
        cell: ({ row }: { row: { original: any } }) => {
            const review = getReview(row.original.cosmeticId);
            if (review) {
                return h(
                    UButton,
                    {
                        color: 'primary',
                        variant: 'ghost',
                        onClick: () => handleOpenReviewModal(row.original, 'edit'),
                    },
                    [
                        ...Array(review.rating)
                            .fill(0)
                            .map(() =>
                                h(UIcon, {
                                    name: 'i-lucide-star',
                                    class: 'w-4 h-4 text-yellow-400 fill-current',
                                }),
                            ),
                        ...Array(5 - review.rating)
                            .fill(0)
                            .map(() =>
                                h(UIcon, {
                                    name: 'i-lucide-star-solid',
                                    class: 'w-4 h-4 text-yellow-400 fill-current',
                                }),
                            ),
                    ],
                );
            } else
                return h(
                    UButton,
                    {
                        color: 'primary',
                        variant: 'ghost',
                        disabled: order.value?.payment.status !== 'COMPLETED' || order.value?.status !== 'DELIVERED',
                        onClick: () => handleOpenReviewModal(row.original),
                    },
                    'Đánh giá',
                );
        },
    },
];
const toast = useToast();
const handlePay = () => {
    paymentViaMomoApi({
        orderId: order.value?.id,
        amount: calcTotal(order.value!),
    }).then((res) => {
        if (res.resultCode === 0) {
            window.open(res.payUrl, '_blank');
        } else {
            toast.add({
                title: 'Lỗi thanh toán',
                description: res.message,
                color: 'error',
            });
        }
    });
};

const getReview = (cosmeticId: string) => {
    return order.value?.reviews.find((review: any) => review.cosmeticId === cosmeticId);
};

const handleFakePayment = () => {
    const fakePaymentData = {
        orderId: order.value?.id || '',
        status: 'COMPLETED' as PaymentStatus,
        paymentMethod: 'BANK',
        amount: calcTotal(order.value!),
    };
    createPaymentApi(fakePaymentData).then((res) => {
        console.log(res);
    });
};

onMounted(async () => {
    loading.value = true;
    try {
        order.value = await getOrderByIdApi(route.params.id as string);
        console.log(order.value);
    } catch (err: any) {
        error.value = err.message || 'Lỗi tải đơn hàng';
    } finally {
        loading.value = false;
    }
});
</script>
