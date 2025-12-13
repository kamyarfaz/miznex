import { Ingredient } from "@/types";
import { MenuItem } from "@/types/main/items";
import { AlertTriangle, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface BOMModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem | null;
  ingredients: Ingredient[];
  onSave: (
    assignments: Array<{ ingredientId: string; qtyPerItem: number }>
  ) => Promise<void>;
}

interface BOMEntry {
  ingredientId: string;
  qtyPerItem: number;
}

export function BOMModal({
  isOpen,
  onClose,
  menuItem,
  ingredients,
  onSave,
}: BOMModalProps) {
  const [bomEntries, setBomEntries] = useState<BOMEntry[]>([]);
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && menuItem) {
      // Load existing BOM from ingredients
      const entries: BOMEntry[] = [];
      ingredients.forEach((ing) => {
        const assignment = ing.assignedItems.find(
          (item) => item.itemId === menuItem.id
        );
        if (assignment) {
          entries.push({
            ingredientId: ing.id,
            qtyPerItem: assignment.qtyPerItem,
          });
        }
      });
      setBomEntries(entries);
      setSelectedIngredientId("");
    }
  }, [isOpen, menuItem, ingredients]);

  const handleAddIngredient = () => {
    if (!selectedIngredientId) return;

    if (bomEntries.some((e) => e.ingredientId === selectedIngredientId)) {
      return;
    }

    setBomEntries([
      ...bomEntries,
      { ingredientId: selectedIngredientId, qtyPerItem: 0 },
    ]);
    setSelectedIngredientId("");
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    setBomEntries(bomEntries.filter((e) => e.ingredientId !== ingredientId));
  };

  const handleUpdateQuantity = (ingredientId: string, qty: number) => {
    setBomEntries(
      bomEntries.map((e) =>
        e.ingredientId === ingredientId
          ? { ...e, qtyPerItem: Math.max(0, qty) }
          : e
      )
    );
  };

  const handleSave = async () => {
    if (!menuItem) return;

    try {
      setSaving(true);
      await onSave(bomEntries);
    } catch (error) {
      console.error("Save BOM error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !menuItem) return null;

  const availableIngredients = ingredients.filter(
    (ing) => !bomEntries.some((e) => e.ingredientId === ing.id)
  );

  const totalIngredientCost = bomEntries.reduce((sum, entry) => {
    const ing = ingredients.find((i) => i.id === entry.ingredientId);
    if (!ing) return sum;
    return sum + entry.qtyPerItem * ing.costPerUnit;
  }, 0);

  const grossMargin = menuItem.price - totalIngredientCost;
  const marginPercentage =
    menuItem.price > 0 ? (grossMargin / menuItem.price) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
        onClick={!saving ? onClose : undefined}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Bill of Materials
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Ingredients for {menuItem.name}
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={saving}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {/* Add Ingredient */}
            <div className="flex gap-2">
              <select
                value={selectedIngredientId}
                onChange={(e) => setSelectedIngredientId(e.target.value)}
                disabled={saving}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
              >
                <option value="">Select Ingredient</option>
                {availableIngredients.map((ing) => (
                  <option key={ing.id} value={ing.id}>
                    {ing.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddIngredient}
                disabled={!selectedIngredientId || saving}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {/* BOM List */}
            {bomEntries.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No ingredients assigned yet
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Ingredient
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Stock
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Qty/Item
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Cost
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bomEntries.map((entry) => {
                      const ing = ingredients.find(
                        (i) => i.id === entry.ingredientId
                      );
                      if (!ing) return null;

                      const cost = entry.qtyPerItem * ing.costPerUnit;
                      const isInsufficient =
                        ing.stockQuantity < entry.qtyPerItem;

                      return (
                        <tr
                          key={entry.ingredientId}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-4 py-3">
                            <div className="text-sm text-gray-900">
                              {ing.name}
                            </div>
                            {isInsufficient && (
                              <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                                <AlertTriangle className="w-3 h-3" />
                                Insufficient Stock
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {ing.stockQuantity} {ing.unit}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={entry.qtyPerItem}
                                onChange={(e) =>
                                  handleUpdateQuantity(
                                    entry.ingredientId,
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                disabled={saving}
                                className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                              />
                              <span className="text-sm text-gray-600">
                                {ing.unit}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            ${cost.toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() =>
                                handleRemoveIngredient(entry.ingredientId)
                              }
                              disabled={saving}
                              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Cost Summary */}
            {bomEntries.length > 0 && (
              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Total Ingredient Cost:</span>
                  <span className="font-medium text-gray-900">
                    ${totalIngredientCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Item Price:</span>
                  <span className="font-medium text-gray-900">
                    ${menuItem.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="font-medium text-gray-900">
                    Gross Margin:
                  </span>
                  <span
                    className={`font-semibold ${
                      grossMargin >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ${grossMargin.toFixed(2)} ({marginPercentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
            <button
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
