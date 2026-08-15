import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PrimaryCTA from '../../../components/PrimaryCTA'
import PhoneMockup from '../../../components/PhoneMockup'
import StallioStoreUI from '../../../components/StallioStoreUI'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { blurReveal, reveal, revealSoft, staggerHero } from '../../../utils/motionVariants'

const TrustBadge = ({ children }) => (
  <span
    className="inline-flex items-center gap-2 text-xs font-medium"
    style={{ color: 'var(--muted-foreground)' }}
  >
    <span
      className="h-1.5 w-1.5 rounded-full"
      style={{ background: 'var(--primary)', opacity: 0.8 }}
    />
    {children}
  </span>
)

const Hero = () => {
  const reducedMotion = useReducedMotion()

  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: 'visible' }

  return (
    <section
      aria-label="Stallio introduction"
      className="relative isolate overflow-hidden border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Background — subtle grid + radial gradient */}
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 70% 20%, color-mix(in oklch, var(--primary) 7%, transparent), transparent 68%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-10 xl:gap-14">

          {/* ── Left: Headline + CTAs ── */}
          <motion.div
            className="max-w-2xl text-center lg:text-left"
            variants={staggerHero}
            {...motionProps}
          >
            {/* Eyebrow badge */}
            <motion.div variants={revealSoft}>
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
                style={{
                  borderColor: 'var(--border)',
                  background: 'color-mix(in oklch, var(--surface) 78%, transparent)',
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: 'var(--primary)' }}
                />
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Social selling, simplified
                </span>
              </div>
            </motion.div>

            {/* Headline — heavy blur reveal */}
            <motion.h1
              variants={blurReveal}
              className="font-heading font-extrabold tracking-[-0.055em]"
              style={{
                fontSize: 'clamp(2.75rem, 6vw, 5rem)',
                lineHeight: 0.98,
                color: 'var(--foreground)',
              }}
            >
              Your store.
              <br />
              One link away.
            </motion.h1>

            {/* Body copy */}
            <motion.p
              variants={reveal}
              className="mx-auto mt-6 max-w-xl text-base leading-7 sm:text-lg lg:mx-0"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Stallio turns your social-selling presence into a real online store. One polished link
              where customers browse, buy, and checkout.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={reveal}
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <PrimaryCTA size="lg" className="text-base shadow-lg shadow-black/5" />
              <Link
                to="/how-it-works"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  background: 'color-mix(in oklch, var(--surface) 80%, transparent)',
                }}
              >
                See how it works
                <span
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={revealSoft}
              className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start"
            >
              <TrustBadge>Free to start</TrustBadge>
              <TrustBadge>No card required</TrustBadge>
              <TrustBadge>Live in minutes</TrustBadge>
            </motion.div>
          </motion.div>

          {/* ── Right: Phone mockup with product images ── */}
          <motion.div
            className="relative flex justify-center"
            initial={reducedMotion ? false : { opacity: 0, y: 44, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: reducedMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <PhoneMockup float={!reducedMotion}>
                <StallioStoreUI variant="hero" />

                {/* Pop up notification inside mobile frame */}
                <motion.div
                  className="absolute left-2 right-2 top-2 z-50 rounded-2xl p-2.5 shadow-xl"
                  style={{
                    background: 'color-mix(in oklch, var(--surface) 85%, transparent)',
                    border: '1px solid color-mix(in oklch, var(--border) 60%, transparent)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                  }}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl text-[10px]"
                      style={{
                        background: 'color-mix(in oklch, var(--primary) 12%, var(--surface))',
                        color: 'var(--primary)',
                      }}
                    >
                      ✓
                    </span>
                    <div>
                      <div className="text-[10px] font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
                        New Order
                      </div>
                      <div className="text-[9px] font-medium" style={{ color: 'var(--muted-foreground)' }}>
                        ₨ 4,500 • Just now
                      </div>
                    </div>
                  </div>
                </motion.div>
              </PhoneMockup>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
