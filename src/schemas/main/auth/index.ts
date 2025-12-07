import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().min(1, "ایمیل الزامی است").email("ایمیل معتبر نیست"),
});

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(6, "کد باید 6 رقم باشد")
    .max(6, "کد باید 6 رقم باشد")
    .regex(/^\d{6}$/, "کد باید فقط شامل اعداد باشد"),
});

export const completeProfileSchema = z.object({
  firstName: z.string().min(1, "نام الزامی است"),
  lastName: z.string().min(1, "نام خانوادگی الزامی است"),
  username: z
    .string()
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "نام کاربری فقط می‌تواند شامل حروف، اعداد و _ باشد"
    ),
});
