<template>
    <v-card class="pt-4" elevation="1">
        <template #append>
            <v-icon :icon="threshold.icon"></v-icon>
        </template>
        <template #subtitle>
            <span>{{ threshold.reading }}</span>
        </template>
        <template #text>
            <div class="d-flex flex-column align-start ga-2">
                <h3 class="pl-2">{{ threshold.operator }} {{ threshold.value }}</h3>
                <div class="w-100 d-flex align-center justify-space-between">
                    <span class="text-caption text-grey">"{{ threshold.message }}"</span>
                    <v-btn 
                        size="x-small" 
                        icon="mdi-pencil-outline text-blue"
                        @click="onClickEdit"
                    ></v-btn>
                </div>
            </div>
        </template>
    </v-card>
</template>

<script setup lang="ts">
import type { ThresholdSchema } from '@/schemas/ThresholdSchema';

//

const props = defineProps<{
    threshold: ThresholdSchema,
    onEdit?: (data: ThresholdSchema) => any
    onError?: (error: any) => any
}>()

//

const onClickEdit = async () => {
    await Promise
        .resolve()
		.then(() => props.onEdit && props.onEdit(props.threshold))
		.catch(err => props.onError && props.onError(err))
}

//

</script>

<style scoped>

</style>