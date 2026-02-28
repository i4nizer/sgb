<template>
    <v-container class="">
        <v-row dense justify="center">
            <v-col cols="12" md="6" lg="4">
                <v-empty-state
                    icon="mdi-crane"
                    text="This feature is being worked on."
                    title="Comming Soon"
                ></v-empty-state>
            </v-col>
        </v-row>
        <v-dialog 
            class="w-100 w-md-50 w-lg-33"
            location="center"
            v-model="showScanDialog" 
            @after-leave="cameraCmp.terminate()"
        >
            <v-card>
                <v-card-text class="pb-0">
                    <v-responsive class="w-100" :aspect-ratio="1">
                        <div class="d-flex align-center justify-space-between">
                            <h4 class="text-center text-accent font-weight-bold">Scan Coffee Leaf</h4>
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
                                            :class="showDetectionBBox ? `text-accent` : `text-black`"
                                            @click="showDetectionBBox = !showDetectionBBox"
                                        ></v-list-item>
                                    </v-list>
                                </template>
                            </v-menu>
                        </div>
                        <VideoBoundingBoxRenderer
                            class="mt-1 border rounded overflow-hidden d-flex align-center justify-center"
                            :src="stream"
                            :freeze="freezeScanning"
                            :detections="detections"
                            @frame="onDrawCameraFrame"
                            @freeze="onFreezeCapture"
                        ></VideoBoundingBoxRenderer>
                    </v-responsive>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        size="small"
                        color="accent"
                        :icon="freezeScanning ? `mdi-play` : `mdi-pause`"
                        @click="onClickPauseFrame"
                    ></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        text="Capture"
                        color="accent"
                        :loading="freezeScanning && freezePurpose == `Capture`"
                        @click="onClickCapture"
                    ></v-btn>
                    <v-btn
                        text="Close"
                        color="red"
                        @click="onCloseDialog"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-fab
            icon
            style="z-index: 9999"
            color="accent"
            class="position-fixed bottom-0 right-0 mb-16 mr-5"
            location="right bottom"
            transition="fade"
            :loading="cameraLoading || cldDetectorLoading"
        >
            <v-icon>mdi-scan-helper</v-icon>
            <v-speed-dial activator="parent">
                <v-btn 
                    key="1"
                    color="accent" 
                    icon="mdi-camera"
                    @click="onClickCamera"
                ></v-btn>
                <v-btn 
                    key="1"
                    color="accent" 
                    icon="mdi-image"
                    @click="onClickImage"
                ></v-btn>
            </v-speed-dial>
        </v-fab>
    </v-container>
</template>

<script setup lang="ts">
import VideoBoundingBoxRenderer from '@/components/app/growth/VideoBoundingBoxRenderer.vue';
import useCamera from '@/composables/use-camera';
import useCldDetection from '@/composables/use-cld-detection';
import useFileSave from '@/composables/use-file-save';
import type { DetectionRawSchema } from '@/schemas/DetectionSchema';
import { nextTick, onMounted, ref } from 'vue';

//

// --- Camera
const cameraCmp = useCamera()
const { stream, cameras } = cameraCmp
const cameraIndex = ref(0)
const cameraLoading = ref(false)

const onClickImage = async () => {

}

const onClickCamera = async () => {
    showScanDialog.value = true
    const cameraId = cameras.value[cameraIndex.value]?.deviceId
    await cameraCmp.begin(cameraId)
}

const onSwitchCamera = async () => {
    await cameraCmp.terminate()
    cameraIndex.value = (cameraIndex.value + 1) % (cameras.value.length)
    const cameraId = cameras.value[cameraIndex.value]?.deviceId
    await cameraCmp.begin(cameraId)
}

//

// --- Scan Dialog
const fileSaveCmp = useFileSave()
const showScanDialog = ref(false)
const freezePurpose = ref<"None" | "Pause" | "Capture">("None")
const freezeScanning = ref(false)

const onCloseDialog = async () => {
    freezeScanning.value = false
    showScanDialog.value = false
}

const onClickCapture = async () => {
    freezeScanning.value = false
    freezePurpose.value = "Capture"
    await nextTick()
    freezeScanning.value = true
}

const onFreezeCapture = async (canvas: HTMLCanvasElement) => {
    if (freezePurpose.value != "Capture") return
    const dataUrl = canvas.toDataURL("image/jpeg", 1)
    const base64 = dataUrl.includes(",") ? dataUrl.split(",")[1]! : dataUrl
    await fileSaveCmp.saveFile(base64, "image/jpeg", `sgb-capture-${Date.now()}.jpeg`)
    freezeScanning.value = freezePurpose.value == "Capture" ? false : freezeScanning.value
}

const onClickPauseFrame = async () => {
    freezePurpose.value = "Pause"
    freezeScanning.value = !freezeScanning.value
}

//

// --- CLD Detection
const cldDetectionCmp = useCldDetection()
const detections = ref<DetectionRawSchema[]>([])
const showDetectionBBox = ref(false)
const cldDetectorLoading = ref(false)

const onDrawCameraFrame = async (canvas: HTMLCanvasElement) => {
    if (!showDetectionBBox.value) return
    detections.value = await cldDetectionCmp.predict(canvas, 0.9, 0.25, 100)
}

//

const onMountedCb = async () => {
    cameraLoading.value = true
    await cameraCmp.list()
    cameraLoading.value = false

    const { VITE_AI_CLD_URL, VITE_AI_CLD_IMGSZ, VITE_AI_CLD_CLASSES } = import.meta.env
    const [url, imgsz, classes] = [VITE_AI_CLD_URL, VITE_AI_CLD_IMGSZ, VITE_AI_CLD_CLASSES]

    cldDetectorLoading.value = true
    await cldDetectionCmp.load(url, Number(imgsz), classes.split(", "))
    await cldDetectionCmp.warmup()
    cldDetectorLoading.value = false
}

onMounted(onMountedCb)

//

</script>

<style scoped>

</style>