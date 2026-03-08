<template>
	<div>
		<Line :key :data :options />
	</div>
</template>

<script setup lang="ts">
import { Line } from "vue-chartjs"
import type { ChartData, ChartOptions } from "chart.js"
import { ref, watch } from "vue"
import type { ReadingSchema } from "@/schemas/ReadingSchema";

//

// --- Props
const props = defineProps<{ color?: string, readings: ReadingSchema[] }>()

// --- Key Data
const key = ref(0)
const data: ChartData<"line"> = { labels: [], datasets: [] }

// --- Options
const options: ChartOptions<"line"> = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: { display: false }
	},
	scales: {
		x: {
			grid: { display: false },
			border: { display: false },
			ticks: {
				color: "#aaa",
				font: { size: 12 },
			},
		},
		y: {
			grid: {
				color: "rgba(0,0,0,0.08)",
				lineWidth: 1,
				//@ts-ignore
				borderDash: [4, 4],
			},
			border: { display: false, dash: [4, 4] },
			ticks: {
				color: "#aaa",
				font: { size: 12 },
				maxTicksLimit: 5,
			},
		},
	},
	elements: {
		point: { radius: 0, hoverRadius: 0 },
		line: {
			tension: 0.4,
			borderWidth: 2,
		},
	},
}

//

const getGradient = () => {
	const canvas = document.createElement("canvas")
	const ctx = canvas.getContext("2d")!
	const gradient = ctx.createLinearGradient(0, 0, 0, 300)
	gradient.addColorStop(0, (props.color || "") + "55")
	gradient.addColorStop(1, (props.color || "") + "00")
	return gradient
}

//

const onChangeReadings = async (readings: ReadingSchema[]) => {
	const labels = readings.map((r) => r.createdAt.toLocaleString("en-US", { month: "short", day: "2-digit" }))

	const dataset = {
		data: readings.map((r) => r.value),
		borderColor: props.color,
		backgroundColor: getGradient(),
		fill: true,
		borderWidth: 2,
	}

	data.labels = labels
	data.datasets = [dataset]
	key.value++
}

watch(() => props.readings, onChangeReadings, { immediate: true, deep: true })

//
</script>

<style scoped></style>