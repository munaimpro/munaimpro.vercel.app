import React, { useState, useEffect } from 'react';
import { Database, Save, RefreshCw, AlertCircle, CheckCircle2, Server, HelpCircle, Code, Layers, MessageSquare } from 'lucide-react';

export default function MongoSandbox({ initialData, onDataSynced }) {
  const [collections, setCollections] = useState(() => {
    const fullCopy = initialData ? { ...initialData } : {};
    delete fullCopy.messages;
    return {
      full: fullCopy,
      profile: initialData?.profile || {},
      about: initialData?.about || {},
      projects: initialData?.projects || [],
      education: initialData?.education || [],
      experience: initialData?.experience || [],
      messages: initialData?.messages || []
    };
  });

  const [activeCollection, setActiveCollection] = useState('full');
  const [jsonText, setJsonText] = useState(() => {
    if (!initialData) return '';
    const fullCopy = { ...initialData };
    delete fullCopy.messages;
    return JSON.stringify(fullCopy, null, 2);
  });
  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ type: '', text: '' });

  // Update text when collection tab changes or initialData updates
  useEffect(() => {
    if (!initialData) return;
    
    const fullCopy = { ...initialData };
    delete fullCopy.messages;
    
    const updatedCollections = {
      full: fullCopy,
      profile: initialData.profile || {},
      about: initialData.about || {},
      projects: initialData.projects || [],
      education: initialData.education || [],
      experience: initialData.experience || [],
      messages: initialData.messages || []
    };
    
    setCollections(updatedCollections);
    
    const selectedData = updatedCollections[activeCollection];
    setJsonText(JSON.stringify(selectedData, null, 2));
  }, [initialData, activeCollection]);

  // Handle JSON Text Area changes and validate structures
  const handleJsonChange = (e) => {
    const text = e.target.value;
    setJsonText(text);
    
    try {
      const parsed = JSON.parse(text);
      setIsValid(true);
      setErrorMsg('');
    } catch (err) {
      setIsValid(false);
      setErrorMsg(err.message);
    }
  };

  // Switch collection tab
  const handleTabChange = (colKey) => {
    setActiveCollection(colKey);
    const selectedData = collections[colKey];
    setJsonText(JSON.stringify(selectedData, null, 2));
    setIsValid(true);
    setErrorMsg('');
  };

  // Sync / Save modifications back to MongoDB server JSON using POST API
  const handleSyncDatabase = async () => {
    if (!isValid) return;
    setIsSaving(true);
    setSaveStatus({ type: '', text: '' });

    try {
      const parsedContent = JSON.parse(jsonText);
      let payload = { ...initialData };

      // Map parsed content back into the full layout
      if (activeCollection === 'full') {
        payload = parsedContent;
      } else {
        payload[activeCollection] = parsedContent;
      }

      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const responseData = await res.json();
      if (res.ok) {
        setSaveStatus({ type: 'success', text: 'Collection Synced to Express database!' });
        
        // Notify parent App component to update live layout values immediately
        if (onDataSynced) {
          onDataSynced(payload);
        }
      } else {
        setSaveStatus({ type: 'error', text: responseData.error || 'Failed to edit database schema.' });
      }
    } catch (ex) {
      setSaveStatus({ type: 'error', text: 'Fatal error parsing JSON layout attributes' });
    } finally {
      setIsSaving(false);
      
      // Reset statuses after 4s
      setTimeout(() => {
        setSaveStatus({ type: '', text: '' });
      }, 4000);
    }
  };

  return (
    <section id="mongo" className="relative py-20 overflow-hidden">
      {/* Background neon visual glows */}
      <div className="absolute top-[40%] left-[20%] w-[35rem] h-[35rem] rounded-full bg-cyan-700/5 blur-[150px] -z-10 animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-violet-600/5 blur-[130px] -z-10" />

      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">

        {/* Dynamic Sandbox Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main query workspace - Code Editor on the left */}
          <div className="lg:col-span-8 flex flex-col justify-between glassmorphism rounded-2xl border border-white/8 bg-slate-950/75 p-5 shadow-2xl relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                PORTFOLIO_DB
              </span>
            </div>

            <div className="flex flex-col h-full">
              {/* Database Tab Switchers - Kept only db.portfolio.json */}
              <div className="flex items-center gap-1 pb-3 mb-4 border-b border-white/5">
                <span className="px-3 py-1.5 rounded-lg text-[10px] font-mono bg-violet-600/25 text-violet-400 border border-violet-500/30">
                  db.portfolio.json
                </span>
              </div>

              {/* JSON code console editor */}
              <div className="relative flex-1 flex flex-col pt-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1.5 px-1">
                  <div className="flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-cyan-400" />
                    <span>read_only_schema.json</span>
                  </div>
                  <span>secured_query_view</span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-white/5 h-80 min-h-[22rem]">
                  {/* Visual Line Numbers */}
                  <div className="absolute top-0 bottom-0 left-0 w-8 bg-slate-950/80 border-r border-white/5 flex flex-col items-center pt-4 text-[10px] font-mono text-slate-600 select-none leading-[20px]">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>

                  <textarea
                    value={jsonText}
                    readOnly
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    spellCheck="false"
                    className="w-full h-full bg-slate-900/95 font-mono text-xs text-indigo-300 p-4 pl-12 focus:outline-none resize-none leading-[20px] overflow-y-auto select-none"
                    style={{
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                    placeholder="// Loading core document fields..."
                  />
                </div>
              </div>

              {/* Secured Read Only status indicator */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>DATABASE CORE IN READ-ONLY STATE // COPY SELECTION SECURED</span>
              </div>
            </div>
          </div>

          {/* Right column - Dynamic charts displaying stats */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            
            {/* System Status Metrics Card */}
            <div className="glassmorphism rounded-2xl p-5 border border-white/8 bg-slate-950/75 flex-1 flex flex-col justify-between text-left shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">JSON Database Core Metrics</span>
                  <Database className="w-4 h-4 text-emerald-400" />
                </div>
                
                <h3 className="font-display font-bold text-white text-lg tracking-tight leading-none">
                  Database Status
                </h3>
 
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">DBMS Engine:</span>
                    <span className="text-emerald-400 font-bold">Express JSON DB (Local)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Total Documents:</span>
                    <span className="text-white">{(initialData?.projects?.length || 0) + (initialData?.education?.length || 0) + (initialData?.experience?.length || 0)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Incoming Messages:</span>
                    <span className="text-cyan-400">{(initialData?.messages?.length || 0)} log entries</span>
                  </div>
                </div>
              </div>

              {/* Tiny helpful tutorial tip */}
              <div className="mt-6 flex gap-2 p-2.5 rounded-xl bg-violet-600/10 text-[10px] font-sans leading-relaxed text-violet-300 border border-violet-500/10">
                <HelpCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <span>Modifying properties in the JSON editor on the left and choosing 'Sync Live DB' immediately alters the entire layout of this website! Try editing the name or titles.</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
