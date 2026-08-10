import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link2, Package, Smartphone, ClipboardList, Tag, FileText, Truck, LayoutGrid, Wallet, BarChart2, MessageCircle, HeadphonesIcon } from 'lucide-react'
import useReducedMotion from '../../hooks/useReducedMotion'
import { easePremium, staggerContainer, revealSoft } from '../../utils/motionVariants'

// ─── Design token shorthand — matches WhatYouGet / WhatsIncluded ──────────────
const css = {
  primary:      'var(--primary)',
  fg:           'var(--foreground)',
  mutedFg:      'var(--muted-foreground)',
  surface:      'var(--surface)',
  surfaceMuted: 'var(--surface-muted)',
  border:       'var(--border)',
  p6:           'color-mix(in oklch, var(--primary) 6%, var(--surface-muted))',
  p10:          'color-mix(in oklch, var(--primary) 10%, var(--surface))',
  p12:          'color-mix(in oklch, var(--primary) 12%, var(--surface))',
  p18:          'color-mix(in oklch, var(--primary) 18%, var(--border))',
  p20:          'color-mix(in oklch, var(--primary) 20%, var(--border))',
  p22:          'color-mix(in oklch, var(--primary) 22%, var(--border))',
  p30:          'color-mix(in oklch, var(--primary) 30%, transparent)',
}

// ─── Feature data — single source of truth ────────────────────────────────────
// 3 columns × 4 rows = 12 features total, matching WhatsIncluded pattern
const COLUMNS = [
  {
    id:    'store',
    label: 'Your Store',
    features: [
      {
        id:    'store-link',
        Icon:  Link2,
        label: 'Custom Store Link',
        body:  'Custom Store link to use on Whatsapp, FaceBook Instagram and other socials.',
      },
      {
        id:    'catalog',
        Icon:  Package,
        label: 'Product Catalog',
        body:  'Unlimited products and images. Variants, sale prices, stock counts.',
      },
      {
        id:    'storefront',
        Icon:  Smartphone,
        label: 'Mobile-First Storefront',
        body:  'Grid, product pages, and checkout tuned for thumbs,right where your buyers already are.',
      },
      {
        id:    'categories',
        Icon:  LayoutGrid,
        label: 'Categories & Pages',
        body:  'Group products, run a custom home hero with trust lines, reviews, plus About and Contact pages.',
      },
    ],
  },
  {
    id:    'operations',
    label: 'Operations',
    features: [
      {
        id:    'orders',
        Icon:  ClipboardList,
        label: 'Order Dashboard',
        body:  'Every order in one inbox. Search, filter, mark paid, set delivery status, and add tracking.',
      },
      {
        id:    'coupons',
        Icon:  Tag,
        label: 'Coupons & Promos',
        body:  'Percent or fixed-off codes with optional expiry dates. Buyers apply them right at checkout.',
      },
      {
        id:    'invoices',
        Icon:  FileText,
        label: 'PDF Invoices',
        body:  'Download a professional invoice per order to send on WhatsApp or email instantly.',
      },
      {
        id:    'delivery',
        Icon:  Truck,
        label: 'Delivery & COD',
        body:  'Fixed or free-above-minimum delivery, ETA text, checkout notes, and a cash-on-delivery toggle.',
      },
    ],
  },
  {
    id:    'growth',
    label: 'Growth',
    features: [
      {
        id:    'payment',
        Icon:  Wallet,
        label: 'You Control Payment',
        body:  'Tell buyers how to pay by bank, link, or COD. Stallio tracks the order; you confirm when money arrives.',
      },
      {
        id:    'revenue',
        Icon:  BarChart2,
        label: 'Revenue Overview',
        body:  'Charts and totals for paid orders across today, the week, or a custom date range.',
      },
      {
        id:    'messages',
        Icon:  MessageCircle,
        label: 'Buyer Messages',
        body:  'Contact form submissions land in your inbox so nothing sits only on Instagram.',
      },
      {
        id:    'support',
        Icon:  HeadphonesIcon,
        label: 'Seller Support',
        body:  'Chat with the Stallio team from your dashboard whenever you need a hand.',
      },
    ],
  },
]

// ─── Feature card — individual feature row with icon, label, and body ─────────
const FeatureCard = ({ feature, delay, isVisible, reducedMotion }) => {
  const { Icon, label, body } = feature
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: easePremium, delay }}
      className="group flex gap-3.5 rounded-xl border p-4 transition-all duration-300"
      style={{
        background:  css.surface,
        borderColor: css.border,
      }}
      // subtle lift on hover
      whileHover={reducedMotion ? undefined : {
        y: -2,
        boxShadow: `0 8px 24px ${css.p30}`,
        borderColor: css.p22,
        transition: { duration: 0.22, ease: easePremium },
      }}
    >
      {/* Icon container */}
      <div
        className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border transition-colors duration-200 group-hover:border-[color:var(--primary)]"
        style={{
          background:  css.p6,
          borderColor: css.border,
          color:       css.primary,
        }}
        aria-hidden="true"
      >
        <Icon size={15} strokeWidth={1.8} />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p
          className="text-sm font-semibold leading-snug"
          style={{ color: css.fg }}
        >
          {label}
        </p>
        <p
          className="mt-1 text-[12.5px] leading-relaxed"
          style={{ color: css.mutedFg }}
        >
          {body}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Column — heading + stack of feature cards ────────────────────────────────
const FeatureColumn = ({ column, colIdx, isVisible, reducedMotion }) => (
  <div className="flex flex-col gap-3">
    {/* Column heading — matches WhatsIncluded COL_HEADS style */}
    <motion.div
      className="mb-2 flex items-center gap-2 pb-3 border-b"
      style={{ borderColor: css.p20 }}
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: easePremium, delay: colIdx * 0.07 }}
    >
      <span
        className="text-[10.5px] font-bold uppercase tracking-[0.22em]"
        style={{ color: css.primary }}
      >
        {column.label}
      </span>
    </motion.div>

    {/* Feature cards */}
    {column.features.map((feature, rowIdx) => (
      <FeatureCard
        key={feature.id}
        feature={feature}
        delay={0.1 + colIdx * 0.06 + rowIdx * 0.05}
        isVisible={isVisible}
        reducedMotion={reducedMotion}
      />
    ))}
  </div>
)

// ─── Main section ─────────────────────────────────────────────────────────────
const AllFeatures = () => {
  const sectionRef  = useRef(null)
  const inView      = useInView(sectionRef, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()
  const isVisible   = reducedMotion || inView

  return (
    <section
      ref={sectionRef}
      aria-labelledby="all-features-heading"
      className="relative overflow-hidden border-b"
      style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)' }}
    >
      {/* Subtle radial gradient — matches WhatsIncluded */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 50% 0%, color-mix(in oklch, var(--primary) 5%, transparent), transparent 68%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

        {/* ── Section header ── */}
        <motion.div
          className="mb-14 text-center sm:mb-16"
          variants={staggerContainer}
          initial={reducedMotion ? false : 'hidden'}
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {/* Eyebrow */}
          <motion.span
            variants={revealSoft}
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: css.primary }}
          >
            Everything included
          </motion.span>

          {/* Headline */}
          <motion.h2
            variants={revealSoft}
            id="all-features-heading"
            className="mt-3 font-heading font-extrabold tracking-[-0.05em]"
            style={{
              fontSize:   'clamp(2rem, 4.5vw, 3.25rem)',
              lineHeight: 1.04,
              color:      'var(--foreground)',
            }}
          >
            A storefront, not a science project.
          </motion.h2>

          {/* Sub copy */}
          <motion.p
            variants={revealSoft}
            className="mx-auto mt-4 max-w-2xl text-base leading-7"
            style={{ color: css.mutedFg }}
          >
            Buyers browse categories, pick variants, apply coupons, and place orders on their phone.
            Share one link tonight, no hosting bill, custom domain, or deploy keys.
          </motion.p>

          {/* Feature count pill */}
          <motion.div
            variants={revealSoft}
            className="mt-6 flex items-center justify-center"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold"
              style={{
                background:  css.p10,
                borderColor: css.p22,
                color:       css.primary,
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: css.primary }} />
              12 features · all plans · no add-ons
            </span>
          </motion.div>
        </motion.div>

        {/* ── 3-column feature grid ── */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {COLUMNS.map((col, colIdx) => (
            <FeatureColumn
              key={col.id}
              column={col}
              colIdx={colIdx}
              isVisible={isVisible}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* ── Bottom badge — mirrors WhatsIncluded ── */}
        <motion.div
          className="mt-14 flex justify-center"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easePremium, delay: 0.75 }}
        >
          <div
            className="inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-semibold"
            style={{
              background:  css.p10,
              borderColor: css.p22,
              color:       'var(--foreground)',
            }}
          >
            <span
              className="h-2 w-2 rounded-full shrink-0"
              style={{ background: 'oklch(0.65 0.18 145)' }}
              aria-hidden="true"
            />
            Hosted on stallio.shop/yourname
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default AllFeatures