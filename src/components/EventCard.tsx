import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  type: "virtual" | "in-person";
  attendees: number;
  category: string;
  image: string;
}

const EventCard = ({ title, date, time, location, type, attendees, category, image }: EventCardProps) => {
  return (
    <Card className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-2xl card-hover">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={`${title} - ${type} ${category} event on ${date} at ${location} with ${attendees} attendees`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Badge className={type === "virtual" ? "bg-secondary" : "bg-accent"}>
            {type === "virtual" ? "Virtual" : "In-Person"}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-2xl font-bold">{date.split(" ")[0]}</p>
          <p className="text-xs uppercase tracking-wide">{date.split(" ")[1]}</p>
        </div>
      </div>
      
      <CardContent className="p-5 space-y-4">
        <div>
          <Badge variant="outline" className="mb-2 text-xs">
            {category}
          </Badge>
          <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span>{attendees} attending</span>
          </div>
        </div>

        <Button className="w-full" variant="outline">
          RSVP Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
