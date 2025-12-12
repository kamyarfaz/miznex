import { useState, useEffect } from "react";
import { Ingredient } from "@/types";
import { MenuItem } from ".";
import { IngredientsList } from "./IngredientsList";
import { IngredientFormModal } from "./IngredientFormModal";
import { RestockModal } from "./RestockModal";
import { ConsumeModal } from "./ConsumeModal";
import { BOMModal } from "./BOMModal";
import { AuditHistoryModal } from "./AuditHistoryModal";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface IngredientManagementProps {
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
  menuItems: MenuItem[];
}

// Sample initial ingredients data
const initialIngredients: Ingredient[] = [
  {
    id: "1",
    name: "Red Beef",
    sku: "BEEF-001",
    unit: "kg",
    stockQuantity: 25.5,
    minThreshold: 10,
    costPerUnit: 12.5,
    suppliers: [
      {
        id: "s1",
        name: "Premium Meats Co.",
        leadTimeDays: 2,
        contact: "+1-555-0101",
      },
    ],
    assignedItems: [
      { itemId: "1", itemName: "Classic Burger", qtyPerItem: 0.15, unit: "kg" },
    ],
    lastUpdated: Date.now(),
    auditHistory: [
      {
        id: "a1",
        timestamp: Date.now(),
        action: "created",
        user: "Admin",
        changes: "Initial creation",
      },
    ],
    isActive: true,
    isSharedAcrossItems: true,
  },
  {
    id: "2",
    name: "Lettuce",
    sku: "VEG-002",
    unit: "kg",
    stockQuantity: 3.2,
    minThreshold: 5,
    costPerUnit: 2.8,
    suppliers: [
      { id: "s2", name: "Fresh Farm", leadTimeDays: 1, contact: "+1-555-0102" },
    ],
    assignedItems: [
      { itemId: "1", itemName: "Classic Burger", qtyPerItem: 0.03, unit: "kg" },
      { itemId: "3", itemName: "Caesar Salad", qtyPerItem: 0.15, unit: "kg" },
    ],
    lastUpdated: Date.now(),
    auditHistory: [
      {
        id: "a2",
        timestamp: Date.now(),
        action: "created",
        user: "Admin",
        changes: "Initial creation",
      },
    ],
    isActive: true,
    isSharedAcrossItems: true,
  },
  {
    id: "3",
    name: "Tomato",
    sku: "VEG-003",
    unit: "kg",
    stockQuantity: 0,
    minThreshold: 3,
    costPerUnit: 3.2,
    suppliers: [
      { id: "s2", name: "Fresh Farm", leadTimeDays: 1, contact: "+1-555-0102" },
    ],
    assignedItems: [
      { itemId: "1", itemName: "Classic Burger", qtyPerItem: 0.02, unit: "kg" },
      {
        itemId: "2",
        itemName: "Margherita Pizza",
        qtyPerItem: 0.08,
        unit: "kg",
      },
    ],
    lastUpdated: Date.now(),
    auditHistory: [
      {
        id: "a3",
        timestamp: Date.now(),
        action: "created",
        user: "Admin",
        changes: "Initial creation",
      },
    ],
    isActive: true,
    isSharedAcrossItems: true,
  },
  {
    id: "4",
    name: "Mozzarella",
    sku: "CHEESE-004",
    unit: "kg",
    stockQuantity: 12.0,
    minThreshold: 5,
    costPerUnit: 8.5,
    suppliers: [
      {
        id: "s3",
        name: "Dairy Delights",
        leadTimeDays: 3,
        contact: "+1-555-0103",
      },
    ],
    assignedItems: [
      {
        itemId: "2",
        itemName: "Margherita Pizza",
        qtyPerItem: 0.12,
        unit: "kg",
      },
    ],
    lastUpdated: Date.now(),
    auditHistory: [
      {
        id: "a4",
        timestamp: Date.now(),
        action: "created",
        user: "Admin",
        changes: "Initial creation",
      },
    ],
    isActive: true,
    isSharedAcrossItems: false,
  },
];

