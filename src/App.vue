<template>
	<v-app class="bg-white">
		<router-view #="{ Component, route }">
			<AppLayout v-if="route.meta?.layout === `app`">
				<component :is="Component"></component>
			</AppLayout>
		</router-view>
	</v-app>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';

//

</script>
