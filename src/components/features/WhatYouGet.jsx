import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa6'
import {
  BarChart2,
  Globe,
  MessageCircle,
  Package,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
} from 'lucide-react'
import useReducedMotion from '../../hooks/useReducedMotion'
import { easePremium, revealSoft, staggerContainer } from '../../utils/motionVariants'

// ─── Design token shorthand ───────────────────────────────────────────────────
const css = {
  primary:       'var(--primary)',
  primaryFg:     'var(--primary-foreground)',
  fg:            'var(--foreground)',
  mutedFg:       'var(--muted-foreground)',
  surface:       'var(--surface)',
  surfaceMuted:  'var(--surface-muted)',
  bg:            'var(--background)',
  border:        'var(--border)',
  card:          'var(--card)',
  p8:            'color-mix(in oklch, var(--primary) 8%, transparent)',
  p10:           'color-mix(in oklch, var(--primary) 10%, var(--surface))',
  p12:           'color-mix(in oklch, var(--primary) 12%, var(--surface))',
  p18:           'color-mix(in oklch, var(--primary) 18%, var(--border))',
  p25:           'color-mix(in oklch, var(--primary) 25%, var(--border))',
  p30:           'color-mix(in oklch, var(--primary) 30%, transparent)',
  success:       'oklch(0.58 0.18 145)',
  successBg:     'color-mix(in oklch, oklch(0.58 0.18 145) 10%, var(--surface))',
  successBorder: 'color-mix(in oklch, oklch(0.58 0.18 145) 22%, var(--border))',
  info:          'oklch(0.58 0.18 240)',
  infoBg:        'color-mix(in oklch, oklch(0.58 0.18 240) 10%, var(--surface))',
  infoBorder:    'color-mix(in oklch, oklch(0.58 0.18 240) 22%, var(--border))',
}

// ─── Chip — feature tag inside a group card ───────────────────────────────────
const FeatureChip = ({ children }) => (
  <span
    className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium"
    style={{ borderColor: css.p18, background: css.surface, color: css.mutedFg }}
  >
    <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: css.primary, opacity: 0.65 }} />
    {children}
  </span>
)

// ─── Status pill — reused from stepper card ───────────────────────────────────
const StatusPill = ({ children, variant = 'success' }) => {
  const isSuccess = variant === 'success'
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold leading-none"
      style={{
        background:  isSuccess ? css.successBg  : css.infoBg,
        color:       isSuccess ? css.success     : css.info,
        border:      `1px solid ${isSuccess ? css.successBorder : css.infoBorder}`,
      }}
    >
      {children}
    </span>
  )
}

// ─── Mini-UI mockups — one per group card ─────────────────────────────────────

// ─── Reused product data — same source as StallioStoreUI ─────────────────────
const STORE_PRODUCTS = [
  {
    img:   'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=300&fit=crop&auto=format&q=80',
    name:  'Classic Tee',
    price: '₨ 1,200',
    badge: 'New',
  },
  {
    img:   'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&auto=format&q=80',
    name:  'Sneakers',
    price: '₨ 6,800',
    badge: 'Hot',
  },
  {
    img:   'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=300&fit=crop&auto=format&q=80',
    name:  'Summer Kurta',
    price: '₨ 2,400',
    badge: null,
  },
  {
    img:   'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=300&fit=crop&auto=format&q=80',
    name:  'Linen Shirt',
    price: '₨ 1,850',
    badge: 'Sale',
  },
]

// Mini product card — horizontal strip variant (portrait image, compact label)
const MiniProductCard = ({ img, name, price, badge }) => (
  <div
    className="flex min-w-0 flex-col overflow-hidden rounded-xl border"
    style={{ background: css.surface, borderColor: css.border }}
  >
    {/* Portrait-ratio image so cards are taller than wide in a horizontal strip */}
    <div className="relative overflow-hidden" style={{ aspectRatio: '3 / 4' }}>
      <img
        src={img}
        alt={name}
        className="h-full w-full object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.style.display = 'none'
          e.target.parentElement.style.background =
            'linear-gradient(135deg, color-mix(in oklch, var(--foreground) 4%, var(--surface)), color-mix(in oklch, var(--primary) 8%, var(--surface)))'
        }}
      />
      {badge && (
        <span
          className="absolute left-1 top-1 rounded-full px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide"
          style={{
            background: css.p10,
            color:      css.primary,
            border:     `1px solid ${css.p18}`,
          }}
        >
          {badge}
        </span>
      )}
    </div>
    <div className="p-1.5">
      <div className="truncate text-[9px] font-semibold leading-tight" style={{ color: css.fg }}>{name}</div>
      <div className="mt-0.5 text-[8px] font-bold" style={{ color: css.primary }}>{price}</div>
    </div>
  </div>
)

