import React, { useState, useEffect } from 'react';

const navLinks = ['Home','Services','Gallery','Why Us','Reviews','Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = navLinks.map(l => l.toLowerCase().replace(' ','-'));
      for (let i = sections.length-1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(navLinks[i]); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = id => {
    document.getElementById(id.toLowerCase().replace(' ','-'))?.scrollIntoView({ behavior:'smooth' });
    setMenuOpen(false); setActive(id);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-blue/5' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('home')}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
            style={{ background:'linear-gradient(135deg,#1d4ed8,#3b82f6)' }}>
            <span className="font-mono font-bold text-white text-sm">WPS</span>
          </div>
          <div>
            <span className={`font-display font-semibold text-lg leading-none block transition-colors duration-300 ${scrolled?'text-ink':'text-white'}`}>
Whitefield Paint Service            </span>
            <span className="font-mono text-xs" style={{ color:'#3b82f6' }}>Bangalore</span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              className={`font-body text-sm font-medium tracking-wide transition-all duration-200 relative line-draw pb-0.5
                ${active===link ? '' : scrolled ? 'text-slate hover:text-ink' : 'text-white/70 hover:text-white'}`}
              style={active===link ? { color:'#2563eb' } : {}}>
              {link}
            </button>
          ))}
          <a href="tel:+91-9513184860">
            <button className="btn-shine ml-2 font-body text-sm font-semibold px-6 py-2.5 rounded-full text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              style={{ background:'linear-gradient(135deg,#1d4ed8,#3b82f6)' }}>
              📞 Call Now
            </button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {[0,1,2].map(i => (
            <span key={i} className={`block w-6 h-0.5 transition-all duration-300 ${scrolled?'':'bg-white'}`}
              style={{ background:scrolled?'#2563eb':'white',
                transform: i===0&&menuOpen?'rotate(45deg) translate(5px,5px)' : i===2&&menuOpen?'rotate(-45deg) translate(5px,-5px)':'none',
                opacity: i===1&&menuOpen?0:1 }}/>
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 bg-white border-t border-slate-100 ${menuOpen?'max-h-96 opacity-100':'max-h-0 opacity-0'}`}>
        <div className="px-6 py-5 flex flex-col gap-3">
          {navLinks.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              className={`font-body text-base text-left py-2.5 border-b border-slate-100 transition-colors ${active===link?'font-semibold':'text-slate hover:text-ink'}`}
              style={active===link ? { color:'#2563eb' } : {}}>
              {link}
            </button>
          ))}
          <a href="tel:+91-9513184860" className="mt-2">
            <button className="w-full rounded-full py-3 text-white font-body font-semibold hover:opacity-90 transition-opacity"
              style={{ background:'linear-gradient(135deg,#1d4ed8,#3b82f6)' }}>
              📞 Call Now
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}
