import { Link } from 'react-router-dom'
import { FaLinkedinIn, FaInstagram, FaXTwitter, FaYoutube, FaFacebookF } from 'react-icons/fa6'
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
  { name: 'LinkedIn', Icon: FaLinkedinIn },
  { name: 'Instagram', Icon: FaInstagram },
  { name: 'X', Icon: FaXTwitter },
  { name: 'YouTube', Icon: FaYoutube },
  { name: 'Facebook', Icon: FaFacebookF },
]

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="group relative inline-flex text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
  >
    {children}
    <span className="absolute -bottom-px left-0 h-px w-0 bg-primary transition-all duration-250 group-hover:w-full" />
  </Link>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto w-full border-t border-border bg-surface text-foreground" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 py-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="col-span-1 flex flex-col gap-5 sm:col-span-2 md:col-span-3 lg:col-span-1">
            <BrandLogo size="lg" />

            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your online shop, one link away. The simplest way for Instagram and WhatsApp sellers to launch a mobile storefront.
            </p>

            <PrimaryCTA size="md" className="w-fit" />
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <FooterLink to={link.path}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom utility bar */}
        <div className="flex flex-col gap-6 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Social icons */}
          <div className="flex items-center gap-3" aria-label="Social media links">
            {socialPlatforms.map(({ name, Icon }) => (
              <span
                key={name}
                role="img"
                aria-label={`${name} — coming soon`}
                title={`${name} — coming soon`}
                className="flex h-9 w-9 cursor-default items-center justify-center rounded-lg border border-border bg-background text-muted-foreground opacity-60"
              >
                <Icon size={16} aria-hidden="true" />
              </span>
            ))}
          </div>

          {/* Legal links */}
          <nav
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
            aria-label="Legal links"
          >
            {legalLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright + email */}
        <div className="flex flex-col gap-3 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Copyright © {currentYear} Stallio. All rights reserved.
          </p>
          <a
            href="mailto:contact@stattio.shop"
            className="text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
          >
            contact@stallio.shop
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer