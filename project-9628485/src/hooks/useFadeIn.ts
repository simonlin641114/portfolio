import { useEffect, useState } from 'react';

export function useFadeIn(delay: number = 0) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return {
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: 'opacity 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    } as React.CSSProperties,
  };
}
