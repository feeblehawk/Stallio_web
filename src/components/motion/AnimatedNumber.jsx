import { useEffect, useRef, useState } from 'react'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'

/**
 * AnimatedNumber — spring-animated counter that counts from 0 to `value`
 * when it scrolls into view. Uses requestAnimationFrame for buttery 60fps
 * performance. Falls back to static value under reduced motion.
 *
 * Props:
 *   value    — number, the target value to count to
 *   format   — (n: number) => string, formats the displayed number
 *   duration — number, animation duration in ms (default: 1600)
 */
const AnimatedNumber = ({ value, format = (n) => String(n), duration = 1600 }) => {
  const [display, setDisplay] = useState(0)
  const reduced = useReducedMotion()
  const [ref, inView] = useInViewOnce({ margin: '-60px' })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current || reduced) return
    hasAnimated.current = true

    const start = performance.now()
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, duration, reduced])

  return <span ref={ref}>{format(reduced ? value : display)}</span>
}

export default AnimatedNumber
