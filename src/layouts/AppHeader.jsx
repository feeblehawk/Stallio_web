import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  ExternalLink,
  Menu,
  ChevronDown,
  Check,
  Store,
} from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'
import { useSidebar } from '../contexts/SidebarContext'

// ─── Mock store data (replace with real context/API later) ──────────────────
const STORES = [
  { id: 1, name: 'Denzen Thrift',   plan: 'Pro',   url: 'denzen-thrift' },
  { id: 2, name: 'Zara Outlet PK',  plan: 'Starter', url: 'zara-outlet-pk' },
  { id: 3, name: 'The Urban Rack',  plan: 'Pro',   url: 'the-urban-rack' },
]

const EASE  = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EOUT  = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'

// ─── Notification Badge ────────────────────────────────────────────────────────
const NotifBadge = ({ count }) => {
  if (!count) return null
  return (
    <span
      className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-destructive px-[5px] text-[10px] font-bold leading-none text-destructive-foreground ring-2 ring-surface"
      aria-label={`${count} unread notifications`}
    >
      {count > 99 ? '99+' : count}
    </span>
  )
}

// ─── AppHeader ─────────────────────────────────────────────────────────────────
const AppHeader = () => {
  const { toggleMobileOpen } = useSidebar()

  const [activeStore, setActiveStore]     = useState(STORES[0])
  const [storeOpen,   setStoreOpen]       = useState(false)
  const [notifOpen,   setNotifOpen]       = useState(false)
  const [notifCount]                      = useState(4)

  const storeRef = useRef(null)
  const notifRef = useRef(null)

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (storeRef.current && !storeRef.current.contains(e.target)) setStoreOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close dropdowns on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { setStoreOpen(false); setNotifOpen(false) }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <header
      className="sticky top-0 z-30 w-full"
      style={{
        background:   'var(--surface)',
        borderBottom: '1px solid var(--border)',
        height:       '64px',
        minHeight:    '64px',
      }}
    >
      <div className="flex h-full items-center gap-3 px-4 sm:px-5 lg:px-6">

        {/* ── Mobile Hamburger ─────────────────────────────────────── */}
        <button
          type="button"
          onClick={toggleMobileOpen}
          className="lg:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          aria-label="Open navigation"
        >
          <Menu size={17} strokeWidth={2.2} />
        </button>

        {/* ── Left — Page Title + Store Switcher ───────────────────── */}
        <div className="flex flex-col justify-center min-w-0 flex-1">

          {/* Page label */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 leading-none select-none">
            Dashboard
          </p>

          {/* Store Name Switcher */}
          <div className="relative mt-0.5" ref={storeRef}>
            <button
              type="button"
              onClick={() => { setStoreOpen(p => !p); setNotifOpen(false) }}
              className="group flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-1 rounded-md"
              aria-haspopup="listbox"
              aria-expanded={storeOpen}
              aria-label="Switch store"
            >
              <span
                className="truncate text-base font-bold leading-tight tracking-tight"
                style={{ color: 'var(--foreground)', maxWidth: '200px' }}
              >
                {activeStore.name}
              </span>
              <ChevronDown
                size={14}
                strokeWidth={2.5}
                className="shrink-0 text-muted-foreground transition-transform duration-200"
                style={{ transform: storeOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {/* Store Dropdown */}
            {storeOpen && (
              <div
                role="listbox"
                aria-label="Select store"
                className="absolute top-full left-0 z-50 mt-2 min-w-[220px] overflow-hidden rounded-2xl border border-border bg-popover shadow-lg"
                style={{
                  boxShadow: 'var(--float-shadow)',
                  animation: `fadeSlideDown 0.22s ${EASE} forwards`,
                }}
              >
                <div className="p-1.5 space-y-0.5">
                  {STORES.map((store) => (
                    <button
                      key={store.id}
                      role="option"
                      aria-selected={store.id === activeStore.id}
                      type="button"
                      onClick={() => { setActiveStore(store); setStoreOpen(false) }}
                      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-100 hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Store size={14} strokeWidth={2} className="text-primary" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block truncate text-sm font-semibold text-foreground">
                          {store.name}
                        </span>
                        <span className="block text-xs text-muted-foreground">{store.plan} Plan</span>
                      </span>
                      {store.id === activeStore.id && (
                        <Check size={14} strokeWidth={2.5} className="shrink-0 text-primary" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="border-t border-border px-3 py-2">
                  <Link
                    to="/app/settings/stores"
                    onClick={() => setStoreOpen(false)}
                    className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-150 py-1"
                  >
                    + Add new store
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right Actions ─────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

          {/* View Store CTA */}
          <a
            href={`https://stallio.pk/store/${activeStore.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 transition-all duration-200 hover:shadow-md hover:shadow-primary/40 hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-1"
          >
            <span>View Store</span>
            <ExternalLink size={12} strokeWidth={2.5} className="shrink-0" />
          </a>

          {/* Mobile — icon-only View Store */}
          <a
            href={`https://stallio.pk/store/${activeStore.url}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View your store"
            className="sm:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/25 transition-all duration-200 hover:shadow-md hover:shadow-primary/40 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ExternalLink size={15} strokeWidth={2.2} />
          </a>

          {/* Divider */}
          <div className="h-5 w-px bg-border" aria-hidden="true" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Divider */}
          <div className="h-5 w-px bg-border" aria-hidden="true" />

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => { setNotifOpen(p => !p); setStoreOpen(false) }}
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              aria-label={`Notifications — ${notifCount} unread`}
              aria-haspopup="true"
              aria-expanded={notifOpen}
            >
              <Bell size={16} strokeWidth={1.9} />
              <NotifBadge count={notifCount} />
            </button>

            {/* Notifications Dropdown */}
            {notifOpen && (
              <div
                className="absolute top-full right-0 z-50 mt-2 w-[340px] max-w-[calc(100vw-1rem)] overflow-hidden rounded-2xl border border-border bg-popover"
                style={{
                  boxShadow: 'var(--float-shadow)',
                  animation: `fadeSlideDown 0.22s ${EASE} forwards`,
                }}
                role="dialog"
                aria-label="Notifications"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <span className="text-sm font-semibold text-foreground">Notifications</span>
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring rounded"
                  >
                    Mark all read
                  </button>
                </div>

                {/* Notification Items */}
                <div className="max-h-[320px] overflow-y-auto divide-y divide-border">
                  {NOTIF_ITEMS.map((n) => (
                    <NotifItem key={n.id} {...n} />
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-border px-4 py-2.5">
                  <Link
                    to="/app/notifications"
                    onClick={() => setNotifOpen(false)}
                    className="block text-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-150 py-1"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Keyframe for dropdowns ─────────────────────────────────── */}
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  )
}

// ─── Mock Notification Data ────────────────────────────────────────────────────
const NOTIF_ITEMS = [
  {
    id: 1, unread: true,
    icon: '🛍️',
    title: 'New order received',
    body: 'Order #1042 — 2 items — Rs. 3,400',
    time: '2m ago',
  },
  {
    id: 2, unread: true,
    icon: '👤',
    title: 'New customer signed up',
    body: 'Ayesha Khan just created an account',
    time: '18m ago',
  },
  {
    id: 3, unread: true,
    icon: '⚠️',
    title: 'Low stock alert',
    body: 'Vintage denim jacket — only 2 left',
    time: '1h ago',
  },
  {
    id: 4, unread: true,
    icon: '💳',
    title: 'Payment received',
    body: 'Rs. 12,500 deposited to your account',
    time: '3h ago',
  },
  {
    id: 5, unread: false,
    icon: '📦',
    title: 'Order #1039 shipped',
    body: 'Tracking: TCS-892341',
    time: 'Yesterday',
  },
]

const NotifItem = ({ unread, icon, title, body, time }) => (
  <div
    className={`flex items-start gap-3 px-4 py-3 transition-colors duration-100 hover:bg-accent/60 cursor-pointer ${unread ? 'bg-primary/[0.04]' : ''}`}
  >
    <span className="shrink-0 text-xl leading-none mt-0.5" aria-hidden="true">{icon}</span>
    <div className="flex-1 min-w-0">
      <p className={`text-sm leading-snug ${unread ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'}`}>
        {title}
      </p>
      <p className="text-xs text-muted-foreground mt-0.5 truncate">{body}</p>
    </div>
    <div className="flex flex-col items-end gap-1.5 shrink-0">
      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{time}</span>
      {unread && (
        <span className="h-2 w-2 rounded-full bg-primary" aria-label="Unread" />
      )}
    </div>
  </div>
)

export default AppHeader