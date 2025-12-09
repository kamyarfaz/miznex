import { usePost } from "@/hooks/api/useReactQueryHooks";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useRegisterUser = () => {
  const { setAuthenticated } = useAuthStore();
  const t = useTranslations("adminLogin");

  const { mutateAsync, isPending, error } = usePost<
    any,
    { email: string; firstName: string; lastName: string; username: string }
  >(() => `${process.env.NEXT_PUBLIC_APP_API}/auth/register`, undefined, {
    onSuccess: () => {
      setAuthenticated(true);
      toast.success(t("registerSuccess"));
    },
    onError: () => toast.error("registerFailed"),
  });

  return { mutateAsync, isPending, error };
};
