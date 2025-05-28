import axios from 'axios'

// State to store tokens
let currentAccessToken: string | null = null
let currentRefreshToken: string | null = null

// Methods to manage tokens
export const setTokens = (accessToken: string, refreshToken: string) => {
  currentAccessToken = accessToken
  currentRefreshToken = refreshToken
}

export const clearTokens = () => {
  currentAccessToken = null
  currentRefreshToken = null
}

export const getAccessToken = () => currentAccessToken
export const getRefreshToken = () => currentRefreshToken

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default function setupAxios() {
  // Add access token to requests
  api.interceptors.request.use(
    (config) => {
      if (currentAccessToken) {
        config.headers.Authorization = `Bearer ${currentAccessToken}`
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  // Simple response interceptor without token refresh logic
  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  )
}
