import { Ingredient, getStockStatus } from "@/types";
import { Edit, History, Minus, Plus } from "lucide-react";

interface IngredientRowProps {
  ingredient: Ingredient;
  onEdit: (ingredient: Ingredient) => void;
  onRestock: (ingredient: Ingredient) => void;
  onConsume: (ingredient: Ingredient) => void;
  onViewAudit: (ingredient: Ingredient) => void;
}

export function IngredientRow({
  ingredient,
  onEdit,
  onRestock,
  onConsume,
  onViewAudit,
}: IngredientRowProps) {
  const status = getStockStatus(ingredient);
  const translatedName = ingredient.name;
  const translatedUnit = ingredient.unit;

  const statusConfig = {
    ok: { label: "OK", className: "bg-green-100 text-green-800" },
    low: { label: "Low Stock", className: "bg-yellow-100 text-yellow-800" },
    out: { label: "Out of Stock", className: "bg-red-100 text-red-800" },
  };

  const { label: statusLabel, className: statusClassName } =
    statusConfig[status];

  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
      {/* Name */}
      <div className="col-span-2 flex items-center">
        <div>
          <div className="text-gray-900">{translatedName}</div>
          {ingredient.sku && (
            <div className="text-xs text-gray-500">{ingredient.sku}</div>
          )}
        </div>
      </div>

      {/* Unit */}
      <div className="col-span-1 flex items-center">
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
          {translatedUnit}
        </span>
      </div>

      {/* Current Stock */}
      <div className="col-span-1 flex items-center text-gray-900">
        {ingredient.stockQuantity}
      </div>

      {/* Min Threshold */}
      <div className="col-span-1 flex items-center text-gray-600">
        {ingredient.minThreshold}
      </div>

      {/* Cost per Unit */}
      <div className="col-span-1 flex items-center text-gray-900">
        ${ingredient.costPerUnit.toFixed(2)}
      </div>

      {/* Assigned Items */}
      <div className="col-span-2 flex items-center">
        {ingredient.assignedItems.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {ingredient.assignedItems.slice(0, 2).map((item, idx) => {
              const itemName = item.itemName;
              return (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs"
                >
                  {itemName}
                </span>
              );
            })}
            {ingredient.assignedItems.length > 2 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                +{ingredient.assignedItems.length - 2}
              </span>
            )}
          </div>
        ) : (
          <span className="text-gray-400 text-sm">—</span>
        )}
      </div>

      {/* Status */}
      <div className="col-span-1 flex items-center">
        <span className={`px-2 py-1 rounded-full text-xs ${statusClassName}`}>
          {statusLabel}
        </span>
      </div>

      {/* Actions */}
      <div className="col-span-3 flex items-center gap-1">
        <button
          onClick={() => onRestock(ingredient)}
          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          title="Restock"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => onConsume(ingredient)}
          disabled={ingredient.stockQuantity === 0}
          className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Use"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(ingredient)}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewAudit(ingredient)}
          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          title="View Audit"
        >
          <History className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
