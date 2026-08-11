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
        <motion.div variants={revealSoft}>
          <div
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5"
            style={{
              borderColor: css.border,
              background: 'color-mix(in oklch, var(--surface) 80%, transparent)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: css.primary }}
            />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: css.mutedFg }}
            >
              {eyebrow}
            </span>
          </div>
        </motion.div>
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
