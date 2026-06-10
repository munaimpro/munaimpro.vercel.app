import React from 'react';
import { GraduationCap, Award, BookOpen, Star } from 'lucide-react';

export default function Education({ education }) {
  if (!education) return null;

  return (
    <section id="education" className="relative py-20 overflow-hidden">
      {/* Background radial soft light blur */}
      <div className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full bg-cyan-600/5 blur-[120px] -z-10" />

      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header Indicator */}
        <div className="flex items-center gap-4 mb-12">
          <div className="text-left">
            <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase block">04 // ACADEMIC REGISTRY</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
              Academic Nodes <span className="text-violet-400">&</span> Degrees
            </h2>
          </div>
          <div className="h-px bg-gradient-to-l from-cyan-500 to-transparent flex-1" />
        </div>

        {/* Unique dual responsive list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item, idx) => (
            <div
              key={item.id || idx}
              className="glassmorphism rounded-2xl p-6 border border-white/5 relative group hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between text-left shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
            >
              {/* Dynamic light refraction corners */}
              <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
                <Star className="w-3.5 h-3.5 text-cyan-400/30 group-hover:text-cyan-400 group-hover:rotate-45 transition-all duration-500" />
              </div>

              <div className="space-y-4">
                {/* School title with dynamic logo bg */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-violet-600/10 border border-violet-500/20 group-hover:bg-violet-600/20 group-hover:border-violet-500/35 transition-all duration-300">
                    <GraduationCap className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">
                      {item.year}
                    </span>
                    <h3 className="font-display font-bold text-white text-base md:text-lg leading-tight mt-0.5 group-hover:text-cyan-300 transition-colors">
                      {item.institution}
                    </h3>
                  </div>
                </div>

                {/* Coursework specifications */}
                <div className="space-y-2 pl-1">
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <p className="font-sans text-sm text-slate-200 font-medium">
                      {item.degree}
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <p className="font-sans text-xs text-slate-400 leading-relaxed">
                      Specialization: <span className="text-indigo-300 font-mono text-[11px] font-normal">{item.specialization}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic node label indicator bottom */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>DEGREE_CONFIRMED: OK</span>
                <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                  NODE_{idx+1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
