import { usePost } from "@/hooks/api/useReactQueryHooks";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useSendEmailOrLoginCode = () => {
  
  const t = useTranslations("adminLogin");

  const { mutate: sendEmailCode, isPending: isSendEmailPending } = usePost<any, { email: string }>(
    () => `${process.env.NEXT_PUBLIC_APP_API}/auth/send-email`,
    undefined
  );

  const { mutate: sendLoginCode, isPending: isSendLoginPending } = usePost<any, { email: string }>(
    () => `${process.env.NEXT_PUBLIC_APP_API}/auth/send-login-code`,
    undefined
  );

  const sendCode = (email: string, setIsExistingUser: any) => {
    setIsExistingUser(false);
    sendEmailCode(
      { email },
      {
        onSuccess: () => {
          toast.success(t("signupCodeSent"));
        },
        onError: (error: any) => {
          if (error?.statusCode === 409) {
            setIsExistingUser(true);
            sendLoginCode(
              { email },
              {
                onSuccess: () => toast.success(t("loginCodeSent")),
                onError: () => toast.error(t("loginCodeError")),
              }
            );
          } else {
            toast.error(t("genericError"));
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