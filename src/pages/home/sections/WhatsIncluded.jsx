import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Globe, Package, Store, Sliders, FileText, Tag, FileCheck, Truck, Languages, 
TrendingUp, MessageSquare, Sparkles, ShoppingBag, Settings, LineChart, } from 'lucide-react'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { easePremium, staggerContainer, revealSoft } from '../../../utils/motionVariants'

// ─── Feature Icons Definition ────────────────────────────────────────────────
const COLUMN_CONFIGS = [
  {
    key: 'storeProducts',
    icon: <ShoppingBag className="h-4 w-4 text-primary" aria-hidden="true" />,
    items: [
      { id: 'link', icon: <Globe className="h-4 w-4" aria-hidden="true" />, defaultLabel: 'Hosted stallio.shop link', defaultSub: 'No domain needed' },
      { id: 'products', icon: <Package className="h-4 w-4" aria-hidden="true" />, defaultLabel: 'Unlimited products & photos', defaultSub: 'No caps, ever' },
      { id: 'storefront', icon: <Store className="h-4 w-4" aria-hidden="true" />, defaultLabel: 'Mobile storefront & checkout', defaultSub: 'Cart built-in' },
      { id: 'variants', icon: <Sliders className="h-4 w-4" aria-hidden="true" />, defaultLabel: 'Variants, sale prices & stock', defaultSub: 'Sizes, colours, and more' },
    ],
  },
  {
    key: 'operations',
    icon: <Settings className="h-4 w-4 text-primary" aria-hidden="true" />,
    items: [
      { id: 'pages', icon: <FileText className="h-4 w-4" aria-hidden="true" />, defaultLabel: 'About and Contact pages', defaultSub: 'Ready to customise' },
      { id: 'coupons', icon: <Tag className="h-4 w-4" aria-hidden="true" />, defaultLabel: 'Coupons and delivery fees', defaultSub: 'Discounts that close sales' },
      { id: 'invoice', icon: <FileCheck className="h-4 w-4" aria-hidden="true" />, defaultLabel: 'PDF invoice per order', defaultSub: 'Auto-generated' },
      { id: 'orders', icon: <Truck className="h-4 w-4" aria-hidden="true" />, defaultLabel: 'Mark paid, ship & export CSV', defaultSub: 'Full order lifecycle' },
    ],
  },
  {
    key: 'growth',
    icon: <LineChart className="h-4 w-4 text-primary" aria-hidden="true" />,
    items: [
      { id: 'i18n', icon: <Languages className="h-4 w-4" aria-hidden="true" />, defaultLabel: 'Shop in EN, ES, and AR', defaultSub: 'Dashboard too' },
      { id: 'analytics', icon: <TrendingUp className="h-4 w-4" aria-hidden="true" />, defaultLabel: 'Revenue and order charts', defaultSub: "See what's working" },
      { id: 'messages', icon: <MessageSquare className="h-4 w-4" aria-hidden="true" />, defaultLabel: 'Buyer messages & support chat', defaultSub: 'Stay close to customers' },
      { id: 'free', icon: <Sparkles className="h-4 w-4" aria-hidden="true" />, defaultLabel: 'First month free', defaultSub: 'No card required', highlight: true },
    ],
  },
]

// ─── Single feature row ───────────────────────────────────────────────────────
const FeatureRow = ({ feature, delay, isVisible, reducedMotion }) => (
  <motion.div
    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
    animate={isVisible ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease: easePremium, delay }}
    className="group flex items-start gap-3 py-3 border-b last:border-b-0"
    style={{ borderColor: 'var(--border)' }}
  >
    {/* Icon Container */}
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

// ─── Main section ─────────────────────────────────────────────────────────────
const WhatsIncluded = () => {
  const { t } = useTranslation('home')
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
        {/* ── Header ── */}
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
            {t('whatsIncluded.eyebrow')}
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
            {t('whatsIncluded.headline')}
          </motion.h2>

          <motion.p
            variants={revealSoft}
            className="mx-auto mt-4 max-w-lg text-base leading-7"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {t('whatsIncluded.body')}
          </motion.p>
        </motion.div>

        {/* ── 3-column feature grid ── */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {COLUMN_CONFIGS.map((colConfig, colIdx) => {
            const rawColFeatures = t(`whatsIncluded.columns.${colConfig.key}.features`, { returnObjects: true })
            const rawColItems = Array.isArray(rawColFeatures)
              ? rawColFeatures
              : t(`whatsIncluded.columns.${colConfig.key}.items`, { returnObjects: true })
            const colTitle = t(`whatsIncluded.columns.${colConfig.key}.label`, t(`whatsIncluded.columns.${colConfig.key}.title`, colConfig.key))

            return (
              <div key={colConfig.key}>
                {/* Column heading */}
                <motion.div
                  className="mb-4 flex items-center gap-2 pb-3 border-b"
                  style={{ borderColor: 'color-mix(in oklch, var(--primary) 20%, var(--border))' }}
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, ease: easePremium, delay: colIdx * 0.08 }}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                    {colConfig.icon}
                  </div>
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.22em]"
                    style={{ color: 'var(--primary)' }}
                  >
                    {colTitle}
                  </span>
                </motion.div>

                {/* Feature rows */}
                {colConfig.items.map((itemDef, rowIdx) => {
                  const translatedItem = Array.isArray(rawColItems)
                    ? rawColItems.find(it => it?.id === itemDef.id) || rawColItems[rowIdx]
                    : null
                  const feature = {
                    ...itemDef,
                    label: translatedItem?.label || itemDef.defaultLabel,
                    sub: translatedItem?.sub || itemDef.defaultSub,
                  }

                  return (
                    <FeatureRow
                      key={feature.id}
                      feature={feature}
                      delay={0.1 + colIdx * 0.07 + rowIdx * 0.06}
                      isVisible={isVisible}
                      reducedMotion={reducedMotion}
                    />
                  )
                })}
              </div>
            )
          })}
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
            {t('whatsIncluded.bottomBadge')}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatsIncluded