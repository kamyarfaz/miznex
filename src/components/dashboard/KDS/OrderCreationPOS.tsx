"use client";

import { useGetKdsItems } from "@/services/items/useGetKdsItem";
import type { MenuItem, OrderItemKDS } from "@/types";
import { Category } from "@/types/restaurant";
import { useState } from "react";
import { Card } from "../../ui/card";
import MenuContent from "./MenuContent";
import MenuHeader from "./MenuHeader";
import OrderSummary from "./OrderSummary";
import { useParams } from "next/navigation";

interface Props {
  onSendOrder: (
    items: OrderItemKDS[],
    tableNumber: string,
    notes: string
  ) => void;
}

export function OrderCreationPOS({ onSendOrder }: Props) {
  // Params
  const { restaurantId } = useParams();
  // API call for fetching restaurant menu items
  const { items, total, isLoading, page, limit } = useGetKdsItems(
    restaurantId as string,
    { page: 1, limit: 4 }
  );

  // Hooks
  const [selectedItems, setSelectedItems] = useState<
    Map<string, { item: MenuItem; quantity: number; notes: string }>
  >(new Map());
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all"
  );

  // Add item (Mock: To-do -> Bind it to API)
  const addItem = (menuItem: MenuItem) => {
    const newMap = new Map(selectedItems);
    const existing = newMap.get(menuItem.id);
    if (existing) {
      newMap.set(menuItem.id, { ...existing, quantity: existing.quantity + 1 });
    } else {
      newMap.set(menuItem.id, { item: menuItem, quantity: 1, notes: "" });
    }
    setSelectedItems(newMap);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full items-start">
      {/* Menu Selection */}
      <div className="lg:col-span-2">
        <Card className="h-full border-r border-gray-100 shadow-xl overflow-hidden">
          <MenuHeader
            total={total}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />

          <MenuContent
            total={total}
            addItem={addItem}
            selectedCategory={selectedCategory}
            items={items}
            selectedItems={selectedItems}
          />
        </Card>
      </div>

      {/* Order Summary */}
      <OrderSummary
        addItem={addItem}
        onSendOrder={onSendOrder}
        total={total}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
}
