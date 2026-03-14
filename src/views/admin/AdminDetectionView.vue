<template>
    <v-container class="">
        <v-row dense align="center">
            <v-col cols="12">
                <h4 class="text-grey-darken-1">Detection</h4>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="12">
                <v-list rounded="lg">
                    <v-list-item>
                        <template #prepend>
                            <v-icon icon="mdi-vector-intersection" color="purple"></v-icon>
                        </template>
                        <template #default>
                            <v-number-input
                                inset
                                hide-details
                                label="Min IoU"
                                color="accent"
                                v-model="minIoU"
                                :min="0"
                                :max="1"
                                :step="0.01"
                                :precision="2"
                            ></v-number-input>
                        </template>
                    </v-list-item>
                    <v-divider class="my-2"></v-divider>
                    <v-list-item>
                        <template #prepend>
                            <v-icon icon="mdi-percent" color="accent"></v-icon>
                        </template>
                        <template #default>
                            <v-number-input
                                inset
                                hide-details
                                label="Min Score"
                                color="accent"
                                v-model="minScore"
                                :min="0"
                                :max="1"
                                :step="0.01"
                                :precision="2"
                            ></v-number-input>
                        </template>
                    </v-list-item>
                    <v-divider class="my-2"></v-divider>
                    <v-list-item>
                        <template #prepend>
                            <v-icon icon="mdi-selection-multiple" color="blue"></v-icon>
                        </template>
                        <template #default>
                            <v-number-input
                                inset
                                hide-details
                                label="Box Count"
                                color="accent"
                                v-model="maxBoxCount"
                                :min="0"
                                :step="1"
                                :precision="0"
                            ></v-number-input>
                        </template>
                    </v-list-item>
                    <v-divider class="my-2"></v-divider>
                    <v-list-item>
                        <template #prepend>
                            <v-icon icon="mdi-tag-multiple" color="orange"></v-icon>
                        </template>
                        <template #default>
                            <span>Classes: {{ classes }}</span>                            
                        </template>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { useParameterStore } from '@/stores/parameter';
import { storeToRefs } from 'pinia';

//

// --- Parameters
const parameterStore = useParameterStore()
const classes = import.meta.env.VITE_AI_CLD_CLASSES
const { minIoU, minScore, maxBoxCount } = storeToRefs(parameterStore)

//

</script>

<style scoped>

</style>