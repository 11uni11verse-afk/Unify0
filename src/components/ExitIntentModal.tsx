import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export const ExitIntentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('exit_intent_submit', { email });
    // TODO: Integrate with your email service
    setIsOpen(false);
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
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12"
          />
          <Button type="submit" className="w-full h-12 text-base">
            Get Early Access
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};