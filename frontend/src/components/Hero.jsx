import React, { useEffect, useState, useRef } from 'react';

// Floating particle dots
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 6,
  left: `${Math.random() * 100}%`,
  top: `${70 + Math.random() * 28}%`,
  dur: `${7 + Math.random() * 12}s`,
  delay: `${Math.random() * 8}s`,
  color: ['#2563eb','#60a5fa','#bfdbfe','#e2e8f0'][i % 4],
}));

// Typing animation hook
function useTyping(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, charIdx + 1));
        if (charIdx + 1 === word.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx(c => c + 1);
      } else {
        setDisplay(word.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setCharIdx(0);
          setWordIdx(w => (w + 1) % words.length);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// Counter hook
function useCounter(target, dur, start) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s = null;
    const step = ts => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / dur, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, dur]);
  return val;
}

function StatCard({ value, suffix, label, dur, start, delay }) {
  const count = useCounter(value, dur, start);
  return (
    <div className="card-lift bg-white/90 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/80 shadow-lg"
      style={{ animationDelay: delay }}>
      <div className="font-display text-3xl font-bold gradient-text">{count}{suffix}</div>
      <div className="font-mono text-xs text-muted tracking-widest uppercase mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [statsStart, setStatsStart] = useState(false);
  const typed = useTyping(['Interior Painting','Exterior Painting','Texture Designs','Waterproofing'], 75, 2000);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    setTimeout(() => setStatsStart(true), 900);
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── Full-bleed background image with ken-burns ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1600&q=90"
          alt="Beautiful painted home interior"
          className={`w-full h-full object-cover ken-burns transition-opacity duration-1000 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(105deg, rgba(15,23,42,.88) 0%, rgba(15,23,42,.75) 40%, rgba(37,99,235,.25) 70%, rgba(15,23,42,.55) 100%)'
        }}/>
        {/* Bottom fade to next section colour */}
        <div className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to bottom, transparent, #f8fafc)' }}/>
      </div>

      {/* ── Floating particles ── */}
      {PARTICLES.map(p => (
        <div key={p.id} className="particle-dot z-10"
          style={{ left:p.left, top:p.top, width:p.size, height:p.size,
            background:p.color, animationDuration:p.dur, animationDelay:p.delay, opacity:.5 }}/>
      ))}

      {/* ── Animated grid lines overlay ── */}
      <div className="absolute inset-0 z-0 opacity-[0.04]" style={{
        backgroundImage:`linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)`,
        backgroundSize:'80px 80px'
      }}/>

      {/* ── Main content ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-24 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div>
            {/* Badge */}
            <div className={`transition-all duration-700 ${visible?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}>
              <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase px-4 py-2 rounded-full border mb-8"
                style={{ background:'rgba(37,99,235,.18)', borderColor:'rgba(96,165,250,.4)', color:'#93c5fd' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:'#60a5fa' }}/>
                Serving Bangalore Since 2020
              </span>
            </div>

            {/* Headline */}
            <div className={`transition-all duration-700 delay-100 ${visible?'opacity-100':'opacity-0'}`}>
              <h1 className="font-display leading-none mb-2" style={{ fontSize:'clamp(2.8rem,6vw,5rem)' }}>
                <span className="block text-white mb-1" style={{ animation:'text-reveal .9s .15s forwards', opacity:0 }}>
                  Whitefield
                </span>
                <span className="block text-white mb-1" style={{ animation:'text-reveal .9s .35s forwards', opacity:0 }}>
                  <span className="gradient-text">Paint Services</span>
                </span>
                
              </h1>
            </div>

            {/* Typed text */}
            <div className={`flex items-center gap-2 mt-5 mb-8 transition-all duration-700 delay-300 ${visible?'opacity-100 translate-y-0':'opacity-0 translate-y-4'}`}>
              <span className="font-mono text-sm" style={{ color:'rgba(255,255,255,.5)' }}>We specialise in</span>
              <span className="font-body font-semibold text-base" style={{ color:'#93c5fd' }}>{typed}</span>
              <span className="cursor-blink"/>
            </div>

            {/* Description */}
            <p className={`font-body text-base leading-relaxed max-w-md mb-10 transition-all duration-700 delay-400 ${visible?'opacity-100 translate-y-0':'opacity-0 translate-y-4'}`}
              style={{ color:'rgba(255,255,255,.65)' }}>
              Trusted by 500+ homeowners across Bangalore. Quality materials, experienced painters, transparent pricing — guaranteed.
            </p>

            {/* CTAs */}
            <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-500 ${visible?'opacity-100 translate-y-0':'opacity-0 translate-y-4'}`}>
              <button onClick={() => scrollTo('contact')}
                className="btn-shine font-body font-semibold px-8 py-4 rounded-full text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background:'linear-gradient(135deg,#2563eb,#3b82f6)' }}>
                🎨 Get Free Quote
              </button>
              <a href="https://wa.me/919110423744?text=Hi%2C%20I%20found%20you%20online%20and%20would%20like%20a%20free%20painting%20quote!"
                target="_blank" rel="noreferrer"
                className="btn-shine flex items-center gap-2 font-body font-semibold px-8 py-4 rounded-full border-2 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ borderColor:'rgba(255,255,255,.35)' }}>
                💬 Chat on WhatsApp
              </a>
            </div>

            {/* Trust pills */}
            <div className={`flex flex-wrap gap-3 mt-8 transition-all duration-700 delay-700 ${visible?'opacity-100 translate-y-0':'opacity-0 translate-y-4'}`}>
              {[['✓','Experienced Painters'],['✓','Affordable Pricing'],['✓','Quality Materials'],['✓','On Time']].map(([icon,t],i)=>(
                <span key={i} className="flex items-center gap-1.5 text-xs font-body px-3 py-1.5 rounded-full"
                  style={{ background:'rgba(255,255,255,.1)', color:'rgba(255,255,255,.8)', border:'1px solid rgba(255,255,255,.15)' }}>
                  <span style={{ color:'#60a5fa' }}>{icon}</span>{t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Stats + floating card ── */}
          <div className={`transition-all duration-700 delay-500 ${visible?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
            {/* Big stat circle */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-56 h-56 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white/20"
                  style={{ background:'linear-gradient(135deg,#1d4ed8,#2563eb,#3b82f6)' }}>
                  <div className="font-display text-6xl font-bold text-white">5+</div>
                  <div className="font-mono text-xs text-blue-100 tracking-widest uppercase mt-1">Years of<br/>Excellence</div>
                </div>
                {/* Orbiting badges */}
                <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-xl border-2 border-white"
                  style={{ background:'linear-gradient(135deg,#0f172a,#1e293b)' }}>
                  <div className="font-display text-lg font-bold text-white">4.9★</div>
                  <div className="font-mono text-[9px] text-slate-400">Rating</div>
                </div>
                <div className="absolute -bottom-3 -left-3 w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-xl border-2 border-white"
                  style={{ background:'linear-gradient(135deg,#0f172a,#1e293b)' }}>
                  <div className="font-display text-base font-bold text-white">500+</div>
                  <div className="font-mono text-[9px] text-slate-400">Jobs</div>
                </div>
              </div>
            </div>

            {/* Stat cards grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard value={500} suffix="+" label="Projects Done"    dur={1600} start={statsStart}/>
              <StatCard value={100} suffix="%" label="Satisfaction"     dur={1400} start={statsStart}/>
              <StatCard value={5}  suffix="+"  label="Years Experience" dur={1200} start={statsStart}/>
              <StatCard value={5}   suffix="★"  label="Avg Rating"       dur={900}  start={statsStart}/>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-all duration-700 delay-1000 ${visible?'opacity-100':'opacity-0'}`}>
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color:'rgba(255,255,255,.4)' }}>scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-white/60 animate-bounce"/>
        </div>
      </div>
    </section>
  );
}
