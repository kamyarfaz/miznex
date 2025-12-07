import { CardContent } from "@/components/ui/card";
import { MenuItem } from "@/types/main/menu";
import MenuItemsGrid from "./MenuItemsGrid";
import { ItemCategoryKDS } from "@/types";

interface MenuContentProps {
  selectedCategory: ItemCategoryKDS | "all";
  items: MenuItem[] | undefined;
  addItem: (item: MenuItem) => void;
  selectedItems: Map<
    string,
    { item: MenuItem; quantity: number; note: string }
  >;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<ItemCategoryKDS | "all">
  >;
}

const MenuContent = ({
  selectedCategory,
  setSelectedCategory,
  items,
  addItem,
  selectedItems,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: MenuContentProps) => {
  return (
    <CardContent className="p-5 md:p-6">
      {/* Menu Items Grid with Infinite Scroll */}
      <MenuItemsGrid
        setSelectedCategory={setSelectedCategory}
        items={items}
        selectedCategory={selectedCategory}
        addItem={addItem}
        selectedItems={selectedItems}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </CardContent>
  );
};
export default MenuContent;
