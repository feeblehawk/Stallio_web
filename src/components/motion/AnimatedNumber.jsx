import { useEffect, useRef, useState } from 'react'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'

/**
 * AnimatedNumber — spring-animated counter that counts to `value` when it
 * enters the viewport, and re-animates smoothly from its current displayed
 * number whenever `value` changes (e.g. currency switch).
 *
 * Props:
 *   value    — number, the target value to animate to
 *   format   — (n: number) => string, formats the displayed number
 *   duration — number, animation duration in ms (default: 900)
 */
const AnimatedNumber = ({ value, format = (n) => String(n), duration = 900 }) => {
  const [display, setDisplay]   = useState(value)
  const reduced                 = useReducedMotion()
  const [ref, inView]           = useInViewOnce({ margin: '-60px' })
  const rafRef                  = useRef(null)
  const fromRef                 = useRef(value)

  useEffect(() => {
    // Don't animate until the element is visible
    if (!inView || reduced) {
      setDisplay(value)
      fromRef.current = value
      return
    }

    // Cancel any in-progress animation
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const from  = fromRef.current
    const to    = value
    const start = performance.now()

    const tick = (now) => {
      const elapsed  = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3)
      const current  = Math.round(from + (to - from) * eased)
      setDisplay(current)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [inView, value, duration, reduced])

  return <span ref={ref}>{format(reduced ? value : display)}</span>
}

export default AnimatedNumber
