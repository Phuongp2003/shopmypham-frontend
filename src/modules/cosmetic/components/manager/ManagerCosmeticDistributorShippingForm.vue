<script setup lang="ts">
import { useCosmeticCreateStore } from '@/modules/cosmetic/stores/useCosmeticCreateStore';
const cosmetic = useCosmeticCreateStore();
</script>
<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg shadow p-6">
        <UFormField label="Nhà phân phối" name="distributorId">
            <USelectMenu
                v-model="cosmetic.form.distributorId"
                value-key="value"
                :items="cosmetic.distributors"
                placeholder="Chọn nhà phân phối"
                class="w-full"
            />
        </UFormField>
        <UFormField label="Chính sách vận chuyển" name="shippingPolicyId">
            <div class="flex gap-2 items-center">
                <USelect
                    v-model="cosmetic.form.shippingPolicyId"
                    :items="cosmetic.shippingPolicies"
                    placeholder="Chọn chính sách vận chuyển"
                    class="w-full"
                />
                <UButton size="xs" @click="$emit('add-shipping-policy')">Thêm mới</UButton>
            </div>
        </UFormField>
    </div>
</template>
