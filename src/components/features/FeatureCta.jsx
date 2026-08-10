import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'
import { easePremium, staggerContainer, revealSoft } from '../../utils/motionVariants'
import ArrowIcon from '../icons/ArrowIcon'

// ─── Design token shorthand ───────────────────────────────────────────────────
const css = {
  primary:   'var(--primary)',
  primaryFg: 'var(--primary-foreground)',
  fg:        'var(--foreground)',
  mutedFg:   'var(--muted-foreground)',
  surface:   'var(--surface)',
  surfaceMuted: 'var(--surface-muted)',
  border:    'var(--border)',
  p8:        'color-mix(in oklch, var(--primary) 8%, transparent)',
  p10:       'color-mix(in oklch, var(--primary) 10%, var(--surface))',
  p18:       'color-mix(in oklch, var(--primary) 18%, var(--border))',
  p25:       'color-mix(in oklch, var(--primary) 25%, var(--border))',
  p30:       'color-mix(in oklch, var(--primary) 30%, transparent)',
  p40accent: 'color-mix(in oklch, var(--primary) 40%, transparent)',
}

// ─── Objection chips — pre-empt signup hesitation ────────────────────────────
const CHIPS = [
  'No domain setup',
  'No card required',
  'Live today',
  'Free to start',
]

// ─── Inline check icon ────────────────────
const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 shrink-0" aria-hidden="true">
    <path
      d="M2 6l2.5 2.5 5.5-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)


// ─── Objection chip ───────────────────────────────────────────────────────────
const Chip = ({ children }) => (
  <span
    className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium"
    style={{ borderColor: css.border, background: css.surface, color: css.mutedFg }}
  >
    {children}
  </span>
)

// ─── Main section ─────────────────────────────────────────────────────────────
const FeatureCta = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()
  const isVisible = reducedMotion || inView

  return (
    <section
      ref={sectionRef}
      aria-labelledby="feature-cta-heading"
      className="relative overflow-hidden border-b"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      {/* Radial glow — bottom-center, same as home FinalCta */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 110%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 68%)',
        }}
      />

      {/* Top accent rule  */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, color-mix(in oklch, var(--primary) 40%, transparent) 50%, transparent 100%)',
        }}
      />

      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <motion.div
          variants={staggerContainer}
          initial={reducedMotion ? false : 'hidden'}
          animate={isVisible ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center"
        >
          {/* ── Objection chips ── */}
          <motion.div
            variants={revealSoft}
            className="mb-7 flex flex-wrap items-center justify-center gap-2"
          >
            {CHIPS.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </motion.div>

          {/* ── Eyebrow ── */}
          <motion.span
            variants={revealSoft}
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: css.primary }}
          >
            Start selling today
          </motion.span>

          {/* ── Headline — center-aligned, matches homepage section heading style ── */}
          <motion.h2
            variants={revealSoft}
            id="feature-cta-heading"
            className="font-heading font-extrabold tracking-[-0.055em]"
            style={{
              fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
              lineHeight: 1.02,
              color: 'var(--foreground)',
            }}
          >
            Your store is one link away.
          </motion.h2>

          {/* ── Sub copy ── */}
          <motion.p
            variants={revealSoft}
            className="mx-auto mt-5 max-w-md text-base leading-7 sm:text-[17px]"
            style={{ color: css.mutedFg }}
          >
            Set up in minutes. Share the link tonight.
            Wake up to organized orders, not scattered DMs.
          </motion.p>

          {/* ── CTA buttons ── */}
          <motion.div
            variants={revealSoft}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            {/* Primary */}
            <a
              href="https://www.stallio.shop/signup"
              className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-xl font-semibold shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring px-6 py-3 text-sm"
              style={{
                background: css.primary,
                color: css.primaryFg,
                boxShadow: `0 4px 14px ${css.p30}`,
              }}
            >
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]"
                aria-hidden="true"
              />
              Start free
              <ArrowIcon />
            </a>

            {/* Secondary */}
            <a
              href="https://www.stallio.shop/login"
              className="group inline-flex items-center justify-center gap-1.5 rounded-xl border font-semibold transition-all duration-200 hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring px-6 py-3 text-sm"
              style={{
                borderColor: css.border,
                background: css.surface,
                color: css.fg,
              }}
            >
              Log in
              <ArrowIcon className="opacity-40 group-hover:opacity-70" />
            </a>
          </motion.div>

          {/* ── Divider ── */}
          <motion.div
            variants={revealSoft}
            className="my-10 flex items-center gap-4 w-full max-w-lg"
            aria-hidden="true"
          >
            <div className="h-px flex-1" style={{ background: css.border }} />
            <span className="text-[11px] font-medium" style={{ color: css.mutedFg }}>
              Everything you need, nothing you don't
            </span>
            <div className="h-px flex-1" style={{ background: css.border }} />
          </motion.div>

        
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureCta