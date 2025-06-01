<template>
    <div class="space-y-6">
        <UFormField label="Tiêu đề" required>
            <UInput v-model="postStore.currentForm.title" class="w-full" />
        </UFormField>
        <UFormField label="Ảnh đại diện (thumbnail)">
            <UFileUpload v-model="postStore.currentForm.image" accept="image/*" :max-size="5" />
            <UInput v-if="typeof postStore.currentForm.image === 'string'" v-model="postStore.currentForm.image" class="w-full mt-2" placeholder="Hoặc nhập URL ảnh" />
        </UFormField>
    </div>
</template>

<script setup lang="ts">
import { usePostManagerStore } from '../../post.manager.store';
import UFileUpload from '@/common/components/UFileUpload.vue';
const postStore = usePostManagerStore();
</script>
