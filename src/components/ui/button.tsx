import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-primary-400 to-primary-600 text-primary-foreground hover:from-primary-500 hover:to-primary-700 shadow-[inset_0_1px_0_hsl(var(--primary-300)/0.4),0_2px_4px_hsl(var(--neutral-900)/0.15)] hover:shadow-[inset_0_1px_0_hsl(var(--primary-300)/0.5),0_4px_8px_hsl(var(--neutral-900)/0.2)]",
        destructive: "bg-gradient-to-b from-error-400 to-error-600 text-destructive-foreground hover:from-error-500 hover:to-error-700 shadow-[inset_0_1px_0_hsl(var(--error-300)/0.4),0_2px_4px_hsl(var(--neutral-900)/0.15)] hover:shadow-[inset_0_1px_0_hsl(var(--error-300)/0.5),0_4px_8px_hsl(var(--neutral-900)/0.2)]",
        outline: "border-2 border-neutral-200 bg-gradient-to-b from-background to-neutral-50 text-foreground hover:from-neutral-50 hover:to-neutral-100 shadow-[inset_0_1px_0_hsl(0_0%_100%/0.2),0_1px_2px_hsl(var(--neutral-900)/0.1)] hover:shadow-[inset_0_1px_0_hsl(0_0%_100%/0.3),0_2px_4px_hsl(var(--neutral-900)/0.15)]",
        secondary: "bg-gradient-to-b from-secondary-400 to-secondary-600 text-secondary-foreground hover:from-secondary-500 hover:to-secondary-700 shadow-[inset_0_1px_0_hsl(var(--secondary-300)/0.4),0_2px_4px_hsl(var(--neutral-900)/0.15)] hover:shadow-[inset_0_1px_0_hsl(var(--secondary-300)/0.5),0_4px_8px_hsl(var(--neutral-900)/0.2)]",
        accent: "bg-gradient-to-b from-accent-400 to-accent-600 text-accent-foreground hover:from-accent-500 hover:to-accent-700 shadow-[inset_0_1px_0_hsl(var(--accent-300)/0.4),0_2px_4px_hsl(var(--neutral-900)/0.15)] hover:shadow-[inset_0_1px_0_hsl(var(--accent-300)/0.5),0_4px_8px_hsl(var(--neutral-900)/0.2)]",
        ghost: "hover:bg-neutral-100 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
