"use client";

import { useGetKdsItemsInfinite } from "@/services/items/useKdsItemsInfinite";
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
  
  // Hooks
  const [selectedItems, setSelectedItems] = useState<
    Map<string, { item: MenuItem; quantity: number; notes: string }>
  >(new Map());
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "all"
  );

  // API call for fetching restaurant menu items with infinite scroll
  const {
    items,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetKdsItemsInfinite(restaurantId as string, {
    limit: 12, // Load 12 items per page for better UX
    categoryId: selectedCategory !== "all" ? selectedCategory : undefined,
  });

  // Add item
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
            total={totalCount}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />

          <MenuContent
            total={totalCount}
            addItem={addItem}
            selectedCategory={selectedCategory}
            items={items}
            selectedItems={selectedItems}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </Card>
      </div>

      {/* Order Summary */}
      <OrderSummary
        addItem={addItem}
        onSendOrder={onSendOrder}
        total={totalCount}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
}