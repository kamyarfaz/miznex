import { Card, CardContent } from '@/components/ui/card';
import { KDSCategoryBadge } from './KDSCategoryBadge';
import { cn } from '@/utils/utils';
import type { ItemCategoryKDS } from '@/types';

export interface KDSMenuItemProps {
  id: string;
  name: string;
  category: ItemCategoryKDS;
  price: number;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}

/**
 * KDS Menu Item Component
 * 
 * Displays a menu item card for POS selection
 * 
 * @example
 * <KDSMenuItem
 *   id="1"
 *   name="Grilled Chicken"
 *   category="grill"
 *   price={18.99}
 *   onClick={handleSelect}
 * />
 */
export function KDSMenuItem({
  name,
  category,
  price,
  onClick,
  isSelected = false,
  className,
}: KDSMenuItemProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer hover:shadow-lg transition-all duration-200',
        isSelected && 'ring-2 ring-[var(--brand-primary)] shadow-lg',
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <KDSCategoryBadge category={category} size="sm" />
          <h3 className="truncate">{name}</h3>
          <p className="text-muted-foreground">${price.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
