<script setup lang="ts">
import { ref } from 'vue';
import { usePostManagerStore } from '../../post.manager.store';

const postStore = usePostManagerStore();

const props = defineProps({
    articleData: {
        type: Object,
        required: true,
    },
    currentStep: Number,
    totalSteps: Number,
});

const emit = defineEmits(['update:articleData', 'prev-step']);

const statusOptions = [
    { label: 'Công khai', value: true },
    { label: 'Nháp', value: false },
];
</script>

<template>
    <div class="space-y-6">
        <UFormField label="Trạng thái bài viết">
            <USelect v-model="postStore.currentForm.published" :items="statusOptions" value-key="value" />
        </UFormField>
    </div>
</template>

<style scoped>
.preview-container {
    max-height: 600px;
    overflow-y: auto;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    padding: 1rem;
    margin-top: 1rem;
}
</style>
