import { useEffect, useRef, useState } from "react";

interface ScrollRevealEnhancedProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const ScrollRevealEnhanced = ({
  children,
  direction = "up",
  delay = 0,
  duration = 600,
  threshold = 0.2,
  className = "",
  once = true,
}: ScrollRevealEnhancedProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, once]);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0) scale(1)";

    switch (direction) {
      case "up":
        return "translate(0, 40px) scale(1)";
      case "down":
        return "translate(0, -40px) scale(1)";
      case "left":
        return "translate(40px, 0) scale(1)";
      case "right":
        return "translate(-40px, 0) scale(1)";
      case "scale":
        return "translate(0, 0) scale(0.9)";
      case "fade":
        return "translate(0, 0) scale(1)";
      default:
        return "translate(0, 0) scale(1)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollRevealEnhanced;

