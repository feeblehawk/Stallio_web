import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  FileText,
  UserCheck,
  ShoppingBag,
  CreditCard,
  AlertTriangle,
  Scale,
  Ban,
  RefreshCw,
  Mail,
  BookOpen,
  Layers,
  HelpCircle,
  Clock,
} from 'lucide-react'
import PrimaryCTA from '../../components/PrimaryCTA'
import useReducedMotion from '../../hooks/useReducedMotion'
import { blurReveal, revealSoft, staggerHero, easePremium } from '../../utils/motionVariants'
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
      aria-labelledby="tc-heading"
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
              <FileText size={13} style={{ color: css.primary }} aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t('common.badge', 'Legal')}
              </span>
            </div>
          </motion.div>

          <motion.h1
            id="tc-heading"
            variants={blurReveal}
            className="font-heading font-extrabold tracking-[-0.04em] text-foreground"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.25rem)', lineHeight: 1.0 }}
          >
            {t('terms.hero.headline1', 'Terms &')}{' '}
            <br />
            <span style={{ color: css.primary }}>{t('terms.hero.headline2', 'Conditions')}</span>
          </motion.h1>

          <motion.p
            variants={revealSoft}
            className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            {t('terms.hero.subtitle', 'Please read these terms carefully. By using Stallio you agree to be bound by them. If you have questions, contact us before you start.')}
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
              {t('common.lastUpdated', 'Last updated')}: {t('terms.hero.lastUpdatedDate', 'June 1, 2025')}
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
    { id: 'acceptance', icon: UserCheck, label: t('terms.toc.acceptance', 'Acceptance of Terms') },
    { id: 'the-service', icon: Layers, label: t('terms.toc.theService', 'The Service') },
    { id: 'your-account', icon: BookOpen, label: t('terms.toc.yourAccount', 'Your Account') },
    { id: 'seller-conduct', icon: ShoppingBag, label: t('terms.toc.sellerConduct', 'Seller Conduct') },
    { id: 'subscriptions', icon: CreditCard, label: t('terms.toc.subscriptions', 'Subscriptions & Billing') },
    { id: 'ip', icon: FileText, label: t('terms.toc.ip', 'Intellectual Property') },
    { id: 'liability', icon: AlertTriangle, label: t('terms.toc.liability', 'Limitation of Liability') },
    { id: 'prohibited', icon: Ban, label: t('terms.toc.prohibited', 'Prohibited Uses') },
    { id: 'governing-law', icon: Scale, label: t('terms.toc.governingLaw', 'Governing Law') },
    { id: 'changes', icon: RefreshCw, label: t('terms.toc.changes', 'Changes to Terms') },
    { id: 'contact', icon: Mail, label: t('terms.toc.contact', 'Contact') },
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

