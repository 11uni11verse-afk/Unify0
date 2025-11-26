import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  velocity: { x: number; y: number };
  rotationSpeed: number;
}

interface ConfettiAnimationProps {
  trigger: boolean;
  duration?: number;
  particleCount?: number;
}

const ConfettiAnimation = ({
  trigger,
  duration = 3000,
  particleCount = 50,
}: ConfettiAnimationProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);

  const colors = [
    "#FF6F61", // Primary
    "#2C7A7B", // Secondary
    "#F6E05E", // Accent
    "#48BB78", // Green
    "#4299E1", // Blue
    "#ED64A6", // Pink
  ];

  useEffect(() => {
    if (!trigger) return;

    setIsActive(true);

    // Generate particles
    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: Math.random() * 2 + 1,
      },
      rotationSpeed: (Math.random() - 0.5) * 10,
    }));

    setParticles(newParticles);

    // Clear after duration
    const timer = setTimeout(() => {
      setIsActive(false);
      setParticles([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [trigger, duration, particleCount]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-sm animate-confetti-fall"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            animation: `confetti-fall ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            animationDelay: `${Math.random() * 200}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiAnimation;

