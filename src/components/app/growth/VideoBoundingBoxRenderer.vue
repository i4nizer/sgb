<template>
	<div ref="divElement">
		<video
			ref="videoElement"
			autoplay
			playsinline
			muted
			style="position: absolute; left: -9999px"
			:width="size.width"
			:height="size.height"
		></video>
	</div>
</template>

<script setup lang="ts">
import type { DetectionSchema } from "@/schemas/DetectionSchema"
import * as PIXI from "pixi.js"
import { watch } from "vue"
import { onMounted, onUnmounted, reactive, ref } from "vue"

//

const props = defineProps<{
	src?: MediaProvider
	freeze?: boolean
	detections: DetectionSchema[]
	onFrame?: (canvas: HTMLCanvasElement) => any
	onRender?: (canvas: HTMLCanvasElement) => any
}>()

//

const divElement = ref<HTMLDivElement>()
const videoElement = ref<HTMLVideoElement>()

let observer: ResizeObserver | undefined = undefined
const size = reactive({ width: 640, height: 640 })

let app: PIXI.Application<PIXI.Renderer> | undefined = undefined
let sprite: PIXI.Sprite | undefined = undefined
let texture: PIXI.Texture | undefined = undefined
let graphics: PIXI.Graphics[] = []
let occupied = false

//

const init = async () => {
	app = new PIXI.Application()
	await app.init({
		width: size.width,
		height: size.height,
		backgroundAlpha: 0,
		antialias: true,
	})

	if (!divElement.value) return
	divElement.value.appendChild(app.canvas)

	observer = new ResizeObserver(onResize)
	observer.observe(divElement.value)
}

const clean = async () => {
	observer?.disconnect()
	if (app) app?.ticker?.destroy()
	await dispose(graphics)
	if (app) app?.destroy(true, { children: true })
}

const render = async () => {
	const ready = videoElement.value?.readyState !== HTMLMediaElement.HAVE_NOTHING
	if (!app || occupied || !ready || !props.src || !texture || !texture.source) return

	occupied = true
	// texture.update()
	await props.onFrame?.(app.canvas)
	await dispose(graphics)
	graphics = []

	if (!props.detections) return await props.onRender?.(app.canvas)
	for (const { box } of props.detections) {
		const x = box.x * size.width
		const y = box.y * size.height
		const w = box.w * size.width
		const h = box.h * size.height

		const g = new PIXI.Graphics()
		g.rect(x, y, w, h)
		g.stroke({ width: 2, color: 0xff0000, alpha: 1 })

		app.stage.addChild(g)
		graphics.push(g)
	}

	await props.onRender?.(app.canvas)
	occupied = false
}

const freeze = async () => {

}

const restart = async () => {
	if (!app) return
	app.ticker.stop()
	app.ticker.remove(render)
	app.stage.removeChildren()

	if (!props.src || !videoElement.value) return
	videoElement.value.srcObject = props.src
	await videoElement.value.play()

	texture = PIXI.Texture.from(videoElement.value)
	sprite = new PIXI.Sprite(texture)
	sprite.width = app.screen.width
	sprite.height = app.screen.height

	app.stage.addChild(sprite)
	app.ticker.add(render)
	app.ticker.start()
}

const dispose = async (graphics: PIXI.Graphics[]) => {
	for (const g of graphics) {
		app?.stage.removeChild(g)
		g.destroy()
	}
}

//

const onResize = async () => {
	if (!app || !divElement.value) return
	const { clientWidth, clientHeight } = divElement.value
	const min = Math.min(clientWidth, clientHeight)
	app!.renderer.resize(min, min)
	;[size.width, size.height] = [min, min]
}

//

watch(() => props.src, restart, { immediate: true })

//

onMounted(init)
onUnmounted(clean)

//
</script>

<style scoped></style>
