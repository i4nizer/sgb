import { Buffer } from "buffer"
(self as any).Buffer = Buffer

//

import type { GraphModel } from "@tensorflow/tfjs";
import * as Comlink from "comlink"
import yoloPipelineMulticlass from "@/utils/yolo.pipeline.multiclass";

//

// --- Config
let model: GraphModel | undefined = undefined
let imgsize = 256
let classes: string[] = []

// --- Functions
const load = async (url: string, imgsz: number, labels: string[]) => {
    imgsize = imgsz
    classes = labels
    
    const alpha = performance.now()
    model = await yoloPipelineMulticlass.load(url)
    const omega = performance.now()
    
    const backend = await yoloPipelineMulticlass.backend()
    console.info(`AI model loaded on ${backend} in ${(omega - alpha).toFixed(2)}ms.`)
}

const warmup = async () => {
    if (!model) throw new Error(`AI model not initialized yet.`)
    await yoloPipelineMulticlass.warmup(model, imgsize)
}

const predict = async (image: ImageBitmap, minIoU?: number, minScore?: number, maxBoxCount?: number) => {
    if (!model) throw new Error(`AI model not initialized yet.`)
    const alpha = performance.now()
    const bboxes = await yoloPipelineMulticlass.predict(model, image, imgsize, classes, minIoU, minScore, maxBoxCount)
    
    image.close()
    console.info(`AI model predicted in ${(performance.now() - alpha).toFixed(2)}ms.`)
    return bboxes
}

const dispose = async () => {
    if (model) model.dispose()
    model = undefined
}

//

Comlink.expose({ load, warmup, predict, dispose })
