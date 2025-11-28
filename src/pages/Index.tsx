import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { 
  Users, MessageCircle, Globe2, BookOpen, Heart, Sparkles, ArrowRight, 
  Shield, MapPin, Zap, CheckCircle2, Star, GraduationCap, Lock, TrendingUp, X, UserPlus
} from "lucide-react";
import { Link } from "react-router-dom";
import { trackCTAClick } from "@/lib/analytics";
import StatCounter from "@/components/StatCounter";
import AvatarStack from "@/components/AvatarStack";
import StepIllustration from "@/components/illustrations/StepIllustration";
import { SignUpDecorations, MatchingDecorations, ConnectDecorations } from "@/components/illustrations/StepDecorations";
import ParallaxSection from "@/components/ParallaxSection";
import ScrollRevealEnhanced from "@/components/ScrollRevealEnhanced";
import AnimatedBadge from "@/components/AnimatedBadge";
import AppMockupFrame from "@/components/social/AppMockupFrame";
import ChatPreview from "@/components/social/ChatPreview";
import StudentProfileCard from "@/components/StudentProfileCard";
import { Badge } from "@/components/ui/badge";

// Optimized hero image with responsive sizes
const heroImage = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&q=75";
const heroImageLarge = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=1000&fit=crop&q=80"; 

