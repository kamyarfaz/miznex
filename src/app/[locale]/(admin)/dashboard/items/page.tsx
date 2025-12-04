"use client";
import { DataTable } from "@/app/[locale]/(admin)/components/common/DataTable";
import { useState, useMemo } from "react";
import { ShoppingBag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetItemsAdmin } from "@/services";
import dynamic from "next/dynamic";
import { useDebounce } from "use-debounce";
import { columns } from "./columns";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";

const ItemFormModal = dynamic(
  () => import("@/app/[locale]/(admin)/dashboard/items/add-and-edit-modal"),
  { ssr: false }
);

const items = [
  {
    id: "item-001",
    title: "Margherita Pizza",
    ingredients: ["Tomato", "Mozzarella", "Basil"],
    description: "Classic Italian pizza with fresh mozzarella and basil.",
    price: 12.99,
    discount: 10,
    quantity: 1,
    rate: 4.7,
    rate_count: 256,
    createdAt: "2025-07-15T12:30:00Z",
    category: {
      title: "Pizza",
    },
    images: [
      {
        image: "https://example.com/images/pizza1.jpg",
        imageUrl: "https://example.com/images/pizza1.jpg",
      },
      {
        image: "https://example.com/images/pizza2.jpg",
        imageUrl: "https://example.com/images/pizza2.jpg",
      },
    ],
    isFav: true,
  },
  {
    id: "item-002",
    title: "Beef Burger Deluxe",
    ingredients: ["Beef Patty", "Cheddar", "Lettuce", "Tomato", "Bun"],
    description:
      "Juicy grilled beef burger with melted cheddar and fresh veggies.",
    price: 15.5,
    discount: 5,
    quantity: 1,
    rate: 4.5,
    rate_count: 180,
    createdAt: "2025-06-30T09:00:00Z",
    category: {
      title: "Burgers",
    },
    images: [
      {
        image: "https://example.com/images/burger1.jpg",
        imageUrl: "https://example.com/images/burger1.jpg",
      },
    ],
    isFav: false,
  },
  {
    id: "item-003",
    title: "Vegan Smoothie Bowl",
    ingredients: ["Banana", "Berries", "Coconut", "Chia Seeds"],
    description:
      "A refreshing smoothie bowl packed with nutrients and antioxidants.",
    price: 9.99,
    discount: 0,
    quantity: 1,
    rate: 4.8,
    rate_count: 340,
    createdAt: "2025-08-01T08:00:00Z",
    category: {
      title: "Smoothies",
    },
    images: [
      {
        image: "https://example.com/images/smoothie1.jpg",
        imageUrl: "https://example.com/images/smoothie1.jpg",
      },
    ],
    isFav: false,
  },
  {
    id: "item-004",
    title: "Caesar Salad",
    ingredients: ["Lettuce", "Parmesan", "Croutons", "Chicken"],
    description:
      "Crispy Caesar salad with grilled chicken and creamy dressing.",
    price: 11.5,
    discount: 0,
    quantity: 1,
    rate: 4.4,
    rate_count: 150,
    createdAt: "2025-09-05T11:20:00Z",
    category: {
      title: "Salads",
    },
    images: [
      {
        image: "https://example.com/images/salad1.jpg",
        imageUrl: "https://example.com/images/salad1.jpg",
      },
    ],
    isFav: true,
  },
  {
    id: "item-005",
    title: "Iced Latte",
    ingredients: ["Espresso", "Milk", "Ice"],
    description: "Smooth iced latte with a rich espresso flavor.",
    price: 5.5,
    discount: 0,
    quantity: 1,
    rate: 4.8,
    rate_count: 200,
    createdAt: "2025-06-30T09:00:00Z",
    category: {
      title: "Drinks",
    },
    images: [
      {
        image: "https://example.com/images/latte.jpg",
        imageUrl: "https://example.com/images/latte.jpg",
      },
    ],
    isFav: false,
  },
];

export default function Items() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [debouncedSearch] = useDebounce(search, 500);

  const [sortBy, setSortBy] = useState<string>("newest");
  const {
    items: mocked,
    isLoading,
    total,
  } = useGetItemsAdmin({
    page: currentPage,
    limit: currentLimit,
    search: debouncedSearch,
    sortBy: sortBy,
  });

  const headerProps = useMemo(
    () => ({
      title: "مدیریت محصولات",
      icon: <ShoppingBag size={30} />,
      showColumnVisibility: true,
      actions: (
        <>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="مرتب‌سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="lowestPrice">قیمت پایین‌ترین</SelectItem>
                <SelectItem value="highestPrice">قیمت بالاترین</SelectItem>
                <SelectItem value="highestDiscount">تخفیف بالاترین</SelectItem>
                <SelectItem value="topRated">امتیاز بالاترین</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => {
              setEditingItem(null);
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus size={20} className="ml-2" />
            افزودن محصول
          </Button>
        </>
      ),
    }),
    [sortBy]
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <DataTable
        data={items}
        columns={columns({
          currentPage,
          currentLimit,
          setEditingItem,
          setIsModalOpen,
        })}
        isLoading={false}
        headerProps={headerProps}
        emptyStateMessage="هیچ محصولی یافت نشد"
        emptyStateDescription="برای افزودن محصول، روی دکمه افزودن کلیک کنید"
        enablePagination={true}
        page={currentPage}
        limit={currentLimit}
        totalCount={total}
        onPageChange={setCurrentPage}
        onLimitChange={(limit) => {
          setCurrentLimit(limit);
          setCurrentPage(1);
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        enableSearch={true}
        searchValue={search}
        onSearchChange={setSearch}
      />

      <ItemFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={editingItem}
      />
    </div>
  );
}
