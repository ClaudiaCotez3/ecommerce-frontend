import { cn } from '@/shared/lib/utils';

/**
 * Reusable loading spinner component
 *
 * Features:
 * - Multiple sizes
 * - Customizable styling
 * - Accessibility support
 * - Professional appearance
 */

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
} as const;

export function LoadingSpinner({
  size = 'md',
  className,
  label = 'Loading...',
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
}

// Full screen loading component
interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" className="text-primary" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

// Inline loading component
interface LoadingInlineProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingInline({
  message = 'Loading...',
  size = 'sm',
}: LoadingInlineProps) {
  return (
    <div className="flex items-center space-x-2">
      <LoadingSpinner size={size} className="text-muted-foreground" />
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  );
}
