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
    <CardHeader className="sticky top-0 z-20 bg-white/90 backdrop-blur-lg border-b border-slate-200 p-4 md:p-6 overflow-visible">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title and Item Count */}
        <div className="flex items-center gap-3">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Menu Items
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              {total ?? 0} items available • Tap to add to order
            </p>
          </div>
        </div>

        {/* Search, Price Filter, and Sort Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:min-w-[15rem]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search menu items..."
              className="w-full pl-11 pr-4 py-2 border border-slate-200 rounded-full focus:ring-2 focus:ring-[#FF5B35]/30 focus:border-[#FF5B35] transition-all bg-white placeholder-slate-400 text-slate-700"
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

      {/* Category Filter Tabs */}
      <div className="mt-6 overflow-x-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
            Categories
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              {selectedCategory === "all"
                ? "All categories"
                : selectedCategory?.title.replace(/_/g, " ")}
            </span>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-xs text-[#FF5B35] hover:text-[#FF5B35]/80 hover:bg-[#FFF5F2] px-2 py-1 rounded transition-colors font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>
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
    </CardHeader>
  );
};

export default MenuHeader;
