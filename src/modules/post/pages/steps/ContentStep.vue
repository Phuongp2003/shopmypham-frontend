<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="space-y-6">
        <UFormField label="Mô tả ngắn" required>
            <UTextarea v-model="postStore.currentForm.description" class="w-full" placeholder="Nhập mô tả ngắn cho bài viết" />
        </UFormField>
        <UFormField label="Nội dung" required>
            <EditorTool v-model="postStore.currentForm.content" />
        </UFormField>
    </div>
</template>

<script setup lang="ts">
import { usePostManagerStore } from '../../post.manager.store';
import EditorTool from '@/common/components/Editor/EditorTool.vue';
const postStore = usePostManagerStore();
</script>
