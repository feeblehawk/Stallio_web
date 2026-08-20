import { useState, useRef, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mail, CheckCircle2, RefreshCw, ArrowRight, ShieldCheck, ArrowLeft, ShieldAlert } from 'lucide-react'
import { revealSoft, scaleIn, staggerContainer } from '../../utils/motionVariants'
import useReducedMotion from '../../hooks/useReducedMotion'
import BrandLogo from '../../components/BrandLogo'
import { css } from '../../utils/cssTokens'

// ─── Constants ────────────────────────────────────────────────────────────────
const CODE_LENGTH = 6
const RESEND_COOLDOWN = 60 // seconds
const SPRING = [0.22, 1, 0.36, 1]

// ─── Focus ring — consistent with whole auth system ──────────────────────────
const focusRing = '0 0 0 3px color-mix(in oklch, var(--primary) 22%, transparent)'
const noRing    = '0 0 0 0px transparent'

// ─── Background orbs ─────────────────────────────────────────────────────────
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

// ─── Single digit slot ────────────────────────────────────────────────────────
const DigitSlot = ({ value, index, inputRef, onChange, onKeyDown, onPaste, onFocus, isFilled, hasError, disabled, t }) => {
  const [focused, setFocused] = useState(false)

  return (
    <div
      className="relative flex h-12 w-11 sm:h-14 sm:w-13 items-center justify-center rounded-xl border transition-all duration-150"
      style={{
        background:   'var(--surface)',
        borderColor:  hasError
          ? 'var(--destructive)'
          : focused
          ? 'var(--primary)'
          : isFilled
          ? 'color-mix(in oklch, var(--primary) 50%, var(--border))'
          : 'var(--border)',
        boxShadow: hasError
          ? '0 0 0 3px color-mix(in oklch, var(--destructive) 20%, transparent)'
          : focused
          ? focusRing
          : noRing,
      }}
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={1}
        value={value}
        disabled={disabled}
        onChange={e => onChange(index, e.target.value)}
        onKeyDown={e => onKeyDown(index, e)}
        onPaste={onPaste}
        onFocus={() => { setFocused(true); onFocus?.() }}
        onBlur={() => setFocused(false)}
        aria-label={t ? t('auth.verifyEmail.inputAriaLabel', { index: index + 1, defaultValue: `Digit ${index + 1} of 6` }) : `Digit ${index + 1} of 6`}
        className="h-full w-full bg-transparent text-center font-heading text-xl sm:text-2xl font-bold text-foreground outline-none caret-primary select-none disabled:cursor-not-allowed"
      />
      {/* Subtle bottom active pill indicator */}
      {focused && (
        <span
          className="pointer-events-none absolute bottom-1.5 h-0.5 w-4 rounded-full bg-primary"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

// ─── Resend timer pill ────────────────────────────────────────────────────────
const ResendButton = ({ cooldown, onResend, disabled, t }) => {
  if (cooldown > 0) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground tabular-nums">
        <RefreshCw size={12} strokeWidth={2} className="animate-spin text-muted-foreground/60" aria-hidden="true" />
        {t('auth.verifyEmail.resend', 'Resend code')} in <strong className="text-foreground">{cooldown}s</strong>
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={onResend}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary underline-offset-2 hover:underline disabled:opacity-60 transition-opacity duration-150 cursor-pointer"
    >
      <RefreshCw size={12} strokeWidth={2.2} aria-hidden="true" />
      {t('auth.verifyEmail.resend', 'Resend code')}
    </button>
  )
}

// ─── Error banner ─────────────────────────────────────────────────────────────
const ErrorBanner = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: -8, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.25, ease: SPRING }}
    className="flex items-start gap-2.5 rounded-lg border border-destructive/30 px-3.5 py-3 text-start"
    style={{ background: 'color-mix(in oklch, var(--destructive) 8%, transparent)' }}
    role="alert"
    aria-live="assertive"
  >
    <ShieldAlert size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-destructive" aria-hidden="true" />
    <p className="text-[13px] font-medium text-destructive">{message}</p>
  </motion.div>
)

