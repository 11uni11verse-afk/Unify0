import { useEffect, useRef, useState } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxSection = ({ children, speed = 0.5, className = "" }: ParallaxSectionProps) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;

      // Only apply parallax when element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const parallax = (scrolled - elementTop) * speed;
        setOffset(parallax);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <div style={{ transform: `translateY(${offset}px)` }}>
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;

