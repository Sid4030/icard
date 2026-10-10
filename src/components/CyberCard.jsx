import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Wifi, QrCode, RefreshCw, Sparkles, Cpu, Award } from 'lucide-react';
import gsap from 'gsap';

export default function CyberCard({ attendee, onFlipChange }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const lettersRef = useRef(null);
  const photoRef = useRef(null);
  const nameRef = useRef(null);

  // 3D Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['10%', '90%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['10%', '90%']);

  // GSAP Entrance Pop-up Sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        cardRef.current,
        { y: -80, opacity: 0, scale: 0.92, rotateZ: -3 },
        { y: 0, opacity: 1, scale: 1, rotateZ: 0, duration: 1.2, ease: 'elastic.out(1, 0.75)' }
      )
      .fromTo(
        lettersRef.current,
        { opacity: 0, letterSpacing: '12px', scale: 0.85 },
        { opacity: 1, letterSpacing: '-2px', scale: 1, duration: 0.9 },
        '-=0.8'
      )
      .fromTo(
        photoRef.current,
        { scale: 0.7, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.85, ease: 'back.out(1.4)' },
        '-=0.6'
      )
      .fromTo(
        nameRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );
    });

    return () => ctx.revert();
  }, [attendee.slug]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const toggleFlip = () => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    if (onFlipChange) onFlipChange(nextFlipped);
  };

  const accentColor = attendee.accentColor || '#00f2fe';
  const accentSecondary = attendee.accentSecondary || '#4facfe';

  return (
    <div className="flex flex-col items-center select-none">
      {/* Real Lanyard Strap & Clip at Top */}
      <div className="relative flex flex-col items-center z-20 pointer-events-none mb-[-14px]">
        {/* Woven Lanyard Ribbon */}
        <div 
          className="w-8 h-20 shadow-md relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #090d16 0%, #151d2a 60%, #0d121c 100%)',
            borderLeft: `2px solid ${accentColor}44`,
            borderRight: `2px solid ${accentColor}44`,
            boxShadow: `0 4px 15px rgba(0,0,0,0.8), 0 0 10px ${accentColor}22`
          }}
        >
          {/* Lanyard pattern stitching */}
          <div className="absolute inset-0 flex flex-col justify-between py-1 opacity-40">
            <div className="w-full h-[1px] bg-white/20" />
            <div className="text-[7px] text-center tracking-widest font-mono text-cyan-200 uppercase font-black rotate-90 my-auto">
              CYBERCUP
            </div>
            <div className="w-full h-[1px] bg-white/20" />
          </div>
        </div>

        {/* Silver Lanyard Clip & Swivel Ring */}
        <div className="flex flex-col items-center">
          {/* Metal Crimp */}
          <div className="w-9 h-3 rounded-sm bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 shadow-sm border border-slate-600/40" />
          {/* Swivel Ring */}
          <div className="w-4 h-4 rounded-full border-2 border-slate-300 bg-transparent shadow-inner -my-0.5" />
          {/* Metal Trigger Lobster Clasp entering card slot */}
          <div className="w-6 h-6 rounded-t-full bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 shadow-lg border border-slate-400/50 flex items-center justify-center">
            <div className="w-1.5 h-3 bg-slate-700 rounded-full" />
          </div>
        </div>
      </div>

      {/* 3D Interactive Card Container */}
      <div 
        className="card-perspective-container cursor-pointer relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={toggleFlip}
      >
        <motion.div
          ref={cardRef}
          style={{
            rotateX: isFlipped ? 0 : rotateX,
            rotateY: isFlipped ? 180 : rotateY,
            transformStyle: 'preserve-3d',
            transition: isFlipped ? 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
          }}
          className="relative w-[320px] sm:w-[350px] h-[520px] sm:h-[550px] rounded-[28px] shadow-2xl transition-shadow duration-300"
        >
          {/* ================= FRONT SIDE ================= */}
          <div 
            className="absolute inset-0 w-full h-full rounded-[28px] overflow-hidden flex flex-col justify-between p-6"
            style={{
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(175deg, #0e1219 0%, #07090e 55%, #05070a 100%)',
              border: `1.5px solid ${accentColor}55`,
              boxShadow: `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px ${accentColor}22`
            }}
          >
            {/* Holographic Glare Overlay */}
            <motion.div 
              className="absolute inset-0 pointer-events-none rounded-[28px] z-30"
              style={{
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.22) 0%, ${accentColor}18 35%, transparent 65%)`,
                mixBlendMode: 'overlay'
              }}
            />

            {/* Subtle Diagonal Holographic Light Sweep */}
            <div 
              className="absolute inset-0 pointer-events-none rounded-[28px] overflow-hidden z-25 opacity-30"
            >
              <div 
                className="w-[200%] h-full holo-shine-sweep"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 45%, ${accentColor}33 50%, transparent 60%)`
                }}
              />
            </div>

            {/* Card Background Microgrid Pattern */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            />

            {/* Top Lanyard Slot Punch Cutout */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full z-40 flex items-center justify-center bg-black/95 border border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]">
              <div className="w-12 h-2 rounded-full bg-[#030508] shadow-inner" />
            </div>

            {/* TOP HEADER SECTION */}
            <div className="relative z-20 flex items-center justify-between pt-2">
              {/* Left: Circuit glyph & Series */}
              <div className="flex items-center gap-2">
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center border"
                  style={{
                    borderColor: `${accentColor}44`,
                    background: `${accentColor}11`
                  }}
                >
                  <Cpu className="w-4 h-4" style={{ color: accentColor }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase">
                    CYBERCUP
                  </span>
                  <span className="text-[8px] font-mono tracking-widest text-slate-500 uppercase">
                    FLAGSHIP 6.0
                  </span>
                </div>
              </div>

              {/* Right: MAJLIS / Edition Badge (Styled like reference photo) */}
              <div className="text-right">
                <div 
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase border"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    borderColor: 'rgba(255,255,255,0.12)',
                    color: '#e2e8f0'
                  }}
                >
                  <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                  MAJLIS
                </div>
                <div className="text-[7.5px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                  TECH FESTIVAL
                </div>
              </div>
            </div>

            {/* GIANT TYPOGRAPHY BACKGROUND (IEDC style, tailored to CYBER / CUP 6.0) */}
            <div 
              ref={lettersRef}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 overflow-hidden"
              style={{ top: '15%', height: '62%' }}
            >
              <div 
                className="font-black leading-[0.82] tracking-tighter uppercase select-none text-center"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '115px',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(203,213,225,0.7) 40%, rgba(71,85,105,0.2) 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.8))'
                }}
              >
                <div>CYBER</div>
                <div 
                  style={{
                    fontSize: '92px',
                    letterSpacing: '-3px',
                    opacity: 0.85
                  }}
                >
                  6.0
                </div>
              </div>
            </div>

            {/* PERSON'S CUTOUT PORTRAIT (Center foreground overlapping the giant typography) */}
            <div 
              ref={photoRef}
              className="absolute inset-x-0 bottom-0 top-16 flex items-end justify-center pointer-events-none z-15 overflow-hidden"
            >
              {attendee.avatar ? (
                <div className="relative w-full h-[88%] flex items-end justify-center">
                  <img
                    src={attendee.avatar}
                    alt={attendee.name}
                    className="w-[90%] h-full object-cover object-top filter contrast-[1.06] brightness-[1.02]"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 0%, black 68%, transparent 95%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 68%, transparent 95%)',
                      filter: `drop-shadow(0 15px 30px rgba(0,0,0,0.9))`
                    }}
                  />
                  {/* Subtle rim light / neon glow highlight */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      background: `radial-gradient(ellipse at 50% 60%, ${accentColor} 0%, transparent 60%)`,
                      mixBlendMode: 'screen'
                    }}
                  />
                </div>
              ) : (
                /* Dynamic Cyber Shield / Monogram Badge for Name-Only Badge Design */
                <div className="relative w-full h-[78%] flex flex-col items-center justify-end pb-10">
                  <div 
                    className="w-40 h-40 rounded-2xl flex items-center justify-center relative mb-4 border-2 transition-transform duration-500 hover:scale-105"
                    style={{
                      borderColor: `${accentColor}88`,
                      background: `radial-gradient(circle at 50% 40%, ${accentColor}25 0%, rgba(10,14,24,0.95) 75%)`,
                      boxShadow: `0 0 35px ${accentColor}33, inset 0 0 20px ${accentColor}18`
                    }}
                  >
                    {/* Corner Cyber Brackets */}
                    <div className="absolute top-1.5 left-1.5 text-[11px] font-mono leading-none select-none opacity-60" style={{ color: accentColor }}>⌜</div>
                    <div className="absolute top-1.5 right-1.5 text-[11px] font-mono leading-none select-none opacity-60" style={{ color: accentColor }}>⌝</div>
                    <div className="absolute bottom-1.5 left-1.5 text-[11px] font-mono leading-none select-none opacity-60" style={{ color: accentColor }}>⌞</div>
                    <div className="absolute bottom-1.5 right-1.5 text-[11px] font-mono leading-none select-none opacity-60" style={{ color: accentColor }}>⌟</div>

                    {/* Member Initials */}
                    <span 
                      className="text-5xl font-black font-display tracking-wider select-none drop-shadow-lg"
                      style={{ color: accentColor }}
                    >
                      {attendee.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </span>

                    {/* Badge Pill Indicator */}
                    <div 
                      className="absolute -bottom-2.5 px-3 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold tracking-wider bg-black border shadow-lg flex items-center gap-1"
                      style={{ borderColor: `${accentColor}77`, color: '#e2e8f0' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                      <span>{attendee.tier ? attendee.tier.split('/')[0].trim() : 'OFFICIAL ID'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* DARK GRADIENT BOTTOM SHIELD FOR TEXT LEGIBILITY */}
            <div 
              className="absolute inset-x-0 bottom-0 h-44 pointer-events-none z-20"
              style={{
                background: 'linear-gradient(to top, #07090e 0%, #07090e 45%, rgba(7,9,14,0.85) 75%, transparent 100%)'
              }}
            />

            {/* BOTTOM INFO CLUSTER (Matching reference photo: Full Name, glowing pill tag, category) */}
            <div ref={nameRef} className="relative z-25 mt-auto flex flex-col items-center text-center pb-2">
              {/* Attendee Full Name */}
              <h2 
                className="text-2xl sm:text-[27px] font-black tracking-tight text-white mb-1 drop-shadow-md"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {attendee.name}
              </h2>

              {/* Glowing Role Pill Tag (Like "Media & Marketing Lead" in photo) */}
              <div 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono font-bold tracking-wide uppercase border shadow-lg my-1"
                style={{
                  background: 'rgba(10, 16, 26, 0.85)',
                  borderColor: accentColor,
                  color: accentColor,
                  boxShadow: `0 0 16px ${accentColor}44, inset 0 0 8px ${accentColor}22`
                }}
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full animate-ping"
                  style={{ backgroundColor: accentColor }}
                />
                <span>{attendee.role}</span>
              </div>

              {/* Sub-label & Category */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-slate-400 tracking-wider italic font-semibold">
                  {attendee.department || attendee.event}
                </span>
                <span className="text-slate-600 text-[10px]">•</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  {attendee.id}
                </span>
              </div>

              {/* Micro-barcode & Cyber verification footer mark */}
              <div className="w-full flex items-center justify-between mt-3 pt-2 border-t border-white/10 text-[8px] font-mono text-slate-500">
                <div className="flex items-center gap-1">
                  <Wifi className="w-2.5 h-2.5 text-cyan-400/70" />
                  <span>NFC // RFID ACTIVE</span>
                </div>
                <div className="tracking-[2px] text-slate-400 font-bold">
                  ||||| | |||| ||| ||
                </div>
                <div className="text-cyan-400/80 font-bold">
                  VERIFIED
                </div>
              </div>
            </div>

            {/* Corner Precision Marks */}
            <div className="absolute top-3 left-3 text-white/20 text-xs font-mono pointer-events-none">⌜</div>
            <div className="absolute top-3 right-3 text-white/20 text-xs font-mono pointer-events-none">⌝</div>
            <div className="absolute bottom-3 left-3 text-white/20 text-xs font-mono pointer-events-none">⌞</div>
            <div className="absolute bottom-3 right-3 text-white/20 text-xs font-mono pointer-events-none">⌟</div>
          </div>

          {/* ================= BACK SIDE ================= */}
          <div 
            className="absolute inset-0 w-full h-full rounded-[28px] overflow-hidden flex flex-col justify-between p-6"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(175deg, #0d1118 0%, #080a0f 60%, #050608 100%)',
              border: `1.5px solid ${accentColor}55`,
              boxShadow: `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px ${accentColor}22`
            }}
          >
            {/* Magnetic Stripe */}
            <div className="w-full -mx-6 h-12 bg-black border-y border-white/10 mt-2 shadow-inner relative flex items-center px-6">
              <div className="w-full h-4 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-end px-3">
                <span className="text-[8px] font-mono text-zinc-500 tracking-widest">
                  ENCRYPTED 512-BIT HASH
                </span>
              </div>
            </div>

            {/* Back Card Details */}
            <div className="flex flex-col gap-3 my-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase">HOLDER FULL NAME</div>
                  <div className="text-base font-bold text-white">{attendee.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-mono text-slate-500 uppercase">ACCESS TIER</div>
                  <div className="text-xs font-bold font-mono" style={{ color: accentColor }}>
                    {attendee.tier}
                  </div>
                </div>
              </div>

              {/* Security Credentials Matrix */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-white/[0.03] p-3 rounded-xl border border-white/5">
                <div>
                  <span className="text-slate-500 block text-[8px]">PASS ID</span>
                  <span className="text-slate-200 font-bold">{attendee.id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[8px]">BLOOD GROUP</span>
                  <span className="text-rose-400 font-bold">{attendee.bloodGroup || 'O+'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[8px]">EVENT ARENA</span>
                  <span className="text-slate-200 font-bold truncate block">{attendee.venue}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[8px]">SECURITY CLEARANCE</span>
                  <span className="text-emerald-400 font-bold">LEVEL 4 // GRANTED</span>
                </div>
              </div>

              {/* Event Guidelines Summary */}
              <div className="text-[8px] font-mono text-slate-400 leading-relaxed bg-black/40 p-2.5 rounded-lg border border-white/5">
                <p className="font-bold text-slate-300 mb-1">REGULATIONS // CYBERCUP 6.0</p>
                <p>1. This badge is non-transferable and must be visible at all times.</p>
                <p>2. Grants access to sanctioned CTF arena, audit rooms & tracks.</p>
                <p>3. In emergency, report to security station: {attendee.emergencyPhone}.</p>
              </div>

              {/* Laser Barcode Simulation */}
              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 border border-white/5">
                <div className="w-full h-8 flex items-center justify-center font-mono text-xl tracking-[4px] text-white select-none">
                  |||||||| | ||||| ||||||| | |||||||||| |||
                </div>
                <div className="text-[8px] font-mono text-slate-500 mt-1">
                  SERIAL NO: CC6-AUTH-{attendee.id.replace(/[^0-9]/g, '') || '9402'}
                </div>
              </div>
            </div>

            {/* Back Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono text-slate-500">
              <div className="flex items-center gap-1 text-cyan-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>OFFICIAL BADGE</span>
              </div>
              <div className="text-slate-400">
                CYBERCUP 6.0 ORGANIZING COMM.
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Helper Pill: Click to Flip */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleFlip}
        className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-slate-400 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isFlipped ? 'text-purple-400' : 'text-cyan-400'} transition-transform duration-300`} />
        <span>{isFlipped ? 'Click to View Front' : 'Click / Tap to Flip Card'}</span>
      </motion.button>
    </div>
  );
}
