import { motion } from 'framer-motion'
import { easePremium } from '../utils/motionVariants'

/**
 * A single stat display: large number + small label.
 * Used in WhyStallio (home) and StatsStrip (about).
 *
 * Props:
 *   num          — string, e.g. "500+"
 *   label        — string, e.g. "Sellers"
 *   delay        — number, animation delay in seconds
 *   isVisible    — boolean, drives the animate state
 *   reducedMotion — boolean, from useReducedMotion()
 */
const Stat = ({ num, label, delay = 0, isVisible, reducedMotion }) => (
  <motion.div
    className="flex flex-col gap-0.5"
    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
    animate={isVisible ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.65, ease: easePremium, delay }}
  >
    <span
      className="font-heading font-extrabold leading-none tracking-[-0.04em]"
      style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--primary)' }}
    >
      {num}
    </span>
    <span
      className="text-[11px] font-semibold uppercase tracking-[0.14em]"
      style={{ color: 'var(--muted-foreground)' }}
    >
      {label}
    </span>
  </motion.div>
)

export default Stat