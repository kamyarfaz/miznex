export type OrderStatusKDS = 'new' | 'in-progress' | 'ready' | 'completed';
export type ItemCategoryKDS = 'grill' | 'salad' | 'drinks' | 'dessert' | 'appetizer';

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
  waiterName: string;
  tableNumber: string;
  notes?: string;
}
