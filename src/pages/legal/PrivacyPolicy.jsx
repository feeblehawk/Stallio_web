import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Shield,
  Eye,
  Database,
  Share2,
  Cookie,
  Lock,
  UserCheck,
  Globe,
  RefreshCw,
  Mail,
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
      aria-labelledby="pp-heading"
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
              <Shield size={13} style={{ color: css.primary }} aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t('common.badge', 'Legal')}
              </span>
            </div>
          </motion.div>

          <motion.h1
            id="pp-heading"
            variants={blurReveal}
            className="font-heading font-extrabold tracking-[-0.04em] text-foreground"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.25rem)', lineHeight: 1.0 }}
          >
            {t('privacy.hero.headline1', 'Privacy')}{' '}
            <span style={{ color: css.primary }}>{t('privacy.hero.headline2', 'Policy')}</span>
          </motion.h1>

          <motion.p
            variants={revealSoft}
            className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            {t('privacy.hero.subtitle', 'We believe your data belongs to you. This policy explains exactly what we collect, why, and how you can control it.')}
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
              {t('common.lastUpdated', 'Last updated')}: {t('privacy.hero.lastUpdatedDate', 'June 1, 2025')}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1"
              style={{ borderColor: css.border, background: css.surface }}
            >
              <Globe size={11} aria-hidden="true" />
              {t('common.appliesGlobally', 'Applies globally')}
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
    { id: 'information-we-collect', icon: Database, label: t('privacy.toc.informationWeCollect', 'Information We Collect') },
    { id: 'how-we-use', icon: Eye, label: t('privacy.toc.howWeUse', 'How We Use It') },
    { id: 'sharing', icon: Share2, label: t('privacy.toc.sharing', 'Sharing & Disclosure') },
    { id: 'cookies', icon: Cookie, label: t('privacy.toc.cookies', 'Cookies & Tracking') },
    { id: 'data-security', icon: Lock, label: t('privacy.toc.dataSecurity', 'Data Security') },
    { id: 'your-rights', icon: UserCheck, label: t('privacy.toc.yourRights', 'Your Rights') },
    { id: 'international', icon: Globe, label: t('privacy.toc.international', 'International Transfers') },
    { id: 'updates', icon: RefreshCw, label: t('privacy.toc.updates', 'Policy Updates') },
    { id: 'contact', icon: Mail, label: t('privacy.toc.contact', 'Contact Us') },
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
                  className="group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors duration-150"
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

      <div className="prose-legal">{children}</div>
    </motion.section>
  )
}

const Callout = ({ icon: Icon, children }) => (
  <div
    className="my-5 flex gap-3 rounded-xl border p-4"
    style={{
      borderColor: 'color-mix(in oklch, var(--primary) 22%, var(--border))',
      background: 'color-mix(in oklch, var(--primary) 6%, var(--surface))',
    }}
  >
    {Icon && (
      <Icon size={16} className="mt-0.5 shrink-0" style={{ color: css.primary }} aria-hidden="true" />
    )}
    <p className="text-sm leading-6" style={{ color: css.fg }}>{children}</p>
  </div>
)

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

