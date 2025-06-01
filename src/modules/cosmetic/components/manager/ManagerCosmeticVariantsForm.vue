<script setup lang="ts">
import { useCosmeticCreateStore } from '@/modules/cosmetic/stores/useCosmeticCreateStore';
import ManagerCosmeticOptionModal from '@/modules/cosmetic/components/manager/ManagerCosmeticOptionModal.vue';
import UFileUpload from '@/common/components/UFileUpload.vue';
const cosmetic = useCosmeticCreateStore();
const overlay = useOverlay();

const addOptionModal = overlay.create(ManagerCosmeticOptionModal);

async function openOptionModal() {
    const instance = addOptionModal.open();
    const { isCreated, data } = (await instance) as { isCreated: boolean; data: any };
    if (isCreated && data) {
        cosmetic.addOption(data);
        addOptionModal.close();
    }
}

function removeVariant(idx: number) {
    if (cosmetic.form.variants.length > 1) {
        cosmetic.removeVariant(idx);
    }
}
</script>

<template>
    <div class="space-y-4 border rounded-lg shadow p-6">
        <div
            v-for="(variant, idx) in cosmetic.form.variants"
            :key="idx"
            class="border rounded-lg p-4 relative bg-primary-200 dark:bg-primary-900"
        >
            <div class="absolute top-2 right-2">
                <UButton
                    size="xs"
                    color="red"
                    @click="removeVariant(idx)"
                    :disabled="cosmetic.form.variants.length === 1"
                    >Xóa</UButton
                >
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField label="Tên variant" name="name">
                    <UInput v-model="variant.name" placeholder="Tên variant" class="w-full" />
                </UFormField>
                <UFormField label="SKU" name="sku">
                    <UInput v-model="variant.sku" placeholder="SKU" class="w-full" />
                </UFormField>
                <UFormField label="Giá" name="price">
                    <UInput
                        v-model.number="variant.price"
                        type="number"
                        min="0"
                        placeholder="Giá"
                        class="w-full"
                    />
                </UFormField>
                <UFormField label="Tồn kho" name="stock">
                    <UInput
                        v-model.number="variant.stock"
                        type="number"
                        min="0"
                        placeholder="Tồn kho"
                        class="w-full"
                    />
                </UFormField>
                <UFormField label="Hình ảnh" name="image">
                    <UFileUpload v-model="variant.image" accept="image/*" class="w-full" />
                </UFormField>
                <UFormField label="Option">
                    <div class="flex gap-2 items-center">
                        <USelectMenu
                            v-model="variant.optionIds"
                            :items="cosmetic.options"
                            value-key="value"
                            multiple
                            placeholder="Chọn option"
                            class="w-full"
                        />
                        <UButton size="xs" @click="openOptionModal">Thêm option</UButton>
                    </div>
                    <div
                        v-if="!variant.optionIds || variant.optionIds.length === 0"
                        class="text-red-500 text-xs mt-1"
                    >
                        Mỗi variant phải có ít nhất 1 option.
                    </div>
                </UFormField>
            </div>
        </div>
        <UButton size="xs" @click="cosmetic.addVariant">Thêm variant</UButton>
    </div>
</template>
