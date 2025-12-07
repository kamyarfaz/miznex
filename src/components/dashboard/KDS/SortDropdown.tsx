import { useState } from "react";
import { ArrowUpDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type OrderBy = "createdAt" | "title" | "price";
type SortDirection = "asc" | "desc";

interface SortOption {
  orderBy: OrderBy;
  sort: SortDirection;
  label: string;
  icon?: string;
}

interface SortDropdownProps {
  onSortChange?: (orderBy: OrderBy, sort: SortDirection) => void;
  defaultOrderBy?: OrderBy;
  defaultSort?: SortDirection;
}

const sortOptions: SortOption[] = [
  // Date options
  { orderBy: "createdAt", sort: "desc", label: "Newest First" },
  { orderBy: "createdAt", sort: "asc", label: "Oldest First" },

  // Title options
  { orderBy: "title", sort: "asc", label: "Name (A-Z)" },
  { orderBy: "title", sort: "desc", label: "Name (Z-A)" },

  // Price options
  { orderBy: "price", sort: "asc", label: "Price: Low to High" },
  { orderBy: "price", sort: "desc", label: "Price: High to Low" },
];

const SortDropdown = ({
  onSortChange,
  defaultOrderBy = "createdAt",
  defaultSort = "desc",
}: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<{
    orderBy: OrderBy;
    sort: SortDirection;
  }>({
    orderBy: defaultOrderBy,
    sort: defaultSort,
  });

  const handleSortChange = (orderBy: OrderBy, sort: SortDirection) => {
    setSelectedSort({ orderBy, sort });
    onSortChange?.(orderBy, sort);
    setIsOpen(false);
  };

  const currentOption = sortOptions.find(
    (opt) =>
      opt.orderBy === selectedSort.orderBy && opt.sort === selectedSort.sort
  );

  const isDefaultSort =
    selectedSort.orderBy === "createdAt" && selectedSort.sort === "desc";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-2 px-3 py-2.5 border rounded-lg transition-all ${
            !isDefaultSort
              ? "border-[#FF5B35] bg-[#FFF5F2] hover:bg-[#FFEBE5] shadow-sm"
              : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
          }`}
        >
          <ArrowUpDown
            className={`h-4 w-4 ${
              !isDefaultSort ? "text-[#FF5B35]" : "text-gray-600"
            }`}
          />
          <span
            className={`text-sm font-medium ${
              !isDefaultSort ? "text-[#FF5B35]" : "text-gray-700"
            }`}
          >
            {currentOption?.label || "Sort"}
          </span>
          {!isDefaultSort && (
            <span className="h-2 w-2 bg-[#FF5B35] rounded-full ring-2 ring-white" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 border border-gray-200 shadow-lg"
      >
        <div className="p-1 space-y-2">
          {/* Date Section */}
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50 rounded-t-md">
            By Date
          </div>
          {sortOptions.slice(0, 2).map((option) => (
            <button
              key={`${option.orderBy}-${option.sort}`}
              onClick={() => handleSortChange(option.orderBy, option.sort)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all ${
                selectedSort.orderBy === option.orderBy &&
                selectedSort.sort === option.sort
                  ? "bg-[#FFF5F2] text-[#FF5B35] border border-[#FF5B35]/20"
                  : "hover:bg-gray-100 text-gray-700 hover:border hover:border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-1.5 rounded ${
                    selectedSort.orderBy === option.orderBy &&
                    selectedSort.sort === option.sort
                      ? "bg-[#FF5B35]/10"
                      : "bg-gray-100"
                  }`}
                >
                  <span
                    className={`text-sm ${
                      selectedSort.orderBy === option.orderBy &&
                      selectedSort.sort === option.sort
                        ? "text-[#FF5B35]"
                        : "text-gray-600"
                    }`}
                  >
                    {option.icon}
                  </span>
                </div>
                <span className="text-sm font-medium">{option.label}</span>
              </div>
              {selectedSort.orderBy === option.orderBy &&
                selectedSort.sort === option.sort && (
                  <Check className="h-4 w-4 text-[#FF5B35] font-bold" />
                )}
            </button>
          ))}

          <DropdownMenuSeparator className="my-1" />

          {/* Title Section */}
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50">
            By Name
          </div>
          {sortOptions.slice(2, 4).map((option) => (
            <button
              key={`${option.orderBy}-${option.sort}`}
              onClick={() => handleSortChange(option.orderBy, option.sort)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all ${
                selectedSort.orderBy === option.orderBy &&
                selectedSort.sort === option.sort
                  ? "bg-[#FFF5F2] text-[#FF5B35] border border-[#FF5B35]/20"
                  : "hover:bg-gray-100 text-gray-700 hover:border hover:border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-1.5 rounded ${
                    selectedSort.orderBy === option.orderBy &&
                    selectedSort.sort === option.sort
                      ? "bg-[#FF5B35]/10"
                      : "bg-gray-100"
                  }`}
                >
                  <span
                    className={`text-sm ${
                      selectedSort.orderBy === option.orderBy &&
                      selectedSort.sort === option.sort
                        ? "text-[#FF5B35]"
                        : "text-gray-600"
                    }`}
                  >
                    {option.icon}
                  </span>
                </div>
                <span className="text-sm font-medium">{option.label}</span>
              </div>
              {selectedSort.orderBy === option.orderBy &&
                selectedSort.sort === option.sort && (
                  <Check className="h-4 w-4 text-[#FF5B35] font-bold" />
                )}
            </button>
          ))}

          <DropdownMenuSeparator className="my-1" />

          {/* Price Section */}
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50 rounded-b-md">
            By Price
          </div>
          {sortOptions.slice(4, 6).map((option) => (
            <button
              key={`${option.orderBy}-${option.sort}`}
              onClick={() => handleSortChange(option.orderBy, option.sort)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all ${
                selectedSort.orderBy === option.orderBy &&
                selectedSort.sort === option.sort
                  ? "bg-[#FFF5F2] text-[#FF5B35] border border-[#FF5B35]/20"
                  : "hover:bg-gray-100 text-gray-700 hover:border hover:border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-1.5 rounded ${
                    selectedSort.orderBy === option.orderBy &&
                    selectedSort.sort === option.sort
                      ? "bg-[#FF5B35]/10"
                      : "bg-gray-100"
                  }`}
                >
                  <span
                    className={`text-sm ${
                      selectedSort.orderBy === option.orderBy &&
                      selectedSort.sort === option.sort
                        ? "text-[#FF5B35]"
                        : "text-gray-600"
                    }`}
                  >
                    {option.icon}
                  </span>
                </div>
                <span className="text-sm font-medium">{option.label}</span>
              </div>
              {selectedSort.orderBy === option.orderBy &&
                selectedSort.sort === option.sort && (
                  <Check className="h-4 w-4 text-[#FF5B35] font-bold" />
                )}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;
