import { usePost } from "@/hooks/api/useReactQueryHooks";
import { toast } from "sonner";

export const useVerifyEmailOrLoginCode = () => {
  const { mutate: verifyRegisterCode, isPending: isVerifyRegisterPending } = usePost<any, { email: string; code: string }>(
    () => `${process.env.NEXT_PUBLIC_APP_API}/auth/verify-code`
  );

  const { mutate: verifyLoginCode, isPending: isVerifyLoginPending } = usePost<any, { email: string; code: string }>(
    () => `${process.env.NEXT_PUBLIC_APP_API}/auth/verify-login-code`
  );

  const verifyCode = async (email: string, code: string, isExistingUser: boolean, onSuccess?: (data: any) => void) => {
    if (isExistingUser) {
      verifyLoginCode({ email, code }, { onSuccess: onSuccess, onError: () => toast.error("خطا در وریفای کد ورود") });
    } else {
      verifyRegisterCode({ email, code }, { onSuccess: onSuccess, onError: () => toast.error("خطا در وریفای کد ثبت نام") });
    }
  };

  return {
    verifyCode,
    isPending: isVerifyRegisterPending || isVerifyLoginPending,
  };
};

