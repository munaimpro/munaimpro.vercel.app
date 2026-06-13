import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Code, ArrowDown, Sparkles, MapPin, ExternalLink } from 'lucide-react';

export default function Hero({ profile, onScrollDown }) {
  if (!profile) return null;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic Ambient Blur Spheres */}
      <div className="absolute top-[20%] left-[10%] w-[25rem] h-[25rem] rounded-full bg-violet-600/10 blur-[130px] -z-10" />
      <div className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] rounded-full bg-cyan-500/10 blur-[150px] -z-10 animate-pulse duration-[6000ms]" />

      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Right column - Avatar Photo & Hologram Display (moved to top for mobile) */}
        <div className="lg:col-span-5 order-first lg:order-last flex justify-center items-center my-8 lg:my-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 select-none cursor-pointer group"
          >
            {/* Spinning decorative glassmorphic gear arcs */}
            <div className="absolute -inset-4 rounded-full border border-dashed border-violet-500/20 group-hover:border-violet-400/40 animate-[spin_50s_linear_infinite]" />
            <div className="absolute -inset-8 rounded-full border border-double border-cyan-400/10 group-hover:border-cyan-400/30 animate-[spin_80s_linear_infinite_reverse]" />

            {/* Glowing refraction rings under photos */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-violet-600 to-cyan-400 blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
            
            {/* Outer high-contrast photo container */}
            <div className="absolute inset-0 rounded-3xl glassmorphism p-3 border border-white/10 shadow-2xl overflow-hidden">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-125 saturate-100 md:grayscale md:saturate-50 md:group-hover:grayscale-0 md:group-hover:saturate-100"
                  referrerPolicy="no-referrer"
                />
                
                {/* Holographic light reflection streak overlay */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent -translate-y-full group-hover:translate-y-[200%] transition-transform duration-1000 ease-in-out" />
              </div>
            </div>

            {/* Small floating info pill at bottom left */}
            <div className="absolute -bottom-3 -left-3 glassmorphism rounded-xl px-4 py-2 border border-white/10 shadow-lg text-left">
              <span className="text-[10px] font-mono text-slate-500">GEO_LOCATION</span>
              <p className="text-xs text-slate-200 flex items-center gap-1 font-medium font-sans">
                <MapPin className="w-3 h-3 text-rose-500" />
                {profile.location}
              </p>
            </div>

            {/* Small floating info pill at top right */}
            <a 
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -top-3 -right-3 glassmorphism text-slate-400 hover:text-cyan-400 rounded-xl p-2 border border-white/10 hover:border-cyan-500/30 shadow-lg cursor-pointer transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Left column details (Text) */}
        <div className="lg:col-span-7 order-last lg:order-first flex flex-col items-start space-y-6 text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20 shadow-sm animate-pulse-slow"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Available for work.</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Establishing standard
              <span className="block mt-1 bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent text-glow">
                {profile.name}
              </span>
            </h1>
            <p className="font-display text-lg text-cyan-400 font-medium tracking-wide">
              {profile.title}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-400 font-sans text-sm sm:text-base leading-relaxed max-w-lg"
          >
            {profile.bio}
          </motion.p>

          {/* Interactive actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-row w-full sm:w-auto gap-3 sm:gap-4 pt-2"
          >
            <button 
              onClick={() => onScrollDown('mongo')}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium text-[10px] sm:text-xs tracking-wider uppercase cursor-pointer shadow-[0_4px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 text-center"
            >
              Download CV
            </button>
            <button
              onClick={() => onScrollDown('projects')}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-full glassmorphism text-slate-200 hover:text-white hover:bg-white/10 font-medium text-[10px] sm:text-xs tracking-wider uppercase cursor-pointer border border-white/10 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-center"
            >
              <span>Browse Works</span>
              <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce shrink-0" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
