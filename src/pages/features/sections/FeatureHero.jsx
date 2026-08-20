import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaWhatsapp } from 'react-icons/fa6'
import { FileText, Package, ShoppingBag, Tag } from 'lucide-react'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { blurReveal, easePremium, reveal, revealSoft, staggerHero } from '../../../utils/motionVariants'
import ArrowIcon from '../../../components/icons/ArrowIcon'

// ─── Design token shorthand (matches WhatYouGet / InsidetheBox pattern) ────────
const css = {
  primary:      'var(--primary)',
  primaryFg:    'var(--primary-foreground)',
  fg:           'var(--foreground)',
  mutedFg:      'var(--muted-foreground)',
  surface:      'var(--surface)',
  border:       'var(--border)',
  p8:           'color-mix(in oklch, var(--primary) 8%, transparent)',
  p10:          'color-mix(in oklch, var(--primary) 10%, var(--surface))',
  p14:          'color-mix(in oklch, var(--primary) 14%, var(--surface))',
  p20border:    'color-mix(in oklch, var(--primary) 20%, var(--border))',
  p30:          'color-mix(in oklch, var(--primary) 30%, transparent)',
  p35:          'color-mix(in oklch, var(--primary) 35%, var(--border))',
  p45:          'color-mix(in oklch, var(--primary) 45%, var(--border))',
  success:      'oklch(0.58 0.18 145)',
  successBg:    'color-mix(in oklch, oklch(0.58 0.18 145) 10%, var(--surface))',
  successBorder:'color-mix(in oklch, oklch(0.58 0.18 145) 22%, var(--border))',
  info:         'oklch(0.58 0.18 240)',
  infoBg:       'color-mix(in oklch, oklch(0.58 0.18 240) 10%, var(--surface))',
  infoBorder:   'color-mix(in oklch, oklch(0.58 0.18 240) 22%, var(--border))',
}

const AUTOPLAY_MS = 5000

// ─── Step icon map ────────────────────────────────────────────────────────────
const STEP_ICONS = {
  orders: ShoppingBag,
  products: Package,
  checkout: Tag,
  invoice: FileText,
}

// ─── Shared micro-components ──────────────────────────────────────────────────
const TrustBadge = ({ children }) => (
  <span className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: css.mutedFg }}>
    <span className="h-1.5 w-1.5 rounded-full" style={{ background: css.primary, opacity: 0.8 }} />
    {children}
  </span>
)

const StatusPill = ({ children, variant = 'success' }) => {
  const isSuccess = variant === 'success'
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold leading-none"
      style={{
        background:   isSuccess ? css.successBg  : css.infoBg,
        color:        isSuccess ? css.success     : css.info,
        border: `1px solid ${isSuccess ? css.successBorder : css.infoBorder}`,
      }}
    >
      {children}
    </span>
  )
}

// ─── Widget panels — pre-rendered, opacity-only swap, no height animation ─────

const OrderWidget = () => {
  const { t } = useTranslation('features')
  return (
    <div className="rounded-xl border p-3" style={{ background: css.p10, borderColor: css.p20border }}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-bold" style={{ color: css.fg }}>
            {t('hero.stepper.orderWidget.orderId', 'Order #1042')}
          </div>
          <div className="mt-0.5 text-[10px]" style={{ color: css.mutedFg }}>
            {t('hero.stepper.orderWidget.customer', 'Zayn M. — ₨ 2,800')}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StatusPill variant="success">
            {t('hero.stepper.orderWidget.statusPaid', 'Paid')}
          </StatusPill>
          <StatusPill variant="info">
            {t('hero.stepper.orderWidget.statusDelivered', 'Delivered')}
          </StatusPill>
        </div>
      </div>
    </div>
  )
}

const VariantChip = ({ active, children }) => (
  <span
    className="flex h-6 w-6 items-center justify-center rounded-md border text-[10px] font-semibold transition-colors duration-150"
    style={{
      background:  active ? css.primary : css.p10,
      color:       active ? css.primaryFg : css.fg,
      borderColor: active ? css.primary  : css.p20border,
    }}
  >
    {children}
  </span>
)

