import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Database, Terminal, Cpu, ExternalLink } from 'lucide-react';
import HomePage from './pages/index';
import ProjectsPage from './pages/projects';
import fallbackData from './database.json';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'about', label: 'Skills', number: '01' },
    { id: 'projects', label: 'Deployments', number: '02' },
    { id: 'experience', label: 'Experience', number: '03' },
    { id: 'education', label: 'Education', number: '04' },
    { id: 'contact', label: 'Message', number: '05' }
  ];

  const fetchDatabase = async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (!res.ok) {
        throw new Error('Database response was not OK');
      }
      const json = await res.json();
      setData(json);
      try {
        localStorage.setItem('portfolio_data', JSON.stringify(json));
      } catch (e) {
        console.warn('Storage quota or storage access error:', e);
      }
      setError(null);
      setLoading(false);
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
    }
  };

  useEffect(() => {
    fetchDatabase();
  }, []);

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

  // If loading or error, show system screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-mono text-xs text-indigo-400 p-4 space-y-4">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-violet-500/20 border-t-violet-400 border-r-violet-400 animate-spin" />
          <Database className="w-5 h-5 text-cyan-400 animate-pulse" />
        </div>
        <p className="tracking-widest animate-pulse"># QUERYING_LOCAL_DATABASE.JSON ...</p>
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
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
