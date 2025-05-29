import type { User } from './user.types'
import { getMyInfoApi, updateMyInfoApi, unlinkGoogleApi, changePasswordApi } from './user.api'
import type { ChangePasswordReq, UpdateUserReq } from './user.dto'

export const useUserProfile = (mode: 'me' | 'other' = 'me') => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref<Error | null>(null)

  const getUserProfile = async (id?: string) => {
    isLoading.value = true
    try {
      // TODO: add logic to get another user profile
      const response = await getMyInfoApi()
      user.value = response
    }
    catch (err) {
      isError.value = true
      error.value = err as Error
    }
    finally {
      isLoading.value = false
    }
  }

  const updateUserProfile = async (data: UpdateUserReq) => {
    isLoading.value = true
    try {
      const response = await updateMyInfoApi(data)
      user.value = response
    }
    catch (err) {
      isError.value = true
      error.value = err as Error
    }
    finally {
      isLoading.value = false
    }
  }

  const unlinkGoogle = async () => {
    isLoading.value = true
    try {
      const response = await unlinkGoogleApi()
      user.value = response
    }
    catch (err) {
      isError.value = true
      error.value = err as Error
    }
    finally {
      isLoading.value = false
    }
  }

  const changePassword = async (data: ChangePasswordReq) => {
    isLoading.value = true
    try {
      const response = await changePasswordApi(data)
    }
    catch (err) {
      isError.value = true
      error.value = err as Error
    }
    finally {
      isLoading.value = false
    }
  }


  return {
    user,
    isLoading,
    isError,
    error,
    getUserProfile,
    updateUserProfile,
    unlinkGoogle,
  }
}
