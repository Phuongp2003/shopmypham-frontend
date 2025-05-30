import type { AxiosRequestConfig } from 'axios';
import { api } from '@/plugins/axios';
import type { PageableManager } from '@/types';

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<PageableManager<T> | T> {
    const toast = useToast();
    try {
        const response = await api(config);
        if (response.status === 500) {
            throw new Error('Lỗi kết nối đến máy chủ');
        }
        return response.data as PageableManager<T> | T;
    } catch (error) {
        toast.add({ title: 'Lỗi', description: String(error), color: 'error', icon: 'error' });
        throw error;
    }
}
