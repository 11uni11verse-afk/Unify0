import { useState } from "react";
import { LucideIcon } from "lucide-react";

interface InteractiveFeatureDemoProps {
  icon: LucideIcon;
  title: string;
  description: string;
  demoContent?: React.ReactNode;
  color?: "primary" | "secondary" | "accent";
  badge?: string;
}

const InteractiveFeatureDemo = ({
  icon: Icon,
  title,
  description,
  demoContent,
  color = "primary",
  badge,
}: InteractiveFeatureDemoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const colorClasses = {
    primary: {
      bg: "bg-primary-100",
      text: "text-primary-600",
      border: "border-primary-200",
      gradient: "from-primary-400 to-primary-600",
    },
    secondary: {
      bg: "bg-secondary-100",
      text: "text-secondary-600",
      border: "border-secondary-200",
      gradient: "from-secondary-400 to-secondary-600",
    },
    accent: {
      bg: "bg-accent-100",
      text: "text-accent-600",
      border: "border-accent-200",
      gradient: "from-accent-400 to-accent-600",
    },
  };

  return (
    <div
      className="relative bg-white rounded-2xl p-8 border border-neutral-200 interactive-card group overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Background gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color].gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${colorClasses[color].bg} ${colorClasses[color].text}`}>
            {badge}
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="relative z-10 mb-6">
        <div
          className={`w-16 h-16 rounded-xl ${colorClasses[color].bg} flex items-center justify-center ${colorClasses[color].text} interactive-icon transition-all duration-300 ${
            isHovered ? "scale-110 rotate-3" : ""
          }`}
        >
          <Icon className="w-8 h-8" strokeWidth={2} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3
          className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
            isHovered ? colorClasses[color].text : "text-neutral-900"
          }`}
        >
          {title}
        </h3>
        <p className="text-neutral-600 leading-relaxed mb-4">{description}</p>

        {/* Demo content (expandable) */}
        {demoContent && (
          <div
            className={`transition-all duration-500 overflow-hidden ${
              isExpanded ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
            }`}
          >
            <div className={`p-4 rounded-xl ${colorClasses[color].bg} border ${colorClasses[color].border}`}>
              {demoContent}
            </div>
          </div>
        )}

        {/* Expand indicator */}
        {demoContent && (
          <button
            className={`mt-4 text-sm font-semibold ${colorClasses[color].text} flex items-center gap-2 group-hover:gap-3 transition-all`}
          >
            {isExpanded ? "Show less" : "See how it works"}
            <span className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}>
              ↓
            </span>
          </button>
        )}
      </div>

      {/* Hover glow effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${colorClasses[color].gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
      />
    </div>
  );
};

export default InteractiveFeatureDemo;

