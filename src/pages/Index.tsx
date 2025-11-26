import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { 
  Users, MessageCircle, Globe2, BookOpen, Heart, Sparkles, ArrowRight, 
  Shield, MapPin, Zap, CheckCircle2, Star, GraduationCap, Lock, TrendingUp
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

// Authentic, aspirational imagery (still good to show what it WILL be like)
const heroImage = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=1000&fit=crop&q=90"; 

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
      
      {/* HERO SECTION: Pre-Launch "Anticipation" Mode */}
      <section className="relative section-py-lg overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.6] -z-10" />
        <ParallaxSection speed={0.3} className="absolute top-0 right-0 -z-10">
          <div className="w-[800px] h-[800px] bg-primary-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        </ParallaxSection>
        <ParallaxSection speed={0.5} className="absolute bottom-0 left-0 -z-10">
          <div className="w-[600px] h-[600px] bg-secondary-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        </ParallaxSection>

        <div className="container-fluid container-px relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Hero Content */}
            <div className="max-w-2xl reveal-up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground mb-4">
                Your study abroad journey starts with <span className="text-highlight">the right connections</span>
              </h1>
              
              <p className="text-xl text-neutral-600 leading-relaxed mb-6 max-w-lg">
                Whether you're planning to study abroad or already there, connect with students from your home city. Get advice, find roommates, and build your support network before you even book your flight.
              </p>

              {/* Waitlist Social Proof */}
              <div className="mb-6 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-neutral-200 inline-flex items-center gap-3 shadow-sm">
                <AvatarStack
                  avatars={[
                    { fallback: "PR" },
                    { fallback: "RK" },
                    { fallback: "AN" },
                    { fallback: "SK" },
                    { fallback: "MJ" },
                  ]}
                  max={5}
                  size="sm"
                />
                <div className="text-sm">
                  <p className="font-semibold text-neutral-900">Join the waitlist</p>
                  <p className="text-neutral-600">Be among the first 1,000 members</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-base font-semibold rounded-lg btn-gradient text-white w-full sm:w-auto group"
                  onClick={() => {
                    trackCTAClick('hero', 'join_waitlist');
                    scrollToWaitlist();
                  }}
                >
                  Get Early Access
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
            </div>

            {/* Hero Visual - Simple & Clean */}
            <div className="relative h-[500px] hidden lg:block reveal-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-neutral-100 rounded-2xl overflow-hidden shadow-layered-lg">
                <img src={heroImage} alt="International students connecting" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Illustrated 3 Steps */}
      <section className="section-py layer-shade-1">
        <div className="container-fluid container-px content-width-lg">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Connect before you go, thrive when you arrive</h2>
            <p className="text-lg text-neutral-600">For students planning to study abroad and those already living the dream</p>
            </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <StepIllustration 
                icon={Shield} 
                color="primary"
                decorations={<SignUpDecorations />}
              />
              <div className="mt-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full text-primary-700 text-lg font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Create your profile</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Tell us where you're from and where you're going (or already are). Whether you're planning or already studying abroad, we'll connect you with the right people.
                      </p>
                    </div>
                  </div>

            {/* Step 2 */}
            <div className="text-center">
              <StepIllustration 
                icon={Users} 
                color="secondary"
                decorations={<MatchingDecorations />}
              />
              <div className="mt-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-full text-secondary-700 text-lg font-bold mb-4">
                  2
                    </div>
                <h3 className="text-xl font-bold mb-3">Connect with your community</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Match with students from your home city—those planning to go, currently studying, or already graduated. Get advice from those who've been there, or find travel buddies for your journey.
                      </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <StepIllustration 
                icon={MessageCircle} 
                color="accent"
                decorations={<ConnectDecorations />}
              />
              <div className="mt-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-accent-100 rounded-full text-accent-700 text-lg font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Get support at every stage</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Planning your applications? Get tips from current students. Just arrived? Find roommates and explore together. Already there? Help newcomers and expand your network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAUNCH GOALS - Pre-Launch Stats */}
      <section className="section-py bg-white">
        <div className="container-fluid container-px content-width-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Building something special</h2>
            <p className="text-lg text-neutral-600">Join us on the journey to launch</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter
              number={1000}
              label="Waitlist Goal"
              icon={Users}
              color="primary"
            />
            <StatCounter
              number={15}
              suffix="+"
              label="Target Countries"
              icon={Globe2}
              color="secondary"
            />
            <StatCounter
              number={50}
              suffix="+"
              label="Partner Universities"
              icon={GraduationCap}
              color="accent"
            />
            <StatCounter
              number={2026}
              label="Launch Year"
              icon={Sparkles}
              color="primary"
                />
          </div>

          {/* Progress Bar */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-neutral-700">Waitlist Progress</span>
                <span className="text-sm font-bold text-primary-600">Growing daily!</span>
              </div>
              <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-1000" style={{ width: '35%' }} />
              </div>
              <p className="text-xs text-neutral-500 mt-2 text-center">Join now to secure your founding member status</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES - Benefit-Focused */}
      <section className="section-py layer-shade-1">
        <div className="container-fluid container-px content-width-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Everything you need to feel at home</h2>
            <p className="text-lg text-neutral-600">Features launching Fall 2026 for founding members</p>
          </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Feature 1: Verified Matching */}
                <ScrollRevealEnhanced direction="up" delay={0}>
                  <div className="card-premium p-8 interactive-card group h-full relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <AnimatedBadge variant="new" size="sm">Coming Fall 2026</AnimatedBadge>
                </div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-primary-600 mb-4 interactive-icon gradient-premium">
                      <Zap className="w-6 h-6" />
                </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">Find your people at every stage</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Connect with students from your home city at any stage—planning applications, preparing to leave, currently studying, or already graduated. Get advice, find travel buddies, or help newcomers.
                    </p>
                </div>
                </ScrollRevealEnhanced>

                {/* Feature 2: Verified Students */}
                <ScrollRevealEnhanced direction="up" delay={100}>
                  <div className="card-premium p-8 interactive-card group h-full relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <AnimatedBadge variant="new" size="sm">Coming Fall 2026</AnimatedBadge>
                </div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-secondary-600 mb-4 interactive-icon gradient-premium">
                      <Shield className="w-6 h-6" />
          </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-secondary-600 transition-colors">Safe space, verified community</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Every member is verified—whether they're prospective students with acceptance letters or current students with .edu emails. No scammers, no spam. Just real people on the same journey.
            </p>
          </div>
                </ScrollRevealEnhanced>

                {/* Feature 3: Communities */}
                <ScrollRevealEnhanced direction="up" delay={200}>
                  <div className="card-premium p-8 interactive-card group h-full relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <AnimatedBadge variant="new" size="sm">Coming Fall 2026</AnimatedBadge>
                </div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-accent-600 mb-4 interactive-icon gradient-premium">
                      <Users className="w-6 h-6" />
                </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent-600 transition-colors">Communities for every journey</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Join groups for prospective students (visa tips, application advice), current students (housing, events), or alumni (career networking). Chat in your language, share experiences, celebrate together.
                    </p>
                </div>
                </ScrollRevealEnhanced>

                {/* Feature 4: Guides */}
                <ScrollRevealEnhanced direction="up" delay={300}>
                  <div className="card-premium p-8 interactive-card group h-full relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <AnimatedBadge variant="info" size="sm">Available Now</AnimatedBadge>
                </div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-primary-600 mb-4 interactive-icon gradient-premium">
                      <BookOpen className="w-6 h-6" />
                </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">Guides for every step</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      From application tips and scholarship databases to visa checklists and housing guides—get real advice from students at every stage. Planning your journey or already there, we've got you covered.
                    </p>
                </div>
                </ScrollRevealEnhanced>
          </div>
        </div>
      </section>


      {/* LAUNCH ROADMAP */}
      <section className="section-py layer-shade-2">
        <div className="container-fluid container-px content-width-lg">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">From waitlist to worldwide community</h2>
            <p className="text-lg text-neutral-600">Here's what we're building and when you'll get access</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                {/* Phase 1 - Current */}
                <ScrollRevealEnhanced direction="right" delay={0}>
                  <div className="relative pl-20">
                    <div className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold shadow-lg">
                      <CheckCircle2 className="w-8 h-8" />
              </div>
                    <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-200">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-primary-900">Phase 1: Waitlist</h3>
                        <AnimatedBadge variant="success" size="sm">Active Now</AnimatedBadge>
                </div>
                      <p className="text-neutral-700 mb-3">Building our founding community</p>
                      <ul className="space-y-2 text-sm text-neutral-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>Collecting waitlist signups</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>Free guides available now</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>Founding member perks secured</span>
                        </li>
                      </ul>
              </div>
                </div>
                </ScrollRevealEnhanced>

                {/* Phase 2 - Beta */}
                <ScrollRevealEnhanced direction="right" delay={100}>
                  <div className="relative pl-20">
                    <div className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center text-white font-bold shadow-lg">
                      2
              </div>
                    <div className="bg-white rounded-xl p-6 border-2 border-secondary-200">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-neutral-900">Phase 2: Beta Launch</h3>
                        <AnimatedBadge variant="new" size="sm">Summer 2026</AnimatedBadge>
                </div>
                      <p className="text-neutral-700 mb-3">Exclusive access for founding members</p>
                      <ul className="space-y-2 text-sm text-neutral-600">
                        <li className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-secondary-600 flex-shrink-0" />
                          <span>First 1,000 members get early access</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-secondary-600 flex-shrink-0" />
                          <span>Matching, messaging, and communities</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-secondary-600 flex-shrink-0" />
                          <span>For prospective & current students</span>
                        </li>
                      </ul>
          </div>
        </div>
                </ScrollRevealEnhanced>

                {/* Phase 3 - Public Launch */}
                <ScrollRevealEnhanced direction="right" delay={200}>
                  <div className="relative pl-20">
                    <div className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white font-bold shadow-lg">
                      3
          </div>
                    <div className="bg-white rounded-xl p-6 border-2 border-accent-200">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-neutral-900">Phase 3: Public Launch</h3>
                        <AnimatedBadge variant="warning" size="sm">Fall 2026</AnimatedBadge>
                </div>
                      <p className="text-neutral-700 mb-3">Open to all international students</p>
                      <ul className="space-y-2 text-sm text-neutral-600">
                        <li className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-accent-600 flex-shrink-0" />
                          <span>Full feature set: Communities, events, guides</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-accent-600 flex-shrink-0" />
                          <span>Expansion to 15+ countries</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-accent-600 flex-shrink-0" />
                          <span>Mobile apps (iOS & Android)</span>
                        </li>
                      </ul>
                </div>
                </div>
                </ScrollRevealEnhanced>
          </div>
        </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-200">
                <h3 className="text-2xl font-bold mb-3">Want to be part of the journey?</h3>
                <p className="text-neutral-600 mb-6">Join the waitlist now to secure founding member benefits and early access</p>
                <Button 
                  size="lg" 
                  className="btn-gradient text-white group"
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
        <div className="container-fluid container-px content-width text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Join the founding community</h2>
            <p className="text-xl text-neutral-600 mb-4 max-w-2xl mx-auto">
              Whether you're planning to study abroad or already there, be among the first 1,000 members. Get exclusive early access, lifetime premium features, and founding member perks.
            </p>
            <p className="text-base text-neutral-500 max-w-xl mx-auto">
              Founding members get priority matching, beta access (Summer 2026), and free premium forever. For prospective and current students. Limited spots available.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-primary-100 max-w-lg mx-auto">
          <WaitlistForm />
        </div>

        </div>
      </section>

      <Footer />
      <MobileStickyCTA onJoinWaitlist={scrollToWaitlist} />
    </div>
  );
};

export default Index;
