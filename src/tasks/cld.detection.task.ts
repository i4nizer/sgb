import yoloPipelineMulticlass from "@/utils/yolo.pipeline.multiclass";

//

const { VITE_AI_CLD_URL, VITE_AI_CLD_IMGSZ, VITE_AI_CLD_CLASSES } = import.meta.env
const [url, imgsz, classes] = [VITE_AI_CLD_URL, Number(VITE_AI_CLD_IMGSZ), VITE_AI_CLD_CLASSES?.split(", ")]

self.postMessage("AI model is loading please wait.")
const model = await yoloPipelineMulticlass.load(url)
await yoloPipelineMulticlass.warmup(model, imgsz)
self.postMessage("AI model loaded successfully.")

const backend = await yoloPipelineMulticlass.backend()
const isGpu = backend.toLowerCase().includes("webgl")
if (isGpu) self.postMessage(`AI model is gpu accelerated, uses ${backend}.`)
else self.postMessage(`AI model is not gpu accelerated, uses ${backend}.`)

//

self.onmessage = async (e: MessageEvent<ImageBitmap>) => {
    const bboxes = await yoloPipelineMulticlass.predict(model, e.data, imgsz, classes, 0.9, 0.25, 100)
    self.postMessage(bboxes)
    if (bboxes.length > 0) self.postMessage(`AI model found ${bboxes.map(b => b.class).join(", ")}.`)
}

//
