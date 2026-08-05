import { Link } from 'react-router-dom'

const BrandLogo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: { img: 'h-6',  s: 'text-[28px]', divider: 'h-7'  },
    md: { img: 'h-9', s: 'text-[38px]', divider: 'h-10' },
    lg: { img: 'h-13', s: 'text-[50px]', divider: 'h-14' },
  }

  const s = sizes[size] ?? sizes.md

  return (
    <Link
      to="/"
      aria-label="Stallio — Home"
      className={`group inline-flex items-center gap-3 select-none ${className}`}
    >
      {/* Logo icon */}
      <img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        className={`${s.img} leading-none text-foreground`}
      />

      {/* Divider */}
      <span className={`${s.divider} w-px bg-border`} />

      {/* Wordmark */}
      <span className="inline-flex items-baseline gap-1 leading-none">
        {/* Wordmark using the same Great Vibes styling for both pieces */}
        <span
          className={`${s.s} leading-none text-foreground`}
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Stallio
        </span>
      </span>
    </Link>
  )
}

export default BrandLogo