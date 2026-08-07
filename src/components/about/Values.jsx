import { motion } from 'framer-motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'
import { easePremium } from '../../utils/motionVariants'

// ─── Values data ──────────────────────────────────────────────────────────────
const VALUES = [
  {
    index: '01',
    title: 'Speed over ceremony',
    desc:  'If it takes more than a minute to set up, we rethink it. Every screen, every step.',
  },
  {
    index: '02',
    title: 'Sellers keep control',
    desc:  'Your payments, your buyers, your data. We stay out of the middle — always.',
  },
  {
    index: '03',
    title: 'Built for this market',
    desc:  'Designed for how social commerce actually works in Pakistan — not borrowed from the West.',
  },
  {
    index: '04',
    title: 'Mobile first, always',
    desc:  'Your buyers are on their phones. So is every pixel, every interaction we write.',
  },
]

// ─── Single value row ─────────────────────────────────────────────────────────
const ValueRow = ({ value, index: i, isInView, reducedMotion }) => {
  const isLast = i === VALUES.length - 1

  return (
    <div
      className="relative grid grid-cols-1 lg:grid-cols-[1fr_300px]"
      style={{ borderBottom: isLast ? 'none' : '1px solid var(--border)' }}
    >
      {/* Left — large title block */}
      <motion.div
        className="relative flex items-start gap-6 py-10 pr-0 lg:pr-16"
        initial={reducedMotion ? false : { opacity: 0, x: -24 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, ease: easePremium, delay: 0.08 + i * 0.1 }}
      >
        {/* Ghost watermark number — fills left zone */}
        <span
          className="pointer-events-none select-none font-heading font-extrabold leading-none tabular-nums"
          style={{
            fontSize: 'clamp(4.5rem, 9vw, 7.5rem)',
            color: 'var(--primary)',
            opacity: 0.06,
            lineHeight: 1,
            minWidth: '3rem',
            flexShrink: 0,
            marginTop: '-0.1em',
          }}
          aria-hidden="true"
        >
          {value.index}
        </span>

        {/* Title */}
        <h3
          className="font-heading font-extrabold tracking-[-0.04em] leading-[1.05]"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
            color: 'var(--foreground)',
          }}
        >
          {value.title}
        </h3>
      </motion.div>

      {/* Right — description + rule */}
      <motion.div
        className="flex items-center pb-10 lg:py-10 lg:pl-10"
        style={{ borderLeft: '1px solid var(--border)' }}
        initial={reducedMotion ? false : { opacity: 0, x: 16 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, ease: easePremium, delay: 0.18 + i * 0.1 }}
      >
        {/* Horizontal connector rule — desktop only */}
        <span
          className="hidden lg:block h-px shrink-0 w-8 mr-6"
          style={{ background: 'var(--border)' }}
          aria-hidden="true"
        />
        <p
          className="text-sm leading-7 sm:text-base"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {value.desc}
        </p>
      </motion.div>

      {/* Mobile: small index label */}
      <span
        className="absolute top-10 right-0 font-heading text-[10px] font-bold tabular-nums tracking-[0.18em] lg:hidden"
        style={{ color: 'var(--primary)', opacity: 0.45 }}
        aria-hidden="true"
      >
        {value.index}
      </span>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
const Values = () => {
  const [ref, isInView] = useInViewOnce({ margin: '-60px' })
  const reducedMotion = useReducedMotion()

  return (
    <section
      ref={ref}
      aria-labelledby="values-heading"
      className="border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">

        {/* Section header */}
        <motion.div
          className="mb-4"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: easePremium, delay: 0 }}
        >
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: 'var(--primary)' }}
          >
            What we believe
          </span>
        </motion.div>

        {/* Headline + thin rule */}
        <div
          className="flex items-end justify-between gap-8 border-b pb-12"
          style={{ borderColor: 'var(--border)' }}
        >
          <motion.h2
            id="values-heading"
            className="font-heading font-extrabold tracking-[-0.04em]"
            style={{
              fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
              color: 'var(--foreground)',
              lineHeight: 1.05,
            }}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easePremium, delay: 0.06 }}
          >
            Our values
          </motion.h2>

          {/* Count badge */}
          <motion.span
            className="shrink-0 font-heading text-[11px] font-bold tabular-nums tracking-[0.2em]"
            style={{ color: 'var(--muted-foreground)', opacity: 0.5 }}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            transition={{ duration: 0.6, ease: easePremium, delay: 0.2 }}
            aria-hidden="true"
          >
            {VALUES.length} principles
          </motion.span>
        </div>

        {/* Value rows — manifesto wall */}
        <div className="mt-0">
          {VALUES.map((value, i) => (
            <ValueRow
              key={value.index}
              value={value}
              index={i}
              isInView={isInView}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Values