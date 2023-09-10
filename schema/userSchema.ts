import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(5, { message: "Must be 3 or more characters long" }),
    lastName: z.string().min(5).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(30),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
});
