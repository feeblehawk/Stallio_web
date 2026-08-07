import { motion } from 'framer-motion'
import { Zap, Shield, Users, Smartphone } from 'lucide-react'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'
import { revealSoft, staggerContainer } from '../../utils/motionVariants'

const VALUES = [
  {
    Icon: Zap,
    title: 'Speed over ceremony',
    desc: 'If it takes more than a minute to set up, we rethink it.',
  },
  {
    Icon: Shield,
    title: 'Sellers keep control',
    desc: 'Your payments, your buyers, your data. We stay out of the middle.',
  },
  {
    Icon: Users,
    title: 'Built for this market',
    desc: 'Designed for how social commerce actually works in Pakistan.',
  },
  {
    Icon: Smartphone,
    title: 'Mobile first, always',
    desc: 'Your buyers are on their phones. So is every pixel we write.',
  },
]

const Values = () => {
  const [ref, isInView] = useInViewOnce()
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <section
      aria-labelledby="values-heading"
      className="border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">

        {/* Header */}
        <div className="mb-14 max-w-xl">
          <span
            className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: 'var(--primary)' }}
          >
            What we believe
          </span>
          <h2
            id="values-heading"
            className="font-heading font-extrabold tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
              color: 'var(--foreground)',
            }}
          >
            Our values
          </h2>
        </div>

        {/* 4-card grid */}
        <motion.div
          ref={ref}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          {...motionProps}
        >
          {VALUES.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={revealSoft}
              className="group flex flex-col gap-5 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--card)',
              }}
            >
              {/* Icon pill */}
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300"
                style={{
                  background: 'color-mix(in oklch, var(--primary) 10%, var(--surface))',
                  color: 'var(--primary)',
                }}
              >
                <Icon size={18} aria-hidden="true" />
              </span>

              <div>
                <h3
                  className="font-heading text-[15px] font-semibold leading-snug"
                  style={{ color: 'var(--foreground)' }}
                >
                  {title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {desc}
                </p>
              </div>

              {/* Subtle bottom accent line on hover */}
              <div
                className="mt-auto h-px w-0 transition-all duration-500 group-hover:w-full rounded-full"
                style={{ background: 'var(--primary)', opacity: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default Values