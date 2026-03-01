import * as tf from "@tensorflow/tfjs"

//

const load = async (url: string) => {
    await tf.ready()
    return await tf.loadGraphModel(url)
}

const warmup = async (model: tf.GraphModel, imgsz: number) => {
    const dummy = tf.tidy(() => tf.zeros([1, imgsz, imgsz, 3], "float32"))
    const result = tf.tidy(() => model!.execute(dummy))
    tf.dispose([dummy, result])
}

/** Runs preprocessing, prediction, and postprocessing to get bboxes. */
const predict = async (
    model: tf.GraphModel,
    img: Parameters<typeof tf.browser.fromPixels>[0],
    imgsz: number,
    classes: string[],
    minIoU = 0.7,
    minScore = 0.5,
    maxBoxCount = 100
) => {
    const prediction = tf.tidy(() => {
        const imgTensor = preprocess(img, imgsz)
        const raw = model!.execute(imgTensor)
        return Array.isArray(raw) ? raw[0] : raw
    })

    const bboxes = await postprocess(prediction, imgsz, classes, minIoU, minScore, maxBoxCount)
    tf.dispose(prediction)
    return bboxes
}

const backend = async () => {
    await tf.ready()
    return tf.getBackend()
}

/** Resizes and normalizes an image. */
const preprocess = (img: Parameters<typeof tf.browser.fromPixels>[0], imgsz: number) => {
    return tf.tidy(() =>
        tf.browser.fromPixels(img, 3)
            .toFloat()
            .div(255.0)
            .resizeBilinear([imgsz, imgsz])
            .expandDims(0)
    )
}

/** YOLOv26n has prediction vector of [x1, y1, x2, y2, objectness, indices]. */
const extract = (vector: any) => {
    return tf.tidy(() => {
        const x1 = vector.slice([0, 0], [-1, 1]).squeeze()
        const y1 = vector.slice([0, 1], [-1, 1]).squeeze()
        const x2 = vector.slice([0, 2], [-1, 1]).squeeze()
        const y2 = vector.slice([0, 3], [-1, 1]).squeeze()

        const objectness = vector.slice([0, 4], [-1, 1]).squeeze()
        const indices = vector.slice([0, 5], [-1, 1]).squeeze()

        return [x1, y1, x2, y2, objectness, indices]
    })
}

/** Filters boxes based on IoU and objectness. */
const nms = async (
    boxes: any, 
    scores: any, 
    minIoU: number, 
    minScore: number, 
    maxBoxCount: number
) => {
    return await tf.image.nonMaxSuppressionAsync(
        boxes,
        scores,
        maxBoxCount,
        minIoU,
        minScore
    )
}

const arrify = async (...tensors: any) => {
    return await Promise.all(tensors.map((t: any) => t.array()))
}

/** Use nms indices to find the passed boxes. */
const classify = (
    imgsz: number, 
    classes: string[], 
    nmsi: any, 
    boxes: any, 
    scores: any, 
    indices: any
) => {
    const result = []

    for (const i of nmsi) {
        const box = {
            x: boxes[i][0] / imgsz,
            y: boxes[i][1] / imgsz,
            w: boxes[i][2] / imgsz,
            h: boxes[i][3] / imgsz,
        }

        const label = classes[indices[i]] || ""
        const confidence = scores[i] as number
        result.push({ box, class: label, confidence })
    }

    return result
}

/** Combines all processing steps into usable result. */
const postprocess = async (
    prediction: any,
    imgsz: number,
    classes: string[],
    minIoU = 0.5, 
    minScore = 0.4, 
    maxBoxCount = 100
) => {
    const [boxes, cornerBoxes, objectness, indices] = tf.tidy(() => {
        const raw = prediction.squeeze(0)

        const [x1, y1, x2, y2, objectness, indices] = extract(raw)
        const [w, h] = [x2.sub(x1), y2.sub(y1)]

        const boxes = tf.stack([x1, y1, w, h], 1)
        const cornerBoxes = tf.stack([y1, x1, y2, x2], 1)

        return [boxes, cornerBoxes, objectness, indices]
    })

    const nmsi = await nms(
        cornerBoxes,
        objectness,
        minIoU,
        minScore,
        maxBoxCount
    )

    const [nmsiArr, boxesArr, objectnessArr, indicesArr] = await arrify(nmsi, boxes, objectness, indices)
    tf.dispose([nmsi, cornerBoxes, boxes, objectness, indices])

    return classify(imgsz, classes, nmsiArr, boxesArr, objectnessArr, indicesArr)
}

//

export default {
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
