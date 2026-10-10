import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAttendeeBySlug } from './data/attendees';
import CyberCard from './components/CyberCard';

export default function App() {
  const [currentSlug, setCurrentSlug] = useState('');
  const [attendee, setAttendee] = useState(() => getAttendeeBySlug(''));
  const [isFlipped, setIsFlipped] = useState(false);

  // Extract slug from URL pathname, query param, or hash
  const extractSlugFromUrl = () => {
    // 1. Try search param: ?name=siddhant-choudhary
    const searchParams = new URLSearchParams(window.location.search);
    const queryName = searchParams.get('name');
    if (queryName) return queryName.trim().toLowerCase();

    // 2. Try hash: #/siddhant-choudhary
    if (window.location.hash) {
      const hashSlug = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
      if (hashSlug) return hashSlug;
    }

    // 3. Try pathname: /siddhant-choudhary
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '').trim().toLowerCase();
    if (path && path !== 'index.html') {
      return path;
    }

    // Default to flagship organizer
    return 'siddhant-choudhary';
  };

  useEffect(() => {
    const slug = extractSlugFromUrl();
    setCurrentSlug(slug);
    const data = getAttendeeBySlug(slug);
    setAttendee(data);
    document.title = `${data.name} | Cybercup 6.0 ID`;

    // Listen to browser forward/backward navigation
    const handlePopState = () => {
      const poppedSlug = extractSlugFromUrl();
      setCurrentSlug(poppedSlug);
      const poppedData = getAttendeeBySlug(poppedSlug);
      setAttendee(poppedData);
      document.title = `${poppedData.name} | Cybercup 6.0 ID`;
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const accentColor = attendee.accentColor || '#00f2fe';

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden px-4 py-8 select-none">
      {/* Background Ambience */}
      <div className="cyber-bg-grid" />
      <div 
        className="ambient-glow-1 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${accentColor}1f 0%, ${accentColor}05 50%, transparent 70%)`
        }}
      />
      <div 
        className="ambient-glow-2 transition-all duration-700" 
        style={{
          background: `radial-gradient(circle, ${attendee.accentSecondary || '#a855f7'}18 0%, transparent 70%)`
        }}
      />

      {/* Subtle Top Event Label */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md mb-3 sm:mb-5 relative z-10"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="font-bold text-white tracking-wider">CYBERCUP 6.0</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-400">OFFICIAL IDENTITY BADGE</span>
      </motion.div>

      {/* 3D Interactive CyberCard with Lanyard */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <CyberCard attendee={attendee} onFlipChange={setIsFlipped} />
      </div>

      {/* Minimal Tech Tagline at Bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-5 text-center text-[10px] font-mono text-slate-500 relative z-10 flex items-center justify-center gap-2"
      >
        <span className="text-slate-400 font-semibold">{attendee.name}</span>
        <span className="text-slate-600">//</span>
        <span>{attendee.id}</span>
        <span className="text-slate-600">//</span>
        <span className="text-cyan-400/80 font-bold">VERIFIED</span>
      </motion.div>
    </div>
  );
}
