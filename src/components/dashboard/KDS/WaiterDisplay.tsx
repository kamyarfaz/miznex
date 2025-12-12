import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/utils";
import {
  useBatchMarkDelivered,
  useMarkOrderDelivered,
} from "@/services/orders/useMarkOrderDelivered";
import type { OrderKDS } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Clock,
  Loader2,
  Notebook,
  Package,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  doneOrders: OrderKDS[];
  totalCount: number;
}

function getElapsedMinutes(createdAt: string | Date) {
  const created = new Date(createdAt);
  return Math.floor((Date.now() - created.getTime()) / 1000 / 60);
}

function formatElapsed(minutes: number) {
  return `${minutes}m`;
}

function getTimeStatus(minutes: number) {
  if (minutes < 10)
    return {
      label: "Fresh",
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      border: "border-emerald-200",
    };
  if (minutes < 20)
    return {
      label: "Waiting",
      color: "text-amber-600",
      bg: "bg-amber-100",
      border: "border-amber-200",
    };
  return {
    label: "Overdue",
    color: "text-rose-600",
    bg: "bg-rose-100",
    border: "border-rose-200",
  };
}

export function WaiterDoneList({ doneOrders, totalCount }: Props) {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"time" | "table" | "items">("time");
  const [selectedOrderDetails, setSelectedOrderDetails] =
    useState<OrderKDS | null>(null);
  const [showItemsModal, setShowItemsModal] = useState(false);

  // Sort orders
  const sortedOrders = [...doneOrders].sort((a, b) => {
    switch (sortBy) {
      case "time":
        return getElapsedMinutes(a.createdAt) - getElapsedMinutes(b.createdAt);
      case "table":
        return a.tableNumber.localeCompare(b.tableNumber);
      case "items":
        return b.items.length - a.items.length;
      default:
        return 0;
    }
  });

  // Single and batch hooks
  const { markAsDelivered, isLoading: isSingleLoading } = useMarkOrderDelivered(
    {
      onSuccess: (_data, orderId) => {
        setLoadingOrderId(null);
        setSelectedOrders((prev) => {
          const next = new Set(prev);
          next.delete(orderId);
          return next;
        });
      },
      onError: (err, orderId) => {
        console.error("deliver error", orderId, err);
        setLoadingOrderId(null);
        toast.error("Failed to deliver order");
      },
      showToast: true,
    }
  );

  const { markMultipleAsDelivered, isLoading: isBatchLoading } =
    useBatchMarkDelivered({
      onError: (err) => {
        console.error("batch deliver error", err);
        toast.error("Failed to deliver selected orders");
      },
      showToast: true,
    });

  const toggleSelection = (id: string) =>
    setSelectedOrders((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleSelectAllToggle = () => {
    if (selectedOrders.size === totalCount) {
      setSelectedOrders(new Set());
      return;
    }
    setSelectedOrders(new Set(sortedOrders.map((o) => o.id)));
  };

  const handleSingleDeliver = (orderId: string) => {
    setLoadingOrderId(orderId);
    markAsDelivered(orderId);
  };

  const handleBatchDeliver = () => {
    if (selectedOrders.size === 0) {
      toast.warning("No orders selected", {
        description: "Select orders to mark as delivered",
      });
      return;
    }
    markMultipleAsDelivered(Array.from(selectedOrders));
  };

  const handleViewItems = (order: OrderKDS) => {
    setSelectedOrderDetails(order);
    setShowItemsModal(true);
  };

  // sync totalCount -> if fewer orders exist, clear selection that no longer exists
  useEffect(() => {
    const ids = new Set(doneOrders.map((d) => d.id));
    setSelectedOrders((prev) => {
      const next = new Set<string>();
      prev.forEach((id) => {
        if (ids.has(id)) next.add(id);
      });
      return next;
    });
  }, [doneOrders]);

  return (
    <div className="h-full p-4 md:p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <Package className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Ready for Pickup
                </h1>
                <p className="text-sm text-slate-500">
                  Orders waiting for delivery to tables
                </p>
              </div>
              <Badge
                variant="secondary"
                className="px-3 py-1 text-base font-semibold"
              >
                {totalCount}
              </Badge>
            </div>

            {/* Quick stats */}
            {totalCount > 0 && (
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>
                    <span className="font-semibold">{selectedOrders.size}</span>{" "}
                    selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  <span>
                    <span className="font-semibold">
                      {new Set(sortedOrders.map((o) => o.tableNumber)).size}
                    </span>{" "}
                    tables
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Select
                value={sortBy}
                onValueChange={(value: "time" | "table" | "items") =>
                  setSortBy(value)
                }
              >
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
                      <Package className="h-3 w-3" />
                      <span>Items</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAllToggle}
                disabled={totalCount === 0}
                className="gap-2"
              >
                {selectedOrders.size === totalCount && totalCount > 0 ? (
                  <>
                    <Check className="h-4 w-4" />
                    Deselect All
                  </>
                ) : (
                  "Select All"
                )}
              </Button>

              <Button
                size="sm"
                onClick={handleBatchDeliver}
                disabled={isBatchLoading || selectedOrders.size === 0}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isBatchLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Delivering {selectedOrders.size}
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Deliver{" "}
                    {selectedOrders.size > 0 ? `(${selectedOrders.size})` : ""}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {totalCount === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-16 text-center">
              <div className="mx-auto max-w-sm space-y-4">
                <div className="mx-auto h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
                  <Package className="h-10 w-10 text-slate-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-700">
                    No orders ready
                  </h4>
                  <p className="text-sm text-slate-500 mt-2">
                    Completed orders will appear here when they're ready for
                    pickup
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
                const isSelected = selectedOrders.has(order.id);
                const isLoadingThis = loadingOrderId === order.id;

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
                        isSelected && "ring-2 ring-emerald-500"
                      )}
                      onClick={() => toggleSelection(order.id)}
                    >
                      {/* Selection checkbox */}
                      <div className="absolute top-3 right-3 z-10">
                        <div
                          className={cn(
                            "h-5 w-5 rounded flex items-center justify-center transition-all",
                            isSelected && "bg-emerald-500 border-emerald-500"
                          )}
                        >
                          {isSelected && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                      </div>

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
                                  timeStatus.bg,
                                  timeStatus.color,
                                  timeStatus.border
                                )}
                              >
                                READY
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Time indicator */}
                        <div className="flex items-center gap-2 mb-4">
                          <div
                            className={cn(
                              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
                              timeStatus.bg,
                              timeStatus.color
                            )}
                          >
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
                              <span className="text-sm font-medium text-slate-700 truncate">
                                {item.quantity}× {item.name}
                              </span>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewItems(order);
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
                              <Notebook className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-amber-800 line-clamp-2">
                                {order.notes}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Deliver button */}
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSingleDeliver(order.id);
                          }}
                          disabled={
                            isLoadingThis || isSingleLoading || isBatchLoading
                          }
                          className={cn(
                            "w-full gap-2 font-medium",
                            minutes >= 20
                              ? "bg-rose-600 hover:bg-rose-700"
                              : "bg-emerald-600 hover:bg-emerald-700"
                          )}
                        >
                          {isLoadingThis ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Delivering...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              Mark as Delivered
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Items Detail Modal */}
      <Dialog open={showItemsModal} onOpenChange={setShowItemsModal}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
          {selectedOrderDetails && (
            <>
              <DialogHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl">
                    Order #{selectedOrderDetails.orderNumber}
                  </DialogTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      Table {selectedOrderDetails.tableNumber}
                    </Badge>
                    <Badge className="bg-emerald-600">READY</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="h-3 w-3" />
                  {formatElapsed(
                    getElapsedMinutes(selectedOrderDetails.createdAt)
                  )}{" "}
                  ago
                </div>
              </DialogHeader>

              <Separator />

              <div className="flex-1 overflow-y-auto pr-2 py-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-700 mb-3">Items</h4>
                    <div className="space-y-2">
                      {selectedOrderDetails.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                          <div className="min-w-0">
                            <span className="font-medium text-slate-900 block truncate">
                              {item.name}
                            </span>
                          </div>
                          <Badge
                            variant="secondary"
                            className="font-mono ml-2 flex-shrink-0"
                          >
                            {item.quantity}×
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedOrderDetails.notes && (
                    <div>
                      <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                        <Notebook className="h-4 w-4" />
                        Notes
                      </h4>
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <p className="text-sm text-amber-800">
                          {selectedOrderDetails.notes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  onClick={() => {
                    handleSingleDeliver(selectedOrderDetails.id);
                    setShowItemsModal(false);
                  }}
                  disabled={
                    loadingOrderId === selectedOrderDetails.id || isBatchLoading
                  }
                  className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700"
                >
                  {loadingOrderId === selectedOrderDetails.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Delivering...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Mark as Delivered
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WaiterDoneList;
