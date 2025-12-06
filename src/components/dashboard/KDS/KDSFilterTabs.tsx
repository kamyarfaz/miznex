import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ItemCategoryKDS, OrderStatusKDS } from "@/types";
import { Category } from "@/types/restaurant";
import { cn } from "@/utils/utils";

interface FilterOption {
  value: ItemCategoryKDS | "all";
  label: string;
}

interface KDSFilterTabsProps {
  options: FilterOption[];
  activeFilter: ItemCategoryKDS | "all";
  onFilterChange: (filter: ItemCategoryKDS | "all") => void;
  variant?: "default" | "pills" | "underline";
  className?: string;
}

/**
 * KDS Filter Tabs Component
 *
 * Displays filter options with counts and active state
 * Variants:
 * - default: Button style
 * - pills: Rounded pill style
 * - underline: Tab with underline
 *
 * @example
 * <KDSFilterTabs
 *   options={[
 *     { value: 'all', label: 'All', count: 10 },
 *     { value: 'new', label: 'New', count: 3 }
 *   ]}
 *   activeFilter="all"
 *   onFilterChange={setFilter}
 * />
 */
export function KDSFilterTabs({
  options,
  activeFilter,
  onFilterChange,
  variant = "default",
  className,
}: KDSFilterTabsProps) {
  if (variant === "pills") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {options.map((option) => (
          <button
            key={option.value == "all" ? option.value : option.value.id}
            onClick={() => onFilterChange(option.value)}
            className={cn(
              "px-4 py-2 rounded-full transition-all",
              activeFilter === option.value
                ? "bg-[var(--brand-primary)] text-white"
                : "bg-white border border-gray-200 hover:border-gray-300"
            )}
          />
        ))}
      </div>
    );
  }

  if (variant === "underline") {
    return (
      <div className={cn("flex border-b border-gray-200", className)}>
        {options.map((option) => (
          <button
            key={option.value == "all" ? option.value : option.value.id}
            onClick={() => onFilterChange(option.value)}
            className={cn(
              "px-4 py-3 transition-all relative",
              activeFilter === option.value
                ? "text-[var(--brand-primary)]"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <span className="flex items-center gap-2">
              {option.label}
            </span>
            {activeFilter === option.value && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-primary)]" />
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <Button
          key={option.value == "all" ? option.value : option.value.id}
          variant={activeFilter === option.value ? "default" : "outline"}
          onClick={() => onFilterChange(option.value)}
          size="sm"
          className="capitalize"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

/**
 * KDS Status Filter Component
 *
 * Pre-configured filter for order statuses
 */
interface KDSStatusFilterProps {
  activeStatus: Category | "all";
  onStatusChange: (status: OrderStatusKDS | "all") => void;
  counts?: Record<OrderStatusKDS | "all", number>;
  variant?: "default" | "pills" | "underline";
}