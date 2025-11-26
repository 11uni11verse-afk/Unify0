import { LucideIcon } from "lucide-react";

interface AnimatedBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "info" | "new" | "hot";
  icon?: LucideIcon;
  pulse?: boolean;
  glow?: boolean;
  size?: "sm" | "md" | "lg";
}

const AnimatedBadge = ({
  children,
  variant = "default",
  icon: Icon,
  pulse = false,
  glow = false,
  size = "md",
}: AnimatedBadgeProps) => {
  const variantClasses = {
    default: "bg-neutral-100 text-neutral-700 border-neutral-200",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
    new: "bg-primary-50 text-primary-700 border-primary-200",
    hot: "bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent",
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  const glowClasses = {
    default: "shadow-lg shadow-neutral-500/20",
    success: "shadow-lg shadow-green-500/30",
    warning: "shadow-lg shadow-amber-500/30",
    info: "shadow-lg shadow-blue-500/30",
    new: "shadow-lg shadow-primary-500/30",
    hot: "shadow-lg shadow-red-500/40",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-bold rounded-full border
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${glow ? glowClasses[variant] : ""}
        ${pulse ? "animate-pulse" : ""}
        transition-all duration-300 hover:scale-105
      `}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
};

export default AnimatedBadge;

