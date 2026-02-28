<template>
	<v-app>
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
import ToastQueue from '@/components/ToastQueue.vue'
import useToast from '@/composables/use-toast'
import { useTheme } from 'vuetify'
import { onMounted, type Component } from 'vue'

//

// --- Utils
const toast = useToast()
const theme = useTheme()
const { messages } = toast

// --- Layouts
const layouts: Record<string, Component> = {
	"app": AppLayout,
	"auth": AuthLayout,
	"default": AppLayout,
}

//

const onMountedCb = async () => {
	const savedTheme = localStorage.getItem("theme") ?? "system"
	theme.change(savedTheme)
}

onMounted(onMountedCb)
//

</script>
