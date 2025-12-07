import type { OrderKDS, OrderStatusKDS } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChefHat, Clock } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

interface Props {
  orders: OrderKDS[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatusKDS) => void;
  onUpdateItemStatus: (
    orderId: string,
    itemId: string,
    status: OrderStatusKDS
  ) => void;
}

const statusColors: Record<OrderStatusKDS, string> = {
  new: "bg-red-500 text-white",
  "in-progress": "bg-yellow-500 text-black",
  ready: "bg-green-500 text-white",
  completed: "bg-gray-400 text-white",
};

const categoryColors: Record<string, string> = {
  grill: "bg-orange-100 text-orange-800 border-orange-300",
  salad: "bg-green-100 text-green-800 border-green-300",
  drinks: "bg-blue-100 text-blue-800 border-blue-300",
  dessert: "bg-pink-100 text-pink-800 border-pink-300",
  appetizer: "bg-purple-100 text-purple-800 border-purple-300",
  default: "bg-gray-100 text-gray-800 border-gray-300",
};

function getElapsedTime(createdAt: Date | string): string {
  const now = new Date();
  const created = new Date(createdAt);
  const elapsed = Math.floor((now.getTime() - created.getTime()) / 1000 / 60);
  return `${elapsed}m`;
}

function getTimerColor(minutes: number): string {
  if (minutes < 10) return "text-green-600";
  if (minutes < 20) return "text-yellow-600";
  return "text-red-600";
}

function getCategoryColor(category: string): string {
  const key = category.toLowerCase();
  return categoryColors[key] || categoryColors.default;
}

export function KitchenDisplay({
  orders,
  onUpdateOrderStatus,
  onUpdateItemStatus,
}: Props) {
  const [selectedOrder, setSelectedOrder] = useState<OrderKDS | null>(null);

  const activeOrders = orders.filter((o) => o.status !== "completed");

  return (
    <div className="h-full flex flex-col">
      {activeOrders.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <ChefHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No active orders</p>
            <p className="text-sm text-gray-400 mt-2">
              New orders will appear here
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 overflow-auto">
          <AnimatePresence mode="popLayout">
            {activeOrders.map((order) => {
              const elapsedMinutes = Math.floor(
                (new Date().getTime() - new Date(order.createdAt).getTime()) /
                  1000 /
                  60
              );

              return (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`cursor-pointer hover:shadow-xl transition-all border-2 ${
                      order.status === "new"
                        ? "border-red-500 shadow-red-200 shadow-lg"
                        : order.status === "ready"
                        ? "border-green-500 shadow-green-200 shadow-lg"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">
                            #{order.orderNumber}
                          </span>
                          <Badge className={statusColors[order.status]}>
                            {order.status.toUpperCase().replace("-", " ")}
                          </Badge>
                        </div>
                        <div
                          className={`flex items-center gap-1 font-semibold ${getTimerColor(
                            elapsedMinutes
                          )}`}
                        >
                          <Clock className="h-4 w-4" />
                          <span>{getElapsedTime(order.createdAt)}</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Table {order.tableNumber} • {order.waiterName || "Guest"}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <div className="flex items-center gap-2 flex-1">
                              <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded font-semibold">
                                {item.quantity}
                              </span>
                              <span className="truncate">{item.name}</span>
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs ${getCategoryColor(
                                item.category
                              )}`}
                            >
                              {item.category}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      {order.notes && (
                        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                          <strong>Note:</strong> {order.notes}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Order Detail Dialog */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="max-w-2xl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Order #{selectedOrder.orderNumber}</span>
                  <Badge className={statusColors[selectedOrder.status]}>
                    {selectedOrder.status.toUpperCase().replace("-", " ")}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  <div className="text-sm text-muted-foreground">
                    Table {selectedOrder.tableNumber} • Waiter:{" "}
                    {selectedOrder.waiterName || "Guest"}
                  </div>
                  <div
                    className={`text-sm font-semibold ${getTimerColor(
                      Math.floor(
                        (new Date().getTime() -
                          new Date(selectedOrder.createdAt).getTime()) /
                          1000 /
                          60
                      )
                    )}`}
                  >
                    Time Elapsed: {getElapsedTime(selectedOrder.createdAt)}
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {selectedOrder.items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded font-semibold">
                            {item.quantity}
                          </span>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            {item.note && (
                              <div className="text-sm text-muted-foreground italic mt-1">
                                Note: {item.note}
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge
                          className={getCategoryColor(item.category)}
                        >
                          {item.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {selectedOrder.notes && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <strong>Order Notes:</strong> {selectedOrder.notes}
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      onUpdateOrderStatus(selectedOrder.id, "in-progress");
                      setSelectedOrder(null);
                    }}
                    className="flex-1 border-yellow-600 text-yellow-700 hover:bg-yellow-50"
                    disabled={selectedOrder.status !== "new"}
                  >
                    <ChefHat className="mr-2 h-4 w-4" />
                    Start Order
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => {
                      onUpdateOrderStatus(selectedOrder.id, "ready");
                      setSelectedOrder(null);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={
                      selectedOrder.status === "ready" ||
                      selectedOrder.status === "new"
                    }
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Complete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}