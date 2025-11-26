import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, GraduationCap, UserPlus, MessageCircle } from "lucide-react";

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
    <Card className="group overflow-hidden border-0 transition-all duration-300 w-full max-w-sm mx-auto bg-white rounded-2xl shadow-sm">
      <div className="px-5 pt-5 pb-5">
        {/* Profile Image and Buttons Row */}
        <div className="flex items-start gap-3 mb-4">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white shadow-sm">
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white" title="Online"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-1 pt-1">
            <Button size="sm" variant="outline" className="rounded-full border-primary text-primary hover:bg-primary-50 h-9 px-3 flex-1 bg-white text-sm">
              <div className="relative mr-1.5">
                <MessageCircle className="w-4 h-4" />
                <div className="absolute -top-0.5 -right-0.5 bg-green-500 w-2 h-2 rounded-full border border-white"></div>
              </div>
              Message
            </Button>
            <Button size="sm" className="rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow-sm h-9 px-3 flex-1 text-sm">
              <UserPlus className="w-4 h-4 mr-1.5" />
              Follow
            </Button>
          </div>
        </div>

        {/* Name & Bio Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              {name}
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-[10px]">
                ✓
              </span>
            </h3>
            <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full border border-primary-100">
              {matchPercentage}% Match
            </span>
          </div>
          <div className="flex items-center text-sm text-neutral-500 gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{country}</span>
          </div>

          <div className="flex items-center gap-4 py-3 border-y border-neutral-200 my-3">
            <div className="text-center flex-1">
              <span className="block font-bold text-neutral-900 text-base">1.2k</span>
              <span className="text-xs text-neutral-500">Followers</span>
            </div>
            <div className="w-px h-8 bg-neutral-200"></div>
            <div className="text-center flex-1">
              <span className="block font-bold text-neutral-900 text-base">485</span>
              <span className="text-xs text-neutral-500">Following</span>
            </div>
            <div className="w-px h-8 bg-neutral-200"></div>
            <div className="text-center flex-1">
              <span className="block font-bold text-neutral-900 text-base">Toronto</span>
              <span className="text-xs text-neutral-500">Destination</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-neutral-700">
            <GraduationCap className="w-4 h-4 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-neutral-900">{major}</p>
              <p className="text-neutral-500 text-xs">at {university}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wider">INTERESTS</p>
          <div className="flex flex-wrap gap-1.5">
            {interests.slice(0, 4).map((interest, idx) => (
              <Badge key={idx} variant="secondary" className="bg-white border border-neutral-200 text-neutral-700 hover:border-primary-300 hover:bg-primary-50 transition-colors font-normal rounded-full px-3 py-1">
                {interest}
              </Badge>
            ))}
            {interests.length > 4 && (
              <Badge variant="outline" className="bg-neutral-50 text-neutral-500 border-neutral-200 rounded-full px-3 py-1">
                +{interests.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StudentProfileCard;
