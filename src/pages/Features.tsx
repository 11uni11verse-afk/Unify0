import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import InteractiveFeatureCard from "@/components/InteractiveFeatureCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Users, MessageCircle, Video, Heart, Shield, Image, Zap, Calendar, BookOpen, Globe, Award, TrendingUp, Target, ArrowRight, UserPlus, Hash, MapPin } from "lucide-react";
import AppMockupFrame from "@/components/social/AppMockupFrame";
import ChatPreview from "@/components/social/ChatPreview";
import ScrollReveal from "@/components/ScrollReveal";

const Features = () => {
  const coreFeatures = [
    {
      icon: UserPlus,
      title: "Find your people in seconds",
      description: "Stop scrolling through random profiles. We match you with students from your exact home city who are already at your destination university. Same culture, same language, instant connection.",
      color: "from-primary-400 to-primary-600"
    },
    {
      icon: Shield,
      title: "No scams, no spam, no bots",
      description: "Every person on UnifyO is verified through their university email. That means no housing scammers, no fake profiles, no creepy strangers. Just real students helping real students.",
      color: "from-secondary-400 to-secondary-600"
    },
    {
      icon: Hash,
      title: "Communities that feel like home",
      description: "Join groups where everyone speaks your language and gets your references. Organize Diwali parties, cricket matches, or just chat about home. Sometimes you need people who understand.",
      color: "from-accent-400 to-accent-600"
    },
    {
      icon: BookOpen,
      title: "Essential guides written by students",
      description: "Forget those 40-page PDFs your uni sends. Get real advice: opening a bank account without the runaround, getting your National Insurance number, finding part-time work, and the best SIM card deals.",
      color: "from-primary-500 to-secondary-500"
    },
    {
      icon: MessageCircle,
      title: "Start chatting before you land",
      description: "Ask about the best phone plans, where to find Indian groceries, or if anyone wants to split an Uber from the airport. Build friendships before your flight even takes off.",
      color: "from-secondary-500 to-accent-500"
    },
    {
      icon: MapPin,
      title: "Pre-arrival checklist that doesn't miss anything",
      description: "Documents (originals and copies), money matters (how much cash to carry), what to pack (and what's cheaper to buy there), medicines you can and can't bring, and what to do in your first 48 hours.",
      color: "from-accent-500 to-primary-500"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Editorial Style matching About page */}
      <section id="main-content" className="relative overflow-hidden pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-60"></div>
        <div className="absolute top-20 right-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-secondary-200/20 rounded-full blur-3xl"></div>
        
        <div className="container-fluid content-width-lg relative z-10 container-px">
          <Breadcrumbs items={[{ label: "Features" }]} />
          
          <div className="mt-2 space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.15] tracking-tight">
              Built for students who
              <span className="block mt-1 sm:mt-2 pt-1 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Get what it's like
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-700 leading-relaxed font-light max-w-3xl">
              Moving countries is hard. We're making the social part easy. Here's how UnifyO helps you build your support network before you land.
            </p>
          </div>
        </div>
      </section>
      
      {/* The Problem We're Solving */}
      <section className="section-py layer-shade-1">
        <div className="container-fluid content-width-lg container-px">
          <ScrollReveal direction="up">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">The Problem We're Solving</h2>
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-neutral-200 shadow-lg">
                <p className="text-base sm:text-lg text-neutral-700 mb-3 sm:mb-4">Let me paint you a picture.</p>
                <p className="text-base sm:text-lg text-neutral-700 mb-3 sm:mb-4">You land at Heathrow. You need a SIM card. The shop assistant is speaking too fast. You don't know which plan is good. <span className="font-semibold text-neutral-900">You overpay because you're tired and overwhelmed.</span></p>
                <p className="text-base sm:text-lg text-neutral-700 mb-3 sm:mb-4">Now imagine this instead:</p>
                <p className="text-base sm:text-lg text-neutral-700 mb-3 sm:mb-4">Before you even board your flight, you've already chatted with 10 students on UnifyO. They've told you exactly which SIM to get. One person even offers to meet you at the airport.</p>
                <p className="text-lg sm:text-xl font-semibold text-primary-600">You land feeling prepared, not panicked. That's the difference a proper social networking platform for students makes.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="section-py layer-shade-2">
        <div className="container-fluid content-width-lg container-px">
          <ScrollReveal direction="up">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">What You'll Get When We Launch</h2>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">Everything you need to arrive prepared, not panicked</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-5 sm:p-6 border border-neutral-200 hover:border-primary/30 hover:shadow-lg transition-all">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center text-white mb-3 sm:mb-4`}>
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Chat UI Feature Section */}
      <section className="section-py layer-shade-2">
        <div className="container-fluid content-width-lg container-px">
          <ScrollReveal direction="up">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6">
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  Chat with students before you land
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                  Direct messaging built for international students. Ask questions, share tips, and build friendships before your flight.
                </p>
                <ul className="space-y-2.5 sm:space-y-3">
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-neutral-700">Typing indicators and read receipts</span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-neutral-700">Verified student profiles only</span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-neutral-700">Group chats for your cohort</span>
                  </li>
                </ul>
              </div>
              
              <div className="relative hidden sm:block">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl"></div>
                <AppMockupFrame device="phone" className="relative scale-90 sm:scale-100">
                  <ChatPreview showTyping={true} />
                </AppMockupFrame>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section - Compelling */}
      <section className="section-py-lg bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-fluid content-width text-center container-px">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Your community is waiting
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 mb-6 sm:mb-10 max-w-2xl mx-auto">
            Join the waitlist and we'll connect you with students from your home city before you even book your flight. No more going abroad alone.
          </p>
          <Button 
            size="lg" 
            className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold btn-gradient text-white group w-full sm:w-auto"
            onClick={() => {
              window.location.href = '/#waitlist';
            }}
          >
            Get Early Access
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-neutral-500">Launching Fall 2026 • 100% free to join</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
