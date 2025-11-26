import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileStickyCTAProps {
  onJoinWaitlist: () => void;
}

const MobileStickyCTA = ({ onJoinWaitlist }: MobileStickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px and not dismissed
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 300) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t-2 border-primary-200 shadow-2xl p-4 md:hidden z-40 transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
      role="complementary"
      aria-label="Join waitlist call to action"
    >
      <div className="flex items-center gap-3">
        <Button
          onClick={onJoinWaitlist}
          className="flex-1 h-12 font-semibold"
          size="lg"
          variant="accent"
          aria-label="Join waitlist - Get early access"
        >
          Join Waitlist
          <ArrowRight className="w-4 h-4" />
        </Button>
        <button
          onClick={handleDismiss}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
          aria-label="Dismiss call to action"
        >
          <X className="w-5 h-5 text-neutral-600" />
        </button>
      </div>
    </div>
  );
};

export default MobileStickyCTA;