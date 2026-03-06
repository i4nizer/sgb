import { Buffer } from "buffer"
(self as any).Buffer = Buffer
import yoloPipelineMulticlass from "@/utils/yolo.pipeline.multiclass";

//

const { VITE_AI_CLD_URL, VITE_AI_CLD_IMGSZ, VITE_AI_CLD_CLASSES } = import.meta.env
const [url, imgsz, classes] = [VITE_AI_CLD_URL, Number(VITE_AI_CLD_IMGSZ), VITE_AI_CLD_CLASSES?.split(", ")]

const model = await yoloPipelineMulticlass.load(url)
await yoloPipelineMulticlass.warmup(model, imgsz)
const backend = await yoloPipelineMulticlass.backend()
self.postMessage(`AI model loaded on ${backend}.`)

//

self.onmessage = async (e: MessageEvent<ImageBitmap>) => {
    const alpha = performance.now()
    const bboxes = await yoloPipelineMulticlass.predict(model, e.data, imgsz, classes, 0.9, 0.25, 100)
    self.postMessage(bboxes)
    console.info(`AI model predicted in ${(performance.now() - alpha).toFixed(2)}ms.`)
}

//
