import { motion } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'
import { blurReveal, reveal, revealSoft, staggerHero } from '../../utils/motionVariants'

const AboutHero = () => {
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: 'visible' }

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative isolate overflow-hidden border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Background: centered radial glow + grid */}
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        {/* Primary glow — centered */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 70%)',
          }}
        />
        {/* Soft top-edge glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, color-mix(in oklch, var(--primary) 5%, transparent), transparent 65%)',
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={staggerHero}
          {...motionProps}
        >
          {/* Eyebrow badge */}
          <motion.div variants={revealSoft}>
            <div
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5"
              style={{
                borderColor: 'var(--border)',
                background: 'color-mix(in oklch, var(--surface) 80%, transparent)',
                backdropFilter: 'blur(8px)',
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
                About Stallio
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="about-hero-heading"
            variants={blurReveal}
            className="font-heading font-extrabold tracking-[-0.04em]"
            style={{
              fontSize: 'clamp(2.75rem, 5.5vw, 5rem)',
              lineHeight: 1.0,
              color: 'var(--foreground)',
            }}
          >
            Built for sellers
            <br />
            <span style={{ color: 'var(--primary)' }}>who move fast.</span>
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={reveal}
            className="mt-7 max-w-xl text-base leading-7 sm:text-lg"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Stallio started with one observation: World's best sellers were already
            selling on Instagram and WhatsApp. They just needed a real store to match.
            We built exactly that.
          </motion.p>

          {/* Divider accent */}
          <motion.div
            variants={revealSoft}
            className="mt-10 flex items-center gap-3"
          >
            
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutHero