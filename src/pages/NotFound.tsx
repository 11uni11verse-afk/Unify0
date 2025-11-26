import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main id="main-content" className="flex-1 flex items-center justify-center section-padding pt-32">
        <div className="container-fluid max-w-2xl text-center">
          <div className="animate-fade-in">
            {/* 404 Number with gradient */}
            <div className="mb-8">
              <h1 className="text-9xl sm:text-[12rem] font-bold gradient-text leading-none">
                404
              </h1>
            </div>

            {/* Lost compass icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-bounce-subtle">
                <Compass className="w-10 h-10 text-primary" />
              </div>
            </div>

            {/* Message */}
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              The page you're looking for seems to have wandered off. Don't worry, even the best explorers get lost sometimes!
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/">
                <Button size="lg" className="w-full sm:w-auto group">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto group">
                  <Search className="w-5 h-5 mr-2" />
                  Explore Features
                </Button>
              </Link>
            </div>

            {/* Helpful links */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Looking for something specific? Try these popular pages:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/about" className="text-sm text-primary hover:underline">
                  About Us
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/contact" className="text-sm text-primary hover:underline">
                  Contact
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/faq" className="text-sm text-primary hover:underline">
                  FAQ
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/guides" className="text-sm text-primary hover:underline">
                  Guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
