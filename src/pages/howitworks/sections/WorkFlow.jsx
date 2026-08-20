import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Store, PackagePlus, Share2, Check, Plus, Upload, Copy, ExternalLink, FileText,
  Sparkles, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight
} from 'lucide-react'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa6'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { easePremium } from '../../../utils/motionVariants'
import SectionHeading from '../../../components/SectionHeading'

/* ─── Mockup 1: Store Setup / Branding Mockup ─── */
const StoreBuilderMockup = () => {
  const { t } = useTranslation('howitworks')
  const [selectedColor, setSelectedColor] = useState('oklch(0.52 0.22 268)')
  const colors = ['oklch(0.52 0.22 268)', 'oklch(0.58 0.20 150)', 'oklch(0.62 0.22 15)', 'oklch(0.68 0.18 65)']

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 p-0.5 sm:p-1">
      {/* Top Studio Bar */}
      <div
        className="flex items-center justify-between rounded-xl border p-2 sm:p-2.5"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&auto=format&q=80"
            alt="Store Avatar"
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl object-cover border"
            style={{ borderColor: selectedColor }}
          />
          <div className="text-start">
            <div className="flex items-center gap-1">
              <span className="text-[11px] sm:text-xs font-extrabold" style={{ color: 'var(--foreground)' }}>
                {t('workflow.mockups.storeBuilder.storeName', 'Your Store')}
              </span>
              <ShieldCheck size={11} className="text-blue-500" />
            </div>
            <span className="text-[9px] sm:text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
              {t('workflow.mockups.storeBuilder.domain', 'stallio.shop/your-store')}
            </span>
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[8px] sm:text-[9px] font-bold text-emerald-600">
          <CheckCircle2 size={9} /> {t('workflow.mockups.storeBuilder.published', 'Published')}
        </span>
      </div>

      {/* Brand Color Selector */}
      <div
        className="rounded-xl border p-2.5 sm:p-3 text-start"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider block mb-1.5 sm:mb-2" style={{ color: 'var(--muted-foreground)' }}>
          {t('workflow.mockups.storeBuilder.accentLabel', 'Select Brand Accent Color')}
        </label>
        <div className="flex items-center gap-2">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedColor(c)}
              className="h-5 w-5 sm:h-6 sm:w-6 rounded-full transition-transform hover:scale-110 flex items-center justify-center cursor-pointer"
              style={{
                background: c,
                boxShadow: selectedColor === c ? `0 0 0 2px var(--surface), 0 0 0 3px ${c}` : 'none',
              }}
              aria-label="Select accent color"
            >
              {selectedColor === c && <Check size={10} className="text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Live Storefront Preview Box */}
      <div
        className="rounded-xl border p-2.5 sm:p-3 transition-colors text-start"
        style={{ borderColor: 'var(--border)', background: 'color-mix(in oklch, var(--surface-muted) 80%, transparent)' }}
      >
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <span className="text-[9px] sm:text-[10px] font-bold" style={{ color: 'var(--foreground)' }}>
            {t('workflow.mockups.storeBuilder.liveLinkReady', 'Live Link Ready:')}
          </span>
          <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold" style={{ color: selectedColor }}>
            <Copy size={9} /> {t('workflow.mockups.storeBuilder.copyLink', 'Copy Link')}
          </span>
        </div>
        <div
          dir="ltr"
          className="flex items-center justify-between rounded-lg border px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-mono"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--foreground)' }}
        >
          <span className="truncate">stallio.shop/your-store</span>
          <ExternalLink size={11} className="shrink-0" style={{ color: 'var(--muted-foreground)' }} />
        </div>
      </div>
    </div>
  )
}

