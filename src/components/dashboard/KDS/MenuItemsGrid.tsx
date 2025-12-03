import { MenuItem } from "@/types";
import { Category } from "@/types/restaurant";
import { getCategoryIcon } from "@/utils/GetCategoryIcon";
import { Plus, Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface MenuItemsGridProps {
  items: MenuItem[] | undefined;
  selectedCategory: Category | "all";
  addItem: (item: MenuItem) => void;
  selectedItems: Map<string, { quantity: number }>;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

// Skeleton loader component for smooth loading experience
const ItemSkeleton = () => (
  <div className="h-full border rounded-2xl overflow-hidden bg-white shadow-sm border-gray-200 animate-pulse">
    <div className="relative h-40 bg-gradient-to-br from-gray-200 to-gray-300" />
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
  </div>
);

const MenuItemsGrid = ({
  items,
  selectedCategory,
  addItem,
  selectedItems,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: MenuItemsGridProps) => {
  // Intersection observer for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Fetch next page when sentinel comes into view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && fetchNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (items?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="h-20 w-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <svg
            className="h-10 w-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No items found
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {selectedCategory === "all"
            ? "No menu items available. Please check back later."
            : `No items in "${selectedCategory.replace(
                /_/g,
                " "
              )}" category. Try another category.`}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items?.map((item) => (
          <div
            key={item.id}
            className="group relative"
            onClick={() => addItem(item)}
          >
            <div
              className={`
                h-full border rounded-2xl overflow-hidden bg-white shadow-sm 
                hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 
                transition-all duration-300 cursor-pointer
                ${
                  selectedItems.has(item.id)
                    ? "border-2 border-blue-500 ring-2 ring-blue-100"
                    : "border-gray-200 hover:border-blue-300"
                }
              `}
            >
              {/* Item Image Area */}
              <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl opacity-30">
                      {getCategoryIcon(item.category.title)}
                    </span>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-sm text-gray-700 border border-white/20">
                    {item.category.title.replace(/_/g, " ")}
                  </span>
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-3 right-3">
                  <div className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-lg">
                    ${item.price?.toFixed(2)}
                  </div>
                </div>

                {/* Add Button Overlay */}
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                    flex items-center justify-center
                  `}
                >
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <Plus className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-white font-bold mt-2 text-sm">
                      Add to Order
                    </p>
                  </div>
                </div>
              </div>

              {/* Item Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  {selectedItems.has(item.id) && (
                    <div className="flex-shrink-0 ml-2">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                          className="h-3 w-3 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3 min-h-[2.5rem]">
                  {item.description || "Delicious menu item"}
                </p>

                {/* Quantity Indicator */}
                {selectedItems.get(item.id) && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">In order:</span>
                      <span className="font-semibold text-blue-600">
                        {selectedItems.get(item.id)?.quantity}x
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading skeletons while fetching next page */}
        {isFetchingNextPage &&
          Array.from({ length: 4 }).map((_, idx) => (
            <ItemSkeleton key={`skeleton-${idx}`} />
          ))}
      </div>

      {/* Intersection observer sentinel */}
      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-8">
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2 text-blue-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-medium">Loading more items...</span>
            </div>
          ) : (
            <div className="h-8" /> // Invisible trigger point
          )}
        </div>
      )}

      {/* End of results indicator */}
      {!hasNextPage && items && items.length > 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">
            You've reached the end of the menu
          </p>
        </div>
      )}
    </>
  );
};

export default MenuItemsGrid;