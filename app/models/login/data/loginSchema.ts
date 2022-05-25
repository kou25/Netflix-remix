import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, { message: "Atleast 6 characters required" })
});

export type LoginProviderSchema = z.infer<typeof LoginSchema>;
