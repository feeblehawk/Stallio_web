import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ShieldCheck, RotateCcw, ArrowRight, CheckCircle2, ArrowLeft} from 'lucide-react'
import { css } from '../../utils/cssTokens'
import { revealSoft, scaleIn, staggerContainer } from '../../utils/motionVariants'
import useReducedMotion from '../../hooks/useReducedMotion'
import BrandLogo from '../../components/BrandLogo'

// ─── Constants ────────────────────────────────────────────────────────────────
const SLOT_COUNT = 6
const SPRING     = [0.22, 1, 0.36, 1]

// ─── Shared focus ring (mirrors Signup) ───────────────────────────────────────
const focusRing = '0 0 0 3px color-mix(in oklch, var(--primary) 22%, transparent)'
const noRing    = '0 0 0 0px transparent'

// ─── Background orbs (identical to Signup / Login) ───────────────────────────
const BgOrbs = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-25 blur-[120px]"
      style={{ background: css.primary }} />
    <div className="absolute -bottom-60 -right-40 h-[600px] w-[600px] rounded-full opacity-15 blur-[140px]"
      style={{ background: css.primary }} />
    <div className="absolute top-1/3 -right-20 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
      style={{ background: css.ring }} />
    <div className="absolute inset-0"
      style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, var(--p-12), transparent 68%)' }} />
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
// ─── Single OTP digit input ───────────────────────────────────────────────────
const OtpSlot = ({ index, value, onChange, onKeyDown, inputRef, isActive, isFilled, disabled }) => {
  const id = useId()
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex flex-col items-center">
      <label htmlFor={id} className="sr-only">
        Digit {index + 1} of {SLOT_COUNT}
      </label>
      <motion.input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete={index === 0 ? 'one-time-code' : 'off'}
        maxLength={1}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(index, e.target.value)}
        onKeyDown={(e) => onKeyDown(index, e)}
        onFocus={(e) => { setFocused(true); e.target.select() }}
        onBlur={() => setFocused(false)}
        aria-label={`Digit ${index + 1} of ${SLOT_COUNT}`}
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.2 + index * 0.055, ease: SPRING }}
        className="h-12 w-10 rounded-xl border-2 text-center text-lg font-bold tabular-nums
                   outline-none transition-none disabled:pointer-events-none disabled:opacity-50
                   sm:h-13 sm:w-11"
        style={{
          fontFamily:  'var(--font-sans)',
          background:  isFilled ? css.p10 : css.surface,
          borderColor: isFilled
            ? css.primary
            : focused
              ? css.ring
              : css.border,
          color:       css.fg,
          boxShadow:   isFilled
            ? '0 0 0 3px color-mix(in oklch, var(--primary) 16%, transparent)'
            : focused
              ? focusRing
              : noRing,
          caretColor:  css.primary,
          transition:  'border-color 0.15s, box-shadow 0.15s, background 0.15s',
        }}
      />
    </div>
  )
}

// ─── Verify / CTA button (mirrors Signup submit button pattern) ───────────────
const VerifyButton = ({ onClick, loading, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled || loading}
    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden
               rounded-lg py-2.5 text-sm font-semibold shadow-md
               transition-all duration-200 hover:-translate-y-px hover:shadow-lg
               active:translate-y-0 disabled:pointer-events-none disabled:opacity-60"
    style={{
      background: css.primary,
      color:      css.primaryFg,
      boxShadow:  '0 4px 18px -4px var(--p-45)',
    }}
  >
    {/* Shimmer sweep — identical to Signup */}
    <span
      className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] transition-transform duration-500 group-hover:translate-x-[200%]"
      style={{ background: 'color-mix(in oklch, white 12%, transparent)' }}
      aria-hidden="true"
    />

    <AnimatePresence mode="wait" initial={false}>
      {loading ? (
        <motion.span
          key="loading"
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Verifying…
        </motion.span>
      ) : (
        <motion.span
          key="idle"
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          Verify email
          <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </motion.span>
      )}
    </AnimatePresence>
  </button>
)

