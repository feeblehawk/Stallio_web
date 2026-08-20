import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, ArrowLeft, MailCheck, RefreshCw, ShieldAlert } from 'lucide-react'
import { revealSoft, scaleIn, staggerContainer } from '../../utils/motionVariants'
import useReducedMotion from '../../hooks/useReducedMotion'
import BrandLogo from '../../components/BrandLogo'
import {css} from '../../utils/cssTokens'

// ─── Spring easing ────────────────────────────────────────────────────────────
const SPRING = [0.22, 1, 0.36, 1]

// ─── Focus ring — consistent with whole auth system ──────────────────────────
const focusRing = '0 0 0 3px color-mix(in oklch, var(--primary) 22%, transparent)'
const noRing    = '0 0 0 0px transparent'

// ─── Phase transition variants ────────────────────────────────────────────────
const phaseVariants = {
  enter:  { opacity: 0, x: 24,  filter: 'blur(4px)' },
  center: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: { duration: 0.38, ease: SPRING } },
  exit:   { opacity: 0, x: -24, filter: 'blur(4px)', transition: { duration: 0.22 } },
}

// ─── Background orbs (identical to Signup / Login) ───────────────────────────
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
const BackToHome = () => (
  <motion.div
    variants={revealSoft}
    className="mb-6"
  >
    <Link
      to="/"
      aria-label="Back to Stallio home"
      className="group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-medium 
      text-muted-foreground transition-all duration-200 hover: hover:text-primary focus-visible:outline-2 
      focus-visible:outline-offset-2 focus-visible:outline-ring"
      style={{
        borderColor: css.border,
        background: 'color-mix(in oklch, var(--surface) 80%, transparent)',
        backdropFilter: 'blur(10px)',
        color: css.mutedfg,
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <ArrowLeft
        size={13}
        strokeWidth={2}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
        style={{ color: css.primary }}
      />
      Back to home
    </Link>
  </motion.div>
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

// ─── Email input ──────────────────────────────────────────────────────────────
const EmailInput = ({ value, onChange, disabled }) => {
  const [focused, setFocused] = useState(false)
  return (
    <div
      className="flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 transition-all duration-150"
      style={{
        background:  'var(--surface)',
        borderColor: focused ? 'var(--primary)' : 'var(--border)',
        boxShadow:   focused ? focusRing : noRing,
        opacity:     disabled ? 0.6 : 1,
      }}
    >
      <Mail
        size={15}
        strokeWidth={2}
        aria-hidden="true"
        className="shrink-0 transition-colors duration-150"
        style={{ color: focused ? 'var(--primary)' : 'var(--muted-foreground)' }}
      />
      <input
        name="email"
        type="email"
        placeholder="you@example.com"
        value={value}
        onChange={onChange}
        autoComplete="email"
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
      />
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
    className="flex items-start gap-2.5 rounded-lg border border-destructive/30 px-3.5 py-3"
    style={{ background: 'color-mix(in oklch, var(--destructive) 8%, transparent)' }}
    role="alert"
    aria-live="assertive"
  >
    <ShieldAlert size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-destructive" aria-hidden="true" />
    <p className="text-[13px] font-medium text-destructive">{message}</p>
  </motion.div>
)

// ─── Phase 1 — Email entry ────────────────────────────────────────────────────
const EmailPhase = ({ onSent }) => {
  const [email, setEmail]           = useState('')
  const [error, setError]           = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) { setError('Please enter your email address.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Enter a valid email address.')
      return
    }
    setSubmitting(true)
    setError('')
    // Simulate network — replace with real API call
    await new Promise(r => setTimeout(r, 1300))
    setSubmitting(false)
    onSent(trimmed)
  }, [email, onSent])

  return (
    <motion.div
      key="email-phase"
      variants={phaseVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="flex flex-col gap-5"
    >
      {/* Icon badge */}
      <div className="flex justify-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border"
          style={{ background: 'var(--p-10)' }}
        >
          <Mail size={24} strokeWidth={1.8} style={{ color: 'var(--primary)' }} aria-hidden="true" />
        </div>
      </div>

      {/* Copy */}
      <div className="text-center">
        <h1 className="font-heading text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-[1.75rem]">
          Forgot your password?
        </h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          No worries. Enter the email linked to your Stallio account and
          we'll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {error && <ErrorBanner message={error} />}

        <Field label="Email address" required>
          <EmailInput
            value={email}
            onChange={(e) => { setError(''); setEmail(e.target.value) }}
            disabled={isSubmitting}
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg py-2.5 text-sm font-semibold shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0 disabled:pointer-events-none disabled:opacity-70 bg-primary text-primary-foreground"
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
              Sending link…
            </>
          ) : (
            <>
              Send Reset Link
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

      <div className="flex justify-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
          Back to Log In
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Phase 2 — Sent confirmation ─────────────────────────────────────────────
const SentPhase = ({ email, onResend }) => {
  const [resending, setResending] = useState(false)
  const [resent,    setResent]    = useState(false)

  const handleResend = useCallback(async () => {
    if (resending || resent) return
    setResending(true)
    await new Promise(r => setTimeout(r, 1100))
    setResending(false)
    setResent(true)
  }, [resending, resent])

  // Mask email: you@example.com → y**@example.com
  const maskedEmail = email.replace(
    /^(.{1})(.+?)(@.+)$/,
    (_, first, rest, domain) => `${first}${'*'.repeat(Math.min(rest.length, 4))}${domain}`
  )

  return (
    <motion.div
      key="sent-phase"
      variants={phaseVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="flex flex-col gap-5"
    >
      {/* Animated success badge */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: SPRING }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl border"
          style={{ background: 'var(--success-bg)', borderColor: 'var(--success-border)' }}
        >
          <MailCheck size={26} strokeWidth={1.8} style={{ color: 'var(--success)' }} aria-hidden="true" />
        </motion.div>
      </div>

      {/* Copy */}
      <div className="text-center">
        <h1 className="font-heading text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-[1.75rem]">
          Check your inbox
        </h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          We sent a password reset link to{' '}
          <span className="font-semibold text-foreground">{maskedEmail}</span>.
          It expires in 15 minutes.
        </p>
      </div>

      {/* Info box */}
      <div
        className="rounded-lg border px-4 py-3.5"
        style={{ background: 'var(--p-10)', borderColor: 'var(--p-35)' }}
      >
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          Didn't get it? Check your spam folder, or{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={resending || resent}
            className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-2 hover:underline disabled:opacity-60 disabled:cursor-not-allowed transition-opacity duration-150"
          >
            {resending ? (
              <>
                <RefreshCw size={12} strokeWidth={2.2} className="animate-spin" aria-hidden="true" />
                resending…
              </>
            ) : resent ? (
              'link resent ✓'
            ) : (
              'resend the link'
            )}
          </button>
          .
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2.5">
        <Link
          to="/login"
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border border-border bg-surface py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-150 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ArrowLeft size={14} strokeWidth={2.2} aria-hidden="true" />
          Back to Log In
        </Link>

        <button
          type="button"
          onClick={onResend}
          className="text-center text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-150 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Use a different email address
        </button>
      </div>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const ForgotPassword = () => {
  const reduced = useReducedMotion()

  const [phase, setPhase] = useState('email')   // 'email' | 'sent'
  const [sentTo, setSentTo] = useState('')

  const handleSent   = useCallback((email) => { setSentTo(email); setPhase('sent') }, [])
  const handleResend = useCallback(() => { setSentTo(''); setPhase('email') }, [])

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
                  Welcome back to your Shop
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
            background: phase === 'sent'
              ? 'radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in oklch, var(--success) 14%, transparent), transparent 72%)'
              : 'radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in oklch, var(--primary) 16%, transparent), transparent 72%)',
            transition: 'background 0.6s ease',
          }}
        />

        <div
          className="relative z-10 rounded-2xl border border-border px-8 py-8 backdrop-blur-xl sm:px-10"
          style={{
            background:  'color-mix(in oklch, var(--surface) 82%, transparent)',
            boxShadow:   '0 0 0 1px color-mix(in oklch, var(--primary) 10%, transparent), 0 14px 44px -8px color-mix(in oklch, var(--primary) 14%, transparent), 0 6px 18px color-mix(in oklch, var(--foreground) 5%, transparent)',
          }}
        >
          {/* Phase transition */}
          <AnimatePresence mode="wait">
            {phase === 'email' ? (
              <EmailPhase key="email" onSent={handleSent} />
            ) : (
              <SentPhase key="sent" email={sentTo} onResend={handleResend} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Legal */}
      <motion.p
        className="mt-5 text-center text-xs text-muted-foreground"
        variants={revealSoft}
        {...motionProps}
      >
        Need help?{' '}
        <Link to="/help" className="underline-offset-2 hover:underline text-muted-foreground">
          Contact support
        </Link>
        .
      </motion.p>
    </div>
  )
}

export default ForgotPassword