import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import MainLayout from './layouts/MainLayout'

const Home        = lazy(() => import('./pages/home/Home'))
const About       = lazy(() => import('./pages/about/About'))
const Features    = lazy(() => import('./pages/features/Features'))
const HowItWorks  = lazy(() => import('./pages/howitworks/HowItWorks'))
const ComingSoon  = lazy(() => import('./pages/ComingSoon'))
const ArchitectureGuide      = lazy(() => import('./pages/ArchitectureGuide'))
// Minimal fallback — invisible div keeps layout stable during chunk fetch
const PageFallback = () => (
  <div
    aria-hidden="true"
    style={{ minHeight: '100vh' }}
  />
)

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<PageFallback />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="about"
              element={
                <Suspense fallback={<PageFallback />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="features"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Features />
                </Suspense>
              }
            />
            <Route
              path="how-it-works"
              element={
                <Suspense fallback={<PageFallback />}>
                  <HowItWorks />
                </Suspense>
              }
            /> 
            <Route
              path="ArchitectureGuide"
              element={
                <Suspense fallback={<PageFallback />}>
                  <ArchitectureGuide />
                </Suspense>
              }
            />

            {/* All remaining routes share one ComingSoon chunk */}
            {[
              'pricing', 'careers', 'contact',
              'docs', 'blog', 'guides', 'help',
              'faq', 'community', 'status',
              'login',
              'terms', 'privacy', 'legal', 'sitemap',
              '*',
            ].map((path) => (
              <Route
                key={path}
                path={path}
                element={
                  <Suspense fallback={<PageFallback />}>
                    <ComingSoon />
                  </Suspense>
                }
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App