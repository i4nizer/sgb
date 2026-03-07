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
    const classes = ref<string[]>([])
    
    let model: Comlink.Remote<CldDetectionWorkerExpose> | undefined
    let worker: InstanceType<typeof CldDetectionWorker> | undefined

    //

    const load = async (url: string, imgsz?: number, labels?: string[]) => {
        path.value = url
        size.value = imgsz || 256
        classes.value = labels || []
        
        worker = new CldDetectionWorker()
        model = Comlink.wrap<CldDetectionWorkerExpose>(worker)
        await model.load(url, toRaw(size.value), toRaw(classes.value))
    }

    const warmup = async () => {
        if (!model) throw new Error(`AI model not initialized yet.`)
        await model.warmup()
    }
    
    const predict = async (img: ImageBitmap, minIoU = 0.9, minScore = 0.25, maxBoxCount = 100) => {
        if (!model) throw new Error(`AI model not initialized yet.`)
        return await model.predict(img, minIoU, minScore, maxBoxCount)
    }
    
    const dispose = async () => {
        if (!model) throw new Error(`AI model not initialized yet.`)
        return await model.dispose()
    }

    //

    return {
        path,
        size,
        model,
        worker,
        classes,
        load,
        warmup,
        predict,
        dispose,
    }
}
