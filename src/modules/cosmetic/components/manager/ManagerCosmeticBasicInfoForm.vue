<script setup lang="ts">
import { useCosmeticCreateStore } from '@/modules/cosmetic/stores/useCosmeticCreateStore';
import UFileUpload from '@/common/components/UFileUpload.vue';

const cosmetic = useCosmeticCreateStore();
const cosmeticTypeOptions = [
    { label: 'SKINCARE', value: 'SKINCARE' },
    { label: 'MAKEUP', value: 'MAKEUP' },
    { label: 'HAIRCARE', value: 'HAIRCARE' },
    { label: 'FRAGRANCE', value: 'FRAGRANCE' },
    { label: 'BODYCARE', value: 'BODYCARE' },
];
const price = computed(() => {
    if (cosmetic.form.variants.length > 0) {
        const lowestPrice = Math.min(...cosmetic.form.variants.map((variant) => variant.price));
        return lowestPrice;
    }
    return 0;
});
const stock = computed(() => {
    if (cosmetic.form.variants.length > 0) {
        const totalStock = cosmetic.form.variants.reduce((acc, curr) => acc + curr.stock, 0);
        return totalStock;
    }
    return 0;
});
</script>
<template>
    <UForm :state="cosmetic.form" class="space-y-4 border rounded-lg shadow p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Tên sản phẩm" name="name">
                <UInput
                    v-model="cosmetic.form.name"
                    placeholder="Nhập tên sản phẩm"
                    class="w-full"
                />
            </UFormField>
            <UFormField label="Loại sản phẩm" name="type">
                <USelectMenu
                    v-model="cosmetic.form.type"
                    :items="cosmeticTypeOptions"
                    value-key="value"
                    placeholder="Chọn loại sản phẩm"
                    class="w-full"
                />
            </UFormField>
            <UFormField label="Giá" name="price">
                <UInput
                    v-model.number="price"
                    type="number"
                    min="0"
                    disabled
                    placeholder="Lấy theo giá của biến thể có giá cao nhất"
                    class="w-full"
                />
            </UFormField>
            <UFormField label="Tồn kho" name="stock">
                <UInput
                    v-model.number="stock"
                    type="number"
                    min="0"
                    disabled
                    placeholder="Lấy theo tổng số lượng của biến thể"
                    class="w-full"
                />
            </UFormField>
        </div>
        <UFormField label="Mô tả" name="description">
            <UTextarea
                v-model="cosmetic.form.description"
                placeholder="Nhập mô tả sản phẩm"
                :rows="3"
                class="w-full"
            />
        </UFormField>
        <UFormField label="Hướng dẫn sử dụng" name="usageInstructions">
            <UTextarea
                v-model="cosmetic.form.usageInstructions"
                placeholder="Nhập hướng dẫn sử dụng"
                :rows="2"
                class="w-full"
            />
        </UFormField>
        <UFormField label="Hình ảnh" name="image">
            <UFileUpload v-model="cosmetic.form.image" accept="image/*" class="w-full" />
        </UFormField>
    </UForm>
</template>
