import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PhoneMockup from './PhoneMockup'
import StallioStoreUI from './StallioStoreUI'
import PrimaryCTA from '../PrimaryCTA'
import useReducedMotion from '../../hooks/useReducedMotion'
import { personaTransition, reveal, staggerContainer } from '../../utils/motionVariants'

const personas = [
  {
    id: 'starting-out',
    label: 'Starting out',
    title: 'Your first store, ready in minutes.',
    body: 'Add your products, choose your look, and share one link. No domain, hosting, or developer needed.',
    variant: 'starting-out',
  },
  {
    id: 'social-seller',
    label: 'Social seller',
    title: 'Turn conversations into customers.',
    body: 'Keep Instagram and WhatsApp as your reach, while Stallio gives every customer a clear place to browse and buy.',
    variant: 'social-seller',
  },
  {
    id: 'growing-business',
    label: 'Growing business',
    title: 'A cleaner system as you grow.',
    body: 'Move beyond manual order handling with one place for products, orders, and the storefront your customers see.',
    variant: 'growing-business',
  },
]

const PersonaCopy = ({ persona, reducedMotion }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={persona.id}
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
      transition={personaTransition}
      className="text-center lg:text-left"
    >
      <p
        className="text-sm font-semibold uppercase tracking-[0.28em]"
        style={{ color: 'var(--primary)' }}
      >
  
      </p>
      <h3
        className="font-heading font-extrabold tracking-[-0.055em]"
        style={{
          fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
          lineHeight: 0.98,
          color: 'var(--foreground)',
        }}
      >
        {persona.title}
      </h3>
      <div className="mt-4 hidden h-px w-12 lg:block" style={{ background: 'var(--primary)' }} />
      <p className="mx-auto mt-4 max-w-lg text-base leading-7 lg:mx-0" style={{ color: 'var(--muted-foreground)' }}>
        {persona.body}
      </p>
      <div className="mt-6 flex justify-center lg:justify-start">
        <PrimaryCTA size="md" />
      </div>
    </motion.div>
  </AnimatePresence>
)

const WhoItFits = () => {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()

  const persona = personas[active]
  const isVisible = reducedMotion || inView

  useEffect(() => {
    if (reducedMotion || !inView) return undefined

    const intervalId = window.setInterval(() => {
      setActive((current) => (current + 1) % personas.length)
    }, 6500)

    return () => window.clearInterval(intervalId)
  }, [inView, reducedMotion])

  return (
    <section
      ref={ref}
      aria-labelledby="who-fits-heading"
      className="relative overflow-hidden border-b"
      style={{ background: 'var(--surface-muted)', borderColor: 'var(--border)' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={staggerContainer}
          initial={reducedMotion ? false : 'hidden'}
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.span
            variants={reveal}
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: 'var(--primary)' }}
          >
            Who it fits
          </motion.span>
          <motion.h2
            variants={reveal}
            id="who-fits-heading"
            className="mt-4 font-heading font-extrabold tracking-[-0.05em]"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              lineHeight: 1.02,
              color: 'var(--foreground)',
            }}
          >
            Built for the way you sell.
          </motion.h2>
        </motion.div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
          {/* Persona selectors */}
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            <div
              className="flex flex-wrap justify-center gap-2 lg:justify-start"
              role="tablist"
              aria-label="Who Stallio is for"
            >
              {personas.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  onClick={() => setActive(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                      e.preventDefault()
                      setActive((index + 1) % personas.length)
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                      e.preventDefault()
                      setActive((index - 1 + personas.length) % personas.length)
                    }
                  }}
                  className="rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    borderColor:
                      active === index
                        ? 'color-mix(in oklch, var(--primary) 28%, var(--border))'
                        : 'var(--border)',
                    background:
                      active === index
                        ? 'color-mix(in oklch, var(--primary) 8%, var(--surface))'
                        : 'var(--surface)',
                    color: active === index ? 'var(--primary)' : 'var(--muted-foreground)',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Phone mockup — between selectors and copy on mobile */}
          <div className="order-2 flex justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="relative">
              <div
                className="absolute inset-8 rounded-full opacity-[0.06] blur-3xl"
                style={{ background: 'var(--primary)' }}
                aria-hidden="true"
              />
              <PhoneMockup float={false} size="large">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={persona.variant}
                    className="flex h-full flex-col"
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={reducedMotion ? undefined : { opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                    transition={personaTransition}
                  >
                    <StallioStoreUI variant={persona.variant} />
                  </motion.div>
                </AnimatePresence>
              </PhoneMockup>
            </div>
          </div>

          {/* Persona description — below phone on mobile */}
          <div className="order-3 lg:col-start-1 lg:row-start-2">
            <PersonaCopy persona={persona} reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoItFits
