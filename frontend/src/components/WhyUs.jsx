import React from 'react';
import { useInView } from '../hooks/useInView';

const reasons = [
  { icon:'👷', title:'Experienced Team', desc:'Our skilled painters bring years of hands-on experience. Trained, vetted, and professional on every site.', stat:'5+ yrs', accent:'#2563eb', bg:'#eff6ff' },
  { icon:'💰', title:'Affordable Prices', desc:'Premium quality painting at competitive rates. No hidden charges — transparent pricing always.', stat:'Best Value', accent:'#0369a1', bg:'#f0f9ff' },
  { icon:'🎨', title:'Quality Paint Brands', desc:'Asian Paints, Berger, and Dulux — ensuring durability and a flawless finish on every wall.', stat:'Top Brands', accent:'#475569', bg:'#f8fafc' },
  { icon:'✨', title:'Clean Professional Work', desc:'We protect your furniture and floors throughout and leave the site spotless after work.', stat:'0 Mess', accent:'#1d4ed8', bg:'#eef2ff' },
  { icon:'⏰', title:'On-Time Delivery', desc:'Projects planned carefully and delivered within the committed schedule — every single time.', stat:'100%', accent:'#0284c7', bg:'#f0f9ff' },
  { icon:'🛡️', title:'Work Guarantee', desc:'All work comes with a service guarantee. If you\'re not satisfied, we\'ll make it right — free.', stat:'Guaranteed', accent:'#334155', bg:'#f8fafc' },
];

export default function WhyUs() {
  const [ref, inView] = useInView();
  const [cardsRef, cardsInView] = useInView();

  return (
    <section id="why-us" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="lg:sticky lg:top-28" ref={ref}>
            <span className={`section-tag reveal ${inView?'visible':''}`}>Why WPS House Painters</span>
            <h2 className={`section-title text-ink mb-6 reveal delay-1 ${inView?'visible':''}`}>
              Why <span className="gradient-text">Choose Us?</span>
            </h2>
            <p className={`font-body text-muted leading-relaxed mb-8 reveal delay-2 ${inView?'visible':''}`}>
              Committed to delivering exceptional results on every project. Built on trust, quality, and genuine care for every home we touch in Bangalore.
            </p>
            {/* Stats panel */}
            <div className={`rounded-2xl p-6 reveal delay-3 ${inView?'visible':''} border`}
              style={{ background:'linear-gradient(135deg,#eff6ff,#f0f9ff)', borderColor:'#bfdbfe' }}>
              <div className="grid grid-cols-3 gap-6 text-center">
                {[['500+','Projects','#2563eb'],['5+','Years','#0369a1'],['4.9★','Rating','#475569']].map(([num,label,color],i)=>(
                  <div key={i} className="group cursor-default">
                    <div className="font-display text-3xl font-bold group-hover:scale-110 transition-transform inline-block" style={{ color }}>{num}</div>
                    <div className="font-mono text-xs text-muted tracking-widest uppercase mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`mt-8 reveal delay-4 ${inView?'visible':''}`}>
              <button onClick={()=>document.getElementById('contact').scrollIntoView({behavior:'smooth'})}
                className="btn-shine font-body font-semibold px-8 py-4 rounded-full text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                style={{ background:'linear-gradient(135deg,#1d4ed8,#3b82f6)' }}>
                Get Free Quote Today →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" ref={cardsRef}>
            {reasons.map((r,i) => (
              <div key={i}
                className={`reveal-scale delay-${Math.min(i,6)} ${cardsInView?'visible':''} card-lift rounded-2xl p-6 cursor-default border-2 group transition-all duration-400`}
                style={{ background:r.bg, borderColor:'transparent' }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=r.accent; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='transparent'; }}>
                <div className="text-3xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 inline-block">{r.icon}</div>
                <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color:r.accent }}>{r.stat}</div>
                <h3 className="font-display text-lg font-semibold mb-2 text-ink">{r.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
