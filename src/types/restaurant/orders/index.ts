export type OrderStatusKDS = "new" | "in-progress" | "ready" | "completed";

export enum Category {
  GRILL = "grill",
  SALAD = "salad",
  DRINKS = "drinks",
  DESSERT = "dessert",
  APPETIZER = "appetizer",
}

export interface ItemCategoryKDS {
  id: string;
  title: Category;
  image: string;
  imageUrl: string;
  show: boolean;
}

export interface OrderItemKDS {
  menuItemId: string;
  count: number;
  note?: string;
}

export interface OrderKDS {
  items: OrderItemKDS[];
  tableNumber: number;
  note?: string;
}
