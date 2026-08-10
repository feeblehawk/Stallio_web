import { useState, useEffect, useCallback } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import BrandLogo from './BrandLogo'
import PrimaryCTA from './PrimaryCTA'
import ThemeToggle from './ThemeToggle'
import useReducedMotion from '../hooks/useReducedMotion'

// ─── Scroll threshold ────────────────────────────────────────────────────────
const FLOAT_THRESHOLD = 24   // px — below this, navbar is flush with page

// ─── Nav links ───────────────────────────────────────────────────────────────
const navLinks = [
  { name: 'Home',         path: '/' },
  { name: 'Features',     path: '/features' },
  { name: 'Pricing',      path: '/pricing' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'About',        path: '/about' },
]

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen,   setIsOpen]   = useState(false)
  const [floating, setFloating] = useState(false)
  const reducedMotion = useReducedMotion()

  // ── Scroll handler — only tracks floating state, never hides ──
  const handleScroll = useCallback(() => {
    setFloating(window.scrollY > FLOAT_THRESHOLD)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const closeMenu  = useCallback(() => setIsOpen(false), [])
  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), [])

  // ── Animation values ──
  const pillTransition = reducedMotion ? 'none' : [
    'max-width 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
    'border-radius 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
    'margin 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
    'background-color 0.28s ease',
    'border-color 0.28s ease',
    'box-shadow 0.28s ease',
  ].join(', ')

  return (
    <>
      {/*
        STICKY ARCHITECTURE
        ─────────────────────────────────────────────────────────────────────
        • <header> is position:sticky — NO transform on this element directly.
          transform on a sticky element breaks stickiness in all browsers.
        • The inner "pill" div receives all visual transforms (scale, translate,
          border-radius, backdrop-blur) — never the sticky ancestor.
        • The visTransform/visOpacity slide-in on hide/show goes on a wrapper
          div INSIDE <header>, not on <header> itself.
      */}
      <header className="sticky top-0 z-50 w-full">
          {/* Floating pill wrapper */}
          <div
            className={[
              'mx-auto w-full',
              floating
                ? 'border border-border bg-card/95 backdrop-blur-2xl'
                : 'border-b border-border bg-card',
            ].join(' ')}
            style={{
              transition: pillTransition,
              ...(floating
                ? {
                    maxWidth: '1180px',
                    borderRadius: '18px',
                    margin: '10px auto 0',
                    boxShadow: 'var(--navbar-glow)',
                  }
                : { maxWidth: '100%', borderRadius: '0px', margin: '0 auto' }),
            }}
          >
            {/* ── Nav row ── */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center gap-4 lg:gap-8">

                <BrandLogo />

                {/* Desktop nav links — centered */}
                <nav
                  className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
                  aria-label="Main navigation"
                >
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) => [
                        'relative rounded-xl px-3.5 py-2 text-sm font-medium select-none',
                        'transition-colors duration-150',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                        isActive
                          ? 'bg-primary/[0.09] text-primary font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/60',
                      ].join(' ')}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </nav>

                {/* Desktop right actions */}
                <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
                  <ThemeToggle />
                  <div className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
                  <Link
                    to="/login"
                    className={[
                      'rounded-xl px-3.5 py-2 text-sm font-medium',
                      'text-muted-foreground transition-colors duration-150',
                      'hover:text-foreground hover:bg-accent/60',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                    ].join(' ')}
                  >
                    Log in
                  </Link>
                  <PrimaryCTA size="sm" />
                </div>

                {/* Mobile right controls */}
                <div className="ml-auto flex shrink-0 items-center gap-2 lg:hidden">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className={[
                      'flex h-9 w-9 cursor-pointer items-center justify-center',
                      'rounded-xl border border-border bg-surface',
                      'text-foreground transition-colors duration-150',
                      'hover:bg-muted hover:border-border/80',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                    ].join(' ')}
                    aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={isOpen}
                    aria-controls="mobile-nav-menu"
                  >
                    <span
                      style={{
                        transition: reducedMotion ? 'none' : 'transform 0.22s cubic-bezier(0.16,1,0.3,1), opacity 0.18s ease',
                        transform: isOpen ? 'rotate(90deg) scale(1)' : 'rotate(0deg) scale(1)',
                      }}
                      className="flex items-center justify-center"
                    >
                      {isOpen
                        ? <X size={17} strokeWidth={2.2} aria-hidden="true" />
                        : <Menu size={17} strokeWidth={2.2} aria-hidden="true" />
                      }
                    </span>
                  </button>
                </div>

              </div>
            </div>

            {/* ── Mobile drawer — clipped inside pill border-radius ── */}
            <div
              id="mobile-nav-menu"
              role="navigation"
              aria-label="Mobile navigation"
              aria-hidden={!isOpen}
              className="lg:hidden"
              style={{
                display: 'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: reducedMotion
                  ? 'none'
                  : 'grid-template-rows 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/*
                Grid row trick: inner div overflow-hidden lets grid-template-rows
                animate from 0fr → 1fr for a smooth height transition without
                max-height hacks. No JS height measurement needed.
              */}
              <div className="overflow-hidden">
                <div
                  className="border-t border-border/50"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
                    transition: reducedMotion
                      ? 'none'
                      : 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  {/* Nav links */}
                  <nav className="space-y-0.5 px-3 pt-2.5 pb-1" aria-label="Mobile navigation links">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.path === '/'}
                        onClick={closeMenu}
                        className={({ isActive }) => [
                          'flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium',
                          'transition-colors duration-150',
                          isActive
                            ? 'bg-primary/[0.09] font-semibold text-primary'
                            : 'text-foreground hover:bg-accent/60',
                        ].join(' ')}
                      >
                        {link.name}
                      </NavLink>
                    ))}
                  </nav>

                  {/* Mobile CTA strip */}
                  <div className="flex flex-col gap-2 border-t border-border/50 px-3 pt-3 pb-4 mt-1">
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className={[
                        'flex w-full items-center justify-center rounded-xl',
                        'px-4 py-2.5 text-sm font-medium',
                        'text-muted-foreground transition-colors duration-150',
                        'hover:text-foreground hover:bg-accent/60',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                      ].join(' ')}
                    >
                      Log in
                    </Link>
                    <PrimaryCTA size="full" onClick={closeMenu} />
                  </div>
                </div>
              </div>
            </div>

          </div>{/* /pill */}

          {/* Spacer so page content isn't flush against the floating pill */}
          {floating && <div className="h-2" aria-hidden="true" />}

      </header>

      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 z-40 lg:hidden"
        style={{
          background: 'color-mix(in oklch, var(--foreground) 14%, transparent)',
          backdropFilter: isOpen ? 'blur(2px)' : 'blur(0px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: reducedMotion
            ? 'none'
            : 'opacity 0.28s ease, backdrop-filter 0.28s ease',
        }}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  )
}

export default Navbar