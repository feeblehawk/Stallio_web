import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useInViewOnce } from '../../../hooks/useInViewOnce'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { easePremium } from '../../../utils/motionVariants'
import SectionHeading from '../../../components/SectionHeading'

const LIFECYCLE = [
  { id: 'placed', label: 'Order Placed', detail: 'Customer checks out directly from your shared link' },
  { id: 'confirmed', label: 'Order Confirmed', detail: 'Automated order confirmation sent to customer' },
  { id: 'packed', label: 'Packed & Dispatched', detail: 'Seller marks ready; delivery rider notified' },
  { id: 'delivered', label: 'Delivered & Settled', detail: 'Payment received, invoice generated & archived' },
]

const OrderLifecycle = () => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [inViewRef, inView] = useInViewOnce({ margin: '-120px' })

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
          eyebrow="After the link"
          title="Then orders manage themselves"
          subtitle="Every order moves through four structured stages so seller and buyer stay fully updated."
        />

        <div ref={ref} className="relative mt-14 pl-10 sm:pl-14">
        {/* Track */}
        <div
          className="absolute left-[11px] top-2 bottom-2 w-px sm:left-[27px]"
          style={{ background: 'var(--border)' }}
          aria-hidden="true"
        />

        {/* Progress fill */}
        <motion.div
          className="absolute left-[11px] top-2 w-px sm:left-[27px]"
          style={{
            background: 'var(--primary)',
            height: reduced ? '100%' : height,
          }}
          aria-hidden="true"
        />

        <ol ref={inViewRef} className="space-y-9 text-left">
          {LIFECYCLE.map((stage, i) => (
            <motion.li
              key={stage.id}
              className="relative"
              initial={reduced ? false : { opacity: 0, x: 16 }}
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
                  -left-[39px]
                  top-0.5
                  flex h-6 w-6
                  items-center justify-center
                  rounded-full
                  border
                  text-[10px]
                  font-bold
                  tabular-nums
                  sm:-left-[41px]
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
