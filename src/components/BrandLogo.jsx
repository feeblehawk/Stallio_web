import { Link } from 'react-router-dom'

const BrandLogo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: {
      img: 'h-6',
      fontSize: '22px',
      wordmarkNudge: '5px',
    },
    md: {
      img: 'h-8',
      fontSize: '28px',
      wordmarkNudge: '7px',
    },
    lg: {
      img: 'h-10',
      fontSize: '36px',
      wordmarkNudge: '9px',
    },
  }

  const s = sizes[size] ?? sizes.md

  return (
    <Link
      to="/"
      aria-label="Stallio — Home"
      className={[
        'inline-flex items-center',
        'select-none rounded-lg',
        'leading-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        className,
      ].join(' ')}
    >
      <span className="flex items-center leading-none">
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          className={`${s.img} w-auto shrink-0 object-contain block`}
        />

        <span
          className="ml-2 shrink-0 text-foreground leading-none"
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: s.fontSize,
            lineHeight: 1,
            display: 'inline-block',
            transform: `translateY(${s.wordmarkNudge})`,
          }}
        >
          Stallio
        </span>
      </span>
    </Link>
  )
}

export default BrandLogo