import { useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Returns [ref, isInView].
 * Triggers once when the element enters the viewport (never re-fires on scroll back).
 * margin: '-80px' means the element must be 80px inside the viewport before firing.
 */
export const useInViewOnce = (options = {}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px', ...options })
  return [ref, isInView]
}
