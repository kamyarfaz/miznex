"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { verifyCodeSchema } from "@/schemas";
import { cn } from "@/utils/utils";
import { VerifyEmailFormProps } from "@/types/main";
import { useTranslations } from "next-intl";

export const VerifyEmailForm: React.FC<VerifyEmailFormProps> = ({
  email,
  onSubmit,
  onResend,
  isLoading,
  resendTimer,
  formatTime,
  isExistingUser
}) => {
  const { control, handleSubmit, watch } = useForm<{ code: string }>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { code: "" },
    mode: "onChange",
  });

  const t = useTranslations("adminLogin");
  const codeValue = watch("code", "");

  const handleFormSubmit = (data: { code: string }) => {
    onSubmit(data.code ,isExistingUser);
  };

  return (
    <div className="space-y-3">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-action mb-3">
          {t("verifyEmail")}
        </h2>
        <p className="text-headings text-base">
          {t("codeSent")}
        </p>
      </div>

      <form className="space-y-3 px-8 mt-5">
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  ""
                );
              }}
              containerClassName="justify-center flex gap-3"
            >
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-12 h-12 border-2 rounded-lg bg-white/80 dark:bg-gray-800/80 text-lg font-bold mx-1"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading || !codeValue || codeValue.length !== 6}
          onClick={handleSubmit(handleFormSubmit)}
          className={cn(
            "w-full h-12 bg-action text-white font-bold text-lg rounded-xl",
            "hover:bg-action-hover transition-all shadow-md mt-3"
          )}
        >
          <CheckCircle2 className="w-5 h-5 ml-2" />
          {isLoading ? t("verifying") : t("verify")}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onResend}
          disabled={resendTimer > 0}
          className="w-full h-10"
        >
          {resendTimer > 0
            ? `${t("resend")} (${formatTime(resendTimer)})`
            : t("resend")}
        </Button>
      </form>
    </div>
  );
};
