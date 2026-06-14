import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ExternalLink, Cpu, Workflow, Check, X, Github, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function ProjectsPage({ projects, sections, handleNavigate }) {
  const [selectedTech, setSelectedTech] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const allTechnologies = useMemo(() => {
    const techs = new Set(['All']);
    if (projects && Array.isArray(projects)) {
      projects.forEach(p => {
        if (p.technologies && Array.isArray(p.technologies)) {
          p.technologies.forEach(t => techs.add(t));
        }
      });
    }
    return Array.from(techs);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!projects || !Array.isArray(projects)) return [];
    if (selectedTech === 'All') return projects;
    return projects.filter(p => p.technologies && p.technologies.includes(selectedTech));
  }, [projects, selectedTech]);

  const getProjectFeatures = (project) => {
    return project.features || [
      "Scalable infrastructure support",
      "Durable Cloud State engines",
      "Decentralized secure CDN edge"
    ];
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-16 px-4 sm:px-6 md:px-8">
      {sections && handleNavigate && (
        <Header 
          sections={sections} 
          activeSection="projects" 
          onNavigate={handleNavigate} 
        />
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* High-Tech Futuristic Interactive Banner */}
        <div className="relative rounded-3xl bg-slate-900/30 border border-white/5 overflow-hidden p-8 sm:p-10 md:p-12 mb-12 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl group/banner">
          {/* Subtle grid mesh background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          {/* Expanding Neon atmospheric highlights */}
          <div className="absolute top-0 left-1/4 w-[35rem] h-[35rem] rounded-full bg-violet-600/10 blur-[130px] -translate-y-1/2 pointer-events-none transition-all duration-1000 group-hover/banner:bg-violet-600/15" />
          <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] rounded-full bg-cyan-500/10 blur-[130px] translate-y-1/2 pointer-events-none transition-all duration-1000 group-hover/banner:bg-cyan-500/15" />
          
          {/* Orbital wire-frames on background corners */}
          <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full border border-dashed border-indigo-500/10 animate-[spin_70s_linear_infinite] pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border border-double border-cyan-400/5 animate-[spin_100s_linear_infinite_reverse] pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8 z-10">
            <div className="space-y-4 max-w-3xl text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-[10px] font-mono border border-violet-500/20 uppercase tracking-widest leading-none font-bold">
                  PROJECTS_REPOSITORY
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono border border-cyan-500/20 uppercase tracking-widest leading-none font-bold">
                  v2.0_STABLE
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight text-white">
                Engineered{" "}
                <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent text-glow">
                  Solutions & Applications
                </span>
              </h1>
              
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans font-medium max-w-2xl">
                An architectural gallery of robust full-stack applications, interactive environments, API services, and production web systems built with advanced modern stacks.
              </p>

              {/* Unique Console Diagnostics Line details */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-3 text-[10px] font-mono text-slate-500 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>NODE_INGRESS: ACTIVE_PIPELINES</span>
                </div>
                <div>// CATEGORIES: FRONTEND, BACKEND, SYSTEM_INTEGRID</div>
              </div>
            </div>

            {/* Back to Home Interactive CTA */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 hover:border-cyan-500/30 font-mono text-xs tracking-wider uppercase transition-all duration-300 group shrink-0 active:scale-95 shadow-lg shadow-black/40"
              >
                <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1.5 transition-transform duration-300" />
                <span>RETURN_TO_CORE</span>
              </Link>
            </div>
          </div>
          
          {/* Asymmetric indicator wire-frame bottom detailed lines */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600/40 via-cyan-500/40 to-indigo-500/40 opacity-70" />
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {allTechnologies.map(tech => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-4 py-2 rounded-full font-mono text-xs border ${selectedTech === tech ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-900 border-white/10 text-slate-400'} transition-all`}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
             const projectFeatures = getProjectFeatures(project);
             return (
              <div
                key={project.id || `proj-${idx}`}
                className="group relative bg-slate-950/40 rounded-2xl border border-white/[0.06] hover:border-cyan-500/20 shadow-[0_16px_36px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(6,182,212,0.1)] transition-all duration-500 flex flex-col justify-between text-left h-full overflow-hidden"
              >
                {/* Asymmetric accent light line */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 group-hover:via-cyan-400 opacity-80" />

                {/* Card Top Block */}
                <div className="px-5 py-3.5 bg-slate-950/80 border-b border-white/[0.04] flex items-center justify-between text-[10px] font-mono tracking-wider">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-slate-400 font-bold">DEPLOYMENT_NODE_0{idx + 1}</span>
                  </div>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] border border-emerald-500/15">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>

                {/* 1. Project Image Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-white/[0.04]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out saturate-75 group-hover:scale-105 group-hover:saturate-100"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Main Info Compartment */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* 2. Title & Subtitle */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-indigo-400 tracking-wider block uppercase font-bold">
                        {project.subtitle || "STANDALONE CONTAINER"}
                      </span>
                      <h3 className="font-display text-white text-base md:text-lg font-bold tracking-tight leading-tight group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    {/* 3. Short Description */}
                    <p className="text-slate-400 font-sans text-xs leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* 4. Three (3) Key Features Section */}
                    <div className="space-y-2 pt-2 border-t border-white/[0.03]">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                        CORE CAPABILITIES
                      </span>
                      <div className="space-y-1.5">
                        {projectFeatures.slice(0, 3).map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-[11px]">
                            <span className="text-cyan-400 font-mono text-[9px] mt-0.5 font-bold">
                              [0{fIdx + 1}]
                            </span>
                            <span className="text-slate-300 font-sans leading-tight">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 5. Technology Badging Bar */}
                    <div className="pt-2 border-t border-white/[0.03]">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-1.5">
                        ENGINE STACK
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies && project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-slate-300 border border-white/5 uppercase"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies && project.technologies.length > 4 && (
                          <span className="px-1.5 py-0.5 rounded bg-cyan-400/10 text-[9px] font-mono text-cyan-400 border border-cyan-400/20 uppercase font-semibold">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar: View Details Link & Live Link */}
                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11.5px] font-mono">
                    {/* View Details Link */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-slate-400 hover:text-white flex items-center gap-1.5 hover:underline decoration-violet-500/60 decoration-2 transition-all cursor-pointer font-semibold"
                    >
                      <Workflow className="w-4 h-4 text-violet-400" />
                      VIEW_DETAILS
                    </button>

                    {/* Live Link Gateway with high visibility */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-all cursor-pointer font-bold"
                    >
                      LIVE_RUN 
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
             );
          })}
        </div>

        {/* STUNNING ARCHITECTURAL CONSOLE DETAILS MODAL */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-4xl bg-slate-950 border border-white/10 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative text-left"
              >
                {/* Modal futuristic top-bar header */}
                <div className="bg-slate-900 px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-xs text-slate-300 font-semibold tracking-wider">
                      CONSOLE_DIAGNOSTICS://{selectedProject.id?.toUpperCase() || "PROJ"}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close portal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Body Info blocks */}
                <div className="p-6 md:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
                  <div className="rounded-xl overflow-hidden border border-white/10 aspect-video bg-slate-900">
                      <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                      {selectedProject.subtitle}
                    </span>
                    <h3 className="font-display font-bold text-white text-3xl tracking-tight leading-tight">
                      {selectedProject.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed font-sans">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                      COMPLIANCE ARCHITECTURE
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getProjectFeatures(selectedProject).map((feat, fIdx) => (
                        <div key={fIdx} className="flex gap-2 text-xs text-slate-200">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="font-sans font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                          CHALLENGES
                        </span>
                        <p className="text-sm text-slate-300 font-sans leading-relaxed">{selectedProject.challenges || "No specific challenges noted."}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                          SOLUTIONS
                        </span>
                        <p className="text-sm text-slate-300 font-sans leading-relaxed">{selectedProject.solutions || "Standard architectural resolution."}</p>
                      </div>
                  </div>
                </div>

                {/* Modal footer container layout with CTA */}
                <div className="bg-slate-900/90 border-t border-white/10 px-6 py-4 flex items-center justify-between">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-slate-500" />
                    ACCESS_REPOSITORY
                  </a>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="px-4 py-2 rounded-lg border border-white/5 hover:border-white/15 bg-slate-800 hover:bg-slate-700/80 text-white text-xs font-mono transition-colors cursor-pointer"
                    >
                      CLOSE_PORTAL
                    </button>

                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-mono text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        RUN_GATEWAY
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
