<template>
    <div class="space-y-6">
        <UFormField label="Type" required>
            <USelect
                v-model="modelValue.type"
                :items="typeOptions"
                placeholder="Select article type"
                @update:model-value="updateType"
            />
        </UFormField>

        <UFormField label="Cover Image">
            <UFileUpload
                v-model="coverImage"
                accept="image/*"
                :max-size="5"
                @error="handleUploadError"
            />
            <UButton
                v-if="!coverImage"
                color="neutral"
                @click="showCoverImageInput = !showCoverImageInput"
                >Enter image URL</UButton
            >
            <UInput v-if="showCoverImageInput" v-model="coverImage" placeholder="Enter image URL" />
            <template #help>
                <span class="text-xs text-gray-500">Recommended size: 1200x630px, max 5MB</span>
            </template>
        </UFormField>

        <UFormField label="Thumbnail">
            <UFileUpload
                v-model="backgroundImage"
                accept="image/*"
                :max-size="2"
                @error="handleUploadError"
            />
            <UButton
                v-if="!backgroundImage"
                color="neutral"
                @click="showThumbnailImageInput = !showThumbnailImageInput"
                >Enter image URL</UButton
            >
            <UInput
                v-if="showThumbnailImageInput"
                v-model="backgroundImage"
                placeholder="Enter image URL"
            />
            <template #help>
                <span class="text-xs text-gray-500">Recommended size: 300x300px, max 2MB</span>
            </template>
        </UFormField>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'BasicInfoStep',
});

import { ref, watch } from 'vue';
import { useFileUpload } from '@/common/composables/useFileUpload';
import UFileUpload from '@/components/UFileUpload.vue';
import { BlogType } from '@/enums';
import type { CreateBlogReq } from '@/types';

const props = defineProps<{
    modelValue: Partial<CreateBlogReq>;
}>();

const coverImage = ref(props.modelValue.thumbnail || '');
const showCoverImageInput = ref(false);
const backgroundImage = ref(props.modelValue.thumbnail || '');
const showThumbnailImageInput = ref(false);

const typeOptions = [
    { label: 'Tin tức', value: BlogType.NEWS },
    { label: 'Sự kiện', value: BlogType.EVENT },
];

watch(coverImage, (newValue) => {
    emit('update:modelValue', { ...props.modelValue, thumbnail: newValue });
});

watch(backgroundImage, (newValue) => {
    emit('update:modelValue', { ...props.modelValue, thumbnail: newValue });
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: Partial<CreateBlogReq>): void;
}>();

const { uploadFile } = useFileUpload();

const toast = useToast();

function handleUploadError(message: string) {
    toast.add({
        title: 'Upload Error',
        description: message,
        color: 'error',
    });
}

function updateType(value: BlogType) {
    emit('update:modelValue', {
        ...props.modelValue,
        type: value,
    });
}

async function uploadImages() {
    const uploads = [];

    if (props.modelValue.thumbnail && props.modelValue.thumbnail instanceof File) {
        uploads.push(
            uploadFile(props.modelValue.thumbnail).then((response) => {
                emit('update:modelValue', {
                    ...props.modelValue,
                    thumbnail: response.secure_url,
                });
            }),
        );
    }

    if (props.modelValue.thumbnail && props.modelValue.thumbnail instanceof File) {
        uploads.push(
            uploadFile(props.modelValue.thumbnail).then((response) => {
                emit('update:modelValue', {
                    ...props.modelValue,
                    thumbnail: response.secure_url,
                });
            }),
        );
    }

    try {
        await Promise.all(uploads);
        return true;
    } catch (error) {
        toast.add({
            title: 'Upload Error',
            description: 'Failed to upload one or more images',
            color: 'error',
        });
        console.error(error);
        return false;
    }
}

// Expose uploadImages method to parent
defineExpose({
    uploadImages,
});
</script>
