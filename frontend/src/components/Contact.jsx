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
    <section >
      {/* Subtle animated blobs */}
      
    </section>
  );
}