// Group 1 — Storefront: real product grid with browser chrome
const StorefrontMockup = () => (
  <div
    className="overflow-hidden rounded-xl border shadow-sm"
    style={{ background: css.surface, borderColor: css.border }}
  >
    {/* Browser bar */}
    <div
      className="flex items-center gap-2 border-b px-3 py-2"
      style={{ borderColor: css.border, background: css.surfaceMuted }}
    >
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full" style={{ background: 'oklch(0.75 0.12 25)' }} />
        <span className="h-2 w-2 rounded-full" style={{ background: 'oklch(0.78 0.14 80)' }} />
        <span className="h-2 w-2 rounded-full" style={{ background: 'oklch(0.72 0.15 140)' }} />
      </div>
      <div
        className="flex flex-1 items-center gap-1.5 overflow-hidden rounded-md border px-2 py-0.5 text-[10px]"
        style={{ borderColor: css.border, background: css.surface, color: css.mutedFg }}
      >
        <ShieldCheck size={9} style={{ color: css.success, flexShrink: 0 }} aria-hidden="true" />
        <span className="truncate">
          <span className="font-medium" style={{ color: css.fg }}>stallio.shop/</span>
          <span style={{ color: css.primary }}>yourshop</span>
        </span>
      </div>
    </div>

    {/* Store header row */}
    <div
      className="flex items-center justify-between border-b px-3 py-2"
      style={{ borderColor: css.border }}
    >
      <div>
        <div className="font-heading text-[10px] font-extrabold" style={{ color: css.fg }}>Your Shop</div>
        <div className="text-[8px] mt-0.5" style={{ color: css.mutedFg }}>4 products · Summer Collection</div>
      </div>
      <span
        className="rounded-full px-2 py-0.5 text-[8px] font-bold"
        style={{ background: css.p10, color: css.primary, border: `1px solid ${css.p18}` }}
      >
        Verified ✓
      </span>
    </div>

    {/* Product strip — 4 cards in a single horizontal row */}
    <div className="grid grid-cols-4 gap-2 p-2.5">
      {STORE_PRODUCTS.map((p) => (
        <MiniProductCard key={p.name} {...p} />
      ))}
    </div>

    {/* Footer CTA bar */}
    <div
      className="flex items-center justify-between border-t px-3 py-2"
      style={{
        borderColor: css.p18,
        background:  css.p10,
      }}
    >
      <span className="text-[9px]" style={{ color: css.mutedFg }}>4 products · stallio.shop/yourshop</span>
      <span className="text-[9px] font-bold" style={{ color: css.primary }}>Shop now →</span>
    </div>
  </div>
)

// Group 2 — Orders: compact order rows
const OrdersMockup = () => (
  <div
    className="overflow-hidden rounded-xl border"
    style={{ background: css.surface, borderColor: css.border }}
  >
    <div
      className="border-b px-3 py-2 text-[10px] font-semibold"
      style={{ borderColor: css.border, color: css.mutedFg, background: css.surfaceMuted }}
    >
      Orders — Today
    </div>
    {[
      { id: '#1042', name: 'Zayn M.',   amt: '₨ 2,800', status: 'Paid',    variant: 'success' },
      { id: '#1041', name: 'Sara K.',   amt: '₨ 1,200', status: 'Pending', variant: 'info'    },
      { id: '#1040', name: 'Ali R.',    amt: '₨ 5,500', status: 'Paid',    variant: 'success' },
    ].map((order, i) => (
      <div
        key={order.id}
        className="flex items-center justify-between border-b px-3 py-2 last:border-b-0"
        style={{ borderColor: css.border }}
      >
        <div>
          <div className="text-[10px] font-bold" style={{ color: css.fg }}>{order.id} · {order.name}</div>
          <div className="text-[9px] mt-0.5" style={{ color: css.mutedFg }}>{order.amt}</div>
        </div>
        <StatusPill variant={order.variant}>{order.status}</StatusPill>
      </div>
    ))}
  </div>
)

// Group 3 — Commerce: checkout summary with coupon
const CommerceMockup = () => (
  <div
    className="overflow-hidden rounded-xl border"
    style={{ background: css.surface, borderColor: css.border }}
  >
    <div
      className="border-b px-3 py-2 text-[10px] font-semibold"
      style={{ borderColor: css.border, color: css.mutedFg, background: css.surfaceMuted }}
    >
      Checkout Summary
    </div>
    <div className="space-y-2 p-3">
      <div className="flex justify-between text-[10px]">
        <span style={{ color: css.mutedFg }}>Sneakers × 1</span>
        <span className="font-semibold" style={{ color: css.fg }}>₨ 6,800</span>
      </div>
      <div className="flex justify-between text-[10px]">
        <span style={{ color: css.mutedFg }}>Delivery</span>
        <span className="font-semibold" style={{ color: css.fg }}>₨ 200</span>
      </div>
      <div className="flex justify-between text-[10px]">
        <span style={{ color: css.success }}>Coupon SAVE15</span>
        <span className="font-semibold" style={{ color: css.success }}>−₨ 1,020</span>
      </div>
      <div
        className="flex justify-between border-t pt-2 text-[11px] font-bold"
        style={{ borderColor: css.p18 }}
      >
        <span style={{ color: css.fg }}>Total</span>
        <span style={{ color: css.primary }}>₨ 5,980</span>
      </div>
    </div>
  </div>
)

