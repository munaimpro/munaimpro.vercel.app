import React, { useState } from 'react';
import { Briefcase, Calendar, ChevronRight, Activity, ArrowUpRight } from 'lucide-react';

export default function Experience({ experience }) {
  if (!experience) return null;
  const [activeItem, setActiveItem] = useState(0);

  const getCompanyUrl = () => {
    const companyName = (experience[activeItem]?.company || '').toLowerCase();
    if (companyName.includes('artsoft') || companyName.includes('art-soft')) {
      return 'https://artsoftitbd.com';
    }
    if (companyName.includes('kostokomai')) {
      return 'https://kostokomai.com';
    }
    return null;
  };

  return (
    <section id="experience" className="relative py-20 overflow-hidden">
      {/* Visual lighting background overlay */}
      <div className="absolute top-[30%] left-[10%] w-[32rem] h-[32rem] rounded-full bg-violet-600/5 blur-[150px] -z-10" />

      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header Indicator */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-gradient-to-r from-violet-600 to-transparent flex-1" />
          <div className="text-right">
            <span className="font-mono text-xs text-violet-400 tracking-widest uppercase block">03 // CHRONOLOGICAL LOGS</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
              System Chronology <span className="text-cyan-400">&</span> History
            </h2>
          </div>
        </div>

        {/* Dual layout: Sidebar indicators left, narrative panel right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Timeline selector layout */}
          <div className="lg:col-span-4 flex flex-col space-y-2 text-left">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide block mb-3 pl-2">SELECT_COMPANY_NODE</span>
            
            <div className="space-y-2 border-l border-white/5 pl-2 lg:pl-4">
              {experience.map((item, idx) => (
                <button
                  key={item.id || idx}
                  onClick={() => setActiveItem(idx)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-display text-sm tracking-wide transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    activeItem === idx
                      ? 'bg-white/10 text-cyan-400 font-bold border-l-2 border-cyan-400 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border-l border-transparent'
                  }`}
                >
                  <div>
                    <span className="block text-[10px] font-mono opacity-60 font-normal">{item.period}</span>
                    <span>{item.company}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                    activeItem === idx ? 'translate-x-1 opacity-100 text-cyan-400' : 'opacity-0'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Content Panel (Glass box dashboard detail) */}
          <div className="lg:col-span-8">
            <div className="glassmorphism rounded-2xl p-6 md:p-8 border border-white/5 relative h-full flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
              {/* Small glowing aesthetic dot */}
              <span className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              
              <div className="space-y-4 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="font-display font-bold text-white text-xl">
                      {experience[activeItem].role}
                    </h3>
                    <p className="text-cyan-400 font-display font-medium text-sm mt-0.5">
                      {experience[activeItem].company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-slate-300 text-xs font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{experience[activeItem].period}</span>
                  </div>
                </div>

                <div className="space-y-4 py-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Operational Logs</span>
                  <p className="text-slate-300 font-sans text-sm md:text-base leading-relaxed">
                    {experience[activeItem].description}
                  </p>
                </div>
              </div>

              {/* Decorative terminal visual at footer */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-violet-400 animate-spin" />
                  ID_NODE: exp-{activeItem + 1}
                </span>
                {getCompanyUrl() ? (
                  <a
                    href={getCompanyUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white flex items-center gap-1 transition-all duration-300 group cursor-pointer"
                    title={`Visit ${experience[activeItem].company} Website`}
                  >
                    SYSTEM_INTEGRID{' '}
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                ) : (
                  <span className="text-slate-400 flex items-center gap-0.5">
                    SYSTEM_INTEGRID <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
