import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      {/* FIXED: no overflow-x:hidden here — it breaks sticky positioning */}
      <Navbar />
      <main className="flex-grow flex flex-col w-full overflow-x-hidden">
        {/* FIXED: removed relative z-10 — unnecessary stacking context */}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout