import React from 'react';

export default function Footer() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

  return (
    <footer style={{ background:'#0f172a' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12 text-white">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4 cursor-pointer group" onClick={()=>scrollTo('home')}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg"
                style={{ background:'linear-gradient(135deg,#1d4ed8,#3b82f6)' }}>
                <span className="font-mono font-bold text-white text-sm">WPS</span>
              </div>
              <span className="font-display font-semibold text-white text-lg">Whitefield Paints Services</span>
            </div>
            <p className="font-body text-sm leading-relaxed">
              Professional house painting services in Bangalore. Trusted by 500+ homeowners.
            </p>
            <div className="flex gap-3 mt-5">
              {[['📞','tel:+91-9513184860','#3b82f6'],['💬',`https://wa.me/919513184860?text=${encodeURIComponent('Hi! I would like a free painting quote.')}`,'#22c55e']].map(([icon,href,color],i)=>(
                <a key={i} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ background:`${color}18`, border:`1px solid ${color}35` }}>
                  <span>{icon}</span>
                </a>
              ))}
            </div>
          </div>
          {[
            ['Services',['Interior Painting','Exterior Painting','Apartment Painting','Wall Texture Design','Waterproof Painting'],'services'],
            ['Service Areas',['ITPL','Brookfield','Varthur','Hoodi','Kadugodi'],'service-areas'],
          ].map(([title,items,id])=>(
            <div key={title}>
              <h4 className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color:'#3b82f6' }}>{title}</h4>
              <ul className="space-y-3">
                {items.map(item=>(
                  <li key={item}>
                    <button onClick={()=>scrollTo(id)} className="font-body text-sm  hover:text-white transition-colors line-draw text-left">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color:'#3b82f6' }}>Contact</h4>
            <ul className="space-y-3">
              <li><a href="tel:+91-9513184860" className="font-body text-sm  hover:text-white transition-colors">📞 +91 95131 84860</a></li>
              <li><a href={`https://wa.me/919513184860?text=${encodeURIComponent('Hi! I would like a free painting quote.')}`} target="_blank" rel="noreferrer"
                className="font-body text-sm  hover:text-white transition-colors">💬 WhatsApp</a></li>
              <li><span className="font-body text-sm ">📍 Kadugodi, Bangalore</span></li>
              <li><span className="font-body text-sm ">🕐 Mon–Sun: 8AM–7PM</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop:'1px solid rgba(255,255,255,.06)' }}>
          <p className="font-mono text-xs text-slate-600">© 2026 WPS House Painters. All rights reserved.</p>
          <div className="flex gap-6">
            {['Home','Services','Gallery','Contact'].map(l=>(
              <button key={l} onClick={()=>scrollTo(l.toLowerCase())}
                className="font-mono text-xs tracking-wide uppercase text-slate-600 hover:text-white transition-colors line-draw">{l}</button>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp FAB */}
      <a href={`https://wa.me/919513184860?text=${encodeURIComponent('Hi! I found you online and would like a free painting quote.')}`}
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 pulse-ring"
        style={{ background:'linear-gradient(135deg,#16a34a,#22c55e)' }}>
        <span className="text-2xl relative z-10">💬</span>
      </a>
    </footer>
  );
}
