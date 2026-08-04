import { Link } from 'react-router-dom'

const BrandLogo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: { img: 'h-7',  s: 'text-[28px]', divider: 'h-7'  },
    md: { img: 'h-10', s: 'text-[38px]', divider: 'h-10' },
    lg: { img: 'h-14', s: 'text-[50px]', divider: 'h-14' },
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
        className={`${s.img} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
      />

      {/* Divider */}
      <span className={`${s.divider} w-px bg-border`} />

      {/* Wordmark */}
      <span className="inline-flex items-baseline gap-1 leading-none">
        {/* Big S */}
        <span
          className={`${s.s} font-black italic leading-none text-foreground`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          S
        </span>

        {/* TALLIO */}
        <span
          className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-foreground/60 mb-[0.1em]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          TALLIO
        </span>
      </span>
    </Link>
  )
}

export default BrandLogo