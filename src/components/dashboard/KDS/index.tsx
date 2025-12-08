"use client";

import { Badge } from "@/components/ui/badge";
import type { OrderItemKDS, OrderKDS, OrderStatusKDS } from "@/types";
import {
  BarChart3,
  Bell,
  ChefHat,
  Palette,
  UtensilsCrossed,
  Wifi,
  WifiOff,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useKdsWebSocket } from "@/services/orders/useKDSWebsocketHook";

const Tabs = dynamic(
  () => import("../../ui/tabs").then((module) => module.Tabs),
  { ssr: false }
);
const TabsContent = dynamic(
  () => import("../../ui/tabs").then((module) => module.TabsContent),
  { ssr: false }
);
const TabsList = dynamic(
  () => import("../../ui/tabs").then((module) => module.TabsList),
  { ssr: false }
);
const TabsTrigger = dynamic(
  () => import("../../ui/tabs").then((module) => module.TabsTrigger),
  { ssr: false }
);

import { useCreateOrder } from "@/services/orders/useCreateKdsOrder";
import { AdminDashboard } from "./AdminDashboard";
import { DesignSystemDocs } from "./DesignSystemDocs";
import { NotificationCenter } from "./NotificationCenter";
import { OrderCreationPOS } from "./OrderCreationPOS";
import { KitchenDisplay } from "./KitchenDisplay";

interface Notification {
  id: string;
  type: "new-order" | "order-ready";
  message: string;
}

// Backend API URL
const API_BASE_URL = "http://localhost:3000/api/v1";

// TODO: Get this from user context/settings
const RESTAURANT_ID = "2e6994ad-904a-4e60-8def-063e1e287ed2";

