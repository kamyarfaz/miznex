import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/utils';
import type { ItemCategoryKDS } from '@/types';

interface KDSCategoryBadgeProps {
  category: ItemCategoryKDS;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const categoryStyles: Record<ItemCategoryKDS, string> = {
  grill: 'bg-[var(--category-grill-bg)] text-[var(--category-grill-fg)] border-[var(--category-grill-border)]',
  salad: 'bg-[var(--category-salad-bg)] text-[var(--category-salad-fg)] border-[var(--category-salad-border)]',
  drinks: 'bg-[var(--category-drinks-bg)] text-[var(--category-drinks-fg)] border-[var(--category-drinks-border)]',
  dessert: 'bg-[var(--category-dessert-bg)] text-[var(--category-dessert-fg)] border-[var(--category-dessert-border)]',
  appetizer: 'bg-[var(--category-appetizer-bg)] text-[var(--category-appetizer-fg)] border-[var(--category-appetizer-border)]',
};

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

/**
 * KDS Category Badge Component
 * 
 * Displays item category with semantic color coding
 * 
 * @example
 * <KDSCategoryBadge category="grill" />
 * <KDSCategoryBadge category="salad" size="sm" />
 */
export function KDSCategoryBadge({
  category,
  size = 'md',
  className,
}: KDSCategoryBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        categoryStyles[category],
        sizeStyles[size],
        'capitalize',
        className
      )}
    >
      {category}
    </Badge>
  );
}
