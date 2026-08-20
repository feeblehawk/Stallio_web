import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInViewOnce } from '../../../hooks/useInViewOnce'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { reveal, revealSoft, staggerContainer } from '../../../utils/motionVariants'

const Story = () => {
  const { t } = useTranslation('about')
  const [ref, isInView] = useInViewOnce()
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  const timeline = [
    {
      id:     t('story.timeline.step1.id', 'The problem'),
      detail: t('story.timeline.step1.detail', 'Watching sellers drown in DMs'),
      step:   t('story.timeline.step1.step', '01'),
    },
    {
      id:     t('story.timeline.step2.id', 'First version'),
      detail: t('story.timeline.step2.detail', 'Launched to 50 beta sellers'),
      step:   t('story.timeline.step2.step', '02'),
    },
    {
      id:     t('story.timeline.step3.id', 'Growing fast'),
      detail: t('story.timeline.step3.detail', '500+ active stores nationwide'),
      step:   t('story.timeline.step3.step', '03'),
    },
  ]

  return (
    <section
      aria-labelledby="story-heading"
      className="border-t border-border bg-background"
    >
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        {/* Eyebrow — centered on mobile, start on desktop */}
        <motion.span
          variants={revealSoft}
          {...motionProps}
          className="mb-12 block text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-primary lg:text-start"
        >
          {t('story.eyebrow', 'Our story')}
        </motion.span>

        <div className="grid gap-16 lg:grid-cols-[220px_1fr] lg:gap-24">

          {/* ── Timeline ───────────────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            {...motionProps}
          >

            {/* ── MOBILE: horizontal step strip ── */}
            <div className="lg:hidden">
              <div className="relative flex items-start justify-between">

                {/* Hairline track */}
                <div
                  className="absolute top-4 start-[calc(16.66%)] end-[calc(16.66%)] h-px"
                  style={{
                    background: 'linear-gradient(to right, var(--primary), color-mix(in oklch, var(--primary) 30%, var(--border)), var(--border))',
                  }}
                  aria-hidden="true"
                />

                {timeline.map(({ id, detail, step }) => (
                  <motion.div
                    key={id}
                    variants={revealSoft}
                    className="relative flex flex-1 flex-col items-center text-center gap-3 px-1"
                  >
                    {/* Step chip */}
                    <div
                      className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground tabular-nums"
                      style={{ boxShadow: '0 0 0 4px color-mix(in oklch, var(--primary) 18%, transparent)' }}
                    >
                      {step}
                    </div>

                    {/* Label + detail below chip */}
                    <div>
                      <div className="text-[12px] font-bold leading-tight text-foreground">
                        {id}
                      </div>
                      <div className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                        {detail}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── DESKTOP: vertical sidebar timeline ── */}
            <div className="hidden lg:flex lg:flex-col">
              {timeline.map(({ id, detail, step }, i) => (
                <motion.div
                  key={id}
                  variants={revealSoft}
                  className="flex items-start gap-3 text-start"
                >
                  {/* Dot + connector */}
                  <div className="flex flex-col items-center">
                    <div
                      className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-primary-foreground tabular-nums"
                      style={{ background: 'var(--primary)' }}
                    >
                      {step}
                    </div>
                    {i < timeline.length - 1 && (
                      <span
                        className="mt-1 w-px opacity-40"
                        style={{
                          height: '48px',
                          background: 'linear-gradient(to bottom, var(--primary), var(--border))',
                        }}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className="pb-10">
                    <div className="font-heading text-sm font-bold tabular-nums text-foreground">
                      {id}
                    </div>
                    <div className="mt-1 text-[11px] leading-tight text-muted-foreground opacity-65">
                      {detail}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Narrative prose ── */}
          <motion.div
            variants={reveal}
            {...motionProps}
            className="space-y-7 text-center lg:text-start"
          >
            <h2
              id="story-heading"
              className="font-heading font-extrabold tracking-[-0.03em] text-foreground"
              style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)' }}
            >
              {t('story.title', 'Why we built Stallio')}
            </h2>
            <div className="space-y-5 text-base leading-7 text-muted-foreground sm:text-lg">
              <p>
                {t('story.p1', "We watched talented sellers spend their days copy-pasting product details into WhatsApp DMs, tracking orders in handwritten notebooks, and losing buyers to a checkout process that didn't exist.")}
              </p>
              <p>
                {t('story.p2', "The tools they had were built for warehouses, not for someone running a boutique from their phone. So, we built Stallio — a store that lives at a single link and fits the way social selling actually works.")}
              </p>
              <p>
                {t('story.p3', 'No domains to configure. No payment gateways to negotiate. Just your products, your buyers, and one link you share everywhere.')}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Story