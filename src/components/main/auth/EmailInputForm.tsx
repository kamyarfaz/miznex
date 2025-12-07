"use client";

import { useForm, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, LogIn } from "lucide-react";
import { cn } from "@/utils/utils";
import { EmailInputFormProps } from "@/types/main";
import { emailSchema } from "@/schemas";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const EmailInputForm: React.FC<EmailInputFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<{ email: string }>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const emailValue = useWatch({ name: "email", control });

  const handleFormSubmit = (data: { email: string }) => {
    onSubmit(data.email);
  };

  return (
    <div className="space-y-3">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
          ورود و ثبت نام
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
          لطفاً ایمیل خود را وارد کنید
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3 flex flex-col items-center">
        <div className="w-full space-y-4">
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm group">
              <Input
                data-testid="email-input"
                type="email"
                {...register("email")}
                placeholder="example@mail.com"
                autoComplete="email"
                disabled={isLoading}
                className={cn(
                  "w-full text-center h-12 text-lg font-medium rounded-xl border-2",
                  "bg-white/80 dark:bg-gray-800/80 shadow-sm focus:ring-4 transition-all duration-300 pr-12",
                  "backdrop-blur-sm",
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/20"
                    : emailValue
                    ? "border-green-500 focus:border-green-500 focus:ring-green-100 dark:focus:ring-green-900/20"
                    : "border-gray-200 dark:border-gray-600 focus:border-amber-500 focus:ring-amber-100 dark:focus:ring-amber-900/20"
                )}
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 dark:text-amber-400 w-6 h-6 transition-colors" />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !isValid}
          className={cn(
            "w-full max-w-sm h-12 text-lg font-bold bg-action hover:bg-action-hover text-white",
            "shadow-lg hover:shadow-xl transform hover:scale-105 transition-all rounded-xl",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          )}
        >
          <LogIn className="w-6 h-6 ml-2" />
          {isLoading ? "در حال ارسال..." : "ارسال کد تأیید"}
        </Button>
      </form>
    </div>
  );
};
