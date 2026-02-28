import z from "zod";

//

const UserSchema = z.object({
    id: z.coerce.number().int(),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const UserSafeSchema = UserSchema.omit({ password: true })
const UserSignInSchema = UserSchema.pick({ email: true, password: true })
const UserSignUpSchema = UserSchema.pick({ name: true, email: true, password: true })
const UserForgotPasswordSchema = UserSchema.pick({ email: true })

//

type UserSchema = z.infer<typeof UserSchema>
type UserSafeSchema = z.infer<typeof UserSafeSchema>
type UserSignInSchema = z.infer<typeof UserSignInSchema>
type UserSignUpSchema = z.infer<typeof UserSignUpSchema>
type UserForgotPasswordSchema = z.infer<typeof UserForgotPasswordSchema>

//

export { UserSchema, UserSafeSchema, UserSignInSchema, UserSignUpSchema, UserForgotPasswordSchema }
