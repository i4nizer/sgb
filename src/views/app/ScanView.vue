<template>
    <v-container>
        <v-row dense>
            <v-col cols="12">
                <h3>Leaf Scanner</h3>
                <small class="text-grey">AI-powered disease detection</small>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="12" sm="6">
                <div class="w-100 h-100">
                    <v-file-upload
                        v-if="!imageFiles.length"
                        icon="mdi-leaf"
                        title="Drag and Drop Here"
                        label="Upload Image"
                        accept="image/*"
                        browse-text="Local Filesystem"
                        divider-text="or choose locally"
                        prepend-icon="mdi-camera"
                        v-model="imageFiles"
                        :multiple="false"
                        @update:model-value="onUploadImageFiles"
                    ></v-file-upload>
                    <ImageBoundingBoxRenderer
                        v-show="imagePreviewUrl"
                        :src="imagePreviewUrl"
                        :detections="[]"
                    ></ImageBoundingBoxRenderer>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import ImageBoundingBoxRenderer from '@/components/app/scan/ImageBoundingBoxRenderer.vue'
import { ref } from 'vue'

//

// --- Image Upload
const imageFiles = ref<File[]>([])
const imagePreviewUrl = ref("")

const onUploadImageFiles = async (files: File[]) => {
    if (files.length <= 0) return
    if (imagePreviewUrl.value) URL.revokeObjectURL(imagePreviewUrl.value)
    const file = files[0]!
    imagePreviewUrl.value = URL.createObjectURL(file)
    // detectFromImageFile(file)
}

//

</script>

<style scoped>

</style>