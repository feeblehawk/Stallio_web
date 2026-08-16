import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

// ─── Scroll-to-top on every route change ─────────────────────────────────────
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// ─── Page chunks ──────────────────────────────────────────────────────────────
const Signup         = lazy(() => import('./pages/auth/Signup'))
const Login          = lazy(() => import('./pages/auth/Login'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const Home           = lazy(() => import('./pages/home/Home'))
const About          = lazy(() => import('./pages/about/About'))
const Features       = lazy(() => import('./pages/features/Features'))
const HowItWorks     = lazy(() => import('./pages/howitworks/HowItWorks'))
const ComingSoon     = lazy(() => import('./pages/ComingSoon'))
const ArchitectureGuide = lazy(() => import('./pages/ArchitectureGuide'))

// Minimal fallback — invisible div keeps layout stable during chunk fetch
const PageFallback = () => (
  <div aria-hidden="true" style={{ minHeight: '100vh' }} />
)

const wrap = (Component) => (
  <Suspense fallback={<PageFallback />}>
    <Component />
  </Suspense>
)

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          {/* ── Auth routes — no Navbar or Footer ── */}
          <Route element={<AuthLayout />}>
            <Route path="signup"          element={wrap(Signup)} />
            <Route path="login"           element={wrap(Login)} />
            <Route path="forgot-password" element={wrap(ForgotPassword)} />
          </Route>

          {/* ── Main routes — with Navbar + Footer ── */}
          <Route path="/" element={<MainLayout />}>
            <Route index                    element={wrap(Home)} />
            <Route path="about"             element={wrap(About)} />
            <Route path="features"          element={wrap(Features)} />
            <Route path="how-it-works"      element={wrap(HowItWorks)} />
            <Route path="ArchitectureGuide" element={wrap(ArchitectureGuide)} />

            {/* Catch-all */}
            {[
              'pricing', 'careers', 'contact',
              'docs', 'blog', 'guides', 'help',
              'faq', 'community', 'status',
              'terms', 'privacy', 'legal', 'sitemap',
              '*',
            ].map((path) => (
              <Route key={path} path={path} element={wrap(ComingSoon)} />
            ))}
          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App