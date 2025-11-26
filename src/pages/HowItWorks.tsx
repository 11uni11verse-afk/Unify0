import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Users, Globe, MessageCircle, Zap, UserPlus } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import AppMockupFrame from "@/components/social/AppMockupFrame";
import ChatPreview from "@/components/social/ChatPreview";
import SocialFeedPreview from "@/components/social/SocialFeedPreview";
// High-quality images of real international students - authentic and diverse
const stepImageProfile = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&crop=entropy&cs=srgb&fm=webp&q=85"; // Diverse students working together on laptops
const stepImageMatching = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=800&fit=crop&crop=entropy&cs=srgb&fm=webp&q=85"; // International students collaborating
const stepImageCommunities = "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&h=800&fit=crop&crop=entropy&cs=srgb&fm=webp&q=85"; // Diverse group in discussion
const stepImageConnectGrow = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop&crop=entropy&cs=srgb&fm=webp&q=85"; // Students connecting on campus

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Add your destination, university, and interests. The app suggests students you should connect with.",
      image: stepImageProfile,
      icon: UserPlus,
      color: "blue",
      features: ["Add your university", "Select your major", "Set your interests"],
      mockupType: "profile"
    },
    {
      number: "02",
      title: "Get Matched with Students",
      description: "Smart suggestions based on your country, destination, and university. Swipe to connect.",
      image: stepImageMatching,
      icon: Zap,
      color: "purple",
      features: ["Daily match suggestions", "Filter by university", "Instant connections"],
      mockupType: "matches"
    },
    {
      number: "03",
      title: "Join Communities",
      description: "Country groups, city groups, university groups. Join the conversations that matter to you.",
      image: stepImageCommunities,
      icon: Globe,
      color: "green",
      features: ["Browse communities", "Join group chats", "Post and engage"],
      mockupType: "feed"
    },
    {
      number: "04",
      title: "Chat, Meet, and Stay Connected",
      description: "DM students, join group chats, attend virtual meetups. Build your network before you land.",
      image: stepImageConnectGrow,
      icon: MessageCircle,
      color: "pink",
      features: ["Direct messaging", "Group chats", "Virtual events"],
      mockupType: "chat"
    }
  ];

  const colorClasses = {
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
      iconBg: "bg-blue-500"
    },
    purple: {
      gradient: "from-purple-500 to-pink-500",
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
      iconBg: "bg-purple-500"
    },
    green: {
      gradient: "from-green-500 to-emerald-500",
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-600",
      iconBg: "bg-green-500"
    },
    pink: {
      gradient: "from-pink-500 to-rose-500",
      bg: "bg-pink-50",
      border: "border-pink-200",
      text: "text-pink-600",
      iconBg: "bg-pink-500"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Editorial Style matching About page */}
      <section id="main-content" className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-60"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl"></div>
        
        <div className="container-fluid content-width-lg relative z-10 container-px">
          <Breadcrumbs items={[{ label: "How It Works" }]} />
          
          <div className="mt-2 space-y-4">
            <ScrollReveal direction="up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Four simple steps
                <span className="block mt-2 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                  To your Global network
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-neutral-700 leading-relaxed font-light max-w-3xl">
                Connect with students who understand your journey—before you even arrive at your destination.
              </p>
              
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Steps Section - Asymmetric Layout matching About page */}
      <section className="section-py layer-shade-1">
        <div className="container-fluid content-width-lg container-px">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <ScrollReveal direction="left" className="lg:col-span-5">
              <div className="sticky top-24">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                  Your journey to connection
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  See how the app helps you connect with students before you even book your flight.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="lg:col-span-7 space-y-6 relative">
              {/* Connecting line between steps */}
              <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary-200 via-secondary-200 to-accent-200 hidden lg:block"></div>
              
              {steps.map((step, index) => {
                const colors = colorClasses[step.color as keyof typeof colorClasses];
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                
                return (
                  <ScrollReveal key={index} direction="right" delay={index * 100}>
                    <div className="group relative">
                      {/* Gradient glow effect on hover */}
                      <div className={`absolute -inset-1 bg-gradient-to-br ${colors.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
                      
                      {/* Card */}
                      <div className="relative bg-white rounded-3xl shadow-medium hover:shadow-large transition-all duration-500 group-hover:-translate-y-1 border border-neutral-100 overflow-hidden">
                        {/* Gradient overlay on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                        
                        {/* Content */}
                        <div className="relative z-10 flex items-start gap-6 p-8">
                          {/* Step number badge */}
                          <div className="relative flex-shrink-0">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                          {step.number}
                        </div>
                            {/* Pulse ring on hover */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-30 group-hover:scale-125 transition-all duration-500`}></div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors duration-300">
                              {step.title}
                            </h3>
                            <p className="text-neutral-600 leading-relaxed mb-5 text-base">
                            {step.description}
                          </p>
                          
                            {/* Features List with enhanced styling */}
                            <div className="space-y-3">
                            {step.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3 text-sm text-neutral-700 group/item">
                                  <div className={`w-5 h-5 rounded-lg bg-gradient-to-br ${colors.gradient} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-300`}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                  </div>
                                  <span className="leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                          {/* Icon on right - enhanced */}
                          <div className="hidden lg:block relative flex-shrink-0">
                            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500`}>
                              <Icon className="w-12 h-12 text-white" />
                            </div>
                            {/* Decorative blur circle */}
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500`}></div>
                          </div>
                        </div>
                        
                        {/* Bottom accent line */}
                        <div className={`h-1 bg-gradient-to-r ${colors.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                      </div>
                      
                      {/* Connecting dot on the line */}
                      {!isLast && (
                        <div className={`hidden lg:block absolute left-6 -bottom-3 w-3 h-3 rounded-full bg-gradient-to-br ${colors.gradient} shadow-lg z-20 group-hover:scale-150 transition-transform duration-300`}></div>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Magazine Grid matching About page */}
      <section className="section-py layer-shade-2">
        <div className="container-fluid content-width-lg container-px">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why students choose UnifyO</h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Built by international students, for international students
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Save Time",
                description: "Skip the endless forum scrolling. Get matched with the right people instantly.",
                gradient: "from-primary-500 to-primary-600",
                icon: Zap
              },
              {
                title: "Build Trust",
                description: "Connect with verified students who share your background and understand your challenges.",
                gradient: "from-secondary-500 to-secondary-600",
                icon: Users
              },
              {
                title: "Stay Connected",
                description: "From pre-departure to graduation, your community grows with you every step.",
                gradient: "from-accent-500 to-accent-600",
                icon: MessageCircle
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <ScrollReveal key={index} direction="up" delay={index * 100}>
                  <div className="relative group h-full">
                    {/* Gradient border effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-br ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500`}></div>
                    
                    {/* Card */}
                    <div className="relative bg-white rounded-3xl p-8 h-full shadow-medium hover:shadow-large transition-all duration-500 group-hover:-translate-y-2 border border-neutral-100">
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon container with gradient background */}
                        <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                          <Icon className="w-8 h-8 text-white" />
                      </div>
                        
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-600 transition-colors duration-300">
                          {benefit.title}
                        </h3>
                        
                      <p className="text-neutral-600 leading-relaxed">
                        {benefit.description}
                      </p>
                      </div>
                      
                      {/* Decorative corner element */}
                      <div className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${benefit.gradient} rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500`}></div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Bold & Simple matching About page */}
      <section className="section-py-lg bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.15),transparent_50%)]"></div>
        
        <div className="container-fluid content-width relative z-10 text-center container-px">
          <ScrollReveal direction="up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to start connecting?
            </h2>
            <p className="text-xl sm:text-2xl text-neutral-300 mb-10 max-w-2xl mx-auto font-light">
              Join 1,200+ students preparing to study abroad. Get early access and build your network today.
            </p>
            <Button 
              size="lg"
              className="h-16 px-10 text-lg font-semibold bg-white text-neutral-900 hover:bg-neutral-100 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 group"
              onClick={() => {
                window.location.href = '/#waitlist';
              }}
            >
              Join the Waitlist
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
