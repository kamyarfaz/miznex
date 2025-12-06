import { CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCategories } from "@/services";
import { ItemCategoryKDS } from "@/types";
import { KDSFilterTabs } from "./KDSFilterTabs";
import PriceFilterDropdown from "./PriceFilterDropdown";
import SortDropdown from "./SortDropdown";

interface MenuHeaderProps {
  total: number | undefined;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<ItemCategoryKDS | "all">
  >;
  selectedCategory: ItemCategoryKDS | "all";
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setMinAndMaxPrice: React.Dispatch<
    React.SetStateAction<{ min: number; max: number }>
  >;
  setSortParams: React.Dispatch<
    React.SetStateAction<{ orderBy: string; sort: string }>
  >;
}

const MenuHeader = ({
  total,
  setSelectedCategory,
  setMinAndMaxPrice,
  setSortParams,
  selectedCategory,
  setSearchQuery,
}: MenuHeaderProps) => {
  // API call for getting categories
  const { categories } = useGetCategories("page=1&limit=50");

  // Helper
  const categoryOptions = categories?.map((cat) => ({
    value: cat,
    label: cat.title.charAt(0).toUpperCase() + cat.title.slice(1),
  }));
  return (
    <CardHeader className="pb-3 bg-gradient-to-b from-white to-gray-50/50 border-b sticky top-0 z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:block h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <svg
                className="h-5 w-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              Menu Items
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {total} items available • Tap to add to order
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search menu items..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <PriceFilterDropdown
              minPrice={0}
              maxPrice={100}
              defaultMin={0}
              defaultMax={100}
              onPriceChange={(min, max) => {
                setMinAndMaxPrice({ min, max });
              }}
            />
            <SortDropdown
              onSortChange={(orderBy, sort) => {
                setSortParams({ orderBy, sort });
              }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Categories
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {selectedCategory === "all"
                ? "All categories"
                : selectedCategory?.title.replace(/_/g, " ")}
            </span>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
            <KDSFilterTabs
              options={[
                {
                  value: "all",
                  label: "All Menu",
                },
                ...(categoryOptions?.map((option) => ({
                  ...option,
                })) || []),
              ]}
              activeFilter={selectedCategory}
              onFilterChange={(cat) => setSelectedCategory(cat)}
            />
          </div>
          {/* Gradient fade for scroll */}
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    </CardHeader>
  );
};
export default MenuHeader;
