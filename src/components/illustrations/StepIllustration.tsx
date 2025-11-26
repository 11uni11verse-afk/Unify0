import { LucideIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface StepIllustrationProps {
  icon: LucideIcon;
  color: "primary" | "secondary" | "accent";
  animate?: boolean;
  decorations?: React.ReactNode;
}

const StepIllustration = ({ 
  icon: Icon, 
  color, 
  animate = true,
  decorations 
}: StepIllustrationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const colorClasses = {
    primary: {
      gradient: "from-primary-400 to-primary-600",
      glow: "primary-500",
      ring: "primary-200",
    },
    secondary: {
      gradient: "from-secondary-400 to-secondary-600",
      glow: "secondary-500",
      ring: "secondary-200",
    },
    accent: {
      gradient: "from-accent-400 to-accent-600",
      glow: "accent-500",
      ring: "accent-200",
    },
  };

  useEffect(() => {
    if (!animate) {
      setIsVisible(true);
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
  }, [animate]);

  return (
    <div 
      ref={ref}
      className="relative w-full h-64 flex items-center justify-center"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {/* Gradient blob */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br ${colorClasses[color].gradient} opacity-10 rounded-full blur-3xl transition-all duration-1000 ${
            isVisible ? 'scale-100' : 'scale-0'
          }`}
        />
        
        {/* Animated rings */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-${colorClasses[color].ring} rounded-full transition-all duration-700 delay-100 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        />
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-${colorClasses[color].ring} rounded-full transition-all duration-700 delay-200 ${
            isVisible ? 'scale-100 opacity-50' : 'scale-0 opacity-0'
          }`}
        />
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-${colorClasses[color].ring} rounded-full transition-all duration-700 delay-300 ${
            isVisible ? 'scale-100 opacity-25' : 'scale-0 opacity-0'
          }`}
        />
      </div>

      {/* Main icon */}
      <div 
        className={`relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br ${colorClasses[color].gradient} flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isVisible ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-45 opacity-0'
        }`}
      >
        <Icon className="w-12 h-12 text-white" strokeWidth={2} />
      </div>

      {/* Custom decorations */}
      {decorations && (
        <div className={`absolute inset-0 transition-opacity duration-700 delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {decorations}
        </div>
      )}

      {/* Floating particles */}
      {isVisible && (
        <>
          <div 
            className={`absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-${colorClasses[color].gradient} animate-float`}
            style={{ animationDelay: '0s', animationDuration: '3s' }}
          />
          <div 
            className={`absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-${colorClasses[color].gradient} animate-float`}
            style={{ animationDelay: '0.5s', animationDuration: '4s' }}
          />
          <div 
            className={`absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-${colorClasses[color].gradient} animate-float`}
            style={{ animationDelay: '1s', animationDuration: '3.5s' }}
          />
        </>
      )}
    </div>
  );
};

export default StepIllustration;

