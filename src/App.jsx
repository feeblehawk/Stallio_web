import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import ComingSoon from './pages/ComingSoon'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Main pages — Home & About show Coming Soon for now */}
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />

            {/* Nav link routes */}
            <Route path="features" element={<ComingSoon />} />
            <Route path="pricing" element={<ComingSoon />} />
            <Route path="how-it-works" element={<ComingSoon />} />

            {/* Footer — Stallio column */}
            <Route path="careers" element={<ComingSoon />} />
            <Route path="contact" element={<ComingSoon />} />

            {/* Footer — Resources column */}
            <Route path="docs" element={<ComingSoon />} />
            <Route path="blog" element={<ComingSoon />} />
            <Route path="guides" element={<ComingSoon />} />
            <Route path="help" element={<ComingSoon />} />

            {/* Footer — Support column */}
            <Route path="faq" element={<ComingSoon />} />
            <Route path="community" element={<ComingSoon />} />
            <Route path="status" element={<ComingSoon />} />

            {/* Auth */}
            <Route path="login" element={<ComingSoon />} />

            {/* Footer — Bottom bar legal */}
            <Route path="terms" element={<ComingSoon />} />
            <Route path="privacy" element={<ComingSoon />} />
            <Route path="legal" element={<ComingSoon />} />
            <Route path="sitemap" element={<ComingSoon />} />

            {/* Fallback */}
            <Route path="*" element={<ComingSoon />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
