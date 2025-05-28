import { defineStore } from 'pinia'
import type { User } from '../user/user.types'
import { loginApi, registerApi, refreshTokenApi } from './auth.api'
import type { LoginReq, RegisterReq } from './auth.dto'
import type { JWTPayload } from './auth.types'
import { useCookies } from '@vueuse/integrations/useCookies'
import { jwtDecode } from 'jwt-decode'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

const cookies = useCookies([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY])

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const tokenType = ref<string>('Bearer')
  const expiresIn = ref<number | null>(null)

  const userPayload = ref<JWTPayload | null>(null)
  const userId = ref<User['id'] | null>(null)
  const status = ref<User['status'] | null>(null)
  const userType = ref<User['role'] | null>(null)
  const isCookiesLoaded = ref(false)

  const isAuthenticated = ref(false)
  const authHeader = computed(() =>
    accessToken.value ? `${tokenType.value} ${accessToken.value}` : '',
  )

  const login = async (req: LoginReq) => {
    const res = await loginApi(req)
    accessToken.value = res.accessToken
    refreshToken.value = res.refreshToken

    const decodedToken = jwtDecode<JWTPayload>(accessToken.value)
    userPayload.value = decodedToken
    userId.value = decodedToken.id
    status.value = decodedToken.status
    userType.value = decodedToken.role
    expiresIn.value = decodedToken.exp - decodedToken.iat
    setTokens()
    isAuthenticated.value = true
  }

  const register = async (req: RegisterReq) => {
    const res = await registerApi(req)
    accessToken.value = res.accessToken
    refreshToken.value = res.refreshToken

    const decodedToken = jwtDecode<JWTPayload>(accessToken.value)
    userPayload.value = decodedToken
    expiresIn.value = decodedToken.exp - decodedToken.iat
    setTokens()
    isAuthenticated.value = true
  }

  const logout = () => {
    cookies.remove(ACCESS_TOKEN_KEY)
    cookies.remove(REFRESH_TOKEN_KEY)
    isAuthenticated.value = false
    isCookiesLoaded.value = false
    userPayload.value = null
  }

  const requestRefreshToken = async () => {
    if (!refreshToken.value) {
      throw new Error('Refresh token is not set')
    }
    const res = await refreshTokenApi({ refreshToken: refreshToken.value })
    accessToken.value = res.accessToken
    refreshToken.value = res.refreshToken

    const decodedToken = jwtDecode<JWTPayload>(accessToken.value)
    userPayload.value = decodedToken
    expiresIn.value = decodedToken.exp - decodedToken.iat
    setTokens()
    isAuthenticated.value = true
    return true
  }

  const initializeAuth = async () => {
    await loadFromCookies()
    isCookiesLoaded.value = true
  }

  const verifyUser = async () => {
    return true
  }

  // Private methods
  const loadFromCookies = async () => {
    let isExpired = false
    const accessToken = cookies.get(ACCESS_TOKEN_KEY)
    const refreshToken = cookies.get(REFRESH_TOKEN_KEY)
    console.log(cookies.getAll())
    if (!accessToken && !refreshToken) {
      return false
    }
    if (accessToken) {
      const decodedToken = jwtDecode<JWTPayload>(accessToken)
      if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
        isExpired = true
      }
    }
    if (refreshToken && !accessToken) {
      isExpired = true
    }
    if (isExpired) {
      await requestRefreshToken()
    }

    try {
      const decodedToken = jwtDecode<JWTPayload>(accessToken)
      userPayload.value = decodedToken
      userId.value = decodedToken.id
      status.value = decodedToken.status
      userType.value = decodedToken.role
      if (isExpired) setTokens()
      isAuthenticated.value = true
    } catch (error) {
      return false
    }
    return true
  }

  const setTokens = () => {
    cookies.set(ACCESS_TOKEN_KEY, accessToken.value, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: expiresIn.value || 24 * 60 * 60 * 1000, // 1 day
    })

    cookies.set(REFRESH_TOKEN_KEY, refreshToken.value, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
  }

  return {
    // State
    user: userPayload,
    userId,
    status,
    userType,
    isAuthenticated,
    accessToken,
    refreshToken,
    authHeader,
    isCookiesLoaded,

    // Actions
    login,
    register,
    requestRefreshToken,
    initializeAuth,
    verifyUser,
    logout,
  }
})
