import { useState } from "react";
import { ArrowUpDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type OrderBy = 'createdAt' | 'title' | 'price';
type SortDirection = 'asc' | 'desc';

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
  { orderBy: 'createdAt', sort: 'desc', label: 'Newest First' },
  { orderBy: 'createdAt', sort: 'asc', label: 'Oldest First' },
  
  // Title options
  { orderBy: 'title', sort: 'asc', label: 'Name (A-Z)' },
  { orderBy: 'title', sort: 'desc', label: 'Name (Z-A)' },
  
  // Price options
  { orderBy: 'price', sort: 'asc', label: 'Price: Low to High' },
  { orderBy: 'price', sort: 'desc', label: 'Price: High to Low' },
];

const SortDropdown = ({
  onSortChange,
  defaultOrderBy = 'createdAt',
  defaultSort = 'desc',
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
    (opt) => opt.orderBy === selectedSort.orderBy && opt.sort === selectedSort.sort
  );

  const isDefaultSort = selectedSort.orderBy === 'createdAt' && selectedSort.sort === 'desc';

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-2 px-3 py-2.5 border rounded-lg transition-all ${
            !isDefaultSort
              ? "border-blue-500 bg-blue-50 hover:bg-blue-100"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          <ArrowUpDown className={`h-4 w-4 ${!isDefaultSort ? "text-blue-600" : "text-gray-600"}`} />
          <span className={`text-sm font-medium ${!isDefaultSort ? "text-blue-700" : "text-gray-700"}`}>
            {currentOption?.label || 'Sort'}
          </span>
          {!isDefaultSort && (
            <span className="h-2 w-2 bg-blue-600 rounded-full" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="p-1">
          {/* Date Section */}
          <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            By Date
          </div>
          {sortOptions.slice(0, 2).map((option) => (
            <button
              key={`${option.orderBy}-${option.sort}`}
              onClick={() => handleSortChange(option.orderBy, option.sort)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-colors ${
                selectedSort.orderBy === option.orderBy && selectedSort.sort === option.sort
                  ? "bg-blue-50 text-blue-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{option.icon}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </div>
              {selectedSort.orderBy === option.orderBy && selectedSort.sort === option.sort && (
                <Check className="h-4 w-4 text-blue-600" />
              )}
            </button>
          ))}

          <DropdownMenuSeparator className="my-1" />

          {/* Title Section */}
          <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            By Name
          </div>
          {sortOptions.slice(2, 4).map((option) => (
            <button
              key={`${option.orderBy}-${option.sort}`}
              onClick={() => handleSortChange(option.orderBy, option.sort)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-colors ${
                selectedSort.orderBy === option.orderBy && selectedSort.sort === option.sort
                  ? "bg-blue-50 text-blue-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{option.icon}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </div>
              {selectedSort.orderBy === option.orderBy && selectedSort.sort === option.sort && (
                <Check className="h-4 w-4 text-blue-600" />
              )}
            </button>
          ))}

          <DropdownMenuSeparator className="my-1" />

          {/* Price Section */}
          <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            By Price
          </div>
          {sortOptions.slice(4, 6).map((option) => (
            <button
              key={`${option.orderBy}-${option.sort}`}
              onClick={() => handleSortChange(option.orderBy, option.sort)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-colors ${
                selectedSort.orderBy === option.orderBy && selectedSort.sort === option.sort
                  ? "bg-blue-50 text-blue-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{option.icon}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </div>
              {selectedSort.orderBy === option.orderBy && selectedSort.sort === option.sort && (
                <Check className="h-4 w-4 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;