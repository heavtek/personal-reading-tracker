import {z} from "zod"

export const registerSchema=z.object({
 name:z.string().min(2,"min 2 charachter"),
email: z
    .string()
    .email("Invalid email"),
    password:z.string().min(6,"min password length must be 6")

});