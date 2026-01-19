import { useEffect, useState } from 'react';

declare global {
  interface Window {
    hcaptcha?: {
      render: (container: string | HTMLElement, options: object) => string;
      reset: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}

interface HCaptchaProps {
  onVerify?: (token: string) => void;
}

export default function HCaptcha({ onVerify }: HCaptchaProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Load hCaptcha script if not already loaded
    const existingScript = document.querySelector('script[src*="hcaptcha"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://js.hcaptcha.com/1/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div 
      className="h-captcha" 
      data-sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
      data-theme="dark"
    />
  );
}
