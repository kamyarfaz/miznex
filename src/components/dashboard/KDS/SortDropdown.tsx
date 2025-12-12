import { useState } from "react";
import { ArrowUpDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type OrderBy = "createdAt" | "title" | "price";
type SortDirection = "asc" | "desc";

interface SortOption {
  group: string;
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
  { orderBy: "createdAt", sort: "desc", label: "Newest First", group: "By Date" },
  { orderBy: "createdAt", sort: "asc", label: "Oldest First", group: "By Date" },

  // Title options
  { orderBy: "title", sort: "asc", label: "Name (A-Z)", group: "By Name" },
  { orderBy: "title", sort: "desc", label: "Name (Z-A)", group: "By Name" },

  // Price options
  { orderBy: "price", sort: "asc", label: "Price: Low to High", group: "By Price" },
  { orderBy: "price", sort: "desc", label: "Price: High to Low", group: "By Price" },
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

  const sortGroups = ["By Date", "By Name", "By Price"];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-2 px-3 py-2.5 border rounded-full transition-all text-sm font-medium ${
            !isDefaultSort
              ? "border-[#FF5B35]/30 bg-[#FFF5F2] text-[#FF5B35] hover:bg-[#FFEBE5]"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300"
          }`}
        >
          <ArrowUpDown className="h-4 w-4" />
          <span>{currentOption?.label || "Sort"}</span>
          {!isDefaultSort && (
            <div className="h-1.5 w-1.5 bg-[#FF5B35] rounded-full" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        {sortGroups.map((group, index) => (
          <DropdownMenuGroup key={group}>
            <DropdownMenuLabel>{group}</DropdownMenuLabel>
            {sortOptions
              .filter((option) => option.group === group)
              .map((option) => {
                const isSelected =
                  selectedSort.orderBy === option.orderBy &&
                  selectedSort.sort === option.sort;

                return (
                  <DropdownMenuItem
                    key={`${option.orderBy}-${option.sort}`}
                    onSelect={() =>
                      handleSortChange(option.orderBy, option.sort)
                    }
                    className={`flex items-center justify-between cursor-pointer ${
                      isSelected ? "text-[#FF5B35]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {option.icon}
                      <span>{option.label}</span>
                    </div>
                    {isSelected && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                );
              })}
            {index < sortGroups.length - 1 && <DropdownMenuSeparator />}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;
