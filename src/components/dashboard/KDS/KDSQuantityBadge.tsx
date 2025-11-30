import { cn } from "@/utils/utils";

export interface KDSQuantityBadgeProps {
  quantity: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined';
  className?: string;
}

const sizeStyles = {
  sm: 'w-4 h-4 text-xs',
  md: 'w-6 h-6 text-sm',
  lg: 'w-8 h-8 text-base',
};

/**
 * KDS Quantity Badge Component
 * 
 * Displays item quantity in a circular badge
 * 
 * @example
 * <KDSQuantityBadge quantity={3} />
 * <KDSQuantityBadge quantity={5} size="lg" variant="outlined" />
 */
export function KDSQuantityBadge({
  quantity,
  size = 'md',
  variant = 'default',
  className,
}: KDSQuantityBadgeProps) {
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded shrink-0',
        sizeStyles[size],
        variant === 'default' && 'bg-gray-100 text-gray-900',
        variant === 'outlined' && 'border-2 border-gray-300 text-gray-700',
        className
      )}
    >
      {quantity}
    </span>
  );
}
