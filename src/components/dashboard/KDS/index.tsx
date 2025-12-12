"use client";

import { Badge } from "@/components/ui/badge";
import { useCreateOrder } from "@/services/orders/useCreateKdsOrder";
import { useKdsDoneOrders } from "@/services/orders/useKDSDoneOrders";
import { useKdsWebSocket } from "@/services/orders/useKDSWebsocketHook";
import { useUpdateOrderStatus } from "@/services/orders/useUpdateOrderStatus";
import type { CreateOrderKDS, OrderItemKDS } from "@/types";
import {
  BarChart3,
  Bell,
  ChefHat,
  Loader2,
  Palette,
  UtensilsCrossed,
  Wifi,
  WifiOff,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AdminDashboard } from "./AdminDashboard";
import { KitchenDisplay } from "./KitchenDisplay";
import { NotificationCenter } from "./NotificationCenter";
import { OrderCreationPOS } from "./OrderCreationPOS";
import RestaurantNotFound from "./RestaurantNotFoundError";
import WaiterDoneList from "./WaiterDisplay";

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
  // Tabs
  const [activeTab, setActiveTab] = useState("pos");
  // Notification Info

  // Restaurant ID from params
  const { restaurantId } = useParams();

  // WebSocket connection for real-time updates (Kitchen display tab)
  const {
    orders,
    isConnected,
    isLoading,
    statusCode,
    totalCount: activeOrders,
  } = useKdsWebSocket({
    restaurantId: restaurantId?.toString() || "",
  });

  // WebSocket connection for real-time updates (Waiter pickup)
  const { doneOrders, totalCount: readyOrdersCount } = useKdsDoneOrders({
    restaurantId: restaurantId?.toString() || "",
  });

  const { updateOrderStatus: handleUpdateOrderStatus } = useUpdateOrderStatus();

  const { mutate } = useCreateOrder({
    onSuccess: () => {
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

    // Send order to backend
    mutate(newOrder);
  };

  return (
    <div className="flex flex-col bg-slate-100 min-h-screen font-sans">
      <NotificationCenter />
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-gradient-to-br from-[#FF5B35] to-[#F8876B] rounded-lg shadow-md">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
                Kitchen Display System
              </h1>
              <p className="text-sm text-slate-500">
                Real-time order management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Connection Status */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                isConnected
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isConnected ? (
                <Wifi className="h-4 w-4" />
              ) : (
                <WifiOff className="h-4 w-4" />
              )}
              <span>{isConnected ? "Live" : "Disconnected"}</span>
            </div>

            {/* Order Stats */}
            <div className="hidden md:flex items-center gap-3">
              <Badge
                variant="outline"
                className="text-sm border-slate-300 text-slate-600 bg-white font-medium px-3 py-1.5"
              >
                Active Orders: {activeOrders}
              </Badge>
              {/* {newOrdersCount > 0 && (
              <Badge className="bg-[#FF5B35] text-white text-sm font-medium px-3 py-1.5 shadow-sm">
                {newOrdersCount} New
              </Badge>
            )}
            {readyOrdersCount > 0 && (
              <Badge className="bg-emerald-500 text-white text-sm font-medium px-3 py-1.5 shadow-sm">
                {readyOrdersCount} Ready
              </Badge>
            )} */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="bg-white border-b border-slate-200 px-4 md:px-6 shadow-sm sticky top-[77px] z-50">
          <TabsList className="h-14 p-1.5 bg-slate-100 rounded-lg">
            <TabsTrigger
              value="pos"
              className="h-full px-4 text-sm font-semibold"
            >
              <UtensilsCrossed className="h-4 w-4 mr-2" />
              POS / Order Entry
            </TabsTrigger>
            <TabsTrigger
              value="kitchen"
              className="h-full px-4 text-sm font-semibold relative"
            >
              <ChefHat className="h-4 w-4 mr-2" />
              Kitchen Display
              {/* Notification Badge for New Orders */}
              {activeOrders && activeOrders > 0 && (
                <span className="absolute top-1 right-1 h-5 w-5 flex items-center justify-center bg-[#FF5B35] text-white text-xs font-bold rounded-full">
                  {activeOrders}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="waiter"
              className="h-full px-4 text-sm font-semibold relative"
            >
              <Bell className="h-4 w-4 mr-2" />
              Waiter / Pickup
              {/* Notification Badge for Ready Orders */}
              {readyOrdersCount > 0 && (
                <span className="absolute top-1 right-1 h-5 w-5 flex items-center justify-center bg-emerald-500 text-white text-xs font-bold rounded-full">
                  {readyOrdersCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="h-full px-4 text-sm font-semibold"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="pos" className="m-0 h-full">
            <OrderCreationPOS onSendOrder={handleCreateOrder} />
          </TabsContent>
          <TabsContent value="kitchen" className="m-0 h-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <Loader2 className="h-10 w-10 text-[#FF5B35] mx-auto mb-4 animate-spin" />
                  <p className="font-semibold text-slate-600">
                    Loading orders...
                  </p>
                </div>
              </div>
            ) : (
              <KitchenDisplay
                orders={orders}
                activeOrders={activeOrders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
              />
            )}
          </TabsContent>
          <TabsContent value="waiter" className="m-0 h-full">
            <WaiterDoneList
              doneOrders={doneOrders}
              totalCount={readyOrdersCount}
            />
          </TabsContent>
          <TabsContent value="admin" className="m-0 h-full">
            <AdminDashboard orders={orders} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
