<template>
    <div>
		<Line :key :data :options />
    </div>
</template>

<script setup lang="ts">
import colors from 'vuetify/util/colors'
import { Line } from "vue-chartjs"
import { ref, watch } from "vue";
import type { ChartData, ChartOptions } from "chart.js"
import type { ReadingChartSchema } from "@/schemas/ReadingSchema";

//

const props = defineProps<{ readings: ReadingChartSchema[] }>()

const key = ref(0)
const data: ChartData<"line"> = { datasets: [] }

const options: ChartOptions<"line"> = {
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		x: {
			type: "time",
			time: {
				unit: "hour",
				displayFormats: { hour: "HH:mm" },
			},
			ticks: { autoSkip: false },
		},
		y: {
			beginAtZero: false,
			title: { display: false },
		},
	},
}

//

const getColor = (type: string) => {
	if (type.toLowerCase().trim().startsWith("humidity")) return colors.blue.base
	else if (type.toLowerCase().trim().startsWith("temperature")) return colors.red.base
	else if (type.toLowerCase().trim().startsWith("soil")) return colors.brown.base
	else return colors.yellow.base
}

const getDataset = (readings: ReadingChartSchema[]) => {
	const types = [...new Set<string>(readings.map((r) => r.name)).values()]
	const datasets = []

	for (const type of types) {
		const grouped = readings.filter((r) => r.name == type)
		const data = grouped.map((r) => ({ x: r.createdAt, y: r.value }))
		const dataset = { label: type, data, borderWidth: 2, tension: 0.35, pointRadius: 4 }
		datasets.push({ ...dataset, backgroundColor: getColor(type) })
	}

	data.datasets = datasets as any
	key.value++
}

watch(() => props.readings, getDataset, { deep: true, immediate: true })

//

</script>

<style scoped>
</style>