const ProductWidget = () => {
  const { t } = useTranslation('features')
  return (
    <div className="rounded-xl border p-3" style={{ background: css.p10, borderColor: css.p20border }}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] font-bold" style={{ color: css.fg }}>
            {t('hero.stepper.productWidget.productName', 'Sneakers')}
          </div>
          <div className="mt-0.5 text-[10px] font-semibold" style={{ color: css.primary }}>
            {t('hero.stepper.productWidget.price', '₨ 6,800')}
          </div>
        </div>
        <div
          className="rounded-lg px-2 py-0.5 text-[9px] font-semibold"
          style={{ background: css.successBg, color: css.success, border: `1px solid ${css.successBorder}` }}
        >
          {t('hero.stepper.productWidget.stock', 'Stock: 8')}
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-1.5">
        <span className="text-[9px] font-medium" style={{ color: css.mutedFg }}>
          {t('hero.stepper.productWidget.sizeLabel', 'Size:')}
        </span>
        <VariantChip>S</VariantChip>
        <VariantChip active>M</VariantChip>
        <VariantChip>L</VariantChip>
      </div>
    </div>
  )
}

const CheckoutWidget = () => {
  const { t } = useTranslation('features')
  return (
    <div className="space-y-1.5 rounded-xl border p-3" style={{ background: css.p10, borderColor: css.p20border }}>
      <div className="flex justify-between text-[10px]">
        <span style={{ color: css.mutedFg }}>{t('hero.stepper.checkoutWidget.subtotal', 'Subtotal')}</span>
        <span className="font-semibold" style={{ color: css.fg }}>{t('hero.stepper.checkoutWidget.subtotalVal', '₨ 6,800')}</span>
      </div>
      <div className="flex justify-between text-[10px]">
        <span style={{ color: css.success }}>{t('hero.stepper.checkoutWidget.coupon', 'Coupon (SAVE15)')}</span>
        <span className="font-semibold" style={{ color: css.success }}>{t('hero.stepper.checkoutWidget.couponVal', '−₨ 1,020')}</span>
      </div>
      <div
        className="mt-1 flex justify-between border-t pt-1.5 text-[11px] font-bold"
        style={{ borderColor: css.p20border }}
      >
        <span style={{ color: css.fg }}>{t('hero.stepper.checkoutWidget.total', 'Total')}</span>
        <span style={{ color: css.primary }}>{t('hero.stepper.checkoutWidget.totalVal', '₨ 5,780')}</span>
      </div>
    </div>
  )
}

const InvoiceWidget = () => {
  const { t } = useTranslation('features')
  return (
    <div className="rounded-xl border p-3" style={{ background: css.p10, borderColor: css.p20border }}>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-bold" style={{ color: css.fg }}>
            {t('hero.stepper.invoiceWidget.title', 'Stallio Invoice')}
          </div>
          <div className="mt-0.5 text-[9px]" style={{ color: css.mutedFg }}>
            {t('hero.stepper.invoiceWidget.subtitle', '#INV-1042 · Aug 2026')}
          </div>
        </div>
        <div className="text-[11px] font-bold" style={{ color: css.primary }}>
          {t('hero.stepper.invoiceWidget.totalVal', '₨ 5,780')}
        </div>
      </div>
      <button
        type="button"
        className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-[10px] font-semibold transition-opacity duration-150 hover:opacity-80"
        style={{
          background: 'color-mix(in oklch, oklch(0.58 0.22 150) 14%, var(--surface))',
          color:      'oklch(0.48 0.22 150)',
          border:     '1px solid color-mix(in oklch, oklch(0.58 0.22 150) 22%, var(--border))',
        }}
      >
        <FaWhatsapp size={11} aria-hidden="true" />
        {t('hero.stepper.invoiceWidget.shareWhatsApp', 'Share via WhatsApp')}
      </button>
    </div>
  )
}

// Keyed by step id — used for AnimatePresence key prop
const WIDGET_MAP = {
  orders:   <OrderWidget />,
  products: <ProductWidget />,
  checkout: <CheckoutWidget />,
  invoice:  <InvoiceWidget />,
}

// ─── Opacity-only crossfade variants — zero height/layout cost ────────────────
const widgetVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.16, ease: 'easeIn' } },
}

