import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInViewOnce } from '../../../hooks/useInViewOnce'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { easePremium } from '../../../utils/motionVariants'

// ─── Single value row ─────────────────────────────────────────────────────────
const ValueRow = ({ value, index: i, total, isInView, reducedMotion }) => {
  const isLast = i === total - 1

  return (
    <div
      className={`relative grid grid-cols-1 lg:grid-cols-[1fr_300px] ${isLast ? '' : 'border-b border-border'}`}
    >
      {/* Left — large title block */}
      <motion.div
        className="relative flex items-start gap-6 py-10 pe-0 lg:pe-16 text-start"
        initial={reducedMotion ? false : { opacity: 0, x: -24 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, ease: easePremium, delay: 0.08 + i * 0.1 }}
      >
        {/* Ghost watermark number */}
        <span
          className="pointer-events-none select-none font-heading font-extrabold leading-none tabular-nums text-primary opacity-50 shrink-0"
          style={{
            fontSize: 'clamp(4.5rem, 9vw, 7.5rem)',
            lineHeight: 1,
            minWidth: '3rem',
            marginTop: '-0.1em',
          }}
          aria-hidden="true"
        >
          {value.index}
        </span>

        {/* Title */}
        <h3
          className="font-heading font-extrabold tracking-[-0.04em] leading-[1.05] text-foreground"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
        >
          {value.title}
        </h3>
      </motion.div>

      {/* Right — description + rule */}
      <motion.div
        className="flex items-center border-s border-border pb-10 lg:py-10 lg:ps-10 text-start"
        initial={reducedMotion ? false : { opacity: 0, x: 16 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, ease: easePremium, delay: 0.18 + i * 0.1 }}
      >
        {/* Horizontal connector rule — desktop only */}
        <span
          className="hidden lg:block h-px w-8 shrink-0 me-6 bg-border"
          aria-hidden="true"
        />
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
          {value.desc}
        </p>
      </motion.div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
const Values = () => {
  const { t } = useTranslation('about')
  const [ref, isInView] = useInViewOnce({ margin: '-60px' })
  const reducedMotion = useReducedMotion()

  const rawValues = t('values.items', { returnObjects: true })
  const values = Array.isArray(rawValues) ? rawValues : [
    {
      index: '01',
      title: 'Speed over ceremony',
      desc:  'If it takes more than a minute to set up, we rethink it. Every screen, every step.',
    },
    {
      index: '02',
      title: 'Sellers keep control',
      desc:  'Your payments, your buyers, your data. We stay out of the middle, always.',
    },
    {
      index: '03',
      title: 'Built for this market',
      desc:  'Designed for how social commerce actually works.',
    },
    {
      index: '04',
      title: 'Mobile first, always',
      desc:  'Your buyers are on their phones. So is every pixel, every interaction we write.',
    },
  ]

  return (
    <section
      ref={ref}
      aria-labelledby="values-heading"
      className="border-t border-border bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">

        {/* Section header */}
        <motion.div
          className="mb-4 text-start"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: easePremium, delay: 0 }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            {t('values.eyebrow', 'What we believe')}
          </span>
        </motion.div>

        {/* Headline + thin rule */}
        <div className="flex items-end justify-between gap-8 border-b border-border pb-12">
          <motion.h2
            id="values-heading"
            className="font-heading font-extrabold tracking-[-0.04em] leading-[1.05] text-foreground text-start"
            style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)' }}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easePremium, delay: 0.06 }}
          >
            {t('values.title', 'Our values')}
          </motion.h2>

          {/* Count badge */}
          <motion.span
            className="shrink-0 font-heading text-[11px] font-bold tabular-nums tracking-[0.2em] text-muted-foreground opacity-50"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            transition={{ duration: 0.6, ease: easePremium, delay: 0.2 }}
            aria-hidden="true"
          >
            {values.length} {t('values.principles', 'principles')}
          </motion.span>
        </div>

        {/* Value rows */}
        <div className="mt-0">
          {values.map((value, i) => (
            <ValueRow
              key={value.index}
              value={value}
              index={i}
              total={values.length}
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