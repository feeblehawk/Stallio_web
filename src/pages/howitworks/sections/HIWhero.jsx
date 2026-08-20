import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Check, Store, PackagePlus, Share2, Lock, ShoppingBag, Zap, Star, ExternalLink, ShieldCheck } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { blurReveal, reveal, revealSoft, staggerHero } from '../../../utils/motionVariants'
import PrimaryCTA from '../../../components/PrimaryCTA'
import ArrowIcon from '../../../components/icons/ArrowIcon'

const ACCENT_COLORS = [
  { id: 'indigo', name: 'Indigo', val: 'oklch(0.52 0.22 268)' },
  { id: 'emerald', name: 'Emerald', val: 'oklch(0.58 0.20 150)' },
  { id: 'rose', name: 'Rose', val: 'oklch(0.62 0.22 15)' },
  { id: 'amber', name: 'Amber', val: 'oklch(0.68 0.18 65)' },
]

const EyebrowBadge = ({ children }) => (
  <div
    className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 sm:px-3.5 sm:py-1.5"
    style={{
      borderColor: 'var(--border)',
      background: 'color-mix(in oklch, var(--surface) 78%, transparent)',
      backdropFilter: 'blur(8px)',
    }}
  >
    <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--primary)' }} />
    <span
      className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em]"
      style={{ color: 'var(--muted-foreground)' }}
    >
      {children}
    </span>
  </div>
)

const TrustBadge = ({ children }) => (
  <span
    className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium"
    style={{ color: 'var(--muted-foreground)' }}
  >
    <span
      className="h-1.5 w-1.5 rounded-full"
      style={{ background: 'var(--primary)', opacity: 0.8 }}
    />
    {children}
  </span>
)

/**
 * Premium Hero Showcase Card with Mobile Optimization & RTL support.
 */
