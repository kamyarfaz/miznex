import { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/utils';

interface KDSTimerProps {
  startTime: Date;
  warningThreshold?: number; // minutes
  dangerThreshold?: number; // minutes
  showIcon?: boolean;
  variant?: 'default' | 'compact';
  className?: string;
}

/**
 * KDS Timer Component
 * 
 * Displays elapsed time with color-coded warnings
 * - Green: < warningThreshold
 * - Yellow: >= warningThreshold
 * - Red: >= dangerThreshold
 * 
 * @example
 * <KDSTimer startTime={order.createdAt} />
 * <KDSTimer startTime={order.createdAt} warningThreshold={10} dangerThreshold={20} />
 */
export function KDSTimer({
  startTime,
  warningThreshold = 10,
  dangerThreshold = 20,
  showIcon = true,
  variant = 'default',
  className,
}: KDSTimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const updateElapsed = () => {
      const now = new Date();
      const elapsedMinutes = Math.floor((now.getTime() - startTime.getTime()) / 1000 / 60);
      setElapsed(elapsedMinutes);
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [startTime]);

  const getColorClass = () => {
    if (elapsed >= dangerThreshold) {
      return 'text-red-600';
    }
    if (elapsed >= warningThreshold) {
      return 'text-yellow-600';
    }
    return 'text-green-600';
  };

  const Icon = elapsed >= dangerThreshold ? AlertCircle : Clock;

  if (variant === 'compact') {
    return (
      <span className={cn('flex items-center gap-1', getColorClass(), className)}>
        {showIcon && <Icon className="h-3 w-3" />}
        <span className="tabular-nums">{elapsed}m</span>
      </span>
    );
  }

  return (
    <div className={cn('flex items-center gap-1.5', getColorClass(), className)}>
      {showIcon && <Icon className="h-4 w-4" />}
      <span className="tabular-nums">
        {elapsed}m
      </span>
    </div>
  );
}
