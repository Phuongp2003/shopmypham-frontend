<template>
    <div class="cosmetic-create-view space-y-8 p-6">
        <h1 class="text-2xl font-bold mb-4">Tạo mới sản phẩm mỹ phẩm</h1>
        <!-- 1. Thông tin cơ bản -->
        <section class="mb-4">
            <ManagerCosmeticBasicInfoForm />
        </section>

        <!-- 2. Nhà phân phối & Chính sách vận chuyển -->
        <section class="mb-4">
            <ManagerCosmeticDistributorShippingForm
                @add-shipping-policy="openShippingPolicyModal"
            />
        </section>

        <!-- 3. Thông số kỹ thuật -->
        <section class="mb-4">
            <ManagerCosmeticSpecificationsForm />
        </section>

        <!-- 4. Variants -->
        <section class="mb-4">
            <ManagerCosmeticVariantsForm />
        </section>

        <!-- 5. Benefits -->
        <section class="mb-4">
            <ManagerCosmeticBenefitsForm />
        </section>

        <!-- 6. Badges -->
        <section class="mb-4">
            <ManagerCosmeticBadgesForm />
        </section>

        <!-- Nút submit -->
        <div class="mt-8 flex justify-end">
            <UButton color="primary" size="lg" class="px-8 py-2 shadow" @click="handleSubmit"
                >Tạo mới</UButton
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCosmeticCreateStore } from '@/modules/cosmetic/stores/useCosmeticCreateStore';
import ManagerCosmeticBasicInfoForm from '@/modules/cosmetic/components/manager/ManagerCosmeticBasicInfoForm.vue';
import ManagerCosmeticDistributorShippingForm from '@/modules/cosmetic/components/manager/ManagerCosmeticDistributorShippingForm.vue';
import ManagerCosmeticSpecificationsForm from '@/modules/cosmetic/components/manager/ManagerCosmeticSpecificationsForm.vue';
import ManagerCosmeticVariantsForm from '@/modules/cosmetic/components/manager/ManagerCosmeticVariantsForm.vue';
import ManagerCosmeticBenefitsForm from '@/modules/cosmetic/components/manager/ManagerCosmeticBenefitsForm.vue';
import ManagerCosmeticBadgesForm from '@/modules/cosmetic/components/manager/ManagerCosmeticBadgesForm.vue';
import ManagerShippingPolicyModal from '@/modules/cosmetic/components/manager/ManagerShippingPolicyModal.vue';

const cosmetic = useCosmeticCreateStore();
const overlay = useOverlay();

onMounted(async () => {
    await cosmetic.fetchAll();
});

async function openShippingPolicyModal() {
    const modal = overlay.create(ManagerShippingPolicyModal);
    const instance = modal.open();
    const result = (await instance) as { isCreated: boolean; data?: any };
    if (result.isCreated && result.data) {
        cosmetic.addShippingPolicy(result.data);
        cosmetic.form.shippingPolicyId = result.data.value;
    }
}

async function handleSubmit() {
    await cosmetic.submit('create');
}

onUnmounted(() => {
    cosmetic.resetAll();
});
</script>

<style scoped>
.cosmetic-create-view {
    max-width: 900px;
    margin: 0 auto;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}
</style>
