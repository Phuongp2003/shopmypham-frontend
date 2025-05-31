<script setup lang="ts">
import type { CreateAddressDto } from '@/modules/user/submodules/address/address.dto';
import { reactive } from 'vue';
const emit = defineEmits<{ close: [any] }>();
const formState = reactive({
  recipientName: '',
  phone: '',
  addressLine: '',
  district: '',
  city: '',
});
function handleSave() {
  if (!formState.recipientName || !formState.phone || !formState.addressLine || !formState.district || !formState.city) return;
  emit('close', { address: formState as CreateAddressDto });
}
function handleCancel() {
  emit('close', false);
}
</script>
<template>
  <UModal title="Thêm địa chỉ mới">
    <template #content>
      <div class="p-4">
        <UForm :state="formState" @submit="handleSave" class="space-y-2">
          <UFormField label="Tên người nhận" name="recipientName" required>
            <UInput v-model="formState.recipientName" placeholder="Tên người nhận" class="w-full" required />
          </UFormField>
          <UFormField label="Số điện thoại" name="phone" required>
            <UInput v-model="formState.phone" placeholder="Số điện thoại" class="w-full" required />
          </UFormField>
          <UFormField label="Địa chỉ" name="addressLine" required>
            <UInput v-model="formState.addressLine" placeholder="Địa chỉ" class="w-full" required />
          </UFormField>
          <UFormField label="Quận/Huyện" name="district" required>
            <UInput v-model="formState.district" placeholder="Quận/Huyện" class="w-full" required />
          </UFormField>
          <UFormField label="Tỉnh/Thành phố" name="city" required>
            <UInput v-model="formState.city" placeholder="Tỉnh/Thành phố" class="w-full" required />
          </UFormField>
          <div class="flex justify-end gap-2 mt-2">
            <UButton type="button" color="gray" @click="handleCancel">Hủy</UButton>
            <UButton type="submit" color="primary">Lưu</UButton>
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
