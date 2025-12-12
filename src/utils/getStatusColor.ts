import { OrderStatusKDS } from "@/types";

export const statusColors: Record<OrderStatusKDS, string> = {
  pending: "bg-orange-500 text-white", // waiting
  processing: "bg-yellow-500 text-black", // in progress
  delivered: "bg-blue-500 text-white", // shipped / delivered
  done: "bg-green-600 text-white", // fully completed
  refunded: "bg-purple-500 text-white", // money returned
  cancelled: "bg-gray-500 text-white", // canceled (UK spelling)
  canceled: "bg-gray-500 text-white", // canceled (US spelling)
  failed: "bg-red-600 text-white", // error
};