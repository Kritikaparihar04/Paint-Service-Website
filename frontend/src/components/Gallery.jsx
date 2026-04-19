import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';

const galleryItems = [
  { src:'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHNIqu1h8ov1Al-XiTptIf8NyvXjViZzbbqSgo98kr8lGwsh0hYF3mQyLabsu2cVLl6btZc4oESChBjqfWpO85SfVVh90VHmpBsFLbnXS8x--Q3L8KSrV0L7Y9rO0LWWKDBSQYqXVn_5Xo=s1360-w1360-h1020-rw', alt:'Modern living room interior', label:'Interior — Living Room', tag:'Interior' },
  { src:'https://lh3.googleusercontent.com/p/AF1QipOMtcIej10r5poAh3ypBr3FhNGg6vKMhyf7UlzY=s1360-w1360-h1020-rw', alt:'Exterior house painting', label:'Exterior — Modern Villa', tag:'Exterior' },
  { src:'https://lh3.googleusercontent.com/p/AF1QipOY7JPOMSv0Ogj4FWfnuR8YjWtDGNNiabY4QYJX=s1360-w1360-h1020-rw', alt:'Elegant bedroom painting', label:'Interior — Bedroom', tag:'Interior' },
  { src:'https://lh3.googleusercontent.com/p/AF1QipNJ1ASdtQTGVIhEWpK_cy2dFszRpqnfzaUv0x-M=s1360-w1360-h1020-rw', alt:'Apartment painting', label:'Apartment — Complete', tag:'Apartment' },
  { src:'https://lh3.googleusercontent.com/p/AF1QipNf_Tv3HKLQnDm4574i6oNQSfF5hDWBFKiWZ5zE=s1360-w1360-h1020-rw', alt:'Wall texture design', label:'Wall Texture Design', tag:'Texture' },
  { src:'https://lh3.googleusercontent.com/p/AF1QipMsWRR-nCFuG0jSzW0DIXNQcQHpJpEHGLESanXK=s1360-w1360-h1020-rw', alt:'Terrace waterproofing', label:'Waterproof — Terrace', tag:'Waterproof' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [ref, inView] = useInView();

  return (
    <section id="gallery" className="py-28" style={{ background:'#f1f5f9' }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-16 text-center reveal ${inView?'visible':''}`}>
          <span className="section-tag">Our Work</span>
          <h2 className="section-title text-ink">Project <span className="gradient-text">Gallery</span></h2>
          <p className="font-body text-muted mt-4 max-w-xl mx-auto">
            See the quality of our work through recent painting projects across Bangalore.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryItems.map((item,i) => (
            <div key={i}
              className={`reveal-scale delay-${Math.min(i,6)} ${inView?'visible':''} img-zoom relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400`}
              style={{ aspectRatio:'4/3' }}
              onClick={() => setLightbox(item)}>
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover"/>

              <div className="absolute inset-0 flex items-end"
                style={{ background:'linear-gradient(to top,rgba(15,23,42,.82) 0%,rgba(15,23,42,.1) 55%,transparent 100%)' }}>
                <div className="p-5 w-full translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
                  <span className="inline-block font-mono text-xs px-3 py-1 rounded-full mb-2"
                    style={{ background:'rgba(37,99,235,.85)', color:'white' }}>
                    {item.tag}
                  </span>
                  <div className="font-display text-white text-lg">{item.label}</div>
                </div>
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all duration-400 scale-0 group-hover:scale-100 shadow-lg">
                <span className="text-blue-600 font-bold text-lg">⤢</span>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ ADDED HERE */}

      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background:'rgba(15,23,42,.96)' }}
          onClick={() => setLightbox(null)}>
          <div className="relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl" onClick={e=>e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} className="w-full max-h-[82vh] object-contain bg-slate-900"/>
            <div className="p-5 flex items-center justify-between bg-slate-900">
              <div>
                <span className="font-mono text-xs px-3 py-1 rounded-full mr-3"
                  style={{ background:'#2563eb', color:'white' }}>
                  {lightbox.tag}
                </span>
                <span className="font-display text-white text-lg">{lightbox.label}</span>
              </div>
              <button onClick={()=>setLightbox(null)}
                className="font-mono text-sm text-slate-400 hover:text-white transition-colors">
                ✕ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}