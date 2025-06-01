<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps({
    isEditing: { type: Boolean, default: false },
    distributor: { type: Object, default: null },
});
const emit = defineEmits(['close']);

const form = ref({
    name: '',
    address: '',
    phone: '',
    email: '',
});

watch(
    () => props.distributor,
    (val) => {
        if (val) {
            form.value = {
                name: val.name || '',
                address: val.address || '',
                phone: val.phone || '',
                email: val.email || '',
            };
        } else {
            form.value = { name: '', address: '', phone: '', email: '' };
        }
    },
    { immediate: true },
);

function handleSubmit() {
    if (!form.value.name) return;
    emit('close', { isCreated: true, data: { ...form.value } });
}
function handleCancel() {
    emit('close', { isCreated: false });
}
</script>
<template>
    <UModal
        title="{{ isEditing ? 'Sửa nhà phân phối' : 'Thêm nhà phân phối' }}"
        @close="handleCancel"
    >
        <template #content>
            <div class="p-6 w-96">
                <UForm :state="form">
                    <UFormField label="Tên nhà phân phối" name="name" required>
                        <UInput v-model="form.name" class="w-full" required />
                    </UFormField>
                    <UFormField label="Địa chỉ" name="address">
                        <UInput v-model="form.address" class="w-full" />
                    </UFormField>
                    <UFormField label="Số điện thoại" name="phone">
                        <UInput v-model="form.phone" class="w-full" />
                    </UFormField>
                    <UFormField label="Email" name="email">
                        <UInput v-model="form.email" class="w-full" type="email" />
                    </UFormField>
                </UForm>
                <div class="flex justify-end mt-4 gap-2">
                    <UButton @click="handleCancel" variant="ghost">Huỷ bỏ</UButton>
                    <UButton color="primary" @click="handleSubmit">{{
                        isEditing ? 'Cập nhật' : 'Tạo mới'
                    }}</UButton>
                </div>
            </div>
        </template>
    </UModal>
</template>
