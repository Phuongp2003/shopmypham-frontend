import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

let accessToken: string | undefined = undefined;

export function setAccessToken(token?: string) {
    accessToken = token;
}

api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            delete config.headers.Authorization;
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
