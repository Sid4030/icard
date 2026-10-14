import React, { useState, useEffect } from 'react';
import IdentityPass from './components/IdentityPass';
import { getHeadBySlug } from './data/attendees';

/**
 * Extract target attendee slug from URL:
 * Supports:
 * 1. Clean pathname: /siddhant-choudhary or /manan-nidar
 * 2. Query parameter: /?name=manan-nidar
 * 3. Hash: /#/manan-nidar
 */
const extractAttendeeSlug = () => {
  if (typeof window === 'undefined') return 'siddhant-choudhary';

  // 1. Query parameter: ?name=manan-nidar
  const queryParam = new URLSearchParams(window.location.search).get('name');
  if (queryParam) return queryParam.trim().toLowerCase();

  // 2. Hash: #/manan-nidar
  if (window.location.hash) {
    const hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
    if (hash) return hash;
  }

  // 3. Clean Pathname: /manan-nidar
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').trim().toLowerCase();
  if (path && path !== 'index.html') return path;

  // Default to first lead
  return 'siddhant-choudhary';
};

export default function App() {
  const [attendee, setAttendee] = useState(() => getHeadBySlug(extractAttendeeSlug()));

  useEffect(() => {
    if (attendee) {
      document.title = `${attendee.name} | Cybercup 6.0 Pass`;
    } else {
      document.title = 'Pass Not Found | Cybercup 6.0';
    }

    const handlePopState = () => {
      const slug = extractAttendeeSlug();
      const data = getHeadBySlug(slug);
      setAttendee(data);
      if (data) {
        document.title = `${data.name} | Cybercup 6.0 Pass`;
      } else {
        document.title = 'Pass Not Found | Cybercup 6.0';
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [attendee]);

  const handleSelectLead = () => {
    const data = getHeadBySlug('siddhant-choudhary');
    setAttendee(data);
    window.history.pushState({ slug: 'siddhant-choudhary' }, '', '/siddhant-choudhary');
  };

  if (!attendee) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[#0a0a0b] text-white px-6 antialiased font-['Inter','Plus_Jakarta_Sans',system-ui,sans-serif]">
        <div className="w-full max-w-[360px] text-center">
          <span className="text-[12px] font-semibold tracking-[0.2em] text-white/40 uppercase block mb-3">
            CYBERCUP 6.0
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
            Pass not found
          </h1>
          <p className="text-sm text-[#8a8f98] mb-8 leading-relaxed">
            The requested attendee pass does not exist or the link may be invalid.
          </p>
          <button
            type="button"
            onClick={handleSelectLead}
            className="w-full h-11 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 active:scale-[0.99] transition-all cursor-pointer"
          >
            View Lead Pass
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh w-full bg-[#0a0a0b] text-white">
      <IdentityPass attendee={attendee} />
    </div>
  );
}
