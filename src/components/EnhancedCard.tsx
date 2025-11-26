import * as React from 'react';
import { cn } from '@/lib/utils';

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'elevated';
  hover?: boolean;
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, variant = 'default', hover = true, ...props }, ref) => {
    const variants = {
      default: 'bg-gradient-to-b from-card to-neutral-50 shadow-[inset_0_1px_0_hsl(0_0%_100%/0.2),0_2px_4px_hsl(var(--neutral-900)/0.1)]',
      glass: 'glass-effect shadow-lg',
      gradient: 'bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 shadow-xl border-2 border-white/50',
      elevated: 'bg-card shadow-2xl border border-neutral-100',
    };

    const hoverClass = hover
      ? 'hover:shadow-[inset_0_1px_0_hsl(0_0%_100%/0.25),0_4px_8px_hsl(var(--neutral-900)/0.15)] hover:-translate-y-1 transition-all duration-300'
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg text-card-foreground',
          variants[variant],
          hoverClass,
          className
        )}
        {...props}
      />
    );
  }
);
EnhancedCard.displayName = 'EnhancedCard';

export { EnhancedCard };