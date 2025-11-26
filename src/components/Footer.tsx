import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react";
import UnifyOLogo from "@/components/UnifyOLogo";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border section-py" role="contentinfo" aria-label="Site footer">
      <div className="container-fluid container-px">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-gap">
          <div>
            <div className="flex items-center space-x-3 mb-4 group">
              <UnifyOLogo size={44} animated={false} className="drop-shadow-lg" />
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent">
                  Unify<span className="inline-block">O</span>
                </span>
                <span className="text-[9px] font-semibold tracking-[0.2em] text-neutral-500 uppercase mt-0.5">
                  Connect Globally
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Connecting international students worldwide through shared experiences and communities.
            </p>
            <p className="text-xs text-primary-600 font-medium mb-4">
              Built with international students, for international students.
            </p>
            
            {/* App Store Badges - Placeholders */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-neutral-900 text-white rounded-lg px-4 py-2 flex items-center gap-2 text-xs opacity-50 cursor-not-allowed">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-[10px] opacity-70">Coming Soon</p>
                  <p className="font-semibold">App Store</p>
                </div>
              </div>
              <div className="bg-neutral-900 text-white rounded-lg px-4 py-2 flex items-center gap-2 text-xs opacity-50 cursor-not-allowed">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="text-[10px] opacity-70">Coming Soon</p>
                  <p className="font-semibold">Google Play</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4" id="platform-links">Platform</h3>
            <ul className="space-y-2" aria-labelledby="platform-links">
              <li>
                <Link to="/features" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Free Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4" id="company-links">Company</h3>
            <ul className="space-y-2" aria-labelledby="company-links">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4" id="social-links">Connect With Us</h3>
            <div className="flex space-x-4 mb-4" aria-labelledby="social-links">
              <a href="https://www.linkedin.com/company/uni-verse11/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/uni_fyo?igsh=am1lcjJtZTJheXoy&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://x.com/Uni_fyO" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:11astitvajha@gmail.com" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>+91 6261786931</span>
            </div>
            
            <p className="text-xs text-muted-foreground mt-3">Follow us for updates and student tips</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} UnifyO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
