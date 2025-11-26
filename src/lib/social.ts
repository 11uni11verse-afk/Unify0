// Social sharing utilities
import { trackSocialShare } from './analytics';

export const shareOnTwitter = (text: string, url: string) => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
  trackSocialShare('twitter', url);
};

export const shareOnLinkedIn = (url: string) => {
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  window.open(linkedInUrl, '_blank', 'width=550,height=420');
  trackSocialShare('linkedin', url);
};

export const shareOnFacebook = (url: string) => {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookUrl, '_blank', 'width=550,height=420');
  trackSocialShare('facebook', url);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};