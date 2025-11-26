import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  title = "Welcome to UnifyO! 🎉",
  description = "Check your email for confirmation"
}: SuccessModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // Auto close after 4 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fade-in p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div
        className="bg-white rounded-2xl p-8 text-center max-w-md w-full shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Close success message"
        >
          <X className="w-5 h-5 text-neutral-600" />
        </button>
        
        <div className="animate-bounce-subtle">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        </div>
        
        <h3 id="success-modal-title" className="text-2xl font-bold mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground">{description}</p>
        
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-primary-700 bg-primary-50 py-2.5 px-4 rounded-xl border border-primary-100">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>You're on the list! We'll be in touch soon.</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;