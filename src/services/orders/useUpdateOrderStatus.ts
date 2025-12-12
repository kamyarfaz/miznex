import type { OrderStatusKDS } from "@/types";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface UpdateOrderStatusResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

interface UseUpdateOrderStatusOptions {
  /** Optional: show toast notifications */
  showToast?: boolean;

  /** Optional success callback */
  onSuccess?: (data: any) => void;

  /** Optional error callback */
  onError?: (error: any) => void;
}

export function useUpdateOrderStatus(
  options: UseUpdateOrderStatusOptions = {}
) {
  const { onSuccess, onError, showToast = true } = options;

  const [loading, setLoading] = useState(false);

  const updateOrderStatus = useCallback(
    async (orderId: string, status: OrderStatusKDS): Promise<UpdateOrderStatusResponse | null> => {
      try {
        setLoading(true);

        const token = process.env.NEXT_PUBLIC_STATIC_ADMIN_TOKEN;
        if (!token) {
          if (showToast) toast.error("Authentication required");
          return null;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/kds/orders/${orderId}/status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
          }
        );

        const json: UpdateOrderStatusResponse = await response.json();

        if (!response.ok || json.success === false) {
          if (showToast) toast.error(json.message || "Failed to update order");
          onError?.(json);
          return json;
        }


        return json;
      } catch (err) {
        if (showToast) toast.error("Failed to update order status");
        onError?.(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [onSuccess, onError, showToast]
  );

  return { updateOrderStatus, loading };
}