// ─── Success overlay ──────────────────────────────────────────────────────────
const SuccessOverlay = ({ reduced }) => (
  <motion.div
    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 rounded-2xl px-8 text-center"
    style={{ background: 'color-mix(in oklch, var(--surface) 82%, transparent)' }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    {/* Pulsing rings + icon */}
    <div className="relative flex items-center justify-center">
      {!reduced && (
        <>
          <motion.span
            className="absolute rounded-full"
            style={{ width: 90, height: 90, background: css.successBg }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.4, 1.4], opacity: [0, 0.55, 0] }}
            transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.9 }}
          />
          <motion.span
            className="absolute rounded-full"
            style={{ width: 70, height: 70, background: css.successBg }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [0.7, 1.28, 1.28], opacity: [0, 0.45, 0] }}
            transition={{ duration: 1.0, delay: 0.4, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.9 }}
          />
        </>
      )}

      <motion.div
        className="relative flex h-[58px] w-[58px] items-center justify-center rounded-full"
        style={{
          background:  css.successBg,
          border:      `1.5px solid ${css.successBorder}`,
          boxShadow:   '0 0 0 6px color-mix(in oklch, var(--success) 10%, transparent)',
        }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <CheckCircle2
          size={26}
          strokeWidth={1.8}
          style={{ color: css.success }}
          aria-hidden="true"
        />
      </motion.div>
    </div>

    {/* Copy */}
    <motion.div
      className="flex flex-col items-center gap-1.5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.42, ease: SPRING }}
    >
      <h2
        className="font-heading font-bold tracking-tight"
        style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', color: css.fg, lineHeight: 1.25 }}
      >
        Email verified
      </h2>
      <p className="text-[13.5px] leading-relaxed" style={{ color: css.mutedFg, maxWidth: '24ch' }}>
        Your account is confirmed and ready to go.
      </p>
    </motion.div>

    {/* CTA */}
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: 0.62, ease: SPRING }}
    >
      <Link
        to="/login"
        className="group inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5
                   text-[13.5px] font-semibold transition-all duration-200
                   hover:-translate-y-px hover:shadow-lg
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        style={{
          background: css.primary,
          color:      css.primaryFg,
          boxShadow:  '0 4px 14px -4px var(--p-45)',
        }}
      >
        Continue to sign in
        <ArrowRight size={13} strokeWidth={2.2} aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  </motion.div>
)

// ─── Main page ────────────────────────────────────────────────────────────────
const VerifyEmail = () => {
  const [digits,      setDigits]      = useState(Array(SLOT_COUNT).fill(''))
  const [activeIdx,   setActiveIdx]   = useState(0)
  const [verifyState, setVerifyState] = useState('idle') // idle | loading | success | error
  const [errorMsg,    setErrorMsg]    = useState('')
  const [resent,      setResent]      = useState(false)
  const inputRefs                     = useRef([])
  const reduced                       = useReducedMotion()

  const allFilled = digits.every((d) => d !== '')
  const isLoading = verifyState === 'loading'

  const motionProps = reduced
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: 'visible' }

  // ── Input handlers ───────────────────────────────────────────────────────
  const handleChange = useCallback(
    (idx, raw) => {
      const stripped = raw.replace(/\D/g, '').slice(0, SLOT_COUNT - idx)
      if (!stripped) return

      const next = [...digits]
      for (let i = 0; i < stripped.length; i++) {
        if (idx + i < SLOT_COUNT) next[idx + i] = stripped[i]
      }
      setDigits(next)

      const nextFocus = Math.min(idx + stripped.length, SLOT_COUNT - 1)
      setActiveIdx(nextFocus)
      inputRefs.current[nextFocus]?.focus()
    },
    [digits],
  )

  const handleVerify = useCallback(async () => {
    if (verifyState !== 'idle' || !allFilled) return
    setVerifyState('loading')
    setErrorMsg('')

    // Simulate API — replace with real call
    await new Promise((r) => setTimeout(r, 950))
    const ok = digits.join('').length === SLOT_COUNT // demo: any 6-digit code passes

    if (ok) {
      setVerifyState('success')
    } else {
      setVerifyState('error')
      setErrorMsg('Incorrect code. Please try again.')
      setTimeout(() => {
        setVerifyState('idle')
        setDigits(Array(SLOT_COUNT).fill(''))
        setActiveIdx(0)
        inputRefs.current[0]?.focus()
      }, 1800)
    }
  }, [verifyState, allFilled, digits])

  const handleKeyDown = useCallback(
    (idx, e) => {
      if (e.key === 'Backspace') {
        e.preventDefault()
        if (digits[idx]) {
          const next = [...digits]; next[idx] = ''; setDigits(next)
        } else if (idx > 0) {
          const next = [...digits]; next[idx - 1] = ''; setDigits(next)
          setActiveIdx(idx - 1); inputRefs.current[idx - 1]?.focus()
        }
      } else if (e.key === 'ArrowLeft'  && idx > 0)              { setActiveIdx(idx - 1); inputRefs.current[idx - 1]?.focus() }
        else if (e.key === 'ArrowRight' && idx < SLOT_COUNT - 1) { setActiveIdx(idx + 1); inputRefs.current[idx + 1]?.focus() }
        else if (e.key === 'Enter'      && allFilled)            { handleVerify() }
    },
    [digits, allFilled, handleVerify],
  )

  const handleResend = useCallback(async () => {
    if (resent) return
    setResent(true)
    await new Promise((r) => setTimeout(r, 1200))
    setTimeout(() => setResent(false), 30_000)
  }, [resent])

  useEffect(() => { inputRefs.current[0]?.focus() }, [])

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:py-14 antialiased"
      style={{ background: css.bg }}
    >
      <BgOrbs />

       {/* ── Back to home pill ── */}
            <motion.div variants={staggerContainer} {...motionProps} className="flex flex-col items-center">
              <BackToHome />
      
              {/* Brand */}
              <motion.div variants={revealSoft} className="mb-7 flex flex-col items-center gap-2.5">
                <BrandLogo size="lg" />
                <p className="text-sm font-medium" style={{ color: css.mutedFg }}>
                  Verify your Email
                </p>
              </motion.div>
            </motion.div>

      {/* Card — mirrors Signup card structure */}
      <motion.div className="w-full max-w-sm relative" variants={scaleIn} {...motionProps}>
        {/* Glow layer */}
        <div
          aria-hidden="true"
          style={{
            position:     'absolute',
            inset:        '-60px',
            borderRadius: '40px',
            background:   'radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 72%)',
            filter:       'blur(24px)',
            pointerEvents:'none',
            zIndex:       0,
          }}
        />

        <div
          className="relative overflow-hidden rounded-2xl border px-8 py-7 backdrop-blur-xl sm:px-10 sm:py-8"
          style={{
            zIndex:      1,
            background:  'color-mix(in oklch, var(--surface) 82%, transparent)',
            borderColor: css.border,
            boxShadow:   '0 0 0 1px color-mix(in oklch, var(--primary) 10%, transparent), 0 14px 44px -8px color-mix(in oklch, var(--primary) 14%, transparent), 0 6px 18px color-mix(in oklch, var(--foreground) 5%, transparent)',
          }}
        >
          {/* Success overlay — sits above card content */}
          <AnimatePresence>
            {verifyState === 'success' && <SuccessOverlay reduced={reduced} />}
          </AnimatePresence>

          {/* Mail icon + heading */}
          <motion.div
            className="mb-7 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: SPRING }}
          >
            <div
              className="flex h-13 w-13 items-center justify-center rounded-2xl"
              style={{
                background: css.p10,
                border:     `1.5px solid ${css.p30}`,
                boxShadow:  `0 0 0 6px ${css.p8}`,
              }}
            >
              <Mail size={22} strokeWidth={1.7} style={{ color: css.primary }} aria-hidden="true" />
            </div>

            <div className="text-center">
              <h1
                className="font-heading font-bold tracking-[-0.025em]"
                style={{ fontSize: 'clamp(1.2rem, 3vw, 1.45rem)', color: css.fg, lineHeight: 1.2 }}
              >
                Check your inbox
              </h1>
              <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: css.mutedFg }}>
                We sent a 6-digit code to{' '}
                <strong className="font-semibold" style={{ color: css.fg }}>your@email.com</strong>.
              </p>
            </div>
          </motion.div>

          {/* OTP inputs — 6-up horizontal row */}
          <div
            role="group"
            aria-label="Enter your 6-digit verification code"
            className="mb-5 flex items-center justify-center gap-2"
          >
            {Array.from({ length: SLOT_COUNT }, (_, i) => (
              <OtpSlot
                key={i}
                index={i}
                value={digits[i]}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                inputRef={(el) => (inputRefs.current[i] = el)}
                isActive={activeIdx === i && verifyState === 'idle'}
                isFilled={digits[i] !== ''}
                disabled={isLoading || verifyState === 'success'}
              />
            ))}
          </div>

          {/* Error message */}
          <AnimatePresence>
            {errorMsg && (
              <motion.p
                role="alert"
                aria-live="assertive"
                className="mb-4 rounded-xl px-4 py-2.5 text-center text-[13px] font-medium"
                style={{
                  background: 'color-mix(in oklch, var(--destructive) 10%, var(--surface))',
                  color:      'var(--destructive)',
                  border:     '1px solid color-mix(in oklch, var(--destructive) 20%, transparent)',
                }}
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.22 }}
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Verify button — always present, disabled until all slots filled */}
          <VerifyButton
            onClick={handleVerify}
            loading={isLoading}
            disabled={!allFilled || verifyState !== 'idle'}
          />

          {/* Resend */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="text-[13px]" style={{ color: css.mutedFg }}>Didn't get it?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={resent || isLoading}
              className="inline-flex items-center gap-1.5 rounded-sm text-[13px] font-semibold
                         transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              style={{ color: resent ? css.mutedFg : css.primary }}
              aria-label={resent ? 'Code resent — check your inbox' : 'Resend verification code'}
            >
              <RotateCcw
                size={12}
                strokeWidth={2}
                aria-hidden="true"
                className={resent ? 'animate-spin' : ''}
              />
              {resent ? 'Sent!' : 'Resend code'}
            </button>
          </div>

          {/* Back to sign in */}
          <div
            className="mt-6 border-t pt-5 text-center"
            style={{ borderColor: css.border }}
          >
            <Link
              to="/signup"
              className="text-[13px] transition-colors duration-200
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
              style={{ color: css.mutedFg }}
              onMouseEnter={(e) => (e.currentTarget.style.color = css.fg)}
              onMouseLeave={(e) => (e.currentTarget.style.color = css.mutedFg)}
            >
              ← Back to
              <span class="font-semibold text-primary underline-offset-2 hover:underline color:css.primary"> Sign Up</span> 
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Trust signal */}
      <motion.p
        className="mt-5 flex items-center justify-center gap-1.5 text-center text-[12px]"
        style={{ color: css.mutedFg }}
        variants={revealSoft}
        {...motionProps}
      >
        <ShieldCheck size={12} strokeWidth={2} style={{ color: css.primary }} aria-hidden="true" />
        Your code expires in 10 minutes and can only be used once.
      </motion.p>
    </div>
  )
}

export default VerifyEmail