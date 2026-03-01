import yoloPipelineMulticlass from "@/utils/yolo.pipeline.multiclass"
import * as tf from "@tensorflow/tfjs"
import { ref, toRaw } from "vue"

//

export default () => {

    //

    const size = ref(256)
    const model = ref<tf.GraphModel>()
    const classes = ref<string[]>([])

    //

    const load = async (
        url: string,
        imgsz?: number,
        labels?: string[],
    ) => {
        size.value = imgsz || 256
        classes.value = labels || []
        model.value = await yoloPipelineMulticlass.load(url)
        return toRaw(model.value)
    }

    const warmup = async () => {
        if (!model.value) return
        await yoloPipelineMulticlass.warmup(toRaw(model.value), size.value)
    }

    /** Runs preprocessing, prediction, and postprocessing to get bboxes. */
    const predict = async (img: any, minIoU = 0.7, minScore = 0.5, maxBoxCount = 100) => {
        if (!model.value) throw new Error("CLD model not found.")

        return await yoloPipelineMulticlass
            .predict(toRaw(model.value), img, size.value, classes.value, minIoU, minScore, maxBoxCount)
    }

    const backend = async () => {
        return await yoloPipelineMulticlass.backend()
    }


    /** Resizes and normalizes an image. */
    const preprocess = (img: Parameters<typeof tf.browser.fromPixels>[0]) => {
        return yoloPipelineMulticlass.preprocess(img, size.value)
    }

    /** YOLOv26n has prediction vector of [x1, y1, x2, y2, objectness, indices]. */
    const extract = (vector: any) => {
        return yoloPipelineMulticlass.extract(vector)
    }

    /** Filters boxes based on IoU and objectness. */
    const nms = async (boxes: any, scores: any, minIoU: number, minScore: number, maxBoxCount: number) => {
        return await yoloPipelineMulticlass.nms(boxes, scores, minIoU, minScore, maxBoxCount)
    }

    const arrify = async (...tensors: any) => {
        return await yoloPipelineMulticlass.arrify(tensors)
    }

    /** Use nms indices to find the passed boxes. */
    const classify = (nmsi: any, boxes: any, scores: any, indices: any) => {
        return yoloPipelineMulticlass.classify(size.value, classes.value, nmsi, boxes, scores, indices)
    }

    /** Combines all processing steps into usable result. */
    const postprocess = async (prediction: any, minIoU = 0.5, minScore = 0.4, maxBoxCount = 100) => {
        return yoloPipelineMulticlass
            .postprocess(prediction, size.value, classes.value, minIoU, minScore, maxBoxCount)
    }

    //

    return {
        size,
        model,
        classes,
        load,
        warmup,
        predict,
        backend,
        preprocess,
        nms,
        extract,
        arrify,
        classify,
        postprocess,
    }
}
