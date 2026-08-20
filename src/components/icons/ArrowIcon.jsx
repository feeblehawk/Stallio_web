import { ArrowRight } from 'lucide-react'

/**
 * Shared arrow used in CTAs. Animates right on parent group hover.
 * size prop controls px size (default 14).
 */
const ArrowIcon = ({ size = 14, className = '' }) => (
  <ArrowRight
    size={size}
    className={`transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 ${className}`}
    aria-hidden="true"
  />
)

export default ArrowIcon