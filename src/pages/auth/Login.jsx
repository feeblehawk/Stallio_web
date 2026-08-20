import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, ArrowLeft, ShieldAlert } from 'lucide-react'
import { revealSoft, scaleIn, staggerContainer } from '../../utils/motionVariants'
import useReducedMotion from '../../hooks/useReducedMotion'
import BrandLogo from '../../components/BrandLogo'
import { css } from '../../utils/cssTokens'


// ─── Spring easing ────────────────────────────────────────────────────────────
const SPRING = [0.22, 1, 0.36, 1]

// ─── Focus ring — consistent with Signup ─────────────────────────────────────
const focusRing = '0 0 0 3px color-mix(in oklch, var(--primary) 22%, transparent)'
const noRing    = '0 0 0 0px transparent'

// ─── Background orbs (identical to Signup) ───────────────────────────────────
const BgOrbs = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary opacity-25 blur-[120px]" />
    <div className="absolute -bottom-60 -right-40 h-[600px] w-[600px] rounded-full bg-primary opacity-15 blur-[140px]" />
    <div className="absolute top-1/3 -right-20 h-[300px] w-[300px] rounded-full bg-ring opacity-10 blur-[100px]" />
    <div
      className="absolute inset-0"
      style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, var(--p-12), transparent 68%)' }}
    />
  </div>
)

// ─── Back to Home — premium frosted pill ──────────────────────────────────────
const BackToHome = () => {
  const { t } = useTranslation('common')
  return (
    <motion.div
      variants={revealSoft}
      className="mb-6"
    >
      <Link
        to="/"
        aria-label={t('auth.backToHome', 'Back to Stallio home')}
        className="group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-medium 
        text-muted-foreground transition-all duration-200 hover:text-primary focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-ring"
        style={{
          borderColor: css.border,
          background: 'color-mix(in oklch, var(--surface) 80%, transparent)',
          backdropFilter: 'blur(10px)',
          color: css.mutedFg,
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <ArrowLeft
          size={13}
          strokeWidth={2}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5"
          style={{ color: css.primary }}
        />
        {t('auth.backToHome', 'Back to home')}
      </Link>
    </motion.div>
  )
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
const Field = ({ label, required, hint, children }) => (
  <div className="flex flex-col gap-1.5 text-start">
    <label className="text-[13px] font-medium text-foreground">
      {label}
      {required && (
        <span className="ml-0.5 text-destructive" aria-hidden="true">*</span>
      )}
    </label>
    {children}
    {hint && <p className="text-[11px] text-muted-foreground text-start">{hint}</p>}
  </div>
)

// ─── Text input ───────────────────────────────────────────────────────────────
const Input = ({ icon: Icon, type = 'text', placeholder, value, onChange, name, autoComplete }) => {
  const [focused, setFocused] = useState(false)
  return (
    <div
      className="flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 transition-all duration-150"
      style={{
        background:   'var(--surface)',
        borderColor:  focused ? 'var(--primary)' : 'var(--border)',
        boxShadow:    focused ? focusRing : noRing,
      }}
    >
      {Icon && (
        <Icon
          size={15}
          strokeWidth={2}
          aria-hidden="true"
          className="shrink-0 transition-colors duration-150"
          style={{ color: focused ? 'var(--primary)' : 'var(--muted-foreground)' }}
        />
      )}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground text-start"
      />
    </div>
  )
}

// ─── Password input ───────────────────────────────────────────────────────────
const PasswordInput = ({ placeholder, value, onChange, name, autoComplete }) => {
  const [show,    setShow]    = useState(false)
  const [focused, setFocused] = useState(false)
  const EyeIcon = show ? EyeOff : Eye

  return (
    <div
      className="flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 transition-all duration-150"
      style={{
        background:  'var(--surface)',
        borderColor: focused ? 'var(--primary)' : 'var(--border)',
        boxShadow:   focused ? focusRing : noRing,
      }}
    >
      <Lock
        size={15}
        strokeWidth={2}
        aria-hidden="true"
        className="shrink-0 transition-colors duration-150"
        style={{ color: focused ? 'var(--primary)' : 'var(--muted-foreground)' }}
      />
      <input
        name={name}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground text-start"
      />
      <button
        type="button"
        onClick={() => setShow(p => !p)}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="shrink-0 rounded-md p-0.5 text-muted-foreground transition-colors duration-150 hover:text-foreground cursor-pointer"
      >
        <EyeIcon size={15} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  )
}

// ─── Error banner ─────────────────────────────────────────────────────────────
const ErrorBanner = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: -8, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.25, ease: SPRING }}
    className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/8 px-3.5 py-3 text-start"
    role="alert"
    aria-live="assertive"
  >
    <ShieldAlert size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-destructive" aria-hidden="true" />
    <p className="text-[13px] font-medium text-destructive">{message}</p>
  </motion.div>
)

// ─── Main ─────────────────────────────────────────────────────────────────────
const Login = () => {
  const { t } = useTranslation('common')
  const reduced = useReducedMotion()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handle = useCallback(
    (field) => (e) => {
      setError('')
      setForm(prev => ({ ...prev, [field]: e.target.value }))
    },
    []
  )

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError(t('auth.login.errors.required', 'Please enter your email and password.'))
      return
    }
    setIsSubmitting(true)
    setError('')
    // Simulate network call — replace with real auth
    await new Promise(r => setTimeout(r, 1200))
    setIsSubmitting(false)
    // Demo: wrong-password simulation
    setError(t('auth.login.errors.invalid', 'Incorrect email or password. Please try again.'))
  }, [form, t])

  const motionProps = reduced
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: 'visible' }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:py-14">
      <BgOrbs />

      {/* ── Back to home pill ── */}
      <motion.div variants={staggerContainer} {...motionProps} className="flex flex-col items-center">
        <BackToHome />

        {/* Brand */}
        <motion.div variants={revealSoft} className="mb-7 flex flex-col items-center gap-2.5">
          <BrandLogo size="lg" />
          <p className="text-sm font-medium" style={{ color: css.mutedFg }}>
            {t('auth.login.welcomeBack', 'Welcome back to your Shop')}
          </p>
        </motion.div>
      </motion.div>

      {/* Card */}
      <motion.div className="w-full max-w-md relative" variants={scaleIn} {...motionProps}>

        {/* Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-8 rounded-[40px] blur-2xl"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in oklch, var(--primary) 16%, transparent), transparent 72%)',
          }}
        />

        <div
          className="relative z-10 rounded-2xl border border-border px-8 py-8 backdrop-blur-xl sm:px-10"
          style={{
            background:  'color-mix(in oklch, var(--surface) 82%, transparent)',
            boxShadow:   '0 0 0 1px color-mix(in oklch, var(--primary) 10%, transparent), 0 14px 44px -8px color-mix(in oklch, var(--primary) 14%, transparent), 0 6px 18px color-mix(in oklch, var(--foreground) 5%, transparent)',
          }}
        >
          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="font-heading text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-[1.75rem]">
              {t('auth.login.heading', 'Log in to Stallio')}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {t('auth.login.subtitle', 'Your store is one tap away')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            {/* Error banner */}
            {error && <ErrorBanner message={error} />}

            <Field label={t('auth.login.email', 'Email')} required>
              <Input
                name="email"
                type="email"
                icon={Mail}
                placeholder={t('auth.login.emailPlaceholder', 'you@example.com')}
                value={form.email}
                onChange={handle('email')}
                autoComplete="email"
              />
            </Field>

            <Field label={t('auth.login.password', 'Password')} required>
              <PasswordInput
                name="password"
                placeholder={t('auth.login.passwordPlaceholder', 'Your password')}
                value={form.password}
                onChange={handle('password')}
                autoComplete="current-password"
              />
            </Field>

            {/* Forgot link — right-aligned under password in LTR, left-aligned in RTL */}
            <div className="-mt-1 flex justify-end">
              <Link
                to="/forgot-password"
                className="text-[13px] font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm transition-opacity duration-150 hover:opacity-80"
              >
                {t('auth.login.forgotPassword', 'Forgot password?')}
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg py-2.5 text-sm font-semibold shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0 disabled:pointer-events-none disabled:opacity-70 bg-primary text-primary-foreground cursor-pointer"
              style={{ boxShadow: '0 4px 18px -4px var(--p-45)' }}
            >
              {/* Shimmer */}
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]"
                aria-hidden="true"
              />

              {isSubmitting ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t('auth.login.submitting', 'Signing in…')}
                </>
              ) : (
                <>
                  <LogIn size={15} strokeWidth={2.2} aria-hidden="true" />
                  {t('auth.login.submit', 'Log In')}
                  <ArrowRight
                    size={14}
                    strokeWidth={2.2}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                  />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-5 text-center text-sm text-muted-foreground">
            {t('auth.login.noAccount', "Don't have a shop yet?")}{' '}
            <Link
              to="/signup"
              className="font-semibold text-primary underline-offset-2 hover:underline transition-opacity duration-150 hover:opacity-80 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t('auth.login.signupLink', 'Sign up free →')}
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Legal */}
      <motion.p
        className="mt-5 text-center text-xs text-muted-foreground"
        variants={revealSoft}
        {...motionProps}
      >
        {t('auth.login.legal', 'By logging in you agree to our')}{' '}
        <Link to="/terms" className="underline-offset-2 hover:underline text-muted-foreground">{t('auth.terms', 'Terms')}</Link>
        {' '}{t('auth.and', 'and')}{' '}
        <Link to="/privacy" className="underline-offset-2 hover:underline text-muted-foreground">{t('auth.privacyPolicy', 'Privacy Policy')}</Link>.
      </motion.p>
    </div>
  )
}

export default Login