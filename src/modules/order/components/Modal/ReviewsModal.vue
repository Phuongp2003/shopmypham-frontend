<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { CosmeticReview } from '@/modules/cosmetic/submodules/review/cosmeticReview.types';
const emit = defineEmits<{ close: [any] }>();

const props = defineProps<{
    review: CosmeticReview;
}>();

const form = reactive({
    rating: props.review.rating || 0,
    title: props.review.title || '',
    content: props.review.content || '',
});
const isSubmitting = ref(false);

function handleSubmit() {
    if (!form.rating || !form.content) return;
    isSubmitting.value = true;
    emit('close', { review: { ...form } });
    isSubmitting.value = false;
}
function handleCancel() {
    emit('close', false);
}
</script>
<template>
    <UModal title="Đánh giá sản phẩm" :ui="{ content: 'z-50' }" @close="handleCancel">
        <template #content>
            <div class="p-4">
                <UForm :state="form" @submit="handleSubmit" class="space-y-4">
                    <div class="flex flex-col items-center gap-2">
                        <span class="font-semibold">Chọn số sao:</span>
                        <div class="flex items-center">
                            <UButton
                                v-for="i in 5"
                                :key="i"
                                :color="form.rating >= i ? 'warning' : 'neutral'"
                                variant="ghost"
                                size="lg"
                                icon="i-heroicons-star-solid"
                                @click="form.rating = i"
                            />
                        </div>
                    </div>
                    <UFormField label="Tiêu đề">
                        <UInput v-model="form.title" placeholder="Tiêu đề (tuỳ chọn)" />
                    </UFormField>
                    <UFormField label="Nội dung đánh giá" required>
                        <UTextarea
                            v-model="form.content"
                            required
                            placeholder="Chia sẻ cảm nhận của bạn..."
                        />
                    </UFormField>
                    <div class="flex gap-2 justify-end mt-2">
                        <UButton type="button" color="gray" @click="handleCancel">Huỷ</UButton>
                        <UButton type="submit" color="primary" :loading="isSubmitting">{{
                            review ? 'Sửa' : 'Lưu'
                        }}</UButton>
                    </div>
                </UForm>
            </div>
        </template>
    </UModal>
</template>
