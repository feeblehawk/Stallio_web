import { motion } from 'framer-motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'
import { reveal, revealSoft, staggerContainer } from '../../utils/motionVariants'

const TIMELINE = [
  { id: 'The problem',   detail: 'Watching sellers drown in DMs' },
  { id: 'First version', detail: 'Launched to 50 beta sellers' },
  { id: 'Growing fast',  detail: '500+ active stores nationwide' },
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
      className="border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        {/* Eyebrow */}
        <motion.span
          variants={revealSoft}
          {...motionProps}
          className="mb-12 inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: 'var(--primary)' }}
        >
          Our story
        </motion.span>

        <div className="grid gap-16 lg:grid-cols-[220px_1fr] lg:gap-24">

          {/* Left: Vertical Timeline */}
          <motion.div
            variants={staggerContainer}
            {...motionProps}
            className="flex flex-row gap-6 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0 lg:gap-0"
          >
            {TIMELINE.map(({ id, detail }, i) => (
              <motion.div
                key={id}
                variants={revealSoft}
                className="flex flex-shrink-0 items-start gap-3 lg:flex-col lg:flex-shrink"
              >
                <div className="flex items-start gap-3">
                  {/* Dot + vertical connector */}
                  <div className="flex flex-col items-center">
                    <span
                      className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ring-2"
                      style={{
                        background: 'var(--primary)',
                        ringColor: 'color-mix(in oklch, var(--primary) 20%, transparent)',
                      }}
                    />
                    {i < TIMELINE.length - 1 && (
                      <span
                        className="hidden lg:block mt-2 w-px"
                        style={{
                          height: '52px',
                          background: 'linear-gradient(to bottom, var(--primary), var(--border))',
                          opacity: 0.35,
                        }}
                      />
                    )}
                  </div>

                  <div className="pb-10 lg:pb-12">
                    <div
                      className="font-heading text-sm font-bold tabular-nums"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {id}
                    </div>
                    <div
                      className="mt-1 text-[11px] leading-tight"
                      style={{ color: 'var(--muted-foreground)', opacity: 0.65 }}
                    >
                      {detail}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Narrative prose */}
          <motion.div variants={reveal} {...motionProps} className="space-y-7">
            <h2
              id="story-heading"
              className="font-heading font-extrabold tracking-[-0.03em]"
              style={{
                fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
                color: 'var(--foreground)',
              }}
            >
              Why we built Stallio
            </h2>
            <div
              className="space-y-5 text-base leading-7 sm:text-lg"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <p>
                We watched talented sellers spend their days copy-pasting product details
                into WhatsApp DMs, tracking orders in handwritten notebooks, and losing
                buyers to a checkout process that didn't exist.
              </p>
              <p>
                The tools they had were built for warehouses, not for someone running a
                boutique from their phone. So, we built Stallio, a store that
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