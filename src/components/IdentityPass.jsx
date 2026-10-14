import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { resolveAvatar } from '../data/attendees';

/**
 * Dynamic Viewport Adaptation Hook
 * Accurately tracks screen metrics to ensure identical spacing,
 * balanced proportions, and seamless rendering on every mobile ratio.
 */
function useDeviceMetrics() {
  const [metrics, setMetrics] = useState(() => calculateMetrics());

  function calculateMetrics() {
    if (typeof window === 'undefined') {
      return {
        isDesktop: false,
        isShortPhone: false,
        windowWidth: 390,
        windowHeight: 844,
      };
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    const isDesktop = w >= 700;
    const isShortPhone = !isDesktop && h < 690;

    return {
      isDesktop,
      isShortPhone,
      windowWidth: w,
      windowHeight: h,
    };
  }

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMetrics(calculateMetrics());
      }, 40);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return metrics;
}

export default function IdentityPass({ attendee }) {
  const metrics = useDeviceMetrics();
  const cardRef = useRef(null);
  const photoRef = useRef(null);
  const bigRef = useRef(null);
  const stageRef = useRef(null);

  const accent = attendee.accentColor || '#5b86ff';
  const photoSrc = resolveAvatar(attendee);

  // Avatar scale multiplier: boosts Manan, Chahat, and Kushagra for commanding presence
  const avatarScale = attendee.avatarScale || (['manan-nidar', 'manan', 'chahat', 'kusagra-rai', 'kushagra-rai', 'kushagra'].includes(attendee.slug) ? 1.25 : 1.10);

  // Split name for high-fashion two-line typography
  const firstName = attendee.firstName || attendee.name.split(' ')[0] || attendee.name;
  const lastName = attendee.lastName !== undefined 
    ? attendee.lastName 
    : attendee.name.split(' ').slice(1).join(' ');

  // Links: LinkedIn, Email, Phone
  const links = [
    attendee.linkedin && {
      label: 'LinkedIn',
      href: attendee.linkedin.startsWith('http') ? attendee.linkedin : `https://linkedin.com/in/${attendee.linkedin}`,
      external: true,
    },
    attendee.email && {
      label: 'Email',
      href: `mailto:${attendee.email}`,
      external: false,
    },
    attendee.phone && {
      label: 'Phone',
      display: attendee.phone,
      href: `tel:${attendee.phone.replace(/[^0-9+]/g, '')}`,
      external: false,
    },
  ].filter(Boolean);

  // Pass Number
  const passIdNumber = attendee.id?.includes('-')
    ? attendee.id.split('-')[1]
    : (attendee.passNumber || '001');
  const passLabel = `Pass ${passIdNumber}`;

  // GSAP Choreography, Flashing Light & Entrance Sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Entrance reveal animation
      tl.fromTo(bigRef.current, { autoAlpha: 0, scale: 1.25 }, { autoAlpha: 1, scale: 1, duration: 1.1 }, 0)
        .fromTo(photoRef.current, { autoAlpha: 0, yPercent: 12 }, { autoAlpha: 1, yPercent: 0, duration: 0.9 }, 0.15)
        .fromTo(
          '.anim-char',
          { autoAlpha: 0, yPercent: 110, rotate: 4 },
          { autoAlpha: 1, yPercent: 0, rotate: 0, stagger: 0.025, duration: 0.65 },
          0.45
        )
        .fromTo('.anim-watermark', { autoAlpha: 0, x: -16 }, { autoAlpha: 0.4, x: 0, duration: 0.6 }, '-=0.3')
        .fromTo('.anim-link', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.45 }, '-=0.25')
        .fromTo('.foot', { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.2');

      // 2. Idle subtle floating oscillation on Big 6.0
      gsap.to(bigRef.current, {
        yPercent: 3,
        xPercent: -2,
        duration: 4.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // 4. Dynamic Flashing / Blinking Color Light Effect on 6.0
      const flashTl = gsap.timeline({ repeat: -1, repeatDelay: 1.8 });
      flashTl
        .to(bigRef.current, {
          webkitTextStroke: `2.2px ${accent}`,
          filter: `drop-shadow(0 0 24px ${accent}) drop-shadow(0 0 55px ${accent}80)`,
          opacity: 1,
          duration: 0.28,
          ease: 'power2.out',
        })
        .to(bigRef.current, {
          webkitTextStroke: '2px rgba(255, 255, 255, 0.35)',
          filter: `drop-shadow(0 0 6px ${accent}40)`,
          opacity: 0.88,
          duration: 0.16,
          ease: 'power2.in',
        })
        .to(bigRef.current, {
          webkitTextStroke: `2.5px ${accent}`,
          filter: `drop-shadow(0 0 34px ${accent}) drop-shadow(0 0 80px ${accent}90)`,
          opacity: 1,
          duration: 0.32,
          ease: 'power2.out',
        })
        .to(bigRef.current, {
          webkitTextStroke: '2px rgba(255, 255, 255, 0.22)',
          filter: 'drop-shadow(0 0 0px transparent)',
          opacity: 0.82,
          duration: 1.2,
          ease: 'power2.inOut',
        });

      // 4. Desktop Tilt (Card 3D rotation, keeping head locked in center)
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && cardRef.current) {
        const card = cardRef.current;
        const big = bigRef.current;

        const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
        const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
        const bx = gsap.quickTo(big, 'x', { duration: 0.8, ease: 'power3.out' });

        const handlePointerMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          ry(nx * 8);
          rx(-ny * 6);
          bx(-nx * 14);
        };

        const handlePointerLeave = () => {
          ry(0);
          rx(0);
          bx(0);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('mouseleave', handlePointerLeave);

        return () => {
          window.removeEventListener('pointermove', handlePointerMove);
          window.removeEventListener('mouseleave', handlePointerLeave);
        };
      }
    }, stageRef);

    return () => ctx.revert();
  }, [attendee.slug, accent]);

  return (
    <main
      ref={stageRef}
      className="stage w-full h-[100dvh] min-h-[100dvh] flex items-center justify-center relative overflow-hidden select-none bg-[var(--ink)] text-[var(--text)] font-['DM_Sans',system-ui,sans-serif]"
      style={{ perspective: '1200px' }}
    >
      <article
        ref={cardRef}
        className="card relative flex flex-col overflow-hidden bg-[var(--ink)] w-full"
        style={{
          '--c': accent,
          maxWidth: '460px',
          height: metrics.isDesktop ? 'min(92dvh, 880px)' : '100dvh',
          borderRadius: metrics.isDesktop ? '32px' : '0px',
          border: metrics.isDesktop ? '1px solid var(--line)' : 'none',
          boxShadow: metrics.isDesktop ? '0 40px 120px -30px rgba(0,0,0,0.9)' : 'none',
          paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)',
          paddingBottom: metrics.isDesktop ? '8px' : '0px',
        }}
      >
        {/* ================================================================= */}
        {/* 1. HERO: SHIFTED 6.0 BACKGROUND + CHROMATIC ECHO + SCALED AVATAR */}
        {/* ================================================================= */}
        <section
          className="hero relative flex-1 min-h-[260px] sm:min-h-[300px] w-full overflow-hidden flex items-end justify-center pt-2"
        >
          {/* Chromatic Holographic Glow Echo Shifted to Left */}
          <div
            className="absolute left-[29.5%] sm:left-[31.5%] top-[10%] sm:top-[12%] -translate-x-1/2 font-['Bricolage_Grotesque',sans-serif] font-black pointer-events-none select-none z-0 opacity-35 will-change-transform"
            style={{
              fontSize: 'clamp(170px, 35vh, 260px)',
              lineHeight: 0.8,
              letterSpacing: '-0.04em',
              color: 'transparent',
              WebkitTextStroke: `1.5px ${accent}60`,
              filter: `drop-shadow(0 0 18px ${accent}45)`,
              whiteSpace: 'nowrap',
            }}
          >
            6.0
          </div>

          {/* Giant Outlined "6.0" Shifted to Left-Hand Side with Dynamic Color Flashing */}
          <div
            ref={bigRef}
            id="big"
            className="absolute left-[28%] sm:left-[30%] top-[10%] sm:top-[12%] -translate-x-1/2 font-['Bricolage_Grotesque',sans-serif] font-black pointer-events-none select-none z-0 will-change-transform"
            style={{
              fontSize: 'clamp(170px, 35vh, 260px)',
              lineHeight: 0.8,
              letterSpacing: '-0.04em',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.28)',
              whiteSpace: 'nowrap',
              transition: 'filter 0.3s ease',
            }}
          >
            6.0
          </div>

          {/* Vertical Technical Edge Watermark on Left Side */}
          <div className="anim-watermark absolute left-4 sm:left-5 top-[38%] -translate-y-1/2 flex items-center gap-2.5 pointer-events-none select-none z-0 opacity-40 [writing-mode:vertical-rl] rotate-180">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.28em] text-[var(--c)] uppercase font-semibold">
              CYBERCUP 6.0 // {attendee.role}
            </span>
            <span className="w-6 h-[1px] bg-[var(--c)] opacity-60" />
          </div>

          {/* Soft Backlight Glow Centered Behind Head */}
          <div
            className="glow absolute left-1/2 top-[32%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full pointer-events-none z-0"
            style={{
              filter: 'blur(28px)',
            }}
          />

          {/* Transparent Cutout Portrait: Locked Dead-Center with Flex Container */}
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10 overflow-hidden">
            <img
              ref={photoRef}
              id="photo"
              src={photoSrc}
              alt={attendee.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images-without-background/Siddhant-removebg-preview.png';
              }}
              className="h-[98%] sm:h-[102%] w-auto max-w-[94%] object-contain object-bottom select-none pointer-events-none will-change-transform drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
              style={{
                transform: `scale(${avatarScale})`,
                transformOrigin: 'bottom center',
              }}
              draggable={false}
            />
          </div>

          {/* Bottom Gradient Fade: Blends subject seamlessly into the dark page */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 sm:h-28 pointer-events-none z-20"
            style={{
              background: 'linear-gradient(to top, var(--ink) 12%, rgba(12, 13, 17, 0.85) 45%, transparent 100%)',
            }}
          />
        </section>

        {/* ================================================================= */}
        {/* 2. IDENTITY: TWO-LINE NAME WITH CLEAN EDITORIAL BREATHING ROOM    */}
        {/* ================================================================= */}
        <section className="id relative px-7 sm:px-8 text-center z-30 -mt-2 sm:-mt-4 mb-7 sm:mb-9 shrink-0">
          <h1
            className="name font-['Bricolage_Grotesque',sans-serif] font-black leading-[0.92] tracking-[-0.035em] text-center"
            style={{ fontSize: 'clamp(2.3rem, 11vw, 3.8rem)' }}
            aria-label={attendee.name}
          >
            {/* Line 1: First Name (Solid White) */}
            <span className="ln block overflow-hidden pb-1 text-white">
              {[...firstName].map((char, i) => (
                <span key={`f-${i}`} className="anim-char inline-block will-change-transform">
                  {char}
                </span>
              ))}
            </span>

            {/* Line 2: Last Name (Artistic Outline, if present) */}
            {lastName && (
              <span
                className="ln block overflow-hidden text-transparent"
                style={{
                  WebkitTextStroke: '1.5px var(--text)',
                }}
              >
                {[...lastName].map((char, i) => (
                  <span key={`l-${i}`} className="anim-char inline-block will-change-transform">
                    {char}
                  </span>
                ))}
              </span>
            )}
          </h1>
        </section>

        {/* ================================================================= */}
        {/* 3. LINKS: LINKEDIN, EMAIL, PHONE WITH GENEROUS SIDE PADDING       */}
        {/* ================================================================= */}
        <ul className="links list-none p-0 w-full border-t border-[var(--line)] z-20 shrink-0">
          {links.map((link) => (
            <li key={link.label} className="anim-link border-b border-[var(--line)] overflow-hidden">
              <a
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="group flex w-full items-center justify-between px-7 sm:px-8 py-3.5 sm:py-4 transition-colors duration-200 hover:bg-white/[0.04] active:bg-white/[0.08]"
                style={{ minHeight: metrics.isShortPhone ? '46px' : '52px' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[15px] sm:text-[16px] font-medium tracking-wide text-[var(--text)] group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                  {link.label === 'Phone' && link.display && (
                    <span className="text-[12px] text-[var(--mute)] font-normal hidden sm:inline tracking-normal">
                      {link.display}
                    </span>
                  )}
                </div>

                <svg
                  viewBox="0 0 16 16"
                  className="w-4 h-4 stroke-[var(--mute)] fill-none stroke-[1.8] group-hover:stroke-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200"
                >
                  <path d="M4 12L12 4M5 4h7v7" />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        {/* ================================================================= */}
        {/* 4. FOOTER: ROLE & PASS NUMBER WITH SAFE-AREA INSET PADDING        */}
        {/* ================================================================= */}
        <footer className="foot shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--c)' }} />
            <span className="font-medium tracking-wide text-white/90">{attendee.role}</span>
          </div>
          <span className="font-mono text-[#8a8f9c]">{passLabel}</span>
        </footer>
      </article>
    </main>
  );
}
