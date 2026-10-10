import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { getAttendeeBySlug } from './data/attendees';
import CyberCard from './components/CyberCard';
import ParticipantDetails from './components/ParticipantDetails';

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

  const handleSelectAttendee = (newSlug) => {
    setCurrentSlug(newSlug);
    const data = getAttendeeBySlug(newSlug);
    setAttendee(data);
    document.title = `${data.name} | Cybercup 6.0 ID`;

    // Update browser URL without reloading
    const newUrl = `/${newSlug}`;
    window.history.pushState({ slug: newSlug }, '', newUrl);

    // Smoothly scroll back to top to admire the newly generated iCard
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const accentColor = attendee.accentColor || '#00f2fe';

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-x-hidden">
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

      {/* HERO SECTION: Dedicated strictly to the iCard (No Navbar) */}
      <main className="w-full min-h-screen flex flex-col items-center justify-between pt-6 sm:pt-8 pb-10 px-4 relative z-10">
        {/* Subtle Top Event Label */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-bold text-white tracking-wider">CYBERCUP 6.0</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">OFFICIAL IDENTITY BADGE</span>
        </motion.div>

        {/* 3D Interactive CyberCard with Lanyard */}
        <div className="my-auto py-4">
          <CyberCard attendee={attendee} onFlipChange={setIsFlipped} />
        </div>

        {/* Scroll Indicator (No Navbar as requested) */}
        <motion.a
          href="#credentials"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer group mt-4"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase font-semibold">
            Scroll down for details
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
          </motion.div>
        </motion.a>
      </main>

      {/* SCROLL DOWN CREDENTIALS & DETAILS SECTION */}
      <div id="credentials" className="w-full relative z-10">
        <ParticipantDetails 
          attendee={attendee} 
          onSelectAttendee={handleSelectAttendee} 
        />
      </div>

      {/* Minimal Tech Footer */}
      <footer className="w-full py-8 border-t border-white/10 text-center text-xs font-mono text-slate-500 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="font-bold text-slate-400">CYBERCUP 6.0</span>
          <span>//</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
        <p className="text-[10px] text-slate-600">
          Designed for Cybercup 6.0 Security Symposium & CTF Championship
        </p>
      </footer>
    </div>
  );
}
