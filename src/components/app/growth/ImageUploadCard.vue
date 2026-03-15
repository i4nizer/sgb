<template>
    <v-card>
        <v-card-text class="pb-0">
            <v-responsive 
                class="w-100" 
                :aspect-ratio="1"
            >
                <div class="d-flex align-center justify-space-between">
                    <h4 class="pb-2 text-center text-accent font-weight-bold">
                        Upload Coffee Leaf
                    </h4>
                </div>
                <slot>
                    <!-- v-file-upload -->
                    <!-- ImageBoundingBoxRenderer -->
                </slot>
            </v-responsive>
        </v-card-text>
        <v-card-actions class="px-5">
            <v-btn
                icon="mdi-delete-outline"
                size="small"
                color="red"
                @click="onClear"
            ></v-btn>
            <v-spacer></v-spacer>
            <v-btn
                text="Close"
                color="red"
                @click="onClose"
            ></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">

//

const props = defineProps<{
    onClear?: () => any
    onClose?: () => any
}>()

//

</script>

<style scoped>

</style>