const PrivacyPolicy = () => {
  const { t } = useTranslation('legal')

  const accountItems = t('privacy.informationWeCollect.accountItems', { returnObjects: true })
  const storeItems = t('privacy.informationWeCollect.storeItems', { returnObjects: true })
  const technicalItems = t('privacy.informationWeCollect.technicalItems', { returnObjects: true })
  const operateItems = t('privacy.howWeUse.operateItems', { returnObjects: true })
  const improveItems = t('privacy.howWeUse.improveItems', { returnObjects: true })
  const securityItems = t('privacy.dataSecurity.items', { returnObjects: true })
  const rightsItems = t('privacy.yourRights.items', { returnObjects: true })

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex gap-16">
          <TableOfContents />

          <main className="min-w-0 flex-1" aria-label="Privacy policy content">

            <PolicySection id="information-we-collect" icon={Database} title={t('privacy.informationWeCollect.title', 'Information We Collect')}>
              <P>{t('privacy.informationWeCollect.intro')}</P>

              <H3>{t('privacy.informationWeCollect.accountHeading', 'Account & Profile')}</H3>
              <UL items={accountItems} />

              <H3>{t('privacy.informationWeCollect.storeHeading', 'Store & Order Data')}</H3>
              <UL items={storeItems} />

              <H3>{t('privacy.informationWeCollect.technicalHeading', 'Technical & Usage Data')}</H3>
              <UL items={technicalItems} />

              <Callout icon={Shield}>
                {t('privacy.informationWeCollect.callout')}
              </Callout>
            </PolicySection>

            <PolicySection id="how-we-use" icon={Eye} title={t('privacy.howWeUse.title', 'How We Use Your Information')}>
              <P>{t('privacy.howWeUse.intro')}</P>

              <H3>{t('privacy.howWeUse.operateHeading', 'To Operate Stallio')}</H3>
              <UL items={operateItems} />

              <H3>{t('privacy.howWeUse.improveHeading', 'To Improve the Service')}</H3>
              <UL items={improveItems} />

              <H3>{t('privacy.howWeUse.gdprHeading', 'Legal Basis (GDPR)')}</H3>
              <P>{t('privacy.howWeUse.gdprText')}</P>
            </PolicySection>

            <PolicySection id="sharing" icon={Share2} title={t('privacy.sharing.title', 'Sharing & Disclosure')}>
              <P>{t('privacy.sharing.intro')}</P>

              <H3>{t('privacy.sharing.providersHeading', 'Service Providers')}</H3>
              <P>{t('privacy.sharing.providersText')}</P>

              <H3>{t('privacy.sharing.customersHeading', "Your Customers' Data")}</H3>
              <P>{t('privacy.sharing.customersText')}</P>

              <H3>{t('privacy.sharing.legalHeading', 'Legal Requirements')}</H3>
              <P>{t('privacy.sharing.legalText')}</P>

              <Callout icon={Lock}>
                {t('privacy.sharing.callout')}
              </Callout>

              <H3>{t('privacy.sharing.transfersHeading', 'Business Transfers')}</H3>
              <P>{t('privacy.sharing.transfersText')}</P>
            </PolicySection>

            <PolicySection id="cookies" icon={Cookie} title={t('privacy.cookies.title', 'Cookies & Tracking')}>
              <P>{t('privacy.cookies.intro')}</P>

              <H3>{t('privacy.cookies.essentialHeading', 'Essential Cookies')}</H3>
              <P>{t('privacy.cookies.essentialText')}</P>

              <H3>{t('privacy.cookies.analyticsHeading', 'Analytics Cookies')}</H3>
              <P>{t('privacy.cookies.analyticsText')}</P>

              <H3>{t('privacy.cookies.choicesHeading', 'Your Choices')}</H3>
              <P>{t('privacy.cookies.choicesText')}</P>
            </PolicySection>

            <PolicySection id="data-security" icon={Lock} title={t('privacy.dataSecurity.title', 'Data Security')}>
              <P>{t('privacy.dataSecurity.intro')}</P>
              <UL items={securityItems} />
              <P>{t('privacy.dataSecurity.reportText')}</P>
            </PolicySection>

            <PolicySection id="your-rights" icon={UserCheck} title={t('privacy.yourRights.title', 'Your Rights')}>
              <P>{t('privacy.yourRights.intro')}</P>
              <UL items={rightsItems} />
              <Callout icon={UserCheck}>
                {t('privacy.yourRights.callout')}
              </Callout>
            </PolicySection>

            <PolicySection id="international" icon={Globe} title={t('privacy.international.title', 'International Data Transfers')}>
              <P>{t('privacy.international.text1')}</P>
              <P>{t('privacy.international.text2')}</P>
            </PolicySection>

            <PolicySection id="updates" icon={RefreshCw} title={t('privacy.updates.title', 'Policy Updates')}>
              <P>{t('privacy.updates.text1')}</P>
              <P>{t('privacy.updates.text2')}</P>
            </PolicySection>

            <PolicySection id="contact" icon={Mail} title={t('privacy.contact.title', 'Contact Us')}>
              <P>{t('privacy.contact.intro')}</P>

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
                      {t('privacy.contact.emailTitle', 'Email Support')}
                    </p>
                  </div>
                  <p className="text-xs leading-5" style={{ color: css.mutedFg }}>
                    {t('privacy.contact.emailNote', 'Include your account email for fastest resolution.')}
                  </p>
                  <a
                    href="mailto:contact@stallio.shop"
                    className="mt-auto text-sm font-medium underline underline-offset-2 transition-colors"
                    style={{ color: css.primary }}
                  >
                    {t('privacy.contact.email', 'contact@stallio.shop')}
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
                      {t('privacy.contact.contactPageTitle', 'Contact Page')}
                    </p>
                  </div>
                  <p className="text-xs leading-5" style={{ color: css.mutedFg }}>
                    {t('privacy.contact.contactPageNote', 'Select the Privacy category for priority routing to our team.')}
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
                  {t('privacy.contact.availabilityNote', 'Our privacy team responds within 5 business days. We are available Monday – Friday, 9 AM – 6 PM PKT.')}
                </p>
              </div>
            </PolicySection>

          </main>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy