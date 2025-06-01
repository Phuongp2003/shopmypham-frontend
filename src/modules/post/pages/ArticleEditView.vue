<template>
    <div class="p-4">
        <UTabs color="neutral" :items="tabs" variant="pill">
            <template #editor>
                <KeepAlive>
                    <UCard>
                        <template #header>
                            <div class="flex justify-between items-center">
                                <h1 class="text-xl font-bold">
                                    {{ isEdit ? 'Sửa bài viết' : 'Tạo bài viết' }}
                                </h1>
                            </div>
                        </template>
                        <UStepper
                            color="secondary"
                            ref="stepper"
                            v-model="currentStep"
                            :ui="{
                                header: 'bg-gray-800 p-4',
                            }"
                            :items="steps"
                            class="mb-4"
                        >
                            <template v-for="step in steps" :key="step.slot" #[step.slot]>
                                <KeepAlive>
                                    <component
                                        :is="getStepComponent(step.slot)"
                                    />
                                </KeepAlive>
                            </template>
                        </UStepper>
                        <div class="flex gap-2 justify-between mt-8">
                            <UButton
                                leading-icon="i-lucide-arrow-left"
                                :disabled="!stepper?.hasPrev"
                                @click="stepper?.prev()"
                                variant="outline"
                            >
                                Previous
                            </UButton>
                            <UButton
                                v-if="stepper?.hasNext"
                                color="neutral"
                                trailing-icon="i-lucide-arrow-right"
                                @click="stepper?.next()"
                            >
                                Next
                            </UButton>
                            <UButton
                                v-else
                                trailing-icon="i-lucide-check"
                                color="neutral"
                                @click="handleSubmit"
                            >
                                {{ isEdit ? 'Cập nhật' : 'Đăng bài' }}
                            </UButton>
                        </div>
                    </UCard>
                </KeepAlive>
            </template>
            <template #preview>
                <ArticleDetailPreview />
            </template>
        </UTabs>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePostManagerStore } from '../post.manager.store';
import ArticleDetailPreview from './ArticleDetailPreview.vue';
import BasicInfoStep from './steps/BasicInfoStep.vue';
import ContentStep from './steps/ContentStep.vue';
import FinalStep from './steps/FinalStep.vue';
import type { PostCreateInput } from '../post.types';

const router = useRouter();
const route = useRoute();
const postStore = usePostManagerStore();

const isEdit = computed(() => Boolean(route.params.id));
const postId = computed(() => route.params.id as string);
const currentStep = ref(0);

const tabs = [
    { label: 'Trình chỉnh sửa', icon: 'i-heroicons-pencil-square', slot: 'editor' },
    { label: 'Xem trước', icon: 'i-heroicons-eye', slot: 'preview' },
];

const steps = [
    { slot: 'basic-info', title: 'Thông tin cơ bản', icon: 'i-lucide-file-plus' },
    { slot: 'content', title: 'Nội dung', icon: 'i-lucide-pencil' },
    { slot: 'final', title: 'Trạng thái', icon: 'i-lucide-check-circle' },
];

const stepper = ref();

const stepComponents = {
    'basic-info': BasicInfoStep,
    content: ContentStep,
    final: FinalStep,
};

function getStepComponent(slot: string) {
    return stepComponents[slot as keyof typeof stepComponents];
}

onMounted(() => {
    if (isEdit.value) {
        postStore.fetchPost(postId.value);
    } else {
        postStore.resetCurrentForm();
    }
});

async function handleSubmit() {
    if (isEdit.value) {
        await postStore.updatePost(postId.value, postStore.currentForm);
        router.push(`/manager/post`);
      } else {
        await postStore.createPost(postStore.currentForm as PostCreateInput);
        router.push(`/manager/post`);
    }
}
</script>
