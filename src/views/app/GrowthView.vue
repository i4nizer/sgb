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
                        <h4 class="mb-2 text-center text-accent font-weight-bold">Scan Coffee Leaf</h4>
                        <VideoBoundingBoxRenderer
                            invert-x
                            class="border rounded overflow-hidden d-flex align-center justify-center"
                            :src="stream"
                            :freeze="freezeScanning"
                            :detections="[]"
                            @freeze="onFreezeCapture"
                        ></VideoBoundingBoxRenderer>
                    </v-responsive>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        icon="mdi-camera-switch"
                        color="grey"
                        @click="onSwitchCamera"
                    ></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        text="Capture"
                        color="accent"
                        :loading="freezeScanning"
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
import { nextTick, onMounted, ref } from 'vue';

//

// --- Camera
const cameraCmp = useCamera()
const { stream, cameras } = cameraCmp
const cameraIndex = ref(0)

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
const freezeScanning = ref(false)
const showScanDialog = ref(false)

const onCloseDialog = async () => {
    freezeScanning.value = false
    showScanDialog.value = false
}

const onClickCapture = async () => {
    freezeScanning.value = true
    await nextTick()
}

const onFreezeCapture = async (canvas: HTMLCanvasElement) => {
    const dataUrl = canvas.toDataURL("image/jpeg", 1)
    const base64 = dataUrl.includes(",") ? dataUrl.split(",")[1]! : dataUrl
    await fileSaveCmp.saveFile(base64, "image/jpeg", `sgb-capture-${Date.now()}.jpeg`)
    freezeScanning.value = false
}

//

// --- CLD Detection
const cldDetectionCmp = useCldDetection()



//

const onMountedCb = async () => {
    await cameraCmp.list()

    const { VITE_AI_CLD_URL, VITE_AI_CLD_IMGSZ, VITE_AI_CLD_CLASSES } = import.meta.env
    const [url, imgsz, classes] = [VITE_AI_CLD_URL, VITE_AI_CLD_IMGSZ, VITE_AI_CLD_CLASSES]
    await cldDetectionCmp.load(url, Number(imgsz), classes.split(", "))
}

onMounted(onMountedCb)

//

</script>

<style scoped>

</style>