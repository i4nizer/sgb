<template>
    <v-container class="bg-white" fluid>
        <v-row dense>
            <v-col cols="12" lg="6">
                <v-card color="white" class="pt-4" elevation="1">
                    <template #prepend>
                        <v-icon color="red">mdi-thermometer</v-icon>
                    </template>
                    <template #title>
                        <span>Temperature & Humidity</span>
                    </template>
                    <template #subtitle>
                        <span>24-hour monitoring</span>
                    </template>
                    <template #text>
                        <ReadingChart :readings="readingsDHT"></ReadingChart>
                    </template>
                </v-card>
            </v-col>
            <v-col cols="12" lg="6">
                <v-card color="white" class="pt-4" elevation="1">
                    <template #prepend>
                        <v-icon color="blue">mdi-water-outline</v-icon>
                    </template>
                    <template #title>
                        <span>Soil Moisture</span>
                    </template>
                    <template #subtitle>
                        <span>24-hour monitoring</span>
                    </template>
                    <template #text>
                        <ReadingChart :readings="readingsSoilMoisture"></ReadingChart>
                    </template>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import ReadingChart from '@/components/app/monitor/ReadingChart.vue';
import type { ReadingChartSchema } from '@/schemas/ReadingSchema';

//

const readingsDHT: ReadingChartSchema[] = [
    { name: "Humidity", unit: "%", value: 87.1, createdAt: new Date(Date.now() - 4 * 5 * 60 * 60 * 1000) },
    { name: "Humidity", unit: "%", value: 84.9, createdAt: new Date(Date.now() - 4 * 4 * 60 * 60 * 1000) },
    { name: "Humidity", unit: "%", value: 80.8, createdAt: new Date(Date.now() - 4 * 3 * 60 * 60 * 1000) },
    { name: "Humidity", unit: "%", value: 78.7, createdAt: new Date(Date.now() - 4 * 2 * 60 * 60 * 1000) },
    { name: "Humidity", unit: "%", value: 73.4, createdAt: new Date(Date.now() - 4 * 1 * 60 * 60 * 1000) },
    { name: "Temperature", unit: "C", value: 27.1, createdAt: new Date(Date.now() - 4 * 5 * 60 * 60 * 1000) },
    { name: "Temperature", unit: "C", value: 29.9, createdAt: new Date(Date.now() - 4 * 4 * 60 * 60 * 1000) },
    { name: "Temperature", unit: "C", value: 30.8, createdAt: new Date(Date.now() - 4 * 3 * 60 * 60 * 1000) },
    { name: "Temperature", unit: "C", value: 31.7, createdAt: new Date(Date.now() - 4 * 2 * 60 * 60 * 1000) },
    { name: "Temperature", unit: "C", value: 30.4, createdAt: new Date(Date.now() - 4 * 1 * 60 * 60 * 1000) },
]

const readingsSoilMoisture: ReadingChartSchema[] = [
    { name: "Soil Moisture", unit: "%", value: 87.1, createdAt: new Date(Date.now() - 4 * 5 * 60 * 60 * 1000) },
    { name: "Soil Moisture", unit: "%", value: 78.9, createdAt: new Date(Date.now() - 4 * 4 * 60 * 60 * 1000) },
    { name: "Soil Moisture", unit: "%", value: 69.8, createdAt: new Date(Date.now() - 4 * 3 * 60 * 60 * 1000) },
    { name: "Soil Moisture", unit: "%", value: 59.7, createdAt: new Date(Date.now() - 4 * 2 * 60 * 60 * 1000) },
    { name: "Soil Moisture", unit: "%", value: 45.4, createdAt: new Date(Date.now() - 4 * 1 * 60 * 60 * 1000) },
]

//

</script>

<style scoped>

</style>