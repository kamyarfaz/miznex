import { MenuItem } from "@/types";
import { Boxes, Package, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { QuantityControl } from "./QuantityControl";

interface MenuItemRowProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    status: string;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onSimulateOrder: (id: string) => void;
  onRestock: (id: string, quantity?: number) => void;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
  onManageIngredients?: (item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    status: string;
  }) => void;
}

export function MenuItemRow({
  item,
  onUpdateQuantity,
  onSimulateOrder,
  onRestock,
  isSelected,
  onToggleSelection,
  onManageIngredients,
}: MenuItemRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  const isLowStock = item.quantity > 0 && item.quantity < 5;
  const isSoldOut = item.quantity === 0;

  const statusText = item.status === "active" ? "Active" : "Inactive";

  return (
    <div
      className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors ${
        isSelected ? "bg-orange-50" : ""
      }`}
    >
      {/* Checkbox */}
      <div className="col-span-1 flex items-center">
        <input
          type="checkbox"
          className="w-4 h-4 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500"
          checked={isSelected}
          onChange={() => onToggleSelection(item.id)}
        />
      </div>

      {/* Item Name */}
      <div className="col-span-3 flex items-center">
        <div>
          <div className="text-gray-900">{item.name}</div>
          {isSoldOut && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-red-100 text-red-800 mt-1">
              Sold Out
            </span>
          )}
          {isLowStock && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-yellow-100 text-yellow-800 mt-1">
              Low Stock
            </span>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="col-span-2 flex items-center text-gray-600">
        {item.category}
      </div>

      {/* Price */}
      <div className="col-span-1 flex items-center text-gray-900">
        ${item.price.toFixed(2)}
      </div>

      {/* Status */}
      <div className="col-span-1 flex items-center">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
            item.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {statusText}
        </span>
      </div>

      {/* Quantity Control */}
      <div className="col-span-3 flex items-center">
        <QuantityControl
          quantity={item.quantity}
          onQuantityChange={(newQuantity) =>
            onUpdateQuantity(item.id, newQuantity)
          }
          isEditing={isEditing}
          onEditingChange={setIsEditing}
        />
      </div>

      {/* Actions */}
      <div className="col-span-1 flex items-center gap-2">
        {onManageIngredients && (
          <button
            onClick={() => onManageIngredients(item)}
            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            title="Manage Ingredients"
          >
            <Boxes className="w-4 h-4" />
          </button>
        )}
        {!isSoldOut && (
          <button
            onClick={() => onSimulateOrder(item.id)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Simulate Order"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => onRestock(item.id)}
          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          title="Manage Ingredients"
        >
          <Package className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
