import { useState, useEffect, useCallback, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import BrandLogo from './BrandLogo'
import PrimaryCTA from './PrimaryCTA'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import useReducedMotion from '../hooks/useReducedMotion'

// ─── Scroll threshold ────────────────────────────────────────────────────────
const FLOAT_THRESHOLD = 24   // px — below this, navbar is flush with page

// ─── Easing curves ──────────────────────────────────────────────────────────
const SPRING   = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_OUT = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = () => {
  const { t } = useTranslation('common')
  const [isOpen,   setIsOpen]   = useState(false)
  const [floating, setFloating] = useState(false)
  const hasScrolled    = useRef(false)
  const reducedMotion  = useReducedMotion()

  // ── Nav links — driven by translations ──────────────────────────────────
  const navLinks = [
    { nameKey: 'nav.home',       path: '/' },
    { nameKey: 'nav.features',   path: '/features' },
    { nameKey: 'nav.pricing',    path: '/pricing' },
    { nameKey: 'nav.howItWorks', path: '/how-it-works' },
    { nameKey: 'nav.about',      path: '/about' },
  ]

  // ── Scroll handler ────────────────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    const shouldFloat = window.scrollY > FLOAT_THRESHOLD
    if (shouldFloat !== floating) {
      hasScrolled.current = true
      setFloating(shouldFloat)
    }
  }, [floating])

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

  // ── Duration constants ────────────────────────────────────────────────────
  const SHAPE_DURATION = '0.58s'
  const COLOR_DURATION = '0.46s'
  const BLUR_DURATION  = '0.62s'

  const SHAPE_DELAY_IN = '0s'
  const COLOR_DELAY_IN = '0.08s'
  const BLUR_DELAY_IN  = '0.12s'

  const sd = floating ? SHAPE_DELAY_IN : '0s'
  const cd = floating ? COLOR_DELAY_IN  : '0s'
  const bd = floating ? BLUR_DELAY_IN   : '0s'

  // ── Pill transition ───────────────────────────────────────────────────────
  const pillTransition = reducedMotion ? 'none' : [
    `width            ${SHAPE_DURATION} ${SPRING} ${sd}`,
    `max-width        ${SHAPE_DURATION} ${SPRING} ${sd}`,
    `border-radius    ${SHAPE_DURATION} ${SPRING} ${sd}`,
    `margin           ${SHAPE_DURATION} ${SPRING} ${sd}`,
    `transform        ${SHAPE_DURATION} ${SPRING} ${sd}`,
    `background-color ${COLOR_DURATION} ${EASE_OUT} ${cd}`,
    `border-color     ${COLOR_DURATION} ${EASE_OUT} ${cd}`,
    `box-shadow       ${COLOR_DURATION} ${EASE_OUT} ${cd}`,
    `backdrop-filter  ${BLUR_DURATION} ${EASE_OUT} ${bd}`,
  ].join(', ')

  // ── Floating pill styles ──────────────────────────────────────────────────
  const pillStyles = floating
    ? {
        width:        'calc(100% - 16px)',
        maxWidth:     '1180px',
        borderRadius: '18px',
        margin:       '10px auto 0',
        boxShadow:    'var(--navbar-glow, 0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04))',
      }
    : {
        width:        '100%',
        maxWidth:     '100%',
        borderRadius: '0px',
        margin:       '0 auto',
        boxShadow:    'none',
      }

  const contentScale      = floating ? 'scale(0.994)' : 'scale(1)'
  const contentTransition = reducedMotion
    ? 'none'
    : `transform ${SHAPE_DURATION} ${SPRING} ${sd}`

  return (
    <>
      {/*
        STICKY ARCHITECTURE
        • <header> is position:sticky — NO transform/filter on it directly.
        • All visual transitions live on the inner pill <div>.
        • Content gets a whisper-subtle scale via an inner wrapper.
      */}
      <header className="sticky top-0 z-50 w-full">

        {/* ── Floating pill ── */}
        <div
          className={[
            'mx-auto w-full',
            floating
              ? 'border border-border bg-card/95 backdrop-blur-2xl'
              : 'border-b border-border bg-card backdrop-blur-none',
          ].join(' ')}
          style={{
            transition: pillTransition,
            willChange:
              'width, max-width, border-radius, margin, transform, box-shadow, backdrop-filter',
            ...pillStyles,
          }}
        >
          {/* ── Nav row ── */}
          <div
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            style={{
              transform:       contentScale,
              transition:      contentTransition,
              transformOrigin: 'top center',
            }}
          >
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
                    {t(link.nameKey)}
                  </NavLink>
                ))}
              </nav>

              {/* Right actions group — unified container with exactly one ThemeToggle */}
              <div className="ms-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
                {/* Desktop-only: Language switcher */}
                <div className="hidden lg:flex items-center gap-1.5">
                  <LanguageSwitcher variant="desktop" />
                  <div className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
                </div>

                {/* Single Theme Toggle for all viewports */}
                <ThemeToggle />

                {/* Desktop-only: Login and CTA */}
                <div className="hidden lg:flex items-center gap-1.5">
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
                    {t('nav.login')}
                  </Link>
                  <PrimaryCTA size="sm" />
                </div>

                {/* Mobile-only: Hamburger toggle button */}
                <button
                  type="button"
                  onClick={toggleMenu}
                  className={[
                    'flex lg:hidden h-9 w-9 cursor-pointer items-center justify-center',
                    'rounded-xl border border-border bg-surface',
                    'text-foreground transition-colors duration-150',
                    'hover:bg-muted hover:border-border/80',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  ].join(' ')}
                  aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={isOpen}
                  aria-controls="mobile-nav-menu"
                >
                  {/* Icon swap animation */}
                  <span className="relative flex h-[17px] w-[17px] items-center justify-center">
                    <span
                      aria-hidden="true"
                      style={{
                        position:   'absolute',
                        transition: reducedMotion
                          ? 'none'
                          : `opacity 0.18s ${EASE_OUT}, transform 0.22s ${SPRING}`,
                        opacity:   isOpen ? 0 : 1,
                        transform: isOpen ? 'rotate(-90deg) scale(0.6)' : 'rotate(0deg) scale(1)',
                      }}
                    >
                      <Menu size={17} strokeWidth={2.2} />
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        position:   'absolute',
                        transition: reducedMotion
                          ? 'none'
                          : `opacity 0.18s ${EASE_OUT}, transform 0.22s ${SPRING}`,
                        opacity:   isOpen ? 1 : 0,
                        transform: isOpen ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.6)',
                      }}
                    >
                      <X size={17} strokeWidth={2.2} />
                    </span>
                  </span>
                </button>
              </div>

            </div>
          </div>{/* /content wrapper */}

          {/* ── Mobile drawer ── */}
          <div
            id="mobile-nav-menu"
            role="navigation"
            aria-label="Mobile navigation"
            aria-hidden={!isOpen}
            className="lg:hidden"
            style={{
              display:         'grid',
              gridTemplateRows: isOpen ? '1fr' : '0fr',
              transition: reducedMotion
                ? 'none'
                : `grid-template-rows 0.32s ${SPRING}`,
            }}
          >
            <div className="overflow-hidden">
              <div
                className="border-t border-border/50"
                style={{
                  opacity:    isOpen ? 1 : 0,
                  transform:  isOpen ? 'translateY(0)' : 'translateY(-10px)',
                  transition: reducedMotion
                    ? 'none'
                    : `opacity 0.22s ${EASE_OUT} ${isOpen ? '0.06s' : '0s'},
                       transform 0.3s ${SPRING} ${isOpen ? '0.04s' : '0s'}`,
                }}
              >
                {/* Nav links */}
                <nav className="space-y-0.5 px-3 pt-2.5 pb-1" aria-label="Mobile navigation links">
                  {navLinks.map((link, i) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end={link.path === '/'}
                      onClick={closeMenu}
                      style={reducedMotion ? {} : {
                        opacity:   isOpen ? 1 : 0,
                        transform: isOpen ? 'translateX(0)' : 'translateX(-6px)',
                        transition: `opacity 0.2s ${EASE_OUT} ${isOpen ? 0.08 + i * 0.04 : 0}s,
                                     transform 0.26s ${SPRING} ${isOpen ? 0.06 + i * 0.04 : 0}s`,
                      }}
                      className={({ isActive }) => [
                        'flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium',
                        'transition-colors duration-150',
                        isActive
                          ? 'bg-primary/[0.09] font-semibold text-primary'
                          : 'text-foreground hover:bg-accent/60',
                      ].join(' ')}
                    >
                      {t(link.nameKey)}
                    </NavLink>
                  ))}
                </nav>

                {/* Mobile CTA strip */}
                <div
                  className="flex flex-col gap-2 border-t border-border/50 px-3 pt-3 pb-4 mt-1"
                  style={reducedMotion ? {} : {
                    opacity:   isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(6px)',
                    transition: `opacity 0.2s ${EASE_OUT} ${isOpen ? `${0.08 + navLinks.length * 0.04}s` : '0s'},
                                 transform 0.26s ${SPRING} ${isOpen ? `${0.06 + navLinks.length * 0.04}s` : '0s'}`,
                  }}
                >
                  {/* Language switcher — full-width row in mobile drawer */}
                  <LanguageSwitcher variant="mobile" />

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
                    {t('nav.login')}
                  </Link>
                  <PrimaryCTA size="full" onClick={closeMenu} />
                </div>
              </div>
            </div>
          </div>

        </div>{/* /pill */}

        {/* Spacer */}
        <div
          aria-hidden="true"
          style={{
            height:     floating ? '8px' : '0px',
            transition: reducedMotion
              ? 'none'
              : `height ${SHAPE_DURATION} ${SPRING} ${sd}`,
            overflow: 'hidden',
          }}
        />

      </header>

      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 z-40 lg:hidden"
        style={{
          background:     'color-mix(in oklch, var(--foreground) 14%, transparent)',
          backdropFilter: isOpen ? 'blur(2px)' : 'blur(0px)',
          opacity:        isOpen ? 1 : 0,
          pointerEvents:  isOpen ? 'auto' : 'none',
          transition:     reducedMotion
            ? 'none'
            : `opacity 0.28s ${EASE_OUT}, backdrop-filter 0.28s ${EASE_OUT}`,
        }}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  )
}

export default Navbar