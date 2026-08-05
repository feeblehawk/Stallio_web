import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'
import StallioStoreUI from './StallioStoreUI'
import { easePremium } from '../../utils/motionVariants'

const instagramMessages = [
  'How much?',
  'Is this available?',
  'How can I order?',
  'Delivery to Lahore?',
]

const whatsappMessages = [
  'Price?',
  'COD available?',
  'What sizes?',
]

// ─── Chat bubble ──────────────────────────────────────────────────────────────
const ChatBubble = ({ text, align = 'left' }) => (
  <div className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
    <div
      className="max-w-[85%] px-3 py-2 text-[10px] leading-relaxed sm:text-[11px]"
      style={{
        background:
          align === 'right'
            ? 'color-mix(in oklch, var(--primary) 10%, var(--surface))'
            : 'var(--surface-muted)',
        color: 'var(--foreground)',
        borderRadius:
          align === 'right'
            ? '1rem 1rem 0.25rem 1rem'
            : '1rem 1rem 1rem 0.25rem',
        border: '1px solid var(--border)',
        boxShadow: '0 1px 3px color-mix(in oklch, var(--foreground) 5%, transparent)',
      }}
    >
      {text}
    </div>
  </div>
)

// ─── Chat panel ───────────────────────────────────────────────────────────────
const ChatPanel = ({ title, messages, align = 'left', icon }) => (
  <div
    className="isolate rounded-2xl border p-4 sm:p-5"
    style={{
      background: 'color-mix(in oklch, var(--surface) 82%, white 18%)',
      borderColor: 'color-mix(in oklch, var(--border) 70%, white 12%)',
      boxShadow: '0 28px 64px color-mix(in oklch, var(--foreground) 20%, transparent)',
      borderWidth: '1.6px',
    }}
  >
    <div className="mb-4 flex items-center gap-2">
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
        style={{
          background:
            title === 'Instagram'
              ? 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)'
              : 'linear-gradient(135deg, #25d366, #128c7e)',
          color: 'white',
        }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-semibold sm:text-xs" style={{ color: 'var(--foreground)' }}>
          {title}
        </div>
        <div className="text-[8px] sm:text-[9px]" style={{ color: 'var(--muted-foreground)' }}>
          Customer messages
        </div>
      </div>
    </div>
    <div className="space-y-2">
      {messages.map((msg) => (
        <ChatBubble key={msg} text={msg} align={align} />
      ))}
    </div>
  </div>
)

// ─── Mobile: 3-card swipe story ───────────────────────────────────────────────
const STORY_CARDS = [
  { id: 'instagram', label: 'Before', tag: 'Instagram DMs' },
  { id: 'stallio',   label: 'Then',   tag: 'Stallio connects it' },
  { id: 'store',     label: 'After',  tag: 'Your store' },
]

const MobileStorySwiper = ({ reducedMotion }) => {
  const [active, setActive] = useState(0)
  const [autoPlaying, setAutoPlaying] = useState(true)
  const trackRef = useRef(null)
  const timerRef = useRef(null)

  // Auto-advance
  useEffect(() => {
    if (!autoPlaying || reducedMotion) return
    timerRef.current = setInterval(() => {
      setActive(prev => (prev < STORY_CARDS.length - 1 ? prev + 1 : prev))
    }, 3200)
    return () => clearInterval(timerRef.current)
  }, [autoPlaying, reducedMotion])

  const goTo = useCallback((idx) => {
    setActive(idx)
    setAutoPlaying(false)
    // Scroll the snap container
    if (trackRef.current) {
      const card = trackRef.current.children[idx]
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [])

  // Sync scroll position → active dot
  const handleScroll = useCallback(() => {
    if (!trackRef.current) return
    const el = trackRef.current
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    setActive(idx)
  }, [])

  return (
    <div className="md:hidden">
      {/* Label above card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="mb-3 flex items-center justify-between px-1"
          initial={reducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: easePremium }}
        >
          <span
            className="text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: 'var(--primary)' }}
          >
            {STORY_CARDS[active].label}
          </span>
          <span
            className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold"
            style={{
              color: 'var(--muted-foreground)',
              borderColor: 'var(--border)',
              background: 'var(--surface-muted)',
            }}
          >
            {STORY_CARDS[active].tag}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Snap scroll track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          gap: '12px',
          paddingLeft: '1px',
          paddingRight: '1px',
        }}
      >
        {/* Card 1 — Instagram chaos */}
        <div
          className="w-[min(80vw,280px)] shrink-0 snap-center rounded-2xl border p-5"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: '0 8px 32px color-mix(in oklch, var(--foreground) 8%, transparent)',
          }}
        >
          <div className="mb-4 flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)' }}
            >
              𝕀
            </div>
            <div>
              <div className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>Instagram DMs</div>
              <div className="text-[9px]" style={{ color: 'var(--muted-foreground)' }}>4 unanswered questions</div>
            </div>
            <div
              className="ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold"
              style={{ background: '#ef4444', color: 'white' }}
            >
              4
            </div>
          </div>
          <div className="space-y-2.5">
            {instagramMessages.map((msg, i) => (
              <motion.div
                key={msg}
                initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12, duration: 0.4, ease: easePremium }}
              >
                <ChatBubble text={msg} align="left" />
              </motion.div>
            ))}
          </div>
          <div
            className="mt-4 rounded-xl border px-3 py-2.5 text-[11px] leading-relaxed"
            style={{
              background: 'color-mix(in oklch, #ef4444 6%, var(--surface-muted))',
              borderColor: 'color-mix(in oklch, #ef4444 18%, var(--border))',
              color: 'var(--muted-foreground)',
            }}
          >
            😅 You're replying to the same questions all day.
          </div>
        </div>

        {/* Card 2 — Stallio in the middle */}
        <div
          className="w-[min(80vw,280px)] shrink-0 snap-center rounded-2xl border p-5"
          style={{
            background: 'var(--surface)',
            borderColor: 'color-mix(in oklch, var(--primary) 25%, var(--border))',
            boxShadow: '0 8px 32px color-mix(in oklch, var(--primary) 12%, transparent)',
          }}
        >
          <div className="flex flex-col items-center justify-center py-4 gap-5">
            {/* Stallio node */}
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl border font-heading text-[10px] font-extrabold tracking-[0.2em]"
              style={{
                background: 'color-mix(in oklch, var(--primary) 10%, var(--surface))',
                borderColor: 'color-mix(in oklch, var(--primary) 40%, var(--border))',
                color: 'var(--primary)',
                boxShadow: '0 0 32px color-mix(in oklch, var(--primary) 20%, transparent)',
              }}
            >
              STALLIO
            </div>

            {/* Two platform pills */}
            <div className="flex w-full items-center gap-2">
              <div
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[10px] font-semibold"
                style={{
                  background: 'var(--surface-muted)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                }}
              >
                <span className="text-xs">𝕀</span> Instagram
              </div>
              <svg viewBox="0 0 20 10" className="h-3 w-4 shrink-0" aria-hidden="true">
                <path d="M0 5h18M14 1l4 4-4 4" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <div
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[10px] font-semibold"
                style={{
                  background: 'var(--surface-muted)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                }}
              >
                <span className="text-xs">W</span> WhatsApp
              </div>
            </div>

            <p className="text-center text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              All your DM chaos funnelled into{' '}
              <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                one organised store.
              </span>
            </p>

            {/* Link pill */}
            <div
              className="flex w-full items-center justify-between rounded-xl border px-3 py-2.5"
              style={{
                background: 'color-mix(in oklch, var(--primary) 8%, var(--surface))',
                borderColor: 'color-mix(in oklch, var(--primary) 25%, var(--border))',
              }}
            >
              <span className="text-[11px] font-medium" style={{ color: 'var(--muted-foreground)' }}>
                stallio.shop/<span className="font-bold" style={{ color: 'var(--primary)' }}>yourbrand</span>
              </span>
              <span
                className="text-[9px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--primary)' }}
              >
                Live ↗
              </span>
            </div>
          </div>
        </div>

        {/* Card 3 — Store UI */}
        <div
          className="w-[min(80vw,280px)] shrink-0 snap-center rounded-2xl border overflow-hidden"
          style={{
            background: 'var(--surface)',
            borderColor: 'color-mix(in oklch, var(--primary) 20%, var(--border))',
            boxShadow: '0 8px 32px color-mix(in oklch, var(--foreground) 10%, transparent)',
          }}
        >
          <StallioStoreUI variant="store" />

          <div
            className="border-t px-4 py-3"
            style={{
              borderColor: 'var(--border)',
              background: 'color-mix(in oklch, var(--primary) 6%, var(--surface-muted))',
            }}
          >
            <p className="text-center text-[11px] font-semibold" style={{ color: 'var(--primary)' }}>
              ✓ Customers browse, order, and pay — no DMs
            </p>
          </div>
        </div>
      </div>

      {/* Dot nav */}
      <div className="mt-5 flex justify-center gap-2">
        {STORY_CARDS.map((card, i) => (
          <button
            key={card.id}
            onClick={() => goTo(i)}
            aria-label={`Go to ${card.tag}`}
            className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2"
            style={{
              width: active === i ? '20px' : '6px',
              height: '6px',
              background: active === i ? 'var(--primary)' : 'color-mix(in oklch, var(--primary) 25%, var(--border))',
            }}
          />
        ))}
      </div>

      {/* Swipe hint — only shows on first load */}
      <p className="mt-3 text-center text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
        Swipe to explore →
      </p>
    </div>
  )
}

// ─── Desktop (unchanged scroll animation) ─────────────────────────────────────
const DmStoreTransform = () => {
  const containerRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const instagramX = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0.12, 0.55],
    reducedMotion ? [0, 0] : [0, 115],
  )
  const whatsappX = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0.15, 0.58],
    reducedMotion ? [0, 0] : [0, -115],
  )
  const chatOpacity = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0, 0.45, 0.85],
    reducedMotion ? [1, 1] : [1, 1, 1],
  )
  const igLineDraw = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0.12, 0.52],
    reducedMotion ? [1, 1] : [0, 1],
  )
  const waLineDraw = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0.16, 0.56],
    reducedMotion ? [1, 1] : [0, 1],
  )
  const igLineOffset = useTransform(igLineDraw, (v) => 1 - v)
  const waLineOffset = useTransform(waLineDraw, (v) => 1 - v)
  const lineOpacity = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0.1, 0.45, 0.65, 0.78],
    reducedMotion ? [0.6, 0.6] : [0.15, 0.8, 0.8, 0.15],
  )
  const nodeScale = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0, 0.45, 0.65, 0.78],
    reducedMotion ? [1, 1] : [1, 1, 1.2, 1.12],
  )
  const nodeOpacity = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0, 0.18, 0.65, 0.78],
    reducedMotion ? [1, 1] : [0, 1, 1, 1],
  )
  const nodeGlowProgress = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0.42, 0.68],
    reducedMotion ? [0, 0] : [0, 1],
  )
  const storeOpacityRaw = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0.15, 0.40],
    reducedMotion ? [1, 1] : [0, 1],
  )
  const storeScaleRaw = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0.15, 0.40],
    reducedMotion ? [1, 1] : [0.95, 1],
  )
  const storeYRaw = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0.15, 0.40],
    reducedMotion ? [0, 0] : [90, 0],
  )
  const storeOpacity = useSpring(storeOpacityRaw, { stiffness: 100, damping: 15 })
  const storeScale = useSpring(storeScaleRaw, { stiffness: 100, damping: 15 })
  const storeY = useSpring(storeYRaw, { stiffness: 100, damping: 15 })
  const nodeBorderColor = useTransform(
    nodeGlowProgress,
    [0, 1],
    [
      'color-mix(in oklch, var(--primary) 28%, var(--border))',
      'color-mix(in oklch, var(--primary) 65%, var(--border))',
    ],
  )
  const nodeBoxShadow = useTransform(
    nodeGlowProgress,
    [0, 1],
    [
      '0 8px 24px color-mix(in oklch, var(--primary) 8%, transparent)',
      '0 0 0 8px color-mix(in oklch, var(--primary) 8%, transparent), 0 20px 64px color-mix(in oklch, var(--primary) 28%, transparent)',
    ],
  )

  return (
    <section
      ref={containerRef}
      aria-labelledby="dm-store-heading"
      className="relative border-b"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      <div className={reducedMotion ? 'py-24 sm:py-28' : 'py-16 md:min-h-[170vh] md:py-0'}>
        <div
          className={`${reducedMotion ? '' : 'md:sticky md:top-0 md:min-h-screen'} flex flex-col justify-center`}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Section header */}
            <div className="mx-auto mb-10 max-w-2xl text-center pt-10 sm:pt-14 sm:mb-14">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: 'var(--primary)' }}
              >
                From DMs to Store
              </span>
              <h2
                id="dm-store-heading"
                className="mt-4 font-heading font-extrabold tracking-[-0.045em]"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  lineHeight: 1.05,
                  color: 'var(--foreground)',
                }}
              >
                From scattered DMs to one organized store.
              </h2>
              <p className="mt-5 text-base leading-7" style={{ color: 'var(--muted-foreground)' }}>
                Keep using chat apps customers already love while giving them a polished online storefront.
              </p>
            </div>

            {/* ── Mobile swipe story ─────────────────────────────────────────── */}
            <MobileStorySwiper reducedMotion={reducedMotion} />

            {/* ── Desktop scroll animation (unchanged) ──────────────────────── */}
            <div className="relative hidden min-h-[640px] md:block lg:min-h-[740px]">

              {/* Instagram */}
              <motion.div
                className="absolute left-0 top-[14%] w-[26%] max-w-[240px]"
                style={{ x: instagramX, opacity: chatOpacity }}
              >
                <ChatPanel title="Instagram" messages={instagramMessages} icon="𝕀" />
              </motion.div>

              {/* WhatsApp */}
              <motion.div
                className="absolute right-0 top-[14%] w-[26%] max-w-[240px]"
                style={{ x: whatsappX, opacity: chatOpacity }}
              >
                <ChatPanel title="WhatsApp" messages={whatsappMessages} align="right" icon="W" />
              </motion.div>

              {/* SVG connection lines */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 800 620"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>
                  <filter id="line-glow-dm" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="ig-grad-dm" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="wa-grad-dm" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                <motion.path
                  d="M 216 250 C 288 205, 332 205, 400 272"
                  fill="none" stroke="url(#ig-grad-dm)" strokeWidth="2.5"
                  filter="url(#line-glow-dm)" pathLength={1}
                  style={{ strokeDasharray: 1, strokeDashoffset: igLineOffset, opacity: lineOpacity }}
                />
                <motion.path
                  d="M 216 250 C 288 205, 332 205, 400 272"
                  fill="none" stroke="url(#ig-grad-dm)" strokeWidth="1.5"
                  pathLength={1}
                  style={{ strokeDasharray: 1, strokeDashoffset: igLineOffset, opacity: lineOpacity }}
                />
                <motion.path
                  d="M 584 250 C 512 205, 468 205, 400 272"
                  fill="none" stroke="url(#wa-grad-dm)" strokeWidth="2.5"
                  filter="url(#line-glow-dm)" pathLength={1}
                  style={{ strokeDasharray: 1, strokeDashoffset: waLineOffset, opacity: lineOpacity }}
                />
                <motion.path
                  d="M 584 250 C 512 205, 468 205, 400 272"
                  fill="none" stroke="url(#wa-grad-dm)" strokeWidth="1.5"
                  pathLength={1}
                  style={{ strokeDasharray: 1, strokeDashoffset: waLineOffset, opacity: lineOpacity }}
                />

                <motion.circle r="4" fill="var(--primary)" style={{ opacity: lineOpacity }}>
                  <animateMotion dur="1.5s" repeatCount="indefinite"
                    path="M 216 250 C 288 205, 332 205, 400 272" />
                </motion.circle>
                <motion.circle r="4" fill="var(--primary)" style={{ opacity: lineOpacity }}>
                  <animateMotion dur="1.5s" begin="0.9s" repeatCount="indefinite"
                    path="M 584 250 C 512 205, 468 205, 400 272" />
                </motion.circle>
              </svg>

              {/* Central STALLIO node */}
              <motion.div
                className="absolute left-1/2 top-[38%] z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ scale: nodeScale, opacity: nodeOpacity }}
              >
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border font-heading text-[10px] font-extrabold tracking-[0.2em] sm:h-20 sm:w-20 sm:text-xs"
                  style={{
                    background: 'color-mix(in oklch, var(--primary) 8%, var(--surface))',
                    borderColor: nodeBorderColor,
                    color: 'var(--primary)',
                    boxShadow: nodeBoxShadow,
                  }}
                >
                  STALLIO
                </motion.div>
              </motion.div>

              {/* Store UI card */}
              <motion.div
                className="absolute left-1/2 top-[69%] z-20 w-[min(400px,46%)] max-w-[400px] -translate-x-1/2 -translate-y-1/2"
                style={{ opacity: storeOpacity, scale: storeScale, y: storeY }}
              >
                <div
                  className="overflow-visible rounded-[2rem] border"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'color-mix(in oklch, var(--primary) 20%, var(--border))',
                    boxShadow:
                      '0 24px 70px color-mix(in oklch, var(--foreground) 12%, transparent), 0 0 0 1px color-mix(in oklch, var(--primary) 8%, transparent)',
                  }}
                >
                  <div className="flex flex-col">
                    <StallioStoreUI variant="store" />
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default DmStoreTransform