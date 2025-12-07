import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import type { OrderItemKDS, OrderKDS } from "@/types";

interface UseKdsWebSocketOptions {
  restaurantId: string;
  section?: string;
  onOrderCreated?: (order: OrderItemKDS) => void;
  onOrderUpdated?: (order: OrderItemKDS) => void;
  onOrderRemoved?: (orderId: string) => void;
}

interface OrdersUpdatePayload {
  orders: OrderItemKDS[];
  action: "add" | "update" | "remove";
  timestamp: number;
}

interface StatusUpdatePayload {
  orderId: string;
  status: string;
  timestamp: number;
}

interface NotificationPayload {
  type: "new-order" | "order-ready";
  title: string;
  message: string;
  orderId: string;
  timestamp: number;
}

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

  // Fetch initial orders via REST API
  const fetchInitialOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NTBiNmU1NC0zYzY5LTRiYmItYThjNS0zYzU5YTFlNGNiNTIiLCJmaXJzdE5hbWUiOiJuYXZpZHJlemEiLCJsYXN0TmFtZSI6ImFiYmFzemFkZWgiLCJlbWFpbCI6Im5hdmlkcmV6YWFiYmFzemFkZWg4OUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjUxMzU4OTgsImV4cCI6MTc2NTc0MDY5OH0.SRalCQ1X2d1Dxs9TrNEa7omKoUsEJ8Z4pklqqDxVgI0"

      const response = await fetch(
        `http://localhost:3000/api/v1/kds/active-orders/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.activeOrders || []);
    } catch (error) {
      console.error("Error fetching initial orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    // Get auth token from your auth system
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NTBiNmU1NC0zYzY5LTRiYmItYThjNS0zYzU5YTFlNGNiNTIiLCJmaXJzdE5hbWUiOiJuYXZpZHJlemEiLCJsYXN0TmFtZSI6ImFiYmFzemFkZWgiLCJlbWFpbCI6Im5hdmlkcmV6YWFiYmFzemFkZWg4OUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjUxMzU4OTgsImV4cCI6MTc2NTc0MDY5OH0.SRalCQ1X2d1Dxs9TrNEa7omKoUsEJ8Z4pklqqDxVgI0";

    if (!token) {
      console.error("No auth token found");
      toast.error("Authentication required");
      return;
    }

    // Connect to WebSocket
    const socket = io("http://localhost:3000/api/v1/kds", {
      auth: {
        token,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    // Connection events
    socket.on("connect", () => {
      console.log("✅ Connected to KDS WebSocket");
      setIsConnected(true);
      toast.success("Connected to Kitchen Display");
    });

    socket.on("connected", (data) => {
      console.log("Connected data:", data);

      // Join restaurant-specific room
      socket.emit("joinSection", {
        restaurantId,
        section,
      });

      // Fetch initial orders after joining
      fetchInitialOrders();
    });

    socket.on("joined", (data) => {
      console.log("Joined room:", data);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from KDS WebSocket");
      setIsConnected(false);
      toast.error("Disconnected from Kitchen Display");
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
      toast.error(error.message || "WebSocket error");
    });

    // Listen for order updates
    socket.on("ordersUpdate", (data: OrdersUpdatePayload) => {
      console.log("Orders update received:", data);

      if (data.action === "add") {
        setOrders((prev) => {
          const newOrders = data.orders.filter(
            (newOrder) => !prev.some((order) => order.id === newOrder.id)
          );
          if (newOrders.length > 0) {
            newOrders.forEach((order) => {
              onOrderCreated?.(order);
            });
            return [...newOrders, ...prev];
          }
          return prev;
        });
      } else if (data.action === "update") {
        setOrders((prev) =>
          prev.map((order) => {
            const updatedOrder = data.orders.find((o) => o.id === order.id);
            if (updatedOrder) {
              onOrderUpdated?.(updatedOrder);
              return updatedOrder;
            }
            return order;
          })
        );
      } else if (data.action === "remove") {
        const removedIds = data.orders.map((o) => o.id);
        setOrders((prev) => prev.filter((o) => !removedIds.includes(o.id)));
        removedIds.forEach((id) => {
          onOrderRemoved?.(id);
        });
      }
    });

    // Listen for status updates
    socket.on("statusUpdate", (data: StatusUpdatePayload) => {
      console.log("Status update received:", data);

      setOrders((prev) =>
        prev.map((order) =>
          order.id === data.orderId
            ? { ...order, status: data.status as any }
            : order
        )
      );
    });

    // Listen for notifications
    socket.on("notification", (notification: NotificationPayload) => {
      console.log("Notification received:", notification);

      if (notification.type === "new-order") {
        toast.info(notification.message, {
          description: notification.title,
          duration: 5000,
        });
      } else if (notification.type === "order-ready") {
        toast.success(notification.message, {
          description: notification.title,
          duration: 5000,
        });
      }
    });

    // Ping for keep-alive
    const pingInterval = setInterval(() => {
      if (socket.connected) {
        socket.emit("ping");
      }
    }, 30000);

    // Cleanup
    return () => {
      clearInterval(pingInterval);

      if (socket.connected) {
        socket.emit("leaveSection", {
          restaurantId,
          section,
        });
      }

      socket.disconnect();
    };
  }, [
    restaurantId,
    section,
    fetchInitialOrders,
    onOrderCreated,
    onOrderUpdated,
    onOrderRemoved,
  ]);

  // Subscribe to a specific order
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
  };
}
