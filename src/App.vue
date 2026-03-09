<template>
	<v-app class="bg-primary">
		<v-progress-linear
			v-if="isRouting"
			indeterminate
			color="accent"
			class="position-fixed top-0 left-0"
			style="z-index: 999"
		></v-progress-linear>
		<router-view #="{ Component, route }">
			<component :is="layouts[route.meta?.layout as string] || layouts.default">
				<component :is="Component" />
			</component>
		</router-view>
		<ToastQueue
			closable
			class="position-fixed top-0 left-0"
			msg-class="position-fixed top-0 left-0 mt-11 ml-n1 bg-secondary"
			v-model="messages"
		></ToastQueue>
	</v-app>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import HomeLayout from './layouts/HomeLayout.vue'
import ToastQueue from '@/components/ToastQueue.vue'
import useToast from '@/composables/use-toast'
import { useTheme } from 'vuetify'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { useAuthStore } from './stores/auth'
import { usePushStore } from './stores/push'
import { onMounted, ref, type Component } from 'vue'
import { useRouter } from 'vue-router'

//

// --- Utils
const toastCmp = useToast()
const themeCmp = useTheme()
const authStore = useAuthStore()
const pushStore = usePushStore()
const { messages } = toastCmp

// --- Layouts
const layouts: Record<string, Component> = {
	"app": AppLayout,
	"auth": AuthLayout,
	"home": HomeLayout,
	"default": AppLayout,
}

// --- Router
const routerCmp = useRouter()
const isRouting = ref(false)

//

const onMountedCb = async () => {
	const savedTheme = localStorage.getItem("theme") ?? "system"
	themeCmp.change(savedTheme)

	const native = Capacitor.isNativePlatform()
	if (native) StatusBar.setBackgroundColor({ color: "#00000000" })
	if (native) StatusBar.setOverlaysWebView({ overlay: true })
	if (native) StatusBar.setStyle({ style: savedTheme == "dark" ? Style.Dark : Style.Light })

	routerCmp.beforeEach(() => isRouting.value = true)
	routerCmp.afterEach(() => isRouting.value = false)
	
	if (authStore.user) await pushStore.connect()
}

onMounted(onMountedCb)

//

</script>

<style>
* {
	font-family: 'DM Sans', sans-serif !important;
}
</style>
