import { Link } from 'react-router-dom'
import { FaLinkedinIn, FaInstagram, FaXTwitter, FaYoutube, FaFacebookF } from 'react-icons/fa6'
import { Mail, ShieldCheck, Heart } from 'lucide-react'
import BrandLogo from './BrandLogo'
import PrimaryCTA from './PrimaryCTA'

const footerColumns = [
  {
    title: 'Product',
    links: [
      { name: 'Features', path: '/features' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'How It Works', path: '/how-it-works' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '/careers' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', path: '/docs' },
      { name: 'Guides', path: '/guides' },
      { name: 'Blog', path: '/blog' },
      { name: 'FAQ', path: '/faq' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Support', path: '/help' },
      { name: 'Status', path: '/status' },
    ],
  },
]

const legalLinks = [
  { name: 'Terms of Service', path: '/terms' },
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Legal', path: '/legal' },
  { name: 'Sitemap', path: '/sitemap' },
]

const socialPlatforms = [
  { name: 'LinkedIn', Icon: FaLinkedinIn, href: 'https://linkedin.com' },
  { name: 'Instagram', Icon: FaInstagram, href: 'https://instagram.com' },
  { name: 'X', Icon: FaXTwitter, href: 'https://x.com' },
  { name: 'YouTube', Icon: FaYoutube, href: 'https://youtube.com' },
  { name: 'Facebook', Icon: FaFacebookF, href: 'https://facebook.com' },
]

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="group relative inline-flex text-xs sm:text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm py-0.5"
    style={{ color: 'var(--muted-foreground)' }}
  >
    <span className="transition-colors group-hover:text-[color:var(--foreground)]">
      {children}
    </span>
    <span
      className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-200 group-hover:w-full"
      style={{ background: 'var(--primary)' }}
    />
  </Link>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="mt-auto w-full border-t border-b-0"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid — 2 columns on mobile, 5 columns on desktop */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-4 sm:gap-5 md:col-span-2 lg:col-span-1">
            <BrandLogo size="lg" />

            <p
              className="max-w-sm text-xs sm:text-sm leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Your online store, one link away. The simplest, most powerful way for social sellers on Instagram, WhatsApp & TikTok to build a mobile store.
            </p>

            <div className="pt-1">
              <PrimaryCTA size="md" className="w-full sm:w-fit py-2.5 text-xs sm:text-sm">
                Start Selling Free
              </PrimaryCTA>
            </div>
          </div>

          {/* Navigation Links — 2-column grid on mobile for compact visual hierarchy */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-4 lg:col-span-4">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3.5">
                <h3
                  className="font-heading text-xs font-bold uppercase tracking-widest"
                  style={{ color: 'var(--foreground)' }}
                >
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <FooterLink to={link.path}>{link.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Utility Bar: Social Icons & Legal Links */}
        <div
          className="flex flex-col gap-5 border-t py-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: 'var(--border)' }}
        >
          {/* Social Icons Strip */}
          <div className="flex items-center gap-2" aria-label="Social media links">
            {socialPlatforms.map(({ name, Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Stallio on ${name}`}
                title={name}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border transition-all duration-200 hover:scale-105 hover:border-[color:var(--primary)] hover:text-[color:var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--background)',
                  color: 'var(--muted-foreground)',
                }}
              >
                <Icon size={14} aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Legal Navigation Links */}
          <nav
            className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2"
            aria-label="Legal links"
          >
            {legalLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-xs transition-colors duration-150 hover:text-[color:var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Copyright & Contact Email Strip */}
        <div
          className="flex flex-col gap-2.5 border-t py-5 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Copyright © {currentYear} Stallio. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
            <a
              href="mailto:contact@stallio.shop"
              className="flex items-center gap-1.5 transition-colors hover:text-[color:var(--foreground)]"
            >
              <Mail size={12} className="text-primary" />
              <span>contact@stallio.shop</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer