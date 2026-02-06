import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import HomeView from "@/views/app/HomeView.vue"
import MonitorView from "@/views/app/MonitorView.vue"
import ScanView from "@/views/app/ScanView.vue"
import GrowthView from "@/views/app/GrowthView.vue"

//

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "welcome",
        meta: { layout: "app" },
        redirect: "/app/home",
    },
    {
        path: "/app",
        name: "app",
        meta: { layout: "app" },
        children: [
            {
                path: "home",
                name: "home",
                meta: { layout: "app" },
                component: HomeView,
            },
            {
                path: "monitor",
                name: "monitor",
                meta: { layout: "app" },
                component: MonitorView,
            },
            {
                path: "scan",
                name: "scan",
                meta: { layout: "app" },
                component: ScanView,
            },
            {
                path: "growth",
                name: "growth",
                meta: { layout: "app" },
                component: GrowthView,
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

//

export default router
