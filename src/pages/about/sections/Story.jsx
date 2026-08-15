import { motion } from 'framer-motion'
import { useInViewOnce } from '../../../hooks/useInViewOnce'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { reveal, revealSoft, staggerContainer } from '../../../utils/motionVariants'

const TIMELINE = [
  { id: 'The problem',   detail: 'Watching sellers drown in DMs',     step: '01' },
  { id: 'First version', detail: 'Launched to 50 beta sellers',       step: '02' },
  { id: 'Growing fast',  detail: '500+ active stores nationwide',      step: '03' },
]

const Story = () => {
  const [ref, isInView] = useInViewOnce()
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <section
      aria-labelledby="story-heading"
      className="border-t border-border bg-background"
    >
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        {/* Eyebrow — centered on mobile, left on desktop */}
        <motion.span
          variants={revealSoft}
          {...motionProps}
          className="mb-12 block text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-primary lg:text-left"
        >
          Our story
        </motion.span>

        <div className="grid gap-16 lg:grid-cols-[220px_1fr] lg:gap-24">

          {/* ── Timeline ───────────────────────────────────────────────────── */}
          {/*
              Mobile  : horizontal stepper — 3 numbered chips in a row with a
                        connecting line between them, labels stacked below each chip.
              Desktop : classic vertical sidebar — dot + gradient connector line,
                        label + detail to the right.
          */}
          <motion.div
            variants={staggerContainer}
            {...motionProps}
          >

            {/* ── MOBILE: horizontal step strip ── */}
            <div className="lg:hidden">
              {/* Track: connecting line behind the chips */}
              <div className="relative flex items-start justify-between">

                {/* Hairline track — spans between first and last chip centers */}
                <div
                  className="absolute top-4 left-[calc(16.66%)] right-[calc(16.66%)] h-px"
                  style={{
                    background: 'linear-gradient(to right, var(--primary), color-mix(in oklch, var(--primary) 30%, var(--border)), var(--border))',
                  }}
                  aria-hidden="true"
                />

                {TIMELINE.map(({ id, detail, step }, i) => (
                  <motion.div
                    key={id}
                    variants={revealSoft}
                    className="relative flex flex-1 flex-col items-center text-center gap-3 px-1"
                  >
                    {/* Step chip */}
                    <div
                      className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground"
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
              {TIMELINE.map(({ id, detail, step }, i) => (
                <motion.div
                  key={id}
                  variants={revealSoft}
                  className="flex items-start gap-3"
                >
                  {/* Dot + connector */}
                  <div className="flex flex-col items-center">
                    <div
                      className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-primary-foreground"
                      style={{ background: 'var(--primary)' }}
                    >
                      {step}
                    </div>
                    {i < TIMELINE.length - 1 && (
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

          {/* ── Narrative prose — centered on mobile, left on desktop ── */}
          <motion.div
            variants={reveal}
            {...motionProps}
            className="space-y-7 text-center lg:text-left"
          >
            <h2
              id="story-heading"
              className="font-heading font-extrabold tracking-[-0.03em] text-foreground"
              style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)' }}
            >
              Why we built Stallio
            </h2>
            <div className="space-y-5 text-base leading-7 text-muted-foreground sm:text-lg">
              <p>
                We watched talented sellers spend their days copy-pasting product details
                into WhatsApp DMs, tracking orders in handwritten notebooks, and losing
                buyers to a checkout process that didn't exist.
              </p>
              <p>
                The tools they had were built for warehouses, not for someone running a
                boutique from their phone. So, we built Stallio — a store that
                lives at a single link and fits the way social selling actually works
                in Pakistan.
              </p>
              <p>
                No domains to configure. No payment gateways to negotiate. Just your
                products, your buyers, and one link you share everywhere.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Story