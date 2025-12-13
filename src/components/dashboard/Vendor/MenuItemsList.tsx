import { MenuItem } from "@/types";
import { MenuItemRow } from "./MenuItemRow";

interface MenuItemsListProps {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    status: string;
  }[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onSimulateOrder: (id: string) => void;
  onRestock: (id: string, quantity?: number) => void;
  selectedItems: Set<string>;
  onToggleSelection: (id: string) => void;
  onManageIngredients?: (item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    status: string;
  }) => void;
}

export function MenuItemsList({
  items,
  onUpdateQuantity,
  onSimulateOrder,
  onRestock,
  selectedItems,
  onToggleSelection,
  onManageIngredients,
}: MenuItemsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="col-span-1 flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500 checked:bg-white focus:bg-white hover:bg-white"
            style={{ backgroundColor: "white" }}
            onChange={(e) => {
              if (e.target.checked) {
                items.forEach((item) => onToggleSelection(item.id));
              } else {
                items.forEach((item) => {
                  if (selectedItems.has(item.id)) {
                    onToggleSelection(item.id);
                  }
                });
              }
            }}
            checked={
              items.length > 0 &&
              items.every((item) => selectedItems.has(item.id))
            }
          />
        </div>
        <div className="col-span-3 text-sm text-gray-600">Item Name</div>
        <div className="col-span-2 text-sm text-gray-600">Category</div>
        <div className="col-span-1 text-sm text-gray-600">Price</div>
        <div className="col-span-1 text-sm text-gray-600">Status</div>
        <div className="col-span-3 text-sm text-gray-600">
          Available Quantity
        </div>
        <div className="col-span-1 text-sm text-gray-600">Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <MenuItemRow
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onSimulateOrder={onSimulateOrder}
            onRestock={onRestock}
            isSelected={selectedItems.has(item.id)}
            onToggleSelection={onToggleSelection}
            onManageIngredients={onManageIngredients}
          />
        ))}
      </div>
    </div>
  );
}
