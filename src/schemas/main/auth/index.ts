import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().min(1).email(),
});

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(6)
    .max(6)
    .regex(/^\d{6}$/),
});

export const completeProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9_]+$/),
});
