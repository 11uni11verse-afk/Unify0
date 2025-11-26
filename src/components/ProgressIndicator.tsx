import { useEffect, useState, useRef } from "react";

interface ProgressIndicatorProps {
  value: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  color?: "primary" | "secondary" | "accent" | "success";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

const ProgressIndicator = ({
  value,
  label,
  showPercentage = true,
  color = "primary",
  size = "md",
  animate = true,
}: ProgressIndicatorProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const colorClasses = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-500",
    accent: "bg-accent-500",
    success: "bg-green-500",
  };

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  useEffect(() => {
    if (!animate) {
      setProgress(value);
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
  }, [animate, value]);

  useEffect(() => {
    if (!isVisible || !animate) return;

    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, value);
      setProgress(Math.floor(current));

      if (step >= steps || current >= value) {
        setProgress(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value, animate]);

  return (
    <div ref={ref} className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-sm font-medium text-neutral-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-bold text-neutral-900">{progress}%</span>
          )}
        </div>
      )}
      <div className={`w-full ${sizeClasses[size]} bg-neutral-200 rounded-full overflow-hidden`}>
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;

