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
  id: string;
  name: string;
  category: ItemCategoryKDS;
  quantity: number;
  notes?: string;
  status: OrderStatusKDS;
}

export interface OrderKDS {
  id: string;
  orderNumber: number;
  items: OrderItemKDS[];
  status: OrderStatusKDS;
  createdAt: Date;
  updatedAt: Date;
  tableNumber: string;
  notes?: string;
}
