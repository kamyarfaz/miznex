// src/types/ingredient.types.ts

export type Unit = "g" | "kg" | "ml" | "L" | "piece" | "pack";

export type IngredientAuditAction =
  | "created"
  | "updated"
  | "restocked"
  | "consumed"
  | "assigned"
  | "unassigned";

export interface Supplier {
  id: string;
  name: string;
  leadTimeDays: number;
  contact?: string;
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
  action: IngredientAuditAction;
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
  isActive: boolean;
  isSharedAcrossItems: boolean;
  notes?: string;
  suppliers: Supplier[];
  assignedItems: AssignedItem[];
  auditHistory: AuditEntry[];
  lastUpdated: number;
  createdAt: string;
}

// DTOs
export interface CreateIngredientDto {
  restaurantId: string;
  name: string;
  sku?: string;
  unit: Unit;
  stockQuantity: number;
  minThreshold: number;
  costPerUnit: number;
  isActive?: boolean;
  isSharedAcrossItems?: boolean;
  notes?: string;
  suppliers?: Omit<Supplier, "id">[];
}

export interface UpdateIngredientDto {
  name?: string;
  sku?: string;
  unit?: Unit;
  stockQuantity?: number;
  minThreshold?: number;
  costPerUnit?: number;
  isActive?: boolean;
  isSharedAcrossItems?: boolean;
  notes?: string;
  suppliers?: Omit<Supplier, "id">[];
}

export interface RestockIngredientDto {
  quantity: number;
  supplier?: string;
  receiptNumber?: string;
}

export interface ConsumeIngredientDto {
  quantity: number;
  reason: string;
}

export interface AssignmentEntry {
  ingredientId: string;
  qtyPerItem: number;
}

export interface AssignIngredientsDto {
  assignments: AssignmentEntry[];
}

export interface QueryIngredientDto {
  search?: string;
  status?: "all" | "ok" | "low" | "out";
  page?: string;
  limit?: string;
}

export interface PaginatedResponse<T> {
  data: { ingredients: T[]; totalCount: number; page: number; limit: number };
}

// Helper function
export function getStockStatus(ingredient: Ingredient): "ok" | "low" | "out" {
  if (ingredient.stockQuantity <= 0) return "out";
  if (ingredient.stockQuantity <= ingredient.minThreshold) return "low";
  return "ok";
}
