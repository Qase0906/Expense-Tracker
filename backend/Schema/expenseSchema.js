import { z } from "zod"


export const expenseValidator = z.object({

    title: z.string().min(2, "Title must be atleast 2 characters"),
    amount: z.coerce.number({invalid_type_error: "Amount must be a number"})
            .positive("Amount must be greater than 0"),
    type: z.enum(["expense", "income"]).optional(),
    category: z.string().optional(),
    date: z.string().optional(),

})