import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { getAllDistributorsApi } from '../submodules/distributor/cosmeticDistributor.api';
import { getAllOptionsApi } from '../submodules/option/cosmeticOption.api';
import { getAllShippingPoliciesApi } from '../submodules/shipping/shippingPolicy.api';
import { getAllBadgesApi } from '../submodules/badge/cosmeticBadge.api';
import { createCosmeticApi, updateCosmeticApi } from '../cosmetic.api';
import type { CosmeticCreateReq } from '../cosmetic.dto';
const toast = useToast();
export const useCosmeticCreateStore = defineStore('cosmetic-create', () => {
    // State chuẩn hóa đúng DTO tạo mới mỹ phẩm
    const form = reactive({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        type: '',
        image: '',
        usageInstructions: '',
        distributorId: '',
        shippingPolicyId: '',
        specifications: [] as { key: string; value: string }[],
        variants: [] as {
            name: string;
            sku: string;
            price: number;
            stock: number;
            image?: string;
            optionIds?: string[];
        }[],
        benefits: [] as {
            benefitKey: string;
            benefitValue: string;
            orderIndex: number;
        }[],
        badges: [] as {
            id?: string;
            badgeType:
                | 'MADE_IN'
                | 'QUALITY'
                | 'SHIPPING'
                | 'RETURN_POLICY'
                | 'WARRANTY'
                | 'CERTIFICATION';
            title: string;
            icon?: string;
            color?: string;
            isActive: boolean;
            orderIndex?: number;
        }[],
    });

    // Lookup data (options, shippingPolicies, distributors...)
    const options = reactive<{ label: string; value: string }[]>([]);
    const shippingPolicies = reactive<{ label: string; value: string }[]>([]);
    const distributors = reactive<{ label: string; value: string }[]>([]);

    function init(data: CosmeticCreateReq) {
        form.name = data.name;
        form.description = data.description || '';
        form.price = data.price;
        form.stock = data.stock;
        form.type = data.type;
        form.image = data.image;
        form.type = data.type;
        form.usageInstructions = data.usageInstructions || '';
        form.distributorId = data.distributorId;
        form.shippingPolicyId = data.shippingPolicyId;
        form.specifications = data.specifications || [];
        form.variants = data.variants || [];
        form.benefits = data.benefits || [];
        form.badges = data.badges || [];
    }

    // CRUD functions
    function addSpecification() {
        form.specifications.push({ key: '', value: '' });
    }
    function removeSpecification(index: number) {
        form.specifications.splice(index, 1);
    }
    function addVariant() {
        form.variants.push({ name: '', sku: '', price: 0, stock: 0, image: '', optionIds: [] });
    }
    function removeVariant(index: number) {
        form.variants.splice(index, 1);
    }
    function addBenefit() {
        form.benefits.push({ benefitKey: '', benefitValue: '', orderIndex: 0 });
    }
    function removeBenefit(index: number) {
        form.benefits.splice(index, 1);
    }
    function addBadge() {
        form.badges.push({
            badgeType: 'MADE_IN',
            title: '',
            icon: '',
            color: '',
            isActive: true,
            orderIndex: 0,
        });
    }
    function removeBadge(index: number) {
        form.badges.splice(index, 1);
    }
    function addOption(option: { label: string; value: string }) {
        options.push(option);
    }
    function addShippingPolicy(policy: { label: string; value: string }) {
        shippingPolicies.push(policy);
    }
    function addDistributor(distributor: { label: string; value: string }) {
        distributors.push(distributor);
    }

    // Fetch lookup data (mock, cần thay bằng API thực tế)
    async function fetchOptions() {
        const res = await getAllOptionsApi().catch((err) => {
            toast.add({
                title: err.message,
                color: 'red',
                icon: 'i-heroicons-exclamation-triangle',
            });
        });
        if (!res) return;
        options.push(
            ...res.map((item: any) => ({
                label: item.optionKey + ': ' + item.optionValue,
                value: item.id,
            })),
        );
    }
    async function fetchShippingPolicies() {
        const res = await getAllShippingPoliciesApi().catch((err) => {
            toast.add({
                title: err.message,
                color: 'red',
                icon: 'i-heroicons-exclamation-triangle',
            });
        });
        shippingPolicies.push(...res.map((item: any) => ({ label: item.name, value: item.id })));
    }
    async function fetchDistributors() {
        const res = await getAllDistributorsApi().catch((err) => {
            toast.add({
                title: err.message,
                color: 'red',
                icon: 'i-heroicons-exclamation-triangle',
            });
        });
        distributors.push(
            ...res.distributors.map((item: any) => ({ label: item.name, value: item.id })),
        );
    }
    async function fetchBadges() {
        const res = await getAllBadgesApi().catch((err) => {
            toast.add({
                title: err.message,
                color: 'red',
                icon: 'i-heroicons-exclamation-triangle',
            });
        });
        form.badges.push(...res.map((item: any) => ({ label: item.name, value: item.id })));
    }
    async function fetchAll() {
        await fetchOptions();
        await fetchShippingPolicies();
        await fetchDistributors();
        await fetchBadges();
        addVariant();
    }

    // Reset toàn bộ form
    function reset() {
        Object.assign(form, {
            name: '',
            description: '',
            price: 0,
            stock: 0,
            type: '',
            image: '',
            usageInstructions: '',
            distributorId: '',
            shippingPolicyId: '',
            specifications: [],
            variants: [],
            benefits: [],
            badges: [],
        });
    }

    // Validate (simple, cần custom thêm)
    function validate() {
        if (!form.name) {
            toast.add({
                title: 'Tên sản phẩm không được để trống',
                color: 'red',
                icon: 'i-heroicons-exclamation-triangle',
            });
            return false;
        }
        return true;
    }

    // Submit (mock, cần thay bằng API thực tế)
    async function submit(type: 'create' | 'update', id?: string) {
        if (!validate()) {
            toast.add({
                title: 'Dữ liệu không hợp lệ',
                color: 'red',
                icon: 'i-heroicons-exclamation-triangle',
            });
            return;
        }
        console.log(form);
        if (type === 'create') {
            await createCosmeticApi(form as CosmeticCreateReq).catch((err) => {
                toast.add({
                    title: err.message,
                    color: 'red',
                    icon: 'i-heroicons-exclamation-triangle',
                });
            });
            return { ...form };
        } else if (type === 'update') {
            await updateCosmeticApi(id as string, form as CosmeticCreateReq).catch((err) => {
                toast.add({
                    title: err.message,
                    color: 'red',
                    icon: 'i-heroicons-exclamation-triangle',
                });
            });
            return { ...form };
        }
    }

    function resetAll() {
        reset();
        options.length = 0;
        shippingPolicies.length = 0;
        distributors.length = 0;
        form.badges.length = 0;
    }

    return {
        form,
        options,
        shippingPolicies,
        distributors,
        addSpecification,
        removeSpecification,
        addVariant,
        removeVariant,
        addBenefit,
        removeBenefit,
        addBadge,
        removeBadge,
        addOption,
        addShippingPolicy,
        addDistributor,
        fetchOptions,
        fetchShippingPolicies,
        fetchDistributors,
        fetchAll,
        reset,
        validate,
        submit,
        resetAll,
        init,
    };
});
