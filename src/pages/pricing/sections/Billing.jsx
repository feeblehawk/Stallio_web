import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Sparkles, Zap, TrendingUp,
  Check, ChevronDown, Search, X,
  Globe, Package, BarChart3, Link2,
  Tag, Layers, Bell, Webhook, Headphones, ShieldCheck,
} from 'lucide-react'
import SectionHeading from '../../../components/SectionHeading'
import PrimaryCTA from '../../../components/PrimaryCTA'
import ArrowIcon from '../../../components/icons/ArrowIcon'
import AnimatedGroup from '../../../components/motion/AnimatedGroup'
import AnimatedNumber from '../../../components/motion/AnimatedNumber'
import { useInViewOnce } from '../../../hooks/useInViewOnce'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { easePremium } from '../../../utils/motionVariants'
import { CURRENCIES, getFlagByCode } from '../../../data/SignupData'
import { useCurrency, PricingProvider } from '../../../contexts/CurrencyContext'
import { css } from '../../../utils/cssTokens'

// ─── Exchange rates ────────────────────────────────────────────────────────────
const RATES = {
  USD: 1,    PKR: 278,  SAR: 3.75, AED: 3.67,
  QAR: 3.64, KWD: 0.31, BHD: 0.38, OMR: 0.38,
  JOD: 0.71, EGP: 48,   TRY: 32,   GBP: 0.79,
  EUR: 0.92, CAD: 1.36, AUD: 1.54, INR: 83,
  BDT: 110,  NGN: 1580,
}

const localPrice = (usd, code) =>
  code === 'USD' ? usd : Math.round(usd * (RATES[code] ?? 1))

// ─── Dropdown items ────────────────────────────────────────────────────────────
const CURRENCY_ITEMS = CURRENCIES.map(c => ({
  id:     c.code,
  _code:  c.country?.toLowerCase() ?? null,
  flag:   getFlagByCode(c.country),
  label:  c.name,
  badge:  c.code,
  symbol: c.symbol,
}))

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE  = [0.22, 1, 0.36, 1]
const FOCUS = '0 0 0 3px color-mix(in oklch, var(--primary) 18%, transparent)'
const NONE  = '0 0 0 0px transparent'

