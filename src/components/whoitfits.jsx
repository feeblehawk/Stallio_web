import { useState, useRef, useEffect, useCallback } from 'react'

/* ─── Persona data ─── */
const personas = [
  {
    id: 'starting-out',
    label: 'Starting out',
    headline: 'Your first store, ready in minutes.',
    body: 'No domain, no hosting, no developer needed. Add your products, customise your store, and share your link — Stallio handles everything else so you can focus on selling.',
    accent: '268',
    screenItems: [
      { type: 'step', icon: 'plus-circle', label: 'Add products', done: true },
      { type: 'step', icon: 'palette', label: 'Pick a theme', done: true },
      { type: 'step', icon: 'share', label: 'Share your link', done: false, active: true },
      { type: 'metric', label: 'Store visits today', value: '—', new: true },
    ],
  },
  {
    id: 'social-seller',
    label: 'Social seller',
    headline: 'From DMs to done deals.',
    body: 'Stop copy-pasting prices into every message. Send customers to your Stallio store, let them browse and order, and keep track of it all from one simple dashboard.',
    accent: '260',
    screenItems: [
      { type: 'message', platform: 'IG', text: 'How much for the floral set?', time: '2m' },
      { type: 'message', platform: 'WA', text: 'Do you ship to Karachi?', time: '5m' },
      { type: 'link', label: 'Your store link', url: 'stallio.shop/nour' },
      { type: 'metric', label: 'Orders this week', value: '14', trend: '+3' },
    ],
  },
  {
    id: 'growing',
    label: 'Growing business',
    headline: 'Scale without the chaos.',
    body: 'Manage a growing product catalogue, track every order, and understand your customers — all from a single, clean interface that grows with your business.',
    accent: '272',
    screenItems: [
      { type: 'order', id: '#1042', item: 'Linen Set · S', status: 'Pending', statusColor: 'amber' },
      { type: 'order', id: '#1041', item: 'Silk Blouse · M', status: 'Shipped', statusColor: 'green' },
      { type: 'order', id: '#1040', item: 'Wide Leg · L', status: 'Delivered', statusColor: 'green' },
      { type: 'metric', label: 'Monthly revenue', value: '₨ 84k', trend: '+22%' },
    ],
  },
]

