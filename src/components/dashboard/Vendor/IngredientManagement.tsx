import { useState } from "react";
import { Ingredient } from "@/types";
import { MenuItem } from "@/types/main/items";
import { IngredientsList } from "./IngredientsList";
import { IngredientFormModal } from "./IngredientFormModal";
import { RestockModal } from "./RestockModal";
import { ConsumeModal } from "./ConsumeModal";
import { BOMModal } from "./BOMModal";
import { AuditHistoryModal } from "./AuditHistoryModal";
import { Plus } from "lucide-react";
import { useIngredients } from "@/services/ingredients/useIngredients";

interface IngredientManagementProps {
  restaurantId: string;
  menuItems: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    status: string;
  }[];
}

export function IngredientManagement({
  restaurantId,
  menuItems,
}: IngredientManagementProps) {
  const {
    ingredients,
    loading,
    loadIngredients,
    createIngredient,
    updateIngredient,
    restockIngredient,
    consumeIngredient,
    assignToMenuItem,
  } = useIngredients({ restaurantId, autoLoad: true });

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [isConsumeModalOpen, setIsConsumeModalOpen] = useState(false);
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null
  );

  const handleAddIngredient = () => {
    setSelectedIngredient(null);
    setIsFormModalOpen(true);
  };

  const handleEditIngredient = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setIsFormModalOpen(true);
  };

  const handleSaveIngredient = async (ingredient: Partial<Ingredient>) => {
    try {
      if (ingredient.id) {
        // Update existing
        await updateIngredient(ingredient.id, ingredient);
      } else {
        // Create new
        await createIngredient(ingredient as any);
      }
      setIsFormModalOpen(false);
    } catch (error) {
      // Error already handled in hook with toast
      console.error("Save ingredient error:", error);
    }
  };

  const handleRestock = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setIsRestockModalOpen(true);
  };

  const handleConfirmRestock = async (
    quantity: number,
    supplier?: string,
    receiptNumber?: string
  ) => {
    if (!selectedIngredient) return;

    try {
      await restockIngredient(selectedIngredient.id, {
        quantity,
        supplier,
        receiptNumber,
      });
      setIsRestockModalOpen(false);
    } catch (error) {
      console.error("Restock error:", error);
    }
  };

  const handleConsume = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setIsConsumeModalOpen(true);
  };

  const handleConfirmConsume = async (quantity: number, reason: string) => {
    if (!selectedIngredient) return;

    try {
      await consumeIngredient(selectedIngredient.id, { quantity, reason });
      setIsConsumeModalOpen(false);
    } catch (error) {
      console.error("Consume error:", error);
    }
  };

  const handleManageBOM = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    setIsBOMModalOpen(true);
  };

  const handleSaveBOM = async (
    assignments: Array<{ ingredientId: string; qtyPerItem: number }>
  ) => {
    if (!selectedMenuItem) return;

    try {
      await assignToMenuItem(selectedMenuItem.id, { assignments });
      setIsBOMModalOpen(false);
    } catch (error) {
      console.error("Save BOM error:", error);
    }
  };

  const handleViewAudit = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setIsAuditModalOpen(true);
  };

  if (loading && ingredients.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <span className="ml-3 text-gray-500">Loading ingredients...</span>
      </div>
    );
  }

  return (
    <div>
      {/* Header with Add Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 text-xl font-semibold">Ingredients</h2>
          <p className="text-sm text-gray-500 mt-1">
            {ingredients.length}{" "}
            {ingredients.length === 1 ? "ingredient" : "ingredients"}
          </p>
        </div>
        <button
          onClick={handleAddIngredient}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Ingredient
        </button>
      </div>

      {/* Ingredients List */}
      <IngredientsList
        ingredients={ingredients}
        onEdit={handleEditIngredient}
        onRestock={handleRestock}
        onConsume={handleConsume}
        onViewAudit={handleViewAudit}
        onManageBOM={handleManageBOM}
        menuItems={menuItems}
        onRefresh={loadIngredients}
      />

      {/* Modals */}
      <IngredientFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        ingredient={selectedIngredient}
        onSave={handleSaveIngredient}
      />

      <RestockModal
        isOpen={isRestockModalOpen}
        onClose={() => setIsRestockModalOpen(false)}
        ingredient={selectedIngredient}
        onConfirm={handleConfirmRestock}
      />

      <ConsumeModal
        isOpen={isConsumeModalOpen}
        onClose={() => setIsConsumeModalOpen(false)}
        ingredient={selectedIngredient}
        onConfirm={handleConfirmConsume}
      />

      <BOMModal
        isOpen={isBOMModalOpen}
        onClose={() => setIsBOMModalOpen(false)}
        menuItem={selectedMenuItem}
        ingredients={ingredients}
        onSave={handleSaveBOM}
      />

      <AuditHistoryModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        ingredient={selectedIngredient}
      />
    </div>
  );
}
