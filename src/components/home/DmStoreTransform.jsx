import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'
import StallioStoreUI from './StallioStoreUI'

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
  <div
    className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}
  >
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
        boxShadow:
          '0 1px 3px color-mix(in oklch, var(--foreground) 5%, transparent)',
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
      // stronger, high-contrast surface + clearer border & shadow
      background: 'color-mix(in oklch, var(--surface) 82%, white 18%)',
      borderColor: 'color-mix(in oklch, var(--border) 70%, white 12%)',
      filter: 'none',
      WebkitBackdropFilter: 'none',
      backdropFilter: 'none',
      transform: 'translateZ(0)',
      WebkitTransform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      willChange: 'transform',

      // stronger shadow to make the panel pop out from the dark background
      boxShadow:
        '0 28px 64px color-mix(in oklch, var(--foreground) 20%, transparent)',
      borderWidth: '1.6px',
    }}
  >
    {/* Panel header */}
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
        <div
          className="text-[10px] font-semibold sm:text-xs"
          style={{ color: 'var(--foreground)' }}
        >
          {title}
        </div>

        <div
          className="text-[8px] sm:text-[9px]"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Customer messages
        </div>
      </div>
    </div>

    <div className="space-y-2">
      {messages.map((msg) => (
        <ChatBubble
          key={msg}
          text={msg}
          align={align}
        />
      ))}
    </div>
  </div>
)

const DmStoreTransform = () => {
  const containerRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // ── Chat panel motion ─────────────────────────────────────────────────────

  // Instagram moves toward the center.
  const instagramX = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0.12, 0.55],
    reducedMotion ? [0, 0] : [0, 115],
  )

  // WhatsApp moves toward the center.
  const whatsappX = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0.15, 0.58],
    reducedMotion ? [0, 0] : [0, -115],
  )

  const chatOpacity = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0, 0.45, 0.85],
    reducedMotion ? [1, 1] : [1, 1, 1], // keep panels visible across the scroll range
  )

  
  // ── SVG line drawing ───────────────────────────────────────────────────────

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

  const igLineOffset = useTransform(
    igLineDraw,
    (v) => 1 - v,
  )

  const waLineOffset = useTransform(
    waLineDraw,
    (v) => 1 - v,
  )

  const lineOpacity = useTransform(
    scrollYProgress,
    reducedMotion
      ? [0, 1]
      : [0.1, 0.45, 0.65, 0.78],
    reducedMotion
      ? [0.6, 0.6]
      : [0.15, 0.8, 0.8, 0.15],
  )

  // ── STALLIO node ──────────────────────────────────────────────────────────

  const nodeScale = useTransform(
    scrollYProgress,
    reducedMotion
      ? [0, 1]
      : [0, 0.45, 0.65, 0.78],
    reducedMotion
      ? [1, 1]
      : [1, 1, 1.2, 1.12],
  )

  const nodeOpacity = useTransform(
    scrollYProgress,
    reducedMotion
      ? [0, 1]
      : [0, 0.18, 0.65, 0.78],
    reducedMotion
      ? [1, 1]
      : [0, 1, 1, 1],
  )

  const nodeGlowProgress = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [0.42, 0.68],
    reducedMotion ? [0, 0] : [0, 1],
  )

  // ── Store UI reveal ───────────────────────────────────────────────────────

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

  const storeOpacity = useSpring(
    storeOpacityRaw,
    {
      stiffness: 100,
      damping: 15,
    },
  )

  const storeScale = useSpring(
    storeScaleRaw,
    {
      stiffness: 100,
      damping: 15,
    },
  )

  const storeY = useSpring(
    storeYRaw,
    {
      stiffness: 100,
      damping: 15,
    },
  )

  // ── Node border / glow ───────────────────────────────────────────────────

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
      style={{
        borderColor: 'var(--border)',
        background: 'var(--background)',
      }}
    >
      <div
        className={
          reducedMotion
            ? 'py-24 sm:py-28'
            : 'py-16 md:min-h-[170vh] md:py-0'
        }
      >
        <div
          className={`${
            reducedMotion
              ? ''
              : 'md:sticky md:top-0 md:min-h-screen'
          } flex flex-col justify-center`}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Section header */}
            <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: 'var(--primary)' }}
              >
                The transformation
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
            </div>

            {/* ── Desktop animation canvas ─────────────────────────────────── */}
            <div className="relative hidden min-h-[640px] md:block lg:min-h-[740px]">

              {/* Instagram — left, moves toward center */}
              <motion.div
                className="absolute left-0 top-[14%] w-[26%] max-w-[240px]"
                style={{
                  x: instagramX,
                  opacity: chatOpacity,
                }}
              >
                <ChatPanel
                  title="Instagram"
                  messages={instagramMessages}
                  icon="𝕀"
                />
              </motion.div>

              {/* WhatsApp — right, moves toward center */}
              <motion.div
                className="absolute right-0 top-[14%] w-[26%] max-w-[240px]"
                style={{
                  x: whatsappX,
                  opacity: chatOpacity,
                }}
              >
                <ChatPanel
                  title="WhatsApp"
                  messages={whatsappMessages}
                  align="right"
                  icon="W"
                />
              </motion.div>

              {/* SVG connection lines */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 800 620"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>

                  {/* Subtle glow — reduced to keep the line crisp */}
                  <filter
                    id="line-glow-dm"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur
                      stdDeviation="1.2"
                      result="blur"
                    />

                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <linearGradient
                    id="ig-grad-dm"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--primary)"
                      stopOpacity="0.35"
                    />

                    <stop
                      offset="100%"
                      stopColor="var(--primary)"
                      stopOpacity="0.95"
                    />
                  </linearGradient>

                  <linearGradient
                    id="wa-grad-dm"
                    x1="100%"
                    y1="0%"
                    x2="0%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--primary)"
                      stopOpacity="0.35"
                    />

                    <stop
                      offset="100%"
                      stopColor="var(--primary)"
                      stopOpacity="0.95"
                    />
                  </linearGradient>
                </defs>

                {/* Instagram glow */}
                <motion.path
                  d="M 216 250 C 288 205, 332 205, 400 272"
                  fill="none"
                  stroke="url(#ig-grad-dm)"
                  strokeWidth="2.5"
                  filter="url(#line-glow-dm)"
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: igLineOffset,
                    opacity: lineOpacity,
                  }}
                />

                {/* Instagram crisp line */}
                <motion.path
                  d="M 216 250 C 288 205, 332 205, 400 272"
                  fill="none"
                  stroke="url(#ig-grad-dm)"
                  strokeWidth="1.5"
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: igLineOffset,
                    opacity: lineOpacity,
                  }}
                />

                {/* WhatsApp glow */}
                <motion.path
                  d="M 584 250 C 512 205, 468 205, 400 272"
                  fill="none"
                  stroke="url(#wa-grad-dm)"
                  strokeWidth="2.5"
                  filter="url(#line-glow-dm)"
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: waLineOffset,
                    opacity: lineOpacity,
                  }}
                />

                {/* WhatsApp crisp line */}
                <motion.path
                  d="M 584 250 C 512 205, 468 205, 400 272"
                  fill="none"
                  stroke="url(#wa-grad-dm)"
                  strokeWidth="1.5"
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: waLineOffset,
                    opacity: lineOpacity,
                  }}
                />

                {/* Travelling pulse dots */}
                <motion.circle
                  r="4"
                  fill="var(--primary)"
                  style={{ opacity: lineOpacity }}
                >
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    path="M 216 250 C 288 205, 332 205, 400 272"
                  />
                </motion.circle>

                <motion.circle
                  r="4"
                  fill="var(--primary)"
                  style={{ opacity: lineOpacity }}
                >
                  <animateMotion
                    dur="1.5s"
                    begin="0.9s"
                    repeatCount="indefinite"
                    path="M 584 250 C 512 205, 468 205, 400 272"
                  />
                </motion.circle>
              </svg>

              {/* ─── Central STALLIO node ──────────────────────────────────── */}
              <motion.div
                className="absolute left-1/2 top-[38%] z-10 -translate-x-1/2 -translate-y-1/2"
                style={{
                  scale: nodeScale,
                  opacity: nodeOpacity,
                }}
              >
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border font-heading text-[10px] font-extrabold tracking-[0.2em] sm:h-20 sm:w-20 sm:text-xs"
                  style={{
                    background:
                      'color-mix(in oklch, var(--primary) 8%, var(--surface))',
                    borderColor: nodeBorderColor,
                    color: 'var(--primary)',
                    boxShadow: nodeBoxShadow,
                  }}
                >
                  STALLIO
                </motion.div>
              </motion.div>

              {/* ─── Store UI card ────────────────────────────────────────── */}
              <motion.div
                className="absolute left-1/2 top-[69%] z-20 w-[min(400px,46%)] max-w-[400px] -translate-x-1/2 -translate-y-1/2"
                style={{
                  opacity: storeOpacity,
                  scale: storeScale,
                  y: storeY,
                }}
              >
                <div
                  className="overflow-visible rounded-[2rem] border"
                  style={{
                    background: 'var(--surface)',
                    borderColor:
                      'color-mix(in oklch, var(--primary) 20%, var(--border))',
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

            {/* ── Mobile fallback ─────────────────────────────────────────── */}
            <div className="space-y-6 md:hidden">
              <div>
                <ChatPanel
                  title="Instagram"
                  messages={instagramMessages.slice(0, 3)}
                  icon="𝕀"
                />
              </div>

              <div className="flex flex-col items-center gap-3">
                <svg
                  className="h-8 w-px"
                  viewBox="0 0 1 32"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <line
                    x1="0.5"
                    y1="0"
                    x2="0.5"
                    y2="32"
                    stroke="var(--primary)"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    strokeDasharray="4 4"
                  />
                </svg>

                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl border font-heading text-[9px] font-extrabold tracking-[0.18em]"
                  style={{
                    background:
                      'color-mix(in oklch, var(--primary) 8%, var(--surface))',
                    borderColor:
                      'color-mix(in oklch, var(--primary) 30%, var(--border))',
                    color: 'var(--primary)',
                    boxShadow:
                      '0 0 32px color-mix(in oklch, var(--primary) 16%, transparent)',
                  }}
                >
                  STALLIO
                </div>

                <svg
                  className="h-8 w-px"
                  viewBox="0 0 1 32"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <line
                    x1="0.5"
                    y1="0"
                    x2="0.5"
                    y2="32"
                    stroke="var(--primary)"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>

              <div>
                <ChatPanel
                  title="WhatsApp"
                  messages={whatsappMessages}
                  align="right"
                  icon="W"
                />
              </div>

              <div
                className="rounded-2xl border"
                style={{
                  background: 'var(--surface)',
                  borderColor:
                    'color-mix(in oklch, var(--primary) 22%, var(--border))',
                  boxShadow:
                    '0 24px 60px color-mix(in oklch, var(--foreground) 8%, transparent)',
                }}
              >
                <StallioStoreUI variant="store" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default DmStoreTransform