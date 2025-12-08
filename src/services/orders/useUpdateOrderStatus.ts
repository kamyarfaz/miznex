import { getServerCookie } from "@/components/helper/server-cookie";
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
  const { showToast = true, onSuccess, onError } = options;

  const [loading, setLoading] = useState(false);

  const updateOrderStatus = useCallback(
    async (
      orderId: string,
      status: OrderStatusKDS
    ): Promise<UpdateOrderStatusResponse | null> => {
      try {
        setLoading(true);

        const getToken = async () => {
          const token = await getServerCookie("access_token");
          console.log("token", token);
          return token;
        };

        const token = await getToken();
        console.log("tokenOrder", token);
        if (!token) {
          showToast && toast.error("Authentication required");
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

        // Handle any statusCode
        if (!response.ok || json.success === false) {
          showToast && toast.error(json.message || "Failed to update order");
          onError?.(json);
          return json;
        }

        showToast && toast.success(`Order updated to ${status}`);
        onSuccess?.(json.data);

        return json;
      } catch (err) {
        showToast && toast.error("Failed to update order status");
        onError?.(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [showToast, onSuccess, onError]
  );

  return {
    updateOrderStatus,
    loading,
  };
}
