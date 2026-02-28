<template>
	<div 
		ref="divElement" 
		:style="{ transform: `scaleX(${invertX ? -1 : 1}) scaleY(${invertY ? -1 : 1})` }"
	>
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
import type { DetectionRawSchema } from "@/schemas/DetectionSchema"
import * as PIXI from "pixi.js"
import { onMounted, onUnmounted, reactive, watch, ref } from "vue"

//

const props = defineProps<{
	src?: MediaProvider
	freeze?: boolean
	invertX?: boolean
	invertY?: boolean
	detections: DetectionRawSchema[]
	onFrame?: (canvas: HTMLCanvasElement) => any
	onRender?: (canvas: HTMLCanvasElement) => any
	onFreeze?: (canvas: HTMLCanvasElement) => any
}>()

//

const divElement = ref<HTMLDivElement>()
const videoElement = ref<HTMLVideoElement>()

let observer: ResizeObserver | undefined = undefined
const size = reactive({ width: 640, height: 640 })

let app: PIXI.Application<PIXI.Renderer> | undefined = undefined
let sprite: PIXI.Sprite | undefined = undefined
let texture: PIXI.Texture | undefined = undefined
let labels: PIXI.Text[] = []
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
		preserveDrawingBuffer: true,
	})

	if (!divElement.value) return
	divElement.value.appendChild(app.canvas)

	observer = new ResizeObserver(onResize)
	observer.observe(divElement.value)
}

const clean = async () => {
	observer?.disconnect()
	if (!app) return

	app.ticker.stop()
    app.ticker.remove(render)
    await dispose(graphics, labels)
	app.destroy(true, { children: true, texture: true })

	sprite = undefined
	texture = undefined
	graphics = []
}

const render = async () => {
	const ready = videoElement.value?.readyState !== HTMLMediaElement.HAVE_NOTHING
	if (!app || occupied || !ready || !props.src || !texture || !texture.source) return

	occupied = true
	await props.onFrame?.(app.canvas)
	await dispose(graphics, labels)
	graphics = []

	if (props.detections.length <= 0) occupied = false
	if (props.detections.length <= 0) return await props.onRender?.(app.canvas)

	for (const { box, class: label, confidence } of props.detections) {
		const x = box.x * size.width
		const y = box.y * size.height
		const w = box.w * size.width
		const h = box.h * size.height

		const g = new PIXI.Graphics()
		g.rect(x, y, w, h)
		g.stroke({ width: 2, color: 0x4a8c6f, alpha: 1 })

		const style: PIXI.CanvasTextOptions["style"] = { fontSize: 11, fill: 0xffffff, fontWeight: 'bold' }
		const text = new PIXI.Text({ text: `${label} ${(confidence * 100).toFixed(0)}%`, style })
		
		const padding = 2
		const labelWidth = text.width + padding * 2
		const labelHeight = text.height + padding * 2
		
		const bgX = x
		const bgY = y - labelHeight
		
		const bg = new PIXI.Graphics()
		bg.rect(bgX, bgY, labelWidth, labelHeight)
		bg.fill({ color: 0x4a8c6f, alpha: 0.7 })
		
		text.x = bgX + padding
		text.y = bgY + padding
		
		app.stage.addChild(bg)
		app.stage.addChild(text)
		graphics.push(bg)
		labels.push(text)

		app.stage.addChild(g)
		graphics.push(g)
	}

	await props.onRender?.(app.canvas)
	occupied = false
}

const freeze = async () => {
	if (!app || !videoElement.value) return

	app.ticker.stop()
	app.ticker.remove(render)
	videoElement.value.pause()

	await props.onFreeze?.(app.canvas)
}

const unfreeze = async () => {
	if (!app || !videoElement.value) return

	await videoElement.value.play()
	app.ticker.add(render)
	app.ticker.start()
}

const restart = async () => {
	if (!app) return
	app.ticker.stop()
	app.ticker.remove(render)
	app.stage.removeChildren()

	sprite?.destroy(true)
	sprite = undefined
	texture?.destroy(true)
	texture = undefined

	if (!props.src || !videoElement.value) return
	videoElement.value.pause()
	videoElement.value.srcObject = props.src
	await new Promise(res => videoElement.value!.onloadedmetadata = res)
	await videoElement.value.play()

	texture = PIXI.Texture.from(videoElement.value)
	sprite = new PIXI.Sprite(texture)
	sprite.width = app.screen.width
	sprite.height = app.screen.height

	app.stage.addChild(sprite)
	app.ticker.add(() => render().catch(console.error))
	app.ticker.start()
}

const dispose = async (graphics: PIXI.Graphics[], labels: PIXI.Text[]) => {
	graphics.forEach(g => [app?.stage.removeChild(g), g.destroy()])
	labels.forEach(l => [app?.stage.removeChild(l), l.destroy()])
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
watch(() => props.freeze, (nv) => nv ? freeze() : unfreeze())

//

onMounted(init)
onUnmounted(clean)

//
</script>

<style scoped></style>
