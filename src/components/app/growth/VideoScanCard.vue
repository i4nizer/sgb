<template>
    <v-card>
        <v-card-text class="pb-0">
            <v-responsive 
                class="w-100" 
                :aspect-ratio="1"
            >
                <div class="d-flex align-center justify-space-between">
                    <h4 class="text-center text-accent font-weight-bold">
                        Scan Coffee Leaf
                    </h4>
                    <v-menu open-on-hover>
                        <template #activator="{ props }">
                            <v-btn
                                size="x-small"
                                icon="mdi-dots-vertical"
                                class="text-grey"
                                :="props"
                            ></v-btn>
                        </template>
                        <template #default>
                            <v-list density="compact">
                                <v-list-item 
                                    title="Switch Camera"
                                    prepend-icon="mdi-camera-switch"
                                    @click="onSwitchCamera"
                                ></v-list-item>
                                <v-list-item
                                    title="Toggle Bounding Box"
                                    prepend-icon="mdi-selection"
                                    :class="hideBoundingBox ? `text-grey-darken-2` : `text-accent`"
                                    @click="onToggleBoundingBox"
                                ></v-list-item>
                            </v-list>
                        </template>
                    </v-menu>
                </div>
                <slot>
                    <!-- VideoBoundingBoxRenderer -->
                </slot>
            </v-responsive>
        </v-card-text>
        <v-card-actions>
            <v-btn
                size="small"
                color="accent"
                :icon="paused ? `mdi-play` : `mdi-pause`"
                @click="onPause"
            ></v-btn>
            <v-spacer></v-spacer>
            <v-btn
                text="Upload"
                color="accent"
                :loading="uploading"
                @click="onUpload"
            ></v-btn>
            <v-btn
                text="Download"
                color="accent"
                :loading="downloading"
                @click="onDownload"
            ></v-btn>
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
    paused?: boolean
    uploading?: boolean
    downloading?: boolean
    hideBoundingBox?: boolean
    onClose?: () => any
    onPause?: () => any
    onUpload?: () => any
    onDownload?: () => any
    onSwitchCamera?: () => any
    onToggleBoundingBox?: () => any
}>()

//

</script>

<style scoped>

</style>