<template>
    <v-container class="">
        <v-row dense align="center">
            <v-col cols="12">
                <h4 class="text-grey-darken-1">Thresholds</h4>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col 
                v-for="t in thresholds"
                cols="6"
                :key="t.id"
            >
                <ThresholdCard :threshold="t"></ThresholdCard>
            </v-col>
            <v-col 
                v-if="isFetchingThresholds"
                v-for="n in [1, 2, 3, 4]"
                cols="6"
                :key="n"
            >
                <v-skeleton-loader type="article"></v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { api } from '@/plugins/api'
import { ThresholdSchema, type ThresholdCreateSchema, type ThresholdUpdateSchema } from '@/schemas/ThresholdSchema'
import { onMounted, reactive, ref } from 'vue'

//

// --- Thresholds
const thresholds = reactive<ThresholdSchema[]>([])
const isFetchingThresholds = ref(false)

const getThresholds = async () => {
    const res = await api.get<ThresholdSchema[]>("/api/threshold")
    thresholds.splice(0, thresholds.length)
    thresholds.push(...res.data.map((r) => ThresholdSchema.parse(r)))
    return res.data
}

const postThreshold = async (data: ThresholdCreateSchema) => {
    const res = await api.post<ThresholdSchema>("/api/threshold", data)
    const parsed = ThresholdSchema.parse(res.data)
    thresholds.push(parsed)
    return parsed
}

const patchThreshold = async (id: number, data: ThresholdUpdateSchema) => {
    const res = await api.patch<ThresholdSchema>(`/api/threshold/${id}`, data)
    const parsed = ThresholdSchema.parse(res.data)
    const index = thresholds.findIndex(u => u.id == id)
    if (index != -1) thresholds.splice(index, 1, parsed)
    return parsed
}

const deleteThreshold = async (id: number, ) => {
    await api.delete<ThresholdSchema>(`/api/threshold/${id}`)
    const index = thresholds.findIndex(u => u.id == id)
    if (index != -1) thresholds.splice(index, 1)
}

//

const onMountedCb = async () => {
    isFetchingThresholds.value = true
    await getThresholds()
    isFetchingThresholds.value = false
}

onMounted(onMountedCb)

//

</script>

<style scoped>

</style>