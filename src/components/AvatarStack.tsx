import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarStackProps {
  avatars?: Array<{
    src?: string;
    alt?: string;
    fallback: string;
  }>;
  max?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const AvatarStack = ({ 
  avatars = [], 
  max = 5, 
  label,
  size = "md" 
}: AvatarStackProps) => {
  const displayAvatars = avatars.slice(0, max);
  const remaining = Math.max(0, avatars.length - max);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const borderSizeClasses = {
    sm: "border-2",
    md: "border-2",
    lg: "border-3",
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {displayAvatars.map((avatar, index) => (
          <Avatar
            key={index}
            className={`${sizeClasses[size]} ${borderSizeClasses[size]} border-white shadow-md hover:scale-110 hover:z-10 transition-transform cursor-pointer`}
            style={{ zIndex: displayAvatars.length - index }}
          >
            {avatar.src && <AvatarImage src={avatar.src} alt={avatar.alt || `User ${index + 1}`} />}
            <AvatarFallback className="bg-gradient-to-br from-primary-400 to-primary-600 text-white font-semibold">
              {avatar.fallback}
            </AvatarFallback>
          </Avatar>
        ))}
        {remaining > 0 && (
          <Avatar
            className={`${sizeClasses[size]} ${borderSizeClasses[size]} border-white shadow-md bg-neutral-100`}
            style={{ zIndex: 0 }}
          >
            <AvatarFallback className="bg-neutral-100 text-neutral-600 font-bold">
              +{remaining}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      {label && (
        <span className="text-sm font-medium text-neutral-600">{label}</span>
      )}
    </div>
  );
};

export default AvatarStack;

