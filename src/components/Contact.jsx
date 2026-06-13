import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Mail, MapPin, Terminal, AlertCircle, Sparkles, MessageSquare, Clock, Github, Linkedin, ExternalLink } from 'lucide-react';

export default function Contact({ profile, messages, onMessageSent }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', text: 'Please fill out all required fields' });
      return;
    }

    setIsSending(true);
    setStatus({ type: '', text: '' });

    // Retrieve EmailJS configuration from public environment variables or database.json fallbacks
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || profile?.emailjs_service_id || profile?.emailjs?.service_id || profile?.emailjs_serviceId;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || profile?.emailjs_template_id || profile?.emailjs?.template_id || profile?.emailjs_templateId;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || profile?.emailjs_public_key || profile?.emailjs?.public_key || profile?.emailjs_publicKey;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: 'error',
        text: 'EmailJS not configured. Provide environment variables (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY) or define "emailjs" inside database.json.'
      });
      setIsSending(false);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      subject: formData.subject || 'No Subject',
      message: formData.message,
      to_email: profile?.email || 'khanmail2599@gmail.com',
      to_name: profile?.name || 'Munaim Khan'
    };

    try {
      // Send directly via EmailJS browser SDK
      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey: publicKey
      });

      setStatus({ type: 'success', text: 'TRANSMITTED: Message sent directly to your email!' });
      setFormData({ name: '', email: '', subject: '', message: '' });

      // If running locally, optionally log to server message list for historical charts/sandboxes
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (onMessageSent) {
          onMessageSent();
        }
      } catch (backupErr) {
        // Safe to ignore if Vercel serverless / purely static client-side
        console.log('Local record syncer: Not running local express server, email sent successfully.');
        
        // Also write to local cache storage to show instantly on the client message log list
        try {
          const newMsg = {
            id: `msg-${Date.now()}`,
            name: formData.name,
            email: formData.email,
            subject: formData.subject || 'No Subject',
            message: formData.message,
            timestamp: new Date().toISOString()
          };
          let cached = localStorage.getItem('portfolio_data');
          let fullPortfolio = null;
          if (cached) {
            fullPortfolio = JSON.parse(cached);
          }
          if (fullPortfolio) {
            if (!fullPortfolio.messages) fullPortfolio.messages = [];
            fullPortfolio.messages.unshift(newMsg);
            localStorage.setItem('portfolio_data', JSON.stringify(fullPortfolio));
          }
          if (onMessageSent) {
            onMessageSent();
          }
        } catch (cacheErr) {
          console.warn('Cache logging bypassed:', cacheErr);
        }
      }
    } catch (err) {
      console.error('EmailJS send failure details:', err);
      setStatus({ 
        type: 'error', 
        text: `Transmission failed: ${err.text || err.message || JSON.stringify(err)}`
      });
    } finally {
      setIsSending(false);
      setTimeout(() => {
        setStatus({ type: '', text: '' });
      }, 7000);
    }
  };

  return (
    <section id="contact" className="relative py-20 pb-28 overflow-hidden">
      {/* Background ambient soft glow */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-violet-950/20 to-transparent -z-10" />

      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header Indicator */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-gradient-to-r from-violet-600 to-transparent flex-1" />
          <div className="text-right">
            <span className="font-mono text-xs text-violet-400 tracking-widest uppercase block">05 // LIVE MESSAGE CHANNEL</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
              Message Port <span className="text-cyan-400">&</span> Message Bus
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Input Form Left */}
          <div className="lg:col-span-7 glassmorphism rounded-2xl p-6 md:p-8 border border-white/5 shadow-2xl">
            <div className="text-left mb-6">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Write record payload</span>
              <h3 className="font-display text-white text-lg font-bold mt-1">Submit Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5 pl-1">Sender Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/90 border border-white/5 hover:border-white/10 focus:border-violet-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors font-sans"
                    placeholder="e.g. Marie Curie"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5 pl-1">Sender Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/90 border border-white/5 hover:border-white/10 focus:border-violet-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors font-sans"
                    placeholder="e.g. marie@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5 pl-1">Subject Header</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-slate-900/90 border border-white/5 hover:border-white/10 focus:border-violet-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors font-sans"
                  placeholder="e.g. Enterprise Engineering Consultation"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1.5 pl-1">Message Body *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-slate-900/90 border border-white/5 hover:border-white/10 focus:border-violet-500/50 rounded-xl px-4 py-3 text-xs text-white focus:outline-none resize-none transition-colors font-sans"
                  placeholder="Your detailed inquiry parameters goes here..."
                />
              </div>

              {/* Glowing notification status */}
              {status.text && (
                <div className={`px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2 border ${
                  status.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/15'
                  }`}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{status.text}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 font-mono font-bold text-xs tracking-wider uppercase text-white shadow-[0_4px_15px_rgba(124,58,237,0.2)] hover:shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSending ? 'COMPILING_MSG...' : 'TRANSMIT_MSG'}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Details Panel Right */}
          <div className="lg:col-span-5 flex flex-col justify-between glassmorphism rounded-2xl p-6 border border-white/5 bg-slate-950/75 shadow-2xl relative text-left">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Direct access node</span>
                <h3 className="font-display text-white text-lg font-bold mt-1">Contact Information</h3>
              </div>

              {/* Avatar and Info */}
              {profile && (
                <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-4 animate-fade-in">
                  <div className="relative">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-violet-500/30"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-sans">{profile.name}</h4>
                    <p className="text-[11px] font-mono text-slate-400">{profile.title}</p>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 mt-1 bg-white/5 border border-white/10 rounded text-cyan-400 inline-block uppercase">
                      ONLINE // SECURE_LINE
                    </span>
                  </div>
                </div>
              )}

              {/* Contact Channels */}
              <div className="space-y-3">
                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/30 hover:bg-white/10 transition-all font-mono text-xs text-slate-300 hover:text-white cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-violet-600/10 flex items-center justify-center border border-white/5 group-hover:border-violet-500/20">
                      <Mail className="w-4 h-4 text-violet-400" />
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">Secure Email</span>
                      <span>{profile.email}</span>
                    </div>
                  </a>
                )}

                {profile?.location && (
                  <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/5 font-mono text-xs text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-cyan-600/10 flex items-center justify-center border border-white/5">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">Homing Vector</span>
                      <span>{profile.location}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {profile?.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/30 hover:bg-white/10 transition-all font-mono text-xs text-slate-300 hover:text-white cursor-pointer group"
                    >
                      <Github className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:scale-110 transition-all" />
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3 text-slate-600 ml-auto" />
                    </a>
                  )}

                  {profile?.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/30 hover:bg-white/10 transition-all font-mono text-xs text-slate-300 hover:text-white cursor-pointer group"
                    >
                      <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:scale-110 transition-all" />
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3 h-3 text-slate-600 ml-auto" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Quick action detail footer info */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
              <span>Response latency: &lt; 24h // Encryption handshake enabled</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
