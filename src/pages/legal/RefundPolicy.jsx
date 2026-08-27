import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  HelpCircle,
  RefreshCw,
  Mail,
  Zap,
} from 'lucide-react'
import useReducedMotion from '../../hooks/useReducedMotion'
import { blurReveal, revealSoft, staggerHero, easePremium } from '../../utils/motionVariants'
import PrimaryCTA from '../../components/PrimaryCTA'
import { css } from '../../utils/cssTokens'

// ─── Sub-components ───────────────────────────────────────────────────────────

const TopGlow = () => (
  <div
    className="absolute inset-x-0 top-0 h-px pointer-events-none"
    aria-hidden="true"
    style={{
      background:
        'linear-gradient(90deg, transparent 0%, color-mix(in oklch, var(--primary) 55%, transparent) 50%, transparent 100%)',
    }}
  />
)

const Hero = () => {
  const { t } = useTranslation('legal')
  const reduced = useReducedMotion()
  const motionProps = reduced
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: 'visible' }

  return (
    <section
      aria-labelledby="rp-heading"
      className="relative isolate overflow-hidden border-b"
      style={{ borderColor: css.border }}
    >
      <TopGlow />

      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 0%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={staggerHero}
          {...motionProps}
        >
          <motion.div variants={revealSoft}>
            <div
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5"
              style={{
                borderColor: css.border,
                background: 'color-mix(in oklch, var(--surface) 80%, transparent)',
              }}
            >
              <RotateCcw size={13} style={{ color: css.primary }} aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t('common.badge', 'Legal')}
              </span>
            </div>
          </motion.div>

          <motion.h1
            id="rp-heading"
            variants={blurReveal}
            className="font-heading font-extrabold tracking-[-0.04em] text-foreground"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.25rem)', lineHeight: 1.0 }}
          >
            {t('refund.hero.headline1', 'Refund')}{' '}
            <span style={{ color: css.primary }}>{t('refund.hero.headline2', 'Policy')}</span>
          </motion.h1>

          <motion.p
            variants={revealSoft}
            className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            {t('refund.hero.subtitle', 'We want every Stallio subscription to be worth it. This policy tells you exactly when we issue refunds and how to request one.')}
          </motion.p>

          <motion.div
            variants={revealSoft}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground"
          >
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1"
              style={{ borderColor: css.border, background: css.surface }}
            >
              <RefreshCw size={11} aria-hidden="true" />
              {t('common.lastUpdated', 'Last updated')}: {t('refund.hero.lastUpdatedDate', 'June 1, 2025')}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1"
              style={{ borderColor: css.border, background: css.surface }}
            >
              <Clock size={11} aria-hidden="true" />
              {t('refund.hero.processingTime', '5–10 business days to process')}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const TableOfContents = () => {
  const { t } = useTranslation('legal')
  const sections = [
    { id: 'overview', icon: RotateCcw, label: t('refund.toc.overview', 'Overview') },
    { id: 'billing', icon: Zap, label: t('refund.toc.billing', 'Subscription & Billing') },
    { id: 'eligible', icon: CheckCircle, label: t('refund.toc.eligible', 'Eligible Refunds') },
    { id: 'not-eligible', icon: XCircle, label: t('refund.toc.notEligible', 'Non-Refundable Cases') },
    { id: 'billing-errors', icon: CreditCard, label: t('refund.toc.billingErrors', 'Billing Errors') },
    { id: 'how-to-request', icon: HelpCircle, label: t('refund.toc.howToRequest', 'How to Request') },
    { id: 'timeline', icon: Clock, label: t('refund.toc.timeline', 'Processing Timeline') },
    { id: 'contact', icon: Mail, label: t('refund.toc.contact', 'Contact Billing') },
  ]

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-28">
        <p
          className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: css.mutedFg }}
        >
          {t('common.onThisPage', 'On this page')}
        </p>
        <nav aria-label="Page sections">
          <ul className="space-y-1">
            {sections.map(({ id, icon: Icon, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors duration-150"
                  style={{ color: css.mutedFg }}
                  onMouseEnter={e => { e.currentTarget.style.color = css.primary; e.currentTarget.style.background = css.p8 }}
                  onMouseLeave={e => { e.currentTarget.style.color = css.mutedFg; e.currentTarget.style.background = 'transparent' }}
                >
                  <Icon size={12} aria-hidden="true" className="shrink-0" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

const PolicySection = ({ id, icon: Icon, title, children }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()

  return (
    <motion.section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 border-b pb-12 pt-12 first:pt-0"
      style={{ borderColor: css.border }}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: easePremium }}
    >
      <div className="mb-6 flex items-center gap-3">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: 'color-mix(in oklch, var(--primary) 10%, var(--surface))',
            color: css.primary,
          }}
          aria-hidden="true"
        >
          <Icon size={16} />
        </span>
        <h2
          id={`${id}-heading`}
          className="font-heading font-bold tracking-[-0.02em] text-foreground"
          style={{ fontSize: 'clamp(1.15rem, 2vw, 1.35rem)' }}
        >
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </motion.section>
  )
}

