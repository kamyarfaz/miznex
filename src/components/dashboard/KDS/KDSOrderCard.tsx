import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { KDSStatusBadge } from './KDSStatusBadge';
import { KDSCategoryBadge } from './KDSCategoryBadge';
import { KDSTimer } from './KDSTimer';
import { cn } from '@/utils/utils';
import { motion } from 'framer-motion';
import type { OrderKDS, OrderStatusKDS } from '@/types';

interface KDSOrderCardProps {
  order: OrderKDS;
  variant?: 'default' | 'compact' | 'detailed';
  onClick?: () => void;
  className?: string;
  showTimer?: boolean;
  showItems?: boolean;
}

const statusBorderStyles: Record<OrderStatusKDS, string> = {
  new: 'border-[var(--status-new-border)] shadow-[0_0_0_3px_var(--status-new-surface)]',
  'in-progress': 'border-[var(--status-in-progress-border)] shadow-sm',
  ready: 'border-[var(--status-ready-border)] shadow-[0_0_0_3px_var(--status-ready-surface)]',
  completed: 'border-[var(--status-completed-border)] shadow-sm',
};

/**
 * KDS Order Card Component
 * 
 * Displays order information with status, timer, and items
 * Variants:
 * - default: Full card with all information
 * - compact: Smaller card for grid views
 * - detailed: Expanded view with all details
 * 
 * @example
 * <KDSOrderCard order={order} onClick={() => handleClick(order)} />
 * <KDSOrderCard order={order} variant="compact" />
 */
export function KDSOrderCard({
  order,
  variant = 'default',
  onClick,
  className,
  showTimer = true,
  showItems = true,
}: KDSOrderCardProps) {
  const isUrgent = order.status === 'new' || order.status === 'ready';

  if (variant === 'compact') {
    return (
      <Card
        className={cn(
          'cursor-pointer hover:shadow-lg transition-all border-2',
          statusBorderStyles[order.status],
          className
        )}
        onClick={onClick}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <span className="text-lg">#{order.orderNumber}</span>
            <KDSStatusBadge status={order.status} size="sm" />
          </div>
          <div className="text-xs text-muted-foreground">
            Table {order.tableNumber}
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          {showItems && (
            <div className="space-y-1">
              {order.items.slice(0, 2).map(item => (
                <div key={item.id} className="text-xs flex items-center gap-1.5">
                  <span className="w-4 h-4 flex items-center justify-center bg-gray-100 rounded text-xs">
                    {item.quantity}
                  </span>
                  <span className="truncate">{item.name}</span>
                </div>
              ))}
              {order.items.length > 2 && (
                <div className="text-xs text-muted-foreground">
                  +{order.items.length - 2} more
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      layout
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
    >
      <Card
        className={cn(
          'cursor-pointer hover:shadow-xl transition-all border-2',
          statusBorderStyles[order.status],
          isUrgent && 'animate-pulse-border',
          className
        )}
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">#{order.orderNumber}</span>
              <KDSStatusBadge status={order.status} />
            </div>
            {showTimer && (
              <KDSTimer startTime={order.createdAt} />
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            Table {order.tableNumber} • {order.waiterName}
          </div>
        </CardHeader>

        {showItems && (
          <CardContent>
            <div className="space-y-2">
              {order.items.map(item => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded">
                      {item.quantity}
                    </span>
                    <span className="truncate">{item.name}</span>
                  </div>
                  <KDSCategoryBadge category={item.category} size="sm" />
                </div>
              ))}
            </div>

            {order.notes && (
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                <strong>Note:</strong> {order.notes}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}
