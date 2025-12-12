import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import type { OrderKDS } from "@/types";
import { useNotificationStore } from "@/store/notificationStore";

interface UseKdsWebSocketOptions {
  restaurantId: string;
  section?: string;
  onOrderCreated?: (order: OrderKDS) => void;
  onOrderUpdated?: (order: OrderKDS) => void;
  onOrderRemoved?: (orderId: string) => void;
}

interface OrdersUpdatePayload {
  orders: OrderKDS[];
  action: "add" | "update" | "remove";
  timestamp: number;
  statusCode?: number;
  success?: boolean;
  message?: string;
}

interface StatusUpdatePayload {
  orderId: string;
  status: string;
  timestamp: number;
}

interface NotificationPayload {
  type:
    | "order-removed"
    | "status-updated"
    | "order-completed"
    | "order-updated"
    | "new-order";
  title: string;
  message: string;
  orderId: string;
  timestamp: number;
  statusCode?: number;
  success?: boolean;
  messageText?: string;
}

// Backend base URL
const API_BASE_URL = "http://localhost:3000/api/v1";
const WS_BASE_URL = "http://localhost:3000";

export function useKdsWebSocket(options: UseKdsWebSocketOptions) {
  const {
    restaurantId,
    section,
    onOrderCreated,
    onOrderUpdated,
    onOrderRemoved,
  } = options;

  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [orders, setOrders] = useState<OrderKDS[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  // Keep stable refs for callbacks
  const callbacksRef = useRef({
    onOrderCreated,
    onOrderUpdated,
    onOrderRemoved,
  });

  useEffect(() => {
    callbacksRef.current = {
      onOrderCreated,
      onOrderUpdated,
      onOrderRemoved,
    };
  }, [onOrderCreated, onOrderUpdated, onOrderRemoved]);

  // Fetch initial orders via REST API and handle statusCode/success/message
  const fetchInitialOrders = useCallback(async () => {
    try {
      setIsLoading(true);

      // TODO: replace with your auth token provider
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NTBiNmU1NC0zYzY5LTRiYmItYThjNS0zYzU5YTFlNGNiNTIiLCJmaXJzdE5hbWUiOiJuYXZpZHJlemEiLCJsYXN0TmFtZSI6ImFiYmFzemFkZWgiLCJlbWFpbCI6Im5hdmlkcmV6YWFiYmFzemFkZWg4OUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjUxMzU4OTgsImV4cCI6MTc2NTc0MDY5OH0.SRalCQ1X2d1Dxs9TrNEa7omKoUsEJ8Z4pklqqDxVgI0";

      if (!token) {
        toast.error("Please login first");
        setIsLoading(false);
        setStatusCode(401);
        return;
      }

      const url = `${API_BASE_URL}/kds/active-orders/${restaurantId}`;
      console.log("📡 Fetching initial orders:", url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // set statusCode from HTTP response when available
      setStatusCode(response.status);

      if (!response.ok) {
        // try read body for message
        let body: any = {};
        try {
          body = await response.json();
        } catch {
          /* ignore */
        }
        const serverMessage =
          body?.message || response.statusText || "Failed to load orders";
        toast.error(serverMessage);
        setOrders([]);
        return;
      }

      const responseData = await response.json();
      // server may send: { success, statusCode, message, data: { activeOrders: [...] } }
      const statusFromBody = responseData?.statusCode ?? response.status;
      setStatusCode(statusFromBody);
      setTotalCount(responseData.data.totalCount);

      const success =
        typeof responseData.success === "boolean" ? responseData.success : true;
      const serverMessage = responseData.message ?? null;
      if (!success || (statusFromBody && statusFromBody !== 200)) {
        toast.error(
          serverMessage ?? `Server returned status ${statusFromBody}`
        );
        setOrders([]);
        return;
      }

      // normalize data shape
      const data = responseData.data
      const activeOrders = data?.orders ?? [];

      setOrders(activeOrders);
    } catch (error) {
      console.error("❌ Error fetching initial orders:", error);
      toast.error("Failed to load orders");
      setOrders([]);
      setStatusCode(500);
    } finally {
      setIsLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    // token provider
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NTBiNmU1NC0zYzY5LTRiYmItYThjNS0zYzU5YTFlNGNiNTIiLCJmaXJzdE5hbWUiOiJuYXZpZHJlemEiLCJsYXN0TmFtZSI6ImFiYmFzemFkZWgiLCJlbWFpbCI6Im5hdmlkcmV6YWFiYmFzemFkZWg4OUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjUxMzU4OTgsImV4cCI6MTc2NTc0MDY5OH0.SRalCQ1X2d1Dxs9TrNEa7omKoUsEJ8Z4pklqqDxVgI0";

    if (!token) {
      toast.error("Authentication required - please login");
      setIsLoading(false);
      setStatusCode(401);
      return;
    }

    const socket = io(`${WS_BASE_URL}/kds`, {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("connected", (payload: any) => {
      // If server returned status info, surface it
      if (typeof payload?.statusCode === "number") {
        setStatusCode(payload.statusCode);
      }

      if (payload?.success === false) {
        const msg = payload?.message ?? "Server reports an issue";
        toast.error(msg);
      }

      // Join restaurant room
      socket.emit("joinSection", { restaurantId, section });

      // fetch initial orders once we've joined the channel
      fetchInitialOrders();
    });
    socket.on("disconnect", (reason) => {
      setIsConnected(false);
      if (reason !== "io client disconnect") {
        toast.error("Disconnected from Kitchen Display");
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
      toast.error(`Connection failed: ${error?.message ?? "Unknown error"}`);
      // expose status code 503 for connection error
      setStatusCode(503);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
      toast.error(error?.message ?? "WebSocket error");
    });

    // ordersUpdate: may include statusCode, success, message
    socket.on("ordersUpdate", (data: OrdersUpdatePayload) => {
      console.log("Orders update received:", data);
      if (typeof data?.statusCode === "number") {
        setStatusCode(data.statusCode);
      }
      if (data?.success === false) {
        toast.error(data?.message ?? "Server error on orders update");
        return;
      }

      if (data.action === "add") {
        setOrders((prev) => {
          const newOrders = data.orders.filter(
            (n) => !prev.some((p) => p.id === n.id)
          );
          if (newOrders.length > 0) {
            newOrders.forEach((order) =>
              callbacksRef.current.onOrderCreated?.(order)
            );
            return [...newOrders, ...prev];
          }
          return prev;
        });
        setTotalCount((prev) => prev && prev + 1);
      } else if (data.action === "update") {
        setOrders((prev) =>
          prev.map((order) => {
            const updated = data.orders.find((o) => o.id === order.id);
            if (updated) {
              callbacksRef.current.onOrderUpdated?.(updated);
              return updated;
            }
            return order;
          })
        );
      } else if (data.action === "remove") {
        const removedIds = data.orders.map((o) => o.id);
        setOrders((prev) => prev.filter((o) => !removedIds.includes(o.id)));
        setTotalCount((prev) => prev && prev - 1);
        removedIds.forEach((id) => callbacksRef.current.onOrderRemoved?.(id));
      }
    });

    socket.on("statusUpdate", (data: StatusUpdatePayload) => {
      console.log(data);
      setOrders((prev) =>
        prev.map((order) =>
          order.orderNumber.toString() === data.orderId
            ? { ...order, status: data.status as any }
            : order
        )
      );
    });

    socket.on("notification", (notification: NotificationPayload) => {
      if (!notification) return;

      useNotificationStore.getState().addNotification({
        id: notification.orderId + "-" + notification.timestamp,
        type: notification.type,
        title: notification.title,
        message: notification.message,
      });
    });

    // keep-alive ping
    const pingInterval = setInterval(() => {
      if (socket.connected) socket.emit("ping");
    }, 30_000);

    return () => {
      clearInterval(pingInterval);
      if (socket.connected) {
        socket.emit("leaveSection", { restaurantId, section });
        socket.disconnect();
      } else {
        socket.close();
      }
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [restaurantId, section, fetchInitialOrders]);

  const subscribeToOrder = useCallback((orderId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("subscribeToOrder", { orderId });
    }
  }, []);

  return {
    orders,
    isConnected,
    isLoading,
    subscribeToOrder,
    socket: socketRef.current,
    statusCode,
    totalCount
  };
}
