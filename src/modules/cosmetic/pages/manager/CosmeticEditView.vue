<template>
  <div v-if="isLoading">
    <UProgress indeterminate />
  </div>
  <div class="cosmetic-edit-view space-y-8 p-6" v-if="!isLoading">
    <h1 class="text-2xl font-bold mb-4">Chỉnh sửa sản phẩm mỹ phẩm</h1>
    <!-- 1. Thông tin cơ bản -->
    <section class="mb-4">
      <ManagerCosmeticBasicInfoForm />
    </section>
    <!-- 2. Nhà phân phối & Chính sách vận chuyển -->
    <section class="mb-4">
      <ManagerCosmeticDistributorShippingForm @add-shipping-policy="openShippingPolicyModal" />
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
    <div class="mt-8 flex gap-2 justify-end">
      <UButton color="gray" size="lg" class="px-8 py-2" @click="handleReset">Reset</UButton>
      <UButton color="primary" size="lg" class="px-8 py-2 shadow" @click="handleSubmit">Lưu thay đổi</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCosmeticCreateStore } from '@/modules/cosmetic/stores/useCosmeticCreateStore'
import { getCosmeticByIdApi } from '@/modules/cosmetic/cosmetic.api'
import ManagerCosmeticBasicInfoForm from '@/modules/cosmetic/components/manager/ManagerCosmeticBasicInfoForm.vue'
import ManagerCosmeticDistributorShippingForm from '@/modules/cosmetic/components/manager/ManagerCosmeticDistributorShippingForm.vue'
import ManagerCosmeticSpecificationsForm from '@/modules/cosmetic/components/manager/ManagerCosmeticSpecificationsForm.vue'
import ManagerCosmeticVariantsForm from '@/modules/cosmetic/components/manager/ManagerCosmeticVariantsForm.vue'
import ManagerCosmeticBenefitsForm from '@/modules/cosmetic/components/manager/ManagerCosmeticBenefitsForm.vue'
import ManagerCosmeticBadgesForm from '@/modules/cosmetic/components/manager/ManagerCosmeticBadgesForm.vue'
import ManagerShippingPolicyModal from '@/modules/cosmetic/components/manager/ManagerShippingPolicyModal.vue'

const cosmetic = useCosmeticCreateStore()
const overlay = useOverlay()
const route = useRoute()
const toast = useToast()

const isLoading = ref(true)

async function openShippingPolicyModal() {
  const modal = overlay.create(ManagerShippingPolicyModal)
  const instance = modal.open()
  const result = await instance as { isCreated: boolean, data?: any }
  if (result.isCreated && result.data) {
    cosmetic.addShippingPolicy(result.data)
    cosmetic.form.shippingPolicyId = result.data.value
  }
}

async function handleSubmit() {
    await cosmetic.submit('update', cosmeticId)
}

function handleReset() {
  cosmetic.reset()
  if (cosmeticId) fetchCosmetic()
}

const cosmeticId = route.params.id as string

async function fetchCosmetic() {
  if (!cosmeticId) return
  const res = await getCosmeticByIdApi(cosmeticId)
  // Map response về đúng form
  cosmetic.form.name = res.name || ''
  cosmetic.form.description = res.description || ''
  cosmetic.form.price = res.price || 0
  cosmetic.form.stock = res.stock || 0
  cosmetic.form.type = res.type || '' // Nếu có type thì map
  cosmetic.form.image = res.image || ''
  cosmetic.form.usageInstructions = res.usageInstructions || ''
  cosmetic.form.distributorId = res.distributor?.id || ''
  cosmetic.form.shippingPolicyId = res.shippingPolicy?.id || ''
  cosmetic.form.specifications = (res.specifications || []).map(s => ({ key: s.specKey, value: s.specValue }))
  cosmetic.form.variants = (res.variants || []).map(v => ({
    name: v.name,
    sku: v.sku || '',
    price: v.price,
    stock: v.inStock,
    image: v.image,
    optionIds: v.options?.map(o => o.id) || []
  }))
  cosmetic.form.benefits = (res.benefits || []).map(b => ({
    benefitKey: b.benefitKey,
    benefitValue: b.benefitValue,
    orderIndex: b.orderIndex
  }))
  cosmetic.form.badges = (res.badges || []).map(b => ({
    id: b.id,
    badgeType: b.badgeType,
    title: b.title,
    icon: b.icon,
    color: b.color,
    isActive: b.isActive,
    orderIndex: b.orderIndex
  }))
}

onMounted(async () => {
  if (!cosmeticId) {
    toast.add({
      title: 'Không tìm thấy sản phẩm để chỉnh sửa',
      color: 'red',
      icon: 'i-heroicons-exclamation-triangle',
    })
    return
  }
  await cosmetic.fetchAll()
  await fetchCosmetic()
  isLoading.value = false
})

onUnmounted(() => {
  cosmetic.resetAll()
})
</script>

<style scoped>
.cosmetic-edit-view {
  max-width: 900px;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}
</style>
