import { useEffect, useState, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { OrderKDS } from "@/types";
import { getServerCookie } from "@/components/helper/server-cookie";

interface UseKdsDoneOrdersOptions {
  restaurantId: string;
  enabled?: boolean;
  onOrderCompleted?: (order: OrderKDS) => void;
  onError?: (error: Error) => void;
}

interface UseKdsDoneOrdersReturn {
  doneOrders: OrderKDS[];
  isConnected: boolean;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  totalCount: number;
}

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export function useKdsDoneOrders({
  restaurantId,
  enabled = true,
  onOrderCompleted,
  onError,
}: UseKdsDoneOrdersOptions): UseKdsDoneOrdersReturn {
  const [doneOrders, setDoneOrders] = useState<OrderKDS[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const socketRef = useRef<Socket | null>(null);
  const initialFetchRef = useRef(false);

  const fetchDoneOrders = useCallback(async () => {
    if (!enabled) return;

    try {
      setIsLoading(true);
      setError(null);

      const token = process.env.NEXT_PUBLIC_STATIC_ADMIN_TOKEN;
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(
        `${API_URL}/kds/orders/done?restaurantId=${restaurantId}&page=1&limit=100`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP ${response.status}: Failed to fetch done orders`);

      const data = await response.json();
      setDoneOrders(data.data.orders || []);
      setTotalCount(data.data.totalCount || 0);
    } catch (err: any) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch orders");
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [enabled, restaurantId, onError]);

  useEffect(() => {
    if (!enabled) return;

    const token = process.env.NEXT_PUBLIC_STATIC_ADMIN_TOKEN;
    if (!token) {
      setError(new Error("Missing token"));
      setIsLoading(false);
      return;
    }

    const socket = io(`${WS_URL}/kds`, {
      auth: { token },
      transports: ["websocket"],
      reconnection: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("subscribeToDoneOrders", { restaurantId });

      if (!initialFetchRef.current) {
        initialFetchRef.current = true;
        fetchDoneOrders();
      }
    });

    socket.on("disconnect", () => setIsConnected(false));

    socket.on("error", (err: any) => {
      const e = new Error(err?.message || "WebSocket error");
      setError(e);
      onError?.(e);
    });

    socket.on("connect_error", () => {
      const e = new Error("Failed to connect to WebSocket");
      setError(e);
      setIsConnected(false);
    });

    socket.on(
      "doneOrdersUpdate",
      (data: {
        orderId: string;
        action: "add" | "remove";
        order: OrderKDS;
      }) => {
        console.log(data.action);
        if (data.action === "add" && data.order) {
          setDoneOrders((prev) => {
            if (prev.some((o) => o.id === data.order.id)) return prev;
            return [data.order, ...prev];
          });

          setTotalCount((prev) => prev + 1);
          onOrderCompleted?.(data.order);
        }
        if (data.action === "remove") {
          console.log(data.action);
          console.log(data.orderId);
          setDoneOrders((prev) => prev.filter((o) => o.id !== data.orderId));
          setTotalCount((prev) => prev - 1);
        }
      }
    );

    return () => {
      socket.emit("unsubscribeFromDoneOrders", { restaurantId });
      socket.disconnect();
      socketRef.current = null;
    };
  }, [enabled, restaurantId, onOrderCompleted, onError, fetchDoneOrders]);

  const refetch = useCallback(async () => {
    await fetchDoneOrders();
  }, [fetchDoneOrders]);

  return {
    doneOrders,
    isConnected,
    isLoading,
    error,
    refetch,
    totalCount,
  };
}

export type { UseKdsDoneOrdersOptions, UseKdsDoneOrdersReturn };
