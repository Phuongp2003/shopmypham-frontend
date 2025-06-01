<template>
    <div class="max-w-3xl mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6">Chi tiết đơn hàng</h1>
        <div v-if="loading" class="text-center">Đang tải...</div>
        <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
        <div v-else-if="!order" class="text-center">Không tìm thấy đơn hàng.</div>
        <div v-else>
            <div class="mb-4 space-y-1">
                <div><b>Mã đơn:</b> {{ order.id }}</div>
                <div><b>Ngày đặt:</b> {{ new Date(order.payment.createdAt).toLocaleString('vi-VN') }}</div>
                <div class="flex items-center gap-2">
                    <b>Trạng thái đơn hàng:</b>
                    <UBadge :color="statusColor(order.status)">{{ order.status }}</UBadge>
                    <b>Trạng thái thanh toán:</b>
                    <UBadge :color="statusColor(order.payment.status)">{{ order.payment.status }}</UBadge>
                </div>
                <div><b>Địa chỉ:</b> {{ order.address?.addressLine }}, {{ order.address?.district }}, {{ order.address?.city }}</div>
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
            <UButton v-if="order.payment.status === 'PENDING' && order.payment.paymentMethod === 'MOMO'" color="primary" @click="handlePay">Thanh toán</UButton>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, h, resolveComponent } from 'vue';
import { getOrderByIdApi } from '../order.api';
import { useRoute } from 'vue-router';
import type { OrderResponse } from '../order.dto';
import type { TableColumn } from '@nuxt/ui/dist/runtime/types';
import { paymentViaMomoApi } from '@/modules/payment/payment.api';

const UBadge = resolveComponent('UBadge');
const order = ref<OrderResponse | null>(null);
const loading = ref(false);
const error = ref('');
const route = useRoute();

function statusColor(status: string) {
    switch (status) {
        case 'PENDING':
            return 'neutral';
        case 'PROCESSING':
            return 'info';
        case 'SHIPPED':
            return 'warning';
        case 'DELIVERED':
            return 'success';
        case 'CANCELLED':
        case 'FAILED':
            return 'error';
        default:
            return 'gray';
    }
}

function calcTotal(order: OrderResponse) {
    return order.details.reduce((sum, d) => sum + d.price * d.quantity, 0);
}

const columns: TableColumn<any>[] = [
    {
        accessorKey: 'image',
        header: 'Ảnh',
        cell: ({ row }: { row: { original: any } }) => h('img', { src: row.original.image, width: 50, height: 50 }),
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
}

onMounted(async () => {
    loading.value = true;
    try {
        order.value = await getOrderByIdApi(route.params.id as string);
    } catch (err: any) {
        error.value = err.message || 'Lỗi tải đơn hàng';
    } finally {
        loading.value = false;
    }
});
</script>
