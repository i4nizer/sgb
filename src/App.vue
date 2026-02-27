<template>
	<v-app>
		<router-view #="{ Component, route }">
			<component :is="layouts[route.meta?.layout as string] || layouts.default">
				<component :is="Component" />
			</component>
		</router-view>
	</v-app>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import type { Component } from 'vue';

//

// --- Layouts
const layouts: Record<string, Component> = {
	"app": AppLayout,
	"default": AppLayout,
}

//

</script>
