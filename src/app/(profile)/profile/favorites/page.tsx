"use client";

import { useState, useEffect } from "react";
import { useGetFavorites } from "@/services";
import { FavoritesSkeleton } from "@/components/skeleton";
import { GetFavoritesParams } from "@/types/Profile";

import {
  FavoriteCard,
  FavoriteHeader,
  EmptyState,
  FilterAndPagination,
  FavoriteFooter,
} from "@/components/profile/favorites";

import { FavoriteItem } from "@/types/Profile";
import { MotionAnimatePresence } from "@/utils/MotionWrapper";

const favoritesData = [
  {
    id: "fav-001",
    isAvailable: true,
    item: {
      id: "item-101",
      title: "Margherita Pizza",
      ingredients: ["Tomato", "Mozzarella", "Basil"],
      description: "Classic Italian pizza with fresh mozzarella and basil.",
      price: 12.99,
      discount: 10,
      quantity: 1,
      rate: 4.7,
      rate_count: 256,
      show: true,
      createdAt: "2025-09-20T13:45:00Z",
    },
  },
  {
    id: "fav-002",
    isAvailable: true,
    item: {
      id: "item-102",
      title: "Beef Burger Deluxe",
      ingredients: ["Beef Patty", "Cheddar", "Lettuce", "Tomato", "Bun"],
      description:
        "Juicy grilled beef burger with melted cheddar and fresh veggies.",
      price: 15.5,
      discount: 5,
      quantity: 1,
      rate: 4.5,
      rate_count: 180,
      show: true,
      createdAt: "2025-09-18T10:10:00Z",
    },
  },
  {
    id: "fav-003",
    isAvailable: false,
    item: {
      id: "item-103",
      title: "Vegan Smoothie Bowl",
      ingredients: ["Banana", "Berries", "Coconut", "Chia Seeds"],
      description:
        "A refreshing smoothie bowl packed with nutrients and antioxidants.",
      price: 9.99,
      discount: 0,
      quantity: 1,
      rate: 4.8,
      rate_count: 340,
      show: true,
      createdAt: "2025-08-30T08:30:00Z",
    },
  },
];

export default function FavoritesPage() {
  const [filters, setFilters] = useState<GetFavoritesParams>({
    page: 1,
    limit: 6,
  });

  const handleFilterChange = (
    key: keyof GetFavoritesParams,
    value?: string | number
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  };

  const {
    data: mockedFavoritesData,
    isLoading,
    total,
    page,
    limit,
  } = useGetFavorites(filters);

  const totalPages = Math?.max(1, Math?.ceil(total / limit));
  const currentPage = page;

  useEffect(() => {
    if (
      !isLoading &&
      favoritesData?.length === 0 &&
      currentPage > 1 &&
      total > 0
    ) {
      handleFilterChange("page", currentPage - 1);
    }
  }, [favoritesData, currentPage, total, isLoading]);

  // if (isLoading) {
  //   return <FavoritesSkeleton />;
  // }

  if (favoritesData?.length === 0 && total === 0) {
    return <EmptyState />;
  }

  return (
    <div className="max-w-7xl mx-auto px-2 py-8 rounded-xl">
      <FavoriteHeader />

      <div className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 p-4 shadow-xl rounded-2xl">
        <MotionAnimatePresence>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {favoritesData?.map((favorite: FavoriteItem) => (
              <FavoriteCard key={favorite?.id} favorite={favorite} />
            ))}
          </div>
        </MotionAnimatePresence>

        <FilterAndPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => handleFilterChange("page", page)}
          selectedLimit={limit}
          onLimitChange={(limit) => handleFilterChange("limit", limit)}
          totalItems={total}
        />

        <FavoriteFooter />
      </div>
    </div>
  );
}
