import { usePost } from "@/hooks/api/useReactQueryHooks";
import { toast } from "sonner";

interface UseCreateOrderOptions {
  onSuccess: (data: any) => void;
}

export const useCreateOrder = ({ onSuccess }: UseCreateOrderOptions) => {
  const { mutate, isPending } = usePost(
    () => `/orders`,
    (orderPayload) => orderPayload,
    {
      onSuccess: (data) => {
        onSuccess(data);
      },
      onError: (error: any) => {
        console.error("Error creating order:", error);
        toast.error("Error creating order");
      },
    }
  );

  return {
    mutate,
    isPending,
  };
};
