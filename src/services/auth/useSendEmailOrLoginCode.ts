import { usePost } from "@/hooks/api/useReactQueryHooks";
import { toast } from "sonner";

export const useSendEmailOrLoginCode = () => {
  const { mutate: sendEmailCode, isPending: isSendEmailPending } = usePost<any, { email: string }>(
    () => `${process.env.NEXT_PUBLIC_APP_API}/auth/send-email`,
    undefined
  );

  const { mutate: sendLoginCode, isPending: isSendLoginPending } = usePost<any, { email: string }>(
    () => `${process.env.NEXT_PUBLIC_APP_API}/auth/send-login-code`,
    undefined
  );

  const sendCode = (email: string , setIsExistingUser : any) => {
    setIsExistingUser(false)
    sendEmailCode(
      { email },
      {
        onSuccess: () => {
          toast.success("کد ثبت نام ارسال شد");
        },
        onError: (error: any) => {
          if (error?.statusCode === 409) {
            setIsExistingUser(true)
            sendLoginCode(
              { email },
              {
                onSuccess: () => toast.success("کد ورود ارسال شد"),
                onError: () => toast.error("خطا در ارسال کد ورود"),
              }
            );
          } else {
            toast.error("خطا در ارسال کد");
          }
        },
      }
    );
  };

  return {
    sendCode,
    isPending: isSendEmailPending || isSendLoginPending,
  };
};
