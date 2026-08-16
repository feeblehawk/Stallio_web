import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'
import { blurReveal, revealSoft, staggerContainer } from '../utils/motionVariants'
import { css } from '../utils/cssTokens'

/**
 * SectionHeading — reusable heading block with eyebrow badge, title, and
 * optional subtitle. Used across all how-it-works sections (workflow, lifecycle,
 * FAQ). Centered by default, text-left variant available via `align` prop.
 */
const SectionHeading = ({ id, eyebrow, title, subtitle, align = 'center' }) => {
  const reduced = useReducedMotion()
  const motionProps = reduced
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: 'visible' }

  const textAlign = align === 'center' ? 'text-center' : 'text-left'

  return (
    <motion.div
      className={`flex flex-col ${align === 'center' ? 'items-center' : 'items-start'} ${textAlign}`}
      variants={staggerContainer}
      {...motionProps}
    >
      {eyebrow && (
        <motion.span
          variants={revealSoft}
          className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: css.primary }}
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        id={id}
        variants={blurReveal}
        className="font-heading font-extrabold tracking-[-0.04em]"
        style={{
          fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
          lineHeight: 1.06,
          color: css.fg,
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={revealSoft}
          className="mt-4 max-w-xl text-base leading-7 sm:text-[17px]"
          style={{ color: css.mutedFg }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionHeading