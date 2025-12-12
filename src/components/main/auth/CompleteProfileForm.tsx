"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { completeProfileSchema } from "@/schemas";
import { cn } from "@/utils/utils";
import { CompleteProfileFormProps } from "@/types/main";
import { useTranslations } from "next-intl";

export const CompleteProfileForm: React.FC<CompleteProfileFormProps> = ({
  onSubmit,
  isLoading,
  usernameError,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{
    firstName: string;
    lastName: string;
    username: string;
  }>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: { firstName: "", lastName: "", username: "" },
    mode: "onChange",
  });
  const t = useTranslations("adminLogin");

  const handleFormSubmit = (data: any) => {
    onSubmit(data.firstName, data.lastName, data.username);
  };

  return (
    <div className="space-y-3">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-action mb-3">{t("completeProfile")}</h2>
        <p className="text-headings text-base">{t("enterProfileInfo")}</p>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 px-6 mt-5"
      >
        <Input
          {...register("firstName")}
          placeholder={t("firstName")}
          className="h-12 text-lg text-center font-medium"
        />

        <Input
          {...register("lastName")}
          placeholder={t("lastName")}
          className="h-12 text-lg text-center font-medium"
        />

        <Input
          {...register("username")}
          placeholder={t("username")}
          className="h-12 text-lg text-center font-medium"
        />
        {usernameError ? (
          <div className="text-red-600 w-full rtl:text-right relative bottom-2 text-[14px]">{usernameError}</div>
        ) : (
          <div className="w-full rtl:text-right text-bodyLight relative bottom-2 text-[14px]">
            {t("usernameNote")}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading || !isValid}
          className={cn(
            "w-full h-12 bg-action text-white font-bold text-lg rounded-xl",
            "hover:bg-action-hover transition-all shadow-lg"
          )}
        >
          {isLoading ? t("submitting") : t("submitInfo")}
        </Button>
      </form>
    </div>
  );
};
