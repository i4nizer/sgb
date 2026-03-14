<template>
    <v-card class="pt-4" elevation="1">
        <template #append>
            <v-icon :color="props['icon:color']">{{ icon }}</v-icon>
        </template>
        <template #subtitle>
            <span>{{ title }}</span>
        </template>
        <template #text>
            <div class="d-flex flex-column align-start ga-2">
                <h3 class="pl-2">{{ value }}{{ unit }}</h3>
                <div class="w-100 d-flex align-center justify-space-between">
                    <v-chip size="x-small" :color="props['status:color']">{{ status }}</v-chip>
                    <span class="text-caption text-grey">{{ date.format(props.date, "fullTime12h") }}</span>
                </div>
            </div>
        </template>
    </v-card>
</template>

<script setup lang="ts">
import { useDate } from 'vuetify';

//

const props = defineProps<{
    icon: string
    "icon:color": string
    title: string
    value: number
    unit: string
    date: Date
    status: string
    "status:color": string
}>()

// --- Utils
const date = useDate()

//

</script>

<style scoped>

</style>