<template>
    <v-card color="white" class="pt-4" elevation="1">
        <template #append>
            <v-icon :color="props['icon:color']">{{ icon }}</v-icon>
        </template>
        <template #subtitle>
            <span>{{ title }}</span>
        </template>
        <template #text>
            <div class="d-flex flex-column align-start ga-2">
                <h3 class="pl-2">{{ value }}{{ unit }}</h3>
                <v-chip :color="props['status:color']">{{ status }}</v-chip>
            </div>
        </template>
    </v-card>
</template>

<script setup lang="ts">

//

const props = defineProps<{
    icon: string
    "icon:color": string
    title: string
    value: number
    unit: string
    status: string
    "status:color": string
}>()

//

</script>

<style scoped>

</style>