// Group 4 — Growth: invoice + WhatsApp share
const GrowthMockup = () => (
  <div
    className="overflow-hidden rounded-xl border"
    style={{ background: css.surface, borderColor: css.border }}
  >
    <div
      className="border-b px-3 py-2 text-[10px] font-semibold"
      style={{ borderColor: css.border, color: css.mutedFg, background: css.surfaceMuted }}
    >
      Invoice · #INV-1042
    </div>
    <div className="p-3">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-[10px] font-bold" style={{ color: css.fg }}>Stallio Invoice</div>
          <div className="text-[9px] mt-0.5" style={{ color: css.mutedFg }}>Aug 2026 · Zayn M.</div>
        </div>
        <div className="text-[11px] font-bold" style={{ color: css.primary }}>₨ 5,780</div>
      </div>
      <div className="mb-2 h-px" style={{ background: css.border }} />
      <div className="flex items-center justify-between text-[9px] mb-3" style={{ color: css.mutedFg }}>
        <span>Revenue / week</span>
        <span className="font-semibold" style={{ color: css.success }}>+23%</span>
      </div>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-[10px] font-semibold transition-opacity hover:opacity-80"
        style={{
          background: 'color-mix(in oklch, oklch(0.58 0.22 150) 14%, var(--surface))',
          color:      'oklch(0.48 0.22 150)',
          border:     '1px solid color-mix(in oklch, oklch(0.58 0.22 150) 22%, var(--border))',
        }}
      >
        <FaWhatsapp size={11} aria-hidden="true" />
        Share via WhatsApp
      </button>
    </div>
  </div>
)

// ─── Group card data — single source of truth ─────────────────────────────────
const GROUPS = [
  {
    id:       'storefront',
    Icon:     Globe,
    label:    'Your Store Link',
    headline: 'One link. Your entire brand.',
    body:     'Share stallio.shop/yourname from your bio, WhatsApp, or QR. We host it,no domain, no server.',
    chips:    ['Custom slug', 'Arabic & English', 'About & Contact pages', 'Mobile-first'],
    Mockup:   StorefrontMockup,
    // Wide card — spans full row on desktop
    wide: true,
    // Subtle accent tint on the card background
    accent: true,
  },
  {
    id:       'orders',
    Icon:     ShoppingBag,
    label:    'Order Management',
    headline: 'Every order, organized.',
    body:     'Search, filter, mark paid, set delivery status. Nothing lost in DMs or scattered across chats.',
    chips:    ['Order inbox', 'Status tracking', 'Buyer messages', 'Export CSV'],
    Mockup:   OrdersMockup,
  },
  {
    id:       'commerce',
    Icon:     Tag,
    label:    'Catalog & Checkout',
    headline: 'Products buyers can actually buy.',
    body:     'Variants, sale prices, coupons, delivery fees, and COD, all applied at checkout with no gateway.',
    chips:    ['Unlimited products', 'Variant pricing', 'Coupon codes', 'COD toggle'],
    Mockup:   CommerceMockup,
  },
  {
    id:       'growth',
    Icon:     BarChart2,
    label:    'Invoices & Insights',
    headline: 'Professional receipts. Real numbers.',
    body:     'PDF invoices per order, revenue charts, and a WhatsApp share button, all in one dashboard tap.',
    chips:    ['PDF invoices', 'Revenue overview', 'WhatsApp share', 'Seller support'],
    Mockup:   GrowthMockup,
  },
]

