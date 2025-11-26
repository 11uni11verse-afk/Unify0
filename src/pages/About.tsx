import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Heart, Target, Users, Linkedin, Mail, ArrowRight, Sparkles, Globe, Shield, Zap, CheckCircle2, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollRevealEnhanced from "@/components/ScrollRevealEnhanced";

const About = () => {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About UnifyO",
    "description": "Learn about UnifyO - the platform connecting international students worldwide",
    "mainEntity": {
      "@type": "Organization",
      "name": "UnifyO",
      "url": "https://unifyo.com",
      "description": "Platform for international students to connect with peers from their home country studying abroad",
      "foundingDate": "2024",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "11astitvajha@gmail.com",
        "telephone": "+91-6261786931",
        "contactType": "Customer Service"
      },
      "sameAs": [
        "https://www.linkedin.com/company/uni-verse11/",
        "https://www.instagram.com/uni_fyo",
        "https://x.com/Uni_fyO"
      ]
    }
  };

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "Every feature we build starts with one question: Does this help students feel less alone?"
    },
    {
      icon: Shield,
      title: "Safety & Trust",
      description: "Verified students only. No scammers, no spam. Just real people on the same journey."
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "We celebrate cultural diversity while creating bridges that help students thrive anywhere."
    },
    {
      icon: Zap,
      title: "Move Fast, Stay Human",
      description: "We ship quickly, but never at the expense of the student experience."
    }
  ];

  const stats = [
    { number: "1,200+", label: "Students on Waitlist", color: "primary" },
    { number: "50+", label: "Countries Represented", color: "secondary" },
    { number: "100%", label: "Free Forever", color: "accent" },
    { number: "2026", label: "Launch Year", color: "primary" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <Navbar />
      
      {/* Hero Section - Compelling Story */}
      <section id="main-content" className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl"></div>
        
        <div className="container-fluid content-width-lg relative z-10 container-px">
          <Breadcrumbs items={[{ label: "About" }]} />
          
          <div className="mt-4 text-center max-w-4xl mx-auto">
            <ScrollReveal direction="up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground mb-4">
                We're building the support network every international student deserves
              </h1>
              
              <p className="text-xl sm:text-2xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
                Because moving countries to chase your dreams shouldn't mean doing it alone.
              </p>
            </ScrollReveal>
          </div>
            </div>
      </section>

      {/* The Problem - Emotional Connection */}
      <section className="py-12 sm:py-16 layer-shade-1">
        <div className="container-fluid content-width-lg container-px">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ScrollRevealEnhanced direction="left">
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 w-16 h-16 text-primary-200" />
                <div className="relative bg-white p-8 rounded-2xl shadow-layered">
                  <p className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight mb-6">
                    "I remember my first week in Toronto. I had an acceptance letter, a suitcase, and nobody to call."
                  </p>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                    I spent hours scrolling through Facebook groups with 5,000 strangers, hoping to find one person from Mumbai. Someone who understood what I was going through. Someone who spoke my language—literally and figuratively.
                  </p>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    That's when I realized: <span className="font-semibold text-neutral-900">millions of students go through this every year</span>. We work so hard to get here, only to start from zero when we land.
                  </p>
                      </div>
                    </div>
            </ScrollRevealEnhanced>
            
            <ScrollRevealEnhanced direction="right" delay={200}>
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight">
                  The problem isn't capability. It's connection.
                </h2>
                <p className="text-xl text-neutral-600 leading-relaxed">
                  Every year, <span className="font-semibold text-neutral-900">6 million students</span> cross borders for education. They're brilliant, ambitious, and brave enough to leave everything familiar behind.
                </p>
                <p className="text-xl text-neutral-600 leading-relaxed">
                  But when they land, they're alone. Navigating housing scams, culture shock, and homesickness without a safety net. Not because they can't handle it—but because they don't have a network yet.
                </p>
                <div className="p-6 bg-primary-50 border-l-4 border-primary-500 rounded-r-xl">
                  <p className="text-lg font-semibold text-primary-900">
                    UnifyO is the network they deserve. Before they even book their flight.
                  </p>
                </div>
              </div>
            </ScrollRevealEnhanced>
          </div>
        </div>
      </section>

      {/* The Solution - What We're Building */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-fluid content-width-lg container-px">
          <div className="text-center mb-16">
          <ScrollReveal direction="up">
              <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
                What we're building
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                A verified social network where international students find their people—before they land, while they're there, and long after they graduate.
                </p>
            </ScrollReveal>
          </div>
            
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollRevealEnhanced direction="up" delay={0}>
              <div className="card-premium p-8 text-center h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-neutral-900">Smart Matching</h3>
                      <p className="text-neutral-600 leading-relaxed">
                  Connect with students from your home city who are at your destination university. Same culture, same journey, instant understanding.
                      </p>
                    </div>
            </ScrollRevealEnhanced>

            <ScrollRevealEnhanced direction="up" delay={100}>
              <div className="card-premium p-8 text-center h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-neutral-900">Verified Community</h3>
                      <p className="text-neutral-600 leading-relaxed">
                  Every member is verified through university email or enrollment documents. Real students only—no scammers, no spam.
                      </p>
                    </div>
            </ScrollRevealEnhanced>

            <ScrollRevealEnhanced direction="up" delay={200}>
              <div className="card-premium p-8 text-center h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-neutral-900">Global Network</h3>
                      <p className="text-neutral-600 leading-relaxed">
                  From prospective students planning their journey to alumni building careers—connect at every stage of your international experience.
                </p>
              </div>
            </ScrollRevealEnhanced>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 sm:py-16 layer-shade-1">
        <div className="container-fluid content-width-lg container-px">
          <div className="text-center mb-10">
          <ScrollReveal direction="up">
              <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
                Our values
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                These aren't just words on a wall. They guide every decision we make.
              </p>
            </ScrollReveal>
            </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <ScrollRevealEnhanced key={index} direction="up" delay={index * 100}>
                <div className="bg-white p-8 rounded-2xl shadow-medium hover:shadow-large transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl gradient-premium flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-neutral-900">{value.title}</h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">{value.description}</p>
                </div>
              </ScrollRevealEnhanced>
            ))}
                </div>
              </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-fluid content-width-lg container-px">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <ScrollRevealEnhanced key={index} direction="up" delay={index * 100}>
                <div className="card-premium p-6 text-center">
                  <div className={`text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 bg-clip-text text-transparent`}>
                    {stat.number}
                  </div>
                  <p className="text-sm sm:text-base text-neutral-600 font-medium">{stat.label}</p>
                </div>
              </ScrollRevealEnhanced>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-12 sm:py-16 layer-shade-1">
        <div className="container-fluid content-width container-px">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="up">
              <div className="text-center mb-8">
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
                  Meet the founder
                </h2>
                <p className="text-xl text-neutral-600">
                  Built by an international student, for international students.
                </p>
              </div>
            </ScrollReveal>

            <ScrollRevealEnhanced direction="up" delay={200}>
              <div className="card-elevated p-8 sm:p-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-xl ring-4 ring-primary-100">
                    <AvatarImage src="/astitva-profile.jpg?v=1" alt="Astitva Jha" />
                    <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary-500 to-secondary-500 text-white">AJ</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-1">Astitva Jha</h3>
                    <p className="text-lg text-neutral-600 mb-4">Founder & CEO</p>
                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                      <a 
                        href="https://www.linkedin.com/in/astitva1/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-all font-medium shadow-md hover:shadow-lg"
                      >
                        <Linkedin className="w-4 h-4" />
                        Connect on LinkedIn
                      </a>
                      <a 
                        href="mailto:11astitvajha@gmail.com" 
                        className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-neutral-300 rounded-lg hover:border-neutral-400 transition-all font-medium"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                  <p>
                    I'm an international student from India, and I've lived the isolation that comes with moving countries for education. The excitement of acceptance letters quickly gives way to the reality of navigating a new city alone.
                  </p>
                  <p>
                    I built UnifyO because <span className="font-semibold text-neutral-900">I wish I had it when I started my journey</span>. A place to find people from home who understood my culture, spoke my language, and were going through the same thing.
                  </p>
                  <p>
                    This isn't just another social app. It's the support network I needed—and the one millions of students deserve. We're building it together, one connection at a time.
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-neutral-200">
                  <p className="text-lg italic text-neutral-600 text-center">
                    "The best time to build your network is before you need it. UnifyO makes that possible."
                  </p>
                </div>
              </div>
            </ScrollRevealEnhanced>
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-fluid content-width-lg container-px">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ScrollRevealEnhanced direction="left">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
                  Why now?
                </h2>
                <div className="space-y-4 text-lg text-neutral-600 leading-relaxed">
                  <p>
                    International student enrollment is at an all-time high, but student wellbeing is at an all-time low. Mental health challenges, isolation, and dropout rates are rising.
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-900">Belonging is one of the strongest predictors of student success.</span> When students feel connected, they thrive academically, mentally, and socially.
                  </p>
                  <p>
                    Universities know this, but they can't scale personalized support for thousands of international students. UnifyO can.
                  </p>
                </div>
              </div>
            </ScrollRevealEnhanced>

            <ScrollRevealEnhanced direction="right" delay={200}>
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-2xl border-2 border-primary-200">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">The opportunity</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                    <p className="text-lg text-neutral-700">
                      <span className="font-semibold">6M+ students</span> study abroad annually
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                    <p className="text-lg text-neutral-700">
                      <span className="font-semibold">70%</span> report feeling isolated in their first year
                  </p>
                </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                    <p className="text-lg text-neutral-700">
                      <span className="font-semibold">$50B+</span> global market for student services
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                    <p className="text-lg text-neutral-700">
                      <span className="font-semibold">Zero</span> platforms solving this specific problem
                  </p>
                  </div>
                </div>
            </div>
            </ScrollRevealEnhanced>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        
        <div className="container-fluid content-width relative z-10 text-center container-px">
          <ScrollReveal direction="up">
            <Sparkles className="w-12 h-12 text-primary-400 mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Be part of the founding community
            </h2>
            <p className="text-xl sm:text-2xl text-neutral-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              Join 1,200+ students who are building their global network before they even arrive. Get early access, founding member perks, and help shape the future of UnifyO.
            </p>
            <Button 
              size="lg"
              className="h-16 px-10 text-lg font-semibold bg-white text-neutral-900 hover:bg-neutral-100 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 group"
              onClick={() => {
                window.location.href = '/#waitlist';
              }}
            >
              Get Early Access
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="mt-6 text-sm text-neutral-400">
              Launching Fall 2026 • 100% Free Forever
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
