import { z } from "zod"
import { DetectionRawSchema } from "@/schemas/DetectionSchema"

//

export default () => {

    //

    const apiUrl = import.meta.env.VITE_AI_API_URL
    const apiKey = import.meta.env.VITE_AI_API_KEY

    //

    const detect = async (image: File) => {
        const form = new FormData()
        form.append("image", image)
        form.append("iou", "0.9")
        form.append("score", "0.15")

        const url = `${apiUrl}/api/cld/predict`
        const headers = { "x-api-key": apiKey }
        const res = await fetch(url, { method: "POST", body: form, headers })
            .catch(() => { throw new Error("Something went wrong.") })
        
        if (!res.ok) throw new Error(await res.text())
        const payload = await res.json()
        
        const { data, error, success } = z.array(DetectionRawSchema).safeParse(payload)
        if (!success) throw new Error(error.issues[0]!.message)
        return data
    }

    //

    return { apiUrl, detect }
}