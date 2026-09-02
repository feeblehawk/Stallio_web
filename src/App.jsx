import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { StoreProvider } from './contexts/StoreContext'
import { ToastProvider } from './components/ui'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'

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
const VerifyEmail     = lazy(() => import('./pages/auth/VerifyEmail'))
const Home           = lazy(() => import('./pages/home/Home'))
const About          = lazy(() => import('./pages/about/About'))
const Features       = lazy(() => import('./pages/features/Features'))
const HowItWorks     = lazy(() => import('./pages/howitworks/HowItWorks'))
const Pricing        = lazy(() => import('./pages/pricing/Pricing'))
const Contact       = lazy(() => import('./pages/contact/Contact'))
const RefundPolicy  = lazy(() => import('./pages/legal/RefundPolicy'))
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'))
const Terms         = lazy(() => import('./pages/legal/Terms'))
const ComingSoon     = lazy(() => import('./pages/ComingSoon'))
const DashboardHome = lazy(() => import('./pages/MainApp/DashboardHome'))
// const Products      = lazy(() => import('./pages/MainApp/Products'))
// const Orders        = lazy(() => import('./pages/MainApp/Orders'))
// const Messages      = lazy(() => import('./pages/MainApp/Messages'))
// const Customers     = lazy(() => import('./pages/MainApp/Customers'))
// const Analytics     = lazy(() => import('./pages/MainApp/Analytics'))
// const Categories    = lazy(() => import('./pages/MainApp/Categories'))
// const Discounts     = lazy(() => import('./pages/MainApp/Discounts'))
// const Settings      = lazy(() => import('./pages/MainApp/Settings'))

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
      <StoreProvider>
        <ToastProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>

          {/* ── Auth routes — no Navbar or Footer ── */}
          <Route element={<AuthLayout />}>
            <Route path="signup"            element={wrap(Signup)} />
            <Route path="login"             element={wrap(Login)} />
            <Route path="forgot-password"   element={wrap(ForgotPassword)} />
            <Route path="verify-email"      element={wrap(VerifyEmail)} />
          </Route>

         <Route path="/app" element={<DashboardLayout />}>
            <Route index                    element={wrap(DashboardHome)} />
            {/* <Route path="orders"            element={wrap(Orders)} />
            <Route path="customers"         element={wrap(Customers)} />
            <Route path="messages"          element={wrap(Messages)} />
            <Route path="products"          element={wrap(Products)} />
            <Route path="categories"        element={wrap(Categories)} />
            <Route path="analytics"         element={wrap(Analytics)} />
            <Route path="discounts"         element={wrap(Discounts)} />
            <Route path="settings"          element={wrap(Settings)} /> */}
          </Route>
      
          {/* ── Main routes — with Navbar + Footer ── */}
          <Route path="/" element={<MainLayout />}>
            <Route index                    element={wrap(Home)} />
            <Route path="about"             element={wrap(About)} />
            <Route path="features"          element={wrap(Features)} />
            <Route path="how-it-works"      element={wrap(HowItWorks)} />
            <Route path="pricing"           element={wrap(Pricing)} />
            <Route path="contact"           element={wrap(Contact)} />   
            <Route path="refund"            element={wrap(RefundPolicy)} /> 
            <Route path="privacy"           element={wrap(PrivacyPolicy)} />
            <Route path="terms"             element={wrap(Terms)} />

          
            {/* Catch-all */}
            {[
               'careers',
              'docs', 'guides', 'help',
              'faq', 'community', 'status',
              'terms', 'privacy',
              '*',
            ].map((path) => (
              <Route key={path} path={path} element={wrap(ComingSoon)} />
            ))}
          </Route>

          </Routes>
        </BrowserRouter>
        </ToastProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}

export default App