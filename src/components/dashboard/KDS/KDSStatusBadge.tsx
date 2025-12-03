import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/utils';
import type { OrderStatusKDS } from '@/types';

interface KDSStatusBadgeProps {
  status: OrderStatusKDS;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusStyles: Record<OrderStatusKDS, string> = {
  new: 'bg-[var(--status-new-bg)] text-[var(--status-new-fg)] border-[var(--status-new-border)]',
  'in-progress': 'bg-[var(--status-in-progress-bg)] text-[var(--status-in-progress-fg)] border-[var(--status-in-progress-border)]',
  ready: 'bg-[var(--status-ready-bg)] text-[var(--status-ready-fg)] border-[var(--status-ready-border)]',
  completed: 'bg-[var(--status-completed-bg)] text-[var(--status-completed-fg)] border-[var(--status-completed-border)]',
};

const statusLabels: Record<OrderStatusKDS, string> = {
  new: 'NEW',
  'in-progress': 'IN PROGRESS',
  ready: 'READY',
  completed: 'COMPLETED',
};

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

/**
 * KDS Status Badge Component
 * 
 * Displays order status with semantic color coding
 * 
 * @example
 * <KDSStatusBadge status="new" />
 * <KDSStatusBadge status="ready" size="lg" />
 */
export function KDSStatusBadge({
  status,
  variant = 'default',
  size = 'md',
  className,
}: KDSStatusBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        statusStyles[status],
        sizeStyles[size],
        'transition-all duration-200',
        className
      )}
    >
      {statusLabels[status]}
    </Badge>
  );
}
