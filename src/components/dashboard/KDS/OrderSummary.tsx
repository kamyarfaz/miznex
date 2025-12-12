import { Card, CardContent } from "@/components/ui/card";
import { MenuItem, OrderItemKDS } from "@/types";
import { Building, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { KDSButton } from "./KDSButton";
import { KDSInput } from "./KDSInput";
import { KDSQuantityBadge } from "./KDSQuantityBadge";
import { KDSTextarea } from "./KDSTextarea";
import OrderSummaryHeader from "./OrderSummaryHeader";

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

  // Remove item
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

  return (
    <div>
      <main className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
        {/* Customer Information Section */}
        <section>
          <label
            htmlFor="table-number"
            className="text-sm font-semibold text-slate-600"
          >
            Table Number
          </label>
          <div className="relative mt-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              {/* Restaurant Icon */}
              <Building className="h-5 w-5 text-[#FF5B35]" />
            </div>
            <input
              id="table-number"
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Enter table number"
              className="w-full pl-11 pr-10 py-3 border-2 border-slate-200 focus:border-[#FF5B35] focus:ring-2 focus:ring-[#FF5B35]/20 transition-all bg-white rounded-xl text-slate-800 font-medium placeholder-slate-400"
            />
            {tableNumber && (
              <button
                onClick={() => setTableNumber("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-[#FF5B35] transition-colors p-1"
                aria-label="Clear table number"
              >
                {/* Clear Icon */}
                <svg
                  className="h-5 w-5"
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
        </section>

        {/* Order Items Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">Order Items</h2>
            {selectedItems.size > 0 && (
              <button
                onClick={() => {
                  /* Clear all logic */
                }}
                className="text-sm font-medium text-[#FF5B35] hover:text-[#FF5B35]/80 hover:bg-[#FFF5F2] px-3 py-1.5 rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {selectedItems.size === 0 ? (
            <div className="text-center py-16 px-6 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <div className="inline-block bg-[#FFF5F2] p-4 rounded-full">
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
              <p className="mt-4 font-semibold text-slate-700">
                Your cart is empty
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Add items from the menu to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {Array.from(selectedItems.values()).map(
                ({ item, quantity, note }) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-2xl border border-slate-200/80 transition-shadow hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      {item.images?.[0]?.imageUrl && (
                        <img
                          src={item.images[0].imageUrl}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-grow">
                        <p className="font-bold text-slate-800">{item.title}</p>
                        <p className="text-sm text-slate-500">
                          ${item.price?.toFixed(2)} each
                        </p>
                      </div>
                      {/* Unified Quantity Control */}
                      <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1 flex-shrink-0">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 text-xl font-bold text-[#FF5B35] rounded-full hover:bg-[#FF5B35]/10 transition-colors"
                          aria-label={`Remove one ${item.title}`}
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-slate-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => addItem(item)}
                          className="h-8 w-8 text-xl font-bold text-[#FF5B35] rounded-full hover:bg-[#FF5B35]/10 transition-colors"
                          aria-label={`Add one more ${item.title}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* Special Instructions & Item Total */}
                    <div className="mt-4 flex items-end justify-between gap-4">
                      <div className="flex-grow">
                        <label className="text-xs font-medium text-slate-500">
                          Special Instructions
                        </label>
                        <input
                          placeholder="e.g., No onions..."
                          value={note}
                          onChange={(e) =>
                            updateItemNotes(item.id, e.target.value)
                          }
                          className="mt-1 w-full text-sm py-2 px-3 bg-white border border-slate-300 rounded-md focus:border-[#FF5B35] focus:ring-2 focus:ring-[#FF5B35]/20 transition-all"
                        />
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-slate-800">
                          ${(item.price * quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        {/* Order Notes Section */}
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Order Notes</h2>
          <textarea
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            placeholder="Add special instructions for the entire order..."
            rows={3}
            className="w-full p-3 border border-slate-300 focus:border-[#FF5B35] focus:ring-2 focus:ring-[#FF5B35]/20 transition-all resize-none bg-white rounded-xl"
          />
        </section>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm p-4 md:p-6 border-t border-slate-200 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.05)]">
        {/* Status Indicator */}
        <div
          className={`text-center text-sm font-medium rounded-lg py-2 px-3 transition-all flex items-center justify-center gap-2 ${
            selectedItems.size === 0 || !tableNumber
              ? "bg-[#FFF5F2] text-[#FF5B35] border border-[#FF5B35]/20"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}
        >
          {selectedItems.size === 0
            ? "Add items to enable checkout"
            : !tableNumber
            ? "Please enter a table number"
            : "Ready to send to kitchen"}
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Order Total */}
          <div>
            <p className="text-sm text-slate-600">
              Total ({selectedItems.size}{" "}
              {selectedItems.size === 1 ? "item" : "items"})
            </p>
            <p className="font-extrabold text-3xl text-slate-900">
              ${total?.toFixed(2)}
            </p>
          </div>
          {/* Send to Kitchen Button */}
          <button
            onClick={handleSendOrder}
            disabled={selectedItems.size === 0 || !tableNumber}
            className="flex items-center justify-center gap-2 w-1/2 lg:w-1/3 h-14 px-6 text-white font-bold bg-gradient-to-r from-[#FF5B35] to-[#F8876B] rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
          >
            Send to Kitchen
          </button>
        </div>
      </footer>
    </div>
  );
};
export default OrderSummary;
