import { useState, useCallback, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Store, AtSign, Lock, Eye, EyeOff,
  Globe, Coins, ImagePlus, UserPlus, ArrowRight,
  Check, ChevronLeft, Link2, Search, ChevronDown, X,
} from 'lucide-react'
import { css } from '../../utils/cssTokens'
import { revealSoft, scaleIn, staggerContainer } from '../../utils/motionVariants'
import useReducedMotion from '../../hooks/useReducedMotion'
import { COUNTRIES, CURRENCIES } from '../../data/signupData.js'

// ─── Step metadata ────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Account',     hint: 'How you sign in'    },
  { id: 2, label: 'Your Shop',   hint: 'What customers see' },
  { id: 3, label: 'Preferences', hint: 'Region & currency'  },
]

const SPRING = [0.22, 1, 0.36, 1]

// ─── Background orbs ─────────────────────────────────────────────────────────
const BgOrbs = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-25 blur-[120px]"
      style={{ background: 'var(--primary)' }} />
    <div className="absolute -bottom-60 -right-40 h-[600px] w-[600px] rounded-full opacity-15 blur-[140px]"
      style={{ background: 'var(--primary)' }} />
    <div className="absolute top-1/3 -right-20 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
      style={{ background: 'var(--ring)' }} />
    <div className="absolute inset-0"
      style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, var(--p-12), transparent 68%)' }} />
  </div>
)

// ─── Step indicator ───────────────────────────────────────────────────────────
const StepIndicator = ({ current }) => (
  <div className="mb-8 flex items-center justify-center gap-0" role="list" aria-label="Sign-up progress">
    {STEPS.map((step, i) => {
      const done   = step.id < current
      const active = step.id === current
      const isLast = i === STEPS.length - 1
      return (
        <div key={step.id} className="flex items-center" role="listitem">
          <div className="flex flex-col items-center gap-1.5">
            <motion.div
              animate={done ? 'done' : active ? 'active' : 'future'}
              variants={{
                done:   { scale: 1,    backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' },
                active: { scale: 1.08, backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' },
                future: { scale: 1,    backgroundColor: 'transparent',    borderColor: 'var(--border)'  },
              }}
              transition={{ duration: 0.35, ease: SPRING }}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2"
              aria-current={active ? 'step' : undefined}
            >
              {done ? (
                <Check size={13} strokeWidth={2.5} style={{ color: 'var(--primary-foreground)' }} aria-hidden="true" />
              ) : (
                <span className="text-xs font-bold tabular-nums"
                  style={{ color: active ? 'var(--primary-foreground)' : 'var(--muted-foreground)' }}>
                  {step.id}
                </span>
              )}
            </motion.div>
            <span className="text-[11px] font-semibold tracking-wide"
              style={{ color: (done || active) ? 'var(--primary)' : 'var(--muted-foreground)' }}>
              {step.label}
            </span>
          </div>
          {!isLast && (
            <div className="relative mx-3 mt-[-14px] h-px w-12 sm:w-16 overflow-hidden rounded-full"
              style={{ background: 'var(--border)' }}>
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: 'var(--primary)' }}
                animate={{ width: done ? '100%' : '0%' }}
                transition={{ duration: 0.4, ease: SPRING }}
              />
            </div>
          )}
        </div>
      )
    })}
  </div>
)