// ─── Currency Dropdown ─────────────────────────────────────────────────────────
const CurrencyDropdown = () => {
  const { t, i18n } = useTranslation('pricing')
  const isRtl = i18n.resolvedLanguage === 'ar'
  const { code: selected, setCurrency } = useCurrency()
  const [open,    setOpen]    = useState(false)
  const [query,   setQuery]   = useState('')
  const [focused, setFocused] = useState(false)
  const [openUp,  setOpenUp]  = useState(false)
  const wrapRef  = useRef(null)
  const inputRef = useRef(null)

  const current  = CURRENCY_ITEMS.find(i => i.id === selected)
  const filtered = CURRENCY_ITEMS.filter(i =>
    i.label.toLowerCase().includes(query.toLowerCase()) ||
    i.badge.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (!open || !wrapRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    setOpenUp(spaceBelow < 280)
    const timer = setTimeout(() => inputRef.current?.focus(), 60)
    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    const fn = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const pick = (item) => {
    setCurrency({ code: item.id, symbol: item.symbol })
    setOpen(false)
    setQuery('')
    setFocused(false)
  }

  return (
    <div ref={wrapRef} className="relative inline-flex">
      {/* ── Trigger — compact pill style ── */}
      <button
        type="button"
        id="currency-select"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('billing.currencyAria', 'Select display currency')}
        onClick={() => {
          setOpen(p => {
            if (p) setQuery('')
            return !p
          })
          setFocused(true)
        }}
        onBlur={(e) => { if (!wrapRef.current?.contains(e.relatedTarget)) setFocused(false) }}
        className="group flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
        style={{
          background:  open || focused ? 'var(--p-8)' : css.surfaceMuted,
          borderColor: open || focused ? css.primary : css.border,
          boxShadow:   open || focused ? FOCUS : NONE,
          color:       css.fg,
        }}
      >
        <Globe
          size={12}
          strokeWidth={2}
          aria-hidden="true"
          className="shrink-0 transition-colors duration-150"
          style={{ color: open || focused ? css.primary : css.mutedFg }}
        />

        {current ? (
          <span className="flex items-center gap-1.5 min-w-0">
            {current._code ? (
              <img
                src={`https://flagcdn.com/20x15/${current._code}.png`}
                width="16" height="12"
                alt={current.label}
                className="shrink-0 rounded-[2px] object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextSibling?.style?.setProperty('display', 'inline')
                }}
              />
            ) : null}
            <span
              aria-hidden="true"
              className="text-xs leading-none select-none"
              style={{ display: current._code ? 'none' : 'inline' }}
            >
              {current.flag}
            </span>
            <span className="text-[12px] font-semibold tabular-nums" style={{ color: css.primary }}>
              {current.badge}
            </span>
          </span>
        ) : (
          <span className="text-[12px]" style={{ color: css.mutedFg }}>Currency</span>
        )}

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="shrink-0"
          aria-hidden="true"
        >
          <ChevronDown size={11} strokeWidth={2.5} style={{ color: css.mutedFg }} />
        </motion.span>
      </button>

      {/* ── Dropdown panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="dp"
            role="listbox"
            aria-label={t('billing.availableCurrencies', 'Available currencies')}
            initial={{ opacity: 0, y: openUp ? 6 : -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: openUp ? 3 : -3, scale: 0.97 }}
            transition={{ duration: 0.18, ease: EASE }}
            className={`absolute w-60 overflow-hidden rounded-xl border ${isRtl ? 'right-0' : 'left-0'}`}
            style={{
              zIndex:      50,
              background:  css.surface,
              borderColor: css.border,
              boxShadow:   '0 16px 40px -8px color-mix(in oklch, var(--foreground) 14%, transparent), 0 4px 12px -4px color-mix(in oklch, var(--foreground) 8%, transparent)',
              ...(openUp
                ? { bottom: 'calc(100% + 6px)', top: 'auto' }
                : { top: 'calc(100% + 6px)', bottom: 'auto' }),
            }}
          >
            {/* Search header */}
            <div
              className="flex items-center gap-2 border-b px-3 py-2"
              style={{ borderColor: css.border, background: css.surfaceMuted }}
            >
              <Search size={11} strokeWidth={2.5} style={{ color: css.mutedFg, flexShrink: 0 }} aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t('billing.currencyPlaceholder', 'Search currency or code…')}
                className="flex-1 bg-transparent text-[11.5px] outline-none placeholder:text-muted-foreground text-start"
                style={{ color: css.fg }}
                aria-label="Search currencies"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                    type="button"
                    onClick={() => setQuery('')}
                    className="shrink-0 rounded p-0.5 transition-colors hover:text-foreground cursor-pointer"
                    style={{ color: css.mutedFg }}
                    aria-label="Clear search"
                  >
                    <X size={10} strokeWidth={2.5} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Options */}
            <ul className="max-h-52 overflow-y-auto py-1" style={{ scrollbarWidth: 'thin' }}>
              {filtered.length === 0 ? (
                <li className="px-4 py-5 text-center text-[11.5px]" style={{ color: css.mutedFg }}>
                  {t('billing.noResults', { query, defaultValue: `No results for "${query}"` })}
                </li>
              ) : (
                filtered.map(item => {
                  const isSel = item.id === selected
                  return (
                    <li
                      key={item.id}
                      role="option"
                      aria-selected={isSel}
                      onClick={() => pick(item)}
                      className="flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors duration-100 text-start"
                      style={{ background: isSel ? 'var(--p-10)' : 'transparent', color: css.fg }}
                      onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = 'var(--accent)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = isSel ? 'var(--p-10)' : 'transparent' }}
                    >
                      {item._code ? (
                        <img
                          src={`https://flagcdn.com/20x15/${item._code}.png`}
                          width="18" height="14"
                          alt={item.label}
                          className="shrink-0 rounded-[2px] object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none' }}
                        />
                      ) : null}
                      <span className="w-5 text-center text-sm leading-none select-none shrink-0" aria-hidden="true"
                        style={{ display: item._code ? 'none' : 'inline' }}>
                        {item.flag}
                      </span>
                      <span className="flex-1 truncate text-[12px] font-medium">{item.label}</span>
                      <span
                        className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold tabular-nums"
                        style={{ background: isSel ? 'var(--p-20)' : 'var(--p-10)', color: css.primary }}
                      >
                        {item.badge}
                      </span>
                      {isSel && (
                        <Check size={11} strokeWidth={3} style={{ color: css.primary, flexShrink: 0 }} aria-hidden="true" />
                      )}
                    </li>
                  )
                })
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Feature Item ─────────────────────────────────────────────────────────────
const FeatureItem = ({ title, highlight }) => (
  <li className="flex items-center gap-2.5 text-start">
    <Check
      size={13}
      strokeWidth={2.5}
      aria-hidden="true"
      style={{ color: highlight ? css.primary : css.mutedFg, flexShrink: 0 }}
    />
    <span
      className="text-[13px] leading-snug"
      style={{ color: highlight ? css.fg : css.mutedFg }}
    >
      {title}
    </span>
  </li>
)

// ─── Plan Card ────────────────────────────────────────────────────────────────
const PlanCard = ({ plan, index, isSelected, onSelect, features }) => {
  const { code: currencyCode, symbol } = useCurrency()
  const [ref, inView] = useInViewOnce()
  const reduced = useReducedMotion()

  const price         = localPrice(plan.priceUSD, currencyCode)
  const monthlyAnnual = localPrice(5 * 12, currencyCode)
  const yearlyPrice   = localPrice(55, currencyCode)
  const savings       = monthlyAnnual - yearlyPrice

  const unselectedBg = plan.tint
    ? 'color-mix(in oklch, var(--primary) 3%, var(--card))'
    : css.surface

  return (
    <motion.article
      ref={ref}
      aria-label={`${plan.name} plan`}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect() }}
      className="relative flex flex-col rounded-2xl border cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-start"
      style={{
        background:  isSelected ? 'var(--card)' : unselectedBg,
        borderColor: isSelected
          ? css.primary
          : plan.tint
            ? 'color-mix(in oklch, var(--primary) 20%, var(--border))'
            : css.border,
        boxShadow: isSelected
          ? '0 0 0 1px var(--p-35), var(--float-shadow)'
          : plan.tint
            ? '0 0 0 1px color-mix(in oklch, var(--primary) 10%, transparent)'
            : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
      }}
      initial={reduced ? false : { opacity: 0, y: 36, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.78, ease: easePremium, delay: index * 0.12 }}
      whileHover={{ y: -3, transition: { duration: 0.22, ease: easePremium } }}
    >
      {/* ── Top accent line (yearly) ── */}
      {plan.tint && (
        <div
          className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
          aria-hidden="true"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--primary) 50%, transparent 100%)',
            opacity: isSelected ? 1 : 0.45,
          }}
        />
      )}

      {/* ── Badge ── */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap z-10" aria-hidden="true">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
            style={
              isSelected
                ? { background: css.primary, color: css.primaryFg, borderColor: css.primary }
                : plan.tint
                  ? { background: 'var(--success-bg)', color: css.success, borderColor: 'var(--success-border)' }
                  : { background: css.surfaceMuted, color: css.mutedFg, borderColor: css.border }
            }
          >
            <Sparkles size={8} aria-hidden="true" />
            {plan.badge}
          </span>
        </div>
      )}

      {/* ── Card body ── */}
      <div className="relative z-10 p-6 flex flex-col flex-1">

        {/* Plan header: icon + name */}
        <div className="flex items-center gap-3 mb-5 mt-1">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: isSelected ? css.primary : plan.tint ? 'var(--p-14)' : 'var(--p-10)',
              color: isSelected ? css.primaryFg : css.primary,
            }}
            aria-hidden="true"
          >
            <plan.Icon size={17} strokeWidth={1.75} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[17px] tracking-[-0.025em]" style={{ color: css.fg }}>
              {plan.name}
            </h3>
            <p className="text-[11.5px] leading-snug mt-0.5" style={{ color: css.mutedFg }}>{plan.tagline}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end gap-1.5 mb-1">
          <span className="self-start mt-2 text-[15px] font-semibold" style={{ color: css.mutedFg }}>{symbol}</span>
          <span
            className="font-heading font-extrabold tabular-nums tracking-[-0.045em]"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.2rem)', color: css.fg, lineHeight: 1 }}
            aria-label={`${price} ${currencyCode} ${plan.billingLabel}`}
          >
            <AnimatedNumber value={price} />
          </span>
          <span className="mb-2 text-[12px] font-medium leading-snug" style={{ color: css.mutedFg }}>
            &nbsp;{plan.billingLabel}
          </span>
        </div>

        <p className="text-[11px] mb-1" style={{ color: css.mutedFg }}>{plan.billedAs}</p>

        {plan.savingsNote && (
          <p className="text-[12px] font-semibold mb-1" style={{ color: css.success }}>
            {plan.savingsNoteFormatted(symbol, savings, Math.round(yearlyPrice / 12))}
          </p>
        )}

        {/* CTA */}
        <div className="mt-5 mb-6">
          {isSelected ? (
            <PrimaryCTA to={plan.ctaHref} size="full" className="py-3 text-[14px] font-bold">
              {plan.cta}
            </PrimaryCTA>
          ) : (
            <Link
              to={plan.ctaHref}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[14px] font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              style={{
                borderColor: plan.tint ? 'color-mix(in oklch, var(--primary) 28%, var(--border))' : css.border,
                background:  plan.tint ? 'var(--p-8)' : css.surfaceMuted,
                color: css.fg,
              }}
            >
              {plan.cta}
              <ArrowIcon />
            </Link>
          )}
        </div>

        {/* ── Divider before features ── */}
        <div
          className="mb-4 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${css.border}, transparent)` }}
        />

        {/* ── Features list ── */}
        <ul className="flex flex-col gap-2">
          {features.map((feat) => (
            <FeatureItem
              key={feat.title}
              title={feat.title}
              highlight={isSelected}
            />
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

// ─── Milestone Card ───────────────────────────────────────────────────────────
const MilestoneCard = ({ month, headline, body, accent, index }) => {
  const [ref, inView] = useInViewOnce()
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border p-5 text-start"
      style={{
        background:  css.surface,
        borderColor: css.border,
        borderInlineStart: `3px solid ${accent}`,
      }}
      initial={reduced ? false : { opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: easePremium, delay: 0.1 + index * 0.1 }}
    >
      <span
        className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
        style={{ background: `color-mix(in oklch, ${accent} 12%, transparent)`, color: accent }}
      >
        {month}
      </span>
      <p className="text-[14px] font-bold leading-snug mb-1" style={{ color: css.fg }}>{headline}</p>
      <p className="text-[12px] leading-relaxed" style={{ color: css.mutedFg }}>{body}</p>
    </motion.div>
  )
}

// ─── Pricing Narrative ────────────────────────────────────────────────────────
const PricingNarrative = () => {
  const { t } = useTranslation('pricing')
  const { code: currencyCode, symbol } = useCurrency()

  const monthlyAnnual = localPrice(5 * 12, currencyCode)
  const yearlyPrice   = localPrice(55, currencyCode)
  const savings       = monthlyAnnual - yearlyPrice

  const milestones = [
    {
      month:    t('billing.narrative.milestones.m1.month', 'Month 1'),
      headline: t('billing.narrative.milestones.m1.headline', 'Low commitment, full access.'),
      body:     t('billing.narrative.milestones.m1.body', 'Monthly keeps risk minimal while you validate your store. Cancel anytime.'),
      accent:   css.mutedFg,
    },
    {
      month:    t('billing.narrative.milestones.m3.month', 'Month 3'),
      headline: t('billing.narrative.milestones.m3.headline', 'Your store is gaining traction.'),
      body:     t('billing.narrative.milestones.m3.body', 'If orders are coming in, locking in yearly starts making financial sense and frees your mind from monthly renewals.'),
      accent:   css.primary,
    },
    {
      month:    t('billing.narrative.milestones.m12.month', 'Month 12'),
      headline: t('billing.narrative.milestones.m12.headline', { symbol, savings, defaultValue: `You've saved ${symbol}${savings}.` }),
      body:     t('billing.narrative.milestones.m12.body', { symbol, savings, defaultValue: `That's ${symbol}${savings} back in your business for inventory, ads, or whatever your next move is. Yearly pays for itself fast.` }),
      accent:   css.success,
    },
  ]

  const [leftRef, leftInView] = useInViewOnce()
  const reduced = useReducedMotion()

  return (
    <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:items-start text-start">
      <motion.div
        ref={leftRef}
        className="lg:sticky lg:top-24"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={leftInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: easePremium }}
      >
        <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.2em]" style={{ color: css.primary }}>
          {t('billing.narrative.eyebrow', 'How to choose')}
        </p>
        <h3
          className="font-heading font-extrabold tracking-[-0.035em] leading-[1.1] whitespace-pre-line"
          style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: css.fg }}
        >
          {t('billing.narrative.title', 'One price.\nYour whole store.')}
        </h3>
        <p className="mt-4 text-[13.5px] leading-relaxed" style={{ color: css.mutedFg }}>
          {t('billing.narrative.p1', 'Both plans include every feature. Unlimited products, analytics, custom domain, API access, and real support. The only decision is how you pay.')}
        </p>
        <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: css.mutedFg }}>
          {t('billing.narrative.p2', 'Start monthly. Switch to yearly whenever it makes sense. Your store stays exactly the same either way.')}
        </p>
        <div
          className="mt-6 flex items-center gap-2 text-[11.5px] font-medium pt-5 border-t"
          style={{ borderColor: css.border, color: css.mutedFg }}
        >
          <ShieldCheck size={13} style={{ color: css.primary, flexShrink: 0 }} aria-hidden="true" />
          {t('billing.narrative.phoneBadge', 'Built for sellers who run their business from their phone.')}
        </div>
      </motion.div>

      <div className="flex flex-col gap-3">
        {milestones.map((m, i) => (
          <MilestoneCard key={m.month} {...m} index={i} />
        ))}
      </div>
    </div>
  )
}

