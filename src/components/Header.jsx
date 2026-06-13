import React, { useState } from 'react';
import { Database, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header({ sections, activeSection, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (id) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-[90%] max-w-5xl z-50 transition-all duration-300">
      {/* Primary Bar Custom Glass Panel */}
      <div className="glassmorphism rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleLinkClick('hero')}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 flex items-center justify-center p-0.5 shadow-inner group-hover:rotate-12 transition-transform duration-300">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <Database className="w-3.5 h-3.5 text-cyan-400 group-hover:text-violet-400 transition-colors duration-300" />
            </div>
          </div>
          <span className="font-display font-bold tracking-tight text-white text-sm">
            Munaim Khan
          </span>
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

        {/* Custom Status badge / Right items on Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            DATABASE_CONNECTED
          </div>
        </div>

        {/* Mobile toggle button (Hidden on desktop) */}
        <div className="flex lg:hidden items-center gap-3">
          <div className="xs:flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-[9px] text-emerald-400 font-mono border border-emerald-500/20 sm:hidden">
            <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping inline-block mr-1" />
            LIVE
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-white/5 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/5 bg-slate-900/30"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Floating Glass Dropdown Menu on mobile devices */}
      {isOpen && (
        <div className="absolute top-[110%] left-0 right-0 glassmorphism rounded-2xl p-4 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-[fadeIn_0.2s_ease-out] flex flex-col gap-2 z-50">
          <div className="text-[10px] font-mono text-slate-500 tracking-wider pb-2 border-b border-white/5 mb-1 px-2 uppercase">
            Cluster Port Node list
          </div>
          
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleLinkClick(sec.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-sans tracking-wide transition-all duration-350 cursor-pointer flex items-center justify-between ${
                activeSection === sec.id
                  ? 'text-cyan-400 bg-white/10 shadow-inner border-l-2 border-cyan-400 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-l border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="opacity-50 font-mono text-[9px]">{sec.number}.</span>
                {sec.label}
              </span>
              <ArrowUpRight className={`w-3.5 h-3.5 opacity-45 group-hover:opacity-100 transition-opacity ${
                activeSection === sec.id ? 'text-cyan-400 opacity-90' : 'text-slate-500'
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
    </header>
  );
}
