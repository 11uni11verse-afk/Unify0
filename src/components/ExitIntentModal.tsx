import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const ExitIntentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already seen the modal in this session
    const hasSeenModal = sessionStorage.getItem('exitIntentShown');
    if (hasSeenModal) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top and hasn't been shown yet
      if (e.clientY <= 0 && !hasShown && !isOpen) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
        trackEvent('exit_intent_shown');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('waitlist_entries')
        .insert([
          {
            email: email.trim(),
            full_name: '', // Not collected in this form
            source: 'exit_intent_popup'
          }
        ]);

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          toast({
            title: "You're already on the list! 🎉",
            description: "We'll notify you when we launch.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "You're in! 🎉",
          description: "We'll notify you when we launch.",
        });
      }
      
    trackEvent('exit_intent_submit', { email });
      setIsSuccess(true);
      
      // Close modal after showing success
      setTimeout(() => {
    setIsOpen(false);
        setIsSuccess(false);
        setEmail('');
      }, 2000);
      
    } catch (error) {
      console.error('Error saving email:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or use the waitlist form below.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Wait! Don't Miss Out 🎓
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Join 10,000+ students who are already on the waitlist.
            Get early access + exclusive benefits!
          </DialogDescription>
        </DialogHeader>
        
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-lg font-semibold text-green-600">You're on the list!</p>
            <p className="text-sm text-muted-foreground">Check your email for confirmation.</p>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
              disabled={isSubmitting}
            className="h-12"
          />
            <Button 
              type="submit" 
              className="w-full h-12 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Joining...
                </>
              ) : (
                'Get Early Access'
              )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </form>
        )}
      </DialogContent>
    </Dialog>
  );
};