const Index = () => {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden selection:bg-primary-200">
      <SEO 
        title="UnifyO | Find Your Community Abroad"
        description="The upcoming social network for international students. Join the waitlist to connect with peers from your home country."
        url="https://unifyo.com"
      />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
      
      {/* HERO SECTION: Pre-Launch "Anticipation" Mode */}
      <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.6] -z-10" />
        <ParallaxSection speed={0.3} className="absolute top-0 right-0 -z-10 hidden sm:block">
          <div className="w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-primary-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        </ParallaxSection>
        <ParallaxSection speed={0.5} className="absolute bottom-0 left-0 -z-10 hidden sm:block">
          <div className="w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-secondary-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        </ParallaxSection>

        <div className="container-fluid container-px relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Hero Content */}
            <div className="max-w-2xl reveal-up text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-foreground mb-4">
                Your social networking platform for <span className="text-highlight">international students</span> is almost here
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed mb-3 sm:mb-4 max-w-lg mx-auto lg:mx-0">
                Ever landed in a new country and thought, "Where do I even start?" You're not alone. Thousands of international students face the same questions every single day.
              </p>
              
              <p className="text-sm sm:text-base lg:text-lg text-neutral-500 leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
                That's exactly why we built UnifyO — the essential platform for students who want real answers, not corporate waffle.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center lg:items-start justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-lg btn-gradient text-white w-full sm:w-auto group shadow-[0_22px_55px_-22px_rgba(248,113,113,0.9)] hover:shadow-[0_26px_70px_-26px_rgba(248,113,113,1)] transition-shadow"
                  onClick={() => {
                    trackCTAClick('hero', 'join_waitlist');
                    scrollToWaitlist();
                  }}
                >
                  Join the Waitlist
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
            </div>

            {/* Hero Visual - Visible on all screens but sized appropriately */}
            <div className="relative h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] mt-6 lg:mt-0 reveal-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-neutral-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-layered-lg">
                <img 
                  src={heroImage}
                  srcSet={`${heroImage} 800w, ${heroImageLarge} 1200w`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 800px, 1200px"
                  alt="International students connecting and collaborating" 
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width={1200}
                  height={1000}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - App Experience Journey */}
      <section className="section-py layer-shade-1 relative overflow-hidden">
        {/* Ambient Background Gradient - Subtle & Premium */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[-10%] w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-primary-100/20 rounded-full blur-[60px] sm:blur-[100px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-secondary-100/20 rounded-full blur-[60px] sm:blur-[100px]" />
        </div>

        <div className="container-fluid container-px content-width-lg relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-24 lg:mb-32">
            <ScrollRevealEnhanced>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 mb-4 sm:mb-6 tracking-tight leading-[1.15]">
                Connect before you go, <br className="hidden sm:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500">
                  thrive when you arrive
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-500 max-w-2xl mx-auto leading-relaxed font-light px-2">
                More than just a guide—it's your social circle waiting for you at your destination.
              </p>
            </ScrollRevealEnhanced>
          </div>

          <div className="space-y-16 sm:space-y-24 lg:space-y-40">
            {/* Step 1: Profile */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center relative">
              {/* Text Content */}
              <ScrollRevealEnhanced direction="right" className="order-2 lg:order-1 relative">
                {/* Large Watermark Number - Hidden on mobile */}
                <span className="absolute -top-16 sm:-top-20 lg:-top-24 -left-4 sm:-left-8 lg:-left-12 text-[6rem] sm:text-[8rem] lg:text-[12rem] leading-none font-bold text-primary-100 select-none -z-10 font-display hidden sm:block">
                  01
                </span>
                
                <div className="relative z-10 pt-0 sm:pt-4">
                  <div className="inline-flex items-center gap-2 mb-3 sm:hidden">
                    <span className="text-4xl font-bold text-primary-200">01</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-neutral-900">Create your student identity</h3>
                  <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed mb-6 sm:mb-8 font-light">
                    Build a profile that highlights not just where you're from, but where you're going. Add your university, major, and interests to find your perfect crowd.
                  </p>
                  <ul className="space-y-3 sm:space-y-5">
                    {[
                      "Verified student status (.edu)",
                      "Showcase your home city & culture",
                      "Highlight your study interests"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg text-neutral-700 group">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealEnhanced>

              {/* Visual - Hidden on small mobile, scaled on tablet */}
              <ScrollRevealEnhanced direction="left" className="order-1 lg:order-2 hidden sm:flex justify-center lg:justify-end relative group">
                <div className="relative z-10 transition-transform duration-700 hover:-translate-y-2 scale-90 sm:scale-100">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-200/40 to-transparent rounded-[3rem] blur-3xl transform rotate-6 scale-110 opacity-60" />
                  <AppMockupFrame>
                    <div className="bg-neutral-50 h-full p-4 overflow-y-auto hide-scrollbar">
                      <div className="text-center mb-6 pt-4">
                        <h4 className="font-bold text-neutral-900">Your Profile</h4>
                        <p className="text-xs text-neutral-500">Preview</p>
                      </div>
                      <StudentProfileCard 
                        name="Priya Sharma"
                        country="Mumbai, India"
                        university="Univ. of Toronto"
                        major="Computer Science"
                        interests={["Photography", "Coding", "Cricket", "Travel"]}
                        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                        matchPercentage={100}
                      />
                      <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border border-neutral-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-neutral-700">Profile Strength</span>
                          <span className="text-xs font-bold text-green-600">Excellent</span>
                        </div>
                        <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full w-[90%] bg-green-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </AppMockupFrame>
                </div>
              </ScrollRevealEnhanced>
            </div>

            {/* Step 2: Connect */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center relative">
              {/* Visual - Left - Hidden on small mobile */}
              <ScrollRevealEnhanced direction="right" className="order-1 hidden sm:flex justify-center lg:justify-start relative group">
                <div className="relative z-10 transition-transform duration-700 hover:-translate-y-2 scale-90 sm:scale-100">
                  <div className="absolute inset-0 bg-gradient-to-tl from-secondary-200/40 to-transparent rounded-[3rem] blur-3xl transform -rotate-6 scale-110 opacity-60" />
                  <AppMockupFrame>
                    <div className="bg-white h-full flex flex-col">
                      {/* Header */}
                      <div className="px-4 pt-3 pb-2 flex justify-between items-center border-b border-neutral-100">
                        <h4 className="font-bold text-xl text-neutral-900">Daily Matches</h4>
                        <Badge variant="secondary" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 text-xs px-2.5 py-1 rounded-md font-normal">New</Badge>
                      </div>
                      
                      {/* Match Card */}
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 flex-1 flex flex-col group/card">
                          {/* Profile Image */}
                          <div className="relative flex-1 overflow-hidden bg-neutral-100">
                            <img 
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&q=75" 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" 
                              alt="Student match profile - Rahul from Delhi studying in Toronto"
                              loading="lazy"
                              decoding="async"
                              width={300}
                              height={400}
                            />
                            {/* Text Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
                              <h3 className="text-xl font-bold text-white mb-1">Rahul, 22</h3>
                              <p className="text-white/95 text-sm flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>Delhi → Toronto</span>
                              </p>
                            </div>
                            </div>
                            
                          {/* Interest Badges */}
                          <div className="p-4 bg-white">
                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge variant="outline" className="bg-neutral-100 text-neutral-700 border-neutral-200 rounded-full px-3 py-1.5 text-sm font-normal">♫ Music</Badge>
                              <Badge variant="outline" className="bg-neutral-100 text-neutral-700 border-neutral-200 rounded-full px-3 py-1.5 text-sm font-normal">🏏 Cricket</Badge>
                              <Badge variant="outline" className="bg-neutral-100 text-neutral-700 border-neutral-200 rounded-full px-3 py-1.5 text-sm font-normal">☕ Coffee</Badge>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-6 mt-4 justify-center items-center">
                          <button 
                            className="w-14 h-14 rounded-full bg-neutral-100 border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95"
                            aria-label="Pass"
                          >
                            <X className="w-6 h-6" strokeWidth={2.5} />
                          </button>
                          <button 
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 shadow-lg shadow-teal-200/50 flex items-center justify-center text-white transform hover:scale-110 transition-all active:scale-95"
                            aria-label="Follow"
                          >
                            <UserPlus className="w-7 h-7 fill-current" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </AppMockupFrame>
                </div>
              </ScrollRevealEnhanced>

              {/* Text Content - Right */}
              <ScrollRevealEnhanced direction="left" className="order-2 sm:order-2 relative">
                 {/* Large Watermark Number - Hidden on mobile */}
                 <span className="absolute -top-16 sm:-top-20 lg:-top-24 -left-4 sm:-left-8 lg:-left-12 text-[6rem] sm:text-[8rem] lg:text-[12rem] leading-none font-bold text-secondary-100 select-none -z-10 font-display hidden sm:block">
                  02
                </span>

                <div className="relative z-10 pt-0 sm:pt-4">
                  <div className="inline-flex items-center gap-2 mb-3 sm:hidden">
                    <span className="text-4xl font-bold text-secondary-200">02</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-neutral-900">Swipe to find your squad</h3>
                  <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed mb-6 sm:mb-8 font-light">
                    No more random Facebook groups. Our smart algorithm matches you with students from your home city who share your destination, major, and vibe.
                  </p>
                  <ul className="space-y-3 sm:space-y-5">
                    {[
                      "Match by home city & destination",
                      "Filter by intake year & university",
                      "Safe, verified connections only"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg text-neutral-700 group">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-secondary-50 border border-secondary-100 flex items-center justify-center text-secondary-600 flex-shrink-0 group-hover:bg-secondary-100 transition-colors">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealEnhanced>
            </div>

            {/* Step 3: Chat */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center relative">
              {/* Text Content */}
              <ScrollRevealEnhanced direction="right" className="order-2 lg:order-1 relative">
                {/* Large Watermark Number - Hidden on mobile */}
                <span className="absolute -top-16 sm:-top-20 lg:-top-24 -left-4 sm:-left-8 lg:-left-12 text-[6rem] sm:text-[8rem] lg:text-[12rem] leading-none font-bold text-accent-100 select-none -z-10 font-display hidden sm:block">
                  03
                </span>

                <div className="relative z-10 pt-0 sm:pt-4">
                  <div className="inline-flex items-center gap-2 mb-3 sm:hidden">
                    <span className="text-4xl font-bold text-accent-200">03</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-neutral-900">Start the conversation</h3>
                  <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed mb-6 sm:mb-8 font-light">
                    Break the ice before you even pack your bags. Find roommates, plan flights together, or just get advice from someone who's already there.
                  </p>
                  <ul className="space-y-3 sm:space-y-5">
                    {[
                      "Direct messaging & Group chats",
                      "City-specific community channels",
                      "Real-time advice & support"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg text-neutral-700 group">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-600 flex-shrink-0 group-hover:bg-accent-100 transition-colors">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 sm:mt-10">
                    <Button 
                      size="lg" 
                      className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-xl btn-gradient text-white group shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all w-full sm:w-auto"
                      onClick={() => {
                        trackCTAClick('how_it_works', 'join_waitlist');
                        scrollToWaitlist();
                      }}
                    >
                      Start Your Journey Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </ScrollRevealEnhanced>

              {/* Visual - Hidden on small mobile */}
              <ScrollRevealEnhanced direction="left" className="order-1 lg:order-2 hidden sm:flex justify-center lg:justify-end relative group">
                <div className="relative z-10 transition-transform duration-700 hover:-translate-y-2 scale-90 sm:scale-100">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-200/40 to-transparent rounded-[3rem] blur-3xl transform rotate-6 scale-110 opacity-60" />
                  <AppMockupFrame>
                    <ChatPreview />
                  </AppMockupFrame>
                </div>
              </ScrollRevealEnhanced>
            </div>
          </div>
        </div>
      </section>

      {/* LAUNCH GOALS - Bento Grid Redesign */}
      <section className="section-py layer-shade-2 relative overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 bg-neutral-50/50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-gradient-to-tr from-primary-200/20 via-secondary-200/20 to-accent-200/20 rounded-full blur-3xl -z-10" />

        <div className="container-fluid container-px content-width-lg relative z-10">
          <ScrollRevealEnhanced>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-3 sm:mb-4">Building something special</h2>
              <p className="text-base sm:text-lg text-neutral-600">Join us on the journey to launch</p>
            </div>
          </ScrollRevealEnhanced>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* Main Card - Waitlist (Span 7) */}
            <ScrollRevealEnhanced className="lg:col-span-7 h-full" delay={0}>
              <div className="h-full relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-neutral-100 shadow-xl p-5 sm:p-8 md:p-10 flex flex-col justify-between group hover:border-primary-200 transition-all duration-300 hover:shadow-2xl">
                <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-gradient-to-bl from-primary-50 to-transparent rounded-bl-full opacity-50 transition-opacity group-hover:opacity-100" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 shadow-sm">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="font-bold text-primary-600 uppercase tracking-wider text-xs sm:text-sm">Community Goal</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-3 sm:mb-4">
                    <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 tracking-tight">1,000</span>
                    <span className="text-lg sm:text-xl md:text-2xl text-neutral-500 font-medium">Founding Members</span>
                  </div>
                  
                  <p className="text-neutral-600 text-base sm:text-lg mb-5 sm:mb-8 max-w-md leading-relaxed">
                    We're building a curated community of international students. Secure your spot as a founding member before we reach capacity.
                  </p>
                </div>
                
                {/* Progress Bar Integrated */}
                <div className="relative z-10 bg-neutral-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-neutral-100 group-hover:border-primary-100 transition-colors">
                  <div className="flex justify-between text-xs sm:text-sm mb-2 sm:mb-3 font-medium">
                    <span className="text-neutral-700 flex items-center gap-1 sm:gap-2">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500" />
                      Waitlist Progress
                    </span>
                    <span className="text-primary-600 animate-pulse text-xs sm:text-sm">Growing daily!</span>
                  </div>
                  <div className="h-3 sm:h-4 bg-neutral-200/50 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full w-[35%] bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-400 rounded-full relative">
                      <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                    <p className="text-xs text-neutral-500">Limited spots available for Fall 2026</p>
                    <Button variant="link" className="h-auto p-0 text-primary-600 font-semibold hover:text-primary-700 text-xs sm:text-sm" onClick={() => {
                        trackCTAClick('stats', 'join_waitlist');
                        scrollToWaitlist();
                      }}>
                      Join now <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollRevealEnhanced>

            {/* Side Cards (Span 5) */}
            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-6 h-full">
              {/* Global Reach */}
              <ScrollRevealEnhanced delay={100} className="h-full">
                <div className="h-full rounded-2xl sm:rounded-3xl bg-white border border-neutral-100 shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-secondary-50 flex items-center justify-center text-secondary-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Globe2 className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-0.5 sm:mb-1">15+</div>
                    <div className="text-neutral-600 font-medium text-sm sm:text-base">Target Countries</div>
                    <p className="text-xs text-neutral-400 mt-0.5 sm:mt-1 hidden sm:block">Expanding globally</p>
                  </div>
                </div>
              </ScrollRevealEnhanced>

              {/* Partners */}
              <ScrollRevealEnhanced delay={200} className="h-full">
                <div className="h-full rounded-2xl sm:rounded-3xl bg-white border border-neutral-100 shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-accent-50 flex items-center justify-center text-accent-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-0.5 sm:mb-1">50+</div>
                    <div className="text-neutral-600 font-medium text-sm sm:text-base">Partner Unis</div>
                    <p className="text-xs text-neutral-400 mt-0.5 sm:mt-1 hidden sm:block">Trusted network</p>
                  </div>
                </div>
              </ScrollRevealEnhanced>

              {/* Launch Date - Dark Card */}
              <ScrollRevealEnhanced delay={300} className="h-full col-span-2 lg:col-span-1">
                <div className="h-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white shadow-xl p-4 sm:p-6 flex items-center gap-4 sm:gap-5 hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl group border border-white/10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center text-yellow-400 flex-shrink-0 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0.5 sm:mb-1">2026</div>
                    <div className="text-neutral-300 font-medium text-sm sm:text-base">Official Launch</div>
                    <div className="flex items-center gap-2 mt-1 sm:mt-2">
                      <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-xs text-neutral-400">On schedule</span>
                    </div>
                  </div>
                </div>
              </ScrollRevealEnhanced>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES - Benefit-Focused */}
      <section className="section-py layer-shade-1">
        <div className="container-fluid container-px content-width-lg">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-3 sm:mb-4">Everything you need to feel at home</h2>
            <p className="text-base sm:text-lg text-neutral-600">Features launching Fall 2026 for founding members</p>
          </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Feature 1: Verified Matching */}
                <ScrollRevealEnhanced direction="up" delay={0}>
                  <div className="card-premium p-5 sm:p-8 interactive-card group h-full relative overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                      <AnimatedBadge variant="new" size="sm" className="text-[10px] sm:text-xs">Coming Fall 2026</AnimatedBadge>
                </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-primary-600 mb-3 sm:mb-4 interactive-icon gradient-premium">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors pr-16 sm:pr-0">Find your people at every stage</h3>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                      Connect with students from your home city at any stage—planning applications, preparing to leave, currently studying, or already graduated.
                    </p>
                </div>
                </ScrollRevealEnhanced>

                {/* Feature 2: Verified Students */}
                <ScrollRevealEnhanced direction="up" delay={100}>
                  <div className="card-premium p-5 sm:p-8 interactive-card group h-full relative overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                      <AnimatedBadge variant="new" size="sm" className="text-[10px] sm:text-xs">Coming Fall 2026</AnimatedBadge>
                </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-secondary-600 mb-3 sm:mb-4 interactive-icon gradient-premium">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-secondary-600 transition-colors pr-16 sm:pr-0">Safe space, verified community</h3>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                      Every member is verified—whether they're prospective students with acceptance letters or current students with .edu emails.
            </p>
          </div>
                </ScrollRevealEnhanced>

                {/* Feature 3: Communities */}
                <ScrollRevealEnhanced direction="up" delay={200}>
                  <div className="card-premium p-5 sm:p-8 interactive-card group h-full relative overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                      <AnimatedBadge variant="new" size="sm" className="text-[10px] sm:text-xs">Coming Fall 2026</AnimatedBadge>
                </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-accent-600 mb-3 sm:mb-4 interactive-icon gradient-premium">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-accent-600 transition-colors pr-16 sm:pr-0">Communities for every journey</h3>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                      Join groups for prospective students (visa tips, application advice), current students (housing, events), or alumni.
                    </p>
                </div>
                </ScrollRevealEnhanced>

                {/* Feature 4: Guides */}
                <ScrollRevealEnhanced direction="up" delay={300}>
                  <div className="card-premium p-5 sm:p-8 interactive-card group h-full relative overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                      <AnimatedBadge variant="info" size="sm" className="text-[10px] sm:text-xs">Available Now</AnimatedBadge>
                </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-primary-600 mb-3 sm:mb-4 interactive-icon gradient-premium">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors pr-16 sm:pr-0">Guides for every step</h3>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                      From application tips and scholarship databases to visa checklists and housing guides—get real advice from students.
                    </p>
                </div>
                </ScrollRevealEnhanced>
          </div>
        </div>
      </section>


      {/* LAUNCH ROADMAP */}
      <section className="section-py layer-shade-2">
        <div className="container-fluid container-px content-width-lg">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-3 sm:mb-4">From waitlist to worldwide community</h2>
            <p className="text-base sm:text-lg text-neutral-600">Here's what we're building and when you'll get access</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="relative bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-neutral-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.5)] sm:shadow-[0_30px_90px_-45px_rgba(15,23,42,0.75)] p-4 sm:p-6 md:p-8 lg:p-10">
              {/* Vertical line */}
              <div className="absolute left-5 sm:left-8 top-4 bottom-4 w-0.5 sm:w-1 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 rounded-full shadow-[0_0_0_4px_rgba(248,113,113,0.12)]"></div>

              {/* Timeline items */}
              <div className="space-y-8 sm:space-y-12">
                {/* Phase 1 - Current */}
                <ScrollRevealEnhanced direction="right" delay={0}>
                  <div className="relative pl-12 sm:pl-20 group">
                    <div className="absolute left-0 w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold shadow-lg">
                      <CheckCircle2 className="w-5 h-5 sm:w-8 sm:h-8" />
              </div>
                    <div className="bg-primary-50/95 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 border border-primary-200 shadow-small transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_26px_70px_-36px_rgba(248,113,113,0.85)]">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-base sm:text-xl font-bold text-primary-900">Phase 1: Waitlist</h3>
                        <AnimatedBadge variant="new" size="sm" className="text-[10px] sm:text-xs">Active Now</AnimatedBadge>
                </div>
                      <p className="text-sm sm:text-base text-neutral-700 mb-2 sm:mb-3">Building our founding community</p>
                      <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-neutral-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 flex-shrink-0" />
                          <span>Collecting waitlist signups</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 flex-shrink-0" />
                          <span>Free guides available now</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 flex-shrink-0" />
                          <span>Founding member perks secured</span>
                        </li>
                      </ul>
              </div>
                </div>
                </ScrollRevealEnhanced>

                {/* Phase 2 - Beta */}
                <ScrollRevealEnhanced direction="right" delay={100}>
                  <div className="relative pl-12 sm:pl-20 group">
                    <div className="absolute left-0 w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                      2
              </div>
                    <div className="bg-white/95 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 border border-secondary-200 shadow-small transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_26px_70px_-36px_rgba(56,189,248,0.85)]">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-base sm:text-xl font-bold text-neutral-900">Phase 2: Beta Launch</h3>
                        <AnimatedBadge variant="new" size="sm" className="text-[10px] sm:text-xs">Summer 2026</AnimatedBadge>
                </div>
                      <p className="text-sm sm:text-base text-neutral-700 mb-2 sm:mb-3">Exclusive access for founding members</p>
                      <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-neutral-600">
                        <li className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary-600 flex-shrink-0" />
                          <span>First 1,000 members get early access</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary-600 flex-shrink-0" />
                          <span>Matching, messaging, communities</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary-600 flex-shrink-0" />
                          <span>For prospective & current students</span>
                        </li>
                      </ul>
          </div>
        </div>
                </ScrollRevealEnhanced>

                {/* Phase 3 - Public Launch */}
                <ScrollRevealEnhanced direction="right" delay={200}>
                  <div className="relative pl-12 sm:pl-20 group">
                    <div className="absolute left-0 w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                      3
          </div>
                    <div className="bg-white/95 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 border border-accent-200 shadow-small transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_26px_70px_-36px_rgba(249,115,22,0.85)]">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-base sm:text-xl font-bold text-neutral-900">Phase 3: Public Launch</h3>
                        <AnimatedBadge variant="warning" size="sm" className="text-[10px] sm:text-xs">Fall 2026</AnimatedBadge>
                </div>
                      <p className="text-sm sm:text-base text-neutral-700 mb-2 sm:mb-3">Open to all international students</p>
                      <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-neutral-600">
                        <li className="flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-600 flex-shrink-0" />
                          <span>Full features: Communities, events, guides</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-600 flex-shrink-0" />
                          <span>Expansion to 15+ countries</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-600 flex-shrink-0" />
                          <span>Mobile apps (iOS & Android)</span>
                        </li>
                      </ul>
                </div>
                </div>
                </ScrollRevealEnhanced>
          </div>
        </div>

            {/* CTA */}
            <div className="mt-8 sm:mt-12 text-center">
              <div className="relative overflow-hidden bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-9 shadow-[0_20px_60px_-25px_rgba(248,113,113,0.85)] sm:shadow-[0_32px_90px_-40px_rgba(248,113,113,0.95)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.65),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.4),transparent_55%)]" />
                <h3 className="relative text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">Want to be part of the journey?</h3>
                <p className="relative text-neutral-100 mb-4 sm:mb-6 text-sm sm:text-base">Join the waitlist now to secure founding member benefits and early access</p>
                <Button 
                  size="lg" 
                  className="relative z-10 btn-gradient text-white group shadow-[0_20px_60px_-30px_rgba(15,23,42,0.9)] h-11 sm:h-12 text-sm sm:text-base w-full sm:w-auto"
                  onClick={() => {
                    trackCTAClick('roadmap', 'join_waitlist');
                    scrollToWaitlist();
                  }}
                >
                  Join the Waitlist
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST CTA - Compelling & Urgent */}
      <section id="waitlist" className="section-py-lg bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-fluid container-px">
          <WaitlistForm />
        </div>
      </section>

      </main>
      <Footer />
      <MobileStickyCTA onJoinWaitlist={scrollToWaitlist} />
    </div>
  );
};

export default Index;
