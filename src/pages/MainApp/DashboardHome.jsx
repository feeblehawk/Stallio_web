import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  DollarSign,
  ShoppingCart,
  Clock,
  Users,
  Plus,
  ExternalLink,
  Copy,
  Check,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import StatusBadge from '../../components/ui/StatusBadge'
import { useStore } from '../../contexts/StoreContext'
import {
  MOCK_DASHBOARD_METRICS,
  MOCK_WEEKLY_SALES,
  MOCK_RECENT_ORDERS,
  MOCK_SETUP_CHECKLIST,
} from '../../services/storeService'

const DashboardHome = () => {
  const { formatPrice, currencySymbol } = useStore()
  const [orders, setOrders] = useState(MOCK_RECENT_ORDERS)
  const [expandedOrderId, setExpandedOrderId] = useState(null)
  const [checklist, setChecklist] = useState(MOCK_SETUP_CHECKLIST)
  const [copiedLink, setCopiedLink] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://stallio.shop/denzen-thrift')
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const toggleExpandOrder = (id) => {
    setExpandedOrderId((prev) => (prev === id ? null : id))
  }

  const handleUpdateOrderStatus = (orderId, newStatus, e) => {
    e?.stopPropagation()
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    )
  }

  const toggleChecklistItem = (id) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const completedCount = checklist.filter((item) => item.completed).length
  const progressPercent = Math.round((completedCount / checklist.length) * 100)

  const maxRevenue = Math.max(...MOCK_WEEKLY_SALES.map((d) => d.revenue))

  return (
    <div className="space-y-6 pb-12">
      {/* ── Page Header with Live Visitor Pulse ──────────────────────── */}
      <PageHeader
        title="Dashboard"
        subtitle="Here's what's happening across your store today."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
            >
              {copiedLink ? (
                <>
                  <Check size={14} className="text-[var(--success)]" />
                  <span>Copied link!</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="text-muted-foreground" />
                  <span>Copy Store Link</span>
                </>
              )}
            </button>

            <Link
              to="/app/products"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 transition-all duration-150 hover:shadow-md hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Add Product</span>
            </Link>
          </div>
        }
      >
        {/* Live Visitor Bar */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success)]" />
          </span>
          <span>
            <strong className="text-foreground">19 live shoppers</strong> browsing your store right now
          </span>
        </div>
      </PageHeader>

      {/* ── 1. Top Strip: 4 Metric KPI Cards ─────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Revenue Today"
          value={formatPrice(28450)}
          change={MOCK_DASHBOARD_METRICS.revenueChange}
          isPositive={MOCK_DASHBOARD_METRICS.revenueIsPositive}
          period="vs yesterday"
          icon={DollarSign}
        />
        <StatCard
          label="Orders Today"
          value={MOCK_DASHBOARD_METRICS.ordersToday}
          change={MOCK_DASHBOARD_METRICS.ordersChange}
          isPositive={MOCK_DASHBOARD_METRICS.ordersIsPositive}
          period="vs yesterday"
          icon={ShoppingCart}
        />
        <StatCard
          label="Pending Orders"
          value={MOCK_DASHBOARD_METRICS.pendingOrders}
          badge={MOCK_DASHBOARD_METRICS.pendingBadge}
          period="Needs fulfillment"
          icon={Clock}
        />
        <StatCard
          label="Store Visitors"
          value={MOCK_DASHBOARD_METRICS.liveVisitors}
          change={MOCK_DASHBOARD_METRICS.visitorsChange}
          isPositive={MOCK_DASHBOARD_METRICS.visitorsIsPositive}
          period="Active sessions"
          icon={Users}
        />
      </div>

      {/* ── 2. Middle Grid: Recent Orders Feed + Right Action Rail ──── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Recent Orders Feed */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold tracking-tight text-foreground font-heading">
                Recent Orders
              </h2>
              <p className="text-xs text-muted-foreground">
                Incoming orders awaiting confirmation or shipment
              </p>
            </div>

            <Link
              to="/app/orders"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              <span>View all orders</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border bg-muted/40 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">
                      Order
                    </th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">
                      Customer
                    </th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">
                      Items
                    </th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">
                      Total
                    </th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right font-semibold uppercase tracking-wider text-[10px]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {orders.map((order) => {
                    const isExpanded = expandedOrderId === order.id
                    return (
                      <React.Fragment key={order.id}>
                        <tr
                          onClick={() => toggleExpandOrder(order.id)}
                          className="cursor-pointer transition-colors hover:bg-accent/40"
                        >
                          <td className="px-4 py-3.5 font-bold text-foreground">
                            <div className="flex items-center gap-1.5">
                              {isExpanded ? (
                                <ChevronDown size={14} className="text-muted-foreground" />
                              ) : (
                                <ChevronRight size={14} className="text-muted-foreground" />
                              )}
                              <span>{order.id}</span>
                            </div>
                          </td>

                          <td className="px-4 py-3.5">
                            <div className="font-semibold text-foreground">
                              {order.customer.name}
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              {order.customer.city}
                            </div>
                          </td>

                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1.5">
                              {order.items.map((item, idx) => (
                                <img
                                  key={idx}
                                  src={item.img}
                                  alt={item.name}
                                  className="h-7 w-7 rounded-lg border border-border object-cover"
                                />
                              ))}
                              <span className="text-[11px] text-muted-foreground ml-1">
                                {order.items.reduce((sum, it) => sum + it.qty, 0)} items
                              </span>
                            </div>
                          </td>

                          <td className="px-4 py-3.5 font-bold text-foreground">
                            {order.total}
                          </td>

                          <td className="px-4 py-3.5">
                            <StatusBadge status={order.status} />
                          </td>

                          <td className="px-4 py-3.5 text-right">
                            {order.status === 'pending' && (
                              <button
                                type="button"
                                onClick={(e) =>
                                  handleUpdateOrderStatus(order.id, 'confirmed', e)
                                }
                                className="inline-flex items-center rounded-lg bg-[var(--info-bg)] border border-[var(--info-border)] px-2.5 py-1 text-[11px] font-semibold text-[var(--info)] hover:opacity-80 transition-opacity"
                              >
                                Confirm Order
                              </button>
                            )}

                            {order.status === 'confirmed' && (
                              <button
                                type="button"
                                onClick={(e) =>
                                  handleUpdateOrderStatus(order.id, 'shipped', e)
                                }
                                className="inline-flex items-center rounded-lg bg-primary/10 border border-primary/20 px-2.5 py-1 text-[11px] font-semibold text-primary hover:opacity-80 transition-opacity"
                              >
                                Mark Shipped
                              </button>
                            )}

                            {order.status === 'shipped' && (
                              <span className="text-[11px] text-muted-foreground">
                                In transit
                              </span>
                            )}

                            {order.status === 'delivered' && (
                              <span className="text-[11px] text-[var(--success)] font-medium">
                                Completed
                              </span>
                            )}
                          </td>
                        </tr>

                        {/* Expanded Drawer Row */}
                        {isExpanded && (
                          <tr className="bg-muted/25">
                            <td colSpan={6} className="px-6 py-4">
                              <div className="space-y-3">
                                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                  Order Details & Customer Address
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                  <div className="space-y-1 rounded-xl bg-card p-3 border border-border">
                                    <p className="font-semibold text-foreground">
                                      Shipping Address:
                                    </p>
                                    <p className="text-muted-foreground">
                                      {order.customer.address}
                                    </p>
                                    <p className="text-muted-foreground">
                                      Phone: <strong>{order.customer.phone}</strong>
                                    </p>
                                  </div>

                                  <div className="space-y-1 rounded-xl bg-card p-3 border border-border">
                                    <p className="font-semibold text-foreground">
                                      Payment & Timing:
                                    </p>
                                    <p className="text-muted-foreground">
                                      Method: {order.paymentMethod}
                                    </p>
                                    <p className="text-muted-foreground">
                                      Placed: {order.date} ({order.time})
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="divide-y divide-border md:hidden">
              {orders.map((order) => {
                const isExpanded = expandedOrderId === order.id
                return (
                  <div
                    key={order.id}
                    onClick={() => toggleExpandOrder(order.id)}
                    className="p-4 space-y-3 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-sm font-heading">
                          {order.id}
                        </span>
                        <StatusBadge status={order.status} size="sm" />
                      </div>
                      <span className="text-xs text-muted-foreground">{order.time}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-foreground">
                          {order.customer.name}
                        </div>
                        <div className="text-muted-foreground">{order.customer.city}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground text-sm">
                          {order.total}
                        </div>
                        <div className="text-muted-foreground">
                          {order.paymentMethod.split(' ')[0]}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="pt-2 border-t border-border/80 text-xs space-y-2">
                        <p className="text-muted-foreground">
                          <strong>Address:</strong> {order.customer.address}
                        </p>
                        <p className="text-muted-foreground">
                          <strong>Phone:</strong> {order.customer.phone}
                        </p>

                        <div className="pt-2 flex gap-2">
                          {order.status === 'pending' && (
                            <button
                              type="button"
                              onClick={(e) =>
                                handleUpdateOrderStatus(order.id, 'confirmed', e)
                              }
                              className="w-full rounded-xl bg-[var(--info-bg)] border border-[var(--info-border)] py-2 text-xs font-semibold text-[var(--info)]"
                            >
                              Confirm Order
                            </button>
                          )}
                          {order.status === 'confirmed' && (
                            <button
                              type="button"
                              onClick={(e) =>
                                handleUpdateOrderStatus(order.id, 'shipped', e)
                              }
                              className="w-full rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground"
                            >
                              Mark Shipped
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Quick Actions & Launch Checklist */}
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <h3 className="text-sm font-bold tracking-tight text-foreground font-heading">
              Quick Actions
            </h3>

            <div className="space-y-2">
              <Link
                to="/app/products"
                className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 px-3.5 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-accent hover:border-border/80"
              >
                <span className="flex items-center gap-2.5">
                  <Plus size={16} className="text-primary" />
                  <span>Add New Product</span>
                </span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </Link>

              <a
                href="https://stallio.shop/denzen-thrift"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 px-3.5 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-accent hover:border-border/80"
              >
                <span className="flex items-center gap-2.5">
                  <ExternalLink size={16} className="text-primary" />
                  <span>View Live Store</span>
                </span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </a>

              <Link
                to="/app/messages"
                className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 px-3.5 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-accent hover:border-border/80"
              >
                <span className="flex items-center gap-2.5">
                  <MessageSquare size={16} className="text-primary" />
                  <span>Unanswered Messages</span>
                </span>
                <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-bold text-destructive">
                  3 new
                </span>
              </Link>
            </div>
          </div>

          {/* Setup Guide Checklist */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                <h3 className="text-sm font-bold tracking-tight text-foreground font-heading">
                  Store Setup
                </h3>
              </div>
              <span className="text-xs font-bold text-primary font-heading">
                {progressPercent}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="space-y-2">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className="flex items-center gap-2.5 cursor-pointer rounded-xl p-2 transition-colors hover:bg-accent/40 text-xs"
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      item.completed
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-border bg-card'
                    }`}
                  >
                    {item.completed && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span
                    className={`flex-1 ${
                      item.completed
                        ? 'line-through text-muted-foreground'
                        : 'font-medium text-foreground'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Bottom: 7-Day Revenue Trend Visualization ─────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold tracking-tight text-foreground font-heading">
              Weekly Revenue Velocity
            </h3>
            <p className="text-xs text-muted-foreground">
              Sales performance over the last 7 days
            </p>
          </div>
          <div className="text-xs font-bold text-foreground font-heading">
            {formatPrice(356200)} total volume
          </div>
        </div>

        {/* Lightweight SVG-based Bar Chart */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-4 items-end h-40 border-b border-border/80 pb-2">
          {MOCK_WEEKLY_SALES.map((item) => {
            const heightPercent = Math.round((item.revenue / maxRevenue) * 100)
            const isToday = item.day === 'Sun'

            return (
              <div key={item.day} className="flex flex-col items-center gap-2 h-full justify-end group">
                <div
                  className="w-full max-w-[48px] rounded-t-xl transition-all duration-300 relative"
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: isToday
                      ? 'var(--primary)'
                      : 'color-mix(in oklch, var(--primary) 24%, var(--surface-muted))',
                  }}
                >
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center justify-center rounded-md bg-foreground px-2 py-0.5 text-[10px] font-bold text-background shadow-xs whitespace-nowrap z-10">
                    {currencySymbol} {(item.revenue / 1000).toFixed(1)}k
                  </div>
                </div>
                <span
                  className={`text-[11px] font-medium ${
                    isToday ? 'font-bold text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DashboardHome