import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '../contexts/SidebarContext'
import AppSidebar from './AppSidebar'
import AppHeader from './AppHeader'

const DashboardLayout = () => (
  <SidebarProvider>
    <div
      className="flex h-screen w-full overflow-hidden antialiased"
      style={{ background: 'var(--background)' }}
    >
      {/* Sidebar */}
      <AppSidebar />

      {/* Main column */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <AppHeader />

        {/* Page content */}
        <main
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ background: 'var(--background)' }}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  </SidebarProvider>
)

export default DashboardLayout
