import {z} from "zod"

export const createUserSchema = z.object({
    name: z.string().min(2, "name must be at least 2 characters"),
    email: z.string().email("Email must be valid"),
    password: z.string()
        .min(6, "password must be at least six(6) characters")
        .max(100, "password must be at most a hundrend(100) characters")
        .regex(/[A-Z]/, "password must include at least one capital letter")
        .regex(/[a-z]/, "password must include at least one small letter")
        .regex(/[0-9]/, "password must include at least one number")
        .regex(/[^A-Za-z0-9]/, "password must include at least one special character")
})
