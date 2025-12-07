import { Card, CardContent } from "@/components/ui/card";
import { MenuItem, OrderItemKDS } from "@/types";
import { Minus, Plus, Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { KDSButton } from "./KDSButton";
import { KDSInput } from "./KDSInput";
import { KDSQuantityBadge } from "./KDSQuantityBadge";
import { KDSTextarea } from "./KDSTextarea";
import OrderSummaryHeader from "./OrderSummaryHeader";
import { toast } from "sonner";

interface OrderSummaryProps {
  selectedItems: Map<
    string,
    { item: MenuItem; quantity: number; note: string }
  >;
  setSelectedItems: React.Dispatch<
    React.SetStateAction<
      Map<string, { item: MenuItem; quantity: number; note: string }>
    >
  >;
  onSendOrder: (
    items: OrderItemKDS[],
    tableNumber: string,
    notes: string
  ) => void;
  total: number | undefined;
  addItem: (menuItem: MenuItem) => void;
}

const OrderSummary = ({
  selectedItems,
  setSelectedItems,
  onSendOrder,
  total,
  addItem,
}: OrderSummaryProps) => {
  const [tableNumber, setTableNumber] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  // Remove item (Mock: To-do -> Bind it to API)
  const removeItem = (menuItemId: string) => {
    const newMap = new Map(selectedItems);
    const existing = newMap.get(menuItemId);
    if (existing && existing.quantity > 1) {
      newMap.set(menuItemId, { ...existing, quantity: existing.quantity - 1 });
    } else {
      newMap.delete(menuItemId);
    }
    setSelectedItems(newMap);
  };

  // Update item notes
  const updateItemNotes = (menuItemId: string, notes: string) => {
    const newMap = new Map(selectedItems);
    const existing = newMap.get(menuItemId);
    if (existing) {
      newMap.set(menuItemId, { ...existing, note: notes });
    }
    setSelectedItems(newMap);
  };

  // Send order
  const handleSendOrder = () => {
    const orderItems: OrderItemKDS[] = Array.from(selectedItems.values()).map(
      ({ item, quantity, note }) => ({
        menuItemId: item.id,
        count: quantity,
        note,
      })
    );

    onSendOrder(orderItems, tableNumber, orderNotes);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isEnter = e.key === "Enter";
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      if (isEnter && isCtrlOrCmd) {
        e.preventDefault();
        handleSendOrder();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="lg:col-span-1">
      <Card className="h-full flex flex-col border-l border-gray-100 shadow-xl p-0 bg-gradient-to-b from-white to-gray-50/30">
        <OrderSummaryHeader selectedItems={selectedItems} />

        <CardContent className="flex-1 flex flex-col gap-5 overflow-hidden p-5">
          {/* Customer Information Section */}
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                  Table Number
                </label>
                <div className="relative">
                  <KDSInput
                    type="number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Enter table number"
                    className="pl-12 pr-10 py-3 border-2 border-gray-200 focus:border-[#FF5B35] focus:ring-2 focus:ring-[#FF5B35]/10 transition-all bg-white rounded-xl text-gray-800 font-medium"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#FF5B35]/10 to-[#FF5B35]/5 flex items-center justify-center">
                      <svg
                        className="h-4 w-4 text-[#FF5B35]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                  </div>
                  {tableNumber && (
                    <button
                      onClick={() => setTableNumber("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FF5B35] transition-colors p-1"
                      aria-label="Clear table number"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Items Section */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Order Items</h3>
              {selectedItems.size > 0 && (
                <button
                  onClick={() => {
                    /* Clear all function */
                  }}
                  className="text-sm text-[#FF5B35] hover:text-[#FF5B35]/80 hover:bg-[#FFF5F2] px-3 py-1.5 rounded-lg transition-colors border border-[#FF5B35]/20 hover:border-[#FF5B35]/30"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="flex-1 overflow-auto space-y-3 pb-3 pr-1">
              {selectedItems.size === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <div className="h-16 w-16 rounded-full bg-[#FFF5F2] border border-[#FF5B35]/10 flex items-center justify-center mb-4">
                    <svg
                      className="h-8 w-8 text-[#FF5B35]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium mb-1">
                    No items selected
                  </p>
                  <p className="text-gray-500 text-sm">
                    Add items from the menu to get started
                  </p>
                </div>
              ) : (
                Array.from(selectedItems.values()).map(
                  ({ item, quantity, note }) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-gray-200 hover:border-[#FF5B35]/30 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-lg"
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-start gap-3">
                              {item.images[0].imageUrl && (
                                <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                                  <Image
                                    src={item.images[0].imageUrl}
                                    alt={item.images[0].image}
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <h4 className="font-semibold text-gray-800">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-gray-500 mt-0.5">
                                  ${item.price?.toFixed(2)} each
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <KDSButton
                              size="sm"
                              variant="outline"
                              onClick={() => removeItem(item.id)}
                              className="h-8 w-8 p-0 rounded-full hover:bg-[#FF5B35]/10 hover:text-[#FF5B35] hover:border-[#FF5B35]/30 transition-colors"
                              aria-label={`Remove one ${item.title}`}
                            >
                              <Minus className="h-3 w-3" />
                            </KDSButton>
                            <KDSQuantityBadge
                              quantity={quantity}
                              className="min-w-[2rem] font-bold text-[#FF5B35] bg-[#FFF5F2] border border-[#FF5B35]/20"
                            />
                            <KDSButton
                              size="sm"
                              variant="outline"
                              onClick={() => addItem(item)}
                              className="h-8 w-8 p-0 rounded-full hover:bg-[#FF5B35]/10 hover:text-[#FF5B35] hover:border-[#FF5B35]/30 transition-colors"
                              aria-label={`Add one more ${item.title}`}
                            >
                              <Plus className="h-3 w-3" />
                            </KDSButton>
                          </div>
                        </div>

                        <div className="mt-3">
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">
                            Special Instructions
                          </label>
                          <KDSInput
                            placeholder="e.g., No onions, extra sauce, well done..."
                            value={note}
                            onChange={(e) =>
                              updateItemNotes(item.id, e.target.value)
                            }
                            className="text-sm border-gray-300 focus:border-[#FF5B35] focus:ring-2 focus:ring-[#FF5B35]/20 transition-all"
                          />
                        </div>

                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                          <span className="text-sm text-gray-500">
                            Item total
                          </span>
                          <span className="font-semibold text-[#FF5B35] text-lg">
                            ${(item.price * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>

          {/* Order Notes Section */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
              Order Notes
            </label>
            <KDSTextarea
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Add special instructions for the entire order..."
              rows={2}
              className="border-gray-300 focus:border-[#FF5B35] focus:ring-2 focus:ring-[#FF5B35]/20 transition-all resize-none bg-white"
            />
          </div>
        </CardContent>

        {/* Sticky Bottom Action Section */}
        <div className="sticky bottom-0 mt-auto">
          <div className="px-5 py-4 bg-gradient-to-t from-white to-gray-50/50 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-gray-500">Order Total</div>
                <div className="text-2xl font-bold text-[#FF5B35]">
                  ${total?.toFixed(2)}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {selectedItems.size}{" "}
                {selectedItems.size === 1 ? "item" : "items"}
              </div>
            </div>

            <div className="grid gap-3 grid-cols-1">
              <KDSButton
                variant="primary"
                fullWidth
                onClick={handleSendOrder}
                disabled={selectedItems.size === 0 || !tableNumber}
                className="bg-gradient-to-r from-[#FF5B35] to-[#FF5B35]/90 hover:from-[#FF5B35]/90 hover:to-[#FF5B35] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                leftIcon={<Send className="h-4 w-4" />}
              >
                <span className="font-semibold">Send to Kitchen</span>
                <span className="ml-1 text-xs opacity-90">(Ctrl + Enter)</span>
              </KDSButton>
            </div>

            {/* Status Indicator */}
            <div
              className={`mt-3 text-center text-sm font-medium rounded-lg py-2 px-3 transition-all ${
                selectedItems.size === 0 || !tableNumber
                  ? "bg-[#FFF5F2] text-[#FF5B35] border border-[#FF5B35]/20"
                  : "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200"
              }`}
            >
              {selectedItems.size === 0
                ? "Add items to send order"
                : !tableNumber
                ? "Complete table info"
                : "Ready to send to kitchen"}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default OrderSummary;
