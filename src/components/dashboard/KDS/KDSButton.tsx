import { forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/utils';
import { Loader2 } from 'lucide-react';

export interface KDSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: 'bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white',
  secondary: 'bg-[var(--brand-secondary)] hover:bg-[var(--brand-secondary-hover)] text-white',
  outline: 'border-2 border-current',
  ghost: '',
  destructive: '',
};

const sizeStyles = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4',
  lg: 'h-12 px-6 text-lg',
};

/**
 * KDS Button Component
 * 
 * Primary button component with consistent styling
 * Variants: primary, secondary, outline, ghost, destructive
 * Sizes: sm, md, lg
 * 
 * @example
 * <KDSButton variant="primary" onClick={handleClick}>
 *   Click Me
 * </KDSButton>
 * 
 * <KDSButton variant="secondary" size="lg" leftIcon={<Icon />} isLoading>
 *   Loading...
 * </KDSButton>
 */
export const KDSButton = forwardRef<HTMLButtonElement, KDSButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const buttonVariant =
      variant === 'primary' || variant === 'secondary'
        ? 'default'
        : variant;

    return (
      <Button
        ref={ref}
        variant={buttonVariant}
        disabled={disabled || isLoading}
        className={cn(
          variant === 'primary' && variantStyles.primary,
          variant === 'secondary' && variantStyles.secondary,
          sizeStyles[size],
          fullWidth && 'w-full',
          'transition-all duration-200',
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Button>
    );
  }
);

KDSButton.displayName = 'KDSButton';