/** Eligible / ineligible item row */
const StatusItem = ({ eligible, label, detail }) => (
  <li className="flex items-start gap-3 px-4 py-3.5 sm:px-5 border-b last:border-0" style={{ borderColor: css.border }}>
    {eligible ? (
      <CheckCircle
        size={15}
        className="mt-1 shrink-0"
        style={{ color: 'var(--success)' }}
        aria-hidden="true"
      />
    ) : (
      <XCircle
        size={15}
        className="mt-1 shrink-0"
        style={{ color: 'var(--destructive)' }}
        aria-hidden="true"
      />
    )}
    <span className="text-sm leading-6" style={{ color: css.mutedFg }}>
      <strong style={{ color: css.fg }}>{label}</strong> {detail}
    </span>
  </li>
)

/** Timeline step */
const TimelineStep = ({ step, label, description }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
        style={{
          background: 'color-mix(in oklch, var(--primary) 12%, var(--surface))',
          color: css.primary,
          border: `1.5px solid color-mix(in oklch, var(--primary) 25%, var(--border))`,
        }}
      >
        {step}
      </div>
      <div
        className="mt-1 w-px flex-1"
        style={{ background: css.border, minHeight: '24px' }}
        aria-hidden="true"
      />
    </div>
    <div className="pb-6 pt-0.5">
      <p className="text-sm font-semibold" style={{ color: css.fg }}>{label}</p>
      <p className="mt-1 text-sm leading-6" style={{ color: css.mutedFg }}>{description}</p>
    </div>
  </div>
)

/** Highlighted callout */
const Callout = ({ icon: Icon, variant = 'default', children }) => {
  const isWarning = variant === 'warning'
  return (
    <div
      className="my-5 flex gap-3 rounded-xl border p-4"
      style={{
        borderColor: isWarning
          ? 'color-mix(in oklch, oklch(0.7 0.18 60) 30%, var(--border))'
          : 'color-mix(in oklch, var(--primary) 22%, var(--border))',
        background: isWarning
          ? 'color-mix(in oklch, oklch(0.7 0.18 60) 6%, var(--surface))'
          : 'color-mix(in oklch, var(--primary) 6%, var(--surface))',
      }}
    >
      {Icon && (
        <Icon
          size={16}
          className="mt-0.5 shrink-0"
          style={{ color: isWarning ? 'oklch(0.65 0.18 60)' : css.primary }}
          aria-hidden="true"
        />
      )}
      <p className="text-sm leading-6" style={{ color: css.fg }}>{children}</p>
    </div>
  )
}

const P = ({ children }) => (
  <p className="mb-4 text-sm leading-7" style={{ color: css.mutedFg }}>{children}</p>
)

const H3 = ({ children }) => (
  <h3
    className="mb-2 mt-6 text-[13px] font-semibold uppercase tracking-[0.1em]"
    style={{ color: css.fg }}
  >
    {children}
  </h3>
)

