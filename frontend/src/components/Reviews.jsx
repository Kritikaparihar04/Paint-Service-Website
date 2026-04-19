import React from 'react';
import { useInView } from '../hooks/useInView';

const reviews = [
  { name:'Kritika Parihar', location:'Kadugodi, Bangalore', rating:5, review:'They did a fantastic job painting our home! They were punctual, professional, and very detail-oriented. The prep work was thorough, and they left the place spotless every day. Highly recommend!', initial:'R', color:'#2563eb' },
  { name:'Nagaraja C', location:'ITPL, Bangalore', rating:5, review:'Good experience with baharul islam and his team at Whitefield painting services, They were very professional, used high -quality materials, and completed the job on time. Baharul is very polite and ensures the costomer is happy with every detail, Highly recommended for any painting needs!"', initial:'P', color:'#0369a1' },
  { name:'Apoorva Malgatti', location:'Hoskote, Bangalore', rating:5, review:'Baharul and his team did an excellent job. Very professional, punctual, and neat with the work. The finishing was clean and exactly as expected.', initial:'M', color:'#475569' },
  { name:'Sunita Reddy', location:'Varthur, Bangalore', rating:5, review:'Beautiful service.They are very professional and do the painting work really great. Completely recommend others to use their service , you will be superr satisfied.', initial:'S', color:'#1d4ed8' },
];

export default function Reviews() {
  const [ref, inView] = useInView();

  return (
    <section id="reviews" className="py-28" style={{ background:'#f1f5f9' }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className={`mb-16 text-center reveal ${inView?'visible':''}`}>
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title text-ink">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="font-body text-muted mt-4 max-w-xl mx-auto">
            Real reviews from homeowners across Bangalore who trusted us with their homes.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((r,i) => (
            <div key={i}
              className={`reveal delay-${Math.min(i,6)} ${inView?'visible':''} card-lift bg-white rounded-2xl p-8 group cursor-default border-l-4 shadow-sm`}
              style={{ borderLeftColor:r.color }}>
              
              <div className="flex gap-1 mb-5">
                {[...Array(r.rating)].map((_,j) => (
                  <span key={j} className="text-lg" style={{ color:'#f59e0b' }}>★</span>
                ))}
              </div>

              <p className="font-body leading-relaxed mb-6 italic" style={{ color:'#334155', fontSize:'1.02rem' }}>
                "{r.review}"
              </p>

              <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow group-hover:scale-110 transition-transform duration-300"
                  style={{ background:`linear-gradient(135deg,${r.color},${r.color}99)` }}>
                  <span className="font-display font-bold text-white text-lg">{r.initial}</span>
                </div>
                <div>
                  <div className="font-display font-semibold text-ink">{r.name}</div>
                  <div className="font-mono text-xs text-muted tracking-wide">{r.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ RATING + CTA */}
        <div className={`text-center mt-14 reveal ${inView?'visible':''}`}>
          
          {/* Rating */}
          <div className="mb-4 text-lg font-semibold text-slate-700 flex items-center justify-center gap-2">
            ⭐ <span>4.9 / 5</span>
            <span className="text-sm ">(450+ reviews)</span>
          </div>

          {/* Button */}
          <a 
            href="https://www.google.com/search?q=Whitefield+paint+service+Reviews&oq=w&gs_lcrp=EgZjaHJvbWUqCAgBEEUYJxg7MgYIABBFGDwyCAgBEEUYJxg7MggIAhBFGCcYOzIGCAMQRRg5MgYIBBBFGDsyEwgFEC4YgwEYxwEYsQMY0QMYgAQyBggGEEUYPTIGCAcQRRg80gEIMjQxMWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x3bae0dec3012030b:0xc5fe6d99b6698f6c,1,,,,"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3 bg-white border border-slate-200 text-slate-800 font-semibold rounded-full shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >

            {/* Google SVG */}
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.4 0 6.3 1.2 8.6 3.2l6.4-6.4C34.8 2.4 29.8 0 24 0 14.6 0 6.4 5.4 2.5 13.3l7.7 6c1.9-5.6 7.1-9.8 13.8-9.8z"/>
              <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.7-.4-4H24v7.6h12.5c-.3 2.1-2 5.2-5.7 7.3l8.7 6.7c5.1-4.7 8.1-11.6 8.1-19.6z"/>
              <path fill="#FBBC05" d="M10.2 28.3c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.7-6C.9 16.6 0 20.2 0 24s.9 7.4 2.5 10.9l7.7-6.6z"/>
              <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.8l-8.7-6.7c-2.4 1.7-5.5 2.9-7.3 2.9-6.7 0-11.9-4.2-13.8-9.8l-7.7 6C6.4 42.6 14.6 48 24 48z"/>
            </svg>

            View More Reviews on Google
          </a>
        </div>

        {/* Brand marquee */}
        <div className={`mt-16 overflow-hidden pt-10 border-t border-slate-200 reveal ${inView?'visible':''}`}>
          <p className="text-center font-mono text-xs tracking-widest uppercase mb-6 text-muted">
            Trusted Paint Brands We Use
          </p>
          <div className="marquee-track select-none">
            {[...Array(2)].map((_,k) => (
              <div key={k} className="flex gap-16 mr-16 items-center">
                {['🎨 Asian Paints','✨ Berger Paints','🏆 Dulux','⭐ Nerolac','💎 JSW Paints','🌟 Kansai'].map((brand,j) => (
                  <span key={j}
                    className="font-display text-xl font-semibold whitespace-nowrap cursor-default text-slate-400 hover:text-blue-600 transition-colors">
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}