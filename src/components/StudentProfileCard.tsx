import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, GraduationCap, Heart } from "lucide-react";

interface StudentProfileCardProps {
  name: string;
  country: string;
  university: string;
  major: string;
  interests: string[];
  image: string;
  matchPercentage?: number;
}

const StudentProfileCard = ({ 
  name, 
  country, 
  university, 
  major, 
  interests, 
  image,
  matchPercentage = 95 
}: StudentProfileCardProps) => {
  return (
    <Card className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-2xl card-hover">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={`${name}, ${major} student from ${country} at ${university} - ${matchPercentage}% match`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {matchPercentage}% Match
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      
      <CardContent className="p-5 space-y-3">
        <div>
          <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{name}</h3>
          <div className="flex items-center text-sm text-muted-foreground gap-1 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{country}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <GraduationCap className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold">{university}</p>
              <p className="text-muted-foreground">{major}</p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex flex-wrap gap-2">
            {interests.slice(0, 3).map((interest, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
            {interests.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{interests.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentProfileCard;
