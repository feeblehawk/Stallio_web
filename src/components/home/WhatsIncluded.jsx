import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'
import { easePremium, staggerContainer, revealSoft } from '../../utils/motionVariants'

// ─── Feature list — all 12 items ─────────────────────────────────────────────
const FEATURES = [
  // Column 1 — Store & Products
  {
    id: 'link',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-4 w-4">
        <path d="M8 11a4 4 0 005.66 0l2-2a4 4 0 00-5.66-5.66l-1 1" strokeLinecap="round" />
        <path d="M12 9a4 4 0 00-5.66 0l-2 2a4 4 0 005.66 5.66l1-1" strokeLinecap="round" />
      </svg>
    ),
    label: 'Hosted stallio.shop link',
    sub: 'No domain needed',
    col: 0,
  },
  {
    id: 'products',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-4 w-4">
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="11" y="3" width="6" height="6" rx="1" />
        <rect x="3" y="11" width="6" height="6" rx="1" />
        <rect x="11" y="11" width="6" height="6" rx="1" />
      </svg>
    ),
    label: 'Unlimited products & photos',
    sub: 'No caps, ever',
    col: 0,
  },
  {
    id: 'storefront',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-4 w-4">
        <rect x="2" y="7" width="16" height="11" rx="1.5" />
        <path d="M2 7l8-5 8 5" strokeLinejoin="round" />
        <rect x="7.5" y="11" width="5" height="7" rx="0.75" />
      </svg>
    ),
    label: 'Mobile storefront & checkout',
    sub: 'Cart built-in',
    col: 0,
  },
  {
    id: 'variants',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-4 w-4">
        <circle cx="5" cy="10" r="2.5" />
        <circle cx="15" cy="10" r="2.5" />
        <path d="M7.5 10h5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Variants, sale prices & stock',
    sub: 'Sizes, colours, and more',
    col: 0,
  },
  // Column 2 — Operations
  {
    id: 'pages',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-4 w-4">
        <rect x="3" y="3" width="14" height="14" rx="1.5" />
        <path d="M6 7h8M6 10h6M6 13h4" strokeLinecap="round" />
      </svg>
    ),
    label: 'About and Contact pages',
    sub: 'Ready to customise',
    col: 1,
  },
  {
    id: 'coupons',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-4 w-4">
        <path d="M3 10a7 7 0 1014 0A7 7 0 003 10z" />
        <path d="M10 7v3l2 1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Coupons and delivery fees',
    sub: 'Discounts that close sales',
    col: 1,
  },
  {
    id: 'invoice',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-4 w-4">
        <rect x="4" y="2" width="12" height="16" rx="1.5" />
        <path d="M7 7h6M7 10h4M7 13h3" strokeLinecap="round" />
      </svg>
    ),
    label: 'PDF invoice per order',
    sub: 'Auto-generated',
    col: 1,
  },
  {
    id: 'orders',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-4 w-4">
        <path d="M4 4h12l-1.5 8H5.5L4 4z" strokeLinejoin="round" />
        <circle cx="7.5" cy="16" r="1.2" />
        <circle cx="13.5" cy="16" r="1.2" />
        <path d="M1.5 2h2L4 4" strokeLinecap="round" />
      </svg>
    ),
    label: 'Mark paid, ship & export CSV',
    sub: 'Full order lifecycle',
    col: 1,
  },
  // Column 3 — Growth
  {
    id: 'i18n',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-4 w-4">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 2c-2.5 3-4 5.5-4 8s1.5 5 4 8M10 2c2.5 3 4 5.5 4 8s-1.5 5-4 8M2 10h16" strokeLinecap="round" />
      </svg>
    ),
    label: 'Shop in EN, ES, and AR',
    sub: 'Dashboard too',
    col: 2,
  },
  {
    id: 'analytics',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-4 w-4">
        <path d="M3 16l4-5 4 3 4-8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="15" cy="6" r="1.5" />
      </svg>
    ),
    label: 'Revenue and order charts',
    sub: 'See what\'s working',
    col: 2,
  },
  {
    id: 'messages',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-4 w-4">
        <path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H6l-4 3V5a1 1 0 011-1z" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Buyer messages & support chat',
    sub: 'Stay close to customers',
    col: 2,
  },
  {
    id: 'free',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-4 w-4">
        <path d="M10 2l1.8 5.4H17l-4.4 3.2 1.7 5.3L10 13l-4.3 2.9 1.7-5.3L3 7.4h5.2z" strokeLinejoin="round" />
      </svg>
    ),
    label: 'First month free',
    sub: 'No card required',
    col: 2,
    highlight: true,
  },
]

const cols = [0, 1, 2].map(c => FEATURES.filter(f => f.col === c))

// ─── Single feature row ───────────────────────────────────────────────────────
const FeatureRow = ({ feature, delay, isVisible, reducedMotion }) => (
  <motion.div
    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
    animate={isVisible ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease: easePremium, delay }}
    className="group flex items-start gap-3 py-3 border-b last:border-b-0"
    style={{ borderColor: 'var(--border)' }}
  >
    {/* Icon */}
    <div
      className="mt-0.5 shrink-0 flex h-7 w-7 items-center justify-center rounded-lg border transition-colors duration-200 group-hover:border-primary"
      style={{
        background: feature.highlight
          ? 'color-mix(in oklch, var(--primary) 12%, var(--surface))'
          : 'color-mix(in oklch, var(--primary) 6%, var(--surface-muted))',
        borderColor: feature.highlight
          ? 'color-mix(in oklch, var(--primary) 30%, var(--border))'
          : 'var(--border)',
        color: 'var(--primary)',
      }}
      aria-hidden="true"
    >
      {feature.icon}
    </div>

    {/* Text */}
    <div className="min-w-0">
      <p
        className="text-sm font-semibold leading-tight"
        style={{
          color: feature.highlight ? 'var(--primary)' : 'var(--foreground)',
        }}
      >
        {feature.label}
      </p>
      <p
        className="mt-0.5 text-[11px] leading-snug"
        style={{ color: 'var(--muted-foreground)' }}
      >
        {feature.sub}
      </p>
    </div>
  </motion.div>
)

// ─── Column heading ───────────────────────────────────────────────────────────
const COL_HEADS = [
  { label: 'Store & Products', icon: '🛍️' },
  { label: 'Operations',       icon: '⚙️' },
  { label: 'Growth',           icon: '📈' },
]

// ─── Main section ─────────────────────────────────────────────────────────────
const WhatsIncluded = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()
  const isVisible = reducedMotion || inView

  return (
    <section
      ref={sectionRef}
      aria-labelledby="whats-included-heading"
      className="relative overflow-hidden border-b"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      {/* Subtle radial gradient */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, color-mix(in oklch, var(--primary) 5%, transparent), transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

        {/* ── Header — same pattern as other sections ── */}
        <motion.div
          className="mb-14 text-center sm:mb-16"
          variants={staggerContainer}
          initial={reducedMotion ? false : 'hidden'}
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.span
            variants={revealSoft}
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: 'var(--primary)' }}
          >
            What's Included
          </motion.span>

          <motion.h2
            variants={revealSoft}
            id="whats-included-heading"
            className="mt-3 font-heading font-extrabold tracking-[-0.05em]"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              lineHeight: 1.04,
              color: 'var(--foreground)',
            }}
          >
            One plan. The full seller toolkit.
          </motion.h2>

          <motion.p
            variants={revealSoft}
            className="mx-auto mt-4 max-w-lg text-base leading-7"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Everything below is part of Stallio, not add-ons. Start free, then pick monthly or yearly when you're ready.
          </motion.p>
        </motion.div>

        {/* ── 3-column feature grid ── */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {cols.map((colFeatures, colIdx) => (
            <div key={colIdx}>
              {/* Column heading */}
              <motion.div
                className="mb-4 flex items-center gap-2 pb-3 border-b"
                style={{ borderColor: 'color-mix(in oklch, var(--primary) 20%, var(--border))' }}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: easePremium, delay: colIdx * 0.08 }}
              >
                <span className="text-base leading-none" aria-hidden="true">
                  {COL_HEADS[colIdx].icon}
                </span>
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: 'var(--primary)' }}
                >
                  {COL_HEADS[colIdx].label}
                </span>
              </motion.div>

              {/* Feature rows */}
              {colFeatures.map((f, rowIdx) => (
                <FeatureRow
                  key={f.id}
                  feature={f}
                  delay={0.1 + colIdx * 0.07 + rowIdx * 0.06}
                  isVisible={isVisible}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          ))}
        </div>

        {/* ── Bottom badge ── */}
        <motion.div
          className="mt-14 flex justify-center"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremium, delay: 0.7 }}
        >
          <div
            className="inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-semibold"
            style={{
              background: 'color-mix(in oklch, var(--primary) 7%, var(--surface))',
              borderColor: 'color-mix(in oklch, var(--primary) 22%, var(--border))',
              color: 'var(--foreground)',
            }}
          >
            <span
              className="h-2 w-2 rounded-full shrink-0"
              style={{ background: 'oklch(0.65 0.18 145)' }}
              aria-hidden="true"
            />
            All features included in every plan, no hidden add-ons
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatsIncluded