import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AppMockupFrameProps {
  children: ReactNode;
  device?: "phone" | "laptop";
  className?: string;
}

const AppMockupFrame = ({ children, device = "phone", className }: AppMockupFrameProps) => {
  if (device === "laptop") {
    return (
      <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
        {/* Laptop frame */}
        <div className="relative bg-neutral-800 rounded-t-2xl p-3 shadow-2xl">
          {/* Screen bezel */}
          <div className="bg-neutral-900 rounded-lg p-2">
            {/* Screen content */}
            <div className="bg-background rounded-md overflow-hidden shadow-inner">
              <div className="aspect-[16/10] overflow-y-auto scrollbar-hide">
                {children}
              </div>
            </div>
          </div>
        </div>
        {/* Laptop base */}
        <div className="relative h-4 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded-b-xl shadow-lg">
          <div className="absolute inset-x-0 top-0 h-1 bg-neutral-600 rounded-t-sm"></div>
        </div>
        {/* Shadow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-neutral-900/20 blur-xl rounded-full"></div>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full max-w-sm mx-auto", className)}>
      {/* Phone frame */}
      <div className="relative bg-neutral-900 rounded-[2.5rem] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-neutral-900 rounded-b-3xl z-10"></div>
        
        {/* Screen */}
        <div className="relative bg-background rounded-[2rem] overflow-hidden shadow-inner">
          {/* Status bar */}
          <div className="bg-background px-6 py-2 flex items-center justify-between text-xs text-neutral-600">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-3 border border-neutral-400 rounded-sm relative">
                <div className="absolute inset-0.5 bg-neutral-400 rounded-[1px]"></div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="aspect-[9/16] overflow-y-auto scrollbar-hide">
            {children}
          </div>
        </div>
        
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-700 rounded-full"></div>
      </div>
      
      {/* Shadow */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-6 bg-neutral-900/30 blur-xl rounded-full"></div>
    </div>
  );
};

export default AppMockupFrame;