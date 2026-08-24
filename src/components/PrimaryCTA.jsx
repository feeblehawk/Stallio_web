import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ArrowIcon from './icons/ArrowIcon'

const baseClasses =
  'group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-px active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
  full: 'w-full px-4 py-3 text-sm',
}

const PrimaryCTA = ({ to = '/signup', size = 'sm', className = '', onClick, children, ...props }) => {
  const { t } = useTranslation('common')
  const label = children ?? t('nav.signup')
  const componentClassName = `${baseClasses} ${sizeClasses[size] ?? sizeClasses.sm} ${className}`

  if (!to) {
    return (
      <button type="button" onClick={onClick} className={componentClassName} {...props}>
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]"
          aria-hidden="true"
        />
        {label}
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
      {label}
      <ArrowIcon />
    </Link>
  )
}

export default PrimaryCTA