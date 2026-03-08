import api from "@/utils/api"
import { ref } from "vue"
import { defineStore } from "pinia"
import type { UserSafeSchema, UserSignInSchema } from "@/schemas/UserSchema"

//

export const useAuthStore = defineStore("auth", () => {

    //

    const user = ref<UserSafeSchema>()

    //

    const whoami = async () => {
        const res = await api.get<UserSafeSchema>("/auth/me")
        user.value = res.data
        return res.data
    }

    const signIn = async (data: UserSignInSchema) => {
        const res = await api.post<UserSafeSchema>("/auth/sign-in", data)
        user.value = res.data
        return res.data
    }

    const signOut = async () => {
        await api.post<UserSafeSchema>("/auth/sign-out")
        user.value = undefined
    }

    //

    return {
        user,
        whoami,
        signIn,
        signOut,
    }

}, { persist: true })
