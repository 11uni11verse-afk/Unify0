import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, GraduationCap } from "lucide-react";

const SearchPreview = () => {
  return (
    <Card className="border-2 border-primary/20 shadow-2xl">
      <CardContent className="p-8 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">Find Your Perfect Match</h3>
          <p className="text-muted-foreground">Connect with students who share your journey</p>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Your Home Country
              </label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">🇮🇳 India</SelectItem>
                  <SelectItem value="china">🇨🇳 China</SelectItem>
                  <SelectItem value="brazil">🇧🇷 Brazil</SelectItem>
                  <SelectItem value="nigeria">🇳🇬 Nigeria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                Study Destination
              </label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">🇺🇸 United States</SelectItem>
                  <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                  <SelectItem value="canada">🇨🇦 Canada</SelectItem>
                  <SelectItem value="australia">🇦🇺 Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-accent" />
              University or Field of Study
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="e.g. Harvard, Computer Science..." 
                className="pl-10 bg-background"
              />
            </div>
          </div>

          <Button className="w-full" size="lg" variant="accent">
            <Search className="w-5 h-5 mr-2" />
            Find Students
          </Button>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">10K+</p>
              <p className="text-muted-foreground">Students</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">500+</p>
              <p className="text-muted-foreground">Universities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">50+</p>
              <p className="text-muted-foreground">Countries</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchPreview;
