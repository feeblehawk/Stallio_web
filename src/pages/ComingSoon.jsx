import { Link, useLocation } from 'react-router-dom'

const getPageName = (pathname) => {
  const map = {
    '/': 'Home',
    '/about': 'About',
    '/features': 'Features',
    '/pricing': 'Pricing',
    '/how-it-works': 'How It Works',
    '/careers': 'Careers',
    '/contact': 'Contact',
    '/blog': 'Blog',
    '/docs': 'Documentation',
    '/guides': 'Guides',
    '/help': 'Help Center',
    '/faq': 'FAQ',
    '/community': 'Community',
    '/status': 'Status',
    '/terms': 'Terms of Service',
    '/privacy': 'Privacy Policy',
    '/legal': 'Legal',
    '/sitemap': 'Sitemap',
    '/login': 'Login',
  }
  return map[pathname] ?? 'This page'
}

const ComingSoon = () => {
  const location = useLocation()
  const displayName = getPageName(location.pathname)
  const isHomeOrAbout = location.pathname === '/' || location.pathname === '/about'

  return (
    <div className="flex flex-1 w-full flex-col items-center justify-center bg-background px-4 py-32 text-center">
      {isHomeOrAbout ? (
        <>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Coming Soon
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-base text-muted-foreground">
            Stallio is launching soon. Great things are on the way.
          </p>
        </>
      ) : (
        <>
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary select-none">
            Coming Soon
          </span>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {displayName}
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-base text-muted-foreground">
            This page is under construction. Check back soon.
          </p>
          {location.pathname !== '/' && (
            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-primary/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Back to Home
            </Link>
          )}
        </>
      )}
    </div>
  )
}

export default ComingSoon