export function IngredientManagement({
  ingredients,
  setIngredients,
  menuItems,
}: IngredientManagementProps) {
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

  // Initialize with sample data if empty
  useEffect(() => {
    if (ingredients.length === 0) {
      setIngredients(initialIngredients);
    }
  }, []);

  const handleAddIngredient = () => {
    setSelectedIngredient(null);
    setIsFormModalOpen(true);
  };

  const handleEditIngredient = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setIsFormModalOpen(true);
  };

  const handleSaveIngredient = (ingredient: Ingredient) => {
    const now = Date.now();
    const isNew = !ingredient.id;

    const updatedIngredient: Ingredient = {
      ...ingredient,
      id: ingredient.id || `ing-${Date.now()}`,
      lastUpdated: now,
      auditHistory: [
        ...ingredient.auditHistory,
        {
          id: `audit-${now}`,
          timestamp: now,
          action: isNew ? "created" : "updated",
          user: "Current User",
          changes: isNew ? "Created ingredient" : "Updated ingredient details",
        },
      ],
    };

    if (isNew) {
      setIngredients([...ingredients, updatedIngredient]);
      toast.success("Ingredient added successfully");
    } else {
      setIngredients(
        ingredients.map((ing) =>
          ing.id === updatedIngredient.id ? updatedIngredient : ing
        )
      );
      toast.success("Ingredient updated successfully");
    }

    setIsFormModalOpen(false);
  };

  const handleRestock = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setIsRestockModalOpen(true);
  };

  const handleConfirmRestock = (
    quantity: number,
    supplier?: string,
    receiptNumber?: string
  ) => {
    if (!selectedIngredient) return;

    const now = Date.now();
    const updatedIngredient: Ingredient = {
      ...selectedIngredient,
      stockQuantity: selectedIngredient.stockQuantity + quantity,
      lastUpdated: now,
      auditHistory: [
        ...selectedIngredient.auditHistory,
        {
          id: `audit-${now}`,
          timestamp: now,
          action: "restocked",
          user: "Current User",
          changes: `Restocked +${quantity} ${selectedIngredient.unit}${
            supplier ? ` from ${supplier}` : ""
          }${receiptNumber ? `, Receipt: ${receiptNumber}` : ""}`,
          previousValue: selectedIngredient.stockQuantity,
          newValue: selectedIngredient.stockQuantity + quantity,
        },
      ],
    };

    setIngredients(
      ingredients.map((ing) =>
        ing.id === updatedIngredient.id ? updatedIngredient : ing
      )
    );

    toast.success("Ingredient restocked", {
      description: `+${quantity} ${selectedIngredient.unit}`,
    });

    setIsRestockModalOpen(false);
  };

  const handleConsume = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setIsConsumeModalOpen(true);
  };

  const handleConfirmConsume = (quantity: number, reason: string) => {
    if (!selectedIngredient) return;

    const now = Date.now();
    const newQuantity = Math.max(
      0,
      selectedIngredient.stockQuantity - quantity
    );

    const updatedIngredient: Ingredient = {
      ...selectedIngredient,
      stockQuantity: newQuantity,
      lastUpdated: now,
      auditHistory: [
        ...selectedIngredient.auditHistory,
        {
          id: `audit-${now}`,
          timestamp: now,
          action: "consumed",
          user: "Current User",
          changes: `Consumed -${quantity} ${selectedIngredient.unit}. Reason: ${reason}`,
          previousValue: selectedIngredient.stockQuantity,
          newValue: newQuantity,
        },
      ],
    };

    setIngredients(
      ingredients.map((ing) =>
        ing.id === updatedIngredient.id ? updatedIngredient : ing
      )
    );

    toast.success("Ingredient consumed", {
      description: `-${quantity} ${selectedIngredient.unit}`,
    });

    setIsConsumeModalOpen(false);
  };

  const handleManageBOM = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    setIsBOMModalOpen(true);
  };

  const handleViewAudit = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setIsAuditModalOpen(true);
  };

  return (
    <div>
      {/* Header with Add Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900">Ingredients</h2>
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
        setIngredients={setIngredients}
      />

      <AuditHistoryModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        ingredient={selectedIngredient}
      />
    </div>
  );
}
