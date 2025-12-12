"use client";

import { Ingredient } from "@/types";
import { ChefHat } from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { BatchEditModal } from "./BatchEditModal";
import { BOMModal } from "./BOMModal";
import { IngredientManagement } from "./IngredientManagement";
import { MenuItemsList } from "./MenuItemsList";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  status: "active" | "inactive";
  quantity: number;
  category: string;
}

const initialMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    price: 12.99,
    status: "active",
    quantity: 45,
    category: "Burgers",
  },
  {
    id: "2",
    name: "Margherita Pizza",
    price: 14.99,
    status: "active",
    quantity: 3,
    category: "Pizza",
  },
  {
    id: "3",
    name: "Caesar Salad",
    price: 9.99,
    status: "active",
    quantity: 0,
    category: "Salads",
  },
  {
    id: "4",
    name: "Chicken Wings",
    price: 11.99,
    status: "active",
    quantity: 28,
    category: "Appetizers",
  },
  {
    id: "5",
    name: "Fish Tacos",
    price: 13.99,
    status: "active",
    quantity: 2,
    category: "Tacos",
  },
  {
    id: "6",
    name: "Ribeye Steak",
    price: 29.99,
    status: "active",
    quantity: 15,
    category: "Steaks",
  },
  {
    id: "7",
    name: "Pasta Carbonara",
    price: 16.99,
    status: "active",
    quantity: 22,
    category: "Pasta",
  },
  {
    id: "8",
    name: "Veggie Wrap",
    price: 10.99,
    status: "inactive",
    quantity: 8,
    category: "Wraps",
  },
];

export default function VendorPanel() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [isBatchEditOpen, setIsBatchEditOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"menu" | "ingredients">("menu");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null
  );

  const updateQuantity = (id: string, newQuantity: number) => {
    setMenuItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
    toast.success("Quantity updated successfully", {
      description: `Updated to ${Math.max(0, newQuantity)} units`,
    });
  };

  const consumeIngredients = (itemId: string, quantity: number = 1) => {
    const now = Date.now();
    const menuItem = menuItems.find((item) => item.id === itemId);
    if (!menuItem) return;

    const translatedItemName = menuItem.name;

    // Find all ingredients assigned to this menu item
    const updatedIngredients = ingredients.map((ing) => {
      const assignment = ing.assignedItems.find(
        (item) => item.itemId === itemId
      );
      if (!assignment) return ing;

      const consumedAmount = assignment.qtyPerItem * quantity;
      const newStock = Math.max(0, ing.stockQuantity - consumedAmount);

      return {
        ...ing,
        stockQuantity: newStock,
        lastUpdated: now,
        auditHistory: [
          ...ing.auditHistory,
          {
            id: `audit-${now}-${ing.id}`,
            timestamp: now,
            action: "consumed" as const,
            user: "System (Order)",
            changes: `Auto-consumed ${consumedAmount} ${ing.unit} for ${translatedItemName} order`,
            previousValue: ing.stockQuantity,
            newValue: newStock,
          },
        ],
      };
    });

    setIngredients(updatedIngredients);
  };

  const simulateOrder = (id: string) => {
    setMenuItems((items) =>
      items.map((item) => {
        if (item.id === id && item.quantity > 0) {
          const newQuantity = item.quantity - 1;
          const itemName = item.name;

          // Consume ingredients automatically
          consumeIngredients(id, 1);

          toast.info("Order placed", {
            description: `${itemName} - ${newQuantity} remaining`,
          });

          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const restockItem = (id: string, quantity: number = 20) => {
    setMenuItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
    toast.success("Item restocked", {
      description: `Added ${quantity} units`,
    });
  };

  const batchUpdateQuantities = (updates: Record<string, number>) => {
    setMenuItems((items) =>
      items.map((item) =>
        updates[item.id] !== undefined
          ? { ...item, quantity: Math.max(0, updates[item.id]) }
          : item
      )
    );
    const count = Object.keys(updates).length;
    toast.success(`${count} ${count > 1 ? "items updated" : "item updated"}`, {
      description: "Quantities have been updated successfully",
    });
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

  const handleManageIngredients = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    setIsBOMModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-lg">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">Inventory Management</h1>
                <p className="text-sm text-gray-500">
                  Manage your menu item quantities
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
              className={`px-1 py-4 border-b-2 transition-colors ${
                activeTab === "menu"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Menu Items
            </button>
            <button
              onClick={() => setActiveTab("ingredients")}
              className={`px-1 py-4 border-b-2 transition-colors ${
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
            items={menuItems}
            onUpdateQuantity={updateQuantity}
            onSimulateOrder={simulateOrder}
            onRestock={restockItem}
            selectedItems={selectedItems}
            onToggleSelection={toggleItemSelection}
            onManageIngredients={handleManageIngredients}
          />
        ) : (
          <IngredientManagement
            ingredients={ingredients}
            setIngredients={setIngredients}
            menuItems={menuItems}
          />
        )}
      </main>

      {/* Batch Edit Modal */}
      <BatchEditModal
        isOpen={isBatchEditOpen}
        onClose={() => setIsBatchEditOpen(false)}
        items={menuItems.filter((item) => selectedItems.has(item.id))}
        onSave={batchUpdateQuantities}
        onClearSelection={clearSelection}
      />

      {/* BOM Modal */}
      <BOMModal
        isOpen={isBOMModalOpen}
        onClose={() => setIsBOMModalOpen(false)}
        menuItem={selectedMenuItem}
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
    </div>
  );
}
