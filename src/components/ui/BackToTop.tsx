import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          variant="outline"
          size="icon"
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 h-12 w-12 rounded-full shadow-lg opacity-0 animate-in fade-in slide-in-from-bottom-4"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};
