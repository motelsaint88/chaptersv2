import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

export function GooeyTextMorph({ texts = ['Moonline Live', 'Pre-Boarding', 'Off Platform'], interval = 1800, className = '', textClassName = '' }) {
  const cleanTexts = useMemo(() => texts.filter(Boolean), [texts]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (cleanTexts.length <= 1) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % cleanTexts.length), interval);
    return () => window.clearInterval(id);
  }, [cleanTexts.length, interval]);

  return (
    <span className={cn('relative inline-grid min-h-[1.05em]', className)} aria-live="polite">
      {cleanTexts.map((text, i) => (
        <span
          key={`${text}-${i}`}
          className={cn(
            'col-start-1 row-start-1 transition-all duration-500 ease-out will-change-transform',
            i === index ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-md translate-y-2',
            textClassName
          )}
        >
          {text}
        </span>
      ))}
    </span>
  );
}
