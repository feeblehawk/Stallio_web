import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import useReducedMotion from '../../hooks/useReducedMotion'
import { easePremium, staggerContainer, revealSoft } from '../../utils/motionVariants'

// ─── Arrow icon (matches PrimaryCTA) ─────────────────────────────────────────
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    stroke="currentColor"
    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
)

// ─── Pill chip ────────────────────────────────────────────────────────────────
const Chip = ({ children }) => (
  <span
    className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium"
    style={{
      borderColor: 'var(--border)',
      background: 'var(--surface)',
      color: 'var(--muted-foreground)',
    }}
  >
    {children}
  </span>
)

// ─── Micro trust item ─────────────────────────────────────────────────────────
const TrustItem = ({ icon, children }) => (
  <span
    className="inline-flex items-center gap-1.5 text-[12px]"
    style={{ color: 'var(--muted-foreground)' }}
  >
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      {icon}
    </svg>
    {children}
  </span>
)

// ─── Main section ─────────────────────────────────────────────────────────────
const FinalCTA = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()
  const isVisible = reducedMotion || inView

  return (
    <section
      ref={sectionRef}
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden border-b"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      {/* Radial glow — centered, restrained */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 110%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 68%)',
        }}
      />

      {/* Top border accent rule */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, color-mix(in oklch, var(--primary) 40%, transparent) 50%, transparent 100%)',
        }}
      />

      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <motion.div
          variants={staggerContainer}
          initial={reducedMotion ? false : 'hidden'}
          animate={isVisible ? 'visible' : 'hidden'}
        >

          {/* ── Pill chips — pre-empt objections ── */}
          <motion.div
            variants={revealSoft}
            className="mb-7 flex flex-wrap items-center justify-center gap-2"
          >
            <Chip>No domain setup</Chip>
            <Chip>No card required</Chip>
            <Chip>Live today</Chip>
          </motion.div>

          {/* ── Headline ── */}
          <motion.h2
            variants={revealSoft}
            id="final-cta-heading"
            className="font-heading font-extrabold tracking-[-0.055em]"
            style={{
              fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
              lineHeight: 1.02,
              color: 'var(--foreground)',
            }}
          >
            Ready when you are.
          </motion.h2>

          {/* ── Sub copy ── */}
          <motion.p
            variants={revealSoft}
            className="mx-auto mt-5 max-w-md text-base leading-7 sm:text-[17px]"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Spin up a store in minutes. Share the link tonight. Wake up to orders that didn't vanish in your inbox.
          </motion.p>

          {/* ── CTA buttons ── */}
          <motion.div
            variants={revealSoft}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            {/* Primary — Sign up */}
            <a
              href="https://www.stallio.shop/signup"
              className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-xl font-semibold shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring px-6 py-3 text-sm"
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
                boxShadow: 'var(--shadow, 0 4px 14px color-mix(in oklch, var(--primary) 30%, transparent))',
              }}
            >
              {/* Shimmer sweep — matches PrimaryCTA */}
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]"
                aria-hidden="true"
              />
              Start free
              <ArrowIcon />
            </a>

            {/* Secondary — Log in */}
            <a
              href="https://www.stallio.shop/login"
              className="group inline-flex items-center justify-center gap-1.5 rounded-xl border font-semibold transition-all duration-200 hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring px-6 py-3 text-sm"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--surface)',
                color: 'var(--foreground)',
              }}
            >
              Log in
              {/* Subtle right-arrow on hover */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-3.5 w-3.5 opacity-40 transition-all duration-300 group-hover:opacity-70 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </motion.div>

          {/* ── Micro trust strip ── */}
          <motion.div
            variants={revealSoft}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            <TrustItem
              icon={<path strokeLinecap="round" strokeLinejoin="round" d="M8 13.5A5.5 5.5 0 1013.5 8M8 13.5V10m0 3.5H5" />}
            >
              30-day full trial
            </TrustItem>
            <TrustItem
              icon={<path strokeLinecap="round" strokeLinejoin="round" d="M8 2a6 6 0 110 12A6 6 0 018 2zm0 0v2m0 10v2M2 8H0m16 0h-2" />}
            >
              Share tonight
            </TrustItem>
            <TrustItem
              icon={<><rect x="2" y="6" width="12" height="9" rx="1.5" /><path strokeLinecap="round" d="M5 6V4.5a3 3 0 016 0V6" /></>}
            >
              No credit card
            </TrustItem>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

export default FinalCTA