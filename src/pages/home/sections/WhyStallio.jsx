import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import useReducedMotion from '../../../hooks/useReducedMotion'
import Stat from '../../../components/Stat'
import { easePremium, staggerContainer, revealSoft } from '../../../utils/motionVariants'

// ─── Feature list ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: 'domain',
    title: 'No domain stress',
    desc: 'stallio.shop link, ready instantly. No DNS, hosting, or deploy keys.',
  },
  {
    id: 'payment',
    title: 'You collect payment',
    desc: 'Bank, link, or COD. Stallio never sits between you and your buyer.',
  },
  {
    id: 'thumbs',
    title: 'Built for thumbs',
    desc: 'Mobile storefront where your buyers already are.',
  },
  {
    id: 'orders',
    title: 'Orders in one place',
    desc: 'Status, invoice, and history are not scattered across DMs.',
  },
  {
    id: 'promotions',
    title: 'Run promotions',
    desc: 'Coupon codes and delivery fees, all in Stallio.',
  },
]

// ─── Feature row ──────────────────────────────────────────────────────────────
const FeatureRow = ({ feature, delay, isVisible, reducedMotion }) => (
  <motion.div
    className="flex items-start gap-3.5 py-4 border-b last:border-b-0"
    style={{ borderColor: 'var(--border)' }}
    initial={reducedMotion ? false : { opacity: 0, x: 14 }}
    animate={isVisible ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, ease: easePremium, delay }}
  >
    {/* Dot accent */}
    <span
      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
      style={{ background: 'var(--primary)', opacity: 0.7 }}
      aria-hidden="true"
    />
    <div className="min-w-0">
      <p
        className="text-sm font-semibold leading-snug"
        style={{ color: 'var(--foreground)' }}
      >
        {feature.title}
      </p>
      <p
        className="mt-0.5 text-sm leading-relaxed"
        style={{ color: 'var(--muted-foreground)' }}
      >
        {feature.desc}
      </p>
    </div>
  </motion.div>
)

// ─── Main section ─────────────────────────────────────────────────────────────
const WhyStallo = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()
  const isVisible = reducedMotion || inView

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-stallo-heading"
      className="relative overflow-hidden border-b"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      {/* Subtle radial glow — bottom-left origin for visual balance */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 0% 100%, color-mix(in oklch, var(--primary) 6%, transparent), transparent 65%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20 xl:gap-28">

          {/* ── Left: sticky headline block ── */}
          <div className="lg:sticky lg:top-24">
            <motion.div
              variants={staggerContainer}
              initial={reducedMotion ? false : 'hidden'}
              animate={isVisible ? 'visible' : 'hidden'}
            >
              {/* Eyebrow */}
              <motion.span
                variants={revealSoft}
                className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: 'var(--primary)' }}
              >
                Why it lands
              </motion.span>

              {/* Headline */}
              <motion.h2
                variants={revealSoft}
                id="why-stallo-heading"
                className="mt-3 font-heading font-extrabold tracking-[-0.055em]"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                  lineHeight: 1.04,
                  color: 'var(--foreground)',
                }}
              >
                Sharp where money moves.{' '}
                <span style={{ color: 'var(--muted-foreground)', fontWeight: 700 }}>
                  Quiet everywhere else.
                </span>
              </motion.h2>

              {/* Sub */}
              <motion.p
                variants={revealSoft}
                className="mt-4 text-base leading-7"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Fewer tools to babysit. More time making and shipping.
              </motion.p>

              {/* Accent rule */}
              <motion.div
                variants={revealSoft}
                className="mt-6 h-px w-10"
                style={{ background: 'var(--primary)', opacity: 0.5 }}
                aria-hidden="true"
              />

              {/* Stats row */}
              <div className="mt-8 flex items-start gap-6 sm:gap-8">
                <Stat num="1 link" label="your whole store"    delay={0.3} isVisible={isVisible} reducedMotion={reducedMotion} />

                {/* Vertical divider */}
                <div
                  className="mt-1 w-px self-stretch"
                  style={{ background: 'var(--border)' }}
                  aria-hidden="true"
                />

                <Stat num="0 apps"  label="to stitch together"  delay={0.38} isVisible={isVisible} reducedMotion={reducedMotion} />

                <div
                  className="mt-1 w-px self-stretch"
                  style={{ background: 'var(--border)' }}
                  aria-hidden="true"
                />

                <Stat num="30 days" label="on us, no card"       delay={0.46} isVisible={isVisible} reducedMotion={reducedMotion} />
              </div>

              {/* Free pill */}
              <motion.div
                className="mt-8"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: easePremium, delay: 0.55 }}
              >
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold"
                  style={{
                    background: 'color-mix(in oklch, oklch(0.65 0.18 145) 10%, var(--surface))',
                    borderColor: 'color-mix(in oklch, oklch(0.65 0.18 145) 28%, var(--border))',
                    color: 'oklch(0.38 0.13 145)',
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: 'oklch(0.58 0.18 145)' }}
                    aria-hidden="true"
                  />
                  First month completely free
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right: feature list ── */}
          <div>
            {FEATURES.map((feature, i) => (
              <FeatureRow
                key={feature.id}
                feature={feature}
                delay={0.12 + i * 0.08}
                isVisible={isVisible}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default WhyStallo