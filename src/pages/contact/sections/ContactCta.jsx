import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { blurReveal, revealSoft, staggerContainer } from '../../../utils/motionVariants'
import { css } from '../../../utils/cssTokens'
import PrimaryCTA from '../../../components/PrimaryCTA'

const ContactCta = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const isVisible = reduced || inView

  return (
    <section
      ref={sectionRef}
      aria-labelledby="contact-cta-heading"
      className="relative isolate overflow-hidden border-t"
      style={{ borderColor: css.border, background: css.bg }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 85% 70% at 50% 105%, color-mix(in oklch, var(--primary) 11%, transparent), transparent 72%)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.028]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-px"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, color-mix(in oklch, var(--primary) 55%, transparent) 50%, transparent 100%)',
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <motion.div
          variants={staggerContainer}
          initial={reduced ? false : 'hidden'}
          animate={isVisible ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={revealSoft}>
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-sm"
              style={{
                borderColor: css.border,
                background: 'color-mix(in oklch, var(--surface) 82%, transparent)',
              }}
            >
              <Sparkles size={13} style={{ color: css.primary }} aria-hidden="true" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: css.mutedFg }}
              >
                Still have questions?
              </span>
            </div>
          </motion.div>

          <motion.h2
            variants={blurReveal}
            id="contact-cta-heading"
            className="font-heading font-extrabold tracking-[-0.055em]"
            style={{
              fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)',
              lineHeight: 1.02,
              color: css.fg,
            }}
          >
            Let&apos;s figure it out
            <br />
            <span style={{ color: css.primary }}>together.</span>
          </motion.h2>

          <motion.p
            variants={revealSoft}
            className="mx-auto mt-5 max-w-[500px] text-base leading-7 sm:text-[17px]"
            style={{ color: css.mutedFg }}
          >
            Whether you&apos;re exploring Stallio, setting up your store, or looking for the right way to grow,
            we&apos;re here to help.
          </motion.p>

          <motion.div
            variants={revealSoft}
            className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row sm:gap-4"
          >
            <PrimaryCTA
              to="/signup"
              size="lg"
              className="w-full py-3.5 text-[15px] font-bold sm:w-auto"
            >
              Get Started
            </PrimaryCTA>

            <Link
              to="/features"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
              style={{
                borderColor: css.border,
                background: css.surface,
                color: css.fg,
              }}
            >
              Explore Stallio
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          <motion.div
            variants={revealSoft}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: css.mutedFg }}>
              <MessageCircle size={14} style={{ color: css.primary }} aria-hidden="true" />
              Real support, real answers
            </span>
            <span className="hidden h-3 w-px sm:block" style={{ background: css.border }} aria-hidden="true" />
            <span className="text-xs font-medium" style={{ color: css.mutedFg }}>
              Replies within 24 hours
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactCta
