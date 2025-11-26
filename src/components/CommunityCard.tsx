import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, TrendingUp } from "lucide-react";

interface CommunityCardProps {
  name: string;
  description: string;
  members: number;
  activeDiscussions: number;
  category: string;
  trending?: boolean;
  image: string;
}

const CommunityCard = ({ 
  name, 
  description, 
  members, 
  activeDiscussions, 
  category,
  trending,
  image 
}: CommunityCardProps) => {
  return (
    <Card className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-2xl card-hover relative">
      {trending && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-accent animate-bounce-subtle">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </Badge>
        </div>
      )}
      
      <div className="relative h-32 overflow-hidden">
        <img 
          src={image} 
          alt={`${name} community - ${category} group with ${members.toLocaleString()} members`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>
      
      <CardContent className="p-5 -mt-8 relative z-10">
        <div className="bg-card rounded-lg p-4 shadow-xl space-y-3">
          <div>
            <Badge variant="secondary" className="mb-2 text-xs">
              {category}
            </Badge>
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">{members.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">{activeDiscussions}</span>
              </div>
            </div>
          </div>

          <Button className="w-full" size="sm">
            Join Community
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityCard;
