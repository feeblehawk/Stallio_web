import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PrimaryCTA from './PrimaryCTA'

/* ─── Inline Phone UI — a minimal Stallio storefront preview ─── */
const PhoneUI = () => (
  <div
    className="absolute inset-0 overflow-hidden"
    style={{ borderRadius: 'inherit', fontFamily: 'var(--font-sans)' }}
    aria-hidden="true"
  >
    {/* Status bar */}
    <div className="flex items-center justify-between px-5 pt-3 pb-1" style={{ background: 'oklch(0.97 0.006 268)' }}>
      <span className="text-[9px] font-semibold" style={{ color: 'oklch(0.25 0.02 260)' }}>9:41</span>
      <div className="flex items-center gap-1">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ color: 'oklch(0.25 0.02 260)' }}>
          <rect x="0" y="2" width="2" height="6" rx="0.5" fill="currentColor" opacity="0.4"/>
          <rect x="3" y="1.5" width="2" height="6.5" rx="0.5" fill="currentColor" opacity="0.6"/>
          <rect x="6" y="0.5" width="2" height="7.5" rx="0.5" fill="currentColor" opacity="0.8"/>
          <rect x="9" y="0" width="2" height="8" rx="0.5" fill="currentColor"/>
        </svg>
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" style={{ color: 'oklch(0.25 0.02 260)' }}>
          <rect x="1" y="1" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1"/>
          <rect x="2" y="2" width="5" height="4" rx="0.5" fill="currentColor"/>
          <rect x="9" y="2.5" width="1" height="3" rx="0.5" fill="currentColor" opacity="0.5"/>
        </svg>
      </div>
    </div>

    {/* Store header */}
    <div className="px-4 pt-3 pb-3" style={{ background: 'oklch(0.97 0.006 268)' }}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-[11px] font-bold tracking-tight" style={{ color: 'oklch(0.15 0.02 260)', fontFamily: 'var(--font-heading)' }}>Sweet Cravings Studio</div>
          <div className="text-[8px] mt-0.5" style={{ color: 'oklch(0.52 0.02 260)' }}>Bakes · Karachi</div>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-5 w-5 rounded-full flex items-center justify-center" style={{ background: 'var(--primary)', opacity: 0.1 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: 'oklch(0.92 0.006 250)' }}>
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="oklch(0.52 0.02 260)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span className="text-[8px]" style={{ color: 'oklch(0.62 0.015 260)' }}>Search treats…</span>
      </div>
    </div>

    {/* Category pills */}
    <div className="flex gap-1.5 px-4 py-2 overflow-x-hidden" style={{ background: 'oklch(0.97 0.006 268)' }}>
      {['All', 'Cakes', 'Boxes', 'Cookies'].map((cat, i) => (
        <span key={cat} className="shrink-0 px-2 py-0.5 rounded-full text-[7px] font-semibold whitespace-nowrap"
          style={{
            background: i === 0 ? 'var(--primary)' : 'oklch(0.92 0.006 250)',
            color: i === 0 ? 'white' : 'oklch(0.4 0.02 260)',
          }}>
          {cat}
        </span>
      ))}
    </div>

    {/* Scrollable product grid */}
    <div className="px-3 pb-3 overflow-hidden" style={{ background: 'oklch(0.97 0.006 268)', flex: 1 }}>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: 'Signature Box', price: '₨ 1,800', tag: 'New', hue: '280', l: '0.88' },
          { name: 'Mini Tart', price: '₨ 950', tag: null, hue: '250', l: '0.82' },
          { name: 'Gift Box', price: '₨ 2,400', tag: 'Best', hue: '268', l: '0.86' },
          { name: 'Cookie Jar', price: '₨ 1,200', tag: null, hue: '240', l: '0.84' },
        ].map((p) => (
          <div key={p.name} className="rounded-xl overflow-hidden" style={{ background: 'oklch(1 0 0)', boxShadow: '0 1px 4px oklch(0 0 0 / 0.06)' }}>
            {/* Product image placeholder */}
            <div className="relative h-[52px] flex items-center justify-center"
              style={{ background: `oklch(${p.l} 0.04 ${p.hue})` }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={`oklch(0.46 0.12 ${p.hue})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
                <path d="M8 2h8l2 6-2 6H8L6 8l2-6z"/>
                <path d="M6 8h12"/>
                <path d="M8 14h8"/>
              </svg>
              {p.tag && (
                <span className="absolute top-1 left-1 px-1 py-0.5 rounded text-[6px] font-bold uppercase tracking-wide"
                  style={{ background: 'var(--primary)', color: 'white' }}>
                  {p.tag}
                </span>
              )}
            </div>
            <div className="px-1.5 py-1.5">
              <div className="text-[8px] font-semibold truncate" style={{ color: 'oklch(0.18 0.02 260)' }}>{p.name}</div>
              <div className="text-[7px] mt-0.5 font-bold" style={{ color: 'var(--primary)' }}>{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom nav */}
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-2 py-2 border-t"
      style={{ background: 'oklch(1 0 0 / 0.92)', backdropFilter: 'blur(12px)', borderColor: 'oklch(0.92 0.006 250)' }}>
      {[
        { icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', active: true },
        { icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', active: false },
        { icon: 'M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', active: false },
        { icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', active: false },
      ].map((item, i) => (
        <button key={i} className="flex flex-col items-center justify-center p-1.5 rounded-lg"
          style={{ color: item.active ? 'var(--primary)' : 'oklch(0.62 0.015 260)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={item.active ? '2.5' : '2'} strokeLinecap="round" strokeLinejoin="round">
            <path d={item.icon}/>
          </svg>
        </button>
      ))}
    </div>
  </div>
)

/* ─── Phone Frame ─── */
const PhoneMockup = () => (
  <div
    className="relative mx-auto"
    style={{
      width: 'min(240px, 62vw)',
      aspectRatio: '9/19.5',
    }}
    aria-label="Stallio storefront preview on mobile"
    role="img"
  >
    {/* Outer frame */}
    <div className="absolute inset-0 rounded-[2.8rem] overflow-hidden"
      style={{
        background: 'oklch(0.14 0.015 260)',
        boxShadow: `
          0 0 0 1.5px oklch(0.30 0.02 260),
          0 0 0 3px oklch(0.20 0.015 260),
          0 32px 80px oklch(0.10 0.02 260 / 0.55),
          0 8px 32px oklch(0.10 0.02 260 / 0.30),
          inset 0 1px 0 oklch(0.40 0.02 260 / 0.3)
        `,
      }}
    >
      {/* Screen bezel */}
      <div className="absolute inset-[3px] rounded-[2.4rem] overflow-hidden"
        style={{ background: 'oklch(0.97 0.006 268)' }}>
        {/* Dynamic island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 rounded-full"
          style={{ width: 68, height: 14, background: 'oklch(0.12 0.01 260)' }} />

        {/* App content */}
        <div className="absolute inset-0 pt-7 overflow-hidden flex flex-col">
          <PhoneUI />
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute left-[-2px] top-[28%] w-[3px] h-8 rounded-l-sm"
        style={{ background: 'oklch(0.22 0.015 260)' }} />
      <div className="absolute left-[-2px] top-[38%] w-[3px] h-6 rounded-l-sm"
        style={{ background: 'oklch(0.22 0.015 260)' }} />
      <div className="absolute right-[-2px] top-[32%] w-[3px] h-12 rounded-r-sm"
        style={{ background: 'oklch(0.22 0.015 260)' }} />
    </div>

    {/* Subtle glow behind phone */}
    <div className="absolute inset-x-8 -bottom-8 h-16 -z-10 rounded-full"
      style={{
        background: 'var(--primary)',
        filter: 'blur(32px)',
        opacity: 0.18,
      }} />
  </div>
)

/* ─── Trust badge row ─── */
const TrustBadge = ({ icon, text }) => (
  <div className="flex items-center gap-1.5">
    <span style={{ color: 'var(--primary)' }}>{icon}</span>
    <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{text}</span>
  </div>
)

/* ─── Hero ─── */
const Hero = () => {
  const heroRef = useRef(null)
  const phoneRef = useRef(null)
  const contentRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Subtle scroll parallax on phone
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const handleScroll = () => {
      if (!phoneRef.current) return
      const scrollY = window.scrollY
      const parallax = scrollY * 0.08
      phoneRef.current.style.transform = `translateY(${parallax}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const transBase = 'transition-all duration-700 ease-out'
  const hiddenContent = 'opacity-0 translate-y-5'
  const visibleContent = 'opacity-100 translate-y-0'
  const hiddenPhone = 'opacity-0 scale-95'
  const visiblePhone = 'opacity-100 scale-100'

  return (
    <section
      ref={heroRef}
      aria-label="Hero — Stallio homepage"
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'clamp(64px, 10vw, 112px)',
        paddingBottom: 'clamp(80px, 12vw, 140px)',
      }}
    >
      {/* Subtle ambient background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{ background: 'var(--primary)', opacity: 0.04, filter: 'blur(80px)' }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'var(--primary)', opacity: 0.05, filter: 'blur(100px)' }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile: stacked. Desktop: side by side */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-20">

          {/* ── Left: Content ── */}
          <div
            ref={contentRef}
            className={`flex-1 min-w-0 text-center lg:text-left ${transBase} ${mounted ? visibleContent : hiddenContent}`}
            style={{ transitionDelay: '80ms' }}
          >
            {/* Eyebrow */}
            <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 mb-6 ${transBase}`}
              style={{
                borderColor: 'var(--primary)',
                background: 'color-mix(in oklch, var(--primary) 8%, transparent)',
                transitionDelay: '0ms',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
              }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'var(--primary)' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
                One link. A real storefront.
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-heading font-extrabold tracking-tight"
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
                lineHeight: 1.08,
                color: 'var(--foreground)',
                letterSpacing: '-0.03em',
                transitionDelay: '140ms',
              }}
            >
              Turn your followers<br className="hidden sm:block" />{' '}
              <span style={{ color: 'var(--primary)' }}>into buyers.</span>
            </h1>

            {/* Supporting copy */}
            <p
              className={`mt-5 max-w-lg mx-auto lg:mx-0 leading-relaxed ${transBase}`}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                color: 'var(--muted-foreground)',
                transitionDelay: '200ms',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              Give your customers one polished place to browse, buy, and ask questions — from Instagram and WhatsApp to a truly mobile-first storefront.
            </p>

            {/* CTAs */}
            <div
              className={`mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start ${transBase}`}
              style={{
                transitionDelay: '260ms',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              <PrimaryCTA size="lg" className="text-base" />
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  background: 'var(--surface)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10 8 16 12 10 16 10 8"/>
                </svg>
                See how it works
              </Link>
            </div>

            {/* Trust signals */}
            <div
              className={`mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start ${transBase}`}
              style={{
                transitionDelay: '320ms',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              <TrustBadge
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                text="Free to start"
              />
              <span style={{ color: 'var(--border)' }}>·</span>
              <TrustBadge
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                text="No card required"
              />
              <span style={{ color: 'var(--border)' }}>·</span>
              <TrustBadge
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                text="Live in minutes"
              />
            </div>
          </div>

          {/* ── Right: Phone ── */}
          <div
            className={`flex-shrink-0 flex items-center justify-center w-full lg:w-auto ${transBase}`}
            style={{
              transitionDelay: '180ms',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'scale(1)' : 'scale(0.94)',
            }}
          >
            <div
              ref={phoneRef}
              className="relative"
              style={{
                animation: 'hero-float 5s ease-in-out infinite',
              }}
            >
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes hero-float {
            0%, 100% { transform: none; }
          }
        }
      `}</style>
    </section>
  )
}

export default Hero