<template>
    <div class="flex flex-col gap-6 min-h-[60vh] bg-gray-100 dark:bg-gray-900 py-8">
        <UCard
            class="w-10/12 mx-auto min-h-full shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
            <template #header>
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Quản lý đơn hàng
                    </h2>
                    <div class="flex gap-2">
                        <UInput
                            v-model="search"
                            placeholder="Tìm kiếm mã đơn..."
                            class="w-64"
                            @change="fetchOrders"
                        />
                        <UButton color="primary" @click="fetchOrders">Tìm kiếm</UButton>
                    </div>
                </div>
            </template>
            <div v-if="isLoading" class="text-center py-8 text-gray-700 dark:text-gray-200">
                Đang tải...
            </div>
            <div v-else-if="error" class="text-center py-8 text-red-500">Lỗi: {{ error }}</div>
            <div v-else>
                <UTable
                    :data="orders"
                    :columns="columns"
                    :loading="isLoading"
                    :pagination="{ pageIndex: page, pageSize: limit }"
                    :options="{ getPaginationRowModel: getPaginationRowModel() }"
                    class="flex-1"
                />
                <div class="flex justify-center border-t border-default pt-4">
                    <UPagination
                        :default-page="page"
                        :items-per-page="limit"
                        :total="total"
                        @update:page="onPageChange"
                    />
                </div>
            </div>
        </UCard>
    </div>
</template>
<script setup lang="ts">
import { h, ref, resolveComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAllOrdersManagerApi } from '../../order.api';
import type { OrderResponse } from '../../order.dto';
import type { TableColumn } from '@nuxt/ui/dist/runtime/types';
import { getPaginationRowModel } from '@tanstack/vue-table';

const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');
const UInput = resolveComponent('UInput');
const UCard = resolveComponent('UCard');
const UTable = resolveComponent('UTable');
const UPagination = resolveComponent('UPagination');
const router = useRouter();

const orders = ref<OrderResponse[]>([]);
const isLoading = ref(false);
const search = ref('');
const error = ref('');
const page = ref(1);
const limit = ref(10);
const total = ref(0);

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

function getRowItems(row: OrderResponse) {
    return [
        { type: 'label', label: 'Hành động' },
        {
            label: 'Xem chi tiết',
            icon: 'i-lucide-eye',
            onSelect: () => router.push(`/manager/orders/${row.id}`),
        },
        {
            label: 'Cập nhật trạng thái',
            icon: 'i-lucide-refresh-cw',
            onSelect: () => handleUpdateStatus(row),
        },
    ];
}

const columns: TableColumn<OrderResponse>[] = [
    { accessorKey: 'id', header: 'Mã đơn' },
    {
        accessorKey: 'createdAt',
        header: 'Ngày đặt',
        cell: ({ row }: { row: { original: OrderResponse } }) =>
            new Date(row.original.payment?.createdAt || row.original.createdAt).toLocaleString(
                'vi-VN',
            ),
    },
    {
        accessorKey: 'status',
        header: 'Trạng thái',
        cell: ({ row }: { row: { original: OrderResponse } }) =>
            h(
                resolveComponent('UBadge'),
                { color: statusColor(row.original.status) },
                () => row.original.status,
            ),
    },
    {
        accessorKey: 'payment.status',
        header: 'Trạng thái thanh toán',
        cell: ({ row }: { row: { original: OrderResponse } }) =>
            h(
                resolveComponent('UBadge'),
                { color: statusColor(row.original.payment?.status) },
                () => row.original.payment?.status,
            ),
    },
    {
        accessorKey: 'payment.paymentMethod',
        header: 'Phương thức thanh toán',
        cell: ({ row }: { row: { original: OrderResponse } }) =>
            h(
                resolveComponent('UBadge'),
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
        header: 'Hành động',
        cell: ({ row }: { row: { original: OrderResponse } }) =>
            h(
                'div',
                { class: 'text-right' },
                h(
                    UDropdownMenu,
                    {
                        items: getRowItems(row.original),
                        'aria-label': 'Actions dropdown',
                        content: { align: 'end' },
                    },
                    () =>
                        h(UButton, {
                            icon: 'i-lucide-ellipsis-vertical',
                            color: 'neutral',
                            variant: 'ghost',
                            class: 'ml-auto',
                            'aria-label': 'Actions dropdown',
                        }),
                ),
            ),
    },
];

const fetchOrders = async () => {
    isLoading.value = true;
    try {
        const res = await getAllOrdersManagerApi({
            search: search.value,
            page: page.value,
            limit: limit.value,
        });
        orders.value = res.orders || [];
        total.value = res.total || 0;
        page.value = res.page || 1;
        limit.value = res.limit || 10;
    } catch (err: any) {
        error.value = err.message || 'Lỗi tải đơn hàng';
    } finally {
        isLoading.value = false;
    }
};
const onPageChange = (newPage: number) => {
    page.value = newPage;
    fetchOrders();
};

function handleUpdateStatus(order: OrderResponse) {
    // TODO: Hiện modal cập nhật trạng thái, gọi API updateOrderApi
    alert('Chức năng cập nhật trạng thái sẽ được bổ sung!');
}

onMounted(() => {
    fetchOrders();
});
</script>
