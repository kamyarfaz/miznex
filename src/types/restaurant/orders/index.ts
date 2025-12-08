export type OrderStatusKDS =
  | "pending"
  | "processing"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "done"
  | "failed"
  | "canceled";

export interface ItemCategoryKDS {
  id: string;
  title: string;
  image: string;
  imageUrl: string;
  show: boolean;
}

export interface OrderItemKDS {
  menuItemId: string;
  count: number;
  note?: string;
}

export interface CreateOrderKDS {
  items: OrderItemKDS[];
  tableNumber: number;
  note?: string;
}

interface MenuItemImage {
  id: string;
  imageUrl: string;
}

interface MenuItem {
  id: string;
  title: string;
  categoryTitle: string;
  images: MenuItemImage[];
}

interface OrderItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: OrderStatusKDS
  unitPrice: number;
  note?: string;
  menuItem: MenuItem;
}

export interface OrderKDS {
  id: string;
  orderNumber: number;
  status: OrderStatusKDS
  note?: string;
  notes?: string;
  totalAmount: number;
  paymentAmount: number;
  discountAmount: number;
  tableNumber: string;
  createdAt: string;
  updatedAt: string;
  waiterName: string;
  user: any;
  items: OrderItem[];
}