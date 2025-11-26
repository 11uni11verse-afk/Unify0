import { cn } from "@/lib/utils";

interface SocialProofStripProps {
  count?: number;
  text?: string;
  avatars?: string[];
  className?: string;
  size?: "sm" | "md" | "lg";
}

const defaultAvatars = [
  "https://i.pravatar.cc/100?u=user1",
  "https://i.pravatar.cc/100?u=user2",
  "https://i.pravatar.cc/100?u=user3",
  "https://i.pravatar.cc/100?u=user4",
  "https://i.pravatar.cc/100?u=user5",
];

const SocialProofStrip = ({
  count = 3200,
  text,
  avatars = defaultAvatars,
  className,
  size = "md",
}: SocialProofStripProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const displayText = text || `${count.toLocaleString()}+ students already connected`;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Avatar Stack */}
      <div className="flex -space-x-2">
        {avatars.slice(0, 5).map((avatar, index) => (
          <div
            key={index}
            className={cn(
              "rounded-full ring-2 ring-background overflow-hidden shadow-md hover:scale-110 transition-transform",
              sizeClasses[size]
            )}
            style={{ zIndex: avatars.length - index }}
          >
            <img
              src={avatar}
              alt={`Student ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {count > avatars.length && (
          <div
            className={cn(
              "rounded-full ring-2 ring-background bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold shadow-md",
              sizeClasses[size]
            )}
            style={{ zIndex: 0 }}
          >
            +{Math.floor(count / 100)}k
          </div>
        )}
      </div>

      {/* Text */}
      <p className="text-sm font-medium text-neutral-700">{displayText}</p>
    </div>
  );
};

export default SocialProofStrip;