// ─── Success screen ───────────────────────────────────────────────────────────
const SuccessState = ({ onContinue, t }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.94 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.45, ease: SPRING }}
    className="flex flex-col items-center gap-6 text-center py-4"
  >
    <div
      className="flex h-16 w-16 items-center justify-center rounded-2xl border"
      style={{
        background:  'var(--success-bg)',
        borderColor: 'var(--success-border)',
      }}
    >
      <CheckCircle2 size={32} strokeWidth={1.8} style={{ color: 'var(--success)' }} aria-hidden="true" />
    </div>

    <div>
      <h2 className="font-heading text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-[1.75rem]">
        {t('auth.verifyEmail.successTitle', 'Email verified!')}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {t('auth.verifyEmail.successDesc', 'Your account is confirmed and ready to go.')}
      </p>
    </div>

    <button
      type="button"
      onClick={onContinue}
      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg py-2.5 text-sm font-semibold shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0 bg-primary text-primary-foreground cursor-pointer"
      style={{ boxShadow: '0 4px 18px -4px var(--p-45)' }}
    >
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]"
        aria-hidden="true"
      />
      {t('auth.verifyEmail.continueToSignIn', 'Continue to Sign In')}
      <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
    </button>
  </motion.div>
)

// ─── Main Component ───────────────────────────────────────────────────────────
const VerifyEmail = ({ userEmail = 'you@example.com' }) => {
  const { t } = useTranslation('common')
  const reduced  = useReducedMotion()
  const navigate = useNavigate()

  const [digits, setDigits]           = useState(Array(CODE_LENGTH).fill(''))
  const [error, setError]             = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const [isSuccess, setIsSuccess]     = useState(false)
  const [cooldown, setCooldown]       = useState(RESEND_COOLDOWN)
  const [resendSuccess, setResendSuccess] = useState(false)

  // Array of 6 refs for the digit inputs
  const inputRefs = useRef([])
  inputRefs.current = Array(CODE_LENGTH)
    .fill(null)
    .map((_, i) => inputRefs.current[i] || null)

  // ── Auto-focus first input on mount ──
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  // ── Resend cooldown countdown ──
  useEffect(() => {
    if (cooldown <= 0) return
    const id = setInterval(() => setCooldown(c => c - 1), 1000)
    return () => clearInterval(id)
  }, [cooldown])

  // ── Handle digit changes ──
  const handleChange = useCallback((idx, val) => {
    setError('')
    const char = val.replace(/\D/g, '').slice(-1)

    setDigits(prev => {
      const next = [...prev]
      next[idx] = char
      return next
    })

    // Advance to next slot
    if (char && idx < CODE_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus()
    }
  }, [])

  // ── Handle Backspace / Navigation ──
  const handleKeyDown = useCallback((idx, e) => {
    if (e.key === 'Backspace') {
      if (!digits[idx] && idx > 0) {
        inputRefs.current[idx - 1]?.focus()
        setDigits(prev => {
          const next = [...prev]
          next[idx - 1] = ''
          return next
        })
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      inputRefs.current[idx - 1]?.focus()
    } else if (e.key === 'ArrowRight' && idx < CODE_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus()
    }
  }, [digits])

  // ── Handle Paste anywhere ──
  const handlePaste = useCallback((e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH)
    if (!pasted) return

    setDigits(prev => {
      const next = [...prev]
      pasted.split('').forEach((char, i) => {
        if (i < CODE_LENGTH) next[i] = char
      })
      return next
    })

    // Focus the next empty slot or the last one
    const targetIdx = Math.min(pasted.length, CODE_LENGTH - 1)
    inputRefs.current[targetIdx]?.focus()
  }, [])

  // ── Submit verification ──
  const handleVerify = useCallback(async (e) => {
    e?.preventDefault()
    const code = digits.join('')
    if (code.length < CODE_LENGTH) {
      setError(t('auth.verifyEmail.errors.incorrect', 'Please enter all 6 digits.'))
      return
    }

    setSubmitting(true)
    setError('')
    // Simulate network validation
    await new Promise(r => setTimeout(r, 1200))
    setSubmitting(false)

    // Demo check (e.g. 000000 fails for demo, everything else passes)
    if (code === '000000') {
      setError(t('auth.verifyEmail.errors.incorrect', 'Incorrect code. Please check and try again.'))
      setDigits(Array(CODE_LENGTH).fill(''))
      inputRefs.current[0]?.focus()
    } else {
      setIsSuccess(true)
    }
  }, [digits, t])

  // Auto-submit when all 6 digits are typed
  useEffect(() => {
    if (digits.every(d => d !== '') && !isSubmitting && !isSuccess) {
      handleVerify()
    }
  }, [digits, isSubmitting, isSuccess, handleVerify])

  // ── Resend code ──
  const handleResend = useCallback(async () => {
    setCooldown(RESEND_COOLDOWN)
    setResendSuccess(true)
    setError('')
    setDigits(Array(CODE_LENGTH).fill(''))
    inputRefs.current[0]?.focus()
    setTimeout(() => setResendSuccess(false), 4000)
  }, [])

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
            {t('auth.brandSubtitle', 'Your online shop, one link away')}
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
            background: isSuccess
              ? 'radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in oklch, var(--success) 16%, transparent), transparent 72%)'
              : 'radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in oklch, var(--primary) 16%, transparent), transparent 72%)',
            transition: 'background 0.5s ease',
          }}
        />

        <div
          className="relative z-10 rounded-2xl border border-border px-8 py-8 backdrop-blur-xl sm:px-10"
          style={{
            background:  'color-mix(in oklch, var(--surface) 82%, transparent)',
            boxShadow:   '0 0 0 1px color-mix(in oklch, var(--primary) 10%, transparent), 0 14px 44px -8px color-mix(in oklch, var(--primary) 14%, transparent), 0 6px 18px color-mix(in oklch, var(--foreground) 5%, transparent)',
          }}
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <SuccessState key="success" onContinue={() => navigate('/login')} t={t} />
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
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

                {/* Heading */}
                <div className="text-center">
                  <h1 className="font-heading text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-[1.75rem]">
                    {t('auth.verifyEmail.heading', 'Verify your email')}
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t('auth.verifyEmail.subtext', { email: userEmail, defaultValue: `We sent a 6-digit code to ${userEmail}.` })}
                  </p>
                </div>

                {/* Error banner */}
                {error && <ErrorBanner message={error} />}

                {/* Resend success pill */}
                {resendSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border border-border px-3.5 py-2 text-center text-xs font-medium text-foreground"
                    style={{ background: 'var(--p-10)' }}
                  >
                    {t('auth.verifyEmail.sent', 'A fresh code has been sent!')}
                  </motion.div>
                )}

                {/* OTP slots — explicit dir="ltr" so digits 1..6 flow correctly */}
                <div
                  className="flex items-center justify-center gap-2 sm:gap-2.5"
                  dir="ltr"
                  role="group"
                  aria-label={t('auth.verifyEmail.groupAriaLabel', 'Enter your 6-digit verification code')}
                >
                  {digits.map((digit, i) => (
                    <DigitSlot
                      key={i}
                      index={i}
                      value={digit}
                      isFilled={digit !== ''}
                      hasError={Boolean(error)}
                      disabled={isSubmitting}
                      inputRef={el => { inputRefs.current[i] = el }}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      onPaste={handlePaste}
                      t={t}
                    />
                  ))}
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={isSubmitting || digits.some(d => d === '')}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg py-2.5 text-sm font-semibold shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0 disabled:pointer-events-none disabled:opacity-70 bg-primary text-primary-foreground cursor-pointer"
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
                      {t('auth.verifyEmail.verifying', 'Verifying…')}
                    </>
                  ) : (
                    <>
                      {t('auth.verifyEmail.submit', 'Verify Email')}
                      <ArrowRight
                        size={14}
                        strokeWidth={2.2}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                      />
                    </>
                  )}
                </button>

                {/* Resend row */}
                <div className="flex flex-col items-center gap-3 pt-1 text-center">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{t('auth.verifyEmail.didntGetIt', "Didn't receive the code?")}</span>
                    <ResendButton
                      cooldown={cooldown}
                      onResend={handleResend}
                      disabled={isSubmitting}
                      t={t}
                    />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {t('auth.verifyEmail.backToSignup', 'Wrong email address?')}{' '}
                    <Link
                      to="/signup"
                      className="font-semibold text-primary underline-offset-2 hover:underline rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {t('auth.verifyEmail.signup', 'Go back to sign up')}
                    </Link>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Trust reassurance */}
      <motion.p
        className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground"
        variants={revealSoft}
        {...motionProps}
      >
        <ShieldCheck size={13} strokeWidth={2} style={{ color: 'var(--primary)' }} aria-hidden="true" />
        {t('auth.verifyEmail.trust', 'Your code expires in 10 minutes and can only be used once.')}
      </motion.p>
    </div>
  )
}

export default VerifyEmail