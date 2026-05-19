import React from 'react';
import { cn } from '@/lib/utils';

const DEFAULT_ITEMS = ['Compartment', 'Ticket Wall', 'Platform Radio', 'Table Tray', 'Creator Carriage', 'Control Room'];

export function HeroRail({ items = DEFAULT_ITEMS, className = '' }) {
  const railItems = [...items, ...items];
  return (
    <div className={cn('overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] py-4', className)}>
      <div className="ae-hero-rail flex w-max gap-4">
        {railItems.map((item, index) => (
          <div key={`${item}-${index}`} className="h-28 w-56 shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amberline/70">Moonline</div>
            <div className="mt-7 font-display text-2xl text-smoke">{item}</div>
          </div>
        ))}
      </div>
      <style>{`
        .ae-hero-rail { animation: aeHeroRail 36s linear infinite; }
        @keyframes aeHeroRail { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .ae-hero-rail { animation: none; } }
      `}</style>
    </div>
  );
}
