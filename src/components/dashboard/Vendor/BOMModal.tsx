import { Ingredient } from "@/types";
import { AlertTriangle, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MenuItem } from ".";

interface BOMModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem | null;
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
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
  setIngredients,
}: BOMModalProps) {
  const [bomEntries, setBomEntries] = useState<BOMEntry[]>([]);
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>("");

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

    // Check if already added
    if (bomEntries.some((e) => e.ingredientId === selectedIngredientId)) {
      toast.error("Ingredient already added");
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

  const handleSave = () => {
    if (!menuItem) return;

    const translatedItemName = menuItem.name;

    // Update all ingredients
    const updatedIngredients = ingredients.map((ing) => {
      const entry = bomEntries.find((e) => e.ingredientId === ing.id);

      if (entry) {
        // Add or update assignment
        const existingAssignment = ing.assignedItems.find(
          (item) => item.itemId === menuItem.id
        );
        const updatedAssignedItems = existingAssignment
          ? ing.assignedItems.map((item) =>
              item.itemId === menuItem.id
                ? { ...item, qtyPerItem: entry.qtyPerItem }
                : item
            )
          : [
              ...ing.assignedItems,
              {
                itemId: menuItem.id,
                itemName: menuItem.name,
                qtyPerItem: entry.qtyPerItem,
                unit: ing.unit,
              },
            ];

        return {
          ...ing,
          assignedItems: updatedAssignedItems,
          lastUpdated: Date.now(),
          auditHistory: [
            ...ing.auditHistory,
            {
              id: `audit-${Date.now()}`,
              timestamp: Date.now(),
              action: "assigned" as const,
              user: "Current User",
              changes: `Assigned to ${translatedItemName}: ${entry.qtyPerItem} ${ing.unit}`,
            },
          ],
        };
      } else {
        // Remove assignment if exists
        const hasAssignment = ing.assignedItems.some(
          (item) => item.itemId === menuItem.id
        );
        if (hasAssignment) {
          return {
            ...ing,
            assignedItems: ing.assignedItems.filter(
              (item) => item.itemId !== menuItem.id
            ),
            lastUpdated: Date.now(),
            auditHistory: [
              ...ing.auditHistory,
              {
                id: `audit-${Date.now()}`,
                timestamp: Date.now(),
                action: "unassigned" as const,
                user: "Current User",
                changes: `Unassigned from ${translatedItemName}`,
              },
            ],
          };
        }
        return ing;
      }
    });

    setIngredients(updatedIngredients);
    toast.success("Bill of materials updated");
    onClose();
  };

  if (!isOpen || !menuItem) return null;

  const translatedItemName = menuItem.name;

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
        className="fixed inset-0 bg-[rgba(0,0,0,0.3)] bg-opacity-20 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-gray-900">Bill of Materials</h2>
              <p className="text-sm text-gray-500 mt-1">
                Ingredients for {translatedItemName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
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
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select Ingredient</option>
                {availableIngredients.map((ing) => {
                  return (
                    <option key={ing.id} value={ing.id}>
                      {ing.name}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={handleAddIngredient}
                disabled={!selectedIngredientId}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Ingredient
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
                      <th className="px-4 py-3 text-left text-sm text-gray-600">
                        Ingredient Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm text-gray-600">
                        Current Stock
                      </th>
                      <th className="px-4 py-3 text-left text-sm text-gray-600">
                        Qty/Item
                      </th>
                      <th className="px-4 py-3 text-left text-sm text-gray-600">
                        Ingredient Cost
                      </th>
                      <th className="px-4 py-3 text-left text-sm text-gray-600">
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

                      const translatedName = ing.name;
                      const translatedUnit = ing.unit;
                      const cost = entry.qtyPerItem * ing.costPerUnit;
                      const isInsufficient =
                        ing.stockQuantity < entry.qtyPerItem;

                      return (
                        <tr
                          key={entry.ingredientId}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-4 py-3">
                            <div className="text-gray-900">
                              {translatedName}
                            </div>
                            {isInsufficient && (
                              <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                                <AlertTriangle className="w-3 h-3" />
                                Insufficient Stock
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {ing.stockQuantity} {translatedUnit}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                step="0.01"
                                value={entry.qtyPerItem}
                                onChange={(e) =>
                                  handleUpdateQuantity(
                                    entry.ingredientId,
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                              />
                              <span className="text-gray-600 text-sm">
                                {translatedUnit}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-900">
                            ${cost.toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() =>
                                handleRemoveIngredient(entry.ingredientId)
                              }
                              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
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
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Total Ingredient Cost:</span>
                  <span className="text-gray-900">
                    ${totalIngredientCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Item Price:</span>
                  <span className="text-gray-900">
                    ${menuItem.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Gross Margin:</span>
                  <span
                    className={`${
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
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
