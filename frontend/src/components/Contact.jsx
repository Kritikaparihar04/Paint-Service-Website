import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';

const serviceOptions = ['Interior Painting','Exterior Painting','Apartment Painting','Wall Texture Design','Waterproof Painting'];

export default function Contact() {
  const [form, setForm] = useState({ name:'', phone:'', service:'', message:'' });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');
  const [ref, inView] = useInView();

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.phone) { setError('Please fill in your name and phone number.'); return; }
    setError(''); setStatus('loading');
    try {
      const res = await fetch('http://localhost:5000/api/quote', {
        method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) { setStatus('success'); setForm({ name:'', phone:'', service:'', message:'' }); }
      else { setStatus('error'); setError(data.error||'Something went wrong.'); }
    } catch { setStatus('error'); setError('Could not connect. Please call us directly.'); }
  };

  const waMsg = encodeURIComponent(`Hi, I'm ${form.name||'a customer'}. Interested in ${form.service||'painting services'}. Phone: ${form.phone||'N/A'}. ${form.message?'Details: '+form.message:''}`);

  return (
    <section id="contact" className="py-28 relative overflow-hidden" ref={ref}
      style={{ background:'linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0c1a3a 100%)' }}>
      {/* Subtle animated blobs */}
      <div className="absolute w-96 h-96 rounded-full opacity-10 -top-20 -left-20 blob-shape"
        style={{ background:'linear-gradient(135deg,#2563eb,#60a5fa)', animation:'blob 10s ease-in-out infinite' }}/>
      <div className="absolute w-72 h-72 rounded-full opacity-10 -bottom-10 -right-20 blob-shape"
        style={{ background:'linear-gradient(135deg,#1d4ed8,#3b82f6)', animation:'blob 13s ease-in-out infinite reverse' }}/>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div className={`reveal-left ${inView?'visible':''}`}>
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title text-white mb-6">Request a <span className="gradient-text">Free Quote</span></h2>
            <p className="font-body leading-relaxed mb-10 text-white">
              Fill out the form and our team will get back to you within 24 hours with a transparent estimate.
            </p>
            <div className="space-y-5">
              {[
                { icon:'📞', label:'Phone',    value:'+91 91104 23744',  href:'tel:+91-9110423744',   color:'#3b82f6' },
                { icon:'💬', label:'WhatsApp', value:'Chat with us now', href:`https://wa.me/919110423744?text=${encodeURIComponent('Hi! I found you online and would like a free painting quote.')}`, color:'#22c55e' },
                { icon:'📍', label:'Location', value:'Kadugodi, Bangalore', color:'#60a5fa' },
                { icon:'🕐', label:'Hours',    value:'Mon – Sun: 8AM – 7PM', color:'#94a3b8' },
              ].map((item,i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background:`${item.color}18`, border:`1px solid ${item.color}30` }}>
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <div>
                    <div className="font-mono text-xs tracking-widest uppercase text-slate-500 mb-0.5">{item.label}</div>
                    {item.href
                      ? <a href={item.href} target={item.href.startsWith('http')?'_blank':undefined} rel="noreferrer"
                          className="font-body text-white hover:text-blue-300 transition-colors line-draw">{item.value}</a>
                      : <span className="font-body text-white">{item.value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex gap-4 flex-col sm:flex-row">
              <a href="tel:+91-9110423744" className="flex-1">
                <button className="btn-shine w-full rounded-full py-3.5 font-body font-semibold text-white hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
                  style={{ background:'linear-gradient(135deg,#2563eb,#3b82f6)' }}>📞 Call Now</button>
              </a>
              <a href={`https://wa.me/919110423744?text=${waMsg}`} target="_blank" rel="noreferrer" className="flex-1">
                <button className="btn-shine w-full rounded-full py-3.5 font-body font-semibold text-white hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
                  style={{ background:'linear-gradient(135deg,#16a34a,#22c55e)' }}>💬 WhatsApp</button>
              </a>
            </div>
          </div>

          {/* Right — Glass form */}
          <div className={`rounded-3xl p-8 md:p-10 reveal-right ${inView?'visible':''}`}
            style={{ background:'rgba(255,255,255,.06)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,.1)' }}>
            {status==='success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-14">
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="font-display text-2xl text-white mb-3">Quote Sent!</h3>
                <p className="font-body text-slate-400 text-sm mb-8">We'll contact you within 24 hours.</p>
                <a href={`https://wa.me/919110423744?text=${encodeURIComponent('Hi! I just submitted a quote request on your website. Looking forward to hearing from you!')}`}
                  target="_blank" rel="noreferrer"
                  className="btn-shine rounded-full px-6 py-3 font-body font-semibold text-white mb-3"
                  style={{ background:'linear-gradient(135deg,#16a34a,#22c55e)' }}>
                  💬 Also message us on WhatsApp
                </a>
                <button onClick={()=>setStatus(null)} className="font-mono text-xs text-slate-500 hover:text-slate-300 transition-colors mt-2">
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[['name','Name *','Your full name','text'],['phone','Phone *','Your phone number','tel']].map(([nm,lb,ph,tp])=>(
                    <div key={nm}>
                      <label className="font-mono text-xs tracking-widest uppercase block mb-2 text-slate-400">{lb}</label>
                      <input type={tp} name={nm} value={form[nm]} onChange={handleChange} placeholder={ph}
                        className="w-full font-body text-sm px-4 py-3.5 rounded-xl text-white placeholder-slate-600 focus:outline-none transition-all duration-300"
                        style={{ background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.12)' }}
                        onFocus={e=>{ e.target.style.borderColor='#3b82f6'; e.target.style.boxShadow='0 0 0 3px rgba(59,130,246,.15)'; }}
                        onBlur={e=>{ e.target.style.borderColor='rgba(255,255,255,.12)'; e.target.style.boxShadow='none'; }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest uppercase block mb-2 text-slate-400">Service</label>
                  <select name="service" value={form.service} onChange={handleChange}
                    className="w-full font-body text-sm px-4 py-3.5 rounded-xl text-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                    style={{ background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.12)' }}>
                    <option value="" style={{ background:'#1e293b' }}>Select a service</option>
                    {serviceOptions.map(s=><option key={s} value={s} style={{ background:'#1e293b' }}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest uppercase block mb-2 text-slate-400">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                    placeholder="Area size, rooms, preferred timeline..."
                    className="w-full font-body text-sm px-4 py-3.5 rounded-xl text-white placeholder-slate-600 focus:outline-none transition-all duration-300 resize-none"
                    style={{ background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.12)' }}
                    onFocus={e=>{ e.target.style.borderColor='#3b82f6'; }}
                    onBlur={e=>{ e.target.style.borderColor='rgba(255,255,255,.12)'; }}
                  />
                </div>
                {error && <p className="font-mono text-xs text-red-400">{error}</p>}
                <button type="submit" disabled={status==='loading'}
                  className="btn-shine w-full rounded-full py-4 font-body font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl"
                  style={{ background:'linear-gradient(135deg,#1d4ed8,#3b82f6)' }}>
                  {status==='loading'?<><span className="animate-spin inline-block">⟳</span>Sending...</>:'🎨 Get My Free Quote'}
                </button>
                <a href={`https://wa.me/919110423744?text=${waMsg}`} target="_blank" rel="noreferrer">
                  <button type="button"
                    className="btn-shine w-full rounded-full py-3.5 font-body font-semibold text-white mt-2 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                    style={{ background:'linear-gradient(135deg,#16a34a,#22c55e)' }}>
                    💬 Or send via WhatsApp
                  </button>
                </a>
                <p className="font-mono text-xs text-center text-slate-600">We respond within 24 hours</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
