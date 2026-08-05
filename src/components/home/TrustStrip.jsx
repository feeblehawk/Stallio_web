import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'

const platforms = ['Instagram', 'WhatsApp', 'TikTok', 'Facebook']

const TrustStrip = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()

  const isVisible = reducedMotion || inView

  return (
    <section
      ref={ref}
      aria-label="Built for the way you sell"
      className="border-b py-8 sm:py-10"
      style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-5">
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm font-semibold tracking-wide sm:text-base"
            style={{ color: 'var(--foreground)' }}
          >
            Built for the way you sell
          </motion.p>
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-center text-sm leading-7 text-muted-foreground sm:text-base"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Designed for fast social selling, Stallio gives your business a polished storefront that customers trust.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
            {platforms.map((platform, index) => (
              <motion.span
                key={platform}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: reducedMotion ? 0 : 0.12 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-flex items-center text-xs font-medium sm:text-sm"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {index > 0 && (
                  <span className="mx-2 sm:mx-3" style={{ color: 'var(--border)' }} aria-hidden="true">
                    ·
                  </span>
                )}
                {platform}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustStrip
