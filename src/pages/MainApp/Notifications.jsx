import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  Bell,
  Check,
  CheckCheck,
  CircleDollarSign,
  PackageCheck,
  ShoppingBag,
  Trash2,
  UserRound,
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import {
  getNotifications,
  deleteNotification,
  markAllNotificationsRead,
  markNotificationRead,
  subscribeToNotifications,
} from '../../services/notificationService'

const ICONS = {
  order: ShoppingBag,
  customer: UserRound,
  warning: AlertTriangle,
  payment: CircleDollarSign,
  shipping: PackageCheck,
}

const ICON_STYLES = {
  order: 'bg-primary/10 text-primary',
  customer: 'bg-info/10 text-info',
  warning: 'bg-warning/10 text-warning',
  payment: 'bg-success/10 text-success',
  shipping: 'bg-muted text-muted-foreground',
}

const Notifications = () => {
  const [items, setItems] = useState(getNotifications)
  const [filter, setFilter] = useState('all')

  useEffect(() => subscribeToNotifications(setItems), [])

  const unreadCount = items.filter((item) => item.unread).length
  const visibleItems = useMemo(
    () => filter === 'unread' ? items.filter((item) => item.unread) : items,
    [filter, items]
  )

  const markAllRead = () => {
    markAllNotificationsRead()
  }

  const markRead = (id) => {
    markNotificationRead(id)
  }

  const removeNotification = (id) => {
    deleteNotification(id)
  }

  return (
    <div className="space-y-4 pb-12">
      <PageHeader
        title="Notifications"
        subtitle="Stay up to date with orders, customers, payments, and store activity."
        badge={unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
        actions={(
          <button
            type="button"
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <CheckCheck size={15} />
            Mark all as read
          </button>
        )}
      />

      <div className="flex items-center justify-between gap-3 border-b border-border">
        <div className="flex items-center gap-1" role="tablist" aria-label="Notification filters">
          {[
            { id: 'all', label: 'All', count: items.length },
            { id: 'unread', label: 'Unread', count: unreadCount },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={filter === tab.id}
              onClick={() => setFilter(tab.id)}
              className={`border-b-2 px-3 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-ring ${filter === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              {tab.label}
              <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        <span className="hidden text-xs text-muted-foreground sm:block">
          {items.length} total notifications
        </span>
      </div>

      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs" aria-label="Notification list">
        {visibleItems.length > 0 ? visibleItems.map((item) => {
          const Icon = ICONS[item.type] || Bell
          return (
            <article
              key={item.id}
              className={`group flex items-start gap-3.5 border-b border-border p-4 last:border-b-0 sm:gap-4 sm:p-5 ${item.unread ? 'bg-primary/[0.035]' : ''}`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ICON_STYLES[item.type] || 'bg-muted text-muted-foreground'}`}>
                <Icon size={18} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                  <h2 className={`text-sm leading-snug ${item.unread ? 'font-bold text-foreground' : 'font-semibold text-muted-foreground'}`}>
                    {item.title}
                  </h2>
                  <time className="shrink-0 text-[11px] text-muted-foreground">{item.timestamp}</time>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {item.unread && <span className="h-2 w-2 rounded-full bg-primary" aria-label="Unread" />}
                {item.unread && (
                  <button
                    type="button"
                    onClick={() => markRead(item.id)}
                    className="hidden rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground group-hover:block focus-visible:block focus-visible:outline-2 focus-visible:outline-ring"
                    aria-label={`Mark ${item.title} as read`}
                    title="Mark as read"
                  >
                    <Check size={15} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeNotification(item.id)}
                  className="rounded-lg p-1.5 text-muted-foreground opacity-0 transition-colors hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-ring"
                  aria-label={`Delete ${item.title}`}
                  title="Delete notification"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          )
        }) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-success/10 text-success">
              <CheckCheck size={22} />
            </div>
            <h2 className="text-sm font-bold text-foreground">You are all caught up</h2>
            <p className="mt-1 text-xs text-muted-foreground">There are no unread notifications right now.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Notifications