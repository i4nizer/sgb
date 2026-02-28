<template>
	<v-container>
		<v-row dense>
			<v-col cols="12" md="4">
				<h3>Leaf Scanner</h3>
				<small class="text-grey">AI-powered disease detection</small>
			</v-col>
			<v-col cols="12" md="2" class="text-end">
				<v-btn
					size="small"
					icon="mdi-delete-outline"
					class="bg-transparent"
					:disabled="!imageFiles.length"
					@click="onClickClear"
				></v-btn>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" md="6">
				<div class="w-100 h-100">
					<v-file-upload
						v-if="!imageFiles.length"
						clearable
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
					<div
						v-if="detectionLoading"
						class="w-100 ga-2 d-flex flex-column align-center justify-center"
						style="aspect-ratio: 1"
					>
						<v-progress-circular indeterminate color="accent"></v-progress-circular>
						<div>Analyzing Leaf...</div>
					</div>
					<ImageBoundingBoxRenderer
						v-show="imagePreviewUrl && !detectionLoading"
						:src="imagePreviewUrl"
						:detections="detections"
					></ImageBoundingBoxRenderer>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import ImageBoundingBoxRenderer from "@/components/app/scan/ImageBoundingBoxRenderer.vue"
import useCldDetection from "@/composables/use-cld-detection"
import type { DetectionRawSchema } from "@/schemas/DetectionSchema"
import { onMounted, ref } from "vue"

//

// --- Image Upload
const imageFiles = ref<File[]>([])
const imagePreviewUrl = ref("")

const onUploadImageFiles = async (files: File[]) => {
	if (files.length <= 0) return
	if (imagePreviewUrl.value) URL.revokeObjectURL(imagePreviewUrl.value)
	const file = files[0]!
	imagePreviewUrl.value = URL.createObjectURL(file)
	detectFromImageFile(file)
}

// --- Egg Detection
const detections = ref<DetectionRawSchema[]>([])
const detectionComp = useCldDetection()
const detectionLoading = ref(false)

const detectFromImageFile = async (file: File) => {
	detectionLoading.value = true
	await detectionComp
		.detect(file)
		.then(res => (detections.value = res))
		.catch(console.error)
	detectionLoading.value = false
}

const onClickClear = () => {
	imageFiles.value = []
	URL.revokeObjectURL(imagePreviewUrl.value)
	imagePreviewUrl.value = ""
	detections.value = []
}

//

const onMountedCallback = async () => {
	const headers = { "x-api-key": import.meta.env.VITE_AI_API_KEY }
	await fetch(`${import.meta.env.VITE_AI_API_URL}`, { headers }).catch(console.error)
}

onMounted(onMountedCallback)

//
</script>

<style scoped></style>
