import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, Zap, TrendingUp } from 'lucide-react'
import PrimaryCTA from '../../../components/PrimaryCTA'
import useReducedMotion from '../../../hooks/useReducedMotion'
import {
  blurReveal,
  revealSoft,
  staggerContainer,
  easePremium,
} from '../../../utils/motionVariants'
import { css } from '../../../utils/cssTokens'

// ─── Trust dot ───────────────────────────────────────────────────────────────
const TrustDot = ({ children }) => (
  <span className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: css.mutedFg }}>
    <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: css.primary, opacity: 0.75 }} />
    {children}
  </span>
)

// ─── Individual stat row with hover glow ─────────────────────────────────────
const StatRow = ({ label, value, accent, delay, reducedMotion }) => (
  <motion.div
    className="flex items-center justify-between rounded-xl px-4 py-3"
    style={{
      background:   'color-mix(in oklch, var(--primary) 3%, var(--surface-muted))',
      border:       '1px solid var(--border)',
      transition:   'border-color 0.2s ease, box-shadow 0.2s ease',
    }}
    initial={reducedMotion ? false : { opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.45, delay, ease: easePremium }}
    whileHover={reducedMotion ? {} : {
      borderColor: accent,
      boxShadow:   `0 0 0 1px ${accent}, 0 6px 28px -6px color-mix(in oklch, ${accent} 35%, transparent)`,
      transition:  { duration: 0.16 },
    }}
  >
    <span className="text-[12px] font-medium" style={{ color: css.mutedFg }}>{label}</span>
    <span
      className="font-heading font-extrabold tabular-nums tracking-[-0.02em] text-[14px]"
      style={{ color: accent }}
    >
      {value}
    </span>
  </motion.div>
)

const PlanPill = ({ label, Icon, badge, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className="group relative flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2.5 text-center focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
  >
    {active && (
      <motion.span
        layoutId="active-plan"
        className="absolute inset-0 rounded-xl"
        transition={{ type: 'spring', stiffness: 450, damping: 32, mass: 0.7,
        }}
        style={{
          background: 'color-mix(in oklch, var(--primary) 10%, var(--surface))',
          border: '1px solid color-mix(in oklch, var(--primary) 28%, transparent)',
        }}
      />
    )}

    <motion.span
      animate={{
        opacity: active ? 1 : 0.65,
        y: active ? 0 : 1,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.40, 1],
      }}
      className="relative z-10 flex flex-col items-center gap-1"
      style={{
        color: active ? css.primary : css.mutedFg,
      }}
    >
      <Icon size={14} aria-hidden="true" />

      <span className="text-[10px] font-semibold">
        {label}
      </span>
    </motion.span>

    {badge && (
      <span
        className="absolute -top-2 left-1/2 z-20 -translate-x-1/2 rounded-full px-2 py-px text-[8px] font-bold uppercase tracking-wider whitespace-nowrap"
        style={{
          background: css.primary,
          color: css.primaryFg,
        }}
      >
        {badge}
      </span>
    )}
  </button>
)

// ─── Static Pricing Mockup ────────────────────────────────────────────────────
const PricingMockup = ({ reducedMotion }) => {
  const [activePlan, setActive] = useState('monthly')

  const PLANS = [
    {
      id:         'monthly',
      label:      'Monthly',
      Icon:       TrendingUp,
      badge:      'Popular',
      priceLabel: '$5',
      suffix:     '/ mo',
      note:       'Billed monthly · cancel anytime',
    },
    {
      id:         'yearly',
      label:      'Yearly',
      Icon:       Zap,
      badge:      null,
      priceLabel: '$55',
      suffix:     '/ yr',
      note:       'One payment · save 27%',
    },
  ]

  const plan = PLANS.find(p => p.id === activePlan)

  // Static stats — no features list
  const STATS = [
    { label: 'Avg. setup time',     value: '< 5 min',   accent: css.primary              },
    { label: 'Free trial',          value: '30 days',    accent: css.primary              },
    { label: 'Products',            value: 'Unlimited',  accent: css.fg                   },
    { label: 'Custom domain',       value: 'Included',   accent: css.fg                   },
  ]

  return (
    <motion.div
      className="relative w-full max-w-[340px]"
      initial={reducedMotion ? false : { opacity: 0, y: 48, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.1, delay: reducedMotion ? 0 : 0.36, ease: easePremium }}
    >
      {/* Ambient glow behind card */}
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-3xl"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, color-mix(in oklch, var(--primary) 20%, transparent), transparent 72%)',
          filter:     'blur(36px)',
          opacity:    0.55,
        }}
      />

      {/* Card shell */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: css.surface,
          border:     '1px solid var(--border)',
          boxShadow:  css.float,
        }}
      >
        {/* Top accent line */}
        <div
          className="h-0.5 w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--primary) 40%, color-mix(in oklch, var(--primary) 40%, transparent) 100%)',
          }}
        />

        <div className="p-5">

          {/* Header */}
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: css.mutedFg }}
          >
            Choose your plan
          </span>

          {/* Plan tabs */}
          <div
            className="mb-4 mt-3 grid gap-1.5 rounded-xl p-1"
            style={{
              gridTemplateColumns: `repeat(${PLANS.length}, 1fr)`,
              background: 'var(--surface-muted)',
              border:     '1px solid var(--border)',
            }}
          >
            {PLANS.map(p => (
              <PlanPill
                key={p.id}
                label={p.label}
                Icon={p.Icon}
                badge={p.badge}
                active={activePlan === p.id}
                onClick={() => setActive(p.id)}
              />
            ))}
          </div>

          {/* Price — animates on switch */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlan}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
              transition={{ duration: 0.38, ease: easePremium }}
              className="mb-4"
            >
              <div className="flex items-baseline gap-1.5">
                <span
                  className="font-heading font-extrabold tracking-[-0.05em]"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 2.5rem)', color: css.fg, lineHeight: 1 }}
                >
                  {plan.priceLabel}
                </span>
                <span className="text-[13px] font-medium" style={{ color: css.mutedFg }}>
                  {plan.suffix}
                </span>
              </div>
              <p className="mt-0.5 text-[11px]" style={{ color: css.mutedFg }}>{plan.note}</p>
            </motion.div>
          </AnimatePresence>

          {/* Divider */}
          <div
            className="mb-3 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${css.border}, transparent)` }}
          />

          {/* Stat rows — each with its own hover glow */}
          <div className="flex flex-col gap-2">
            {STATS.map((s, i) => (
              <StatRow
                key={s.label}
                label={s.label}
                value={s.value}
                accent={s.accent}
                delay={reducedMotion ? 0 : 0.6 + i * 0.055}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          {/* CTA */}
          <div
            className="group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            style={{
              background: css.primary,
              color:      css.primaryFg,
              boxShadow:  '0 4px 20px color-mix(in oklch, var(--primary) 32%, transparent)',
            }}
          >
            {/* Shimmer sweep on hover */}
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]"
              aria-hidden="true"
            />
            Start Free Trial
            <ArrowRight size={14} aria-hidden="true" />
          </div>

          <p className="mt-2 text-center text-[10.5px]" style={{ color: css.mutedFg }}>
            No credit card required
          </p>
        </div>

        {/* Footer strip */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-muted)' }}
        >
          <div className="flex -space-x-2" aria-hidden="true">
            {['#7C6AF5', '#5BC4A0', '#F5A744', '#E05C7A'].map((bg, i) => (
              <span
                key={i}
                className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ background: bg, outline: '2px solid var(--surface)' }}
              >
                {['A', 'S', 'R', 'M'][i]}
              </span>
            ))}
          </div>
          <p className="text-[10.5px]" style={{ color: css.mutedFg }}>
            <span className="font-semibold" style={{ color: css.fg }}>2,400+</span>{' '}
            sellers active this month
          </p>
        </div>
      </div>

    

     
    </motion.div>
  )
}

// ─── PricingHero ──────────────────────────────────────────────────────────────
const PricingHero = () => {
  const sectionRef    = useRef(null)
  const inView        = useInView(sectionRef, { once: true, margin: '-40px' })
  const reducedMotion = useReducedMotion()
  const isVisible     = reducedMotion || inView

  return (
    <section
      ref={sectionRef}
      aria-labelledby="pricing-hero-heading"
      className="relative isolate overflow-hidden border-b"
      style={{ borderColor: css.border, background: 'var(--background)' }}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 80% at 18% 42%, color-mix(in oklch, var(--primary) 9%, transparent), transparent 64%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 60% at 78% 52%, color-mix(in oklch, var(--primary) 6%, transparent), transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.038]" style={{ backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      </div>

      {/* Bottom edge line */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        aria-hidden="true"
        style={{ background: 'linear-gradient(90deg, transparent 0%, color-mix(in oklch, var(--primary) 38%, transparent) 50%, transparent 100%)' }}
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pb-36 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12 xl:gap-20">

          {/* ── Left column ── */}
          <motion.div
            className="text-center lg:text-left"
            variants={staggerContainer}
            initial={reducedMotion ? false : 'hidden'}
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {/* Eyebrow */}
            <motion.div variants={revealSoft}>
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
                style={{
                  borderColor: css.border,
                  background: 'color-mix(in oklch, var(--surface) 80%, transparent)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: css.primary }} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: css.mutedFg }}>
                  Simple, transparent pricing
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="pricing-hero-heading"
              variants={blurReveal}
              className="font-heading font-extrabold tracking-[-0.055em]"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.02, color: css.fg }}
            >
              One plan that{' '}
              <span style={{ color: css.primary }}>grows with you.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={revealSoft}
              className="mx-auto mt-5 max-w-md text-base leading-7 sm:text-[17px] lg:mx-0"
              style={{ color: css.mutedFg }}
            >
              Start free. Go pro when your DMs become a full-time job. No commissions,
              no gotchas, just tools that work.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={revealSoft}
              className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start"
            >
              <PrimaryCTA to="/signup" size="lg" className="w-full text-[15px] font-bold shadow-lg shadow-black/5 sm:w-auto">
                Create Your Store
              </PrimaryCTA>

              <Link
                to="/features"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
                style={{ borderColor: css.border, background: 'color-mix(in oklch, var(--surface) 80%, transparent)', color: css.fg }}
              >
                What You Get
                <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Trust dots */}
            <motion.div
              variants={revealSoft}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start"
            >
              <TrustDot>No credit card</TrustDot>
              <TrustDot>Live in 5 minutes</TrustDot>
              <TrustDot>Cancel anytime</TrustDot>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={revealSoft}
              className="mt-10 flex items-start justify-center gap-0 lg:justify-start"
              role="list"
              aria-label="Platform highlights"
            >
              {[
                { value: '5 min',   label: 'avg setup'  },
                { value: '30 days', label: 'free trial' },
                { value: '100%',    label: 'access'},
              ].map((stat, i) => (
                <div key={stat.label} role="listitem" className="flex items-stretch">
                  {i > 0 && <div className="mx-6 w-px self-stretch" aria-hidden="true" style={{ background: css.border }} />}
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="font-heading font-extrabold tabular-nums tracking-[-0.03em]"
                      style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)', color: css.fg }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.13em]" style={{ color: css.mutedFg }}>
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right column — mockup ── */}
          <div className="flex justify-center lg:justify-end lg:pr-6">
            <PricingMockup reducedMotion={reducedMotion} />
          </div>

        </div>
      </div>
    </section>
  )
}

export default PricingHero