import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Clock, MapPin, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent! 📬",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Contact Us"
        description="Get in touch with the UnifyO team. We're here to help with any questions about our international student community platform."
        url="https://unify0.com/contact"
        keywords={[
          "contact unifyo",
          "unifyo support",
          "international student app help",
          "study abroad platform contact"
        ]}
      />
      <Navbar />
      
      {/* Hero Section - Editorial Style matching About page */}
      <section id="main-content" className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-60"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl"></div>
        
        <div className="container-fluid content-width-lg relative z-10 container-px">
          <Breadcrumbs items={[{ label: "Contact" }]} />
          
          <div className="mt-2 space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.15] sm:leading-[1.1] tracking-tight">
              Get in
              <span className="block mt-2 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-700 leading-relaxed font-light max-w-3xl">
              Questions about the app? Partnership opportunities? Community collaborations? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Cards Section */}
      <section className="section-py layer-shade-1">
        <div className="container-fluid content-width-lg container-px">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="card-hover border-2">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Email Us</h3>
                <a href="mailto:11astitvajha@gmail.com" className="text-primary text-sm hover:underline block mb-1">11astitvajha@gmail.com</a>
                <a href="mailto:support@unifyo.com" className="text-primary text-sm hover:underline block">support@unifyo.com</a>
                <p className="text-xs text-muted-foreground mt-3">App support + partnerships</p>
              </CardContent>
            </Card>

            <Card className="card-hover border-2">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Office Hours</h3>
                <p className="text-muted-foreground text-sm mb-1">Mon - Fri: 9AM - 6PM EST</p>
                <p className="text-muted-foreground text-sm">Weekend: Limited support</p>
                <p className="text-xs text-muted-foreground mt-3">Eastern Standard Time (UTC-5)</p>
              </CardContent>
            </Card>

            <Card className="card-hover border-2">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2">Location</h3>
                <p className="text-muted-foreground text-sm mb-1">Boston, MA</p>
                <p className="text-muted-foreground text-sm">United States</p>
                <p className="text-xs text-muted-foreground mt-3">Remote-first company</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 animate-slide-up mb-8 sm:mb-10">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`bg-background min-h-[44px] ${errors.name ? 'border-destructive' : ''}`}
                      placeholder="Your full name"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && <p id="name-error" className="text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      inputMode="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`bg-background min-h-[44px] ${errors.email ? 'border-destructive' : ''}`}
                      placeholder="your.email@example.com"
                      autoComplete="email"
                      autoCapitalize="none"
                      autoCorrect="off"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && <p id="email-error" className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className={`bg-background min-h-[44px] ${errors.subject ? 'border-destructive' : ''}`}
                    placeholder="What is this regarding?"
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject && <p id="subject-error" className="text-xs text-destructive">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className={`min-h-[150px] bg-background resize-none ${errors.message ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    placeholder="Tell us more about your inquiry... (minimum 10 characters)"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    required
                  />
                  {errors.message && <p id="message-error" className="text-xs text-destructive">{errors.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-hero py-6 min-h-[48px]" 
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? "Sending message" : "Send message"}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Social Media Links */}
          <Card className="border-2 mb-8 sm:mb-10 shadow-lg">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4 text-center">Connect With Us</h3>
              <div className="flex justify-center gap-4">
                <a href="https://linkedin.com/company/studyconnect" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://twitter.com/studyconnect" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://instagram.com/studyconnect" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://facebook.com/studyconnect" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
              <p className="text-center text-sm text-neutral-600 mt-4">
                Follow us for daily tips, student stories, and community updates
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Partnership Opportunities</h3>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  University, student organization, or brand? Let's explore partnership opportunities.
                </p>
                <a href="mailto:partnerships@unifyo.com" className="text-sm text-primary font-medium hover:underline">partnerships@unifyo.com</a>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Share Your Feedback</h3>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  Help us build a better platform. Tell us what features you'd like to see.
                </p>
                <a href="mailto:feedback@unifyo.com" className="text-sm text-primary font-medium hover:underline">feedback@unifyo.com</a>
              </CardContent>
            </Card>
          </div>

          <div className="bg-neutral-50 rounded-xl p-6 text-center border border-neutral-200">
            <h3 className="text-xl font-bold mb-3">Report Technical Issues</h3>
            <p className="text-neutral-600 mb-2">
              Found a bug? Help us improve by reporting it.
            </p>
            <a href="mailto:bugs@unifyo.com" className="text-sm text-primary font-medium hover:underline">bugs@unifyo.com</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;