// ─── Trust strip ──────────────────────────────────────────────────────────────
const TrustItem = ({ icon: Icon, iconColor, text }) => (
  <span className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: css.mutedFg }}>
    <Icon size={13} aria-hidden="true" style={{ color: iconColor }} />
    {text}
  </span>
)

// ─── Billing Section ──────────────────────────────────────────────────────────
const BillingInner = () => {
  const { t } = useTranslation('pricing')
  const [selectedPlan, setSelectedPlan] = useState('monthly')

  const features = [
    { icon: Package,    title: t('billing.features.unlimitedProducts', 'Unlimited Products') },
    { icon: Link2,      title: t('billing.features.customDomain', 'Custom Domain') },
    { icon: BarChart3,  title: t('billing.features.advancedAnalytics', 'Advanced Analytics') },
    { icon: Tag,        title: t('billing.features.discounts', 'Discounts & Flash Sales') },
    { icon: Layers,     title: t('billing.features.productVariants', 'Product Variants') },
    { icon: Bell,       title: t('billing.features.orderNotifications', 'Order Notifications') },
    { icon: Webhook,    title: t('billing.features.apiWebhooks', 'API & Webhooks') },
    { icon: Headphones, title: t('billing.features.dedicatedSupport', 'Dedicated Support') },
  ]

  const plans = [
    {
      id:           'monthly',
      name:         t('billing.plans.monthly.name', 'Monthly'),
      tagline:      t('billing.plans.monthly.tagline', 'Full power. Flexible billing.'),
      priceUSD:     5,
      billingLabel: t('billing.plans.monthly.billingLabel', 'per month'),
      billedAs:     t('billing.plans.monthly.billedAs', 'Billed monthly · cancel anytime'),
      Icon:         TrendingUp,
      badge:        t('billing.plans.monthly.badge', 'Most Popular'),
      cta:          t('billing.plans.monthly.cta', 'Start Free Trial'),
      ctaHref:      '/signup?plan=monthly',
      savingsNote:  null,
      tint:         false,
    },
    {
      id:           'yearly',
      name:         t('billing.plans.yearly.name', 'Yearly'),
      tagline:      t('billing.plans.yearly.tagline', 'Lock in the best rate.'),
      priceUSD:     55,
      billingLabel: t('billing.plans.yearly.billingLabel', 'per year'),
      billedAs:     t('billing.plans.yearly.billedAs', 'One payment · 12 months unlocked'),
      Icon:         Zap,
      badge:        t('billing.plans.yearly.badge', 'Save 27%'),
      cta:          t('billing.plans.yearly.cta', 'Start Yearly'),
      ctaHref:      '/signup?plan=yearly',
      savingsNote:  true,
      savingsNoteFormatted: (symbol, savings, avg) => t('billing.plans.yearly.savingsNote', { symbol, savings, avg, defaultValue: `Save ${symbol}${savings} vs paying monthly — ~${symbol}${avg}/mo` }),
      tint:         true,
    },
  ]

  return (
    <section
      id="billing"
      aria-labelledby="billing-heading"
      className="relative isolate overflow-hidden border-b py-20 sm:py-28"
      style={{ borderColor: css.border, background: css.bg }}
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 72% 52% at 50% -4%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 68%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, color-mix(in oklch, var(--primary) 35%, transparent) 50%, transparent 100%)',
        }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* ── Heading row: title left, currency picker right ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
          <SectionHeading
            id="billing-heading"
            eyebrow={t('billing.eyebrow', 'Pricing')}
            title={t('billing.title', 'One price. Your whole store.')}
            subtitle={t('billing.subtitle', 'Built for sellers who move fast. Everything included  no hidden tiers, no upgrade traps, no surprises.')}
            align="left"
          />

          {/* Currency dropdown — anchored to the top-right of the heading block */}
          <div className="shrink-0 pb-1 text-start">
            <p className="mb-1.5 text-[10.5px] font-medium" style={{ color: css.mutedFg }}>
              {t('billing.currencyLabel', 'Show prices in')}
            </p>
            <CurrencyDropdown />
          </div>
        </div>

        {/* ── Plan cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {plans.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              isSelected={selectedPlan === plan.id}
              onSelect={() => setSelectedPlan(plan.id)}
              features={features}
            />
          ))}
        </div>

        {/* ── Trust strip ── */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <TrustItem icon={ShieldCheck} iconColor={css.primary}      text={t('billing.trust.freeTrial', '30-day free trial')} />
          <TrustItem icon={ShieldCheck} iconColor="rgb(16 185 129)" text={t('billing.trust.noCard', 'No credit card required')} />
          <TrustItem icon={ShieldCheck} iconColor="rgb(245 158 11)" text={t('billing.trust.cancel', 'Cancel anytime')} />
        </div>

        {/* ── Pricing narrative ── */}
        <AnimatedGroup className="mt-0" stagger={0} delay={0.08} distance={14}>
          <PricingNarrative />
        </AnimatedGroup>

      </div>
    </section>
  )
}

// ─── Billing (with provider) ──────────────────────────────────────────────────
const Billing = () => (
  <PricingProvider>
    <BillingInner />
  </PricingProvider>
)

export default Billing