const LiquidStepperCard = ({ reducedMotion }) => {
  const { t } = useTranslation('features')
  const [activeStep, setActiveStep] = useState(0)
  const timerRef    = useRef(null)
  // Guards one-time autoplay start without a useEffect
  const startedRef  = useRef(false)

  const steps = [
    { id: 'orders',   num: 1, label: t('hero.stepper.steps.orders.label', 'Orders'),   description: t('hero.stepper.steps.orders.description', 'Every order in one feed.'), Icon: STEP_ICONS.orders },
    { id: 'products', num: 2, label: t('hero.stepper.steps.products.label', 'Products'), description: t('hero.stepper.steps.products.description', 'Catalog, variants, stock.'), Icon: STEP_ICONS.products },
    { id: 'checkout', num: 3, label: t('hero.stepper.steps.checkout.label', 'Checkout'), description: t('hero.stepper.steps.checkout.description', 'Coupons & delivery fees.'), Icon: STEP_ICONS.checkout },
    { id: 'invoice',  num: 4, label: t('hero.stepper.steps.invoice.label', 'Invoices'), description: t('hero.stepper.steps.invoice.description', 'PDF invoices, one tap.'), Icon: STEP_ICONS.invoice },
  ]

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveStep((s) => (s + 1) % steps.length)
    }, AUTOPLAY_MS)
  }

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  if (!startedRef.current) {
    startedRef.current = true
    setTimeout(startTimer, 0)
  }

  const handleSelectStep = (idx) => {
    setActiveStep(idx)
    startTimer() // resets countdown
  }

  const activeStepId = steps[activeStep]?.id || 'orders'

  return (
    <motion.div
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border lg:mx-0 lg:ms-auto"
      style={{
        background:          'color-mix(in oklch, var(--surface) 92%, transparent)',
        borderColor:         css.p35,
        boxShadow:           `0 0 0 1px ${css.p8}, 0 24px 60px -8px color-mix(in oklch, var(--primary) 14%, transparent), 0 8px 24px color-mix(in oklch, var(--foreground) 6%, transparent)`,
        backdropFilter:      'blur(20px)',
        WebkitBackdropFilter:'blur(20px)',
      }}
      initial={{ opacity: 0, y: 44, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
      transition={{ duration: 1.1, delay: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
    >
      {/* Radial glow — decorative only */}
      <div
        className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
        style={{ background: css.primary }}
        aria-hidden="true"
      />

      {/* ── Card header — browser chrome dots ── */}
      <div
        className="flex items-center justify-between border-b px-4 py-3"
        style={{ borderColor: css.p20border }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-lg"
            style={{ background: css.p14, border: `1px solid ${css.p20border}` }}
          >
            <span className="font-heading text-[9px] font-extrabold" style={{ color: css.primary }}>S</span>
          </div>
          <span className="text-[11px] font-semibold" style={{ color: css.fg }}>
            {t('hero.stepper.dashboardTitle', 'Stallio Dashboard')}
          </span>
        </div>
        {/* Traffic-light dots — decorative */}
        <div className="flex gap-1.5" aria-hidden="true">
          {['oklch(0.7 0.16 145)', 'oklch(0.75 0.16 85)', css.p45].map((bg, i) => (
            <div key={i} className="h-2 w-2 rounded-full opacity-70" style={{ background: bg }} />
          ))}
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="p-4">
        {/* Tagline */}
        <p className="mb-4 text-[11px] font-medium leading-relaxed text-start" style={{ color: css.mutedFg }}>
          {t('hero.stepper.tagline', 'Catalog, checkout, orders, and invoices in one dashboard loop.')}
        </p>

        {/* Two-column: vertical timeline | step tabs */}
        <div className="flex gap-3.5">

          {/* ── Vertical liquid timeline ── */}
          <div aria-hidden="true" className="relative flex flex-col items-center pt-1" style={{ width: 28 }}>
            {/* Static track */}
            <div
              className="absolute bottom-3 top-3 w-px rounded-full"
              style={{ background: css.border, left: '50%', transform: 'translateX(-50%)' }}
            />
            {/* Liquid fill — travels from top-of-track to active node */}
            {!reducedMotion && (
              <motion.div
                className="absolute top-3 w-px rounded-full"
                style={{
                  background: `linear-gradient(to bottom, ${css.primary}, color-mix(in oklch, var(--primary) 45%, transparent))`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
                animate={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.48, ease: easePremium }}
              />
            )}

            {/* Nodes — rendered in fixed positions, no layout/margin changes */}
            <div className="relative flex h-full flex-col items-center justify-between" style={{ gap: '1.75rem' }}>
              {steps.map((step, i) => {
                const isActive = activeStep === i
                const isPast   = activeStep > i
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleSelectStep(i)}
                    className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
                    style={{
                      background:  isActive ? css.primary : isPast ? css.p14 : css.surface,
                      borderColor: isActive ? css.primary : isPast ? css.p35 : css.border,
                      color:       isActive ? css.primaryFg : isPast ? css.primary : css.mutedFg,
                      boxShadow:   isActive ? `0 0 0 3px ${css.p8}, 0 0 12px ${css.p30}` : 'none',
                      transform:   isActive ? 'scale(1.12)' : 'scale(1)',
                      outline:     'none',
                    }}
                    aria-label={`Step ${step.num}: ${step.label}`}
                    aria-pressed={isActive}
                  >
                    <step.Icon size={12} aria-hidden="true" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Step labels — always rendered, tab-style, no collapse/expand ── */}
          <div className="flex flex-1 min-w-0 flex-col" style={{ gap: '1.75rem', paddingTop: 2 }}>
            {steps.map((step, i) => {
              const isActive = activeStep === i
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleSelectStep(i)}
                  className="flex min-w-0 flex-col items-start gap-0.5 text-start focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm transition-opacity duration-200 cursor-pointer"
                  style={{ opacity: isActive ? 1 : 0.45, outline: 'none' }}
                  aria-pressed={isActive}
                  aria-label={`${step.label}: ${step.description}`}
                >
                  <span
                    className="text-[12px] font-bold leading-tight transition-colors duration-200"
                    style={{ color: isActive ? css.fg : css.mutedFg }}
                  >
                    {step.label}
                  </span>
                  <span
                    className="text-[10px] leading-snug transition-colors duration-200"
                    style={{ color: css.mutedFg }}
                  >
                    {step.description}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div
          className="mt-4 border-t pt-3 text-start"
          style={{ borderColor: css.p20border, minHeight: 88 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeStepId}
              variants={reducedMotion ? {} : widgetVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {WIDGET_MAP[activeStepId]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Progress indicator ── */}
        <div className="mt-3 flex items-center gap-2">
          {steps.map((step, i) => (
            <button
              key={step.id}
              type="button"
              onClick={() => handleSelectStep(i)}
              className="h-0.5 flex-1 rounded-full transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
              style={{
                background: i <= activeStep ? css.primary : css.border,
                opacity:    i === activeStep ? 1 : i < activeStep ? 0.55 : 0.28,
              }}
              aria-label={`Go to step ${i + 1}: ${step.label}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main FeaturesHero section ────────────────────────────────────────────────
const FeaturesHero = () => {
  const { t } = useTranslation('features')
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: 'visible' }

  return (
    <section
      aria-labelledby="features-hero-heading"
      className="relative isolate overflow-hidden border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Background — matches home Hero / AboutHero exactly */}
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 70% 20%, color-mix(in oklch, var(--primary) 7%, transparent), transparent 68%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 30% 80%, color-mix(in oklch, var(--primary) 4%, transparent), transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px] lg:gap-10 xl:gap-16">

          {/* ── LEFT: Hero copy ── */}
          <motion.div
            className="max-w-2xl text-center lg:text-start"
            variants={staggerHero}
            {...motionProps}
          >
            {/* Eyebrow badge */}
            <motion.div variants={revealSoft}>
              <div
                className="mb-6 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5"
                style={{
                  borderColor: 'var(--border)',
                  background:  'color-mix(in oklch, var(--surface) 80%, transparent)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: css.primary }} />
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: css.mutedFg }}
                >
                  {t('hero.eyebrow')}
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="features-hero-heading"
              variants={blurReveal}
              className="font-heading font-extrabold tracking-[-0.055em]"
              style={{
                fontSize:  'clamp(2.6rem, 5.5vw, 4.5rem)',
                lineHeight: 1.0,
                color:     'var(--foreground)',
              }}
            >
              {t('hero.headline')}
              <br />
              <span style={{ color: css.primary }}>
                {t('hero.headlineHighlight')}
              </span>
            </motion.h1>

            {/* Sub copy */}
            <motion.p
              variants={reveal}
              className="mx-auto mt-6 max-w-xl text-base leading-7 sm:text-lg lg:mx-0 text-center lg:text-start"
              style={{ color: css.mutedFg }}
            >
              {t('hero.body')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={reveal}
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <a
                href="https://www.stallio.shop/signup"
                className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-xl font-semibold shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring px-6 py-3 text-sm"
                style={{
                  background: css.primary,
                  color:      css.primaryFg,
                  boxShadow:  `0 4px 14px ${css.p30}`,
                }}
              >
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]"
                  aria-hidden="true"
                />
                {t('hero.startFree', 'Start Free')}
                <ArrowIcon />
              </a>
              <Link
                to="/how-it-works"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: 'var(--border)',
                  color:       'var(--foreground)',
                  background:  'color-mix(in oklch, var(--surface) 80%, transparent)',
                }}
              >
                {t('hero.seeHow', 'See How It Works')}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden="true">→</span>
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={revealSoft}
              className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start"
            >
              <TrustBadge>{t('hero.trustFree', 'Free to start')}</TrustBadge>
              <TrustBadge>{t('hero.trustCard', 'No card required')}</TrustBadge>
              <TrustBadge>{t('hero.trustLive', 'Live in minutes')}</TrustBadge>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Fixed-height stepper card ── */}
          <div className="flex justify-center lg:justify-end">
            <LiquidStepperCard reducedMotion={reducedMotion} />
          </div>

        </div>
      </div>
    </section>
  )
}

export default FeaturesHero