import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShieldCheck, Zap, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { easePremium, staggerContainer, revealSoft, blurReveal } from '../../../utils/motionVariants'
import PrimaryCTA from '../../../components/PrimaryCTA'

/**
 * Unified Premium Final CTA — Modern Minimalist design with strict visual hierarchy.
 * Shared across Home, About, Features, and HowItWorks pages for complete consistency.
 */
const FinalCTA = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()
  const isVisible = reducedMotion || inView

  return (
    <section
      ref={sectionRef}
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      {/* Radial glow background — centered upward beam */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 65% at 50% 100%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 70%)',
        }}
      />

      {/* Top glowing edge line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, color-mix(in oklch, var(--primary) 50%, transparent) 50%, transparent 100%)',
        }}
      />

      {/* Subtle grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <motion.div
          variants={staggerContainer}
          initial={reducedMotion ? false : 'hidden'}
          animate={isVisible ? 'visible' : 'hidden'}
          className="flex flex-col items-center"
        >
          {/* Eyebrow Badge */}
          <motion.div variants={revealSoft}>
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
              style={{
                borderColor: 'var(--border)',
                background: 'color-mix(in oklch, var(--surface) 80%, transparent)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Sparkles size={13} className="text-primary" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Start Selling Today
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            variants={blurReveal}
            id="final-cta-heading"
            className="font-heading font-extrabold tracking-[-0.055em]"
            style={{
              fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)',
              lineHeight: 1.02,
              color: 'var(--foreground)',
            }}
          >
            Ready to turn your social link
            <br />
            <span style={{ color: 'var(--primary)' }}>into a real online store?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={revealSoft}
            className="mx-auto mt-5 max-w-xl text-base leading-7 sm:text-lg"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Spin up a store in 60 seconds. Share your link tonight. Wake up to real orders instead of messages lost in your DM request folder.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            variants={revealSoft}
            className="mt-8 flex flex-col w-full sm:w-auto justify-center gap-3.5 sm:flex-row sm:gap-4"
          >
            <PrimaryCTA size="lg" className="w-full sm:w-auto text-base shadow-lg shadow-black/5 py-3.5">
              Create Your Store
            </PrimaryCTA>
            <Link
              to="/features"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--surface)',
                color: 'var(--foreground)',
              }}
            >
              Explore Features
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Trust Badges Strip (Lucide Icons) */}
          <motion.div
            variants={revealSoft}
            className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs font-medium"
            style={{ color: 'var(--muted-foreground)' }}
          >
            <span className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-primary" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <Zap size={15} className="text-amber-500" />
              Live in under 5 minutes
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-500" />
              Free forever plan available
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FinalCTA