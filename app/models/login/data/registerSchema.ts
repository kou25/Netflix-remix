import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, { message: "Atleast 6 characters required" }),
    confirm: z
      .string()
      .nonempty("confirm password is required")
      .min(6, { message: "Atleast 6 characters required" })
  })
  .refine((data) => data.confirm === data.password, {
    message: "Passwords don't match",
    path: ["confirm"]
  });

export type RegisterProviderSchema = z.infer<typeof RegisterSchema>;
