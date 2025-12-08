import { useCallback } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import type { OrderStatusKDS } from "@/types";
import { getServerCookie } from "@/components/helper/server-cookie";

interface UseUpdateItemStatusOptions {
  /** Fetch token logic */
  getToken?: () => string | null;

  /** Disable toast notifications */
  showToast?: boolean;

  /** Callback on success */
  onSuccess?: (data: any) => void;

  /** Callback on error */
  onError?: (err: any) => void;
}

export function useUpdateItemStatus(options: UseUpdateItemStatusOptions = {}) {
  const { getToken, showToast = true, onSuccess, onError } = options;

  const mutation = useMutation({
    mutationFn: async (vars: {
      orderId: string;
      itemId: string;
      status: OrderStatusKDS;
    }) => {
      const { orderId, itemId, status } = vars;

      const getToken = async () => {
        const token = await getServerCookie("access_token");
        console.log('token', token);
        return token;
      };

      const token = await getToken();

      if (!token) throw new Error("Authentication required");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/kds/orders/${orderId}/items/${itemId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status, itemId }),
        }
      );

      const json = await res.json();

      if (!res.ok || json.success === false) {
        throw new Error(json.message || "Failed to update item status");
      }

      return json;
    },
    onSuccess: (data) => {
      showToast && toast.success("Item status updated");
      onSuccess?.(data);
    },
    onError: (err: any) => {
      showToast && toast.error(err.message || "Failed to update item status");
      onError?.(err);
    },
  });

  const updateItemStatus = useCallback(
    async (orderId: string, itemId: string, status: OrderStatusKDS) => {
      return mutation.mutateAsync({ orderId, itemId, status });
    },
    [mutation]
  );

  return {
    updateItemStatus,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
}
