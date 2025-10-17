"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useGetItems } from "@/services";
import { getMenuQueryParams } from "@/utils/queryParams";
import { SearchBar } from "./filters/SearchBar";
import { MenuControls } from "./filters/MenuControls";
import { EmptyState, MenuGrid, MenuPagination } from ".";
import { useMenuFilters } from "@/hooks/business/useMenuFilters";
import { MenuItem, MenuItemResponse } from "@/types/main/menu";

const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    title: "Margherita Pizza",
    ingredients: ["Tomato", "Mozzarella", "Basil"],
    description: "Classic Italian pizza with fresh mozzarella and basil.",
    price: 12.99,
    discount: 0,
    quantity: 50,
    rate: 4.5,
    rate_count: 120,
    createdAt: new Date("2025-01-15T10:00:00Z"),
    category: {
      title: "Pizza",
    },
    images: [
      { image: "margherita1.jpg", imageUrl: "https://example.com/margherita1.jpg" },
      { image: "margherita2.jpg", imageUrl: "https://example.com/margherita2.jpg" },
    ],
    isFav: true,
  },
  {
    id: "2",
    title: "Caesar Salad",
    ingredients: ["Romaine Lettuce", "Parmesan", "Croutons", "Caesar Dressing"],
    description: "Crisp romaine lettuce with creamy Caesar dressing and croutons.",
    price: 8.5,
    discount: 1,
    quantity: 30,
    rate: 4.2,
    rate_count: 80,
    createdAt: new Date("2025-02-10T12:30:00Z"),
    category: {
      title: "Salad",
    },
    images: [
      { image: "caesar1.jpg", imageUrl: "https://example.com/caesar1.jpg" },
    ],
    isFav: false,
  },
  {
    id: "3",
    title: "Chocolate Brownie",
    ingredients: ["Cocoa", "Sugar", "Butter", "Eggs", "Flour"],
    description: "Rich and fudgy chocolate brownie topped with nuts.",
    price: 4.99,
    discount: 0.5,
    quantity: 100,
    rate: 4.8,
    rate_count: 200,
    createdAt: new Date("2025-03-05T15:45:00Z"),
    category: {
      title: "Dessert",
    },
    images: [
      { image: "brownie1.jpg", imageUrl: "https://example.com/brownie1.jpg" },
      { image: "brownie2.jpg", imageUrl: "https://example.com/brownie2.jpg" },
    ],
    isFav: true,
  },
];

const mockMenuItemResponse: MenuItemResponse = {
  data: {
    items: mockMenuItems,
    total: mockMenuItems.length,
    page: 1,
    limit: 10,
  },
};

const MenuFiltersSidebar = dynamic(
  () => import("./filters/MenuFiltersSidebar"),
  {
    ssr: false,
  }
);

export default function Menus({
  initialData,
}: {
  initialData: MenuItemResponse;
}) {
  const searchParams = useSearchParams();
  const { queryString } = getMenuQueryParams(searchParams);

  const { data: items } = useGetItems(queryString, mockMenuItemResponse);

  const {
    viewMode,
    input,
    setInput,
    selectedSortBy,
    pageParam,
    limitParam,
    handleSortChange,
    handleViewModeChange,
    goToPage,
    clearFilters,
  } = useMenuFilters();

  const itemsList = items?.data?.items || [];
  const totalParam = Number(items?.data?.total || 0);
  const totalPages = Math.max(1, Math.ceil(totalParam / limitParam));
  const currentPage = pageParam;

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar input={input} setInput={setInput} />

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="h-full shrink-0">
          <MenuFiltersSidebar />
        </div>

        <div className="flex-1">
          <MenuControls
            selectedSortBy={selectedSortBy}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onClearFilters={clearFilters}
          />

          {itemsList?.length > 0 ? (
            <MenuGrid items={itemsList} viewMode={viewMode} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {itemsList && itemsList?.length > 0 && (
        <MenuPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
}
