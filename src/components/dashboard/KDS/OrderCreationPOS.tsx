"use client";

import { useGetKdsItemsInfinite } from "@/services/items/useKdsItemsInfinite";
import type { ItemCategoryKDS, MenuItem, OrderItemKDS } from "@/types";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Card } from "../../ui/card";
import MenuContent from "./MenuContent";
import MenuHeader from "./MenuHeader";
import OrderSummary from "./OrderSummary";

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
  const [selectedCategory, setSelectedCategory] = useState<
    ItemCategoryKDS | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [search] = useDebounce(searchQuery, 1000);
  const [minAndMaxPrice, setMinAndMaxPrice] = useState<{
    min: number;
    max: number;
  }>({ min: 0, max: 100 });
  const [sortParams, setSortParams] = useState<{
    orderBy: string;
    sort: string;
  }>({ orderBy: "createdAt", sort: "desc" });

  // API call for fetching restaurant menu items with infinite scroll
  const {
    items,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetKdsItemsInfinite(restaurantId as string, {
    limit: 12,
    categoryId: selectedCategory !== "all" ? selectedCategory.id : undefined,
    search: search,
    minPrice: minAndMaxPrice.min,
    maxPrice: minAndMaxPrice.max,
    orderBy: sortParams.orderBy,
    sort: sortParams.sort,
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
            setMinAndMaxPrice={setMinAndMaxPrice}
            setSearchQuery={setSearchQuery}
            setSortParams={setSortParams}
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
