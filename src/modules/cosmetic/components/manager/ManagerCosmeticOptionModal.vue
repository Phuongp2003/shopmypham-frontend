<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits<{ close: [{ isCreated: boolean; data?: any }] }>();
const form = ref({ name: '', value: '' });
function handleCreate() {
    // TODO: call API tạo mới
    emit('close', { isCreated: true, data: form.value });
}
</script>
<template>
    <UModal @close="emit('close', { isCreated: false })" title="Thêm option">
        <template #content>
            <div class="p-6 w-96">
                <UForm :state="form">
                    <UFormField label="Tên option" name="name">
                        <UInput v-model="form.name" placeholder="Nhập tên option" />
                    </UFormField>
                    <UFormField label="Giá trị" name="value">
                        <UInput v-model="form.value" placeholder="Nhập giá trị option" />
                    </UFormField>
                </UForm>
                <div class="flex justify-end mt-4 gap-2">
                    <UButton @click="emit('close', { isCreated: false })">Hủy</UButton>
                    <UButton color="primary" @click="handleCreate">Tạo mới</UButton>
                </div>
            </div>
        </template>
    </UModal>
</template>
