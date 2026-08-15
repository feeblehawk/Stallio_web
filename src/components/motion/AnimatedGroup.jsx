import { motion } from 'framer-motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'
import { easePremium } from '../../utils/motionVariants'

/**
 * Animated Group (Motion Primitives pattern) — staggered entrance for a list of
 * children. One shared implementation for every grid/list on the page.
 */
const AnimatedGroup = ({
  children,
  className = '',
  style,
  stagger = 0.08,
  delay = 0.05,
  distance = 18,
  itemClassName = '',
}) => {
  const [ref, inView] = useInViewOnce()
  const reduced = useReducedMotion()
  const items = Array.isArray(children) ? children.flat() : [children]

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  const item = {
    hidden: { opacity: 0, y: distance, filter: 'blur(3px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: easePremium },
    },
  }

  if (reduced) {
    return (
      <div ref={ref} className={className} style={style}>
        {items.map((child, i) => (
          <div key={i} className={itemClassName}>
            {child}
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {items.map((child, i) => (
        <motion.div key={i} variants={item} className={itemClassName}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default AnimatedGroup
