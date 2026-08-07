import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import BrandLogo from './BrandLogo'
import PrimaryCTA from './PrimaryCTA'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'About', path: '/about' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      // Always show at the very top
      if (y < 12) {
        setVisible(true)
      } else if (y > lastY.current + 6) {
        // Scrolling down — hide
        setVisible(false)
        setIsOpen(false)
      } else if (lastY.current - y > 4) {
        // Scrolling up — show
        setVisible(true)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-border bg-surface/90 shadow-sm shadow-foreground/5 backdrop-blur-xl'
            : 'border-b border-transparent bg-background/95'
        }`}
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[68px] items-center gap-8 lg:gap-10">

            {/* Brand */}
            <BrandLogo />

            {/* Desktop nav — left-aligned immediately after brand (show on lg+) */}
            <nav
              className="hidden flex-1 items-center gap-1 lg:flex"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                      isActive
                        ? 'font-semibold text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <span
                        className="absolute inset-x-3.5 bottom-1 h-px rounded-full bg-primary transition-all duration-300"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'center',
                        }}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop actions: Theme Toggle → Log in → Start for Free (show on lg+) */}
            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              <ThemeToggle />
              <Link
                to="/login"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Log in
              </Link>
              <PrimaryCTA />
            </div>

            {/* Mobile/tablet: Theme Toggle + Menu (visible below lg) */}
            <div className="ml-auto flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-all duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-menu"
              >
                {isOpen ? (
                  <X size={20} aria-hidden="true" />
                ) : (
                  <Menu size={20} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
          onClick={closeMenu}
          aria-hidden="true"
        />

      {/* Mobile drawer */}
      <div
        id="mobile-nav-menu"
        className="fixed inset-x-0 top-[68px] z-50 border-b border-border bg-surface shadow-xl transition-all duration-300 ease-in-out lg:hidden"
        style={{
          transform: isOpen && visible ? 'translateY(0)' : 'translateY(-8px)',
          opacity: isOpen && visible ? 1 : 0,
          visibility: isOpen && visible ? 'visible' : 'hidden',
          pointerEvents: isOpen && visible ? 'auto' : 'none',
        }}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <nav className="space-y-1 px-4 pt-4 pb-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-primary/10 font-semibold text-primary'
                    : 'text-foreground hover:bg-muted'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-2 flex flex-col gap-2.5 border-t border-border px-4 pt-4 pb-5">
          <Link
            to="/login"
            onClick={closeMenu}
            className="flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Log in
          </Link>
          <PrimaryCTA size="full" onClick={closeMenu} />
        </div>
      </div>
    </>
  )
}

export default Navbar