/* ─── Mockup 2: Product Catalog & Inventory Manager ─── */
const ProductCatalogMockup = () => {
  const { t } = useTranslation('howitworks')
  const products = [
    {
      id: 1,
      name: t('workflow.mockups.productCatalog.products.suit.name', "Men's Suit Classic"),
      price: t('workflow.mockups.productCatalog.products.suit.price', '₨ 3,400'),
      stock: 12,
      img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop&auto=format&q=80',
    },
    {
      id: 2,
      name: t('workflow.mockups.productCatalog.products.tote.name', 'Canvas Tote Bag'),
      price: t('workflow.mockups.productCatalog.products.tote.price', '₨ 2,800'),
      stock: 8,
      img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&h=200&fit=crop&auto=format&q=80',
    },
    {
      id: 3,
      name: t('workflow.mockups.productCatalog.products.sneakers.name', 'Court Sneakers'),
      price: t('workflow.mockups.productCatalog.products.sneakers.price', '₨ 6,200'),
      stock: 5,
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&auto=format&q=80',
    },
  ]

  return (
    <div className="flex flex-col gap-2 p-0.5 sm:p-1">
      {/* Action Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
          {t('workflow.mockups.productCatalog.title', 'Product Catalog (3)')}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex items-center gap-1 rounded-lg border px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold cursor-pointer"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--foreground)' }}
          >
            <Upload size={9} /> {t('workflow.mockups.productCatalog.bulk', 'Bulk')}
          </button>
          <button
            type="button"
            className="flex items-center gap-1 rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold text-white cursor-pointer"
            style={{ background: 'var(--primary)' }}
          >
            <Plus size={9} /> {t('workflow.mockups.productCatalog.add', 'Add')}
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-1.5 sm:gap-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border p-1.5 sm:p-2 text-start"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <img src={p.img} alt={p.name} className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover border shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-bold truncate" style={{ color: 'var(--foreground)' }}>
                  {p.name}
                </p>
                <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
                  <span className="font-semibold text-primary">{p.price}</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-semibold">
                    {p.stock} {t('workflow.mockups.productCatalog.inStock', 'in stock')}
                  </span>
                </div>
              </div>
            </div>

            <span className="rounded border px-1 sm:px-1.5 py-0.5 text-[8px] sm:text-[9px] font-semibold shrink-0" style={{ borderColor: 'var(--border)' }}>
              {t('workflow.mockups.productCatalog.sizes', 'S/M/L')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Mockup 3: Social Link & WhatsApp Checkout Mockup ─── */
const ShareAndCheckoutMockup = () => {
  const { t } = useTranslation('howitworks')

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 p-0.5 sm:p-1">
      {/* Social Bio Card Preview */}
      <div
        className="rounded-xl border p-2.5 sm:p-3 text-start"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
          <FaInstagram className="text-pink-500 shrink-0" size={13} />
          <span className="text-[10px] sm:text-[11px] font-bold" style={{ color: 'var(--foreground)' }}>
            {t('workflow.mockups.shareCheckout.instagramBio', 'Instagram Bio Link')}
          </span>
        </div>
        <div
          dir="ltr"
          className="flex items-center justify-between rounded-lg border px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs"
          style={{ borderColor: 'var(--border)', background: 'color-mix(in oklch, var(--primary) 8%, var(--surface))' }}
        >
          <span className="font-bold text-primary truncate">stallio.shop/your-store</span>
          <Sparkles size={11} className="text-primary shrink-0 ms-1" />
        </div>
      </div>

      {/* WhatsApp Order Dispatch Card */}
      <div
        className="rounded-xl border p-2.5 sm:p-3 text-start"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <div className="flex items-center gap-1.5">
            <FaWhatsapp className="text-emerald-500 shrink-0" size={13} />
            <span className="text-[11px] sm:text-xs font-bold" style={{ color: 'var(--foreground)' }}>
              {t('workflow.mockups.shareCheckout.newOrderReceived', 'New Order Received')}
            </span>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold text-emerald-600">
            {t('workflow.mockups.shareCheckout.platform', 'WhatsApp')}
          </span>
        </div>

        <div
          className="rounded-lg border p-2 sm:p-2.5 text-xs space-y-1"
          style={{ borderColor: 'var(--border)', background: 'color-mix(in oklch, var(--surface-muted) 80%, transparent)' }}
        >
          <div className="flex justify-between font-bold text-[11px] sm:text-xs" style={{ color: 'var(--foreground)' }}>
            <span>{t('workflow.mockups.shareCheckout.orderNumber', 'Order #1042')}</span>
            <span className="text-primary">{t('workflow.mockups.shareCheckout.orderPrice', '₨ 3,400')}</span>
          </div>
          <p className="text-[10px] sm:text-[11px]" style={{ color: 'var(--muted-foreground)' }}>
            {t('workflow.mockups.shareCheckout.orderItem', "1x Classic Men's Kurta (Size M)")}
          </p>
          <div className="flex items-center justify-between pt-1 border-t mt-1.5" style={{ borderColor: 'var(--border)' }}>
            <span className="text-[9px] sm:text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
              {t('workflow.mockups.shareCheckout.customerCod', 'Ayesha K. • COD')}
            </span>
            <button
              type="button"
              className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-emerald-600 hover:underline cursor-pointer"
            >
              <FileText size={9} /> {t('workflow.mockups.shareCheckout.pdfInvoice', 'PDF Invoice')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const MOCKUP_COMPONENTS = {
  create: <StoreBuilderMockup />,
  products: <ProductCatalogMockup />,
  share: <ShareAndCheckoutMockup />,
}

const StepCopy = ({ step, isActive }) => {
  const Icon = step.icon
  return (
    <div className="text-start">
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg border text-[11px] sm:text-xs font-bold shrink-0"
          style={{
            borderColor: isActive
              ? 'color-mix(in oklch, var(--primary) 30%, var(--border))'
              : 'var(--border)',
            background: isActive
              ? 'color-mix(in oklch, var(--primary) 12%, var(--surface))'
              : 'var(--surface)',
            color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
          }}
        >
          {step.num}
        </span>
        <span
          className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <Icon size={13} style={{ color: 'var(--primary)' }} aria-hidden="true" />
          {step.kicker}
        </span>
      </div>

      <h3
        className="mt-3 sm:mt-4 font-heading font-extrabold tracking-[-0.04em]"
        style={{
          fontSize: 'clamp(1.35rem, 4vw, 2.25rem)',
          lineHeight: 1.1,
          color: 'var(--foreground)',
        }}
      >
        {step.title}
      </h3>

      <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
        {step.body}
      </p>

      <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
        {step.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-center gap-2 text-[11px] sm:text-xs font-medium"
            style={{ color: 'var(--muted-foreground)' }}
          >
            <span
              className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 items-center justify-center rounded-full"
              style={{ background: 'color-mix(in oklch, var(--primary) 15%, var(--surface))' }}
            >
              <Check size={9} style={{ color: 'var(--primary)' }} />
            </span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  )
}

const WorkflowTheatre = () => {
  const { t } = useTranslation('howitworks')
  const [activeStep, setActiveStep] = useState(0)
  const [mobileSlide, setMobileSlide] = useState(0)
  const reducedMotion = useReducedMotion()
  const carouselRef = useRef(null)

  const rawCreateBullets = t('workflow.steps.create.bullets', { returnObjects: true })
  const rawProductBullets = t('workflow.steps.products.bullets', { returnObjects: true })
  const rawShareBullets = t('workflow.steps.share.bullets', { returnObjects: true })

  const steps = [
    {
      id: 'create',
      num: '01',
      icon: Store,
      kicker: t('workflow.steps.create.kicker', 'Setup'),
      title: t('workflow.steps.create.title', 'Create your store in 60 seconds'),
      body: t('workflow.steps.create.body', 'Pick your shop name, upload your logo, and choose your primary accent brand color. Stallio instantly generates your storefront, instant checkout, and order inbox.'),
      bullets: Array.isArray(rawCreateBullets) ? rawCreateBullets : [
        'Instant live URL, no domain configuration needed',
        'Custom store branding & color palette'
      ],
      previewBadge: t('workflow.steps.create.previewBadge', 'Store Builder Studio'),
    },
    {
      id: 'products',
      num: '02',
      icon: PackagePlus,
      kicker: t('workflow.steps.products.kicker', 'Catalog'),
      title: t('workflow.steps.products.title', 'Add your products & variants'),
      body: t('workflow.steps.products.body', 'Photos, prices, variants, and stock counts in seconds. Add products directly from your camera roll and instantly get shareable product buy buttons.'),
      bullets: Array.isArray(rawProductBullets) ? rawProductBullets : [
        'Bulk photo uploads from mobile camera roll',
        'Built-in variants, size options & live stock tracking'
      ],
      previewBadge: t('workflow.steps.products.previewBadge', 'Catalog & Inventory Manager'),
    },
    {
      id: 'share',
      num: '03',
      icon: Share2,
      kicker: t('workflow.steps.share.kicker', 'Launch'),
      title: t('workflow.steps.share.title', 'Share one link & receive orders'),
      body: t('workflow.steps.share.body', 'Copy your unique Stallio link into your Instagram bio, WhatsApp status, or TikTok profile. Customers browse and order without any DM back-and-forth.'),
      bullets: Array.isArray(rawShareBullets) ? rawShareBullets : [
        'Automated WhatsApp order handoff & invoices',
        'Real-time order dashboard & receipt archiving'
      ],
      previewBadge: t('workflow.steps.share.previewBadge', 'Social Checkout & Order Inbox'),
    },
  ]

  const activeData = steps[activeStep] || steps[0]

  const handleMobileScroll = (e) => {
    const el = e.target
    const index = Math.round(el.scrollLeft / el.clientWidth)
    if (index !== mobileSlide && index >= 0 && index < steps.length) {
      setMobileSlide(index)
    }
  }

  const scrollMobileTo = (idx) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: idx * carouselRef.current.clientWidth,
        behavior: 'smooth',
      })
      setMobileSlide(idx)
    }
  }

  return (
    <section
      aria-labelledby="hiw-theatre-heading"
      className="relative border-b py-16 sm:py-24"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="hiw-theatre-heading"
          eyebrow={t('workflow.eyebrow', 'The Workflow')}
          title={t('workflow.title', 'How Stallio works in action')}
          subtitle={t('workflow.subtitle', 'Explore how your social business transitions into a real online store.')}
        />

        {/* ─── DESKTOP ONLY: Interactive Step Switcher ─── */}
        <div className="mt-12 hidden sm:grid sm:grid-cols-3 gap-4">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx
            const Icon = step.icon
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className="group relative flex flex-col items-start rounded-2xl border p-5 text-start transition-all duration-300 focus-visible:outline-none cursor-pointer"
                style={{
                  borderColor: isActive
                    ? 'color-mix(in oklch, var(--primary) 40%, var(--border))'
                    : 'var(--border)',
                  background: isActive
                    ? 'color-mix(in oklch, var(--surface) 95%, transparent)'
                    : 'color-mix(in oklch, var(--surface) 50%, transparent)',
                  boxShadow: isActive
                    ? '0 8px 24px -6px color-mix(in oklch, var(--primary) 15%, transparent)'
                    : 'none',
                }}
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold transition-colors"
                    style={{
                      background: isActive
                        ? 'var(--primary)'
                        : 'color-mix(in oklch, var(--primary) 10%, var(--surface))',
                      color: isActive ? 'var(--primary-foreground)' : 'var(--primary)',
                    }}
                  >
                    <Icon size={14} />
                  </span>
                  <span
                    className="text-xs font-extrabold tracking-wider"
                    style={{ color: isActive ? 'var(--primary)' : 'var(--muted-foreground)' }}
                  >
                    {t('workflow.stepBadge', { num: step.num, defaultValue: `STEP ${step.num}` })}
                  </span>
                </div>

                <p
                  className="mt-4 text-base font-bold transition-colors line-clamp-1"
                  style={{ color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                >
                  {step.title}
                </p>

                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                    style={{ borderColor: 'var(--primary)' }}
                    transition={{ duration: 0.3, ease: easePremium }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* ─── DESKTOP ONLY: Stage Box ─── */}
        <div
          className="mt-8 hidden sm:block overflow-hidden rounded-3xl border p-8 lg:p-10"
          style={{
            borderColor: 'var(--border)',
            background: 'color-mix(in oklch, var(--surface) 80%, transparent)',
            boxShadow: 'var(--float-shadow)',
          }}
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_400px] xl:gap-12">
            {/* Step Details Text */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? false : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: easePremium }}
                >
                  <StepCopy step={activeData} isActive={true} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visual Interactive Mockup Frame */}
            <div className="relative flex justify-center w-full">
              <div
                className="relative w-full max-w-[400px] overflow-hidden rounded-2xl border shadow-xl"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--surface)',
                }}
              >
                {/* Top Mini Header */}
                <div
                  className="flex items-center justify-between border-b px-3.5 py-2.5"
                  style={{
                    borderColor: 'var(--border)',
                    background: 'color-mix(in oklch, var(--surface-muted) 90%, transparent)',
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: 'var(--primary)' }} />
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {activeData.previewBadge}
                    </span>
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
                    style={{
                      background: 'color-mix(in oklch, var(--primary) 12%, var(--surface))',
                      color: 'var(--primary)',
                    }}
                  >
                    {t('workflow.interactive', 'Interactive')}
                  </span>
                </div>

                {/* Mockup Content View */}
                <div className="p-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeData.id}
                      initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3, ease: easePremium }}
                    >
                      {MOCKUP_COMPONENTS[activeData.id]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── MOBILE ONLY: Premium Touch Carousel ─── */}
        <div className="mt-8 sm:hidden">
          {/* Scrollable Snap Carousel */}
          <div
            ref={carouselRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 w-full pb-4"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className="w-full shrink-0 snap-center rounded-2xl border p-4 space-y-4 text-start"
                  style={{
                    borderColor: 'var(--border)',
                    background: 'color-mix(in oklch, var(--surface) 95%, transparent)',
                    boxShadow: '0 8px 24px -6px color-mix(in oklch, var(--primary) 12%, transparent)',
                  }}
                >
                  {/* Step Header Badge */}
                  <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold"
                        style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
                      >
                        <Icon size={14} />
                      </span>
                      <span className="text-xs font-extrabold" style={{ color: 'var(--foreground)' }}>
                        {step.title}
                      </span>
                    </div>
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
                      {t('workflow.stepOf', { current: step.num, total: '03', defaultValue: `STEP ${step.num} OF 03` })}
                    </span>
                  </div>

                  {/* Interactive Visual Mockup Panel inside Carousel */}
                  <div
                    className="overflow-hidden rounded-xl border"
                    style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
                  >
                    <div
                      className="flex items-center justify-between border-b px-3 py-2"
                      style={{ borderColor: 'var(--border)', background: 'color-mix(in oklch, var(--surface-muted) 90%, transparent)' }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ background: 'var(--primary)' }} />
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
                          {step.previewBadge}
                        </span>
                      </div>
                      <span className="text-[8px] font-semibold text-primary">
                        {t('workflow.liveMockup', 'Live Mockup')}
                      </span>
                    </div>
                    <div className="p-2.5">
                      {MOCKUP_COMPONENTS[step.id]}
                    </div>
                  </div>

                  {/* Step Details Copy */}
                  <div className="pt-1">
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {step.body}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {step.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-[11px] font-medium" style={{ color: 'var(--muted-foreground)' }}>
                          <Check size={11} className="text-primary shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile Pagination Controls */}
          <div className="flex items-center justify-between mt-2 px-1">
            <button
              type="button"
              onClick={() => scrollMobileTo(Math.max(0, mobileSlide - 1))}
              disabled={mobileSlide === 0}
              className="flex h-8 w-8 items-center justify-center rounded-full border text-foreground disabled:opacity-30 cursor-pointer"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
              aria-label={t('workflow.prevStepAria', 'Previous step')}
            >
              <ChevronLeft size={16} className="rtl:rotate-180" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollMobileTo(i)}
                  className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: mobileSlide === i ? 24 : 8,
                    background: mobileSlide === i ? 'var(--primary)' : 'var(--border)',
                  }}
                  aria-label={t('workflow.goToSlideAria', { slide: i + 1, defaultValue: `Go to slide ${i + 1}` })}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollMobileTo(Math.min(steps.length - 1, mobileSlide + 1))}
              disabled={mobileSlide === steps.length - 1}
              className="flex h-8 w-8 items-center justify-center rounded-full border text-foreground disabled:opacity-30 cursor-pointer"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
              aria-label={t('workflow.nextStepAria', 'Next step')}
            >
              <ChevronRight size={16} className="rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkflowTheatre
