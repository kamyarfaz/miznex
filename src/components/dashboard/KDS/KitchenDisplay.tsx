import type { OrderKDS, OrderStatusKDS } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChefHat, Clock, Users, Loader2, Eye } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Separator } from "@/components/ui/separator";
import { statusColors } from "@/utils/getStatusColor";
import { cn } from "@/utils/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  orders: OrderKDS[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatusKDS) => void;
  activeOrders: number | null;
}

const categoryColors: Record<string, string> = {
  grill: "bg-orange-100 text-orange-800 border-orange-300",
  salad: "bg-green-100 text-green-800 border-green-300",
  drinks: "bg-blue-100 text-blue-800 border-blue-300",
  dessert: "bg-pink-100 text-pink-800 border-pink-300",
  appetizer: "bg-purple-100 text-purple-800 border-purple-300",
  default: "bg-gray-100 text-gray-800 border-gray-300",
};

function getElapsedMinutes(createdAt: string | Date) {
  const created = new Date(createdAt);
  return Math.floor((Date.now() - created.getTime()) / 1000 / 60);
}

function formatElapsed(minutes: number) {
  return `${minutes}m`;
}

function getTimeStatus(minutes: number) {
  if (minutes < 10) return { label: "Fresh", color: "text-emerald-600", bg: "bg-emerald-100", border: "border-emerald-200" };
  if (minutes < 20) return { label: "Waiting", color: "text-amber-600", bg: "bg-amber-100", border: "border-amber-200" };
  return { label: "Overdue", color: "text-rose-600", bg: "bg-rose-100", border: "border-rose-200" };
}

function getCategoryColor(category: string): string {
  const key = category?.toLowerCase() || "default";
  return categoryColors[key] || categoryColors.default;
}

export function KitchenDisplay({
  orders,
  onUpdateOrderStatus,
  activeOrders,
}: Props) {
  const [selectedOrder, setSelectedOrder] = useState<OrderKDS | null>(null);
  const [sortBy, setSortBy] = useState<"time" | "table" | "items" | "status">("time");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatusKDS>("all");

  // Filter orders by status
  const filteredOrders = statusFilter === "all" 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case "time":
        return getElapsedMinutes(a.createdAt) - getElapsedMinutes(b.createdAt);
      case "table":
        return a.tableNumber.localeCompare(b.tableNumber);
      case "items":
        return b.items.length - a.items.length;
      case "status":
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const handleStartCooking = (orderId: string) => {
    onUpdateOrderStatus(orderId, "processing");
  };

  const handleCompleteOrder = (orderId: string) => {
    onUpdateOrderStatus(orderId, "done");
  };

  const handleViewDetails = (order: OrderKDS) => {
    setSelectedOrder(order);
  };

  return (
    <div className="h-full p-4 md:p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <ChefHat className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Kitchen Display</h1>
                <p className="text-sm text-slate-500">
                  Active orders for preparation
                </p>
              </div>
              <Badge variant="secondary" className="px-3 py-1 text-base font-semibold">
                {activeOrders}
              </Badge>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={(value: "all" | OrderStatusKDS) => setStatusFilter(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value: "time" | "table" | "items" | "status") => setSortBy(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="time">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>Time</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="table">
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>Table</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="items">
                    <div className="flex items-center gap-2">
                      <ChefHat className="h-3 w-3" />
                      <span>Items</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="status">
                    <div className="flex items-center gap-2">
                      <Eye className="h-3 w-3" />
                      <span>Status</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {(!activeOrders || activeOrders === 0) ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-16 text-center">
              <div className="mx-auto max-w-sm space-y-4">
                <div className="mx-auto h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
                  <ChefHat className="h-10 w-10 text-slate-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-700">No active orders</h4>
                  <p className="text-sm text-slate-500 mt-2">
                    New orders will appear here for preparation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Orders grid - 3 columns on desktop
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence initial={false} mode="popLayout">
              {sortedOrders.map((order) => {
                const minutes = getElapsedMinutes(order.createdAt);
                const timeStatus = getTimeStatus(minutes);
                const statusColor = statusColors[order.status] || "bg-gray-100 text-gray-800";

                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Card
                      className={cn(
                        "h-full transition-all duration-200 hover:shadow-md cursor-pointer relative overflow-hidden",
                        order.status === "pending" && "ring-1 ring-red-200",
                        order.status === "processing" && "ring-1 ring-amber-200",
                        order.status === "done" && "ring-1 ring-emerald-200"
                      )}
                      onClick={() => handleViewDetails(order)}
                    >
                      <CardContent className="p-4">
                        {/* Order header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">
                              Order #{order.orderNumber}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge 
                                variant="secondary" 
                                className="font-normal bg-slate-100 text-slate-700"
                              >
                                Table {order.tableNumber}
                              </Badge>
                              <Badge 
                                className={cn(
                                  "font-normal",
                                  statusColor
                                )}
                              >
                                {order.status.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-sm text-slate-500">
                            {order.waiterName || "Guest"}
                          </div>
                        </div>

                        {/* Time indicator */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className={cn(
                            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
                            timeStatus.bg,
                            timeStatus.color
                          )}>
                            <Clock className="h-3 w-3" />
                            {formatElapsed(minutes)}
                          </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-2 mb-4">
                          {order.items.slice(0, 2).map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between p-2 rounded bg-slate-50"
                            >
                              <div className="flex items-center gap-2 flex-1">
                                <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded font-semibold text-xs">
                                  {item.quantity}
                                </span>
                                <span className="text-sm font-medium text-slate-700 truncate">
                                  {item.name}
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className={cn("text-xs", getCategoryColor(item.category))}
                              >
                                {item.category || "Unknown"}
                              </Badge>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetails(order);
                              }}
                              className="w-full text-center text-xs text-blue-600 hover:text-blue-700 hover:underline py-1"
                            >
                              +{order.items.length - 2} more items
                            </button>
                          )}
                        </div>

                        {/* Notes (if any) */}
                        {order.notes && (
                          <div className="mb-4">
                            <div className="flex items-start gap-2 p-2 bg-amber-50 rounded border border-amber-200">
                              <span className="text-xs font-medium text-amber-800">Note:</span>
                              <p className="text-xs text-amber-800 line-clamp-2 flex-1">{order.notes}</p>
                            </div>
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex gap-2">
                          {order.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartCooking(order.id);
                              }}
                              className="flex-1 gap-2 bg-amber-600 hover:bg-amber-700"
                            >
                              <ChefHat className="h-4 w-4" />
                              Start Cooking
                            </Button>
                          )}
                          
                          {order.status === "processing" && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompleteOrder(order.id);
                              }}
                              className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Mark Ready
                            </Button>
                          )}

                          {(order.status === "done") && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 gap-2"
                              disabled
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Ready for Pickup
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Order Detail Dialog */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
          {selectedOrder && (
            <>
              <DialogHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl">
                    Order #{selectedOrder.orderNumber}
                  </DialogTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      Table {selectedOrder.tableNumber}
                    </Badge>
                    <Badge className={statusColors[selectedOrder.status]}>
                      {selectedOrder.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Waiter: {selectedOrder.waiterName || "Guest"}</span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    {formatElapsed(getElapsedMinutes(selectedOrder.createdAt))} ago
                  </div>
                </div>
              </DialogHeader>

              <Separator />

              <div className="flex-1 overflow-y-auto pr-2 py-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-700 mb-3">Items</h4>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded font-semibold">
                              {item.quantity}
                            </span>
                            <div className="min-w-0">
                              <span className="font-medium text-slate-900 block">
                                {item.name}
                              </span>
                              {item.note && (
                                <div className="text-xs text-slate-500 mt-1 italic">
                                  {item.note}
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge className={getCategoryColor(item.category)}>
                            {item.category || "Unknown"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedOrder.notes && (
                    <div>
                      <h4 className="font-medium text-slate-700 mb-3">Order Notes</h4>
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <p className="text-sm text-amber-800">{selectedOrder.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex gap-3">
                  {selectedOrder.status === "pending" && (
                    <Button
                      onClick={() => {
                        handleStartCooking(selectedOrder.id);
                        setSelectedOrder(null);
                      }}
                      className="flex-1 gap-2 bg-amber-600 hover:bg-amber-700"
                    >
                      <ChefHat className="h-4 w-4" />
                      Start Cooking
                    </Button>
                  )}
                  
                  {selectedOrder.status === "processing" && (
                    <Button
                      onClick={() => {
                        handleCompleteOrder(selectedOrder.id);
                        setSelectedOrder(null);
                      }}
                      className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Mark Ready
                    </Button>
                  )}

                  {selectedOrder.status === "done" && (
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      disabled
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Ready for Pickup
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}