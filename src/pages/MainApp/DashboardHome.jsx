import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  DollarSign, ShoppingCart, Clock, Users, Plus, ExternalLink, Copy, Check,
  MessageSquare, ChevronRight, ArrowUpRight, Sparkles, Zap, Share2, Activity,
  TrendingUp,
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import StatusBadge from '../../components/ui/StatusBadge'
import { useStore } from '../../contexts/StoreContext'
import {
  MOCK_DASHBOARD_METRICS, MOCK_WEEKLY_SALES, MOCK_RECENT_ORDERS, MOCK_SETUP_CHECKLIST,
} from '../../services/storeService'

/* ── Mini SVG Line Graph ─────────────────────────────────────────────── */
const OrdersLineGraph = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const W = 260
  const H = 72
  const PAD = { t: 8, r: 8, b: 18, l: 8 }
  const iW = W - PAD.l - PAD.r
  const iH = H - PAD.t - PAD.b

  const maxO = Math.max(...data.map((d) => d.orders))
  const minO = Math.min(...data.map((d) => d.orders))
  const range = maxO - minO || 1

  const pts = data.map((d, i) => ({
    x: PAD.l + (i / (data.length - 1)) * iW,
    y: PAD.t + (1 - (d.orders - minO) / range) * iH,
    day: d.day,
    orders: d.orders,
  }))

  const linePath = pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ')

  const areaPath =
    `${linePath} L ${pts[pts.length - 1].x.toFixed(1)} ${(H - PAD.b).toFixed(1)} L ${pts[0].x.toFixed(1)} ${(H - PAD.b).toFixed(1)} Z`

  const activePoint = hoveredIndex === null ? null : pts[hoveredIndex]
  const tooltipAlignment = hoveredIndex === 0 ? 'left-0' : hoveredIndex === pts.length - 1 ? 'right-0' : '-translate-x-1/2'

  return (
    <div className="relative w-full" style={{ paddingBottom: '28%' }} onMouseLeave={() => setHoveredIndex(null)}>
      {activePoint && (
        <div
          className={`pointer-events-none absolute top-0 z-10 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-bold text-background shadow-md ${tooltipAlignment}`}
          style={{ left: `${(activePoint.x / W) * 100}%` }}
          role="status"
        >
          {activePoint.day}: {activePoint.orders} orders
        </div>
      )}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.01" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal guide lines */}
        {[0.25, 0.5, 0.75].map((t, i) => (
          <line
            key={i}
            x1={PAD.l} y1={PAD.t + t * iH}
            x2={W - PAD.r} y2={PAD.t + t * iH}
            stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3"
          />
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#ordersGrad)" />

        {/* Line stroke */}
        <path
          d={linePath}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />

        {activePoint && (
          <>
            <line
              x1={activePoint.x} y1={PAD.t}
              x2={activePoint.x} y2={H - PAD.b}
              stroke="var(--primary)" strokeWidth="0.75" strokeDasharray="2 2"
              opacity="0.65"
            />
            <circle
              cx={activePoint.x} cy={activePoint.y} r="3.5"
              fill="var(--primary)"
              stroke="var(--card)"
              strokeWidth="1.5"
            />
          </>
        )}

        {/* Day labels */}
        {pts.map((p) => (
          <text
            key={p.day}
            x={p.x}
            y={H - 3}
            textAnchor="middle"
            fontSize="7"
            fill="var(--muted-foreground)"
            fontFamily="Inter, system-ui, sans-serif"
          >
            {p.day}
          </text>
        ))}

        {/* Dots — only on peak */}
        {pts.map((p) => (
          p.orders === maxO && (
            <circle
              key={p.day}
              cx={p.x} cy={p.y} r="3"
              fill="var(--primary)"
              stroke="var(--card)"
              strokeWidth="1.5"
            />
          )
        ))}

        {/* Invisible point targets keep the chart easy to explore without changing its shape. */}
        {pts.map((p, i) => (
          <rect
            key={`target-${p.day}`}
            x={i === 0 ? 0 : p.x - (pts[i].x - pts[i - 1].x) / 2}
            y={0}
            width={i === 0 || i === pts.length - 1 ? (W / pts.length) : p.x - pts[i - 1].x}
            height={H}
            fill="transparent"
            tabIndex={0}
            aria-label={`${p.day}: ${p.orders} orders`}
            onMouseEnter={() => setHoveredIndex(i)}
            onFocus={() => setHoveredIndex(i)}
            onBlur={() => setHoveredIndex(null)}
          />
        ))}
      </svg>
    </div>
  )
}

/* ── Mini SVG Bar Chart (Revenue) — compact single-column ───────────── */
const RevenueBarChart = ({ data, maxRevenue, currencySymbol }) => {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="grid grid-cols-7 gap-1.5 items-end h-24 border-b border-border/60 pb-2">
      {data.map((item) => {
        const heightPercent = Math.round((item.revenue / maxRevenue) * 100)
        const isToday = item.day === 'Sun'
        const isHovered = hovered === item.day
        return (
          <div
            key={item.day}
            className="flex flex-col items-center gap-1 h-full justify-end group relative"
            onMouseEnter={() => setHovered(item.day)}
            onMouseLeave={() => setHovered(null)}
          >
            {isHovered && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-md bg-foreground px-1.5 py-0.5 text-[9px] font-bold text-background shadow-xs whitespace-nowrap z-10">
                {currencySymbol}{(item.revenue / 1000).toFixed(0)}k
              </div>
            )}
            <div
              className="w-full rounded-t-lg transition-all duration-200 cursor-default"
              style={{
                height: `${heightPercent}%`,
                backgroundColor: isToday
                  ? 'var(--primary)'
                  : isHovered
                    ? 'color-mix(in oklch, var(--primary) 40%, var(--surface-muted))'
                    : 'color-mix(in oklch, var(--primary) 20%, var(--surface-muted))',
              }}
            />
            <span className={`text-[9px] font-medium leading-none ${isToday ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
              {item.day.slice(0, 2)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════ */

const DashboardHome = () => {
  const { formatPrice, currencySymbol } = useStore()
  const [orders, setOrders] = useState(MOCK_RECENT_ORDERS)
  const [checklist, setChecklist] = useState(MOCK_SETUP_CHECKLIST)
  const [copiedLink, setCopiedLink] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://stallioshop.netlify.app/denzen-thrift')
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
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
  const totalOrders = MOCK_WEEKLY_SALES.reduce((s, d) => s + d.orders, 0)
  const peakOrders = Math.max(...MOCK_WEEKLY_SALES.map((d) => d.orders))
  const peakDay = MOCK_WEEKLY_SALES.find((d) => d.orders === peakOrders)?.day

  return (
    <div className="space-y-3 pb-12">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <PageHeader
        title="Dashboard"
        subtitle="Here's what's happening across your store today."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
            >
              {copiedLink ? (
                <><Check size={14} className="text-[var(--success)]" /><span>Copied!</span></>
              ) : (
                <><Copy size={14} className="text-muted-foreground" /><span>Copy Store Link</span></>
              )}
            </button>
            <Link
              to="/app/products"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Add Product</span>
            </Link>
          </div>
        }
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success)]" />
          </span>
          <span><strong className="text-foreground">19 live shoppers</strong> browsing right now</span>
        </div>
      </PageHeader>

      {/* ── Row 1: 4 KPI Stat Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Revenue Today" value={formatPrice(28450)} change={MOCK_DASHBOARD_METRICS.revenueChange} isPositive={MOCK_DASHBOARD_METRICS.revenueIsPositive} period="vs yesterday" icon={DollarSign} />
        <StatCard label="Orders Today" value={MOCK_DASHBOARD_METRICS.ordersToday} change={MOCK_DASHBOARD_METRICS.ordersChange} isPositive={MOCK_DASHBOARD_METRICS.ordersIsPositive} period="vs yesterday" icon={ShoppingCart} />
        <StatCard label="Pending" value={MOCK_DASHBOARD_METRICS.pendingOrders} badge={MOCK_DASHBOARD_METRICS.pendingBadge} period="Needs fulfillment" icon={Clock} />
        <StatCard label="Store Visitors" value={MOCK_DASHBOARD_METRICS.liveVisitors} change={MOCK_DASHBOARD_METRICS.visitorsChange} isPositive={MOCK_DASHBOARD_METRICS.visitorsIsPositive} period="Active sessions" icon={Users} />
      </div>


{/* ── Row 2: Live Store Banner ─────────────────────────────────────── */}
<div className="rounded-2xl border border-border bg-card px-4 py-3">
  <div className="flex flex-col sm:flex-row sm:items-center gap-3">

    {/* Store info */}
    <div className="flex items-center gap-3 shrink-0">
      <div className="relative shrink-0">
        <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Zap size={16} className="text-primary" />
        </div>

        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--success)]" />
        </span>
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground text-sm font-heading truncate">
            Denzen Thrift
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--success-bg)] border border-[var(--success-border)] px-2 py-0.5 text-[10px] font-bold text-[var(--success)] uppercase tracking-wide shrink-0">
            <Activity size={8} />
            Live
          </span>
        </div>
      </div>
    </div>

    {/* URL - centered inside bordered box */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2.5">
        <span className="text-[15px] md:text-md text-muted-foreground font-mono truncate">
          stallioshop.netlify.app/denzen-thrift
        </span>

        <button
          type="button"
          onClick={handleCopyLink}
          className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="Copy link"
        >
          {copiedLink ? (
            <Check size={12} className="text-[var(--success)]" />
          ) : (
            <Copy size={12} />
          )}
        </button>
      </div>
    </div>

    {/* Right-side buttons */}
    <div className="flex items-center gap-2 shrink-0">
      <button
        type="button"
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'Denzen Thrift',
              url: 'https://stallioshop.netlify.app/denzen-thrift',
            })
          } else {
            handleCopyLink()
          }
        }}
        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
      >
        <Share2 size={13} />
        <span>Share</span>
      </button>

      <a
        href="https://stallioshop.netlify.app/denzen-thrift"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 transition-all hover:shadow-md hover:-translate-y-0.5"
      >
        <ExternalLink size={13} />
        <span>Visit Store</span>
      </a>
    </div>

  </div>
</div>


      {/* ── Row 3: Bento Grid — 4 cols ──────────────────────────────────── */}
      {/*
          Layout (lg):
          [ Orders Line Graph — 2 cols ] [ Revenue Bar — 1 col ] [ Quick Actions — 1 col ]
          [ Setup Checklist — 2 cols   ] [       Top Items — 2 cols                       ]
      */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">

        {/* ① Orders Line Graph — lg: col-span-2 */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground font-heading leading-tight">Order Volume</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Weekly order trend</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-[var(--success-bg)] border border-[var(--success-border)] px-2.5 py-1">
              <TrendingUp size={11} className="text-[var(--success)]" />
              <span className="text-[11px] font-bold text-[var(--success)]">+12.5%</span>
            </div>
          </div>

          {/* Line graph */}
          <OrdersLineGraph data={MOCK_WEEKLY_SALES} />

          {/* Footer stats */}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-border/60">
            <div>
              <div className="text-[10px] text-muted-foreground">This week</div>
              <div className="text-sm font-extrabold text-foreground font-heading">{totalOrders}</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground">Peak day</div>
              <div className="text-sm font-extrabold text-foreground font-heading">{peakDay} · {peakOrders}</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground">Avg/day</div>
              <div className="text-sm font-extrabold text-foreground font-heading">{Math.round(totalOrders / MOCK_WEEKLY_SALES.length)}</div>
            </div>
          </div>
        </div>

        {/* ② Weekly Revenue Bar — lg: col-span-1 */}
        <div className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground font-heading leading-tight">Revenue</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Last 7 days</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-extrabold text-foreground font-heading">{formatPrice(356200)}</div>
              <div className="text-[10px] text-muted-foreground">total</div>
            </div>
          </div>

          <RevenueBarChart
            data={MOCK_WEEKLY_SALES}
            maxRevenue={maxRevenue}
            currencySymbol={currencySymbol}
          />

          <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-0.5">
            <span>Peak <strong className="text-foreground">{currencySymbol}{(maxRevenue / 1000).toFixed(0)}k</strong></span>
            <span>Avg <strong className="text-foreground">{formatPrice(Math.round(MOCK_WEEKLY_SALES.reduce((s, d) => s + d.revenue, 0) / MOCK_WEEKLY_SALES.length))}</strong></span>
          </div>
        </div>

        {/* ③ Quick Actions — lg: col-span-1 */}
        <div className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-muted-foreground">Quick Actions</h3>
          <div className="flex flex-col gap-1.5 flex-1">
            <Link
              to="/app/products"
              className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 px-3 py-2.5 text-xs font-semibold text-foreground hover:bg-accent transition-all"
            >
              <span className="flex items-center gap-2"><Plus size={14} className="text-primary" /> Add Product</span>
              <ChevronRight size={13} className="text-muted-foreground" />
            </Link>
            <a
              href="https://stallioshop.netlify.app/denzen-thrift"
              target="_blank" rel="noopener noreferrer"
              className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 px-3 py-2.5 text-xs font-semibold text-foreground hover:bg-accent transition-all"
            >
              <span className="flex items-center gap-2"><ExternalLink size={14} className="text-primary" /> View Store</span>
              <ChevronRight size={13} className="text-muted-foreground" />
            </a>
            <Link
              to="/app/messages"
              className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 px-3 py-2.5 text-xs font-semibold text-foreground hover:bg-accent transition-all"
            >
              <span className="flex items-center gap-2"><MessageSquare size={14} className="text-primary" /> Messages</span>
              <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive">3</span>
            </Link>
          </div>

          {/* Mini revenue sparkline insight */}
          <div className="mt-auto rounded-xl bg-primary/8 border border-primary/12 px-3 py-2.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles size={11} className="text-primary" />
              <span className="text-[10px] font-bold text-primary">Insight</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-snug">
              Saturday is your peak day. Consider restocking best-sellers by Friday.
            </p>
          </div>
        </div>

        {/* ④ Setup Checklist — lg: col-span-2 */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-primary" />
              <h3 className="text-xs font-bold text-muted-foreground">Store Setup</h3>
            </div>
            <span className="text-xs font-extrabold text-primary font-heading">{progressPercent}%</span>
          </div>
          <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className="flex items-center gap-2 cursor-pointer rounded-lg p-2 transition-colors hover:bg-accent/40 text-xs"
              >
                <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-colors ${item.completed ? 'bg-primary border-primary text-primary-foreground' : 'border-border bg-card'}`}>
                  {item.completed && <Check size={10} strokeWidth={3} />}
                </div>
                <span className={`flex-1 leading-snug ${item.completed ? 'line-through text-muted-foreground' : 'font-medium text-foreground'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ⑤ Top Products — lg: col-span-2 */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-muted-foreground">Top Selling Items</h3>
            <Link to="/app/products" className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-primary hover:underline">
              All products <ArrowUpRight size={11} />
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { name: 'Oversized Vintage Acid-Wash Tee', sold: 24, rev: '₨ 76,800', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=80&h=80&fit=crop&auto=format&q=80' },
              { name: 'Minimalist Cargo Pants — Olive', sold: 18, rev: '₨ 86,400', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop&auto=format&q=80' },
              { name: 'Monochrome Heavyweight Hoodie', sold: 15, rev: '₨ 97,500', img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=80&h=80&fit=crop&auto=format&q=80' },
            ].map((product, i) => (
              <div key={i} className="flex items-center gap-3">
                <img src={product.img} alt={product.name} className="h-9 w-9 rounded-xl border border-border object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-foreground truncate">{product.name}</div>
                  <div className="text-[10px] text-muted-foreground">{product.sold} sold</div>
                </div>
                <div className="text-[11px] font-bold text-foreground shrink-0">{product.rev}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Row 4: Recent Orders ─────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            <h3 className="text-sm font-bold text-foreground font-heading">Recent Orders</h3>
            <p className="text-[11px] text-muted-foreground">Latest incoming orders</p>
          </div>
          <Link to="/app/orders" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
            <span>View all</span><ArrowUpRight size={12} />
          </Link>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/30 text-muted-foreground border-b border-border">
              <tr>
                {['Order', 'Customer', 'Items', 'Total', 'Status', 'Action'].map((col, i) => (
                  <th key={col} className={`px-4 py-2.5 font-semibold uppercase tracking-wider text-[10px] ${i === 5 ? 'text-right' : ''}`}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-4 py-2.5 font-bold text-foreground text-[11px]">{order.id}</td>
                  <td className="px-4 py-2.5">
                    <div className="font-semibold text-foreground text-[11px]">{order.customer.name}</div>
                    <div className="text-[10px] text-muted-foreground">{order.customer.city}</div>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <img key={idx} src={item.img} alt={item.name} className="h-6 w-6 rounded-lg border border-border object-cover" />
                      ))}
                      <span className="text-[10px] text-muted-foreground ml-0.5">{order.items.reduce((s, it) => s + it.qty, 0)} pcs</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-bold text-foreground text-[11px]">{order.total}</td>
                  <td className="px-4 py-2.5"><StatusBadge status={order.status} size="sm" /></td>
                  <td className="px-4 py-2.5 text-right">
                    {order.status === 'pending' && (
                      <button type="button" onClick={(e) => handleUpdateOrderStatus(order.id, 'confirmed', e)}
                        className="rounded-lg bg-[var(--info-bg)] border border-[var(--info-border)] px-2.5 py-1 text-[10px] font-semibold text-[var(--info)] hover:opacity-80 transition-opacity">
                        Confirm
                      </button>
                    )}
                    {order.status === 'confirmed' && (
                      <button type="button" onClick={(e) => handleUpdateOrderStatus(order.id, 'shipped', e)}
                        className="rounded-lg bg-primary/10 border border-primary/20 px-2.5 py-1 text-[10px] font-semibold text-primary hover:opacity-80 transition-opacity">
                        Ship
                      </button>
                    )}
                    {(order.status === 'shipped' || order.status === 'delivered') && (
                      <span className="text-[10px] text-muted-foreground capitalize">{order.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="divide-y divide-border md:hidden">
          {orders.slice(0, 4).map((order) => (
            <div key={order.id} className="flex items-center justify-between px-4 py-3 text-xs">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-foreground">{order.id}</span>
                  <StatusBadge status={order.status} size="sm" />
                </div>
                <div className="text-muted-foreground">{order.customer.name} · {order.customer.city}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-foreground">{order.total}</div>
                {order.status === 'pending' && (
                  <button type="button" onClick={(e) => handleUpdateOrderStatus(order.id, 'confirmed', e)}
                    className="mt-1 rounded-lg bg-[var(--info-bg)] border border-[var(--info-border)] px-2 py-0.5 text-[10px] font-semibold text-[var(--info)]">
                    Confirm
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default DashboardHome