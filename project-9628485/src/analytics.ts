// Google Analytics 4. Page changes inside the app are picked up by GA4's
// enhanced measurement ("page changes based on browser history events").
const GA_MEASUREMENT_ID = 'G-1EQB94BZ66';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function initAnalytics() {
  // Skip when unconfigured, and on local previews so testing doesn't count as visits
  if (!GA_MEASUREMENT_ID || ['localhost', '127.0.0.1'].includes(window.location.hostname)) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
}
