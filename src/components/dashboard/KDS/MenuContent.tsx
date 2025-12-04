import { CardContent } from "@/components/ui/card";
import { MenuItem } from "@/types/main/menu";
import { Category } from "@/types/restaurant";
import CategoryCard from "./CategoryCard";
import MenuItemsGrid from "./MenuItemsGrid";

interface MenuContentProps {
  selectedCategory: string;
  items: MenuItem[] | undefined;
  addItem: (item: MenuItem) => void;
  selectedItems: Map<
    string,
    { item: MenuItem; quantity: number; notes: string }
  >;
  total: number | undefined;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

const MenuContent = ({
  total,
  selectedCategory,
  items,
  addItem,
  selectedItems,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: MenuContentProps) => {
  return (
    <CardContent className="p-5 md:p-6">
      {/* Category Header with Stats */}
      {selectedCategory !== "all" && (
        <CategoryCard selectedCategory={selectedCategory} />
      )}

      {/* Menu Items Grid with Infinite Scroll */}
      <MenuItemsGrid
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