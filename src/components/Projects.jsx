import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  Github, 
  Terminal, 
  Cpu, 
  Layers, 
  Check, 
  X, 
  Sparkles, 
  Database, 
  Server, 
  ShieldCheck, 
  Network, 
  Command, 
  Workflow
} from 'lucide-react';

export default function Projects({ projects, totalProjects }) {
  if (!projects) return null;
  const [selectedProject, setSelectedProject] = useState(null);

  // Fallback list of 3 key features if database.json did not load features yet
  const getProjectFeatures = (project) => {
    if (project.features && project.features.length >= 3) {
      return project.features;
    }
    // Deep fallback features
    switch (project.id) {
      case 'proj-1':
        return [
          "Interactive canvas routing engine",
          "Deep nested hierarchy graphs",
          "Live telemetry visual analytics"
        ];
      case 'proj-2':
        return [
          "Real-time serverless log monitoring",
          "Custom server scaling thresholds",
          "D3-powered high density charts"
        ];
      case 'proj-3':
        return [
          "Glass reflection filter presets",
          "Prism refraction shaders integration",
          "Fluid motion gesture feedback"
        ];
      default:
        return [
          "Scalable microservices support",
          "Durable Cloud State engines",
          "Decentralized secure CDN edge"
        ];
    }
  };

  // Simulated node specifications for the interactive "View Details" console modal
  const getSubDetails = (project) => {
    switch (project.id) {
      case 'proj-1':
        return {
          version: "v2.4.9-alpha",
          ramUsed: "142 MB / 512 MB",
          cpuLoad: "1.4% avg",
          databaseType: "MongoDB Core Atlas DB Cluster",
          architecture: "MERN Stack (Vite + Express Proxy)",
          bandwidthRate: "128 KB/s dynamic queue",
          endpoint: "GET /api/v1/quantum-nodes/graph"
        };
      case 'proj-2':
        return {
          version: "v1.12.0-stable",
          ramUsed: "328 MB / 512 MB",
          cpuLoad: "4.2% peak",
          databaseType: "MongoDB TimeSeries Cluster",
          architecture: "Distributed Serverless Function Proxy",
          bandwidthRate: "1.2 MB/s live streams",
          endpoint: "WS /api/v1/telemetry/stream"
        };
      case 'proj-3':
        return {
          version: "v0.9.8-release",
          ramUsed: "46 MB / 256 MB",
          cpuLoad: "0.2% passive",
          databaseType: "Decentralized Config Cache (Memory)",
          architecture: "Static Edge Distribution + PostCSS",
          bandwidthRate: "4.2 MB/s edge cache hit",
          endpoint: "GET /cdn/v1/glass-shell/styles.css"
        };
      default:
        return {
          version: "v1.0.0",
          ramUsed: "120 MB",
          cpuLoad: "1.0%",
          databaseType: "MongoDB GridFS Node",
          architecture: "Express microservices",
          bandwidthRate: "340 KB/s",
          endpoint: "GET /api/health"
        };
    }
  };

  return (
    <section id="projects" className="relative py-24 overflow-hidden border-t border-white/5">
      {/* Background abstract radial glows */}
      <div className="absolute top-[20%] left-[-10%] w-[45rem] h-[45rem] rounded-full bg-violet-600/[0.02] blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[45rem] h-[45rem] rounded-full bg-cyan-500/[0.02] blur-[160px] pointer-events-none -z-10 animate-pulse duration-[10000ms]" />

      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Modern section title and node architecture headers */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-violet-500/10 text-[10px] font-mono text-violet-400 border border-violet-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
              DEPLOYMENT_LOG
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
              Sleek & Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 font-extrabold">Builds</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg">
              Inspecting deep architectures, state machines, and microservice containers deployed live in our node cluster database.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-slate-500 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>MAPPED CORE: {totalProjects || projects.length} REPOSITORIES ACTIVE</span>
          </div>
        </div>

        {/* UNIQUE ADVANCED ASYMMETRIC CARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => {
            const projectFeatures = getProjectFeatures(project);
            const cardId = project.id || `proj-${idx}`;

            return (
              <div
                key={cardId}
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

                    {/* 5. Technology Badging Bar (Now fully visible by default) */}
                    <div className="pt-2 border-t border-white/[0.03]">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-1.5">
                        ENGINE STACK
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-slate-300 border border-white/5 uppercase"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
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

        {/* VIEW ALL DEPLOYMENTS / ARCHIVE LINK BLOCK */}
        <div className="mt-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block"
          >
            <Link
              to="/projects"
              className="group relative inline-flex items-center gap-4 px-8 py-4.5 rounded-xl bg-slate-950/60 hover:bg-slate-950/90 border border-white/[0.05] hover:border-cyan-500/30 text-white font-mono text-xs font-bold transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] cursor-pointer overflow-hidden text-left"
            >
              {/* Glowing vertical laser tag */}
              <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-violet-500 to-cyan-400" />
              
              <div className="flex flex-col gap-0.5">
                <span className="text-[8.5px] text-cyan-400 tracking-wider uppercase font-extrabold flex items-center gap-1">
                  <Command className="w-2.5 h-2.5 animate-pulse" />
                  GATEWAY_DIAG_INDEX // EXTERNAL_CORE
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-100 font-display">
                  VIEW ALL DEPLOYMENTS
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
                <span className="text-[8.5px] text-slate-500 font-normal uppercase tracking-wide">
                  Explore full repositories index list compiled on GitHub servers
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
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
                      <p className="text-sm text-slate-300 font-sans leading-relaxed">{selectedProject.challenges}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                        SOLUTIONS
                      </span>
                      <p className="text-sm text-slate-300 font-sans leading-relaxed">{selectedProject.solutions}</p>
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
    </section>
  );
}
