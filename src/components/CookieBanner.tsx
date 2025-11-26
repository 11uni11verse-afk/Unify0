import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
      <Card className="max-w-4xl mx-auto shadow-2xl border-2">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">We value your privacy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={acceptCookies} size="sm" variant="default">
                  Accept All
                </Button>
                <Button onClick={declineCookies} size="sm" variant="outline">
                  Decline
                </Button>
              </div>
            </div>
            <button
              onClick={declineCookies}
              className="flex-shrink-0 p-1 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close cookie banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieBanner;