"use client";

import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
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
import type { OrderItemKDS, OrderKDS, OrderStatusKDS } from "@/types";
import {
  BarChart3,
  Bell,
  ChefHat,
  Palette,
  UtensilsCrossed,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { AdminDashboard } from "./AdminDashboard";
import { DesignSystemDocs } from "./DesignSystemDocs";
import { KitchenDisplay } from "./KitchenDisplay";
import { NotificationCenter } from "./NotificationCenter";
import { OrderCreationPOS } from "./OrderCreationPOS";
import { WaiterDisplay } from "./WaiterDisplay";

interface Notification {
  id: string;
  type: "new-order" | "order-ready";
  message: string;
  orderNumber: number;
}

export default function KDSPanel() {
  const [orders, setOrders] = useState<OrderKDS[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [orderCounter, setOrderCounter] = useState(1);
  const [activeTab, setActiveTab] = useState("pos");

  // Create a new order from POS
  const handleCreateOrder = useCallback(
    (
      items: OrderItemKDS[],
      tableNumber: string,
      notes: string
    ) => {
      const newOrder: OrderKDS = {
        id: crypto.randomUUID(),
        orderNumber: orderCounter,
        items,
        status: "new",
        createdAt: new Date(),
        updatedAt: new Date(),
        tableNumber,
        notes,
      };

      setOrders((prev) => [newOrder, ...prev]);
      setOrderCounter((prev) => prev + 1);

      // Add notification
      const notification: Notification = {
        id: crypto.randomUUID(),
        type: "new-order",
        message: `Order #${orderCounter} - Table ${tableNumber}`,
        orderNumber: orderCounter,
      };
      setNotifications((prev) => [...prev, notification]);

      // Show toast
      toast.success(`Order #${orderCounter} sent to kitchen!`, {
        description: `Table ${tableNumber} - ${items.length} items`,
      });

      // Auto-switch to kitchen view for demo purposes
      setTimeout(() => {
        setActiveTab("kitchen");
      }, 500);
    },
    [orderCounter]
  );

  // Update order status
  const handleUpdateOrderStatus = useCallback(
    (orderId: string, status: OrderStatusKDS) => {
      setOrders((prev) =>
        prev.map((order) => {
          if (order.id === orderId) {
            const updatedOrder = { ...order, status, updatedAt: new Date() };

            // If order is marked as ready, notify waiters
            if (status === "ready") {
              const notification: Notification = {
                id: crypto.randomUUID(),
                type: "order-ready",
                message: `Order #${order.orderNumber} - Table ${order.tableNumber}`,
                orderNumber: order.orderNumber,
              };
              setNotifications((prev) => [...prev, notification]);

              toast.success(`Order #${order.orderNumber} is ready!`, {
                description: `Table ${order.tableNumber} ready for pickup`,
              });
            }

            // Update all items to match order status
            if (status === "in-progress" || status === "ready") {
              updatedOrder.items = order.items.map((item) => ({
                ...item,
                status,
              }));
            }

            return updatedOrder;
          }
          return order;
        })
      );
    },
    []
  );

  // Update individual item status
  const handleUpdateItemStatus = useCallback(
    (orderId: string, itemId: string, status: OrderStatusKDS) => {
      setOrders((prev: any) =>
        prev.map((order: OrderKDS) => {
          if (order.id === orderId) {
            const updatedItems = order.items.map((item) =>
              item.id === itemId ? { ...item, status } : item
            );

            // Check if all items are ready
            const allItemsReady = updatedItems.every(
              (item) => item.status === "ready"
            );
            const orderStatus = allItemsReady ? "ready" : "in-progress";

            const updatedOrder = {
              ...order,
              items: updatedItems,
              status: orderStatus,
              updatedAt: new Date(),
            };

            // Notify if order becomes ready
            if (allItemsReady && order.status !== "ready") {
              const notification: Notification = {
                id: crypto.randomUUID(),
                type: "order-ready",
                message: `Order #${order.orderNumber} - Table ${order.tableNumber}`,
                orderNumber: order.orderNumber,
              };
              setNotifications((prev) => [...prev, notification]);

              toast.success(`Order #${order.orderNumber} is ready!`, {
                description: `Table ${order.tableNumber} ready for pickup`,
              });
            }

            return updatedOrder;
          }
          return order;
        })
      );
    },
    []
  );

  // Mark order as delivered
  const handleMarkDelivered = useCallback(
    (orderId: string) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: "completed" as OrderStatusKDS,
                updatedAt: new Date(),
              }
            : order
        )
      );

      const order = orders.find((o) => o.id === orderId);
      if (order) {
        toast.success(`Order #${order.orderNumber} delivered!`, {
          description: `Table ${order.tableNumber}`,
        });
      }
    },
    [orders]
  );

  // Dismiss notification
  const handleDismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Get counts for badges
  const newOrdersCount = orders.filter((o) => o.status === "new").length;
  const readyOrdersCount = orders.filter((o) => o.status === "ready").length;
  const activeOrdersCount = orders.filter(
    (o) => o.status !== "completed"
  ).length;

  return (
    <div className="flex flex-col bg-gray-50">
      <NotificationCenter
        notifications={notifications}
        onDismiss={handleDismissNotification}
      />

      {/* Header */}
      <div className="bg-white border-b px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500 rounded-lg">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-orange-600">Kitchen Display System</h1>
              <p className="text-sm text-muted-foreground">
                Real-time order management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                Active Orders: {activeOrdersCount}
              </Badge>
              {newOrdersCount > 0 && (
                <Badge className="bg-red-500 text-sm">
                  {newOrdersCount} New
                </Badge>
              )}
              {readyOrdersCount > 0 && (
                <Badge className="bg-green-500 text-sm">
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
        <div className="bg-white border-b px-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="pos" className="gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              POS / Order Entry
            </TabsTrigger>
            <TabsTrigger value="kitchen" className="gap-2">
              <ChefHat className="h-4 w-4" />
              Kitchen Display
              {newOrdersCount > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">
                  {newOrdersCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="waiter" className="gap-2">
              <Bell className="h-4 w-4" />
              Waiter / Pickup
              {readyOrdersCount > 0 && (
                <Badge className="ml-2 bg-green-500 text-white">
                  {readyOrdersCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="admin" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="design-system" className="gap-2">
              <Palette className="h-4 w-4" />
              Design System
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="pos" className="m-0 h-full p-6">
            <OrderCreationPOS onSendOrder={handleCreateOrder} />
          </TabsContent>

          <TabsContent value="kitchen" className="m-0 h-full">
            <KitchenDisplay
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onUpdateItemStatus={handleUpdateItemStatus}
            />
          </TabsContent>

          <TabsContent value="waiter" className="m-0 h-full">
            <WaiterDisplay
              orders={orders}
              onMarkDelivered={handleMarkDelivered}
            />
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