const UL = ({ items }) => {
  if (!items || !Array.isArray(items)) return null
  return (
    <ul className="mb-4 space-y-1.5 ps-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm leading-6" style={{ color: css.mutedFg }}>
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: css.primary, opacity: 0.7 }}
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

const RefundPolicy = () => {
  const { t } = useTranslation('legal')

  const eligibleItems = t('refund.eligible.items', { returnObjects: true })
  const notEligibleItems = t('refund.notEligible.items', { returnObjects: true })
  const billingErrorItems = t('refund.billingErrors.items', { returnObjects: true })
  const requestSteps = t('refund.howToRequest.steps', { returnObjects: true })
  const timelineSteps = t('refund.timeline.steps', { returnObjects: true })

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex gap-16">
          <TableOfContents />

          <main className="min-w-0 flex-1" aria-label="Refund policy content">

            <PolicySection id="overview" icon={RotateCcw} title={t('refund.overview.title', 'Overview')}>
              <P>{t('refund.overview.text1')}</P>
              <P>{t('refund.overview.text2')}</P>
              <Callout icon={RotateCcw}>
                {t('refund.overview.callout')}
              </Callout>
            </PolicySection>

            <PolicySection id="billing" icon={Zap} title={t('refund.billing.title', 'Subscription & Billing')}>
              <H3>{t('refund.billing.monthlyHeading', 'Monthly plans')}</H3>
              <P>{t('refund.billing.monthlyText')}</P>

              <H3>{t('refund.billing.yearlyHeading', 'Yearly Plans')}</H3>
              <P>{t('refund.billing.yearlyText')}</P>

              <H3>{t('refund.billing.downgradingHeading', 'Downgrading')}</H3>
              <P>{t('refund.billing.downgradingText')}</P>

              <H3>{t('refund.billing.upgradingHeading', 'Upgrading')}</H3>
              <P>{t('refund.billing.upgradingText')}</P>

              <H3>{t('refund.billing.switchingMonthlyHeading', 'Switching from Monthly to Annual')}</H3>
              <P>{t('refund.billing.switchingMonthlyText')}</P>

              <H3>{t('refund.billing.switchingAnnualHeading', 'Switching from Annual To Monthly')}</H3>
              <P>{t('refund.billing.switchingAnnualText')}</P>
            </PolicySection>

            <PolicySection id="eligible" icon={CheckCircle} title={t('refund.eligible.title', 'Eligible Refunds')}>
              <P>{t('refund.eligible.intro')}</P>
              <ul
                className="mt-4 rounded-2xl border overflow-hidden divide-y"
                style={{ borderColor: css.border, divideColor: css.border }}
              >
                {Array.isArray(eligibleItems) && eligibleItems.map((item, i) => (
                  <StatusItem key={i} eligible label={item.label} detail={item.detail} />
                ))}
              </ul>
            </PolicySection>

            <PolicySection id="not-eligible" icon={XCircle} title={t('refund.notEligible.title', 'Non-Refundable Cases')}>
              <P>{t('refund.notEligible.intro')}</P>
              <ul
                className="mt-4 rounded-2xl border overflow-hidden divide-y"
                style={{ borderColor: css.border }}
              >
                {Array.isArray(notEligibleItems) && notEligibleItems.map((item, i) => (
                  <StatusItem key={i} eligible={false} label={item.label} detail={item.detail} />
                ))}
              </ul>
            </PolicySection>

            <PolicySection id="billing-errors" icon={CreditCard} title={t('refund.billingErrors.title', 'Billing Errors')}>
              <P>{t('refund.billingErrors.intro')}</P>
              <UL items={billingErrorItems} />
              <P>{t('refund.billingErrors.outro')}</P>
            </PolicySection>

            <PolicySection id="how-to-request" icon={HelpCircle} title={t('refund.howToRequest.title', 'How to Request a Refund')}>
              <P>{t('refund.howToRequest.intro')}</P>

              <H3>{t('refund.howToRequest.whatToIncludeHeading', 'What to Include')}</H3>
              <P>{t('refund.howToRequest.whatToIncludeText')}</P>

              <div className="mt-1 space-y-0">
                {Array.isArray(requestSteps) && requestSteps.map((step, i) => (
                  <TimelineStep
                    key={i}
                    step={String(i + 1)}
                    label={step.label}
                    description={step.description}
                  />
                ))}
              </div>

              <Callout icon={Mail}>
                {t('refund.howToRequest.callout')}
              </Callout>
            </PolicySection>

            <PolicySection id="timeline" icon={Clock} title={t('refund.timeline.title', 'Processing Timeline')}>
              <P>{t('refund.timeline.intro')}</P>
              <div className="mt-6 space-y-0">
                {Array.isArray(timelineSteps) && timelineSteps.map((step, i) => (
                  <TimelineStep
                    key={i}
                    step={String(i + 1)}
                    label={step.label}
                    description={step.description}
                  />
                ))}
              </div>
              <Callout icon={Clock}>
                {t('refund.timeline.callout')}
              </Callout>
            </PolicySection>

            <PolicySection id="contact" icon={Mail} title={t('refund.contact.title', 'Contact Billing')}>
              <P>{t('refund.contact.intro')}</P>

              {/* Cards row */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {/* Email card */}
                <div
                  className="flex flex-col gap-3 rounded-2xl border p-6"
                  style={{ borderColor: css.border, background: css.surface }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: 'color-mix(in oklch, var(--primary) 10%, var(--surface))',
                        color: css.primary,
                      }}
                      aria-hidden="true"
                    >
                      <Mail size={16} />
                    </span>
                    <p className="text-sm font-semibold" style={{ color: css.fg }}>
                      {t('refund.contact.emailTitle', 'Email Support')}
                    </p>
                  </div>
                  <p className="text-xs leading-5" style={{ color: css.mutedFg }}>
                    {t('refund.contact.emailNote', 'Include your account email and charge date for fastest resolution.')}
                  </p>
                  <a
                    href="mailto:contact@stallio.shop"
                    className="mt-auto text-sm font-medium underline underline-offset-2 transition-colors"
                    style={{ color: css.primary }}
                  >
                    {t('refund.contact.email', 'contact@stallio.shop')}
                  </a>
                </div>

                {/* Contact page card */}
                <div
                  className="flex flex-col gap-3 rounded-2xl border p-6"
                  style={{
                    borderColor: 'color-mix(in oklch, var(--primary) 25%, var(--border))',
                    background: 'color-mix(in oklch, var(--primary) 5%, var(--surface))',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: 'color-mix(in oklch, var(--primary) 15%, var(--surface))',
                        color: css.primary,
                      }}
                      aria-hidden="true"
                    >
                      <HelpCircle size={16} />
                    </span>
                    <p className="text-sm font-semibold" style={{ color: css.fg }}>
                      {t('refund.contact.contactPageTitle', 'Contact Page')}
                    </p>
                  </div>
                  <p className="text-xs leading-5" style={{ color: css.mutedFg }}>
                    {t('refund.contact.contactPageNote', 'Select the Billing category for priority routing to our billing team.')}
                  </p>
                  <PrimaryCTA to="/contact" size="md" className="mt-auto w-full justify-center">
                    {t('common.contactUs', 'Contact Us')}
                  </PrimaryCTA>
                </div>

              </div>

              {/* Availability note */}
              <div
                className="mt-5 flex items-center gap-2.5 rounded-xl border px-4 py-3"
                style={{ borderColor: css.border, background: css.surface }}
              >
                <Clock size={13} className="shrink-0" style={{ color: css.mutedFg }} aria-hidden="true" />
                <p className="text-xs leading-5" style={{ color: css.mutedFg }}>
                  {t('refund.contact.availabilityNote', 'Our billing team responds within 2 business days. Available Monday – Friday, 9 AM – 6 PM PKT.')}
                </p>
              </div>
            </PolicySection>

          </main>
        </div>
      </div>
    </>
  )
}

export default RefundPolicy