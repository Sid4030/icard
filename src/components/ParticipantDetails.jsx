import React, { useState, useEffect } from 'react';
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
  Download,
  Printer,
  Globe,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import { ATTENDEES, CORE_MEMBERS, getAttendeeBySlug } from '../data/attendees';

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
  const [activeQrDataUrl, setActiveQrDataUrl] = useState('');
  const [allMemberQrs, setAllMemberQrs] = useState({});
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  // Default to current browser origin (or placeholder if server-side)
  const [baseUrl, setBaseUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return 'https://icard.vercel.app';
  });

  // Calculate full URL for an attendee
  const getFullUrlForSlug = (slug) => {
    const cleanBase = baseUrl.replace(/\/+$/, '');
    return `${cleanBase}/${slug}`;
  };

  // Generate QR code for the currently selected attendee
  useEffect(() => {
    const url = getFullUrlForSlug(attendee.slug);
    QRCode.toDataURL(url, {
      width: 512,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    })
      .then(url => setActiveQrDataUrl(url))
      .catch(err => console.error('Failed to generate active QR:', err));
  }, [attendee.slug, baseUrl]);

  // Pre-generate high-res QR codes for all 8 Core Heads
  useEffect(() => {
    const generateAll = async () => {
      const qrs = {};
      for (const slug of CORE_MEMBERS) {
        const member = ATTENDEES[slug];
        if (!member) continue;
        const url = getFullUrlForSlug(member.slug);
        try {
          const dataUrl = await QRCode.toDataURL(url, {
            width: 512,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#ffffff'
            },
            errorCorrectionLevel: 'H'
          });
          qrs[slug] = dataUrl;
        } catch (e) {
          console.error(`Failed to generate QR for ${slug}`, e);
        }
      }
      setAllMemberQrs(qrs);
    };

    generateAll();
  }, [baseUrl]);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleShare = () => {
    const currentUrl = getFullUrlForSlug(attendee.slug);
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

  const downloadQrCode = (dataUrl, fileName) => {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAllQrs = async () => {
    setIsDownloadingAll(true);
    for (let i = 0; i < CORE_MEMBERS.length; i++) {
      const slug = CORE_MEMBERS[i];
      const member = ATTENDEES[slug];
      const qr = allMemberQrs[slug];
      if (member && qr) {
        const safeName = member.name.replace(/[^a-zA-Z0-9]/g, '_');
        downloadQrCode(qr, `QR_ICARD_${safeName}.png`);
        // Small delay between downloads so browser doesn't block them
        await new Promise(resolve => setTimeout(resolve, 350));
      }
    }
    setIsDownloadingAll(false);
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
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 flex flex-col gap-12">
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

        {/* Phone Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-panel p-5 rounded-2xl flex flex-col justify-between group hover:border-cyan-500/30 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
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
              className="text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors block mt-0.5"
            >
              {attendee.phone}
            </a>
          </div>
        </motion.div>

        {/* Instagram Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="glass-panel p-5 rounded-2xl flex flex-col justify-between group hover:border-pink-500/30 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <InstagramIcon className="w-5 h-5" />
            </div>
            <a
              href={`https://instagram.com/${attendee.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-pink-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              Instagram Handle
            </span>
            <a 
              href={`https://instagram.com/${attendee.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-slate-200 hover:text-pink-400 transition-colors block mt-0.5"
            >
              @{attendee.instagram}
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
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-purple-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              GitHub Profile
            </span>
            <a 
              href={`https://github.com/${attendee.github}`}
              target="_blank"
              rel="noopener noreferrer"
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

      {/* EVENT ACCESS PASS SUMMARY & LIVE SCANNABLE QR CODE */}
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

        {/* Dynamic 100% Scannable QR Code */}
        <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-black/70 border border-white/10 shadow-2xl min-w-[200px]">
          <div className="w-36 h-36 p-2 bg-white rounded-xl flex items-center justify-center relative shadow-lg overflow-hidden">
            {activeQrDataUrl ? (
              <img 
                src={activeQrDataUrl} 
                alt={`QR code for ${attendee.name}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-xs font-mono text-black">Generating...</div>
            )}
          </div>
          <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest mt-2.5">
            SCAN TO OPEN CARD
          </span>
          <span className="text-[9px] font-mono text-slate-400 truncate max-w-[190px] text-center mt-0.5">
            /{attendee.slug}
          </span>
          <button
            onClick={() => downloadQrCode(activeQrDataUrl, `QR_${attendee.name.replace(/\s+/g, '_')}.png`)}
            className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-mono border border-cyan-500/30 transition-all hover:scale-105"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download QR (PNG)</span>
          </button>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* PHYSICAL I-CARD MAKER & PRINT SUITE (ALL 8 CORE HEADS) */}
      {/* ========================================================================= */}
      <motion.div 
        id="print-suite"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col gap-6 border-2 border-cyan-500/30 relative overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header & Explanation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30 mb-2">
              <Printer className="w-3.5 h-3.5" />
              PHYSICAL I-CARD PRINTING SUITE
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display">
              QR Codes For Physical Badges (All 8 Heads)
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Give these QR codes to your physical card printer. Each code encodes that person's permanent URL.
            </p>
          </div>

          <button
            onClick={handleDownloadAllQrs}
            disabled={isDownloadingAll}
            className="action-btn action-btn-primary self-start md:self-auto shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloadingAll ? 'Downloading...' : 'Download All 8 QR Codes'}</span>
          </button>
        </div>

        {/* Critical Information Box: How editing works after printing */}
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-start gap-3 text-xs font-mono leading-relaxed text-slate-200">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">
              Why you can edit cards at ANY time without reprinting:
            </span>
            <span>
              The physical QR code contains only the web address (e.g. <code className="text-cyan-300 bg-black/40 px-1 py-0.5 rounded">{getFullUrlForSlug('siddhant-choudhary')}</code>).
              Whenever you update someone's name, role, phone, or details in GitHub, Vercel automatically deploys the update.
              When anyone scans the physical badge, their phone immediately displays the latest information!
            </span>
          </div>
        </div>

        {/* Base Domain Input (Useful if user is on localhost and wants to print with their live Vercel URL) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 shrink-0">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Target Host Domain:</span>
          </div>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="e.g. https://icard.vercel.app"
            className="flex-1 px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={() => setBaseUrl(window.location.origin)}
            className="text-[11px] font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            Reset to Current Domain
          </button>
        </div>

        {/* 8 Core Heads Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {CORE_MEMBERS.map((slug) => {
            const member = ATTENDEES[slug];
            if (!member) return null;
            const qr = allMemberQrs[slug];
            const memberUrl = getFullUrlForSlug(member.slug);
            const isCurrent = attendee.slug === member.slug;

            return (
              <div 
                key={slug}
                className={`p-4 rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  isCurrent 
                    ? 'bg-cyan-500/10 border-2 border-cyan-400/60 shadow-lg shadow-cyan-500/10' 
                    : 'bg-black/50 border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Top Member Info */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span 
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md"
                      style={{ 
                        backgroundColor: `${member.accentColor}22`,
                        color: member.accentColor,
                        border: `1px solid ${member.accentColor}44`
                      }}
                    >
                      {member.id}
                    </span>
                    <button
                      onClick={() => onSelectAttendee(member.slug)}
                      className="text-[10px] font-mono text-slate-400 hover:text-cyan-300 transition-colors"
                    >
                      {isCurrent ? '• Active' : 'View Card →'}
                    </button>
                  </div>
                  <h5 className="text-sm font-bold text-white truncate font-display">
                    {member.name}
                  </h5>
                  <p className="text-[10px] font-mono text-slate-400 truncate">
                    {member.role}
                  </p>
                </div>

                {/* QR Code Preview */}
                <div className="my-3 flex flex-col items-center">
                  <div className="w-28 h-28 p-1.5 bg-white rounded-xl flex items-center justify-center shadow-md">
                    {qr ? (
                      <img 
                        src={qr} 
                        alt={`QR code for ${member.name}`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-[10px] font-mono text-black">Loading...</div>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 mt-1 truncate max-w-[130px]">
                    /{member.slug}
                  </span>
                </div>

                {/* Card Actions */}
                <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
                  <button
                    onClick={() => copyToClipboard(memberUrl, `url-${slug}`)}
                    className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] font-mono border border-white/5 transition-colors"
                  >
                    {copiedField === `url-${slug}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => downloadQrCode(qr, `QR_ICARD_${member.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`)}
                    className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-[11px] font-mono border border-cyan-500/30 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download QR</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* QUICK PRESET CHIPS & DYNAMIC ROUTER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-6 rounded-2xl flex flex-col gap-4 border border-white/10"
      >
        <div className="flex flex-col gap-2">
          <h5 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <span className="text-cyan-400">⚡</span>
            Switch Between Core Heads & Preview iCards
          </h5>
          <p className="text-xs text-slate-400">
            Click any member below to display their 3D badge above:
          </p>

          {/* Quick preset chips for all 8 Core Heads */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            {CORE_MEMBERS.map((slug) => {
              const member = ATTENDEES[slug];
              if (!member) return null;
              const isSelected = attendee.slug === member.slug;

              return (
                <button
                  key={slug}
                  onClick={() => onSelectAttendee(member.slug)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  /{member.slug}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Name Input Form */}
        <form onSubmit={handleCustomSubmit} className="flex items-center gap-2 mt-2 pt-4 border-t border-white/10">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500">
              /:
            </span>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="type custom attendee name (e.g. rohit-verma)..."
              className="w-full pl-7 pr-4 py-2 rounded-xl bg-black/50 border border-white/15 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="action-btn action-btn-secondary py-2 px-4 text-xs font-mono"
          >
            Generate iCard
          </button>
        </form>
      </motion.div>
    </section>
  );
}
