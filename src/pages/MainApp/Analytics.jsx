import React, { useState, useMemo } from 'react'
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Percent,
  Compass,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { PageHeader, StatCard, FilterTabs } from '../../components/ui'
import {
  getAnalyticsData,
  TRAFFIC_SOURCES,
  TOP_PRODUCTS_LEADERBOARD,
  TOP_CITIES,
} from '../../services/analyticsService'

const TIMEFRAME_TABS = [
  { id: '7days', label: 'Last 7 Days' },
  { id: '30days', label: 'Last 30 Days' },
  { id: 'today', label: 'Today' },
]

const OrderRevenueCard = ({ data, maxRevenue }) => {
  const totalOrders = data.revenueChart.reduce((sum, item) => sum + item.orders, 0)
  const averageRevenue = Math.round(data.grossSales / data.revenueChart.length)

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-xs">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-foreground font-heading">Orders &amp; Revenue</h3>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
              {totalOrders} orders
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Revenue performance for the selected period</p>
        </div>
        <div className="sm:text-right">
          <div className="text-base font-extrabold text-foreground font-heading">₨ {data.grossSales.toLocaleString()}</div>
          <div className="text-[10px] text-muted-foreground">total revenue</div>
        </div>
      </div>

      <div className="mt-6 grid h-44 grid-flow-col auto-cols-fr items-end gap-2 border-b border-border/70 pb-2 sm:gap-4">
        {data.revenueChart.map((item, index) => {
          const heightPercent = Math.max(8, Math.round((item.revenue / maxRevenue) * 100))
          const isLatest = index === data.revenueChart.length - 1

          return (
            <div key={item.label} className="group relative flex h-full flex-col items-center justify-end gap-2">
              <div
                className="relative w-full max-w-14 rounded-t-xl transition-all duration-300 group-hover:brightness-110"
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: isLatest
                    ? 'var(--primary)'
                    : 'color-mix(in oklch, var(--primary) 28%, var(--surface-muted))',
                }}
              >
                <div className="absolute -top-11 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-center text-[10px] font-bold text-background shadow-md group-hover:block">
                  <div>₨ {item.revenue.toLocaleString()}</div>
                  <div className="text-[9px] font-normal opacity-75">{item.orders} orders</div>
                </div>
              </div>
              <span className={`text-[10px] font-medium ${isLatest ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3 text-[10px] text-muted-foreground">
        <div>
          <div>Orders</div>
          <strong className="text-sm text-foreground">{totalOrders}</strong>
        </div>
        <div>
          <div>Avg revenue</div>
          <strong className="text-sm text-foreground">₨ {averageRevenue.toLocaleString()}</strong>
        </div>
        <div className="text-right">
          <div>Best day</div>
          <strong className="text-sm text-primary">
            {data.revenueChart.reduce((best, item) => item.revenue > best.revenue ? item : best).label}
          </strong>
        </div>
      </div>
    </section>
  )
}

const OrderVolumeGraph = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const width = 520
  const height = 190
  const padding = { top: 18, right: 18, bottom: 28, left: 18 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const maxOrders = Math.max(...data.map((item) => item.orders), 1)
  const points = data.map((item, index) => ({
    ...item,
    x: padding.left + (index / Math.max(data.length - 1, 1)) * chartWidth,
    y: padding.top + (1 - item.orders / maxOrders) * chartHeight,
  }))
  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`
  const activePoint = hoveredIndex === null ? null : points[hoveredIndex]

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-foreground font-heading">Order Volume Trend</h3>
          <p className="mt-1 text-xs text-muted-foreground">Number of orders placed across the selected period</p>
        </div>
        <div className="rounded-xl bg-success/10 px-2.5 py-1 text-right">
          <div className="text-sm font-extrabold text-success">{maxOrders}</div>
          <div className="text-[10px] text-success/80">peak orders</div>
        </div>
      </div>

      <div
        className="relative mt-5 w-full"
        style={{ aspectRatio: `${width} / ${height}` }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {activePoint && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-center text-[10px] font-bold text-background shadow-lg"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${(activePoint.y / height) * 100}%`,
            }}
          >
            <div>{activePoint.label}</div>
            <div className="font-normal opacity-75">{activePoint.orders} orders</div>
          </div>
        )}
        <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label="Order volume trend chart">
          {[0.25, 0.5, 0.75].map((level) => (
            <line
              key={level}
              x1={padding.left}
              y1={padding.top + level * chartHeight}
              x2={width - padding.right}
              y2={padding.top + level * chartHeight}
              stroke="var(--border)"
              strokeDasharray="4 5"
              strokeWidth="1"
            />
          ))}
          <path d={areaPath} fill="var(--p-10)" />
          <path d={linePath} fill="none" stroke="var(--primary)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          {activePoint && (
            <line
              x1={activePoint.x}
              y1={padding.top}
              x2={activePoint.x}
              y2={height - padding.bottom}
              stroke="var(--primary)"
              strokeDasharray="3 4"
              strokeWidth="1"
              opacity="0.7"
            />
          )}
          {points.map((point, index) => (
            <g key={point.label}>
              <circle cx={point.x} cy={point.y} r={hoveredIndex === index ? '7' : '5'} fill="var(--primary)" stroke="var(--card)" strokeWidth="3" />
              <text x={point.x} y={height - 7} fill="var(--muted-foreground)" fontSize="10" textAnchor="middle">{point.label}</text>
              <rect
                x={index === 0 ? 0 : (points[index - 1].x + point.x) / 2}
                y={0}
                width={index === points.length - 1 ? width - ((points[index - 1].x + point.x) / 2) : ((point.x + points[index + 1].x) / 2) - (index === 0 ? 0 : (points[index - 1].x + point.x) / 2)}
                height={height}
                fill="transparent"
                tabIndex={0}
                aria-label={`${point.label}: ${point.orders} orders`}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-border/70 pt-3 text-[10px] text-muted-foreground">
        <span>Average <strong className="text-foreground">{(data.reduce((sum, item) => sum + item.orders, 0) / data.length).toFixed(1)} orders</strong></span>
        <span>Latest <strong className="text-primary">{data[data.length - 1].orders} orders</strong></span>
      </div>
    </section>
  )
}

export const Analytics = () => {
  const [timeframe, setTimeframe] = useState('7days')

  const data = useMemo(() => {
    return getAnalyticsData(timeframe)
  }, [timeframe])

  const maxRevenue = Math.max(...data.revenueChart.map((d) => d.revenue))

  return (
    <div className="space-y-6 pb-16">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <PageHeader
        title="Analytics & Growth"
        subtitle="Real-time sales velocity, conversion rates, and acquisition channel insights."
        actions={
          <FilterTabs
            tabs={TIMEFRAME_TABS}
            activeTab={timeframe}
            onSelectTab={setTimeframe}
            variant="contained"
          />
        }
      />

      {/* ── 1. Core Financial KPI Hero Grid ─────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Gross Sales Volume"
          value={`₨ ${data.grossSales.toLocaleString()}`}
          change={data.salesChange}
          isPositive={true}
          period="vs previous period"
          icon={DollarSign}
        />
        <StatCard
          label="Total Orders"
          value={data.ordersCount}
          change={data.ordersChange}
          isPositive={true}
          period="Fulfilled checkout rate"
          icon={ShoppingCart}
        />
        <StatCard
          label="Average Order Value (AOV)"
          value={`₨ ${data.aov.toLocaleString()}`}
          change={data.aovChange}
          isPositive={true}
          period="Basket size average"
          icon={TrendingUp}
        />
        <StatCard
          label="Storefront Conversion Rate"
          value={`${data.conversionRate}%`}
          change={data.conversionChange}
          isPositive={true}
          period={`From ${data.storeVisitors.toLocaleString()} visitors`}
          icon={Percent}
        />
      </div>

      {/* ── 2. Orders & Revenue Card ────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <OrderRevenueCard data={data} maxRevenue={maxRevenue} />
        <OrderVolumeGraph data={data.revenueChart} />
      </div>

      {/* ── 3. Traffic Channels & Top Cities Breakdown ──────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Traffic Acquisition */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground font-heading">
                Traffic Acquisition Channels
              </h3>
              <p className="text-xs text-muted-foreground">
                Where your store visitors are originating from
              </p>
            </div>
            <Compass size={16} className="text-primary" />
          </div>

          <div className="space-y-3.5 pt-2">
            {TRAFFIC_SOURCES.map((source) => (
              <div key={source.source} className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">{source.source}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{source.visitors} visits</span>
                    <span className="font-bold text-foreground font-heading">{source.percentage}%</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full ${source.color} rounded-full transition-all duration-500`}
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Shipping Locations */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground font-heading">
                Geographic Order Density
              </h3>
              <p className="text-xs text-muted-foreground">
                Top buyer regions generating deliveries
              </p>
            </div>
            <MapPin size={16} className="text-primary" />
          </div>

          <div className="space-y-3.5 pt-2">
            {TOP_CITIES.map((city) => (
              <div key={city.city} className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">{city.city}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{city.orders} orders</span>
                    <span className="font-bold text-foreground font-heading">{city.percentage}%</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${city.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Top Performing Bestseller Leaderboard ─────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground font-heading">
              Bestseller Leaderboard
            </h3>
            <p className="text-xs text-muted-foreground">
              Top products ranked by gross revenue generation
            </p>
          </div>
          <Sparkles size={16} className="text-primary" />
        </div>

        <div className="divide-y divide-border">
          {TOP_PRODUCTS_LEADERBOARD.map((item, idx) => (
            <div key={item.sku} className="flex items-center gap-3.5 py-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted font-bold text-xs text-muted-foreground font-heading shrink-0">
                #{idx + 1}
              </span>

              <img
                src={item.img}
                alt={item.name}
                className="h-10 w-10 rounded-xl border border-border object-cover shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-foreground truncate font-heading">
                  {item.name}
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  {item.category} • SKU: <span className="font-mono">{item.sku}</span>
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="font-bold text-xs sm:text-sm text-foreground font-heading">
                  ₨ {item.revenue.toLocaleString()}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {item.unitsSold} units sold ({item.stockLeft} left)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics
