import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle2, AlertTriangle, X, Truck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/utils/utils';

export type NotificationType = 'new-order' | 'order-ready' | 'warning' | 'offline' | 'order-delivered';

interface KDSNotificationToastProps {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  onDismiss: () => void;
  duration?: number;
}

const notificationStyles: Record<
  NotificationType,
  {
    bgClass: string;
    iconClass: string;
    Icon: React.ElementType;
  }
> = {
  'new-order': {
    bgClass: 'bg-red-50 border-red-500',
    iconClass: 'bg-red-500',
    Icon: Bell,
  },
  'order-ready': {
    bgClass: 'bg-green-50 border-green-500',
    iconClass: 'bg-green-500',
    Icon: CheckCircle2,
  },
  'warning': {
    bgClass: 'bg-yellow-50 border-yellow-500',
    iconClass: 'bg-yellow-500',
    Icon: AlertTriangle,
  },
  'offline': {
    bgClass: 'bg-gray-50 border-gray-500',
    iconClass: 'bg-gray-500',
    Icon: AlertTriangle,
  },
  'order-delivered': {
    bgClass: 'bg-blue-50 border-blue-500',
    iconClass: 'bg-blue-500',
    Icon: Truck,
  },
};


/**
 * KDS Notification Toast Component
 * 
 * Displays notification with icon and auto-dismiss
 * Types: new-order, order-ready, warning, offline
 * 
 * @example
 * <KDSNotificationToast
 *   id="1"
 *   type="new-order"
 *   title="New Order"
 *   message="Order #123 - Table 5"
 *   onDismiss={handleDismiss}
 * />
 */
export function KDSNotificationToast({
  type,
  title,
  message,
  onDismiss,
}: KDSNotificationToastProps) {
  const { bgClass, iconClass, Icon } = notificationStyles[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn('p-4 shadow-lg border-2', bgClass)}>
        <div className="flex items-start gap-3">
          <div className={cn('p-2 rounded-full', iconClass)}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <div>{title}</div>
            <div className="text-sm opacity-90">{message}</div>
          </div>
          <button
            onClick={onDismiss}
            className="opacity-50 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </Card>
    </motion.div>
  );
}

/**
 * KDS Notification Container
 * 
 * Container for managing multiple notifications
 */
interface KDSNotificationContainerProps {
  notifications: Array<{
    id: string;
    type: NotificationType;
    title: string;
    message: string;
  }>;
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
};

export function KDSNotificationContainer({
  notifications,
  onDismiss,
  position = 'top-right',
}: KDSNotificationContainerProps) {
  return (
    <div className={cn('fixed z-50 space-y-2 max-w-sm', positionClasses[position])}>
      <AnimatePresence>
        {notifications.map(notification => (
          <KDSNotificationToast
            key={notification.id}
            {...notification}
            onDismiss={() => onDismiss(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
