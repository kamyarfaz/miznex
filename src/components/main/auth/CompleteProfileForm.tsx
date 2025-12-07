"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { completeProfileSchema } from "@/schemas";
import { cn } from "@/utils/utils";
import { CompleteProfileFormProps } from "@/types/main";

export const CompleteProfileForm: React.FC<CompleteProfileFormProps> = ({
  onSubmit,
  isLoading,
  usernameError
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

  const handleFormSubmit = (data: any) => {
    onSubmit(data.firstName, data.lastName, data.username);
  };

  return (
    <div className="space-y-3">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
          تکمیل پروفایل
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-base">
          لطفاً مشخصات خود را وارد کنید
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 px-6"
      >
        <Input
          {...register("firstName")}
          placeholder="نام"
          className="h-12 text-lg text-center font-medium"
        />

        <Input
          {...register("lastName")}
          placeholder="نام خانوادگی"
          className="h-12 text-lg text-center font-medium"
        />

        <Input
          {...register("username")}
          placeholder="نام کاربری"
          className="h-12 text-lg text-center font-medium"
        />
        {usernameError && (
          <div className="text-red-600 text-sm mt-1">{usernameError}</div>
        )}

        <div className="w-full rtl:text-right text-bodyLight relative bottom-3">
          نام کاربری در لینک صفحه شما ثبت میشود
        </div>

        <Button
          type="submit"
          disabled={isLoading || !isValid}
          className={cn(
            "w-full h-12 bg-action text-white font-bold text-lg rounded-xl",
            "hover:scale-105 transition-all shadow-lg"
          )}
        >
          {isLoading ? "در حال ثبت..." : "ثبت اطلاعات"}
        </Button>
      </form>
    </div>
  );
};
