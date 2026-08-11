import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'

/**
 * Pointer-driven tilt, clamped and spring-damped. Single implementation shared by
 * the hero composition and the workflow panel. Disabled for reduced motion and
 * for coarse pointers — nothing on the page depends on it.
 */
const TiltCard = ({ children, className = '', style, max = 6, perspective = 1200 }) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.4 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-max, max])
  const rotateX = useTransform(springY, [-0.5, 0.5], [max, -max])

  const handleMove = (event) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={className}
      style={{ perspective, ...style }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>{children}</motion.div>
    </div>
  )
}

export default TiltCard
