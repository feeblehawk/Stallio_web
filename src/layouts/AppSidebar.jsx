import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  LayoutGrid,
  ShoppingCart,
  Users,
  BarChart2,
  Tag,
  MessageSquare,
  Palette,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import BrandLogo from '../components/BrandLogo'
import { useSidebar } from '../contexts/SidebarContext'

// ─── Nav Sections ─────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  {
    items: [
      { icon: LayoutDashboard, label: 'Overview', to: '/app' },
    ],
  },
  {
    label: 'Orders & Customers',
    items: [
      { icon: ShoppingCart, label: 'Orders',    to: '/app/orders' },
      { icon: Users,        label: 'Customers', to: '/app/customers' },
      { icon: MessageSquare,label: 'Messages',  to: '/app/messages' },
    ],
  },
  {
    label: 'Products',
    items: [  
      { icon: Package,    label: 'Products',   to: '/app/products' },
      { icon: LayoutGrid, label: 'Categories', to: '/app/categories' },
    ],
  },
  {
    label: 'Growth',
    items: [
      { icon: BarChart2, label: 'Analytics', to: '/app/analytics' },
      { icon: Tag,       label: 'Discounts', to: '/app/discounts' },
    ],
  },
  {
    label: 'Store',
    items: [
      { icon: Palette,  label: 'Store Builder', to: '/app/storefront' },
      { icon: Settings, label: 'Settings',      to: '/app/settings' },
    ],
  },
]

// ─── Easing ───────────────────────────────────────────────────────────────────
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

