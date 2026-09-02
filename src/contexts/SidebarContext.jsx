import { createContext, useContext, useState, useCallback } from 'react'

const SidebarContext = createContext(null)

export const SidebarProvider = ({ children }) => {
  // Desktop: collapsed (icon-only) vs expanded
  const [collapsed, setCollapsed] = useState(false)
  // Mobile: drawer open/closed
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleCollapsed  = useCallback(() => setCollapsed(p => !p), [])
  const toggleMobileOpen = useCallback(() => setMobileOpen(p => !p), [])
  const closeMobile      = useCallback(() => setMobileOpen(false), [])

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed, mobileOpen, toggleMobileOpen, closeMobile }}>
      {children}
    </SidebarContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = () => {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used inside SidebarProvider')
  return ctx
}
