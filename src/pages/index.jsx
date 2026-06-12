import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';
import MongoSandbox from '../components/MongoSandbox';
import Contact from '../components/Contact';

export default function HomePage({ data, handleNavigate, setActiveSection, sections, activeSection, fetchDatabase, handleDataSynced }) {
  if (!data) return null;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const allTrackingSections = [{ id: 'hero' }, ...sections];

      for (let sec of allTrackingSections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, setActiveSection]);

  return (
    <>
      <Header
        sections={sections}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 relative">
        <Hero profile={data.profile} onScrollDown={handleNavigate} />
        
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
        <About about={data.about} projects={data.projects} />
        
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
        <Projects projects={data.projects} />
        
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
        <Experience experience={data.experience} />
        
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
        <Education education={data.education} />
        
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
        <MongoSandbox initialData={data} onDataSynced={handleDataSynced} />
        
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
        <Contact profile={data.profile} messages={data.messages} onMessageSent={fetchDatabase} />
      </main>
    </>
  );
}
