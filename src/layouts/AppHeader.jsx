import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  ExternalLink,
  Menu,
} from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'
import { useSidebar } from '../contexts/SidebarContext'

// ─── Fixed Store ─────────────────────────────────────────────────────────────
const STORE = {
  name: 'Denzen Thrift',
  plan: 'Pro',
  url: 'denzen-thrift',
}

// ─── Notification Badge ──────────────────────────────────────────────────────
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

// ─── AppHeader ───────────────────────────────────────────────────────────────
const AppHeader = () => {
  const { toggleMobileOpen } = useSidebar()

  const [notifOpen, setNotifOpen] = useState(false)
  const [notifCount] = useState(4)

  const notifRef = useRef(null)

  // Close notification dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])

  // Close notification dropdown on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setNotifOpen(false)
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  return (
    <header
      className="sticky top-0 z-30 w-full"
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        height: '64px',
        minHeight: '64px',
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

        {/* ── Left — Page Title + Store Name ───────────────────────── */}
        <div className="flex flex-col justify-center min-w-0 flex-1">

          {/* Page label */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 leading-none select-none">
            Dashboard
          </p>

          {/* Fixed Store Name */}
          <div className="mt-0.5">
            <span
              className="truncate text-base font-bold leading-tight tracking-tight"
              style={{
                color: 'var(--foreground)',
                maxWidth: '200px',
              }}
            >
              {STORE.name}
            </span>
          </div>

        </div>

        {/* ── Right Actions ─────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

          {/* View Store CTA */}
          <a
            href={`https://stallio.pk/store/${STORE.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 transition-all duration-200 hover:shadow-md hover:shadow-primary/40 hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-1"
          >
            <span>View Store</span>
            <ExternalLink
              size={12}
              strokeWidth={2.5}
              className="shrink-0"
            />
          </a>

          {/* Mobile — icon-only View Store */}
          <a
            href={`https://stallio.pk/store/${STORE.url}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View your store"
            className="sm:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/25 transition-all duration-200 hover:shadow-md hover:shadow-primary/40 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ExternalLink size={15} strokeWidth={2.2} />
          </a>

          {/* Divider */}
          <div
            className="h-5 w-px bg-border"
            aria-hidden="true"
          />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Divider */}
          <div
            className="h-5 w-px bg-border"
            aria-hidden="true"
          />

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotifOpen((p) => !p)}
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
                  animation: `fadeSlideDown 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                }}
                role="dialog"
                aria-label="Notifications"
              >

                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <span className="text-sm font-semibold text-foreground">
                    Notifications
                  </span>

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
                    <NotifItem
                      key={n.id}
                      {...n}
                    />
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-border px-4 py-2.5">
                  <Link
                    to="/app/messages"
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
          from {
            opacity: 0;
            transform: translateY(-6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  )
}

// ─── Mock Notification Data ───────────────────────────────────────────────────
const NOTIF_ITEMS = [
  {
    id: 1,
    unread: true,
    icon: '🛍️',
    title: 'New order received',
    body: 'Order #1042 — 2 items — Rs. 3,400',
    time: '2m ago',
  },
  {
    id: 2,
    unread: true,
    icon: '👤',
    title: 'New customer signed up',
    body: 'Ayesha Khan just created an account',
    time: '18m ago',
  },
  {
    id: 3,
    unread: true,
    icon: '⚠️',
    title: 'Low stock alert',
    body: 'Vintage denim jacket — only 2 left',
    time: '1h ago',
  },
  {
    id: 4,
    unread: true,
    icon: '💳',
    title: 'Payment received',
    body: 'Rs. 12,500 deposited to your account',
    time: '3h ago',
  },
  {
    id: 5,
    unread: false,
    icon: '📦',
    title: 'Order #1039 shipped',
    body: 'Tracking: TCS-892341',
    time: 'Yesterday',
  },
]

// ─── Notification Item ────────────────────────────────────────────────────────
const NotifItem = ({
  unread,
  icon,
  title,
  body,
  time,
}) => (
  <div
    className={`flex items-start gap-3 px-4 py-3 transition-colors duration-100 hover:bg-accent/60 cursor-pointer ${
      unread ? 'bg-primary/[0.04]' : ''
    }`}
  >
    <span
      className="shrink-0 text-xl leading-none mt-0.5"
      aria-hidden="true"
    >
      {icon}
    </span>

    <div className="flex-1 min-w-0">
      <p
        className={`text-sm leading-snug ${
          unread
            ? 'font-semibold text-foreground'
            : 'font-medium text-muted-foreground'
        }`}
      >
        {title}
      </p>

      <p className="text-xs text-muted-foreground mt-0.5 truncate">
        {body}
      </p>
    </div>

    <div className="flex flex-col items-end gap-1.5 shrink-0">
      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
        {time}
      </span>

      {unread && (
        <span
          className="h-2 w-2 rounded-full bg-primary"
          aria-label="Unread"
        />
      )}
    </div>
  </div>
)

export default AppHeader
