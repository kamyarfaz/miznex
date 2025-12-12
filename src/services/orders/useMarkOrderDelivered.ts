import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface MarkDeliveredResponse {
  raw: boolean;
  message: string;
  data: any;
}

interface MarkDeliveredError {
  message: string;
  statusCode?: number;
}

interface UseMarkOrderDeliveredOptions {
  onSuccess?: (data: MarkDeliveredResponse, orderId: string) => void;
  onError?: (error: MarkDeliveredError, orderId: string) => void;
  showToast?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to get auth token
const getAuthToken = () =>
  process.env.NEXT_PUBLIC_STATIC_ADMIN_TOKEN || null;

/**
 * Mark order as delivered
 */
async function markOrderDelivered(orderId: string): Promise<MarkDeliveredResponse> {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication required. Please login.");

  const response = await fetch(`${API_BASE_URL}/kds/orders/${orderId}/delivered`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to mark order as delivered" }));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * Hook to mark a single order as delivered
 */
export function useMarkOrderDelivered(options: UseMarkOrderDeliveredOptions = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, showToast = true } = options;

  const mutation = useMutation<MarkDeliveredResponse, Error, string>({
    mutationFn: markOrderDelivered,
    onSuccess: (data, orderId) => {
      queryClient.invalidateQueries({ queryKey: ["kds-orders"] });
      queryClient.invalidateQueries({ queryKey: ["kds-done-orders"] });
      queryClient.invalidateQueries({ queryKey: ["kds-active-orders"] });


      onSuccess?.(data, orderId);
    },
    onError: (error, orderId) => {
      if (showToast) {
        toast.error("Failed to mark order as delivered", { description: error.message });
      }
      onError?.({ message: error.message }, orderId);
    },
  });

  return {
    markAsDelivered: mutation.mutate,
    markAsDeliveredAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}

/**
 * Hook to mark multiple orders as delivered
 */
interface BatchMarkDeliveredOptions {
  onSuccess?: (results: MarkDeliveredResponse[], orderIds: string[]) => void;
  onError?: (error: Error, orderIds: string[]) => void;
  showToast?: boolean;
}

export function useBatchMarkDelivered(options: BatchMarkDeliveredOptions = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, showToast = true } = options;

  const mutation = useMutation<MarkDeliveredResponse[], Error, string[]>({
    mutationFn: async (orderIds) => {
      const results = await Promise.allSettled(orderIds.map(markOrderDelivered));
      const successful = results.filter(r => r.status === "fulfilled") as PromiseFulfilledResult<MarkDeliveredResponse>[];
      const failed = results.filter(r => r.status === "rejected");

      if (failed.length > 0) console.warn(`${failed.length} orders failed to mark as delivered`);

      return successful.map(r => r.value);
    },
    onSuccess: (data, orderIds) => {
      queryClient.invalidateQueries({ queryKey: ["kds-orders"] });
      queryClient.invalidateQueries({ queryKey: ["kds-done-orders"] });
      queryClient.invalidateQueries({ queryKey: ["kds-active-orders"] });

      onSuccess?.(data, orderIds);
    },
    onError: (error, orderIds) => {
      if (showToast) toast.error("Failed to mark orders as delivered", { description: error.message });
      onError?.(error, orderIds);
    },
  });

  return {
    markMultipleAsDelivered: mutation.mutate,
    markMultipleAsDeliveredAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}

export type { MarkDeliveredResponse, MarkDeliveredError, UseMarkOrderDeliveredOptions, BatchMarkDeliveredOptions };
