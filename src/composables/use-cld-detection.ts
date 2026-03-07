import * as Comlink from "comlink"
import CldDetectionWorker from '@/tasks/cld.detection.task.ts?worker';
import { ref, toRaw } from 'vue';
import type { DetectionRawSchema } from '@/schemas/DetectionSchema';

//

type CldDetectionWorkerExpose = {
    load: (url: string, imgsz: number, labels: string[]) => Promise<void>
    warmup: () => Promise<void>
    dispose: () => Promise<void>
    predict: (
        image: ImageBitmap,
        minIoU?: number,
        minScore?: number,
        maxBoxCount?: number
    ) => Promise<DetectionRawSchema[]>
}

//

export default () => {
    
    //
    
    const path = ref("")
    const size = ref(256)
    const worker = ref<InstanceType<typeof CldDetectionWorker>>()
    const classes = ref<string[]>([])

    //

    const load = async (url: string, imgsz?: number, labels?: string[]) => {
        path.value = url
        size.value = imgsz || 256
        worker.value = new CldDetectionWorker()
        classes.value = labels || []
        
        const model = Comlink.wrap<CldDetectionWorkerExpose>(worker.value)
        await model.load(url, toRaw(size.value), toRaw(classes.value))
    }

    const warmup = async () => {
        if (!worker.value) throw new Error(`AI model not initialized yet.`)
        const model = Comlink.wrap<CldDetectionWorkerExpose>(worker.value)
        await model.warmup()
    }
    
    const predict = async (img: ImageBitmap, minIoU = 0.9, minScore = 0.25, maxBoxCount = 100) => {
        if (!worker.value) throw new Error(`AI model not initialized yet.`)
        const model = Comlink.wrap<CldDetectionWorkerExpose>(worker.value)
        return await model.predict(img, minIoU, minScore, maxBoxCount)
    }
    
    const dispose = async () => {
        if (!worker.value) throw new Error(`AI model not initialized yet.`)
        const model = Comlink.wrap<CldDetectionWorkerExpose>(worker.value)
        return await model.dispose()
    }

    //

    return {
        path,
        size,
        worker,
        classes,
        load,
        warmup,
        predict,
        dispose,
    }
}
