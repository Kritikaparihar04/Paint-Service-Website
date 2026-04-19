import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';

const areas = [
  { name:'Whitefield',       sub:'All areas covered', icon:'🏙️', color:'#2563eb' },
  { name:'Kadugodi',    sub:'Primary base',      icon:'📍', color:'#1d4ed8' },
  { name:'Varthur',        sub:'Full coverage',     icon:'📍', color:'#0369a1' },
  { name:'Hoodi',        sub:'Full coverage',     icon:'📍', color:'#475569' },
  { name:'ITPL',          sub:'Full coverage',     icon:'📍', color:'#334155' },
  { name:'Hoskote',        sub:'Full coverage',     icon:'📍', color:'#0284c7' },
  { name:'JP Nagar',           sub:'Available',         icon:'📍', color:'#2563eb' },
  { name:'Seeganahalli', sub:'Available',         icon:'📍', color:'#1d4ed8' },
];

export default function ServiceAreas() {
  const [selected, setSelected] = useState(null);
  const [ref, inView] = useInView();

  return (
    <section id="service-areas" className="py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-16 text-center reveal ${inView?'visible':''}`}>
          <span className="section-tag">Coverage</span>
          <h2 className="section-title text-ink">Service <span className="gradient-text">Areas</span></h2>
          <p className="font-body text-muted mt-4 max-w-lg mx-auto">Professional painting across Bangalore. Click any area to book directly via WhatsApp.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {areas.map((area,i) => (
            <div key={i}
              className={`reveal-scale delay-${Math.min(i,6)} ${inView?'visible':''} card-lift cursor-pointer rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-350 border-2`}
              style={{ background: selected===i ? area.color : '#f8fafc', borderColor: selected===i ? area.color : '#e2e8f0' }}
              onClick={() => setSelected(selected===i?null:i)}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 text-2xl transition-all duration-300 hover:scale-110 hover:rotate-12 ${selected===i?'scale-110':''}`}
                style={{ background: selected===i ? 'rgba(255,255,255,.2)' : `${area.color}15` }}>
                {area.icon}
              </div>
              <h3 className="font-display font-semibold text-base mb-1 transition-colors duration-300"
                style={{ color: selected===i ? 'white' : '#0f172a' }}>{area.name}</h3>
              <span className="font-mono text-xs tracking-widest uppercase transition-colors"
                style={{ color: selected===i ? 'rgba(255,255,255,.65)' : '#64748b' }}>{area.sub}</span>
              {selected===i && (
                <a href={`https://wa.me/919513184860?text=${encodeURIComponent(`Hi! I need painting services in ${area.name}, Bangalore. Please share a quote.`)}`}
                  target="_blank" rel="noreferrer"
                  onClick={e=>e.stopPropagation()}
                  className="mt-4 bg-white rounded-full px-4 py-2 font-mono text-xs font-semibold hover:scale-105 transition-transform shadow"
                  style={{ color:area.color }}>
                  💬 Book via WhatsApp →
                </a>
              )}
            </div>
          ))}
        </div>

        <div className={`mt-12 rounded-2xl p-8 text-center reveal delay-4 ${inView?'visible':''}`}
          style={{ background:'linear-gradient(135deg,#0f172a,#1e293b)' }}>
          <p className="font-body text-slate-400 text-white">Don't see your area? We may still be able to help!</p>
          <a href="tel:+91-9513184860">
            <button className="btn-shine rounded-full px-8 py-3.5 font-body font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ background:'linear-gradient(135deg,#2563eb,#3b82f6)' }}>
              📞 Call Us — +91 95131 84860
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
