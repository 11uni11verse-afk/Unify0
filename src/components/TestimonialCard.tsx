import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  country: string;
  university: string;
  content: string;
  image: string;
  rating: number;
}

const TestimonialCard = ({ name, country, university, content, image, rating }: TestimonialCardProps) => {
  return (
    <Card className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-card to-neutral-50 hover:shadow-2xl card-hover">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating
                  ? "fill-accent text-accent"
                  : "fill-neutral-200 text-neutral-200"
              }`}
            />
          ))}
        </div>

        <div className="relative">
          <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
          <p className="text-foreground leading-relaxed pl-6 relative z-10">
            {content}
          </p>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
              <img 
                src={image} 
                alt={`${name}, international student from ${country} studying at ${university}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card"></div>
          </div>
          <div>
            <p className="font-bold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{country} → {university}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
