import { z } from "zod";

//

const DetectionSchema = z.object({
    box: z.object({
        x: z.coerce.number(),
        y: z.coerce.number(),
        w: z.coerce.number(),
        h: z.coerce.number(),
    }),
    class: z.string(),
    confidence: z.coerce.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const DetectionRawSchema = DetectionSchema.omit({ createdAt: true, updatedAt: true })

//

type DetectionSchema = z.infer<typeof DetectionSchema>
type DetectionRawSchema = z.infer<typeof DetectionRawSchema>

//

export { DetectionSchema, DetectionRawSchema }
