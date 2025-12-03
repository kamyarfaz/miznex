import { CardHeader, CardTitle } from "@/components/ui/card";
import { MenuItem } from "@/types";

interface OrderSummaryHeaderProps {
  selectedItems: Map<
    string,
    { item: MenuItem; quantity: number; notes: string }
  >;
}

const OrderSummaryHeader = ({ selectedItems }: OrderSummaryHeaderProps) => {
  return (
    <CardHeader className="pb-4 border-b bg-gradient-to-r from-gray-50 to-white pt-10">
      <div className="flex items-center justify-between">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
          Current Order
          <span className="text-sm font-normal bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {selectedItems.size} {selectedItems.size === 1 ? "item" : "items"}
          </span>
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
          <svg
            className="h-4 w-4 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
      </div>
    </CardHeader>
  );
};
export default OrderSummaryHeader;
