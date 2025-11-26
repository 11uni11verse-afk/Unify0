import { useEffect, useState, useRef } from "react";
import { LucideIcon } from "lucide-react";

interface StatCounterProps {
  number: string | number;
  label: string;
  icon?: LucideIcon;
  color?: "primary" | "secondary" | "accent";
  suffix?: string;
  prefix?: string;
  animate?: boolean;
}

const StatCounter = ({
  number,
  label,
  icon: Icon,
  color = "primary",
  suffix = "",
  prefix = "",
  animate = true,
}: StatCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const colorClasses = {
    primary: "text-primary-600 bg-primary-50 border-primary-200",
    secondary: "text-secondary-600 bg-secondary-50 border-secondary-200",
    accent: "text-accent-600 bg-accent-50 border-accent-200",
  };

  const iconColorClasses = {
    primary: "text-primary-600",
    secondary: "text-secondary-600",
    accent: "text-accent-600",
  };

  // Extract numeric value for animation
  const numericValue = typeof number === "string" 
    ? parseInt(number.replace(/\D/g, ""), 10) || 0
    : number;

  // Intersection Observer to trigger animation when visible
  useEffect(() => {
    if (!animate) {
      setCount(numericValue);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animate, numericValue]);

  // Animate counter
  useEffect(() => {
    if (!isVisible || !animate) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, numericValue);
      setCount(Math.floor(current));

      if (step >= steps || current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, numericValue, animate]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      {Icon && (
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4 interactive-icon`}>
          <Icon className={`w-6 h-6 ${iconColorClasses[color]}`} />
        </div>
      )}
      <div className={`stat-number ${iconColorClasses[color]} mb-2`}>
        {prefix}
        {animate ? count : numericValue}
        {suffix}
      </div>
      <p className="text-sm text-neutral-600 font-medium">{label}</p>
    </div>
  );
};

export default StatCounter;

