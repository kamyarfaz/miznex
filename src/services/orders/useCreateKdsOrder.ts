import { usePost } from "@/hooks/api/useReactQueryHooks";
import { toast } from "sonner";

export const useCreateOrder = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutateAsync, isPending } = usePost(
    () => `/v1/orders`,
    (orderPayload) => orderPayload,
    {
      onSuccess: () => {
        onSuccess();
      },
      onError: () => {
        toast.error("Error creating order");
      },
    }
  );

  return {
    mutateAsync,
    isPending,
  };
};
