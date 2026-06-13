import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Hammer, Cpu, Layers, Layout, Database as DbIcon, Sparkles, Code, CheckCircle, Server, Activity } from 'lucide-react';

export default function About({ about, projects }) {
  if (!about) return null;
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Design'];

  const filteredSkills = activeTab === 'All'
    ? about.skills
    : about.skills.filter(s => s.category.toLowerCase() === activeTab.toLowerCase());

  // Technical design detail and icon mappings for each skill card
  const getTechCardSpecs = (name) => {
    const norm = name.toLowerCase();
    
    if (norm.includes('php') || norm.includes('laravel')) {
      return {
        icon: <Server className="w-5 h-5 text-indigo-500" />,
        subtext: "SERVER // PHP LARAVEL ENGINE",
        tag: "BACKEND FRAMEWORK",
        glowColor: "group-hover:border-indigo-500/40 shadow-indigo-500/5",
        badgeBg: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
      };
    }
    if (norm.includes('mysql')) {
      return {
        icon: <DbIcon className="w-5 h-5 text-orange-400" />,
        subtext: "RDBMS_CORE // STRUCTURED QUERY",
        tag: "DATABASE",
        glowColor: "group-hover:border-orange-400/40 shadow-orange-500/5",
        badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/20"
      };
    }
    if (norm.includes('bootstrap')) {
      return {
        icon: <Layout className="w-5 h-5 text-purple-400" />,
        subtext: "FRONTEND // BOOTSTRAP GRID",
        tag: "UI FRAMEWORK",
        glowColor: "group-hover:border-purple-400/40 shadow-purple-500/5",
        badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20"
      };
    }
    if (norm.includes('daisyui') || norm.includes('heroui')) {
      return {
        icon: <Layers className="w-5 h-5 text-pink-400" />,
        subtext: "DESIGN // UI COMPONENT LAYER",
        tag: "COMPONENT LIB",
        glowColor: "group-hover:border-pink-400/40 shadow-pink-500/5",
        badgeBg: "bg-pink-500/10 text-pink-400 border-pink-500/20"
      };
    }
    if (norm.includes('react') || norm.includes('next') || norm.includes('vite')) {
      return {
        icon: <Code className="w-5 h-5 text-cyan-400" />,
        subtext: "STABLE // REACT NEXT VITE SYSTEM",
        tag: "UI FRAMEWORKS",
        glowColor: "group-hover:border-cyan-400/40 shadow-cyan-500/5",
        badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
      };
    }
    if (norm.includes('tailwind') || norm.includes('css') || norm.includes('canvas')) {
      return {
        icon: <Layers className="w-5 h-5 text-indigo-400" />,
        subtext: "REFRACTION // GLASSMORPHIC COMPILE",
        tag: "AESTHETICS FRAME",
        glowColor: "group-hover:border-indigo-400/40 shadow-indigo-500/5",
        badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
      };
    }
    if (norm.includes('express') || norm.includes('node')) {
      return {
        icon: <Server className="w-5 h-5 text-emerald-400" />,
        subtext: "ACTIVE // ASYNC EXPRESS APIS",
        tag: "RUNTIME ENVIRONMENT",
        glowColor: "group-hover:border-emerald-400/40 shadow-emerald-500/5",
        badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      };
    }
    if (norm.includes('mongo') || norm.includes('mongoose')) {
      return {
        icon: <DbIcon className="w-5 h-5 text-violet-400" />,
        subtext: "MDB_CORE // AGGREGATIONS ENGINE",
        tag: "DATABASE SERVER",
        glowColor: "group-hover:border-violet-400/40 shadow-violet-500/5",
        badgeBg: "bg-violet-500/10 text-violet-400 border-violet-500/20"
      };
    }
    if (norm.includes('websockets') || norm.includes('realtime')) {
      return {
        icon: <Activity className="w-5 h-5 text-rose-400" />,
        subtext: "SOCKET_OK // REALTIME PROTOCOLS",
        tag: "EVENT EMITTER",
        glowColor: "group-hover:border-rose-400/40 shadow-rose-500/5",
        badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/20"
      };
    }
    return {
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      subtext: "STRICT // ENDPOINTS ROUTER SCHEMA",
      tag: "API SERVICE",
      glowColor: "group-hover:border-amber-400/40 shadow-amber-500/5",
      badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    };
  };

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-[40%] right-[5%] w-72 h-72 rounded-full bg-cyan-600/5 blur-[120px] -z-10" />

      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header Indicator */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-gradient-to-r from-violet-600 to-transparent flex-1" />
          <div className="text-right">
            <span className="font-mono text-xs text-violet-400 tracking-widest uppercase block">01 // IDENTITY STATUS</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
              Core Protocol <span className="text-cyan-400">&</span> Skills
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Narrative Paragraph Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glassmorphism rounded-2xl p-6 border border-white/5 relative overflow-hidden group shadow-xl">
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-16 h-1 bg-gradient-to-r from-violet-600 to-cyan-400" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-violet-600/15 border border-violet-500/20">
                  <Shield className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="font-display font-medium text-lg text-white">Full-Stack Manifesto</h3>
              </div>

              <div className="space-y-4 text-slate-300 font-sans text-sm md:text-base leading-relaxed">
                {about.narrative && about.narrative.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Quick stats board */}
            <div className="flex flex-col gap-3">
              <div className="glassmorphism rounded-xl p-3 text-center border border-white/5 flex flex-col justify-center items-center">
                <span className="text-[10px] font-mono text-slate-500 block">PROJECTS BUILT</span>
                <span className="font-display font-bold text-xl text-white">{(projects.length > 0 ? projects.length - 1 : 0) + '+'}</span>
              </div>
              <div className="glassmorphism rounded-xl p-3 text-center border border-white/5 flex flex-col justify-center items-center">
                <span className="text-[10px] font-mono text-slate-500 block">TECHNOLOGIES</span>
                <span className="font-display font-bold text-xl text-cyan-400">{(about.skills.length > 0 ? about.skills.length - 1 : 0) + '+'}</span>
              </div>
              <div className="glassmorphism rounded-xl p-3 text-center border border-white/5 flex flex-col justify-center items-center">
                <span className="text-[10px] font-mono text-slate-500 block">SPECIALIZATION</span>
                <span className="font-display font-bold text-xl text-violet-400 text-sm">Full-Stack Web</span>
              </div>
            </div>
          </div>

          {/* Unique Visual Bento Card Grid for Skills */}
          <div className="lg:col-span-7 glassmorphism rounded-2xl p-6 border border-white/5 shadow-xl text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Hammer className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-slate-300 uppercase tracking-wide">Developer Toolbox</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">NODES_INDEX</span>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition-all duration-300 cursor-pointer ${
                    activeTab === cat
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat === 'All' ? 'ALL_NODES' : cat.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Custom lucrative interactive grid items (No percentages, fully modern graphic capsules) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredSkills && filteredSkills.map((skill) => {
                const specs = getTechCardSpecs(skill.name);
                return (
                  <div
                    key={skill.id || skill.name}
                    className={`group glassmorphism rounded-xl p-4 border border-white/5 flex flex-col justify-between hover:bg-white/[0.04] transition-all duration-300 relative shadow-md overflow-hidden ${specs.glowColor}`}
                  >
                    {/* Glowing card overlay */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent rounded-tr-xl pointer-events-none" />

                    <div className="flex items-start justify-between gap-2 mb-3">
                      {/* Tech Icon visual */}
                      <div className="p-2.5 rounded-lg bg-slate-900/90 border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                        {specs.icon}
                      </div>

                      {/* Small badge category */}
                      <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-mono border ${specs.badgeBg} uppercase tracking-wider`}>
                        {specs.tag}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
                        {specs.subtext}
                      </span>
                      <h4 className="font-display font-bold text-white text-sm tracking-tight leading-tight group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                        COMPILED
                      </span>
                      <span>SECURE // SLS</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Micro details indicator */}
            <div className="mt-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/5 text-yellow-400/85 text-[10px] font-mono border border-yellow-500/10">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Technology index matched dynamically to the local MongoDB database layout schema container.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

