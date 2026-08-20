import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInViewOnce } from '../../../hooks/useInViewOnce'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { easePremium } from '../../../utils/motionVariants'
import SectionHeading from '../../../components/SectionHeading'

const OrderLifecycle = () => {
  const { t, i18n } = useTranslation('howitworks')
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [inViewRef, inView] = useInViewOnce({ margin: '-120px' })
  const isRtl = i18n.resolvedLanguage === 'ar'

  const stages = [
    {
      id: 'placed',
      label: t('lifecycle.stages.placed.label', 'Order Placed'),
      detail: t('lifecycle.stages.placed.detail', 'Customer checks out directly from your shared link'),
    },
    {
      id: 'confirmed',
      label: t('lifecycle.stages.confirmed.label', 'Order Confirmed'),
      detail: t('lifecycle.stages.confirmed.detail', 'Automated order confirmation sent to customer'),
    },
    {
      id: 'packed',
      label: t('lifecycle.stages.packed.label', 'Packed & Dispatched'),
      detail: t('lifecycle.stages.packed.detail', 'Seller marks ready; delivery rider notified'),
    },
    {
      id: 'delivered',
      label: t('lifecycle.stages.delivered.label', 'Delivered & Settled'),
      detail: t('lifecycle.stages.delivered.detail', 'Payment received, invoice generated & archived'),
    },
  ]

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 55%'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })
  const height = useTransform(fill, [0, 1], ['0%', '100%'])

  return (
    <section
      aria-labelledby="hiw-lifecycle-heading"
      className="relative border-b py-20 sm:py-24"
      style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)' }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="hiw-lifecycle-heading"
          eyebrow={t('lifecycle.eyebrow', 'After the link')}
          title={t('lifecycle.title', 'Then orders manage themselves')}
          subtitle={t('lifecycle.subtitle', 'Every order moves through four structured stages so seller and buyer stay fully updated.')}
        />

        <div ref={ref} className="relative mt-14 ps-10 sm:ps-14">
          {/* Track */}
          <div
            className="absolute start-[11px] sm:start-[27px] top-2 bottom-2 w-px"
            style={{ background: 'var(--border)' }}
            aria-hidden="true"
          />

          {/* Progress fill */}
          <motion.div
            className="absolute start-[11px] sm:start-[27px] top-2 w-px"
            style={{
              background: 'var(--primary)',
              height: reduced ? '100%' : height,
            }}
            aria-hidden="true"
          />

          <ol ref={inViewRef} className="space-y-9 text-start">
            {stages.map((stage, i) => (
              <motion.li
                key={stage.id}
                className="relative"
                initial={reduced ? false : { opacity: 0, x: isRtl ? -16 : 16 }}
                animate={inView || reduced ? { opacity: 1, x: 0 } : undefined}
                transition={{
                  duration: 0.55,
                  delay: 0.1 + i * 0.12,
                  ease: easePremium,
                }}
              >
                {/* Node */}
                <span
                  className="
                    absolute
                    -start-[39px]
                    sm:-start-[41px]
                    top-0.5
                    flex h-6 w-6
                    items-center justify-center
                    rounded-full
                    border
                    text-[10px]
                    font-bold
                    tabular-nums
                  "
                  style={{
                    borderColor:
                      'color-mix(in oklch, var(--primary) 30%, var(--border))',
                    background: 'var(--surface)',
                    color: 'var(--primary)',
                  }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>

                <p
                  className="text-[15px] font-semibold"
                  style={{ color: 'var(--foreground)' }}
                >
                  {stage.label}
                </p>

                <p
                  className="mt-1 text-sm leading-6"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {stage.detail}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default OrderLifecycle