// ─── Individual animated group card ──────────────────────────────────────────
// Each card has its own useInView ref so stagger delays actually fire
// independently as the user scrolls — not all at once.
const GroupCard = ({ group, delay, reducedMotion }) => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border${group.wide ? ' lg:flex-row lg:items-start' : ''}`}
      style={{
        background:  group.accent ? css.p10 : css.card,
        borderColor: group.accent ? css.p25  : css.border,
      }}
      initial={reducedMotion ? false : { opacity: 0, y: 32, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.75, ease: easePremium, delay: reducedMotion ? 0 : delay }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -3,
              boxShadow: `0 16px 40px ${css.p8}, 0 2px 8px color-mix(in oklch, var(--foreground) 5%, transparent)`,
              transition: { duration: 0.28, ease: easePremium },
            }
      }
    >
      {/* Top accent line — single element, CSS-only hover, no conflicting rules */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
        style={{ background: `linear-gradient(90deg, transparent, ${css.primary}, transparent)` }}
      />

      {/* Decorative radial glow on accent card */}
      {group.accent && (
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-[0.15] blur-3xl"
          aria-hidden="true"
          style={{ background: css.primary }}
        />
      )}

      {/* ── Card content ── */}
      <div className={`flex flex-col gap-4 p-5 sm:p-6${group.wide ? ' lg:max-w-xs' : ''}`}>
        {/* Icon */}
        <div
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 group-hover:border-[color:var(--ring)]"
          style={{ background: css.p10, borderColor: css.p18, color: css.primary }}
        >
          <group.Icon size={17} aria-hidden="true" />
        </div>

        {/* Label + Headline */}
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: css.primary }}>
            {group.label}
          </p>
          <h3
            className="font-heading font-extrabold tracking-tight"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.2, color: css.fg }}
          >
            {group.headline}
          </h3>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: css.mutedFg }}>
            {group.body}
          </p>
        </div>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-1.5">
          {group.chips.map((chip) => (
            <FeatureChip key={chip}>{chip}</FeatureChip>
          ))}
        </div>
      </div>

      {/* ── Mockup panel ── */}
      <div
        className={`border-t p-4${group.wide ? ' flex-1 lg:border-l lg:border-t-0 lg:p-4' : 'shrink-0'}`}
        style={{ borderColor: group.accent ? css.p18 : css.border, background: group.accent ? 'transparent' : css.surfaceMuted }}
      >
        <group.Mockup />
      </div>
    </motion.div>
  )
}

// ─── Section heading ──────────────────────────────────────────────────────────
const SectionHeading = ({ inView, reducedMotion }) => (
  <motion.div
    className="text-center"
    variants={staggerContainer}
    initial={reducedMotion ? false : 'hidden'}
    animate={inView ? 'visible' : 'hidden'}
  >
    <motion.span
      variants={revealSoft}
      className="text-[11px] font-semibold uppercase tracking-[0.28em]"
      style={{ color: css.primary }}
    >
      What you get
    </motion.span>

    <motion.h2
      variants={revealSoft}
      id="what-you-get-heading"
      className="mt-3 font-heading font-extrabold tracking-[-0.055em]"
      style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1.06, color: css.fg }}
    >
      Every tool a seller needs.{' '}
      <span style={{ color: css.mutedFg }}>Nothing they don't.</span>
    </motion.h2>

    <motion.p
      variants={revealSoft}
      className="mx-auto mt-4 max-w-xl text-base leading-7 sm:text-[17px]"
      style={{ color: css.mutedFg }}
    >
      Built for sellers who already have buyers, not for teams managing DNS,
      plugins, and payment gateways.
    </motion.p>

    {/* Count pill */}
    <motion.div variants={revealSoft} className="mt-6 flex items-center justify-center gap-3">
      <span
        className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold"
        style={{ background: css.p10, borderColor: css.p25, color: css.primary }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: css.primary }} />
        12 features included
      </span>
    </motion.div>
  </motion.div>
)

// ─── Main exported section ────────────────────────────────────────────────────
const WhatYouGet = () => {
  const sectionRef  = useRef(null)
  const headingView = useInView(sectionRef, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()

  return (
    <section
      ref={sectionRef}
      aria-labelledby="what-you-get-heading"
      className="relative overflow-hidden border-b"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      {/* Background glow — top-right, restrained */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 100% 0%, color-mix(in oklch, var(--primary) 5%, transparent), transparent 65%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

        {/* ── Centered section heading ── */}
        <div className="mb-12 sm:mb-16">
          <SectionHeading inView={reducedMotion || headingView} reducedMotion={reducedMotion} />
        </div>

        {/* ── Bento grid ──────────────────────────────────────────────────────
            Desktop layout:
              Row 1: Wide storefront card (full width)
              Row 2: Orders | Commerce  (2 equal columns)
              Row 3: Growth (full width — mirrors row 1 rhythm)
            Mobile: all cards stack vertically, single column.
        ── */}
        <div className="flex flex-col gap-4">

          {/* Row 1 — Storefront (wide) */}
          <GroupCard
            group={GROUPS[0]}
            delay={0.0}
            reducedMotion={reducedMotion}
          />

          {/* Row 2 — Orders + Commerce side by side */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <GroupCard
              group={GROUPS[1]}
              delay={0.08}
              reducedMotion={reducedMotion}
            />
            <GroupCard
              group={GROUPS[2]}
              delay={0.16}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* Row 3 — Growth (wide) */}
          <GroupCard
            group={GROUPS[3]}
            delay={0.08}
            reducedMotion={reducedMotion}
          />

        </div>
      </div>
    </section>
  )
}

export default WhatYouGet