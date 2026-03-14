import useToast from "@/composables/use-toast";
import { useAuthStore } from "@/stores/auth";
import type { NavigationGuard } from "vue-router";

//

const refreshAuth: NavigationGuard = async (to, from) => {
    const authStore = useAuthStore()
    await authStore.whoami().catch(() => { })
}

const requireAuth: NavigationGuard = async (to, from) => {
    const toastCmp = useToast()
    const authStore = useAuthStore()
    
    if (authStore.user !== undefined) return
    if (to.path == "/auth/sign-in") return
    
    toastCmp.error("Session expired, kindly login again.")
    return "/auth/sign-in"
}

const redirectAuth: NavigationGuard = async (to, from) => {
    const authStore = useAuthStore()
    if (authStore.user === undefined) return
    
    const path = authStore.user.role == "Admin" ? "/admin/accounts" : "/app/home"
    if (to.path != path) return path
}

//

export { refreshAuth, requireAuth, redirectAuth }
