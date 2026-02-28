import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import SignInView from "@/views/auth/SignInView.vue"
import HomeView from "@/views/app/HomeView.vue"
import MonitorView from "@/views/app/MonitorView.vue"
import GrowthView from "@/views/app/GrowthView.vue"
import SettingsView from "@/views/app/SettingsView.vue"

//

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "welcome",
        meta: { layout: "app" },
        redirect: "/auth/sign-in",
    },
    {
        path: "/auth/sign-in",
        name: "sign-in",
        meta: { layout: "auth" },
        component: SignInView,
    },
    {
        path: "/app/home",
        name: "home",
        meta: { layout: "app" },
        component: HomeView,
    },
    {
        path: "/app/monitor",
        name: "monitor",
        meta: { layout: "app" },
        component: MonitorView,
    },
    {
        path: "/app/growth",
        name: "growth",
        meta: { layout: "app" },
        component: GrowthView,
    },
    {
        path: "/app/settings",
        name: "settings",
        meta: { layout: "app" },
        component: SettingsView,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

//

export default router
