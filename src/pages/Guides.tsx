import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download, ChevronRight, Home, Award, CheckSquare, Plane, GraduationCap, DollarSign, Briefcase, Mail, Bell, ArrowLeft, Eye, Loader2, ExternalLink, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import mammoth from "mammoth";
import ScrollReveal from "@/components/ScrollReveal";
import AppMockupFrame from "@/components/social/AppMockupFrame";
import ChatPreview from "@/components/social/ChatPreview";

const Guides = () => {
  const { toast } = useToast();
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<{ path: string; title: string } | null>(null);
  const [documentHtml, setDocumentHtml] = useState<string>("");
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const destinations = [
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "NL", name: "Netherlands", flag: "🇳🇱" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "US", name: "USA", flag: "🇺🇸" },
    { code: "IE", name: "Ireland", flag: "🇮🇪" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
    { code: "RU", name: "Russia", flag: "🇷🇺" },
    { code: "SG", name: "Singapore", flag: "🇸🇬" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "KR", name: "South Korea", flag: "🇰🇷" },
    { code: "TR", name: "Turkey", flag: "🇹🇷" },
    { code: "GB", name: "UK", flag: "🇬🇧" },
    { code: "AE", name: "UAE", flag: "🇦🇪" },
  ];

  // Guide types mapping
  const guideTypes = [
    {
      id: "visa",
      title: "The Ultimate Visa Application Guide",
      subtitle: "Your Stress-Free Guide to Securing Your Student Visa",
      description: "Step-by-step instructions, document checklists, common mistakes to avoid, and insider tips from students who've successfully obtained their visas.",
      icon: Plane,
      color: "from-primary-400 to-primary-600",
    },
    {
      id: "accommodation",
      title: "The International Student's Accommodation Checklist",
      subtitle: "Find Your Perfect Student Home Abroad",
      description: "Everything you need to know about student housing options, budgeting, safety checks, lease agreements, and settling into your new home.",
      icon: Home,
      color: "from-secondary-400 to-secondary-600",
    },
    {
      id: "scholarship",
      title: "The Exclusive Scholarship Database",
      subtitle: "50+ Opportunities to Fund Your Dream",
      description: "Curated list of scholarships specifically for international students, with application deadlines, eligibility criteria, and tips to strengthen your application.",
      icon: Award,
      color: "from-accent-400 to-accent-600",
    },
    {
      id: "pre-departure",
      title: "The Pre-Departure Everything Checklist",
      subtitle: "From Accepted to Arrived",
      description: "Complete checklist covering documentation, packing essentials, financial preparation, health insurance, travel arrangements, and first-week survival tips.",
      icon: CheckSquare,
      color: "from-primary-500 to-secondary-500",
    },
  ];

  // Document mapping: origin-destination-guideType -> file path
  const documentMap: Record<string, string> = {
    "IN-AE-accommodation": "/guides/Accommodation Search Guide/UAE Student Housing Checklist Guide.docx",
    "IN-AE-pre-departure": "/guides/Pre Departure Checklist/UAE Student Pre-Departure Checklist.docx",
    "IN-AE-scholarship": "/guides/Scholarships/UAE Scholarships for Indian Students.docx",
    "IN-AE-visa": "/guides/VISA Document Checklist/UAE Student Visa Guide for Indians.docx",
    "IN-AU-accommodation": "/guides/Accommodation Search Guide/Australian Rental Checklist For Students.docx",
    "IN-AU-pre-departure": "/guides/Pre Departure Checklist/Student Visa Checklist: India to Australia.docx",
    "IN-AU-scholarship": "/guides/Scholarships/Scholarship Database for Indian Students australia.docx",
    "IN-AU-visa": "/guides/VISA Document Checklist/Australian Student Visa Guide for Indians.docx",
    "IN-CA-accommodation": "/guides/Accommodation Search Guide/Canada Student Housing Checklist Creation.docx",
    "IN-CA-pre-departure": "/guides/Pre Departure Checklist/Indian Student's Canada Departure Guide.docx",
    "IN-CA-scholarship": "/guides/Scholarships/Scholarship Database for Indian Students canada.docx",
    "IN-CA-visa": "/guides/VISA Document Checklist/Canada Student Visa Guide for Indians.docx",
    "IN-DE-accommodation": "/guides/Accommodation Search Guide/German Student Housing Checklist.docx",
    "IN-DE-pre-departure": "/guides/Pre Departure Checklist/Germany Student Pre-Departure Checklist.docx",
    "IN-DE-scholarship": "/guides/Scholarships/German Scholarships For Indian Students.docx",
    "IN-DE-visa": "/guides/VISA Document Checklist/German Student Visa Guide for Indians.docx",
    "IN-ES-accommodation": "/guides/Accommodation Search Guide/Spanish Student Housing Checklist Guide.docx",
    "IN-ES-pre-departure": "/guides/Pre Departure Checklist/Indian Student's Spain Departure Guide.docx",
    "IN-ES-visa": "/guides/VISA Document Checklist/Spain Student Visa Guide for Indians.docx",
    "IN-FR-accommodation": "/guides/Accommodation Search Guide/French Housing Checklist For Students.docx",
    "IN-FR-pre-departure": "/guides/Pre Departure Checklist/France Student Visa: Pre-Departure Checklist.docx",
    "IN-FR-scholarship": "/guides/Scholarships/Scholarship Database for Indian Students France.docx",
    "IN-FR-visa": "/guides/VISA Document Checklist/French Student Visa Guide for Indians.docx",
    "IN-GB-accommodation": "/guides/Accommodation Search Guide/UK Student Housing Checklist Guide.docx",
    "IN-GB-pre-departure": "/guides/Pre Departure Checklist/UK Student Visa Pre-Departure Checklist.docx",
    "IN-GB-scholarship": "/guides/Scholarships/UK Scholarships for Indian Students.docx",
    "IN-GB-visa": "/guides/VISA Document Checklist/UK Student Visa Guide for Indians.docx",
    "IN-IE-accommodation": "/guides/Accommodation Search Guide/Ireland Student Housing Checklist Guide.docx",
    "IN-IE-pre-departure": "/guides/Pre Departure Checklist/Ireland Student Pre-Departure Checklist.docx",
    "IN-IE-scholarship": "/guides/Scholarships/Ireland Scholarships for Indian Students.docx",
    "IN-IE-visa": "/guides/VISA Document Checklist/Ireland Student Visa Guide for Indians.docx",
    "IN-JP-accommodation": "/guides/Accommodation Search Guide/Japan Student Housing Checklist Creation.docx",
    "IN-JP-pre-departure": "/guides/Pre Departure Checklist/Japan Student Pre-Departure Checklist.docx",
    "IN-JP-scholarship": "/guides/Scholarships/Japan Scholarships for Indian Students.docx",
    "IN-JP-visa": "/guides/VISA Document Checklist/Japan Student Visa Guide for Indians.docx",
    "IN-KR-accommodation": "/guides/Accommodation Search Guide/Student Housing Checklist for Korea.docx",
    "IN-KR-pre-departure": "/guides/Pre Departure Checklist/South Korea Student Departure Checklist.docx",
    "IN-KR-scholarship": "/guides/Scholarships/South Korea Scholarships for Indian Students.docx",
    "IN-KR-visa": "/guides/VISA Document Checklist/Korean Student Visa Guide for Indians.docx",
    "IN-NL-accommodation": "/guides/Accommodation Search Guide/Dutch Housing Checklist for Indian Students.docx",
    "IN-NL-pre-departure": "/guides/Pre Departure Checklist/Dutch Student Pre-Departure Checklist.docx",
    "IN-NL-scholarship": "/guides/Scholarships/Dutch Scholarships for Indian Students.docx",
    "IN-NL-visa": "/guides/VISA Document Checklist/Netherlands Student Visa Guide for Indians.docx",
    "IN-NZ-accommodation": "/guides/Accommodation Search Guide/New Zealand Student Housing Checklist.docx",
    "IN-NZ-pre-departure": "/guides/Pre Departure Checklist/New Zealand Student Visa Checklist.docx",
    "IN-NZ-scholarship": "/guides/Scholarships/New Zealand Scholarships for Indian Students.docx",
    "IN-NZ-visa": "/guides/VISA Document Checklist/New Zealand Student Visa Guide for Indians.docx",
    "IN-RU-accommodation": "/guides/Accommodation Search Guide/Russian Student Housing Checklist.docx",
    "IN-RU-pre-departure": "/guides/Pre Departure Checklist/Russia Student Visa & Relocation Guide.docx",
    "IN-RU-scholarship": "/guides/Scholarships/Russian Scholarships for Indian Students.docx",
    "IN-RU-visa": "/guides/VISA Document Checklist/Russian Student Visa Guide for Indians.docx",
    "IN-SG-accommodation": "/guides/Accommodation Search Guide/Singapore Student Accommodation Checklist Guide.docx",
    "IN-SG-pre-departure": "/guides/Pre Departure Checklist/Singapore Student Pre-Departure Guide.docx",
    "IN-SG-scholarship": "/guides/Scholarships/Singapore Scholarships For Indian Students.docx",
    "IN-SG-visa": "/guides/VISA Document Checklist/Singapore Student Visa Guide for Indians.docx",
    "IN-TR-accommodation": "/guides/Accommodation Search Guide/Turkey Student Housing Checklist Creation.docx",
    "IN-TR-pre-departure": "/guides/Pre Departure Checklist/Turkey Student Pre-Departure Checklist.docx",
    "IN-TR-scholarship": "/guides/Scholarships/Turkey Scholarships for Indian Students.docx",
    "IN-TR-visa": "/guides/VISA Document Checklist/Turkish Student Visa Guide for Indians.docx",
    "IN-US-accommodation": "/guides/Accommodation Search Guide/International Student Housing Checklist USA.docx",
    "IN-US-pre-departure": "/guides/Pre Departure Checklist/Indian Student's USA Departure Checklist.docx",
    "IN-US-scholarship": "/guides/Scholarships/Scholarship Database for Indian Students usa.docx",
    "IN-US-visa": "/guides/VISA Document Checklist/US Student Visa Guide for Indians.docx",
  };

  // Helper function to get document path
  const getDocumentPath = (origin: string, destination: string, guideType: string): string | null => {
    const key = `${origin}-${destination}-${guideType}`;
    return documentMap[key] || null;
  };

  const guides = guideTypes;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Visually Appealing */}
      <section id="main-content" className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl"></div>
        
        <div className="container-fluid content-width-xl relative z-10 container-px">
          <Breadcrumbs items={[{ label: "Guides" }]} />
          
          <div className="mt-4 max-w-4xl">
            <ScrollReveal direction="up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                Free <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">Guides & Checklists</span>
              </h1>
              
              <p className="text-xl text-neutral-700 leading-relaxed">
                Navigate your study abroad journey with confidence using our comprehensive, country-specific guides created by international students who've been in your shoes.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Community Integration Section */}
      {!selectedOrigin && (
        <section className="section-py layer-shade-1">
          <div className="container-fluid content-width-xl container-px">
              <ScrollReveal direction="up">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-6 h-6 text-primary" />
                      <Badge variant="secondary" className="text-xs">Community Feature</Badge>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                      Discuss these guides with peers directly in the app
                    </h2>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                      Have questions about a guide? Want to share your own tips? Join community discussions where students help each other navigate the study abroad journey.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckSquare className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-neutral-700">Ask questions about specific guides</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckSquare className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-neutral-700">Share your own experiences and tips</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckSquare className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-neutral-700">Get real-time help from students who've done it</span>
                      </li>
                    </ul>
                    <Button 
                      size="lg"
                      variant="accent"
                      onClick={() => window.location.href = '/#waitlist'}
                    >
                      Join the Community
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl"></div>
                    <AppMockupFrame device="phone" className="relative">
                      <ChatPreview 
                        messages={[
                          {
                            id: "1",
                            sender: "Ananya",
                            country: "India",
                            flag: "🇮🇳",
                            message: "Just used the Canada visa guide! Super helpful 🙌",
                            time: "2:15 PM",
                            isSent: false,
                          },
                          {
                            id: "2",
                            sender: "You",
                            country: "India",
                            flag: "🇮🇳",
                            message: "That's great! Did you need the biometrics letter?",
                            time: "2:16 PM",
                            isSent: true,
                          },
                          {
                            id: "3",
                            sender: "Ananya",
                            country: "India",
                            flag: "🇮🇳",
                            message: "Yes! The checklist in the guide covered everything",
                            time: "2:17 PM",
                            isSent: false,
                          },
                        ]}
                        showTyping={false}
                      />
                    </AppMockupFrame>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
      )}

      {/* Guide Types - Visually Appealing Grid */}
      {!selectedOrigin && (
        <section className="section-py layer-shade-2">
          <div className="container-fluid content-width-xl container-px">
            <ScrollReveal direction="up">
              <div className="text-center mb-10">
                <h2 className="text-4xl sm:text-5xl font-bold mb-3">Available Resources</h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                  Comprehensive guides for every step of your journey
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Pre-Departure Checklist", description: "Complete step-by-step timeline-based approach", icon: CheckSquare, color: "from-primary-500 to-primary-600" },
                { title: "Visa Handbook", description: "Detailed process with checklists", icon: Plane, color: "from-secondary-500 to-secondary-600" },
                { title: "Accommodation Guide", description: "Housing options and roommate tips", icon: Home, color: "from-accent-500 to-accent-600" },
                { title: "Scholarship Database", description: "Curated opportunities to fund your dream", icon: Award, color: "from-primary-500 to-secondary-500" },
                { title: "Financial Toolkit", description: "Budgets, scholarships, and loans", icon: DollarSign, color: "from-secondary-500 to-accent-500" },
                { title: "Survival Guide", description: "First week essentials and setup", icon: FileText, color: "from-accent-500 to-primary-500" }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={index} direction="up" delay={index * 100}>
                    <Card className="group border border-neutral-200 hover:border-transparent hover:shadow-xl transition-all duration-300 h-full overflow-hidden relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                      <CardContent className="p-6 relative z-10">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-neutral-600 leading-relaxed text-sm">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

          {/* Origin Selection */}
          {!selectedOrigin && (
        <section className="section-py layer-shade-1">
          <div className="container-fluid content-width-xl container-px">
              <ScrollReveal direction="up">
                <div className="text-center mb-8">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-2">Select Your Origin Country</h2>
                  <p className="text-neutral-600">Choose where you're starting your journey from</p>
                </div>
              </ScrollReveal>
              <div className="flex justify-center">
                <ScrollReveal direction="up" delay={100}>
                  <Card 
                    className="group cursor-pointer border-2 border-neutral-200 hover:border-primary hover:shadow-xl transition-all duration-300 w-full max-w-sm overflow-hidden relative"
                    onClick={() => setSelectedOrigin("IN")}
                  >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">🇮🇳</div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">India</h3>
                    <p className="text-neutral-500 text-sm">Coming soon: More countries</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
        </section>
      )}

      {/* Why Guides Matter - Visually Appealing Section */}
      {!selectedOrigin && (
        <section className="section-py layer-shade-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-100/30 rounded-full blur-3xl"></div>
          
          <div className="container-fluid content-width relative z-10 container-px">
            <ScrollReveal direction="up">
              <div className="text-center">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">Guides Powered by Our Student Community</h2>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Every country has unique challenges, requirements, and opportunities when it comes to studying abroad. Our guides are created and inspired by real international students who've been through the process.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
          )}

          {/* Destination Selection */}
          {selectedOrigin && !selectedDestination && (
        <section className="section-py bg-white">
          <div className="container-fluid content-width-xl container-px">
            <div className="py-8 border-t border-neutral-200 pt-12 bg-neutral-50/30 rounded-xl px-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Select Your Destination</h2>
                  <p className="text-neutral-600">Choose your study destination country</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedOrigin(null)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {destinations.map((dest, index) => (
                  <ScrollReveal key={dest.code} direction="up" delay={index * 50}>
                    <Card 
                      className="group cursor-pointer border border-neutral-200 hover:border-primary hover:shadow-lg transition-all duration-300 overflow-hidden relative"
                      onClick={() => setSelectedDestination(dest.code)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <CardContent className="pt-8 pb-8 text-center relative z-10">
                        <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{dest.flag}</div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{dest.name}</h3>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
          )}

          {/* Guides Display */}
          {selectedOrigin && selectedDestination && (
        <section className="section-py bg-white">
          <div className="container-fluid content-width-xl container-px">
            <div className="py-8 border-t border-neutral-200 pt-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Guides for India 🇮🇳 → {destinations.find(d => d.code === selectedDestination)?.flag} {destinations.find(d => d.code === selectedDestination)?.name}
                  </h2>
                  <p className="text-neutral-600">Select a guide to download or preview</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedDestination(null)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedOrigin(null);
                      setSelectedDestination(null);
                    }}
                  >
                    Start Over
                  </Button>
                </div>
              </div>

              <div className="space-y-4 bg-neutral-50/50 rounded-xl p-6 border border-neutral-200">
                {guides.map((guide, index) => {
                  const documentPath = selectedOrigin && selectedDestination 
                    ? getDocumentPath(selectedOrigin, selectedDestination, guide.id)
                    : null;
                  const hasDocument = !!documentPath;

                  return (
                    <Card key={index} className="group border border-neutral-200 hover:border-primary/20 hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${guide.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                      <CardContent className="p-8 relative z-10">
                        <div className="flex items-start gap-6">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <guide.icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-2xl font-bold mb-2">{guide.title}</h3>
                                <p className="text-lg text-neutral-600 mb-3">{guide.subtitle}</p>
                              </div>
                              {hasDocument ? (
                                <Badge className="bg-green-50 text-green-700 border border-green-200">
                                  Available
                                </Badge>
                              ) : (
                                <Badge className="bg-neutral-100 text-neutral-600 border border-neutral-200">
                                  Coming Soon
                                </Badge>
                              )}
                            </div>
                            <p className="text-neutral-600 mb-6 leading-relaxed">{guide.description}</p>
                            {hasDocument ? (
                              <div className="bg-green-50/50 border border-green-200 rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-4">
                                  <FileText className="w-5 h-5 text-green-700" />
                                  <p className="text-sm font-semibold text-green-900">
                                    Guide Available
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <Button 
                                    onClick={async () => {
                                      setPreviewDocument({
                                        path: documentPath,
                                        title: guide.title
                                      });
                                      setPreviewOpen(true);
                                      setIsLoadingPreview(true);
                                      setPreviewError(null);
                                      setDocumentHtml("");
                                      
                                      try {
                                        const response = await fetch(documentPath);
                                        if (!response.ok) {
                                          throw new Error("Failed to load document");
                                        }
                                        const arrayBuffer = await response.arrayBuffer();
                                        const result = await mammoth.convertToHtml({ arrayBuffer });
                                        setDocumentHtml(result.value);
                                      } catch (error) {
                                        console.error("Error loading document:", error);
                                        setPreviewError("Failed to load document preview. Please try downloading instead.");
                                      } finally {
                                        setIsLoadingPreview(false);
                                      }
                                    }}
                                    variant="outline"
                                    className="border-neutral-300 hover:bg-neutral-50"
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Preview
                                  </Button>
                                  <Button 
                                    onClick={() => {
                                      window.open(documentPath, '_blank');
                                      toast({
                                        title: "Download started",
                                        description: "Your guide is being downloaded.",
                                      });
                                    }}
                                    className="bg-primary hover:bg-primary/90 text-white"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </Button>
                                </div>
                                <p className="text-xs text-neutral-500 mt-3">
                                  Available in Microsoft Word format (.docx)
                                </p>
                              </div>
                            ) : (
                              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
                                <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                                  <strong className="text-neutral-900">Get notified when available:</strong> We're currently creating comprehensive, country-specific guides. Enter your email to be notified when this guide is ready.
                                </p>
                                <div className="flex gap-2">
                                  <Input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 border-neutral-300"
                                  />
                                  <Button 
                                    onClick={async () => {
                                      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                                        toast({
                                          title: "Invalid email",
                                          description: "Please enter a valid email address",
                                          variant: "destructive",
                                        });
                                        return;
                                      }
                                      setIsSubmitting(true);
                                      // Simulate API call
                                      await new Promise(resolve => setTimeout(resolve, 1000));
                                      toast({
                                        title: "You're on the list! 📧",
                                        description: "We'll notify you when this guide is ready.",
                                      });
                                      setEmail("");
                                      setIsSubmitting(false);
                                    }}
                                    disabled={isSubmitting}
                                    className="bg-primary hover:bg-primary/90 text-white"
                                  >
                                    <Bell className="w-4 h-4 mr-2" />
                                    Notify Me
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-10 bg-gradient-to-br from-primary-50 via-white to-secondary-50 border-2 border-primary-200 rounded-2xl p-8 text-center relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-200/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3">Want More Resources?</h3>
                  <p className="text-neutral-700 mb-6 max-w-2xl mx-auto">
                    Join our platform to access exclusive content, connect with students who've been through the process, and get personalized advice.
                  </p>
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-12 px-8"
                    onClick={() => {
                      const waitlistSection = document.getElementById('waitlist');
                      if (waitlistSection) {
                        waitlistSection.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.location.href = '/#waitlist';
                      }
                    }}
                  >
                    Join the Waitlist
                  </Button>
                </div>
              </div>
            </div>
        </div>
      </section>
      )}

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="text-xl">
              {previewDocument?.title || "Document Preview"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden bg-white">
            {isLoadingPreview ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Loading document preview...</p>
              </div>
            ) : previewError ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                <FileText className="w-16 h-16 text-destructive mb-4" />
                <h3 className="text-xl font-semibold mb-2">Preview Error</h3>
                <p className="text-muted-foreground mb-6 max-w-md">{previewError}</p>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      if (previewDocument) {
                        window.open(previewDocument.path, '_blank');
                        toast({
                          title: "Download started",
                          description: "Your guide is being downloaded.",
                        });
                      }
                    }}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Document
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setPreviewOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            ) : documentHtml ? (
              <div className="w-full h-full overflow-auto">
                <div className="max-w-4xl mx-auto p-8">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary mb-1">Document Preview</p>
                      <p className="text-xs text-muted-foreground">
                        This is a preview of the document. For the best experience and full formatting, please download the original file.
                      </p>
                    </div>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (previewDocument) {
                          window.open(previewDocument.path, '_blank');
                          toast({
                            title: "Download started",
                            description: "Your guide is being downloaded.",
                          });
                        }
                      }}
                      className="flex-shrink-0"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: documentHtml }}
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      lineHeight: '1.6',
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center p-8">
                <p className="text-muted-foreground">No document loaded</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Guides;
