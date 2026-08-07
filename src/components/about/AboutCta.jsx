import { motion } from 'framer-motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'
import { reveal, revealSoft } from '../../utils/motionVariants'
import PrimaryCTA from '../PrimaryCTA'

const AboutCta = () => {
  const [ref, isInView] = useInViewOnce()
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <section
      aria-labelledby="about-cta-heading"
      className="border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Gradient background — upward glow from bottom, matches FinalCta */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 85% 75% at 50% 100%, color-mix(in oklch, var(--primary) 11%, transparent), transparent 70%), var(--surface)',
        }}
      >
        {/* Subtle grid overlay for texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div
          ref={ref}
          className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32 text-center"
        >
          <motion.span
            variants={revealSoft}
            {...motionProps}
            className="mb-6 inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: 'var(--primary)' }}
          >
            Get started
          </motion.span>

          <motion.h2
            id="about-cta-heading"
            variants={reveal}
            {...motionProps}
            className="font-heading font-extrabold tracking-[-0.04em]"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
              lineHeight: 1.05,
              color: 'var(--foreground)',
            }}
          >
            Ready to open your store?
          </motion.h2>

          <motion.p
            variants={reveal}
            {...motionProps}
            className="mx-auto mt-5 max-w-md text-base leading-7 sm:text-lg"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Join hundreds of sellers who launched their store in minutes. No domain,
            No gateway, No code.
          </motion.p>

          <motion.div
            variants={revealSoft}
            {...motionProps}
            className="mt-10 flex justify-center"
          >
            <PrimaryCTA size="lg" className="text-base shadow-lg shadow-black/5" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutCta