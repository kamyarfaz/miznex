export type Unit = "g" | "kg" | "ml" | "L" | "piece" | "pack";

export interface Supplier {
  id: string;
  name: string;
  leadTimeDays: number;
  contact: string;
}

export interface AssignedItem {
  itemId: string;
  itemName: string;
  qtyPerItem: number;
  unit: Unit;
}

export interface AuditEntry {
  id: string;
  timestamp: number;
  action:
    | "created"
    | "updated"
    | "restocked"
    | "consumed"
    | "assigned"
    | "unassigned";
  user: string;
  changes: string;
  previousValue?: number;
  newValue?: number;
}

export interface Ingredient {
  id: string;
  name: string;
  sku?: string;
  unit: Unit;
  stockQuantity: number;
  minThreshold: number;
  costPerUnit: number;
  suppliers: Supplier[];
  assignedItems: AssignedItem[];
  lastUpdated: number;
  auditHistory: AuditEntry[];
  isActive: boolean;
  isSharedAcrossItems: boolean;
  notes?: string;
}

export interface BOMAssignment {
  itemId: string;
  itemName: string;
  ingredientId: string;
  ingredientName: string;
  qtyPerItem: number;
  unit: Unit;
  conversionFactor?: number;
}

export type StockStatusVendor = "ok" | "low" | "out";

// Unit conversion helpers
export const UNIT_CONVERSIONS: Record<string, number> = {
  "g-kg": 1000,
  "kg-g": 0.001,
  "ml-L": 1000,
  "L-ml": 0.001,
};

export function convertUnit(
  value: number,
  fromUnit: Unit,
  toUnit: Unit
): number {
  const key = `${fromUnit}-${toUnit}`;
  const factor = UNIT_CONVERSIONS[key];
  return factor ? value * factor : value;
}

export function getStockStatus(ingredient: Ingredient): StockStatusVendor {
  if (ingredient.stockQuantity === 0) return "out";
  if (ingredient.stockQuantity <= ingredient.minThreshold) return "low";
  return "ok";
}

export function calculateDaysUntilOut(
  stockQuantity: number,
  averageDailyUsage: number
): number {
  if (averageDailyUsage === 0) return Infinity;
  return Math.floor(stockQuantity / averageDailyUsage);
}
