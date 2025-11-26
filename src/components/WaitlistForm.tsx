import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, Globe, GraduationCap, Loader2, ChevronDown, Sparkles, CheckCircle2, ArrowRight, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackWaitlistSubmit } from "@/lib/analytics";
import * as Collapsible from "@radix-ui/react-collapsible";
import SuccessModal from "@/components/SuccessModal";
import SuccessAnimation from "@/components/SuccessAnimation";
import { supabase } from "@/lib/supabase";

const WaitlistForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExtendedForm, setShowExtendedForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentCountry: "",
    dreamDestination: "",
    fieldOfStudy: "",
    currentStatus: "",
    expectations: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validFields, setValidFields] = useState<Record<string, boolean>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Real-time validation
  const validateField = useCallback((field: string, value: string) => {
    let error = "";
    let isValid = false;

    switch (field) {
      case "fullName":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        } else {
          isValid = true;
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        } else {
          isValid = true;
        }
        break;
    }

    return { error, isValid };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    const nameValidation = validateField("fullName", formData.fullName);
    if (nameValidation.error) newErrors.fullName = nameValidation.error;
    
    const emailValidation = validateField("email", formData.email);
    if (emailValidation.error) newErrors.email = emailValidation.error;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please check your information",
        description: "Name and valid email are required",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Google Sheets Integration
      // IMPORTANT: Replace YOUR_SCRIPT_ID with your actual Google Apps Script deployment URL
      // See GOOGLE_SHEETS_SETUP.md for complete setup instructions
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL || 
        'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
      
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'website_waitlist',
      };

      // 1. Submit to Supabase (PostgreSQL)
      try {
        const { error: supabaseError } = await supabase
          .from('waitlist_entries')
          .insert([
            {
              full_name: formData.fullName,
              email: formData.email,
              current_country: formData.currentCountry,
              dream_destination: formData.dreamDestination,
              field_of_study: formData.fieldOfStudy,
              current_status: formData.currentStatus,
              expectations: formData.expectations,
              source: 'website_waitlist'
            }
          ]);

        if (supabaseError) throw supabaseError;
        console.log('✅ Waitlist submission saved to Supabase');
      } catch (err) {
        console.error('⚠️ Supabase submission failed:', err);
        // Continue to Google Sheets fallback if needed
      }

      // 2. Submit to Google Sheets (Backup)
      // Using 'no-cors' mode because Google Apps Script Web Apps don't support CORS
      // The response won't be readable, but the data will be saved
      if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
        try {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData),
          });
          
          console.log('✅ Waitlist submission sent to Google Sheets');
        } catch (sheetError) {
          console.warn('⚠️ Google Sheets submission failed:', sheetError);
          console.log('📝 Waitlist Data (logged locally):', submissionData);
          // Still show success to user since we can't verify with no-cors
        }
      } else {
        console.warn('⚠️ Google Sheets script URL not configured. See GOOGLE_SHEETS_SETUP.md');
        console.log('📝 Waitlist Data (logged locally):', submissionData);
      }
      
      // Track the submission
      trackWaitlistSubmit('waitlist_form', {
        country: formData.currentCountry,
        destination: formData.dreamDestination,
        status: formData.currentStatus,
      });

      // Show success animation with confetti
      setShowSuccessAnimation(true);
      
      // Show success modal after animation
      setTimeout(() => {
        setShowSuccessAnimation(false);
        setShowSuccessModal(true);
      }, 2000);

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        currentCountry: "",
        dreamDestination: "",
        fieldOfStudy: "",
        currentStatus: "",
        expectations: "",
      });
      setShowExtendedForm(false);
      setErrors({});
      setValidFields({});
    } catch (error) {
      console.error('Waitlist submission error:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or email us at 11astitvajha@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Real-time validation for required fields
    if (field === "fullName" || field === "email") {
      const validation = validateField(field, value);
      
      if (validation.error) {
        setErrors({ ...errors, [field]: validation.error });
        setValidFields({ ...validFields, [field]: false });
      } else {
        const newErrors = { ...errors };
        delete newErrors[field];
        setErrors(newErrors);
        setValidFields({ ...validFields, [field]: validation.isValid });
      }
    } else {
      // Clear error for optional fields
      if (errors[field]) {
        const newErrors = { ...errors };
        delete newErrors[field];
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="relative bg-gradient-to-br from-white via-primary-50/40 to-secondary-50/40 rounded-3xl shadow-[0_30px_90px_-30px_rgba(0,0,0,0.2)] border border-primary-100/60 backdrop-blur-sm overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-200/25 to-secondary-200/25 rounded-full blur-3xl -mr-[300px] -mt-[300px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent-200/25 to-primary-200/25 rounded-full blur-3xl -ml-[250px] -mb-[250px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-secondary-200/20 to-accent-200/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-0">
          {/* Left Side - Content & Benefits */}
          <div className="p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-primary-50/50 via-white/30 to-secondary-50/50 lg:border-r border-primary-100/50">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 mb-6 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent leading-tight">
              Join the Founding Community
            </h2>
            
            <p className="text-lg sm:text-xl text-neutral-700 mb-6 leading-relaxed">
              Whether you're planning to study abroad or already there, be among the first <span className="font-bold text-primary-600">1,200+</span> members.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Exclusive Early Access</p>
                  <p className="text-sm text-neutral-600">Beta access (Summer 2026) for founding members</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-secondary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-secondary-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Lifetime Premium Features</p>
                  <p className="text-sm text-neutral-600">Free premium forever for founding members</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-accent-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Priority Matching</p>
                  <p className="text-sm text-neutral-600">Get matched first when we launch</p>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-accent-50 to-orange-50 border-2 border-accent-300 rounded-full shadow-sm">
              <span className="text-sm font-bold text-accent-700 tracking-wide">Limited to first 5,000 users</span>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 sm:p-10 md:p-12 lg:p-16 bg-white/60 backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">Get Early Access</h3>
              <p className="text-sm text-neutral-600">
                Join <span className="font-bold text-primary-600">1,200+</span> students waiting for launch
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Essential Fields - Horizontal Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name Field */}
              <div className="relative group">
                <Label 
                  htmlFor="fullName" 
                  className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-2"
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    focusedField === 'fullName' ? 'bg-primary-100' : 'bg-neutral-100'
                  }`}>
                    <User className={`w-3.5 h-3.5 transition-colors ${
                      focusedField === 'fullName' ? 'text-primary-600' : 'text-neutral-500'
                    }`} />
                  </div>
                  Full Name <span className="text-accent-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  onFocus={() => setFocusedField('fullName')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`h-12 bg-white border-2 transition-all duration-200 ${
                    errors.fullName 
                      ? 'border-destructive focus-visible:ring-destructive bg-red-50' 
                      : validFields.fullName
                      ? 'border-green-500 bg-green-50'
                      : focusedField === 'fullName'
                      ? 'border-primary-400 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                  placeholder="Your full name"
                />
                {errors.fullName && (
                  <p className="text-xs text-destructive mt-1.5 flex items-center gap-1 animate-fade-in">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
                {validFields.fullName && !errors.fullName && (
                  <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1 animate-fade-in">
                    <CheckCircle2 className="w-3 h-3" />
                    Looks good!
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="relative group">
                <Label 
                  htmlFor="email" 
                  className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-2"
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    focusedField === 'email' ? 'bg-primary-100' : 'bg-neutral-100'
                  }`}>
                    <Mail className={`w-3.5 h-3.5 transition-colors ${
                      focusedField === 'email' ? 'text-primary-600' : 'text-neutral-500'
                    }`} />
                  </div>
                  Email Address <span className="text-accent-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`h-12 bg-white border-2 transition-all duration-200 ${
                    errors.email 
                      ? 'border-destructive focus-visible:ring-destructive bg-red-50' 
                      : validFields.email
                      ? 'border-green-500 bg-green-50'
                      : focusedField === 'email'
                      ? 'border-primary-400 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1.5 flex items-center gap-1 animate-fade-in">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
                {validFields.email && !errors.email && (
                  <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1 animate-fade-in">
                    <CheckCircle2 className="w-3 h-3" />
                    Valid email address
                  </p>
                )}
              </div>
            </div>

            {/* Optional Fields - Collapsible */}
            <Collapsible.Root open={showExtendedForm} onOpenChange={setShowExtendedForm}>
              <Collapsible.Trigger asChild>
                <button
                  type="button"
                  className="w-full py-3 px-4 text-left text-primary-600 hover:text-primary-700 bg-transparent hover:bg-primary-50/30 border border-primary-200/60 hover:border-primary-300/80 rounded-xl transition-all duration-200 group"
                >
                  <span className="flex items-center justify-center gap-2 font-medium text-sm">
                    <Sparkles className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    Help us personalize your experience (optional)
                    <ChevronDown className={`w-4 h-4 opacity-70 group-hover:opacity-100 transition-all duration-200 ${showExtendedForm ? 'rotate-180' : ''}`} />
                  </span>
                </button>
              </Collapsible.Trigger>

              <Collapsible.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
                <div className="mt-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-primary-100">
                  {/* Row 1: Current Country + Dream Destination */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="relative">
                      <Label htmlFor="currentCountry" className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-2">
                        <div className="w-5 h-5 rounded-md bg-primary-50 flex items-center justify-center">
                          <Globe className="w-3.5 h-3.5 text-primary-600" />
                        </div>
                        Current Country
                      </Label>
                      <Input
                        id="currentCountry"
                        placeholder="e.g. India, Brazil, Nigeria"
                        value={formData.currentCountry}
                        onChange={(e) => handleInputChange("currentCountry", e.target.value)}
                        className="h-11 bg-white border-2 border-neutral-200 hover:border-neutral-300 focus-visible:border-primary-400 transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Label htmlFor="dreamDestination" className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-2 whitespace-nowrap">
                        <div className="w-5 h-5 rounded-md bg-secondary-50 flex items-center justify-center flex-shrink-0">
                          <Globe className="w-3.5 h-3.5 text-secondary-600" />
                        </div>
                        <span className="truncate">Dream Study Destination</span>
                      </Label>
                      <Input
                        id="dreamDestination"
                        placeholder="e.g. UK, Canada, Australia"
                        value={formData.dreamDestination}
                        onChange={(e) => handleInputChange("dreamDestination", e.target.value)}
                        className="h-11 bg-white border-2 border-neutral-200 hover:border-neutral-300 focus-visible:border-primary-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Field of Study + Current Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="relative">
                      <Label htmlFor="fieldOfStudy" className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-2">
                        <div className="w-5 h-5 rounded-md bg-accent-50 flex items-center justify-center">
                          <GraduationCap className="w-3.5 h-3.5 text-accent-700" />
                        </div>
                        Field of Study
                      </Label>
                      <Input
                        id="fieldOfStudy"
                        placeholder="e.g. Computer Science, MBA"
                        value={formData.fieldOfStudy}
                        onChange={(e) => handleInputChange("fieldOfStudy", e.target.value)}
                        className="h-11 bg-white border-2 border-neutral-200 hover:border-neutral-300 focus-visible:border-primary-400 transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Label htmlFor="currentStatus" className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-2">
                        <div className="w-5 h-5 rounded-md bg-primary-50 flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-primary-600" />
                        </div>
                        Current Status
                      </Label>
                      <Select
                        value={formData.currentStatus}
                        onValueChange={(value) => handleInputChange("currentStatus", value)}
                      >
                        <SelectTrigger className="h-11 bg-white border-2 border-neutral-200 hover:border-neutral-300 focus:border-primary-400 transition-colors">
                          <SelectValue placeholder="Select your status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="planning">Planning to Study Abroad</SelectItem>
                          <SelectItem value="applying">Currently Applying</SelectItem>
                          <SelectItem value="accepted">Accepted, Haven't Started</SelectItem>
                          <SelectItem value="studying">Currently Studying Abroad</SelectItem>
                          <SelectItem value="graduated">Graduated from Abroad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Row 3: Expectations - Full Width */}
                  <div className="relative">
                    <Label htmlFor="expectations" className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-2">
                      <div className="w-5 h-5 rounded-md bg-secondary-50 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-secondary-600" />
                      </div>
                      What do you hope to get from this platform?
                    </Label>
                    <Textarea
                      id="expectations"
                      placeholder="Tell us about your biggest challenges or what features would help you most..."
                      value={formData.expectations}
                      onChange={(e) => handleInputChange("expectations", e.target.value)}
                      className="min-h-[90px] bg-white border-2 border-neutral-200 hover:border-neutral-300 focus-visible:border-primary-400 resize-none transition-colors"
                    />
                  </div>
                </div>
              </Collapsible.Content>
            </Collapsible.Root>

            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-12 text-base font-bold relative overflow-hidden group shadow-[0_8px_16px_-4px_rgba(59,130,246,0.4)] hover:shadow-[0_12px_24px_-6px_rgba(59,130,246,0.5)] transition-all duration-300" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="opacity-0">Secure Your Spot - Join Free</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                </>
              ) : (
                <>
                  <span className="relative z-10 flex items-center gap-2">
                    Secure Your Spot - Join Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </>
              )}
            </Button>

              {/* Footer Info */}
              <div className="space-y-2.5 pt-1">
                <p className="text-xs sm:text-sm text-neutral-600">
                  By joining, you agree to receive updates about our launch.
                </p>
                <div className="flex items-center gap-2 text-xs font-medium text-primary-700 bg-primary-50 py-2 px-3 sm:px-4 rounded-xl border border-primary-100">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>
                    <span className="font-bold">What happens next:</span> Instant confirmation → Early access invite → Connect with students
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <SuccessAnimation
        show={showSuccessAnimation}
        title="You're in! 🎉"
        message="Welcome to the UnifyO community. Check your email for next steps."
        showConfetti={true}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default WaitlistForm;