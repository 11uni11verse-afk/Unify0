import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface InteractiveFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const InteractiveFeatureCard = ({ icon: Icon, title, description, color }: InteractiveFeatureCardProps) => {
  return (
    <Card 
      className="group overflow-hidden border-2 hover:border-primary transition-all duration-500 card-hover cursor-pointer"
    >
      <CardContent className="p-6 relative">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -mr-16 -mt-16`}></div>
        
        <div className="relative z-10 space-y-3">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>

          <div className="space-y-2 pt-1">
            <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveFeatureCard;
