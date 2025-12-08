import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import type { OrderKDS } from "@/types";

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

  // Use refs for callbacks to avoid re-creating socket connection
  const callbacksRef = useRef({
    onOrderCreated,
    onOrderUpdated,
    onOrderRemoved,
  });

  // Update refs when callbacks change
  useEffect(() => {
    callbacksRef.current = {
      onOrderCreated,
      onOrderUpdated,
      onOrderRemoved,
    };
  }, [onOrderCreated, onOrderUpdated, onOrderRemoved]);

  // Fetch initial orders via REST API
  const fetchInitialOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NTBiNmU1NC0zYzY5LTRiYmItYThjNS0zYzU5YTFlNGNiNTIiLCJmaXJzdE5hbWUiOiJuYXZpZHJlemEiLCJsYXN0TmFtZSI6ImFiYmFzemFkZWgiLCJlbWFpbCI6Im5hdmlkcmV6YWFiYmFzemFkZWg4OUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjUxMzU4OTgsImV4cCI6MTc2NTc0MDY5OH0.SRalCQ1X2d1Dxs9TrNEa7omKoUsEJ8Z4pklqqDxVgI0"

      if (!token) {
        console.error("No token found in localStorage");
        toast.error("Please login first");
        setIsLoading(false);
        return;
      }

      console.log(
        "📡 Fetching initial orders from:",
        `${API_BASE_URL}/kds/active-orders/${restaurantId}`
      );

      const response = await fetch(
        `${API_BASE_URL}/kds/active-orders/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("✅ Initial orders fetched:", responseData);
      console.log("   Response structure:", Object.keys(responseData));

      // Handle both response formats:
      // Direct: { activeOrders: [...] }
      // Wrapped: { success: true, data: { activeOrders: [...] } }
      const data = responseData.data || responseData;
      const activeOrders = data.activeOrders || [];

      console.log("   Active orders count:", activeOrders.length);

      if (activeOrders.length > 0) {
        console.log("   First order:", activeOrders[0]);
      }

      setOrders(activeOrders);
    } catch (error) {
      console.error("❌ Error fetching initial orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }, [restaurantId]);

  // WebSocket connection effect - ONLY depend on restaurantId and section
  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NTBiNmU1NC0zYzY5LTRiYmItYThjNS0zYzU5YTFlNGNiNTIiLCJmaXJzdE5hbWUiOiJuYXZpZHJlemEiLCJsYXN0TmFtZSI6ImFiYmFzemFkZWgiLCJlbWFpbCI6Im5hdmlkcmV6YWFiYmFzemFkZWg4OUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjUxMzU4OTgsImV4cCI6MTc2NTc0MDY5OH0.SRalCQ1X2d1Dxs9TrNEa7omKoUsEJ8Z4pklqqDxVgI0"

    if (!token) {
      console.error("❌ No auth token found");
      toast.error("Authentication required - Please login");
      setIsLoading(false);
      return;
    }

    console.log("🔌 Initializing WebSocket connection...");
    console.log("   URL:", `${WS_BASE_URL}/kds`);
    console.log("   Restaurant ID:", restaurantId);

    // Connect to WebSocket
    const socket = io(`${WS_BASE_URL}/kds`, {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    // Connection events
    socket.on("connect", () => {
      console.log("✅ Connected to KDS WebSocket");
      console.log("   Socket ID:", socket.id);
      setIsConnected(true);
      toast.success("Connected to Kitchen Display");
    });

    socket.on("connected", (data) => {
      console.log("✅ Received 'connected' event:", data);

      // Join restaurant-specific room
      console.log("📍 Joining restaurant room:", restaurantId);
      socket.emit("joinSection", {
        restaurantId,
        section,
      });

      // Fetch initial orders after joining
      fetchInitialOrders();
    });

    socket.on("joined", (data) => {
      console.log("✅ Joined room:", data);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected from KDS WebSocket. Reason:", reason);
      setIsConnected(false);

      // Only show error toast if it's not a client-initiated disconnect
      if (reason !== "io client disconnect") {
        toast.error("Disconnected from Kitchen Display");
      }
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Connection Error:", error);
      toast.error(`Connection failed: ${error.message}`);
    });

    socket.on("error", (error) => {
      console.error("❌ Socket error:", error);
      toast.error(error.message || "WebSocket error");
    });

    // Listen for order updates
    socket.on("ordersUpdate", (data: OrdersUpdatePayload) => {
      console.log("📦 Orders update received:", data);

      if (data.action === "add") {
        setOrders((prev) => {
          const newOrders = data.orders.filter(
            (newOrder) => !prev.some((order) => order.id === newOrder.id)
          );
          if (newOrders.length > 0) {
            console.log("➕ Adding new orders:", newOrders.length);
            newOrders.forEach((order) => {
              callbacksRef.current.onOrderCreated?.(order);
            });
            return [...newOrders, ...prev];
          }
          return prev;
        });
      } else if (data.action === "update") {
        console.log("🔄 Updating orders");
        setOrders((prev) =>
          prev.map((order) => {
            const updatedOrder = data.orders.find((o) => o.id === order.id);
            if (updatedOrder) {
              callbacksRef.current.onOrderUpdated?.(updatedOrder);
              return updatedOrder;
            }
            return order;
          })
        );
      } else if (data.action === "remove") {
        const removedIds = data.orders.map((o) => o.id);
        console.log("➖ Removing orders:", removedIds);
        setOrders((prev) => prev.filter((o) => !removedIds.includes(o.id)));
        removedIds.forEach((id) => {
          callbacksRef.current.onOrderRemoved?.(id);
        });
      }
    });

    // Listen for status updates
    socket.on("statusUpdate", (data: StatusUpdatePayload) => {
      console.log("📊 Status update received:", data);

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
      console.log("🔔 Notification received:", notification);

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

    // Cleanup function
    return () => {
      console.log("🧹 Cleaning up WebSocket connection...");
      clearInterval(pingInterval);

      if (socket.connected) {
        socket.emit("leaveSection", {
          restaurantId,
          section,
        });
        socket.disconnect();
      }
    };
  }, [restaurantId, section, fetchInitialOrders]); // Only these dependencies

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