// ─── Single Nav Item ──────────────────────────────────────────────────────────
const NavItem = ({ icon: Icon, label, to, collapsed }) => (
  <NavLink
    to={to}
    end={to === '/app'}
    title={collapsed ? label : undefined}
    className={({ isActive }) => [
      'group relative flex items-center gap-3 rounded-xl px-3 py-2.5',
      'text-sm font-medium transition-all duration-150 select-none',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      isActive
        ? 'bg-primary/10 text-primary'
        : 'text-muted-foreground hover:text-foreground hover:bg-accent/70',
    ].join(' ')}
  >
    {({ isActive }) => (
      <>
        {/* Active indicator bar */}
        {isActive && (
          <span
            className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-primary"
            aria-hidden="true"
          />
        )}

        <Icon
          size={18}
          strokeWidth={isActive ? 2.2 : 1.9}
          className={`shrink-0 transition-colors duration-150 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}
        />

        {/* Label — animate out when collapsed */}
        <span
          className="truncate leading-normal"
          style={{
            opacity:    collapsed ? 0 : 1,
            width:      collapsed ? 0 : 'auto',
            overflow:   'hidden',
            whiteSpace: 'nowrap',
            transition: `opacity 0.22s ${EASE}, width 0.28s ${EASE}`,
          }}
        >
          {label}
        </span>
      </>
    )}
  </NavLink>
)

// ─── AppSidebar ────────────────────────────────────────────────────────────────
const AppSidebar = () => {
  const { collapsed, toggleCollapsed, mobileOpen, closeMobile } = useSidebar()

  const SIDEBAR_W    = collapsed ? '72px' : '280px'
  const SIDEBAR_FULL = '280px'

  return (
    <>
      {/* ── Mobile Backdrop ──────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-40 lg:hidden"
        style={{
          background:    'color-mix(in oklch, var(--foreground) 14%, transparent)',
          backdropFilter: mobileOpen ? 'blur(3px)' : 'blur(0px)',
          opacity:       mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition:    `opacity 0.28s ${EASE}, backdrop-filter 0.28s ${EASE}`,
        }}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* ── Mobile Drawer ────────────────────────────────────────────────── */}
      <aside
        id="app-sidebar-mobile"
        aria-label="App navigation"
        className="fixed inset-y-0 left-0 z-50 flex flex-col lg:hidden"
        style={{
          width:      SIDEBAR_FULL,
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          boxShadow: mobileOpen
            ? '4px 0 32px color-mix(in oklch, var(--foreground) 10%, transparent)'
            : 'none',
          transform:  mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: `transform 0.32s ${EASE}, box-shadow 0.32s ${EASE}`,
        }}
      >
        <SidebarInner collapsed={false} showClose onClose={closeMobile} />
      </aside>

      {/* ── Desktop Sidebar ──────────────────────────────────────────────── */}
      <aside
        aria-label="App navigation"
        className="hidden lg:flex flex-col flex-shrink-0 sticky top-0 h-screen overflow-hidden"
        style={{
          width:      SIDEBAR_W,
          minWidth:   SIDEBAR_W,
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          transition: `width 0.32s ${EASE}, min-width 0.32s ${EASE}`,
        }}
      >
        <SidebarInner collapsed={collapsed} onToggle={toggleCollapsed} />
      </aside>
    </>
  )
}

// ─── Inner Sidebar Content ────────────────────────────────────────────────────
const SidebarInner = ({ collapsed, onToggle, showClose, onClose }) => (
  <div className="flex flex-col h-full overflow-hidden">

    {/* ── Logo / Header ── */}
    <div
      className="flex items-center px-4 border-b border-border"
      style={{ height: '64px', minHeight: '64px', flexShrink: 0 }}
    >
      {/* Logo always shows, label fades with collapse */}
      <div
        className="flex-1 overflow-hidden"
        style={{
          opacity:    collapsed ? 0 : 1,
          transition: `opacity 0.2s ${EASE}`,
          minWidth: 0,
        }}
      >
        <BrandLogo size="sm" />
      </div>

      {/* Collapse/Close toggle */}
      {showClose ? (
        <button
          type="button"
          onClick={onClose}
          className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          aria-label="Close navigation"
        >
          <X size={15} strokeWidth={2.2} />
        </button>
      ) : (
        <button
          type="button"
          onClick={onToggle}
          className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight size={15} strokeWidth={2.2} />
            : <ChevronLeft  size={15} strokeWidth={2.2} />
          }
        </button>
      )}
    </div>

    {/* ── Nav Sections ── */}
    <nav
      className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-5 space-y-5"
      aria-label="Sidebar navigation"
    >
      {NAV_SECTIONS.map((section) =>
        section.items ? (
          <div key={section.label}>
            {/* Section label — hidden when collapsed */}
            <p
              className="mb-1 px-5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60"
              style={{
                opacity:    collapsed ? 0 : 1,
                height:     collapsed ? 0 : 'auto',
                overflow:   'hidden',
                whiteSpace: 'nowrap',
                transition: `opacity 0.18s ${EASE}, height 0.24s ${EASE}`,
              }}
            >
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavItem key={item.to} {...item} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ) : (
          <div key={section.to || section.label} className="space-y-0.5">
            <NavItem {...section} collapsed={collapsed} />
          </div>
        )
      )}
    </nav>

    {/* ── Footer / Help ── */}
    <div className="px-2 py-3 border-t border-border flex-shrink-0">
      <NavLink
        to="/app/help"
        title={collapsed ? 'Help & Support' : undefined}
        className={({ isActive }) => [
          'group flex items-center gap-3 rounded-xl px-5 py-2.5',
          'text-sm font-medium transition-all duration-150 select-none',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent/70',
        ].join(' ')}
      >
        <HelpCircle size={18} strokeWidth={1.9} className="shrink-0" />
        <span
          className="truncate leading-normal"
          style={{
            opacity:    collapsed ? 0 : 1,
            width:      collapsed ? 0 : 'auto',
            overflow:   'hidden',
            whiteSpace: 'nowrap',
            transition: `opacity 0.22s ${EASE}, width 0.28s ${EASE}`,
          }}
        >
          Help & Support
        </span>
      </NavLink>
    </div>

  </div>
)

export default AppSidebar