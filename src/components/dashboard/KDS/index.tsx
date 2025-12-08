"use client";

import { Badge } from "@/components/ui/badge";
import { useCreateOrder } from "@/services/orders/useCreateKdsOrder";
import { useKdsWebSocket } from "@/services/orders/useKDSWebsocketHook";
import { useUpdateItemStatus } from "@/services/orders/useUpdateOrderItemStatus";
import { useUpdateOrderStatus } from "@/services/orders/useUpdateOrderStatus";
import type { CreateOrderKDS, OrderItemKDS } from "@/types";
import { Notification } from "@/types/kds";
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
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { AdminDashboard } from "./AdminDashboard";
import { DesignSystemDocs } from "./DesignSystemDocs";
import { KitchenDisplay } from "./KitchenDisplay";
import { NotificationCenter } from "./NotificationCenter";
import { OrderCreationPOS } from "./OrderCreationPOS";
import RestaurantNotFound from "./RestaurantNotFoundError";

// Lazy load Tabs components to avoid SSR issues
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

export default function KDSPanel() {
  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);
  // Tabs
  const [activeTab, setActiveTab] = useState("pos");
  // Notification Info
  const [notifInfo, setNotifInfo] = useState({
    tableNumber: "",
    itemsCount: 0,
  });
  // Restaurant ID from params
  const { restaurantId } = useParams();

  // WebSocket connection for real-time updates
  const { orders, isConnected, isLoading, statusCode } = useKdsWebSocket({
    restaurantId: restaurantId?.toString() || "",
    onOrderCreated: (order) => {
      const notification: Notification = {
        id: order.id,
        type: "new-order",
        message: `Table ${order.tableNumber} - ${order.items.length} items`,
      };
      setNotifications((prev) => [...prev, notification]);
    },
    onOrderUpdated: (order) => {
      if (order.status === "done") {
        const notification: Notification = {
          id: `${order.id}-ready`,
          type: "order-ready",
          message: `Order #${order.orderNumber} is ready!`,
        };
        setNotifications((prev) => [...prev, notification]);
      }
    },
  });

  // Dismiss notification
  const handleDismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const { updateItemStatus: handleUpdateItemStatus, isPending } =
    useUpdateItemStatus({
      getToken: () => localStorage.getItem("token"),
      onSuccess: () => console.log("Item updated!"),
    });

  const { updateOrderStatus: handleUpdateOrderStatus, loading } =
    useUpdateOrderStatus({});

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

  if (statusCode == 404) {
    return <RestaurantNotFound />;
  }

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

    const newOrder: CreateOrderKDS = {
      items,
      tableNumber: Number(tableNumber),
      note,
    };

    setNotifInfo({ tableNumber, itemsCount: items.length });

    // Send order to backend
    mutateAsync(newOrder);
  };

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
                Active Orders: mocked
              </Badge>
              {/* {newOrdersCount > 0 && (
                <Badge className="bg-[#FF5B35] text-white text-sm font-medium px-3 py-1.5 shadow-sm">
                  {newOrdersCount} New
                </Badge>
              )}
              {readyOrdersCount > 0 && (
                <Badge className="bg-green-500 text-white text-sm font-medium px-3 py-1.5 shadow-sm">
                  {readyOrdersCount} Ready
                </Badge>
              )} */}
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
              {/* {newOrdersCount > 0 && (
                <span className="ml-2 bg-[#FF5B35] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {newOrdersCount}
                </span>
              )} */}
            </TabsTrigger>
            <TabsTrigger
              value="waiter"
              className="gap-2 px-4 py-2.5 data-[state=active]:bg-[#FFF5F2] data-[state=active]:text-[#FF5B35] data-[state=active]:border-b-2 data-[state=active]:border-[#FF5B35] transition-all duration-200"
            >
              <Bell className="h-4 w-4" />
              Waiter / Pickup
              {/* {readyOrdersCount > 0 && (
                <span className="ml-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {readyOrdersCount}
                </span>
              )} */}
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
