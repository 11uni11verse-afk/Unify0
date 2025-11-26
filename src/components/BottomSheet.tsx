import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  snapPoints?: number[]; // Percentage heights [50, 100]
}

const BottomSheet = ({
  isOpen,
  onClose,
  children,
  title,
  snapPoints = [50, 90],
}: BottomSheetProps) => {
  const [currentSnap, setCurrentSnap] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaY = currentY - startY;

    // If dragged down significantly, close or snap to lower point
    if (deltaY > 100) {
      if (currentSnap === 0) {
        onClose();
      } else {
        setCurrentSnap(currentSnap - 1);
      }
    }
    // If dragged up, snap to higher point
    else if (deltaY < -100 && currentSnap < snapPoints.length - 1) {
      setCurrentSnap(currentSnap + 1);
    }

    setStartY(0);
    setCurrentY(0);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const height = snapPoints[currentSnap];
  const dragOffset = isDragging ? Math.max(0, currentY - startY) : 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
        style={{ opacity: isOpen ? 1 : 0 }}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 transition-all duration-300 ease-out"
        style={{
          height: `${height}vh`,
          transform: `translateY(${dragOffset}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-neutral-300 rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
            <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5 text-neutral-600" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto px-6 py-4" style={{ maxHeight: `calc(${height}vh - 100px)` }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;

