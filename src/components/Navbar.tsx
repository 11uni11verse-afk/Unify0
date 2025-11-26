import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import UnifyOLogo from "@/components/UnifyOLogo";
import SkipToContent from "@/components/SkipToContent";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <SkipToContent />
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-card/95 backdrop-blur-lg border-border shadow-lg" 
          : "bg-white/80 backdrop-blur-sm border-neutral-200"
      }`} role="navigation" aria-label="Main navigation">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-0 transition-opacity duration-300" 
           style={{ opacity: scrolled ? 1 : 0 }} />
      <div className="container-fluid">
        <div className="flex justify-between items-center h-16 sm:h-18">
          <Link to="/" className="flex items-center space-x-2.5 group relative">
            <div className="group-hover:scale-105 transition-transform duration-300">
              <UnifyOLogo size={42} className="shadow-md" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1a7bb9] group-hover:text-[#1565a0] transition-colors">
              UnifyO
            </span>
          </Link>

          {/* Desktop Menu - Right aligned */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`px-3 py-2 transition-all duration-200 rounded-md ${isActive('/') ? 'text-primary font-semibold bg-primary-50' : 'text-foreground hover:text-primary hover:bg-neutral-50'}`}>
              Home
            </Link>
            <Link to="/features" className={`px-3 py-2 transition-all duration-200 rounded-md ${isActive('/features') ? 'text-primary font-semibold bg-primary-50' : 'text-foreground hover:text-primary hover:bg-neutral-50'}`}>
              Features
            </Link>
            <Link to="/how-it-works" className={`px-3 py-2 transition-all duration-200 rounded-md ${isActive('/how-it-works') ? 'text-primary font-semibold bg-primary-50' : 'text-foreground hover:text-primary hover:bg-neutral-50'}`}>
              How It Works
            </Link>
            <Link to="/guides" className={`px-3 py-2 transition-all duration-200 rounded-md ${isActive('/guides') ? 'text-primary font-semibold bg-primary-50' : 'text-foreground hover:text-primary hover:bg-neutral-50'}`}>
              Guides
            </Link>
            <Link to="/about" className={`px-3 py-2 transition-all duration-200 rounded-md ${isActive('/about') ? 'text-primary font-semibold bg-primary-50' : 'text-foreground hover:text-primary hover:bg-neutral-50'}`}>
              About
            </Link>
            <Button 
              size="default" 
              variant="accent" 
              className="font-semibold"
              onClick={() => {
                const waitlistSection = document.getElementById('waitlist');
                if (waitlistSection) {
                  waitlistSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#waitlist';
                }
              }}
            >
              Get Early Access
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

          {/* Mobile Menu - Improved touch targets */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border animate-fade-in max-h-[calc(100vh-5rem)] overflow-y-auto">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-lg transition-colors min-h-[48px] flex items-center ${isActive('/') ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-muted'}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/features"
              className={`block px-4 py-3 rounded-lg transition-colors min-h-[48px] flex items-center ${isActive('/features') ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-muted'}`}
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/how-it-works"
              className={`block px-4 py-3 rounded-lg transition-colors min-h-[48px] flex items-center ${isActive('/how-it-works') ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-muted'}`}
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/guides"
              className={`block px-4 py-3 rounded-lg transition-colors min-h-[48px] flex items-center ${isActive('/guides') ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-muted'}`}
              onClick={() => setIsOpen(false)}
            >
              Guides
            </Link>
            <Link
              to="/about"
              className={`block px-4 py-3 rounded-lg transition-colors min-h-[48px] flex items-center ${isActive('/about') ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-muted'}`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block px-4 py-3 rounded-lg transition-colors min-h-[48px] flex items-center ${isActive('/contact') ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-muted'}`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/faq"
              className={`block px-4 py-3 rounded-lg transition-colors min-h-[48px] flex items-center ${isActive('/faq') ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-muted'}`}
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
            <div className="px-4 pt-2">
              <Button 
                className="w-full h-12" 
                variant="accent"
                onClick={() => {
                  setIsOpen(false);
                  const waitlistSection = document.getElementById('waitlist');
                  if (waitlistSection) {
                    waitlistSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#waitlist';
                  }
                }}
              >
                Get Early Access
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
