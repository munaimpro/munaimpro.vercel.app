import React, { useState } from 'react';
import { Database, Menu, X, ArrowUpRight, Compass, Sparkles } from 'lucide-react';

export default function Header({ sections, activeSection, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false); // Mobile responsive hamburger menu
  const [isCompassOpen, setIsCompassOpen] = useState(false); // Compass dropdown (Universal for all screens)

  const handleLinkClick = (id) => {
    setIsOpen(false);
    setIsCompassOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-[90%] max-w-5xl z-50 transition-all duration-300">
      {/* Primary Bar Custom Glass Panel */}
      <div className="glassmorphism rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative">
        
        {/* Brand Logo with Toggle Icon */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 cursor-pointer group" onClick={() => handleLinkClick('hero')}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 flex items-center justify-center p-0.5 shadow-inner group-hover:rotate-12 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <Database className="w-3.5 h-3.5 text-cyan-400 group-hover:text-violet-400 transition-colors duration-300" />
              </div>
            </div>
            <span className="font-display font-bold tracking-tight text-white text-xs sm:text-sm">
              Munaim Khan
            </span>
          </div>

          {/* Compass Icon Trigger Button */}
          <button
            onClick={() => {
              setIsCompassOpen(!isCompassOpen);
              setIsOpen(false);
            }}
            className={`p-1.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer group focus:outline-none ${
              isCompassOpen 
                ? 'bg-cyan-500/20 text-cyan-300 scale-105 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title="Open 'More About Me' menu"
            id="more-about-me-toggle-btn"
          >
            <Compass className={`w-4 h-4 transition-transform duration-500 ${isCompassOpen ? 'rotate-[360deg] text-cyan-400' : 'group-hover:rotate-45 text-slate-400 group-hover:text-slate-200'}`} />
          </button>
        </div>

        {/* Desktop Navigation items */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleLinkClick(sec.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-300 cursor-pointer ${
                activeSection === sec.id
                  ? 'text-cyan-400 bg-white/10 shadow-[inner_0_1px_1px_rgba(255,255,255,0.1)] font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="opacity-60 mr-1 text-[10px] font-mono">{sec.number}</span>
              {sec.label}
            </button>
          ))}
        </nav>

        {/* Right side controls (combining DB state status & toggle navigation button to keep an elegant tight gap on tablet/mobile screens) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Custom Status badge - visible on sm and up (desktops and tablets) */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            DATABASE_CONNECTED
          </div>

          {/* Mobile toggle button (Hidden on desktop) */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="xs:flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-[9px] text-emerald-400 font-mono border border-emerald-500/20 sm:hidden">
              <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping inline-block mr-1" />
              LIVE
            </div>
            
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setIsCompassOpen(false);
              }}
              className="p-2 rounded-full hover:bg-white/5 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/5 bg-slate-900/30"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Glass Dropdown Menu on mobile devices for section listing */}
      {isOpen && (
        <div className="absolute top-[110%] left-0 right-0 glassmorphism rounded-2xl p-4 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-[fadeIn_0.2s_ease-out] flex flex-col gap-2 z-50">
          <div className="text-[10px] font-mono text-slate-500 tracking-wider pb-2 border-b border-white/5 mb-1 px-2 uppercase">
            Cluster Port Node list
          </div>
          
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleLinkClick(sec.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-sans tracking-wide transition-all duration-350 cursor-pointer flex items-center justify-between group ${
                activeSection === sec.id
                  ? 'text-cyan-400 bg-white/10 shadow-inner border-l-2 border-cyan-400 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-l border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="opacity-50 font-mono text-[9px]">{sec.number}.</span>
                {sec.label}
              </span>
              <ArrowUpRight className={`w-3.5 h-3.5 opacity-45 group-hover:opacity-100 transition-all duration-300 ${
                activeSection === sec.id ? 'text-cyan-400 opacity-90' : 'text-slate-500 group-hover:text-cyan-400'
              }`} />
            </button>
          ))}

          <div className="mt-2 pt-3 border-t border-white/5 flex items-center justify-between px-2">
            <span className="text-[9px] font-mono text-slate-500">PORTFOLIO_SYNC</span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-mono border border-emerald-500/15">
              <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
              CONNECTED
            </div>
          </div>
        </div>
      )}

      {/* Dropdown Menu for Compass Search (Visible on ALL devices: Desktop, Tablet, Mobile) */}
      {isCompassOpen && (
        <div className="absolute top-[110%] left-0 right-0 glassmorphism rounded-2xl p-4 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-[fadeIn_0.2s_ease-out] flex flex-col gap-2 z-50">
          <div className="text-[10px] font-mono text-cyan-400 tracking-wider pb-2 border-b border-white/5 mb-1 px-2 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 animate-pulse text-cyan-400" />
            More Options
          </div>
          
          <button
            onClick={() => {}} // clicking this menu, nothing happened for now.
            className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-sans tracking-wide transition-all duration-350 cursor-pointer flex items-center justify-between text-slate-300 hover:text-white hover:bg-white/5 border-l border-transparent group"
          >
            <span className="flex items-center gap-2">
              <span className="opacity-50 font-mono text-[9px]">06.</span>
              More About Me
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-45 group-hover:opacity-100 transition-opacity text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </button>
        </div>
      )}
    </header>
  );
}
