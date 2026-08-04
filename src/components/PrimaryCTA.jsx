import { Link } from 'react-router-dom'

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    stroke="currentColor"
    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
)

const baseClasses =
  'group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-px active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
  full: 'w-full px-4 py-3 text-sm',
}

const PrimaryCTA = ({ to = '/features', size = 'sm', className = '', onClick, children = 'Start for Free', ...props }) => {
  const componentClassName = `${baseClasses} ${sizeClasses[size] ?? sizeClasses.sm} ${className}`

  if (!to) {
    return (
      <button type="button" onClick={onClick} className={componentClassName} {...props}>
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]"
          aria-hidden="true"
        />
        {children}
        <ArrowIcon />
      </button>
    )
  }

  return (
    <Link to={to} onClick={onClick} className={componentClassName} {...props}>
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]"
        aria-hidden="true"
      />
      {children}
      <ArrowIcon />
    </Link>
  )
}

export default PrimaryCTA
