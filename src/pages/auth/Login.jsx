import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, ShieldAlert } from 'lucide-react'
import { revealSoft, scaleIn, staggerContainer } from '../../utils/motionVariants'
import useReducedMotion from '../../hooks/useReducedMotion'

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

// ─── Field wrapper ────────────────────────────────────────────────────────────
const Field = ({ label, required, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-medium text-foreground">
      {label}
      {required && (
        <span className="ml-0.5 text-destructive" aria-hidden="true">*</span>
      )}
    </label>
    {children}
    {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
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
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
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
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
      <button
        type="button"
        onClick={() => setShow(p => !p)}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="shrink-0 rounded-md p-0.5 text-muted-foreground transition-colors duration-150 hover:text-foreground"
      >
        <EyeIcon size={15} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  )
}

// ─── Social divider ───────────────────────────────────────────────────────────
const OrDivider = () => (
  <div className="flex items-center gap-3" aria-hidden="true">
    <div className="h-px flex-1 bg-border" />
    <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">or</span>
    <div className="h-px flex-1 bg-border" />
  </div>
)

// ─── Google OAuth button ──────────────────────────────────────────────────────
const GoogleButton = () => (
  <button
    type="button"
    className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-150 hover:bg-accent hover:border-border/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
  >
    {/* Google G icon via react-icons — no hardcoded SVG */}
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
    Continue with Google
  </button>
)

// ─── Error banner ─────────────────────────────────────────────────────────────
const ErrorBanner = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: -8, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.25, ease: SPRING }}
    className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/8 px-3.5 py-3"
    role="alert"
    aria-live="assertive"
  >
    <ShieldAlert size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-destructive" aria-hidden="true" />
    <p className="text-[13px] font-medium text-destructive">{message}</p>
  </motion.div>
)

// ─── Main ─────────────────────────────────────────────────────────────────────
const Login = () => {
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
      setError('Please enter your email and password.')
      return
    }
    setIsSubmitting(true)
    setError('')
    // Simulate network call — replace with real auth
    await new Promise(r => setTimeout(r, 1200))
    setIsSubmitting(false)
    // Demo: wrong-password simulation
    setError('Incorrect email or password. Please try again.')
  }, [form])

  const motionProps = reduced
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: 'visible' }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:py-14">
      <BgOrbs />

      {/* Logo */}
      <motion.div
        className="mb-7 flex flex-col items-center gap-2.5"
        variants={staggerContainer}
        {...motionProps}
      >
        <motion.a
          href="/"
          variants={revealSoft}
          aria-label="Stallio — Home"
          className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <img
            src="/logo.png"
            alt="Stallio"
            className="h-20 w-auto object-contain drop-shadow-xl sm:h-24"
          />
        </motion.a>
        <motion.p variants={revealSoft} className="text-sm font-medium text-muted-foreground">
          Welcome back to your shop
        </motion.p>
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
              Log in to Stallio
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Your store is one tap away
            </p>
          </div>

          {/* Google OAuth */}
          <GoogleButton />

          <div className="my-5">
            <OrDivider />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            {/* Error banner */}
            {error && <ErrorBanner message={error} />}

            <Field label="Email" required>
              <Input
                name="email"
                type="email"
                icon={Mail}
                placeholder="you@example.com"
                value={form.email}
                onChange={handle('email')}
                autoComplete="email"
              />
            </Field>

            <Field label="Password" required>
              <PasswordInput
                name="password"
                placeholder="Your password"
                value={form.password}
                onChange={handle('password')}
                autoComplete="current-password"
              />
            </Field>

            {/* Forgot link — right-aligned under password */}
            <div className="-mt-1 flex justify-end">
              <Link
                to="/forgot-password"
                className="text-[13px] font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm transition-opacity duration-150 hover:opacity-80"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg py-2.5 text-sm font-semibold shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0 disabled:pointer-events-none disabled:opacity-70 bg-primary text-primary-foreground"
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
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn size={15} strokeWidth={2.2} aria-hidden="true" />
                  Log In
                  <ArrowRight
                    size={14}
                    strokeWidth={2.2}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Don't have a shop yet?{' '}
            <Link
              to="/signup"
              className="font-semibold text-primary underline-offset-2 hover:underline transition-opacity duration-150 hover:opacity-80 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Sign up free →
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
        By logging in you agree to our{' '}
        <Link to="/terms" className="underline-offset-2 hover:underline text-muted-foreground">Terms</Link>
        {' '}and{' '}
        <Link to="/privacy" className="underline-offset-2 hover:underline text-muted-foreground">Privacy Policy</Link>.
      </motion.p>
    </div>
  )
}

export default Login