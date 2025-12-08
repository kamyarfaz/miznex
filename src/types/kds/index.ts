export interface Notification {
  id: string;
  type: "new-order" | "order-ready";
  message: string;
}