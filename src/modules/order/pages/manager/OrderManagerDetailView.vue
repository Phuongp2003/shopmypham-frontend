<template>
    <div class="max-w-3xl mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6">Chi tiết đơn hàng (Quản lý)</h1>
        <div v-if="loading" class="text-center">Đang tải...</div>
        <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
        <div v-else-if="!order" class="text-center">Không tìm thấy đơn hàng.</div>
        <div v-else>
            <div class="mb-4 space-y-1">
                <div><b>Mã đơn:</b> {{ order.id }}</div>
                <div>
                    <b>Ngày đặt:</b>
                    {{
                        new Date(order.payment?.createdAt || order.createdAt).toLocaleString(
                            'vi-VN',
                        )
                    }}
                </div>
                <div class="flex items-center gap-2">
                    <b>Trạng thái đơn hàng:</b>
                    <UBadge :color="statusColor(order.status)">{{ order.status }}</UBadge>
                    <UButton size="xs" color="info" @click="showStatusModal = true"
                        >Cập nhật trạng thái</UButton
                    >
                    <b>Trạng thái thanh toán:</b>
                    <UBadge :color="statusColor(order.payment?.status)">{{
                        order.payment?.status
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
                <b>Phương thức thanh toán:</b> {{ order.payment?.paymentMethod }}
            </div>
            <UButton color="primary" class="mt-2" @click="printInvoice">In hóa đơn</UButton>
        </div>
        <UModal v-model="showStatusModal" title="Cập nhật trạng thái đơn hàng">
            <template #content>
                <div class="p-4">
                    <UForm>
                        <UFormField label="Trạng thái mới">
                            <USelect v-model="newStatus" :items="statusOptions" class="w-full" />
                        </UFormField>
                    </UForm>
                    <div class="flex justify-end gap-2 mt-4">
                        <UButton variant="ghost" @click="showStatusModal = false">Hủy</UButton>
                        <UButton color="primary" @click="updateStatus">Cập nhật</UButton>
                    </div>
                </div>
            </template>
        </UModal>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, h, resolveComponent } from 'vue';
import { getOrderByIdApi, updateOrderApi } from '../../order.api';
import { useRoute } from 'vue-router';
import type { OrderResponse } from '../../order.dto';
import type { OrderStatus } from '../../order.types';
import type { TableColumn } from '@nuxt/ui/dist/runtime/types';

const UBadge = resolveComponent('UBadge');
const UButton = resolveComponent('UButton');
const UTable = resolveComponent('UTable');
const UForm = resolveComponent('UForm');
const UFormField = resolveComponent('UFormField');
const USelect = resolveComponent('USelect');
const UModal = resolveComponent('UModal');
const toast = useToast();

const order = ref<OrderResponse | null>(null);
const loading = ref(false);
const error = ref('');
const route = useRoute();
const showStatusModal = ref(false);
const newStatus = ref('');

const statusOptions = [
    { label: 'PENDING', value: 'PENDING' },
    { label: 'PROCESSING', value: 'PROCESSING' },
    { label: 'SHIPPED', value: 'SHIPPED' },
    { label: 'DELIVERED', value: 'DELIVERED' },
    { label: 'CANCELLED', value: 'CANCELLED' },
];

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
            return 'error';
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
        cell: ({ row }: { row: { original: any } }) =>
            h('img', { src: row.original.image, width: 50, height: 50 }),
    },
    { accessorKey: 'name', header: 'Tên sản phẩm' },
    { accessorKey: 'quantity', header: 'Số lượng' },
    {
        accessorKey: 'price',
        header: 'Giá',
        cell: ({ row }: { row: { original: any } }) => `${row.original.price.toLocaleString()}₫`,
    },
];

async function updateStatus() {
    if (!order.value) return;
    try {
        loading.value = true;
        await updateOrderApi(order.value.id, { status: newStatus.value as OrderStatus });
        toast.add({ title: 'Cập nhật trạng thái thành công', color: 'success' });
        order.value = await getOrderByIdApi(order.value.id);
        showStatusModal.value = false;
    } catch (err: any) {
        toast.add({ title: err.message || 'Lỗi cập nhật trạng thái', color: 'error' });
    } finally {
        loading.value = false;
    }
}
function printInvoice() {
    window.print();
}
onMounted(async () => {
    loading.value = true;
    try {
        order.value = await getOrderByIdApi(route.params.id as string);
        newStatus.value = order.value.status;
    } catch (err: any) {
        error.value = err.message || 'Lỗi tải đơn hàng';
    } finally {
        loading.value = false;
    }
});
</script>