export default function KDSPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState("pos");
  const [notifInfo, setNotifInfo] = useState({
    tableNumber: "",
    itemsCount: 0,
  });

  // WebSocket connection for real-time updates
  const { orders, isConnected, isLoading } = useKdsWebSocket({
    restaurantId: RESTAURANT_ID,
    onOrderCreated: (order) => {
      console.log("New order received via WebSocket:", order);
      const notification: Notification = {
        id: order.id,
        type: "new-order",
        message: `Table ${order.tableNumber} - ${order.items.length} items`,
      };
      setNotifications((prev) => [...prev, notification]);
    },
    onOrderUpdated: (order) => {
      console.log("Order updated via WebSocket:", order);
      if (order.status === "ready") {
        const notification: Notification = {
          id: `${order.id}-ready`,
          type: "order-ready",
          message: `Order #${order.orderNumber} is ready!`,
        };
        setNotifications((prev) => [...prev, notification]);
      }
    },
  });

  const { mutateAsync } = useCreateOrder({
    onSuccess: () => {
      const notification: Notification = {
        id: crypto.randomUUID(),
        type: "new-order",
        message: `Table ${notifInfo.tableNumber} - ${notifInfo.itemsCount} items`,
      };
      setNotifications((prev) => [...prev, notification]);
      setTimeout(() => {
        setActiveTab("kitchen");
      }, 500);
    },
  });

  // Create a new order from POS
  const handleCreateOrder = (
    items: OrderItemKDS[],
    tableNumber: string,
    note: string
  ) => {
    if (items.length === 0) {
      toast.error("Cannot create an order with zero items.");
      return;
    }
    if (!tableNumber) {
      toast.error("Table number is required to create an order.");
      return;
    }

    const newOrder: OrderKDS = {
      items,
      tableNumber: Number(tableNumber),
      note,
    };

    setNotifInfo({ tableNumber, itemsCount: items.length });
    console.log("Creating order:", newOrder);

    // Send order to backend
    mutateAsync(newOrder);
  };

  // Update order status via API
  const handleUpdateOrderStatus = async (
    orderId: string,
    status: OrderStatusKDS
  ) => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NTBiNmU1NC0zYzY5LTRiYmItYThjNS0zYzU5YTFlNGNiNTIiLCJmaXJzdE5hbWUiOiJuYXZpZHJlemEiLCJsYXN0TmFtZSI6ImFiYmFzemFkZWgiLCJlbWFpbCI6Im5hdmlkcmV6YWFiYmFzemFkZWg4OUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjUxMzU4OTgsImV4cCI6MTc2NTc0MDY5OH0.SRalCQ1X2d1Dxs9TrNEa7omKoUsEJ8Z4pklqqDxVgI0"
      
      if (!token) {
        toast.error("Please login first");
        return;
      }

      console.log(`Updating order ${orderId} status to ${status}`);
      
      const response = await fetch(
        `${API_BASE_URL}/kds/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Order status updated:", data);
      toast.success(`Order status updated to ${status}`);
      return data;
    } catch (error) {
      console.error("❌ Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  // Update item status via API
  const handleUpdateItemStatus = async (
    orderId: string,
    itemId: string,
    status: OrderStatusKDS
  ) => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NTBiNmU1NC0zYzY5LTRiYmItYThjNS0zYzU5YTFlNGNiNTIiLCJmaXJzdE5hbWUiOiJuYXZpZHJlemEiLCJsYXN0TmFtZSI6ImFiYmFzemFkZWgiLCJlbWFpbCI6Im5hdmlkcmV6YWFiYmFzemFkZWg4OUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjUxMzU4OTgsImV4cCI6MTc2NTc0MDY5OH0.SRalCQ1X2d1Dxs9TrNEa7omKoUsEJ8Z4pklqqDxVgI0"
      
      if (!token) {
        toast.error("Please login first");
        return;
      }

      console.log(`Updating item ${itemId} in order ${orderId} status to ${status}`);
      
      const response = await fetch(
        `${API_BASE_URL}/kds/orders/${orderId}/items/${itemId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status, itemId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Item status updated:", data);
      toast.success(`Item status updated to ${status}`);
      return data;
    } catch (error) {
      console.error("❌ Error updating item status:", error);
      toast.error("Failed to update item status");
    }
  };

  // Dismiss notification
  const handleDismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Calculate counts
  const activeOrdersCount = orders.filter(
    (o) => o.status !== "completed"
  ).length;
  const newOrdersCount = orders.filter((o) => o.status === "new").length;
  const readyOrdersCount = orders.filter((o) => o.status === "ready").length;

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <NotificationCenter
        notifications={notifications}
        onDismiss={handleDismissNotification}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FF5B35] rounded-lg shadow-sm">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#FF5B35] tracking-tight">
                Kitchen Display System
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Real-time order management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">
                    Live
                  </span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600 font-medium">
                    Disconnected
                  </span>
                </>
              )}
            </div>

            {/* Order Stats */}
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="text-sm border-[#FF5B35] text-[#FF5B35] bg-[#FFF5F2] font-medium px-3 py-1.5"
              >
                Active Orders: {activeOrdersCount}
              </Badge>
              {newOrdersCount > 0 && (
                <Badge className="bg-[#FF5B35] text-white text-sm font-medium px-3 py-1.5 shadow-sm">
                  {newOrdersCount} New
                </Badge>
              )}
              {readyOrdersCount > 0 && (
                <Badge className="bg-green-500 text-white text-sm font-medium px-3 py-1.5 shadow-sm">
                  {readyOrdersCount} Ready
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="bg-white border-b border-gray-200 px-6 shadow-sm">
          <TabsList className="w-full justify-start gap-1 p-1">
            <TabsTrigger
              value="pos"
              className="gap-2 px-4 py-2.5 data-[state=active]:bg-[#FFF5F2] data-[state=active]:text-[#FF5B35] data-[state=active]:border-b-2 data-[state=active]:border-[#FF5B35] transition-all duration-200"
            >
              <UtensilsCrossed className="h-4 w-4" />
              POS / Order Entry
            </TabsTrigger>
            <TabsTrigger
              value="kitchen"
              className="gap-2 px-4 py-2.5 data-[state=active]:bg-[#FFF5F2] data-[state=active]:text-[#FF5B35] data-[state=active]:border-b-2 data-[state=active]:border-[#FF5B35] transition-all duration-200"
            >
              <ChefHat className="h-4 w-4" />
              Kitchen Display
              {newOrdersCount > 0 && (
                <span className="ml-2 bg-[#FF5B35] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {newOrdersCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="waiter"
              className="gap-2 px-4 py-2.5 data-[state=active]:bg-[#FFF5F2] data-[state=active]:text-[#FF5B35] data-[state=active]:border-b-2 data-[state=active]:border-[#FF5B35] transition-all duration-200"
            >
              <Bell className="h-4 w-4" />
              Waiter / Pickup
              {readyOrdersCount > 0 && (
                <span className="ml-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {readyOrdersCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="gap-2 px-4 py-2.5 data-[state=active]:bg-[#FFF5F2] data-[state=active]:text-[#FF5B35] data-[state=active]:border-b-2 data-[state=active]:border-[#FF5B35] transition-all duration-200"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="design-system"
              className="gap-2 px-4 py-2.5 data-[state=active]:bg-[#FFF5F2] data-[state=active]:text-[#FF5B35] data-[state=active]:border-b-2 data-[state=active]:border-[#FF5B35] transition-all duration-200"
            >
              <Palette className="h-4 w-4" />
              Design System
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
          <TabsContent value="pos" className="m-0 h-full p-6">
            <OrderCreationPOS onSendOrder={handleCreateOrder} />
          </TabsContent>

          <TabsContent value="kitchen" className="m-0 h-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5B35] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading orders...</p>
                </div>
              </div>
            ) : (
              <KitchenDisplay
                orders={orders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onUpdateItemStatus={handleUpdateItemStatus}
              />
            )}
          </TabsContent>

          <TabsContent value="waiter" className="m-0 h-full">
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Waiter Display - Coming Soon</p>
            </div>
          </TabsContent>

          <TabsContent value="admin" className="m-0 h-full">
            <AdminDashboard orders={orders} />
          </TabsContent>

          <TabsContent
            value="design-system"
            className="m-0 h-full overflow-auto"
          >
            <DesignSystemDocs />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}