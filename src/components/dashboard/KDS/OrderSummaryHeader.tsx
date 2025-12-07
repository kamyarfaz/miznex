import { CardHeader, CardTitle } from "@/components/ui/card";
import { MenuItem } from "@/types";

interface OrderSummaryHeaderProps {
  selectedItems: Map<
    string,
    { item: MenuItem; quantity: number; note: string }
  >;
}

const OrderSummaryHeader = ({ selectedItems }: OrderSummaryHeaderProps) => {
  return (
    <CardHeader className="pb-4 border-b border-gray-200 bg-gradient-to-r from-[#FFF5F2] to-white pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Current Order
          </CardTitle>
          <span className="text-sm font-medium bg-gradient-to-r from-[#FF5B35]/10 to-[#FF5B35]/5 text-[#FF5B35] px-3 py-1.5 rounded-full border border-[#FF5B35]/20">
            {selectedItems.size} {selectedItems.size === 1 ? "item" : "items"}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {selectedItems.size === 0
          ? "Add items from the menu to start an order"
          : "Review and modify items before sending to kitchen"}
      </p>
    </CardHeader>
  );
};
export default OrderSummaryHeader;
