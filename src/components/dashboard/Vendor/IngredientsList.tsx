import { Ingredient, getStockStatus } from "@/types";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { MenuItem } from "@/types";
import { IngredientRow } from "./IngredientRow";

interface IngredientsListProps {
  ingredients: Ingredient[];
  onEdit: (ingredient: Ingredient) => void;
  onRestock: (ingredient: Ingredient) => void;
  onConsume: (ingredient: Ingredient) => void;
  onViewAudit: (ingredient: Ingredient) => void;
  onManageBOM: (menuItem: MenuItem) => void;
  menuItems: MenuItem[];
}

export function IngredientsList({
  ingredients,
  onEdit,
  onRestock,
  onConsume,
  onViewAudit,
  onManageBOM,
  menuItems,
}: IngredientsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "ok" | "low" | "out"
  >("all");

  const filteredIngredients = ingredients.filter((ingredient) => {
    const translatedName = ingredient.name;
    const matchesSearch =
      translatedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.sku?.toLowerCase().includes(searchQuery.toLowerCase());
    const status = getStockStatus(ingredient);
    const matchesStatus = statusFilter === "all" || status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Ingredient Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="ok">OK</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="col-span-2 text-sm text-gray-600">
            Ingredient Name
          </div>
          <div className="col-span-1 text-sm text-gray-600">Unit</div>
          <div className="col-span-1 text-sm text-gray-600">Current Stock</div>
          <div className="col-span-1 text-sm text-gray-600">Min Threshold</div>
          <div className="col-span-1 text-sm text-gray-600">Cost/Unit</div>
          <div className="col-span-2 text-sm text-gray-600">Assigned Items</div>
          <div className="col-span-1 text-sm text-gray-600">Status</div>
          <div className="col-span-3 text-sm text-gray-600">Actions</div>
        </div>

        {/* Body */}
        <div className="divide-y divide-gray-200">
          {filteredIngredients.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              No ingredients found
            </div>
          ) : (
            filteredIngredients.map((ingredient) => (
              <IngredientRow
                key={ingredient.id}
                ingredient={ingredient}
                onEdit={onEdit}
                onRestock={onRestock}
                onConsume={onConsume}
                onViewAudit={onViewAudit}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
