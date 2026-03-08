<template>
    <v-container class="">
        <v-row dense>
            <v-col cols="12" lg="6">
                <v-card class="pt-4" elevation="1">
                    <template #prepend>
                        <v-icon color="blue">mdi-water</v-icon>
                    </template>
                    <template #title>
                        <span>Humidity</span>
                    </template>
                    <template #subtitle>
                        <span>24-hour monitoring</span>
                    </template>
                    <template #text>
                        <ReadingChart 
                            :color="themeCmp.current.value.colors.accent"
                            :readings="humidities"
                        ></ReadingChart>
                    </template>
                </v-card>
            </v-col>
            <v-col cols="12" lg="6">
                <v-card class="pt-4" elevation="1">
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
                        <ReadingChart 
                            :color="themeCmp.current.value.colors.accent"
                            :readings="temperatures"
                        ></ReadingChart>
                    </template>
                </v-card>
            </v-col>
            <v-col cols="12" lg="6">
                <v-card class="pt-4" elevation="1">
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
                        <ReadingChart 
                            :color="themeCmp.current.value.colors.accent"
                            :readings="soilMoistures"
                        ></ReadingChart>
                    </template>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import ReadingChart from '@/components/app/monitor/ReadingChart.vue';
import useToast from '@/composables/use-toast';
import { useTheme } from 'vuetify';
import { useReadingStore } from '@/stores/reading';
import { onMounted, toRefs } from 'vue';

//

// --- Utils
const toastCmp = useToast()
const themeCmp = useTheme()

// --- Reading
const readingStore = useReadingStore()
const { humidities, temperatures, soilMoistures } = toRefs(readingStore)

//

const onMountedCb = async () => {
    await readingStore
        .getReadings()
        .catch(() => toastCmp.error("Something went wrong."))
}

onMounted(onMountedCb)

//

</script>

<style scoped>

</style>