import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    hcaptcha?: {
      render: (container: string | HTMLElement, options: object) => string;
      reset: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
    onHCaptchaLoad?: () => void;
  }
}

export default function HCaptcha() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const renderCaptcha = () => {
      if (containerRef.current && window.hcaptcha && !widgetIdRef.current) {
        try {
          widgetIdRef.current = window.hcaptcha.render(containerRef.current, {
            sitekey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2',
            theme: 'dark',
          });
        } catch (e) {
          // Already rendered
        }
      }
    };

    // Check if hCaptcha is already loaded
    if (window.hcaptcha) {
      renderCaptcha();
    } else {
      // Load hCaptcha script
      const existingScript = document.querySelector('script[src*="hcaptcha.com"]');
      if (!existingScript) {
        window.onHCaptchaLoad = renderCaptcha;
        const script = document.createElement('script');
        script.src = 'https://js.hcaptcha.com/1/api.js?onload=onHCaptchaLoad&render=explicit';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      } else {
        // Script exists but might still be loading
        const checkInterval = setInterval(() => {
          if (window.hcaptcha) {
            clearInterval(checkInterval);
            renderCaptcha();
          }
        }, 100);
        
        // Clean up interval after 10 seconds
        setTimeout(() => clearInterval(checkInterval), 10000);
      }
    }

    return () => {
      widgetIdRef.current = null;
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex justify-start"
    />
  );
}
