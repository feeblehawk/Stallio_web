import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ShieldCheck, RefreshCcw, MessageCircle, BadgeCheck } from 'lucide-react'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { revealSoft, blurReveal, staggerContainer } from '../../../utils/motionVariants'
import { css } from '../../../utils/cssTokens'
import PrimaryCTA from '../../../components/PrimaryCTA'
import ArrowIcon from '../../../components/icons/ArrowIcon'

// ─── Trust pill ───────────────────────────────────────────────────────────────
const TrustPill = ({ icon: Icon, iconClassName, children }) => (
  <span className="flex items-center gap-2 text-xs font-medium" style={{ color: css.mutedFg }}>
    <Icon size={14} className={iconClassName} aria-hidden="true" />
    {children}
  </span>
)

// ─── PricingCTA ───────────────────────────────────────────────────────────────
const PricingCTA = () => {
  const { t } = useTranslation('pricing')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const isVisible = reduced || inView

  return (
    <section
      ref={sectionRef}
      aria-labelledby="pricing-cta-heading"
      className="relative isolate overflow-hidden border-t"
      style={{ borderColor: css.border, background: css.bg }}
    >
      {/* ── Background: upward radial primary bloom ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 110%, color-mix(in oklch, var(--primary) 11%, transparent), transparent 72%)',
        }}
      />

      {/* ── Glowing top-border line ── */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, color-mix(in oklch, var(--primary) 55%, transparent) 50%, transparent 100%)',
        }}
      />

      {/* ── Dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.028]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">

        {/* ── Headline block ── */}
        <motion.div
          variants={staggerContainer}
          initial={reduced ? false : 'hidden'}
          animate={isVisible ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center"
        >

          {/* Eyebrow badge */}
          <motion.div variants={revealSoft}>
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
              style={{
                borderColor: css.border,
                background: 'color-mix(in oklch, var(--surface) 82%, transparent)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <BadgeCheck size={13} className="text-primary" aria-hidden="true" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: css.mutedFg }}
              >
                {t('cta.eyebrow', 'Risk-free to start')}
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h2
            variants={blurReveal}
            id="pricing-cta-heading"
            className="font-heading font-extrabold tracking-[-0.055em]"
            style={{
              fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)',
              lineHeight: 1.02,
              color: css.fg,
            }}
          >
            {t('cta.headline', "You're one link away")}
            <br />
            <span style={{ color: css.primary }}>{t('cta.headlineHighlight', 'from your next order.')}</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={revealSoft}
            className="mx-auto mt-5 max-w-[480px] text-base leading-7 sm:text-[17px]"
            style={{ color: css.mutedFg }}
          >
            {t('cta.body', 'Start free in 5 minutes. No code, no card, no commitment. Upgrade to Growth the moment your DMs become a full-time job.')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={revealSoft}
            className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row sm:gap-4"
          >
            <PrimaryCTA
              to="/signup"
              size="lg"
              className="w-full sm:w-auto py-3.5 text-[15px] font-bold"
            >
              {t('cta.primary', 'Create My Store')}
            </PrimaryCTA>

            <Link
              to="/contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
              style={{
                borderColor: css.border,
                background: css.surface,
                color: css.fg,
              }}
            >
              {t('cta.secondary', 'Have A Query?')}
              <ArrowIcon />
            </Link>
          </motion.div>

          {/* Micro-trust strip */}
          <motion.div
            variants={revealSoft}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5"
          >
            <TrustPill icon={ShieldCheck} iconClassName="text-primary">
              {t('cta.trust.noCard', 'No credit card')}
            </TrustPill>
            <span className="h-3 w-px hidden sm:block" style={{ background: css.border }} aria-hidden="true" />
            <TrustPill icon={RefreshCcw} iconClassName="text-emerald-500">
              {t('cta.trust.cancel', 'Cancel anytime')}
            </TrustPill>
            <span className="h-3 w-px hidden sm:block" style={{ background: css.border }} aria-hidden="true" />
            <TrustPill icon={MessageCircle} iconClassName="text-sky-500">
              {t('cta.trust.support', 'Customer Support')}
            </TrustPill>
          </motion.div>
        </motion.div>    

      </div>
    </section>
  )
}

export default PricingCTA