const Terms = () => {
  const { t } = useTranslation('legal')

  const providesItems = t('terms.theService.providesItems', { returnObjects: true })
  const doesNotItems = t('terms.theService.doesNotItems', { returnObjects: true })
  const accountResponsibilities = t('terms.yourAccount.responsibilitiesItems', { returnObjects: true })
  const sellerResponsibilities = t('terms.sellerConduct.responsibilitiesItems', { returnObjects: true })
  const billingItems = t('terms.subscriptions.billingItems', { returnObjects: true })
  const prohibitedItems = t('terms.prohibited.items', { returnObjects: true })

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex gap-16">
          <TableOfContents />

          <main className="min-w-0 flex-1" aria-label="Terms and conditions content">

            <PolicySection id="acceptance" icon={UserCheck} title={t('terms.acceptance.title', 'Acceptance of Terms')}>
              <P>{t('terms.acceptance.text1')}</P>
              <P>{t('terms.acceptance.text2')}</P>
              <Callout icon={UserCheck}>
                {t('terms.acceptance.callout')}
              </Callout>
            </PolicySection>

            <PolicySection id="the-service" icon={Layers} title={t('terms.theService.title', 'The Service')}>
              <P>{t('terms.theService.intro')}</P>

              <H3>{t('terms.theService.providesHeading', 'What Stallio Provides')}</H3>
              <UL items={providesItems} />

              <H3>{t('terms.theService.doesNotHeading', 'What Stallio Does Not Do')}</H3>
              <UL items={doesNotItems} />

              <P>{t('terms.theService.reserveRight')}</P>
            </PolicySection>

            <PolicySection id="your-account" icon={BookOpen} title={t('terms.yourAccount.title', 'Your Account')}>
              <H3>{t('terms.yourAccount.registrationHeading', 'Registration')}</H3>
              <P>{t('terms.yourAccount.registrationText')}</P>

              <H3>{t('terms.yourAccount.responsibilitiesHeading', 'Account Responsibilities')}</H3>
              <UL items={accountResponsibilities} />

              <H3>{t('terms.yourAccount.terminationHeading', 'Account Termination')}</H3>
              <P>{t('terms.yourAccount.terminationText')}</P>
            </PolicySection>

            <PolicySection id="seller-conduct" icon={ShoppingBag} title={t('terms.sellerConduct.title', 'Seller Conduct')}>
              <P>{t('terms.sellerConduct.intro')}</P>

              <H3>{t('terms.sellerConduct.responsibilitiesHeading', 'Your Responsibilities')}</H3>
              <UL items={sellerResponsibilities} />

              <Callout icon={AlertTriangle} variant="warning">
                {t('terms.sellerConduct.callout')}
              </Callout>

              <H3>{t('terms.sellerConduct.prohibitedHeading', 'Prohibited Products')}</H3>
              <P>{t('terms.sellerConduct.prohibitedText')}</P>
            </PolicySection>

            <PolicySection id="subscriptions" icon={CreditCard} title={t('terms.subscriptions.title', 'Subscriptions & Billing')}>
              <H3>{t('terms.subscriptions.plansHeading', 'Plans')}</H3>
              <P>{t('terms.subscriptions.plansText')}</P>

              <H3>{t('terms.subscriptions.billingHeading', 'Billing')}</H3>
              <UL items={billingItems} />

              <H3>{t('terms.subscriptions.upgradesHeading', 'Upgrades & Downgrades')}</H3>
              <P>{t('terms.subscriptions.upgradesText')}</P>

              <H3>{t('terms.subscriptions.cancellationHeading', 'Cancellation')}</H3>
              <P>{t('terms.subscriptions.cancellationText')}</P>

              <Callout icon={CreditCard}>
                {t('terms.subscriptions.callout')}
              </Callout>
            </PolicySection>

            <PolicySection id="ip" icon={FileText} title={t('terms.ip.title', 'Intellectual Property')}>
              <H3>{t('terms.ip.stallioHeading', "Stallio's Intellectual Property")}</H3>
              <P>{t('terms.ip.stallioText')}</P>

              <H3>{t('terms.ip.yourContentHeading', 'Your Content')}</H3>
              <P>{t('terms.ip.yourContentText1')}</P>
              <P>{t('terms.ip.yourContentText2')}</P>
            </PolicySection>

            <PolicySection id="liability" icon={AlertTriangle} title={t('terms.liability.title', 'Limitation of Liability')}>
              <P>{t('terms.liability.text1')}</P>
              <P>{t('terms.liability.text2')}</P>
              <P>{t('terms.liability.text3')}</P>

              <Callout icon={AlertTriangle} variant="warning">
                {t('terms.liability.callout')}
              </Callout>
            </PolicySection>

            <PolicySection id="prohibited" icon={Ban} title={t('terms.prohibited.title', 'Prohibited Uses')}>
              <P>{t('terms.prohibited.intro')}</P>
              <UL items={prohibitedItems} />
              <P>{t('terms.prohibited.consequence')}</P>
            </PolicySection>

            <PolicySection id="governing-law" icon={Scale} title={t('terms.governingLaw.title', 'Governing Law & Disputes')}>
              <P>{t('terms.governingLaw.text1')}</P>
              <P>{t('terms.governingLaw.text2')}</P>
              <P>{t('terms.governingLaw.text3')}</P>
            </PolicySection>

            <PolicySection id="changes" icon={RefreshCw} title={t('terms.changes.title', 'Changes to These Terms')}>
              <P>{t('terms.changes.text1')}</P>
              <P>{t('terms.changes.text2')}</P>
            </PolicySection>

            <PolicySection id="contact" icon={Mail} title={t('terms.contact.title', 'Contact')}>
              <P>{t('terms.contact.intro')}</P>

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
                      {t('terms.contact.emailTitle', 'Email Support')}
                    </p>
                  </div>
                  <p className="text-xs leading-5" style={{ color: css.mutedFg }}>
                    {t('terms.contact.emailNote', 'Include your account email for fastest resolution.')}
                  </p>
                  <a
                    href="mailto:contact@stallio.shop"
                    className="mt-auto text-sm font-medium underline underline-offset-2 transition-colors"
                    style={{ color: css.primary }}
                  >
                    {t('terms.contact.email', 'contact@stallio.shop')}
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
                      {t('terms.contact.contactPageTitle', 'Contact Page')}
                    </p>
                  </div>
                  <p className="text-xs leading-5" style={{ color: css.mutedFg }}>
                    {t('terms.contact.contactPageNote', 'Select the Legal category for priority routing to our team.')}
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
                  {t('terms.contact.availabilityNote', 'Our legal team responds within 5 business days. We are available Monday – Friday, 9 AM – 6 PM PKT.')}
                </p>
              </div>
            </PolicySection>

          </main>
        </div>
      </div>
    </>
  )
}

export default Terms