// ─── Field wrapper ────────────────────────────────────────────────────────────
const Field = ({ label, required, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-medium" style={{ color: css.fg }}>
      {label}
      {required && <span className="ml-0.5" style={{ color: 'var(--destructive)' }} aria-hidden="true">*</span>}
    </label>
    {children}
    {hint && <p className="text-[11px]" style={{ color: css.mutedFg }}>{hint}</p>}
  </div>
)

// ─── Shared field-wrapper styles (inline, avoids Tailwind-4 focus-within ring bug) ──
const fieldBox = {
  base: {
    background: css.surface,
    borderColor: css.border,
  },
}

// ─── Shared focus ring — box-shadow renders OUTSIDE the border, always visible ─
const focusRing = '0 0 0 3px color-mix(in oklch, var(--primary) 22%, transparent)'
const noRing    = '0 0 0 0px transparent'

// ─── Input ───────────────────────────────────────────────────────────────────
const Input = ({ icon: Icon, type = 'text', placeholder, value, onChange, name, autoComplete, suffix, ...rest }) => {
  const [focused, setFocused] = useState(false)
  return (
    <div
      className="flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5"
      style={{
        background: css.surface,
        borderColor: focused ? 'var(--primary)' : css.border,
        boxShadow: focused ? focusRing : noRing,
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      {Icon && <Icon size={15} strokeWidth={2} aria-hidden="true" style={{ color: focused ? 'var(--primary)' : css.mutedFg, flexShrink: 0, transition: 'color 0.15s' }} />}
      {suffix && <span className="shrink-0 select-none text-sm" style={{ color: css.mutedFg }}>{suffix}</span>}
      <input
        name={name} type={type} placeholder={placeholder} value={value} onChange={onChange}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        style={{ color: css.fg }}
        {...rest}
      />
    </div>
  )
}

// ─── Password input ───────────────────────────────────────────────────────────
const PasswordInput = ({ placeholder, value, onChange, name, autoComplete }) => {
  const [show, setShow] = useState(false)
  const [focused, setFocused] = useState(false)
  return (
    <div
      className="flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5"
      style={{
        background: css.surface,
        borderColor: focused ? 'var(--primary)' : css.border,
        boxShadow: focused ? focusRing : noRing,
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      <Lock size={15} strokeWidth={2} aria-hidden="true"
        style={{ color: focused ? 'var(--primary)' : css.mutedFg, flexShrink: 0, transition: 'color 0.15s' }} />
      <input
        name={name} type={show ? 'text' : 'password'} placeholder={placeholder}
        value={value} onChange={onChange} autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        style={{ color: css.fg }}
      />
      <button type="button" onClick={() => setShow(p => !p)}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="shrink-0 rounded-md p-0.5 transition-colors duration-150"
        style={{ color: css.mutedFg }}>
        {show
          ? <EyeOff size={15} strokeWidth={2} aria-hidden="true" />
          : <Eye    size={15} strokeWidth={2} aria-hidden="true" />}
      </button>
    </div>
  )
}

const CustomDropdown = ({ items, value, onChange, placeholder, icon: Icon, searchPlaceholder = 'Search…' }) => {
  const [open, setOpen]       = useState(false)
  const [query, setQuery]     = useState('')
  const containerRef          = useRef(null)
  const searchRef             = useRef(null)
  const [focused, setFocused] = useState(false)

  const selected = items.find(i => i.id === value)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Focus search when dropdown opens
  useEffect(() => {
    if (open && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 50)
    }
    if (!open) setQuery('')
  }, [open])

  const filtered = items.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    (item.badge && item.badge.toLowerCase().includes(query.toLowerCase()))
  )

  const handleSelect = (id) => {
    onChange(id)
    setOpen(false)
    setQuery('')
    setFocused(false)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => { setOpen(p => !p); setFocused(true) }}
        onBlur={(e) => { if (!containerRef.current?.contains(e.relatedTarget)) setFocused(false) }}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-left"
        style={{
          background: css.surface,
          borderColor: open || focused ? 'var(--primary)' : css.border,
          boxShadow: (open || focused) ? focusRing : noRing,
          transition: 'border-color 0.15s, box-shadow 0.15s',
          minHeight: '42px',
        }}
      >
        {Icon && (
          <Icon size={15} strokeWidth={2} aria-hidden="true"
            style={{ color: (open || focused) ? 'var(--primary)' : css.mutedFg, flexShrink: 0, transition: 'color 0.15s' }} />
        )}

        {selected ? (
          <span className="flex flex-1 items-center gap-2 min-w-0">
            {selected._code ? (
              <img
                src={`https://flagcdn.com/20x15/${selected._code.toLowerCase()}.png`}
                width="20" height="15"
                alt={selected.label}
                className="shrink-0 rounded-sm object-cover"
                style={{ display: 'inline-block' }}
              />
            ) : (
              <span className="text-base leading-none select-none" aria-hidden="true">{selected.flag}</span>
            )}
            <span className="truncate text-sm font-medium" style={{ color: css.fg }}>{selected.label}</span>
            {selected.badge && (
              <span className="ml-auto shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular-nums"
                style={{ background: 'var(--p-12)', color: 'var(--primary)' }}>
                {selected.badge}
              </span>
            )}
          </span>
        ) : (
          <span className="flex-1 text-sm" style={{ color: css.mutedFg }}>{placeholder}</span>
        )}

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: SPRING }}
          className="shrink-0"
          aria-hidden="true"
        >
          <ChevronDown size={14} strokeWidth={2} style={{ color: css.mutedFg }} />
        </motion.span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: SPRING }}
            role="listbox"
            className="absolute left-0 right-0 mt-1.5 overflow-hidden rounded-lg border shadow-xl"
            style={{
              zIndex: 50,
              background: css.surface,
              borderColor: css.border,
              boxShadow: '0 8px 32px -4px color-mix(in oklch, var(--foreground) 12%, transparent), 0 2px 8px -2px color-mix(in oklch, var(--foreground) 6%, transparent)',
            }}
          >
            {/* Search */}
            <div className="flex items-center gap-2 border-b px-3 py-2"
              style={{ borderColor: css.border }}>
              <Search size={13} strokeWidth={2} style={{ color: css.mutedFg, flexShrink: 0 }} aria-hidden="true" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                style={{ color: css.fg }}
                aria-label="Search options"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')}
                  className="shrink-0 rounded p-0.5" style={{ color: css.mutedFg }}
                  aria-label="Clear search">
                  <X size={12} strokeWidth={2} />
                </button>
              )}
            </div>

            {/* Options list */}
            <ul className="max-h-52 overflow-y-auto py-1" style={{ scrollbarWidth: 'thin' }}>
              {filtered.length === 0 ? (
                <li className="px-3 py-5 text-center text-sm" style={{ color: css.mutedFg }}>
                  No results for "{query}"
                </li>
              ) : (
                filtered.map(item => {
                  const isSelected = item.id === value
                  return (
                    <li
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(item.id)}
                      className="flex cursor-pointer items-center gap-2.5 px-3 py-2 transition-colors duration-100"
                      style={{
                        background: isSelected ? 'var(--p-10)' : 'transparent',
                        color: css.fg,
                      }}
                      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--accent)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = isSelected ? 'var(--p-10)' : 'transparent' }}
                    >
                      {item._code ? (
                        <img
                          src={`https://flagcdn.com/20x15/${item._code.toLowerCase()}.png`}
                          width="20" height="15"
                          alt={item.label}
                          className="shrink-0 rounded-sm object-cover"
                        />
                      ) : (
                        <span className="text-base leading-none select-none w-5 text-center" aria-hidden="true">
                          {item.flag}
                        </span>
                      )}
                      <span className="flex-1 truncate text-sm font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular-nums"
                          style={{
                            background: isSelected ? 'var(--p-20)' : 'var(--p-12)',
                            color: 'var(--primary)',
                          }}>
                          {item.badge}
                        </span>
                      )}
                      {isSelected && (
                        <Check size={13} strokeWidth={2.5} style={{ color: 'var(--primary)', flexShrink: 0 }} aria-hidden="true" />
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

// ─── Normalised items for dropdowns ──────────────────────────────────────────
// id = human-readable value stored in form state; flag is always the emoji
const COUNTRY_ITEMS = COUNTRIES.map(c => ({
  id:    c.name,   // store "Pakistan", not "PK"
  flag:  c.flag,   // 🇵🇰
  label: c.name,
  _code: c.code,   // for currency cross-ref only
}))
const CURRENCY_ITEMS = CURRENCIES.map(c => ({
  id:    c.code,   // store "PKR"
  flag:  COUNTRIES.find(co => co.code === c.country)?.flag ?? '🌐',
  _code: c.country ?? null,  // ISO code for flagcdn.com
  label: c.name,
  badge: c.code,   // shown as muted pill
}))

// ─── Live URL preview ─────────────────────────────────────────────────────────
const LiveUrlPreview = ({ username }) => {
  const slug = username.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase()
  return (
    <AnimatePresence>
      {slug.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1,  y: 0,  scale: 1    }}
          exit={{ opacity: 0, y: -4, scale: 0.97 }}
          transition={{ duration: 0.25, ease: SPRING }}
          className="flex items-center gap-2 rounded-lg border px-3.5 py-2.5"
          style={{ background: 'var(--p-10)', borderColor: 'var(--p-35)' }}
          aria-live="polite"
          aria-label={`Your store URL will be: stallio.shop/${slug}`}
        >
          <Link2 size={13} strokeWidth={2} style={{ color: 'var(--primary)', flexShrink: 0 }} aria-hidden="true" />
          <span className="text-[13px] font-medium" style={{ color: css.mutedFg }}>stallio.shop/</span>
          <motion.span
            key={slug}
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1,  x: 0 }}
            transition={{ duration: 0.2, ease: SPRING }}
            className="text-[13px] font-bold tracking-tight"
            style={{ color: 'var(--primary)' }}
          >
            {slug}
          </motion.span>
          <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{ background: 'var(--p-12)', color: 'var(--primary)' }}>
            your link
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Step slide variants ──────────────────────────────────────────────────────
const stepVariants = {
  enter: (dir) => ({
    opacity: 0,
    x: dir > 0 ? 32 : -32,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.38,
      ease: SPRING,
    },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -32 : 32,
    transition: {
      duration: 0.25,
    },
  }),
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const Signup = () => {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(1)
  const [dir,  setDir]  = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [logoName, setLogoName]         = useState('')

  const [form, setForm] = useState({
    email: '', password: '', confirmPassword: '',
    shopName: '', username: '', logo: null,
    country: '', currency: '',
  })

  const handle = useCallback(
    (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value })),
    []
  )
  const handleDropdown = useCallback(
    (field) => (val) => setForm(prev => ({ ...prev, [field]: val })),
    []
  )
  const handleLogo = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) { setForm(prev => ({ ...prev, logo: file })); setLogoName(file.name) }
  }, [])

  const goNext = useCallback(() => { setDir(1);  setStep(s => Math.min(s + 1, 3)) }, [])
  const goPrev = useCallback(() => { setDir(-1); setStep(s => Math.max(s - 1, 1)) }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (step < 3) { goNext(); return }
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1400))
    setIsSubmitting(false)
  }, [step, goNext])

  const motionProps = reduced
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: 'visible' }

  const selectedCountry  = COUNTRY_ITEMS.find(c => c.id === form.country)
  const selectedCurrency = CURRENCY_ITEMS.find(c => c.id === form.currency)

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:py-14">
      <BgOrbs />

      {/* Logo */}
      <motion.div className="mb-7 flex flex-col items-center gap-2.5"
        variants={staggerContainer} {...motionProps}>
        <motion.a href="/" variants={revealSoft} aria-label="Stallio — Home"
          className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          <img src="/logo.png" alt="Stallio"
            className="h-20 w-auto object-contain drop-shadow-xl sm:h-24" />
        </motion.a>
        <motion.p variants={revealSoft} className="text-sm font-medium" style={{ color: css.mutedFg }}>
          Your online shop, one link away
        </motion.p>
      </motion.div>

      {/* Card */}
      <motion.div className="w-full max-w-xl relative" variants={scaleIn} {...motionProps}>
        {/* Glow layer — sits behind the card, bleeds through blur */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-60px',
            borderRadius: '40px',
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 72%)',
            filter: 'blur(24px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div
          className="relative rounded-2xl border px-8 py-7 backdrop-blur-xl sm:px-10 sm:py-8"
          style={{
            zIndex: 1,
            background: 'color-mix(in oklch, var(--surface) 82%, transparent)',
            borderColor: css.border,
            boxShadow: '0 0 0 1px color-mix(in oklch, var(--primary) 10%, transparent), 0 14px 44px -8px color-mix(in oklch, var(--primary) 14%, transparent), 0 6px 18px color-mix(in oklch, var(--foreground) 5%, transparent)',
          }}
        >
          <StepIndicator current={step} />

          <div className="mb-6 text-center">
            <h1 className="font-heading text-2xl font-extrabold tracking-[-0.03em] sm:text-[1.75rem]"
              style={{ color: css.fg }}>
              {step === 1 && 'Create your account'}
              {step === 2 && 'Set up your shop'}
              {step === 3 && 'Almost there'}
            </h1>
            <p className="mt-1.5 text-sm" style={{ color: css.mutedFg }}>
              {STEPS[step - 1].hint}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="relative" style={{ minHeight: "220px", padding: "4px", margin: "-4px", overflow: "visible" }}>
              <AnimatePresence mode="wait" custom={dir}>

                {/* STEP 1 — Account */}
                {step === 1 && (
                  <motion.div key="step1" custom={dir}
                    variants={reduced ? {} : stepVariants}
                    initial="enter" animate="center" exit="exit"
                    className="flex flex-col gap-4"
                  >
                    <Field label="Email" required>
                      <Input name="email" type="email" icon={Mail}
                        placeholder="you@example.com"
                        value={form.email} onChange={handle('email')}
                        autoComplete="email" />
                    </Field>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Password" required hint="Minimum 8 characters">
                        <PasswordInput name="password" placeholder="Create a strong password"
                          value={form.password} onChange={handle('password')}
                          autoComplete="new-password" />
                      </Field>
                      <Field label="Confirm Password" required>
                        <PasswordInput name="confirmPassword" placeholder="Repeat password"
                          value={form.confirmPassword} onChange={handle('confirmPassword')}
                          autoComplete="new-password" />
                      </Field>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 — Shop */}
                {step === 2 && (
                  <motion.div key="step2" custom={dir}
                    variants={reduced ? {} : stepVariants}
                    initial="enter" animate="center" exit="exit"
                    className="flex flex-col gap-4"
                  >
                    <Field label="Shop Name" required>
                      <Input name="shopName" icon={Store}
                        placeholder="My Awesome Shop"
                        value={form.shopName} onChange={handle('shopName')}
                        autoComplete="organization" />
                    </Field>

                    <Field label="Username (Store URL)" required
                      hint="Letters, numbers, underscores and hyphens only">
                      <Input name="username" icon={AtSign}
                        placeholder="myshop"
                        value={form.username} onChange={handle('username')}
                        autoComplete="username"
                        pattern="[a-zA-Z0-9_\-]+" />
                      <LiveUrlPreview username={form.username} />
                    </Field>

                    <Field label="Shop Logo" hint="Optional — PNG or JPG, max 2 MB">
                      <label
                        htmlFor="logo-upload"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed py-2.5 text-sm font-medium transition-colors duration-150 hover:border-primary/50"
                        style={{ borderColor: css.border, color: css.mutedFg }}
                      >
                        <ImagePlus size={15} strokeWidth={2} aria-hidden="true" />
                        <span className="truncate max-w-[180px]">{logoName || 'Choose Logo'}</span>
                        <input id="logo-upload" name="logo" type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={handleLogo} className="sr-only" />
                      </label>
                    </Field>
                  </motion.div>
                )}

                {/* STEP 3 — Preferences */}
                {step === 3 && (
                  <motion.div key="step3" custom={dir}
                    variants={reduced ? {} : stepVariants}
                    initial="enter" animate="center" exit="exit"
                    className="flex flex-col gap-4"
                    style={{ overflow: "visible" }}
                  >
                    <Field label="Country" required>
                      <CustomDropdown
                        items={COUNTRY_ITEMS}
                        value={form.country}
                        onChange={handleDropdown('country')}
                        placeholder="Select your country"
                        icon={Globe}
                        searchPlaceholder="Search countries…"
                      />
                    </Field>

                    <Field label="Currency" required>
                      <CustomDropdown
                        items={CURRENCY_ITEMS}
                        value={form.currency}
                        onChange={handleDropdown('currency')}
                        placeholder="Select currency"
                        icon={Coins}
                        searchPlaceholder="Search currencies…"
                      />
                    </Field>

                    {/* Summary card */}
                    {(form.shopName || form.username) && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: SPRING }}
                        className="rounded-lg border px-4 py-3 text-sm"
                        style={{ background: 'var(--p-10)', borderColor: 'var(--p-35)' }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {selectedCountry && selectedCountry._code && (
                            <img
                              src={`https://flagcdn.com/20x15/${selectedCountry._code.toLowerCase()}.png`}
                              width="20" height="15"
                              alt={selectedCountry.label}
                              className="shrink-0 rounded-sm object-cover"
                            />
                          )}
                          <p className="font-semibold" style={{ color: css.fg }}>
                            {form.shopName || 'Your Shop'}
                          </p>
                          {selectedCurrency && (
                            <span className="ml-auto rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
                              style={{ background: 'var(--p-20)', color: 'var(--primary)' }}>
                              {selectedCurrency.badge}
                            </span>
                          )}
                        </div>
                        {form.username && (
                          <p className="text-[12px]" style={{ color: css.mutedFg }}>
                            stallio.shop/<span style={{ color: 'var(--primary)', fontWeight: 600 }}>{form.username}</span>
                          </p>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="mt-6 flex items-center gap-3 relative z-10">
              {step > 1 && (
                <button type="button" onClick={goPrev}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-colors duration-150 hover:bg-accent"
                  style={{ borderColor: css.border, color: css.mutedFg }}
                  aria-label="Go to previous step">
                  <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              )}

              <button type="submit" disabled={isSubmitting}
                className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg py-2.5 text-sm font-semibold shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0 disabled:pointer-events-none disabled:opacity-70"
                style={{
                  background: css.primary,
                  color: css.primaryFg,
                  boxShadow: '0 4px 18px -4px var(--p-45)',
                }}
              >
                {/* Shimmer */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] transition-transform duration-500 group-hover:translate-x-[200%]"
                  style={{ background: 'color-mix(in oklch, white 12%, transparent)' }}
                  aria-hidden="true" />

                {isSubmitting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating your shop…
                  </>
                ) : step < 3 ? (
                  <>
                    Continue
                    <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </>
                ) : (
                  <>
                    <UserPlus size={15} strokeWidth={2.2} aria-hidden="true" />
                    Create My Shop
                    <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer link */}
          <p className="mt-5 text-center text-sm" style={{ color: css.mutedFg }}>
            Already have a shop?{' '}
            <Link to="/login"
              className="font-semibold underline-offset-2 transition-colors duration-150 hover:underline rounded-sm"
              style={{ color: css.primary }}>
              Log In →
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Legal */}
      <motion.p className="mt-5 text-center text-xs" style={{ color: css.mutedFg }}
        variants={revealSoft} {...motionProps}>
        By creating a shop you agree to our{' '}
        <Link to="/terms" className="underline-offset-2 hover:underline" style={{ color: css.mutedFg }}>Terms</Link>
        {' '}and{' '}
        <Link to="/privacy" className="underline-offset-2 hover:underline" style={{ color: css.mutedFg }}>Privacy Policy</Link>.
      </motion.p>
    </div>
  )
}

export default Signup