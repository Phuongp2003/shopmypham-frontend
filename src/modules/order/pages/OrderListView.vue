<template>
    <div class="max-w-5xl mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6">Đơn hàng của bạn</h1>
        <div v-if="loading" class="text-center">Đang tải...</div>
        <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
        <div v-else-if="!orders.length" class="text-center">Chưa có đơn hàng nào.</div>
        <UTable v-else :data="orders" :columns="columns" :loading="loading" class="w-full" />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, h, resolveComponent } from 'vue';
import { getAllOrdersApi } from '../order.api';
import type { OrderResponse } from '../order.dto';
import type { TableColumn } from '@nuxt/ui/dist/runtime/types';

const UBadge = resolveComponent('UBadge');
const RouterLink = resolveComponent('RouterLink');

const orders = ref<OrderResponse[]>([]);
const loading = ref(false);
const error = ref('');

function calcTotal(order: OrderResponse) {
    return order.details.reduce((sum, d) => sum + d.price * d.quantity, 0);
}

function statusColor(status: string) {
    switch (status) {
        case 'PENDING':
        case 'COD':
            return 'neutral';
        case 'PROCESSING':
        case 'cash':
            return 'info';
        case 'SHIPPED':
            return 'warning';
        case 'DELIVERED':
        case 'MOMO':
            return 'success';
        case 'CANCELLED':
        case 'FAILED':
            return 'error';
        default:
            return 'neutral';
    }
}

const columns: TableColumn<OrderResponse>[] = [
    {
        accessorKey: 'id',
        header: 'Mã đơn',
    },
    {
        accessorKey: 'createdAt',
        header: 'Ngày đặt',
        cell: ({ row }: { row: { original: OrderResponse } }) =>
            new Date(row.original.payment.createdAt).toLocaleString('vi-VN'),
    },
    {
        accessorKey: 'status',
        header: 'Trạng thái',
        cell: ({ row }: { row: { original: OrderResponse } }) =>
            h(UBadge, { color: statusColor(row.original.status) }, () => row.original.status),
    },
    {
        accessorKey: 'payment.status',
        header: 'Trạng thái thanh toán',
        cell: ({ row }: { row: { original: OrderResponse } }) =>
            h(
                UBadge,
                { color: statusColor(row.original.payment?.status) },
                () => row.original.payment?.status,
            ),
    },
    {
        accessorKey: 'payment.paymentMethod',
        header: 'Phương thức thanh toán',
        cell: ({ row }: { row: { original: OrderResponse } }) =>
            h(
                UBadge,
                { color: statusColor(row.original.payment?.paymentMethod) },
                () => row.original.payment?.paymentMethod,
            ),
    },
    {
        id: 'total',
        header: 'Tổng tiền',
        cell: ({ row }: { row: { original: OrderResponse } }) =>
            `${calcTotal(row.original).toLocaleString()}₫`,
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }: { row: { original: OrderResponse } }) =>
            h(RouterLink, { to: `/order/${row.original.id}`, class: 'text-pink-500' }, () => 'Xem'),
    },
];

onMounted(async () => {
    loading.value = true;
    try {
        orders.value = (await getAllOrdersApi({})).orders || [];
        console.log(orders.value);
    } catch (err: any) {
        error.value = err.message || 'Lỗi tải đơn hàng';
    } finally {
        loading.value = false;
    }
});
</script>
