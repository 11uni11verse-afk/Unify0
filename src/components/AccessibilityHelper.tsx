import { useEffect } from 'react';

/**
 * Accessibility helper component that ensures proper focus management
 * and keyboard navigation throughout the application
 */
const AccessibilityHelper = () => {
  useEffect(() => {
    // Ensure all interactive elements are keyboard accessible
    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      // Tab key navigation enhancement
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseClick = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    window.addEventListener('keydown', handleKeyboardNavigation);
    window.addEventListener('mousedown', handleMouseClick);

    return () => {
      window.removeEventListener('keydown', handleKeyboardNavigation);
      window.removeEventListener('mousedown', handleMouseClick);
    };
  }, []);

  return null;
};

export default AccessibilityHelper;