import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  QrCode, 
  Share2, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  ExternalLink,
  Sparkles,
  UserCheck,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function ParticipantDetails({ attendee, onSelectAttendee }) {
  const [copiedField, setCopiedField] = useState(null);
  const [customInput, setCustomInput] = useState('');

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setCopiedField('share-url');

    // Fire celebratory confetti!
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f2fe', '#4facfe', '#a855f7', '#ffffff']
    });

    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const slug = customInput.trim().toLowerCase().replace(/\s+/g, '-');
    onSelectAttendee(slug);
    setCustomInput('');
  };

  const accentColor = attendee.accentColor || '#00f2fe';

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 flex flex-col gap-10">
      {/* SECTION HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="live-dot" />
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
              OFFICIAL EVENT CREDENTIALS // VERIFIED
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            {attendee.name}
          </h3>
          <p className="text-sm font-mono text-slate-400 mt-1">
            {attendee.role} • {attendee.department}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="action-btn action-btn-primary"
          >
            {copiedField === 'share-url' ? (
              <>
                <Check className="w-4 h-4 text-emerald-950" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share iCard URL</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* CORE DETAILS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Email Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="glass-panel p-5 rounded-2xl flex flex-col justify-between group hover:border-cyan-500/30 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Mail className="w-5 h-5" />
            </div>
            <button
              onClick={() => copyToClipboard(attendee.email, 'email')}
              title="Copy email"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              Official Email
            </span>
            <a 
              href={`mailto:${attendee.email}`}
              className="text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors truncate block mt-0.5"
            >
              {attendee.email}
            </a>
          </div>
        </motion.div>

        {/* Instagram Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-panel p-5 rounded-2xl flex flex-col justify-between group hover:border-pink-500/30 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <InstagramIcon className="w-5 h-5" />
            </div>
            <a
              href={`https://instagram.com/${attendee.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              Instagram Profile
            </span>
            <a 
              href={`https://instagram.com/${attendee.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-slate-200 hover:text-pink-400 transition-colors block mt-0.5"
            >
              @{attendee.instagram}
            </a>
          </div>
        </motion.div>

        {/* Phone Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="glass-panel p-5 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/30 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Phone className="w-5 h-5" />
            </div>
            <button
              onClick={() => copyToClipboard(attendee.phone, 'phone')}
              title="Copy phone"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              Direct Contact
            </span>
            <a 
              href={`tel:${attendee.phone}`}
              className="text-sm font-semibold text-slate-200 hover:text-emerald-400 transition-colors block mt-0.5"
            >
              {attendee.phone}
            </a>
          </div>
        </motion.div>

        {/* GitHub Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-panel p-5 rounded-2xl flex flex-col justify-between group hover:border-purple-500/30 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <GithubIcon className="w-5 h-5" />
            </div>
            <a
              href={`https://github.com/${attendee.github}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              Developer Profile
            </span>
            <a 
              href={`https://github.com/${attendee.github}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-slate-200 hover:text-purple-400 transition-colors block mt-0.5"
            >
              github.com/{attendee.github}
            </a>
          </div>
        </motion.div>

        {/* Pass ID & Tier Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="glass-panel p-5 rounded-2xl flex flex-col justify-between group hover:border-cyan-500/30 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <button
              onClick={() => copyToClipboard(attendee.id, 'id')}
              title="Copy ID"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              {copiedField === 'id' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              Badge Identifier
            </span>
            <span className="text-sm font-mono font-bold text-white block mt-0.5">
              {attendee.id}
            </span>
          </div>
        </motion.div>

        {/* Venue & Event Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-panel p-5 rounded-2xl flex flex-col justify-between group hover:border-slate-500/30 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-slate-500/10 border border-slate-500/20 flex items-center justify-center text-slate-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 text-slate-400 border border-white/5">
              LIVE ARENA
            </div>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              Allocated Venue
            </span>
            <span className="text-sm font-semibold text-slate-200 block mt-0.5 truncate">
              {attendee.venue}
            </span>
          </div>
        </motion.div>
      </div>

      {/* EVENT ACCESS PASS SUMMARY & LIVE QR VERIFICATION */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-panel-glow p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="flex-1 flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            CYBERCUP 6.0 PASSPORT
          </div>

          <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
            {attendee.accessLevel}
          </h4>

          <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
            {attendee.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>EDITION 6.0 // 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>STATUS: ADMITTED</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-rose-400 font-bold">BLOOD: {attendee.bloodGroup}</span>
            </div>
          </div>
        </div>

        {/* Dynamic QR Code Badge */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-black/60 border border-white/10 shadow-2xl">
          {/* Stylized QR Code Representation */}
          <div className="w-32 h-32 p-2 bg-white rounded-xl flex items-center justify-center relative shadow-lg">
            <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
              {/* Corner position markers */}
              <rect x="5" y="5" width="26" height="26" rx="4" fill="black" />
              <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
              <rect x="13" y="13" width="10" height="10" rx="1" fill="black" />

              <rect x="69" y="5" width="26" height="26" rx="4" fill="black" />
              <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
              <rect x="77" y="13" width="10" height="10" rx="1" fill="black" />

              <rect x="5" y="69" width="26" height="26" rx="4" fill="black" />
              <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
              <rect x="13" y="77" width="10" height="10" rx="1" fill="black" />

              {/* Data matrix dots */}
              <rect x="36" y="8" width="8" height="8" fill="black" />
              <rect x="48" y="8" width="6" height="6" fill="black" />
              <rect x="38" y="20" width="16" height="6" fill="black" />
              <rect x="8" y="38" width="8" height="8" fill="black" />
              <rect x="20" y="44" width="6" height="6" fill="black" />
              <rect x="36" y="36" width="28" height="28" rx="3" fill="#00f2fe" opacity="0.3" />
              <rect x="42" y="42" width="16" height="16" rx="2" fill="black" />
              <rect x="70" y="38" width="8" height="8" fill="black" />
              <rect x="84" y="44" width="8" height="8" fill="black" />
              <rect x="38" y="72" width="12" height="6" fill="black" />
              <rect x="54" y="78" width="8" height="14" fill="black" />
              <rect x="70" y="70" width="10" height="10" fill="black" />
              <rect x="84" y="76" width="8" height="16" fill="black" />
            </svg>
          </div>
          <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest mt-2">
            SCAN TO VERIFY
          </span>
          <span className="text-[8px] font-mono text-slate-500">
            {attendee.id}
          </span>
        </div>
      </motion.div>

      {/* URL ROUTE TESTER & SWITCHER (Per User Request: /siddhant-choudhary, /harsh, or custom /name) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-6 rounded-2xl flex flex-col gap-4 border border-white/10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h5 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <span className="text-cyan-400">⚡</span>
              Test URL Routing & Switch Attendee
            </h5>
            <p className="text-xs text-slate-400 mt-0.5">
              Each user gets their dedicated URL at <code className="text-cyan-300 bg-white/5 px-1 py-0.5 rounded">/:name</code> (e.g. <code className="text-cyan-300">/siddhant-choudhary</code> or <code className="text-cyan-300">/harsh</code>)
            </p>
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onSelectAttendee('siddhant-choudhary')}
              className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all ${
                attendee.slug === 'siddhant-choudhary'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              /siddhant-choudhary
            </button>
            <button
              onClick={() => onSelectAttendee('harsh')}
              className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all ${
                attendee.slug === 'harsh'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              /harsh
            </button>
          </div>
        </div>

        {/* Dynamic Name Input Form */}
        <form onSubmit={handleCustomSubmit} className="flex items-center gap-2 mt-1">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500">
              /:
            </span>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="type any name (e.g. ananya-sharma, alex-turner)..."
              className="w-full pl-7 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="action-btn action-btn-secondary py-2.5 px-4 text-xs font-mono"
          >
            Generate iCard
          </button>
        </form>
      </motion.div>
    </section>
  );
}
