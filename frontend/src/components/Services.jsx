import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';

const services = [
  { title:'Interior Painting', desc:'Transform indoor spaces with smooth, even coats and premium finishes. Living rooms, bedrooms, kitchens, and more.', icon:'🏠', detail:'Wall prep, primer, 2 coats of premium paint, and clean-up included.', accent:'#2563eb', bg:'#eff6ff' },
  { title:'Exterior Painting', desc:'Weather-resistant, long-lasting coatings that protect and beautify your home\'s façade year-round.', icon:'🏗️', detail:'UV-resistant, anti-fungal paints. Surface treatment, crack filling, sealing included.', accent:'#0369a1', bg:'#f0f9ff' },
  { title:'Apartment Painting', desc:'Complete apartment painting with minimal disruption — ideal for new tenants, landlords, and renovations.', icon:'🏢', detail:'Fast turnaround packages. Furniture protection and floor covering included.', accent:'#475569', bg:'#f8fafc' },
  { title:'Wall Texture Design', desc:'Add character with custom textures — sponge, stucco, Venetian plaster, and more design options.', icon:'🎨', detail:'Sand, pebble, wood grain, and metallic finishes. Fully customisable.', accent:'#1d4ed8', bg:'#eef2ff' },
  { title:'Waterproof Painting', desc:'Protect bathrooms, terraces, and exterior walls from moisture damage with proven solutions.', icon:'💧', detail:'Damp-proof membranes applied before final coat. Ideal for terraces and basements.', accent:'#0284c7', bg:'#f0f9ff' },
];

export default function Services() {
  const [active, setActive] = useState(null);
  const [ref, inView] = useInView();

  return (
    <section id="services" className="py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-16 text-center reveal ${inView?'visible':''}`}>
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title text-ink">Our <span className="gradient-text">Services</span></h2>
          <p className="font-body text-muted mt-4 max-w-xl mx-auto">From a single room refresh to a complete exterior overhaul — done with precision.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s,i) => (
            <div key={i}
              className={`reveal delay-${Math.min(i,6)} ${inView?'visible':''} card-lift rounded-2xl p-8 cursor-pointer transition-all duration-400 border-2`}
              style={{ background: active===i ? s.accent : s.bg, borderColor: active===i ? s.accent : 'transparent' }}
              onClick={() => setActive(active===i?null:i)}>
              <div className="text-5xl mb-5 transition-transform duration-300 hover:scale-110 hover:rotate-3 inline-block">{s.icon}</div>
              <h3 className="font-display text-xl font-semibold mb-3 transition-colors duration-300"
                style={{ color: active===i ? 'white' : s.accent }}>{s.title}</h3>
              <p className="font-body text-sm leading-relaxed transition-colors duration-300"
                style={{ color: active===i ? 'rgba(255,255,255,.82)' : '#64748b' }}>{s.desc}</p>
              <div className={`overflow-hidden transition-all duration-500 ${active===i?'max-h-24 mt-4 opacity-100':'max-h-0 opacity-0'}`}>
                <p className="font-body text-xs leading-relaxed pt-3 border-t" style={{ color:'rgba(255,255,255,.7)', borderColor:'rgba(255,255,255,.25)' }}>{s.detail}</p>
              </div>
              <div className="mt-5 flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors duration-300"
                style={{ color: active===i ? 'rgba(255,255,255,.65)' : s.accent }}>
                <span>{active===i?'Collapse':'Learn more'}</span>
                <span className={`transition-transform duration-300 ${active===i?'rotate-90':''}`}>→</span>
              </div>
            </div>
          ))}

          {/* CTA tile */}
          <div className="rounded-2xl p-8 flex flex-col justify-between card-lift"
            style={{ background:'linear-gradient(135deg,#0f172a,#1e293b)' }}>
            <div>
              <span className="font-mono text-xs tracking-widest uppercase block mb-4 gradient-text">Ready to start?</span>
              <h3 className="font-display text-2xl font-semibold leading-snug text-white">Get a free estimate today</h3>
              <p className="font-body text-sm mt-3 text-slate-400">We'll visit and give a transparent quote.</p>
            </div>
            <button onClick={()=>document.getElementById('contact').scrollIntoView({behavior:'smooth'})}
              className="btn-shine mt-8 w-full rounded-full py-3.5 font-body font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg"
              style={{ background:'linear-gradient(135deg,#2563eb,#3b82f6)' }}>
              Request Quote →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
