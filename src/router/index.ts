import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import { redirectAuth, refreshAuth, requireAuth } from "@/middlewares/auth.middleware"
import SignInView from "@/views/auth/SignInView.vue"
import HomeView from "@/views/app/HomeView.vue"
import MonitorView from "@/views/app/MonitorView.vue"
import GrowthView from "@/views/app/GrowthView.vue"
import SettingsView from "@/views/app/SettingsView.vue"
import WelcomeView from "@/views/WelcomeView.vue"
import AdminAccountsView from "@/views/admin/AdminAccountsView.vue"
import AdminThresholdsView from "@/views/admin/AdminThresholdsView.vue"
import AdminDetectionView from "@/views/admin/AdminDetectionView.vue"
import AdminSettingsView from "@/views/admin/AdminSettingsView.vue"

//

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "welcome",
        meta: { layout: "home" },
        component: WelcomeView,
    },
    {
        path: "/auth/sign-in",
        name: "sign-in",
        meta: { layout: "auth" },
        component: SignInView,
        beforeEnter: [refreshAuth, redirectAuth],
    },
    {
        path: "/admin/accounts",
        name: "admin accounts",
        meta: { layout: "admin" },
        component: AdminAccountsView,
        beforeEnter: [refreshAuth, requireAuth],
    },
    {
        path: "/admin/thresholds",
        name: "admin thresholds",
        meta: { layout: "admin" },
        component: AdminThresholdsView,
        beforeEnter: [refreshAuth, requireAuth],
    },
    {
        path: "/admin/detection",
        name: "admin detection",
        meta: { layout: "admin" },
        component: AdminDetectionView,
        beforeEnter: [refreshAuth, requireAuth],
    },
    {
        path: "/admin/settings",
        name: "admin settings",
        meta: { layout: "admin" },
        component: AdminSettingsView,
        beforeEnter: [refreshAuth, requireAuth],
    },
    {
        path: "/app/home",
        name: "home",
        meta: { layout: "app" },
        component: HomeView,
        beforeEnter: [refreshAuth, requireAuth],
    },
    {
        path: "/app/monitor",
        name: "monitor",
        meta: { layout: "app" },
        component: MonitorView,
        beforeEnter: [refreshAuth, requireAuth],
    },
    {
        path: "/app/growth",
        name: "growth",
        meta: { layout: "app" },
        component: GrowthView,
        beforeEnter: [refreshAuth, requireAuth],
    },
    {
        path: "/app/settings",
        name: "settings",
        meta: { layout: "app" },
        component: SettingsView,
        beforeEnter: [refreshAuth, requireAuth],
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

//

export default router