const PremiumHeroShowcase = () => {
  const { t } = useTranslation('howitworks')
  const [accent, setAccent] = useState(ACCENT_COLORS[0])
  const [activeProduct, setActiveProduct] = useState(0)

  const productsHero = [
    {
      id: 1,
      name: t('hero.showcase.products.suit.name', "Classic Men's Suit"),
      price: t('hero.showcase.products.suit.price', '₨ 3,400'),
      img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=340&fit=crop&auto=format&q=80',
      badge: t('hero.showcase.products.suit.badge', 'Popular'),
    },
    {
      id: 2,
      name: t('hero.showcase.products.tote.name', 'Canvas Tote'),
      price: t('hero.showcase.products.tote.price', '₨ 2,800'),
      img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&h=340&fit=crop&auto=format&q=80',
      badge: t('hero.showcase.products.tote.badge', 'New'),
    },
    {
      id: 3,
      name: t('hero.showcase.products.sneakers.name', 'Court Sneakers'),
      price: t('hero.showcase.products.sneakers.price', '₨ 6,200'),
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=340&fit=crop&auto=format&q=80',
      badge: t('hero.showcase.products.sneakers.badge', 'Limited'),
    },
  ]

  return (
    <div className="relative w-full max-w-lg lg:max-w-none">
      {/* Glow behind showcase card */}
      <div
        className="absolute -inset-2 sm:-inset-4 -z-10 rounded-[2rem] sm:rounded-[2.5rem] opacity-25 blur-2xl sm:blur-3xl"
        style={{ background: accent.val }}
        aria-hidden="true"
      />

      {/* Mobile Live Notification Pill (Visible above mockup on mobile) */}
      <div
        className="mb-3 flex items-center justify-between rounded-2xl border p-2.5 shadow-lg sm:hidden"
        style={{
          borderColor: 'var(--border)',
          background: 'color-mix(in oklch, var(--surface) 92%, transparent)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white font-bold shrink-0"
            style={{ background: accent.val }}
          >
            <Check size={14} />
          </span>
          <div className="text-start">
            <p className="text-[11px] font-extrabold" style={{ color: 'var(--foreground)' }}>
              {t('hero.showcase.orderReceived', 'Order #1042 Received!')}
            </p>
            <p className="text-[9px]" style={{ color: 'var(--muted-foreground)' }}>
              {t('hero.showcase.mobileProductDesc', "Classic Men's Suit × 1 • ₨ 3,400")}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-600 shrink-0">
          {t('hero.showcase.paidCod', 'Paid COD')}
        </span>
      </div>

      {/* Main Container Card */}
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl border shadow-xl sm:shadow-2xl transition-all duration-300"
        style={{
          borderColor: 'var(--border)',
          background: 'color-mix(in oklch, var(--surface) 95%, transparent)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: 'var(--float-shadow)',
        }}
      >
        {/* Browser / Domain Chrome Bar */}
        <div
          className="flex items-center justify-between border-b px-3 sm:px-4 py-2.5 sm:py-3"
          style={{
            borderColor: 'var(--border)',
            background: 'color-mix(in oklch, var(--surface-muted) 85%, transparent)',
          }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex gap-1 sm:gap-1.5">
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-400/80" />
            </div>
          </div>

          {/* URL bar */}
          <div
            dir="ltr"
            className="flex items-center gap-1 sm:gap-1.5 rounded-full border px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-medium max-w-[190px] sm:max-w-none truncate"
            style={{
              borderColor: 'var(--border)',
              background: 'var(--surface)',
              color: 'var(--foreground)',
            }}
          >
            <Lock size={9} className="text-emerald-500 shrink-0" />
            <span className="truncate">stallio.shop/your-store</span>
            <ExternalLink size={9} className="shrink-0" style={{ color: 'var(--muted-foreground)' }} />
          </div>

          <div className="flex items-center gap-1">
            <span
              className="inline-flex items-center gap-1 rounded-md px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider"
              style={{ background: 'color-mix(in oklch, var(--primary) 12%, var(--surface))', color: 'var(--primary)' }}
            >
              <Zap size={9} /> {t('hero.showcase.live', 'Live')}
            </span>
          </div>
        </div>

        {/* Store Header Banner */}
        <div className="p-3.5 sm:p-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between flex-wrap gap-2.5">
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&auto=format&q=80"
                alt="Seller Avatar"
                className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl object-cover border-2 shadow-sm"
                style={{ borderColor: accent.val }}
              />
              <div className="text-start">
                <div className="flex items-center gap-1">
                  <h3 className="text-xs sm:text-sm font-extrabold" style={{ color: 'var(--foreground)' }}>
                    {t('hero.showcase.storeName', 'Your Store')}
                  </h3>
                  <ShieldCheck size={13} className="text-blue-500" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px]" style={{ color: 'var(--muted-foreground)' }}>
                  <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                    <Star size={10} className="fill-amber-500" /> {t('hero.showcase.rating', '4.9')}
                  </span>
                  <span>•</span>
                  <span>{t('hero.showcase.orderCount', '140+ orders')}</span>
                </div>
              </div>
            </div>

            {/* Interactive Theme Color Picker */}
            <div className="flex items-center gap-1 rounded-lg sm:rounded-xl border p-1" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
              <span className="px-1 text-[9px] sm:text-[10px] font-medium" style={{ color: 'var(--muted-foreground)' }}>
                {t('hero.showcase.themeLabel', 'Theme:')}
              </span>
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setAccent(c)}
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full transition-transform hover:scale-110 focus-visible:outline-none cursor-pointer"
                  style={{
                    background: c.val,
                    boxShadow: accent.id === c.id ? `0 0 0 2px var(--surface), 0 0 0 3px ${c.val}` : 'none',
                  }}
                  title={`Switch theme to ${c.name}`}
                  aria-label={`Switch theme to ${c.name}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Product Cards Showcase */}
        <div className="p-3.5 sm:p-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
              {t('hero.showcase.productsTitle', 'Live Storefront Products')}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold" style={{ color: accent.val }}>
              {t('hero.showcase.readyBadge', '3 items ready')}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {productsHero.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveProduct(idx)}
                className="group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border text-start transition-all duration-200 cursor-pointer"
                style={{
                  borderColor: activeProduct === idx ? accent.val : 'var(--border)',
                  background: 'var(--surface)',
                  boxShadow: activeProduct === idx ? `0 4px 14px color-mix(in oklch, ${accent.val} 20%, transparent)` : 'none',
                }}
              >
                <div className="relative aspect-square w-full overflow-hidden bg-muted">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    className="absolute top-1 start-1 rounded px-1 py-0.2 text-[8px] sm:text-[9px] font-bold text-white shadow-sm"
                    style={{ background: accent.val }}
                  >
                    {item.badge}
                  </span>
                </div>
                <div className="p-1.5 sm:p-2">
                  <p className="text-[10px] sm:text-[11px] font-bold truncate" style={{ color: 'var(--foreground)' }}>
                    {item.name}
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-extrabold mt-0.5" style={{ color: accent.val }}>
                    {item.price}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Bar Handoff Preview */}
        <div
          className="flex items-center justify-between border-t px-3.5 sm:px-4 py-2.5 sm:py-3"
          style={{ borderColor: 'var(--border)', background: 'color-mix(in oklch, var(--surface-muted) 60%, transparent)' }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600">
              <FaWhatsapp size={11} />
            </span>
            <span className="text-[10px] sm:text-xs font-semibold" style={{ color: 'var(--foreground)' }}>
              {t('hero.showcase.whatsappCheckout', 'WhatsApp Checkout')}
            </span>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 rounded-lg sm:rounded-xl px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold text-white shadow-md cursor-pointer"
            style={{ background: accent.val }}
          >
            <ShoppingBag size={11} /> {t('hero.showcase.buyNow', 'Buy Now')}
          </button>
        </div>
      </div>

      {/* Desktop Floating Overlay 1 */}
      <motion.div
        className="absolute -top-4 -right-4 rtl:right-auto rtl:-left-4 z-20 hidden sm:flex items-center gap-3 rounded-2xl border p-3 shadow-2xl backdrop-blur-md"
        style={{
          borderColor: 'var(--border)',
          background: 'color-mix(in oklch, var(--surface) 92%, transparent)',
          boxShadow: 'var(--float-shadow)',
        }}
        initial={{ opacity: 0, y: -15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
      >
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl text-white font-bold shrink-0"
          style={{ background: accent.val }}
        >
          <Check size={16} />
        </span>
        <div className="text-start">
          <div className="flex items-center gap-2">
            <p className="text-xs font-extrabold" style={{ color: 'var(--foreground)' }}>
              {t('hero.showcase.orderReceived', 'Order #1042 Received!')}
            </p>
            <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600">
              {t('hero.showcase.paid', 'Paid')}
            </span>
          </div>
          <p className="text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
            {t('hero.showcase.desktopKurtaDesc', 'Silk Linen Kurta × 1 • ₨ 3,400')}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

const HowItWorksHero = () => {
  const { t } = useTranslation('howitworks')
  const reducedMotion = useReducedMotion()

  const steps = [
    {
      num: '01',
      icon: Store,
      title: t('hero.steps.step1.title', 'Create your store'),
      summary: t('hero.steps.step1.summary', 'Name it, brand it, publish instantly.'),
    },
    {
      num: '02',
      icon: PackagePlus,
      title: t('hero.steps.step2.title', 'Add your products'),
      summary: t('hero.steps.step2.summary', 'Photos, prices, and stock in seconds.'),
    },
    {
      num: '03',
      icon: Share2,
      title: t('hero.steps.step3.title', 'Share one link'),
      summary: t('hero.steps.step3.summary', 'Accept orders on IG, WhatsApp & TikTok.'),
    },
  ]

  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: 'visible' }

  return (
    <section
      aria-labelledby="hiw-hero-heading"
      className="relative isolate overflow-hidden border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Background: centered radial glow + grid */}
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 70% 20%, color-mix(in oklch, var(--primary) 7%, transparent), transparent 68%)',
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

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-10 xl:gap-14">
          {/* ── Left Column: Headline & Step Ledger ─────────────────────────────── */}
          <motion.div
            className="max-w-2xl text-center lg:text-start"
            variants={staggerHero}
            {...motionProps}
          >
            {/* Eyebrow badge */}
            <motion.div variants={revealSoft}>
              <EyebrowBadge>{t('hero.eyebrow', 'How Stallio Works')}</EyebrowBadge>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              id="hiw-hero-heading"
              variants={blurReveal}
              className="font-heading font-extrabold tracking-[-0.055em]"
              style={{
                fontSize: 'clamp(2.2rem, 7vw, 4.5rem)',
                lineHeight: 1.02,
                color: 'var(--foreground)',
              }}
            >
              {t('hero.headline', 'Three steps from')}
              <br />
              <span style={{ color: 'var(--primary)' }}>
                {t('hero.headlineHighlight', 'link to first order.')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={reveal}
              className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm leading-6 sm:text-lg sm:leading-7 lg:mx-0"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {t('hero.body', 'No storefront to design, no complex plugins to configure. Name your shop, upload your products, and paste one link everywhere your customers already are.')}
            </motion.p>

            {/* 3 Step Ledger (Optimized for Mobile Vertical & Desktop Horizontal) */}
            <motion.ol variants={reveal} className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3 text-start">
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <li
                    key={step.num}
                    className="flex items-start sm:items-center gap-3 sm:gap-3.5 rounded-xl border p-2.5 sm:p-3 transition-colors duration-200"
                    style={{
                      borderColor: 'var(--border)',
                      background: 'color-mix(in oklch, var(--surface) 60%, transparent)',
                    }}
                  >
                    <div
                      className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border text-xs font-bold mt-0.5 sm:mt-0"
                      style={{
                        borderColor: 'color-mix(in oklch, var(--primary) 25%, var(--border))',
                        background: 'color-mix(in oklch, var(--primary) 10%, var(--surface))',
                        color: 'var(--primary)',
                      }}
                    >
                      <Icon size={15} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider"
                          style={{ color: 'var(--primary)' }}
                        >
                          {t('hero.stepPrefix', 'Step')} {step.num}
                        </span>
                        <span
                          className="text-xs sm:text-xs font-bold leading-tight"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {step.title}
                        </span>
                      </div>
                      <p
                        className="text-[11px] sm:text-xs leading-snug truncate"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {step.summary}
                      </p>
                    </div>
                  </li>
                )
              })}
            </motion.ol>

            {/* CTAs */}
            <motion.div
              variants={reveal}
              className="mt-6 sm:mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <PrimaryCTA size="lg" className="w-full sm:w-auto text-sm sm:text-base py-3 sm:py-3.5 shadow-lg shadow-black/5">
                {t('hero.cta.createStore', 'Create Your Store')}
              </PrimaryCTA>
              <Link
                to="/features"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  background: 'color-mix(in oklch, var(--surface) 80%, transparent)',
                }}
              >
                {t('hero.cta.exploreFeatures', 'Explore Features')}
                <ArrowIcon />
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={revealSoft}
              className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-x-4 sm:gap-x-5 gap-y-2 lg:justify-start"
            >
              <TrustBadge>{t('hero.trust.free', 'Free to start')}</TrustBadge>
              <TrustBadge>{t('hero.trust.noCoding', 'No coding required')}</TrustBadge>
              <TrustBadge>{t('hero.trust.liveFast', 'Live in 5 mins')}</TrustBadge>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Unique Premium Hero Showcase ───────────────── */}
          <motion.div
            className="relative flex justify-center mt-2 sm:mt-0"
            initial={reducedMotion ? false : { opacity: 0, y: 44, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: reducedMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <PremiumHeroShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksHero
