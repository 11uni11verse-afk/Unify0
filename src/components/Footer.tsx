import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react";
import UnifyOLogo from "@/components/UnifyOLogo";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-10 sm:py-12 lg:py-16" role="contentinfo" aria-label="Site footer">
      <div className="container-fluid container-px">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 sm:space-x-2.5 mb-3 sm:mb-4 group">
              <UnifyOLogo size={36} className="shadow-md sm:w-[42px] sm:h-[42px]" />
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#1a7bb9]">
                UnifyO
                </span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm mb-2">
              The social networking platform for international students who want real answers, not corporate waffle.
            </p>
            <p className="text-xs sm:text-sm font-semibold text-primary-600 mb-4">
              Real students. Real advice. Real connections.
            </p>
            
            {/* App Store Badges - Placeholders */}
            <div className="flex flex-row gap-2 sm:gap-3">
              <div className="bg-neutral-900 text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs opacity-50 cursor-not-allowed flex-1 sm:flex-initial">
                <span className="text-lg sm:text-2xl">📱</span>
                <div>
                  <p className="text-[8px] sm:text-[10px] opacity-70">Coming Soon</p>
                  <p className="font-semibold text-[10px] sm:text-xs">App Store</p>
                </div>
              </div>
              <div className="bg-neutral-900 text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs opacity-50 cursor-not-allowed flex-1 sm:flex-initial">
                <span className="text-lg sm:text-2xl">🤖</span>
                <div>
                  <p className="text-[8px] sm:text-[10px] opacity-70">Coming Soon</p>
                  <p className="font-semibold text-[10px] sm:text-xs">Play</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base" id="platform-links">Platform</h3>
            <ul className="space-y-1.5 sm:space-y-2" aria-labelledby="platform-links">
              <li>
                <Link to="/features" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                  Free Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base" id="company-links">Company</h3>
            <ul className="space-y-1.5 sm:space-y-2" aria-labelledby="company-links">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base" id="social-links">Connect With Us</h3>
            <div className="flex space-x-3 sm:space-x-4 mb-3 sm:mb-4" aria-labelledby="social-links">
              <a href="https://www.linkedin.com/company/uni-verse11/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://www.instagram.com/uni_fyo?igsh=am1lcjJtZTJheXoy&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110" aria-label="Instagram">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://x.com/Uni_fyO" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110" aria-label="Twitter">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="mailto:11astitvajha@gmail.com" className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110" aria-label="Email">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
            
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>+91 6261786931</span>
            </div>
            
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3">Follow us for updates and student tips</p>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} UnifyO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
