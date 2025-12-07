import { usePost } from "@/hooks/api/useReactQueryHooks";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export const useRegisterUser = () => {
  const { setAuthenticated } = useAuthStore();

  const { mutateAsync, isPending, error } = usePost<
    any,
    { email: string; firstName: string; lastName: string; username: string }
  >(() => `${process.env.NEXT_PUBLIC_APP_API}/auth/register`, undefined, {
    onSuccess: () => {
      setAuthenticated(true);
      toast.success("ثبت نام با موفقیت انجام شد");
    },
    onError: () => toast.error("ثبت نام ناموفق بود"),
  });

  return { mutateAsync, isPending, error };
};
