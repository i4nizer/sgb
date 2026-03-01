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
            :loading="cameraLoading"
            :disabled="cameraLoading"
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
import useToast from '@/composables/use-toast';
import type { DetectionRawSchema } from '@/schemas/DetectionSchema';
import { nextTick, onMounted, ref } from 'vue';

//

// --- Utils
const toast = useToast()

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
    toast.success("Image captured successfully.")
    await fileSaveCmp.saveFile(base64, "image/jpeg", `sgb-capture-${Date.now()}.jpeg`)
    freezeScanning.value = freezePurpose.value == "Capture" ? false : freezeScanning.value
}

const onClickPauseFrame = async () => {
    freezePurpose.value = "Pause"
    freezeScanning.value = !freezeScanning.value
}

//

// --- CLD Detection
const cldDetectionWorker = ref<Worker>()
const detections = ref<DetectionRawSchema[]>([])
const showDetectionBBox = ref(true)
const cldDetectionLastPost = ref(0)

const onDrawCameraFrame = async (canvas: HTMLCanvasElement) => {
    const elapsed = performance.now() - cldDetectionLastPost.value
    if (!showDetectionBBox.value || !cldDetectionWorker.value || elapsed <= 250) return
    const bitmap = await createImageBitmap(canvas)
    cldDetectionWorker.value.postMessage(bitmap, [bitmap])
    cldDetectionLastPost.value = performance.now()
}

const onCldDetectionMessage = async (e: MessageEvent<DetectionRawSchema[] | string>) => {
    if (typeof e.data == "string") toast.info(e.data)
    else detections.value = e.data
}

//

const onMountedCb = async () => {
    const cldDetectionUrl = new URL("@/tasks/cld.detection.task.ts", import.meta.url)
    cldDetectionWorker.value = new Worker(cldDetectionUrl, { type: "module" })
    cldDetectionWorker.value.onmessage = onCldDetectionMessage
    toast.warn("AI model initializing.")

    toast.warn("Camera loading please wait.")
    cameraLoading.value = true
    await cameraCmp.list()
    cameraLoading.value = false
    toast.success("Camera loaded successfully.")
}

onMounted(onMountedCb)

//

</script>

<style scoped>

</style>