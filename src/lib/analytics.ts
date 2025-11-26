// Analytics utility for tracking events
// Get Measurement ID from environment variable or use placeholder
// Set VITE_GA_ID in your .env file or update index.html directly

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || 'GA_MEASUREMENT_ID';

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
  
  // Log in development
  if (import.meta.env.DEV) {
    console.log('📊 Analytics Event:', eventName, params);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID !== 'GA_MEASUREMENT_ID') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Common event tracking functions
export const trackWaitlistSubmit = (source: string, data?: Record<string, any>) => {
  trackEvent('waitlist_submit', {
    source,
    ...data,
  });
};

export const trackGuideDownload = (origin: string, destination: string) => {
  trackEvent('guide_download', {
    origin,
    destination,
  });
};

export const trackCTAClick = (location: string, label?: string) => {
  trackEvent('cta_click', {
    location,
    label,
  });
};

export const trackSocialShare = (platform: string, url: string) => {
  trackEvent('social_share', {
    platform,
    url,
  });
};