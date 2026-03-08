<template>
	<motion.div 
		:key="id"
		:class="`position-absolute rounded-circle bg-${color}`"
		:style="{ width: `4px`, height: `4px`, left: `${x}vw`, top: `${y}vh` }"
		:animate="{ y: [0, -20, 0], opacity: [0.8, 1, 0.8] }"
		:transition="{ duration: duration, repeat: Infinity, delay: delay }"
	></motion.div>
</template>

<script setup lang="ts">
import { motion } from "motion-v"

//

const props = defineProps<{
    id: number,
    x: number,
    y: number,
    color: string,
    delay: number,
    duration: number,
}>()

//

</script>

<style scoped>

</style>