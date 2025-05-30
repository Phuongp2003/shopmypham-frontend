import axios from 'axios';
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function setupAxios(header?: string) {
    // Add access token to requests
    api.interceptors.request.use(
        (config) => {
            if (header) {
                config.headers.Authorization = header;
            }
            return config;
        },
        (error) => Promise.reject(error),
    );

    // Simple response interceptor without token refresh logic
    api.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error),
    );
}
