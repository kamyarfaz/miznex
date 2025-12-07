import { usePost } from "@/hooks/api/useReactQueryHooks";
import { toast } from "sonner";

export const useCreateOrder = () => {
  const { mutate, isPending, variables } = usePost(
    () => `/v1/orders`,
    (orderPayload) => (orderPayload),
    {
      onSuccess: () => {
        toast.success("Order created successfully");
      },
      onError: () => {
        toast.error("Error creating order");
      },
    }
  );

  return {
    mutate,
    isPending,
    variables,
  };
};
