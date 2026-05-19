import React from 'react';
import './styles/index.css';
import { SafeBlock } from './components/effects/SafeBlock.jsx';
import { GooeyTextMorph } from './components/effects/GooeyTextMorph.jsx';
import { HeroRail } from './components/effects/HeroRail.jsx';

export default function App() {
  return (
    <main className="min-h-screen px-5 py-20">
      <section className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-amberline/70">Aagontuk Animation Lab</p>
        <h1 className="mt-4 font-display text-5xl text-smoke md:text-7xl">Future effects are ready.</h1>
        <div className="mt-8 font-display text-4xl text-amberline">
          <SafeBlock fallback={<span>Moonline</span>}>
            <GooeyTextMorph texts={["Moonline Live", "Pre-Boarding", "Off Platform"]} />
          </SafeBlock>
        </div>
        <SafeBlock>
          <HeroRail className="mt-12" />
        </SafeBlock>
      </section>
    </main>
  );
}
