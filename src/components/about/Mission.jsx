import { motion } from 'framer-motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'
import { reveal, revealSoft } from '../../utils/motionVariants'

const Mission = () => {
  const [ref, isInView] = useInViewOnce()
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <section
      aria-labelledby="mission-heading"
      className="border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div ref={ref}>

          {/* Eyebrow */}
          <motion.span
            variants={revealSoft}
            {...motionProps}
            className="mb-10 inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: 'var(--primary)' }}
          >
            Our mission
          </motion.span>

          {/* Quote block — primary border accent, large typographic statement */}
          <motion.blockquote
            variants={reveal}
            {...motionProps}
            className="max-w-4xl border-l-[3px] pl-8 sm:pl-12"
            style={{ borderColor: 'var(--primary)' }}
          >
            <p
              id="mission-heading"
              className="font-heading font-bold leading-tight"
              style={{
                fontSize: 'clamp(1.7rem, 4vw, 3rem)',
                color: 'var(--foreground)',
              }}
            >
              Commerce moves through DMs.
              <br />
              <span style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                We built the store for that.
              </span>
            </p>

            <footer className="mt-8 flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{ background: 'var(--border)' }}
              />
              <cite
                className="text-xs font-semibold uppercase tracking-[0.15em] not-italic"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Stallio · 2024
              </cite>
            </footer>
          </motion.blockquote>

          {/* Supporting statement below the quote */}
          <motion.p
            variants={revealSoft}
            {...motionProps}
            className="mt-12 max-w-xl text-sm leading-7 sm:text-base"
            style={{ color: 'var(--muted-foreground)', paddingLeft: '2rem' }}
          >
            We're not building a marketplace. We're building the simplest, most powerful
            store a solo seller can run from their phone, because that's where Pakistan's
            commerce actually happens.
          </motion.p>

        </div>
      </div>
    </section>
  )
}

export default Mission