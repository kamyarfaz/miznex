import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { OrderStatusKDS } from "@/types";
import { Category } from "@/types/restaurant";
import { cn } from "@/utils/utils";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface KDSFilterTabsProps {
  options: FilterOption[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
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
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={cn(
              "px-4 py-2 rounded-full transition-all",
              activeFilter === option.value
                ? "bg-[var(--brand-primary)] text-white"
                : "bg-white border border-gray-200 hover:border-gray-300"
            )}
          >
            <span className="flex items-center gap-2">
              {option.label}
              {option.count !== undefined && (
                <Badge
                  variant="secondary"
                  className={cn(
                    "ml-1",
                    activeFilter === option.value
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-700"
                  )}
                >
                  {option.count}
                </Badge>
              )}
            </span>
          </button>
        ))}
      </div>
    );
  }

  if (variant === "underline") {
    return (
      <div className={cn("flex border-b border-gray-200", className)}>
        {options.map((option) => (
          <button
            key={option.value}
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
              {option.count !== undefined && (
                <Badge variant="secondary" className="bg-gray-100">
                  {option.count}
                </Badge>
              )}
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
          key={option.value}
          variant={activeFilter === option.value ? "default" : "outline"}
          onClick={() => onFilterChange(option.value)}
          size="sm"
          className="capitalize"
        >
          {option.label}
          {option.count !== undefined && (
            <Badge
              variant="secondary"
              className={cn(
                "ml-2",
                activeFilter === option.value
                  ? "bg-white/20 text-white"
                  : "bg-gray-100"
              )}
            >
              {option.count}
            </Badge>
          )}
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

export function KDSStatusFilter({
  activeStatus,
  onStatusChange,
  counts,
  variant = "default",
}: KDSStatusFilterProps) {
  const options: FilterOption[] = [
    { value: "all", label: "All Orders", count: counts?.all },
    { value: "new", label: "New", count: counts?.new },
    {
      value: "in-progress",
      label: "In Progress",
      count: counts?.["in-progress"],
    },
    { value: "ready", label: "Ready", count: counts?.ready },
    { value: "completed", label: "Completed", count: counts?.completed },
  ];

  return (
    <KDSFilterTabs
      options={options}
      activeFilter={activeStatus}
      onFilterChange={(value) =>
        onStatusChange(value as OrderStatusKDS | "all")
      }
      variant={variant}
    />
  );
}
