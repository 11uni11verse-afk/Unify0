import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import ConfettiAnimation from "./ConfettiAnimation";

interface SuccessAnimationProps {
  show: boolean;
  title?: string;
  message?: string;
  onComplete?: () => void;
  showConfetti?: boolean;
}

const SuccessAnimation = ({
  show,
  title = "Success!",
  message = "Your action was completed successfully.",
  onComplete,
  showConfetti = true,
}: SuccessAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);

      if (onComplete) {
        const timer = setTimeout(onComplete, 3000);
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <>
      {showConfetti && <ConfettiAnimation trigger={show} />}

      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 pointer-events-auto scale-in">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping" />
              {/* Icon */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-success-bounce">
                <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">{title}</h3>
            <p className="text-neutral-600 leading-relaxed">{message}</p>
          </div>

          {/* Animated checkmark SVG (optional alternative) */}
          <div className="mt-6 flex justify-center">
            <svg
              className="w-16 h-16"
              viewBox="0 0 52 52"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="stroke-green-500 fill-none"
                cx="26"
                cy="26"
                r="25"
                strokeWidth="2"
              />
              <path
                className="stroke-green-500 fill-none animate-checkmark-draw"
                strokeWidth="3"
                strokeLinecap="round"
                d="M14 27l7 7 16-16"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessAnimation;

