import z from "zod";

//

const ReadingSchema = z.object({
    id: z.coerce.number().int(),
    name: z.string().min(1),
    unit: z.string().default(""),
    value: z.coerce.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const ReadingChartSchema = ReadingSchema.pick({ name: true, unit: true, value: true, createdAt: true })
const ReadingCreateSchema = ReadingSchema.pick({ name: true, unit: true, value: true })
const ReadingUpdateSchema = ReadingSchema.pick({ name: true, unit: true, value: true }).partial()

//

type ReadingSchema = z.infer<typeof ReadingSchema>
type ReadingChartSchema = z.infer<typeof ReadingChartSchema>
type ReadingCreateSchema = z.infer<typeof ReadingCreateSchema>
type ReadingUpdateSchema = z.infer<typeof ReadingUpdateSchema>

//

export { ReadingSchema, ReadingChartSchema, ReadingCreateSchema, ReadingUpdateSchema }
