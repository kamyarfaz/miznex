import { cn } from "@/utils/utils";
import type { ItemCategoryKDS } from "@/types";
import { useEffect, useRef } from "react";

interface FilterOption {
  value: ItemCategoryKDS | "all";
  label: string;
}

interface KDSFilterTabsProps {
  options: FilterOption[];
  activeFilter: ItemCategoryKDS | "all";
  onFilterChange: (filter: ItemCategoryKDS | "all") => void;
  className?: string;
}

export function KDSFilterTabs({
  options,
  activeFilter,
  onFilterChange,
  className,
}: KDSFilterTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to active tab
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeEl = container.querySelector("[data-active='true']");
    if (activeEl) {
      const element = activeEl as HTMLElement;
      container.scrollTo({
        left: element.offsetLeft - 16,
        behavior: "smooth",
      });
    }
  }, [activeFilter]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-nowrap gap-2 overflow-x-auto pb-3 scroll-smooth touch-pan-x",
        "scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300",
        "whitespace-nowrap",
        className
      )}
    >
      {options.map((option) => {
        const isActive = activeFilter === option.value;

        return (
          <button
            key={option.value === "all" ? "all" : option.value.id}
            data-active={isActive ? "true" : "false"}
            onClick={() => onFilterChange(option.value)}
            className={cn(
              "px-4 py-2 rounded-full flex-shrink-0 transition-all",
              "border text-sm tracking-wide capitalize",

              isActive
                ? "bg-[var(--brand-primary)] text-white border-transparent shadow"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
