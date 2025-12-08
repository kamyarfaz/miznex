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
        <h2 className="text-2xl font-bold text-action mb-3">
          ورود / ثبت نام
        </h2>
        <p className="text-headings text-base">
          لطفاً ایمیل خود را وارد کنید
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3 flex flex-col items-center mt-5">
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
                  "w-full text-center h-12 text-lg font-medium rounded-xl",
                  "bg-white/80 shadow-sm focus:ring-4 focus:ring-action transition-all duration-300 pr-12 backdrop-blur-sm",
                  errors.email
                    ? "border-action focus:border-action"
                    : emailValue
                    ? "border-action focus:border-action"
                    : ""
                )}
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-action-hover w-6 h-6 transition-colors" />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !isValid}
          className={cn(
            "w-full max-w-sm h-12 text-lg font-bold bg-action hover:bg-action-hover text-white",
            "shadow-lg hover:shadow-xl transform transition-all rounded-xl",
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
