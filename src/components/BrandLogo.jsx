import { Link } from 'react-router-dom'

const BrandLogo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: { img: 'h-6',  s: 'text-[25px]'  },
    md: { img: 'h-9', s: 'text-[35px]' },
    lg: { img: 'h-13', s: 'text-[45px]' },
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
        className={`${s.img}  mb-4 leading-none text-foreground`}
      />


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