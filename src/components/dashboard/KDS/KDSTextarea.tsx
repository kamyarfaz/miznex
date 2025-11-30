import { forwardRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/utils';
import { AlertCircle } from 'lucide-react';

export interface KDSTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  maxLength?: number;
  showCount?: boolean;
}

/**
 * KDS Textarea Component
 * 
 * Multi-line text input with label, error, and character count
 * 
 * @example
 * <KDSTextarea
 *   label="Order Notes"
 *   placeholder="Special instructions..."
 *   value={notes}
 *   onChange={handleChange}
 *   maxLength={200}
 *   showCount
 * />
 */
export const KDSTextarea = forwardRef<HTMLTextAreaElement, KDSTextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      maxLength,
      showCount = false,
      className,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {label && (
          <div className="flex items-center justify-between">
            <Label htmlFor={textareaId} className={cn(error && 'text-red-600')}>
              {label}
            </Label>
            {showCount && maxLength && (
              <span className="text-xs text-muted-foreground">
                {currentLength}/{maxLength}
              </span>
            )}
          </div>
        )}
        <div className="relative">
          <Textarea
            ref={ref}
            id={textareaId}
            maxLength={maxLength}
            value={value}
            className={cn(
              error && 'border-red-500 focus-visible:ring-red-500',
              className
            )}
            {...props}
          />
          {error && (
            <div className="absolute right-3 top-3 text-red-600">
              <AlertCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

KDSTextarea.displayName = 'KDSTextarea';
