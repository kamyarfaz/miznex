"use client";

import { useMenu } from "@/hooks/business/useMenu";
import { ChefHat } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Toaster } from "sonner";
import { BatchEditModal } from "./BatchEditModal";
import { IngredientManagement } from "./IngredientManagement";
import { MenuItemsList } from "./MenuItemsList";

export default function VendorPanel() {
  const { restaurantId: id } = useParams();
  const restaurantId = id?.toString();
  const { menuItems, loading, updateQuantity } = useMenu({
    restaurantId: restaurantId || "",
    autoLoad: true,
  });

  const [isBatchEditOpen, setIsBatchEditOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"menu" | "ingredients">("menu");

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    try {
      const res = await updateQuantity(id, Math.max(0, newQuantity));
      console.log("updateQuantity", res);
      console.log(id, newQuantity);
    } catch (error) {
      console.error("Update quantity error:", error);
    }
  };

  const handleSimulateOrder = async (id: string) => {
    const item = menuItems.find((i) => i.id === id);
    if (item && item.quantity > 0) {
      const res = await handleUpdateQuantity(id, item.quantity - 1);
      console.log(res);
    }
  };

  const handleRestock = async (id: string, quantity: number = 20) => {
    const res = await handleUpdateQuantity(id, quantity);
    console.log(res);
  };

  const handleBatchUpdate = async (updates: Record<string, number>) => {
    try {
      const promises = Object.entries(updates).map(([id, quantity]) =>
        updateQuantity(id, Math.max(0, quantity))
      );
      await Promise.all(promises);
    } catch (error) {
      console.error("Batch update error:", error);
    }
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const clearSelection = () => {
    setSelectedItems(new Set());
  };

  if (loading && menuItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-lg">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Inventory Management
                </h1>
                <p className="text-sm text-gray-500">
                  Manage your menu items and ingredients
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {activeTab === "menu" && (
                <button
                  onClick={() => setIsBatchEditOpen(true)}
                  disabled={selectedItems.size === 0}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Batch Edit ({selectedItems.size})
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("menu")}
              className={`px-1 py-4 border-b-2 font-medium transition-colors ${
                activeTab === "menu"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Menu Items
            </button>
            <button
              onClick={() => setActiveTab("ingredients")}
              className={`px-1 py-4 border-b-2 font-medium transition-colors ${
                activeTab === "ingredients"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Ingredients
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "menu" ? (
          <MenuItemsList
            items={menuItems.map((item) => ({
              id: item.id,
              name: item.title,
              price: item.price,
              quantity: item.quantity,
              category: item.category.title,
              status: "active" as const,
            }))}
            onUpdateQuantity={handleUpdateQuantity}
            onSimulateOrder={handleSimulateOrder}
            onRestock={handleRestock}
            selectedItems={selectedItems}
            onToggleSelection={toggleItemSelection}
          />
        ) : (
          <IngredientManagement
            restaurantId={restaurantId || ""}
            menuItems={menuItems}
          />
        )}
      </main>

      {/* Batch Edit Modal */}
      <BatchEditModal
        isOpen={isBatchEditOpen}
        onClose={() => setIsBatchEditOpen(false)}
        items={menuItems
          .filter((item) => selectedItems.has(item.id))
          .map((item) => ({
            id: item.id,
            name: item.title,
            price: item.price,
            quantity: item.quantity,
            category: item.category.title,
            status: "active" as const,
          }))}
        onSave={handleBatchUpdate}
        onClearSelection={clearSelection}
      />
    </div>
  );
}
