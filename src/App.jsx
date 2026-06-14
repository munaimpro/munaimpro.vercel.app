import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Database, Terminal, Cpu, ExternalLink, ArrowUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import HomePage from './pages/index';
import ProjectsPage from './pages/projects';
import fallbackData from './database.json';
import { Analytics } from '@vercel/analytics/react';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = [
    { id: 'about', label: 'Skills', number: '01' },
    { id: 'projects', label: 'Deployments', number: '02' },
    { id: 'experience', label: 'Experience', number: '03' },
    { id: 'education', label: 'Education', number: '04' },
    { id: 'contact', label: 'Message', number: '05' }
  ];

  const fetchDatabase = async () => {
    const startTime = Date.now();
    const MIN_LOAD_TIME = 2200; // Implemented 2.2s visible welcome timing
    try {
      const res = await fetch('/api/portfolio');
      let fetchedData = null;
      if (res.ok) {
        fetchedData = await res.json();
      } else {
        throw new Error('Database response was not OK');
      }

      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOAD_TIME - elapsed);

      setTimeout(() => {
        setData(fetchedData);
        try {
          localStorage.setItem('portfolio_data', JSON.stringify(fetchedData));
        } catch (e) {
          console.warn('Storage quota or storage access error:', e);
        }
        setError(null);
        setLoading(false);
      }, remainingTime);

    } catch (err) {
      console.warn('Backend server database port query failed; falling back to client-saved state.');
      
      // Look up cached localStorage item
      let localPayload = null;
      try {
        const cached = localStorage.getItem('portfolio_data');
        if (cached) {
          localPayload = JSON.parse(cached);
        }
      } catch (e) {
        console.warn('Could not read from local storage cache:', e);
      }

      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOAD_TIME - elapsed);

      setTimeout(() => {
        if (localPayload) {
          setData(localPayload);
          setError(null);
        } else if (fallbackData) {
          setData(fallbackData);
          setError(null);
        } else {
          setError(err.message || 'Failed connecting to database port');
        }
        setLoading(false);
      }, remainingTime);
    }
  };

  useEffect(() => {
    fetchDatabase();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial trigger
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen for navigation state from projects page to smoothly scroll on homepage mount
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const id = location.state.scrollTo;
      // Clear navigation state to prevent scroll trigger on future manual reloads
      navigate(location.pathname, { replace: true, state: {} });
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(id);
        }
      }, 150);
    }
  }, [location, navigate]);

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    } else {
      // If we are not on "/", navigate to root first, then scroll via router state
      if (window.location.pathname !== '/') {
        navigate('/', { state: { scrollTo: id } });
      }
    }
  };

  const handleDataSynced = (updatedData) => {
    setData(updatedData);
  };

  // If loading, show previous system style loading screen with custom welcome text
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-mono text-xs text-indigo-400 p-4 space-y-4">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-violet-500/20 border-t-violet-400 border-r-violet-400 animate-spin" />
          <Database className="w-5 h-5 text-cyan-400 animate-pulse" />
        </div>
        <p className="tracking-widest animate-pulse">&lt;Hello world/&gt;</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-mono text-xs text-rose-400 p-4 space-y-4">
        <Terminal className="w-8 h-8 text-rose-500" />
        <p className="font-bold"># DATABASE NETWORK PORT EXCEPTION DETECTED</p>
        <code className="bg-rose-950/40 px-4 py-2.5 rounded-lg text-[11px] border border-rose-500/20 max-w-md text-center">
          {error}
        </code>
        <button
          onClick={fetchDatabase}
          className="px-4 py-2 mt-2 rounded bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const sharedProps = {
    data,
    projects: data?.projects || [],
    handleNavigate,
    setActiveSection,
    sections,
    activeSection,
    fetchDatabase,
    handleDataSynced
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative font-sans selection:bg-violet-600/30 selection:text-cyan-200 overflow-x-hidden antialiased">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none -z-20" />
      
      <Routes>
        <Route path="/" element={<HomePage {...sharedProps} />} />
        <Route path="/projects" element={<ProjectsPage {...sharedProps} />} />
      </Routes>
      
      <footer className="w-full py-10 glassmorphism border-t border-white/5 mt-auto relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>© {new Date().getFullYear()} Munaim Khan. All Copyright Reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              GitHub <ExternalLink className="w-3 h-3 text-cyan-400" />
            </a>
            <span>•</span>
            <span className="text-violet-400 font-bold">Full-Stack Portfolio</span>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button with Dynamic Progress Ring */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.8 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            id="back-to-top-btn"
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-slate-900/90 text-cyan-400 flex items-center justify-center hover:text-white border border-white/5 shadow-[0_4px_24px_rgba(34,211,238,0.25)] hover:shadow-[0_4px_28px_rgba(139,92,246,0.35)] transition-all scroll-smooth group cursor-pointer focus:outline-none"
            aria-label="Back to Top"
            title="Back to top"
          >
            {/* Smooth SVG Progress Circle indicator */}
            <svg className="absolute top-0 left-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="22"
                stroke="rgba(139, 92, 246, 0.12)"
                strokeWidth="2.5"
                fill="transparent"
              />
              <circle
                cx="24"
                cy="24"
                r="22"
                stroke="url(#back-to-top-progress-gradient)"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray="138.2"
                strokeDashoffset={138.2 - (scrollProgress / 100) * 138.2}
                strokeLinecap="round"
                className="transition-all duration-100 ease-out"
              />
              <defs>
                <linearGradient id="back-to-top-progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            
            <ArrowUp className="w-5 h-5 relative z-10 transition-transform group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Analytics />
    </BrowserRouter>
  );
}
