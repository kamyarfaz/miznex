import { usePost } from "@/hooks/api/useReactQueryHooks";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useVerifyEmailOrLoginCode = () => {
  const t = useTranslations("adminLogin");

  const { mutate: verifyRegisterCode, isPending: isVerifyRegisterPending, data } = usePost<any, { email: string; code: string }>(
    () => `${process.env.NEXT_PUBLIC_APP_API}/auth/verify-code`
  );

  const { mutate: verifyLoginCode, isPending: isVerifyLoginPending } = usePost<any, { email: string; code: string }>(
    () => `${process.env.NEXT_PUBLIC_APP_API}/auth/verify-login-code`
  );

  const verifyCode = async (email: string, code: string, isExistingUser: boolean, onSuccess?: (data: any) => void) => {
    if (isExistingUser) {
      verifyLoginCode({ email, code }, { onSuccess: onSuccess, onError: () => toast.error(t("verifyLoginCodeError")) });
    } else {
      verifyRegisterCode({ email, code }, { onSuccess: onSuccess, onError: () => toast.error(t("verifyRegisterCodeError")) });
    }
  };

  return {
    verifyCode,
    isPending: isVerifyRegisterPending || isVerifyLoginPending,
  };
};