/* ─── Mini product UI panel ─── */
const PersonaScreen = ({ persona, visible }) => {
  const items = persona.screenItems
  return (
    <div
      className="absolute inset-0 flex flex-col gap-2 p-3 overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      aria-hidden={!visible}
    >
      {items.map((item, i) => {
        if (item.type === 'step') {
          return (
            <div key={i} className="flex items-center gap-2.5 rounded-lg px-3 py-2"
              style={{
                background: item.active
                  ? `color-mix(in oklch, oklch(0.58 0.18 ${persona.accent}) 10%, transparent)`
                  : 'oklch(0.94 0.006 250)',
                border: item.active ? `1px solid color-mix(in oklch, oklch(0.58 0.18 ${persona.accent}) 25%, transparent)` : '1px solid transparent',
              }}>
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                style={{ background: item.done || item.active ? `oklch(0.58 0.18 ${persona.accent})` : 'oklch(0.84 0.006 250)' }}>
                {item.done && !item.active ? (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: item.active ? 'white' : 'transparent' }} />
                )}
              </div>
              <span className="text-[10px] font-semibold" style={{ color: item.active ? `oklch(0.38 0.18 ${persona.accent})` : 'oklch(0.32 0.02 260)' }}>
                {item.label}
              </span>
              {item.active && (
                <span className="ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: `oklch(0.58 0.18 ${persona.accent})`, color: 'white' }}>
                  Next
                </span>
              )}
            </div>
          )
        }
        if (item.type === 'message') {
          return (
            <div key={i} className="flex items-start gap-2 rounded-lg px-3 py-2" style={{ background: 'oklch(0.94 0.006 250)' }}>
              <span className="mt-0.5 shrink-0 text-[8px] font-bold rounded px-1 py-0.5"
                style={{ background: `oklch(0.58 0.18 ${persona.accent})`, color: 'white' }}>
                {item.platform}
              </span>
              <span className="text-[9px] leading-snug flex-1" style={{ color: 'oklch(0.32 0.02 260)' }}>{item.text}</span>
              <span className="shrink-0 text-[8px]" style={{ color: 'oklch(0.62 0.015 260)' }}>{item.time}</span>
            </div>
          )
        }
        if (item.type === 'link') {
          return (
            <div key={i} className="flex items-center gap-2 rounded-lg px-3 py-2.5"
              style={{
                background: `color-mix(in oklch, oklch(0.58 0.18 ${persona.accent}) 8%, white)`,
                border: `1px dashed color-mix(in oklch, oklch(0.58 0.18 ${persona.accent}) 30%, transparent)`,
              }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={`oklch(0.52 0.18 ${persona.accent})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              <span className="text-[9px] font-semibold flex-1" style={{ color: `oklch(0.42 0.18 ${persona.accent})` }}>{item.url}</span>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={`oklch(0.52 0.18 ${persona.accent})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </div>
          )
        }
        if (item.type === 'order') {
          const statusColors = {
            amber: { bg: 'oklch(0.96 0.06 80)', text: 'oklch(0.5 0.16 60)' },
            green: { bg: 'oklch(0.94 0.06 145)', text: 'oklch(0.42 0.15 145)' },
          }
          const sc = statusColors[item.statusColor]
          return (
            <div key={i} className="flex items-center gap-2.5 rounded-lg px-3 py-2" style={{ background: 'oklch(0.94 0.006 250)' }}>
              <span className="text-[9px] font-bold" style={{ color: 'oklch(0.52 0.02 260)' }}>{item.id}</span>
              <span className="text-[9px] flex-1 truncate" style={{ color: 'oklch(0.32 0.02 260)' }}>{item.item}</span>
              <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.text }}>
                {item.status}
              </span>
            </div>
          )
        }
        if (item.type === 'metric') {
          return (
            <div key={i} className="mt-auto flex items-center justify-between rounded-xl px-3 py-2.5"
              style={{
                background: `color-mix(in oklch, oklch(0.58 0.18 ${persona.accent}) 10%, white)`,
                border: `1px solid color-mix(in oklch, oklch(0.58 0.18 ${persona.accent}) 18%, transparent)`,
              }}>
              <span className="text-[9px]" style={{ color: 'oklch(0.5 0.02 260)' }}>{item.label}</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[14px] font-extrabold" style={{ color: `oklch(0.38 0.18 ${persona.accent})`, fontFamily: 'var(--font-heading)' }}>
                  {item.value}
                </span>
                {item.trend && (
                  <span className="text-[8px] font-bold" style={{ color: 'oklch(0.45 0.15 145)' }}>{item.trend}</span>
                )}
                {item.new && (
                  <span className="text-[8px] font-semibold px-1 py-0.5 rounded" style={{ background: `oklch(0.58 0.18 ${persona.accent})`, color: 'white' }}>Start</span>
                )}
              </div>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

/* ─── Central product panel (phone-like) ─── */
const CentralPanel = ({ active }) => (
  <div className="relative mx-auto"
    style={{
      width: 'min(200px, 56vw)',
      aspectRatio: '9 / 17',
    }}
    aria-hidden="true"
  >
    {/* Phone shell */}
    <div className="absolute inset-0 rounded-[2.2rem] overflow-hidden"
      style={{
        background: 'oklch(0.14 0.015 260)',
        boxShadow: `0 0 0 1.5px oklch(0.28 0.02 260), 0 24px 64px oklch(0.10 0.02 260 / 0.45), 0 6px 24px oklch(0.10 0.02 260 / 0.25)`,
      }}>
      <div className="absolute inset-[2.5px] rounded-[1.9rem] overflow-hidden"
        style={{ background: 'oklch(0.97 0.006 268)' }}>
        {/* Dynamic island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-10 rounded-full"
          style={{ width: 54, height: 11, background: 'oklch(0.12 0.01 260)' }} />

        {/* Store top bar */}
        <div className="absolute inset-x-0 top-0 pt-8 pb-2 px-3 z-10"
          style={{ background: 'oklch(0.97 0.006 268)', borderBottom: '1px solid oklch(0.92 0.006 250)' }}>
          <div className="font-heading text-[10px] font-bold text-center truncate"
            style={{ color: 'oklch(0.18 0.02 260)' }}>
            Nour's Boutique
          </div>
        </div>

        {/* Scrollable persona screens */}
        <div className="absolute inset-0 pt-[52px] pb-3">
          {personas.map((p, i) => (
            <PersonaScreen key={p.id} persona={p} visible={active === i} />
          ))}
        </div>
      </div>
    </div>

    {/* Glow */}
    <div className="absolute inset-x-6 -bottom-6 h-12 -z-10 rounded-full transition-all duration-500"
      style={{
        background: `oklch(0.58 0.18 ${personas[active].accent})`,
        filter: 'blur(28px)',
        opacity: 0.18,
      }} />
  </div>
)

/* ─── WhoItFits ─── */
const WhoItFits = () => {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  // Touch swipe state
  const touchStartX = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) {
      if (dx < 0) setActive((a) => Math.min(a + 1, personas.length - 1))
      else setActive((a) => Math.max(a - 1, 0))
    }
    touchStartX.current = null
  }

  const next = useCallback(() => setActive(a => Math.min(a + 1, personas.length - 1)), [])
  const prev = useCallback(() => setActive(a => Math.max(a - 1, 0)), [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="who-fits-heading"
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'clamp(80px, 12vw, 128px)',
        paddingBottom: 'clamp(80px, 12vw, 128px)',
        background: 'var(--surface-muted)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: 'var(--primary)', opacity: 0.03, filter: 'blur(100px)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div
          className="text-center mb-12 lg:mb-16 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary)' }}>
            Who it's for
          </span>
          <h2
            id="who-fits-heading"
            className="font-heading font-extrabold tracking-tight"
            style={{
              fontSize: 'clamp(1.9rem, 4.5vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: 'var(--foreground)',
            }}
          >
            Built for the way you sell.
          </h2>
        </div>

        {/* Main interactive layout */}
        <div
          className="transition-all duration-700 delay-150"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          {/* Selector tabs */}
          <div className="flex justify-center mb-10" role="tablist" aria-label="Seller personas">
            <div className="flex rounded-2xl p-1 gap-1"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 12px oklch(0 0 0 / 0.05)',
              }}>
              {personas.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={`panel-${p.id}`}
                  id={`tab-${p.id}`}
                  onClick={() => setActive(i)}
                  className="relative rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-250 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring select-none"
                  style={{
                    color: active === i ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                    background: active === i ? 'var(--primary)' : 'transparent',
                    boxShadow: active === i ? '0 2px 8px color-mix(in oklch, var(--primary) 30%, transparent)' : 'none',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content area: desktop = side-by-side, mobile = stacked */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

            {/* Left: text content */}
            <div className="flex-1 min-w-0 text-center lg:text-left order-2 lg:order-1">
              {personas.map((p, i) => (
                <div
                  key={p.id}
                  id={`panel-${p.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${p.id}`}
                  style={{
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    position: active === i ? 'relative' : 'absolute',
                    pointerEvents: active === i ? 'auto' : 'none',
                  }}
                >
                  <h3
                    className="font-heading font-extrabold tracking-tight"
                    style={{
                      fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                      lineHeight: 1.12,
                      letterSpacing: '-0.02em',
                      color: 'var(--foreground)',
                    }}
                  >
                    {p.headline}
                  </h3>
                  <p className="mt-4 leading-relaxed max-w-md mx-auto lg:mx-0"
                    style={{ color: 'var(--muted-foreground)', fontSize: '1.0rem' }}>
                    {p.body}
                  </p>
                  <a
                    href="/features"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded"
                    style={{ color: 'var(--primary)' }}
                    aria-label={`Learn more about Stallio for ${p.label}`}
                  >
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              ))}
            </div>

            {/* Right: central phone panel */}
            <div className="flex-shrink-0 order-1 lg:order-2">
              <CentralPanel active={active} />
            </div>

            {/* Mobile: arrow nav */}
            <div className="flex items-center gap-4 order-3 lg:hidden">
              <button
                onClick={prev}
                disabled={active === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-30"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)', background: 'var(--surface)' }}
                aria-label="Previous persona"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <div className="flex gap-1.5">
                {personas.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className="h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2"
                    style={{
                      width: active === i ? 20 : 6,
                      background: active === i ? 'var(--primary)' : 'var(--border)',
                    }}
                    aria-label={`Go to ${personas[i].label}`}
                    aria-current={active === i ? 'true' : undefined}
                  />
                ))}
              </div>
              <button
                onClick={next}
                disabled={active === personas.length - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-30"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)', background: 'var(--surface)' }}
                aria-label="Next persona"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop: dot indicators only */}
          <div className="hidden lg:flex justify-center mt-8 gap-2" aria-hidden="true">
            {personas.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-ring"
                style={{
                  width: active === i ? 20 : 6,
                  background: active === i ? 'var(--primary)' : 'var(--border)',
                }}
                aria-label={`View ${personas[i].label}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoItFits