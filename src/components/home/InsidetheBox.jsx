import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'
import { FaInstagram, FaWhatsapp, FaLink, FaFacebook } from 'react-icons/fa6'
import { easePremium, revealSoft, staggerContainer } from '../../utils/motionVariants'

// ─── Motion helpers ───────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: easePremium, delay },
  }),
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const css = {
  primary:      'var(--primary)',
  primaryFg:    'var(--primary-foreground)',
  fg:           'var(--foreground)',
  mutedFg:      'var(--muted-foreground)',
  surface:      'var(--surface)',
  surfaceMuted: 'var(--surface-muted)',
  bg:           'var(--background)',
  border:       'var(--border)',
  primaryMix10: 'color-mix(in oklch, var(--primary) 10%, var(--surface))',
  primaryMix14: 'color-mix(in oklch, var(--primary) 14%, var(--surface))',
  primaryMix18: 'color-mix(in oklch, var(--primary) 18%, var(--border))',
  primaryMix28: 'color-mix(in oklch, var(--primary) 28%, var(--border))',
}

// ─── Eyebrow badge ────────────────────────────────────────────────────────────
const EyebrowBadge = ({ children }) => (
  <div
    className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
    style={{ borderColor: css.border, background: css.primaryMix10 }}
  >
    <span className="h-1.5 w-1.5 rounded-full" style={{ background: css.primary }} />
    <span className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: css.primary }}>
      {children}
    </span>
  </div>
)

// ─── Stat chip ────────────────────────────────────────────────────────────────
const StatChip = ({ value, label, green }) => (
  <div className="rounded-xl border px-3 py-2.5" style={{ borderColor: css.border, background: css.surfaceMuted }}>
    <div className="font-heading text-sm font-extrabold tracking-tight" style={{ color: green ? 'oklch(0.58 0.18 145)' : css.primary }}>
      {value}
    </div>
    <div className="mt-0.5 text-[9px] font-medium" style={{ color: css.mutedFg }}>{label}</div>
  </div>
)

// ─── Product images (from StallioStoreUI) ────────────────────────────────────
const PRODUCTS = [
  { id: 'p1', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=340&fit=crop&auto=format&q=80', name: 'Classic Tee',   price: '₨ 1,200', badge: 'New'  },
  { id: 'p2', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=340&fit=crop&auto=format&q=80', name: 'Sneakers',      price: '₨ 6,800', badge: 'Hot'  },
  { id: 'p3', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=340&fit=crop&auto=format&q=80', name: 'Blue Classic Suit', price: '₨ 2,400', badge: null   },
  { id: 'p4', img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=340&fit=crop&auto=format&q=80', name: 'Linen Shirt',  price: '₨ 1,850', badge: 'Sale' },
]

// ─── Mini product card (used inside StorefrontCard) ───────────────────────────
const MiniProductCard = ({ product }) => (
  <div className="flex flex-col overflow-hidden rounded-xl border" style={{ background: css.surface, borderColor: css.border }}>
    <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 0.85' }}>
      <img
        src={product.img}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        loading="lazy"
        onError={(e) => {
          e.target.style.display = 'none'
          e.target.parentElement.style.background = css.primaryMix10
        }}
      />
      {product.badge && (
        <span
          className="absolute left-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide"
          style={{ background: css.primaryMix14, color: css.primary, border: `1px solid ${css.primaryMix18}` }}
        >
          {product.badge}
        </span>
      )}
    </div>
    <div className="flex flex-col justify-between p-2">
      <div className="text-[9px] font-semibold leading-tight" style={{ color: css.fg }}>{product.name}</div>
      <div className="mt-0.5 text-[8px] font-bold" style={{ color: css.primary }}>{product.price}</div>
    </div>
  </div>
)

// ═══════════════════════════════════════════════════════════════════════════════
// ─── DASHBOARD MOCKUP CARD — row 1, lg:col-span-8 ────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
const DashboardMockupCard = ({ index, inView, reducedMotion }) => {
  const [hovered, setHovered] = useState(false)
  const bars   = [68, 52, 81, 43, 74]
  const orders = [
    { id: '#1051', item: 'Classic Tee',  amount: '₨ 1,200', status: 'New'     },
    { id: '#1050', item: 'Sneakers',     amount: '₨ 6,800', status: 'Shipped' },
    { id: '#1049', item: 'Linen Shirt',  amount: '₨ 1,850', status: 'Done'    },
  ]

  return (
    <motion.article
      className="group relative col-span-1 overflow-hidden rounded-2xl border flex flex-col sm:col-span-2 lg:col-span-8"
      style={{ borderColor: css.border, background: css.surface, willChange: 'transform' }}
      custom={index * 0.07}
      variants={fadeUp}
      initial={reducedMotion ? false : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -3, scale: 1.005 }}
      transition={{ type: 'spring', stiffness: 340, damping: 26 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      aria-label="Stallio dashboard preview"
    >
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 0%, color-mix(in oklch, var(--primary) 6%, transparent), transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Card text header */}
      <div className="shrink-0 px-6 pt-6 pb-4">
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: css.primary }}>
          Your dashboard
        </div>
        <h3 className="font-heading font-extrabold leading-tight tracking-[-0.03em]" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: css.fg }}>
          Everything in one place.
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: css.mutedFg, maxWidth: '40ch' }}>
          Revenue, orders, products and activity all on your Stallio dashboard.
        </p>
      </div>

      {/* Dashboard mockup */}
      <div
        className="mx-5 mb-5 flex-1 overflow-hidden rounded-2xl border"
        style={{
          background: css.surface,
          borderColor: css.border,
          boxShadow: '0 12px 40px color-mix(in oklch, var(--foreground) 8%, transparent), 0 2px 8px color-mix(in oklch, var(--foreground) 4%, transparent)',
          minHeight: 0,
        }}
      >
        {/* Browser chrome */}
        <div className="flex shrink-0 items-center gap-2 border-b px-3 py-2" style={{ borderColor: css.border, background: css.surfaceMuted }}>
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full" style={{ background: '#FF5F57' }} />
            <span className="h-2 w-2 rounded-full" style={{ background: '#FFBD2E' }} />
            <span className="h-2 w-2 rounded-full" style={{ background: '#28C840' }} />
          </div>
          <div className="flex flex-1 items-center gap-1.5 rounded-md border px-2 py-1" style={{ borderColor: css.border, background: css.surface }}>
            <svg viewBox="0 0 16 16" fill="none" className="h-2.5 w-2.5 shrink-0" style={{ color: css.mutedFg }} aria-hidden="true">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v3l2 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[10px]" style={{ color: css.mutedFg }}>
              stallio.shop/<span style={{ color: css.fg, fontWeight: 600 }}>yourbrand</span>
            </span>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="grid grid-cols-5 gap-0" style={{ minHeight: 0 }}>
          {/* Sidebar */}
          <div className="col-span-1 hidden border-r p-3 lg:block" style={{ borderColor: css.border, background: css.surfaceMuted }}>
            <div className="mb-3 text-[8px] font-bold uppercase tracking-[0.2em]" style={{ color: css.mutedFg }}>Stallio</div>
            {['Dashboard', 'Products', 'Orders', 'Analytics', 'Settings'].map((item, i) => (
              <div
                key={item}
                className="mb-0.5 rounded-md px-2 py-1.5 text-[9px] font-medium"
                style={{ background: i === 0 ? css.primaryMix10 : 'transparent', color: i === 0 ? css.primary : css.mutedFg }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="col-span-5 p-3 lg:col-span-4">
            {/* Stats row */}
            <div className="mb-3 grid grid-cols-3 gap-2">
              {[
                { label: 'Revenue',  value: '₨ 84.5k', trend: '+12%' },
                { label: 'Orders',   value: '42',       trend: '+8%'  },
                { label: 'Products', value: '128',      trend: '→'    },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border p-2.5" style={{ borderColor: css.border, background: css.surfaceMuted }}>
                  <div className="text-[8px] font-medium" style={{ color: css.mutedFg }}>{stat.label}</div>
                  <div className="mt-0.5 font-heading text-xs font-extrabold tracking-tight" style={{ color: css.fg }}>{stat.value}</div>
                  <div className="mt-0.5 text-[8px] font-semibold" style={{ color: css.primary }}>{stat.trend}</div>
                </div>
              ))}
            </div>

            {/* Chart + orders */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="rounded-xl border p-2.5" style={{ borderColor: css.border, background: css.surfaceMuted }}>
                <div className="mb-2 text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: css.mutedFg }}>Weekly sales</div>
                <div className="flex items-end justify-between gap-1" style={{ height: 52 }}>
                  {bars.map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 2 ? css.primary : css.primaryMix28 }} />
                  ))}
                </div>
                <div className="mt-1.5 flex justify-between">
                  {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
                    <span key={i} className="text-[7px]" style={{ color: css.mutedFg }}>{d}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border p-2.5" style={{ borderColor: css.border, background: css.surfaceMuted }}>
                <div className="mb-2 text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: css.mutedFg }}>Recent orders</div>
                <div className="space-y-1.5">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between gap-2">
                      <span className="text-[8px] font-semibold truncate" style={{ color: css.fg }}>{order.item}</span>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <span className="text-[8px] font-bold" style={{ color: css.primary }}>{order.amount}</span>
                        <span
                          className="rounded-full px-1.5 py-px text-[6px] font-bold uppercase tracking-wide"
                          style={{
                            background: order.status === 'New' ? css.primaryMix14 : css.surface,
                            color: order.status === 'New' ? css.primary : css.mutedFg,
                            border: `1px solid ${css.border}`,
                          }}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top products */}
            <div className="rounded-xl border p-2.5" style={{ borderColor: css.border, background: css.surfaceMuted }}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: css.mutedFg }}>Top Products</span>
                <span className="text-[7px] font-medium" style={{ color: css.primary }}>View all →</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { name: 'Classic Tee',  sold: 38, revenue: '₨ 45,600',  pct: 82 },
                  { name: 'Linen Shirt',  sold: 24, revenue: '₨ 44,400',  pct: 60 },
                  { name: 'Sneakers',     sold: 17, revenue: '₨ 1,15,600', pct: 42 },
                ].map((p) => (
                  <div key={p.name} className="flex items-center gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-semibold" style={{ color: css.fg }}>{p.name}</span>
                        <span className="text-[8px] font-bold" style={{ color: css.primary }}>{p.revenue}</span>
                      </div>
                      <div className="mt-0.5 h-1 w-full overflow-hidden rounded-full" style={{ background: css.border }}>
                        <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: css.primary }} />
                      </div>
                    </div>
                    <span className="shrink-0 text-[7px]" style={{ color: css.mutedFg }}>{p.sold} sold</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity strip */}
            <div className="mt-2 rounded-xl border p-2.5" style={{ borderColor: css.border, background: css.surfaceMuted }}>
              <div className="mb-2 text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ color: css.mutedFg }}>Recent Activity</div>
              <div className="space-y-1.5">
                {[
                  { msg: 'New order from Ayesha K.',    time: '2m ago',  dot: css.primary },
                  { msg: 'Payment confirmed · #1051',   time: '8m ago',  dot: 'oklch(0.65 0.18 145)' },
                  { msg: 'Product "Sneakers" updated',  time: '22m ago', dot: css.mutedFg },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: a.dot }} />
                    <span className="flex-1 text-[8px]" style={{ color: css.fg }}>{a.msg}</span>
                    <span className="shrink-0 text-[7px]" style={{ color: css.mutedFg }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-0 left-6 right-6 h-px"
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.4, ease: easePremium }}
        style={{ background: css.primary, transformOrigin: 'left' }}
        aria-hidden="true"
      />
    </motion.article>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── STOREFRONT CARD — row 1, lg:col-span-4, real product images ──────────────
// ═══════════════════════════════════════════════════════════════════════════════
const StorefrontCard = ({ index, inView, reducedMotion }) => {
  const [hovered, setHovered] = useState(false)
  const [scrollOffset, setScrollOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollOffset((prev) => (prev + 1) % PRODUCTS.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const visible = [
    PRODUCTS[scrollOffset % PRODUCTS.length],
    PRODUCTS[(scrollOffset + 1) % PRODUCTS.length],
  ]

  return (
    <motion.article
      className="group relative col-span-1 overflow-hidden rounded-2xl border flex flex-col sm:col-span-2 lg:col-span-4"
      style={{ borderColor: css.border, background: css.surface, willChange: 'transform' }}
      custom={index * 0.07}
      variants={fadeUp}
      initial={reducedMotion ? false : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -3, scale: 1.008 }}
      transition={{ type: 'spring', stiffness: 340, damping: 26 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      aria-label="Professional Storefront"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in oklch, var(--primary) 6%, transparent), transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Text */}
      <div className="shrink-0 px-6 pt-6 pb-4">
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: css.primary }}>
          Your brand, online
        </div>
        <h3 className="font-heading font-extrabold leading-tight tracking-[-0.03em]" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: css.fg }}>
          Professional Storefront
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: css.mutedFg, maxWidth: '26ch' }}>
          A beautiful, mobile-first store. No code, no domain, no hassle.
        </p>
      </div>

      {/* Store preview */}
      <div
        className="mx-5 mb-5 flex-1 overflow-hidden rounded-2xl border"
        style={{
          background: css.surface,
          borderColor: css.border,
          boxShadow: '0 8px 24px color-mix(in oklch, var(--foreground) 6%, transparent)',
          minHeight: 0,
        }}
      >
        {/* Store header */}
        <div className="flex shrink-0 items-center justify-between border-b px-3 py-2.5" style={{ borderColor: css.border, background: css.surfaceMuted }}>
          <div>
            <div className="text-[10px] font-bold" style={{ color: css.fg }}>YourShop</div>
            <div className="text-[8px]" style={{ color: css.mutedFg }}>stallio.shop/yourshop</div>
          </div>
          <span className="flex h-5 w-5 items-center justify-center rounded-full text-[9px]" style={{ background: css.primaryMix10, color: css.primary }}>↗</span>
        </div>

        {/* Featured banner */}
        <div className="mx-3 mt-2.5 shrink-0 rounded-lg border px-3 py-2" style={{ background: css.surfaceMuted, borderColor: css.border }}>
          <div className="text-[7px] font-semibold uppercase tracking-[0.16em]" style={{ color: css.mutedFg }}>Featured Collection</div>
          <div className="mt-0.5 font-heading text-[10px] font-extrabold" style={{ color: css.fg }}>Summer '25 Arrivals</div>
        </div>

        {/* Product grid — auto-rotates */}
        <div className="px-3 pt-2.5 pb-2">
          <div className="grid grid-cols-2 gap-2">
            {visible.map((product) => (
              <MiniProductCard key={product.id + scrollOffset} product={product} />
            ))}
          </div>
        </div>

        {/* Cart bar */}
        <div className="mx-3 mb-3 flex items-center justify-between rounded-lg border px-3 py-2" style={{ background: css.primaryMix10, borderColor: css.primaryMix18 }}>
          <span className="text-[9px] font-medium" style={{ color: css.fg }}>View cart</span>
          <span className="font-heading text-[10px] font-bold" style={{ color: css.primary }}>₨ 4,500</span>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-0 left-6 right-6 h-px"
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.4, ease: easePremium }}
        style={{ background: css.primary, transformOrigin: 'left' }}
        aria-hidden="true"
      />
    </motion.article>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MINI PREVIEWS (rows 2 & 3) ──────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

const CheckoutPreview = () => (
  <div className="w-full rounded-xl border p-3 space-y-2" style={{ borderColor: css.border, background: css.surfaceMuted }}>
    <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: css.mutedFg }}>Order Summary</div>
    {[{ name: 'Classic Tee', qty: '×1', price: '₨ 1,200' }, { name: 'Sneakers', qty: '×1', price: '₨ 6,800' }].map((item, i) => (
      <div key={i} className="flex items-center justify-between">
        <span className="text-[9px] font-medium" style={{ color: css.fg }}>{item.name} <span style={{ color: css.mutedFg }}>{item.qty}</span></span>
        <span className="text-[9px] font-bold" style={{ color: css.fg }}>{item.price}</span>
      </div>
    ))}
    <div className="border-t pt-2 flex items-center justify-between" style={{ borderColor: css.border }}>
      <span className="text-[9px] font-bold" style={{ color: css.fg }}>Total</span>
      <span className="text-[11px] font-extrabold" style={{ color: css.primary }}>₨ 8,000</span>
    </div>
    <div className="mt-1 w-full rounded-lg py-2 text-center text-[9px] font-bold" style={{ background: css.primary, color: css.primaryFg }}>
      Place Order →
    </div>
  </div>
)

const LinkPreview = () => (
  <div className="w-full space-y-2">
    <div className="flex items-center gap-2 rounded-xl border px-3 py-2.5" style={{ borderColor: css.primaryMix18, background: css.primaryMix10 }}>
      <FaLink className="h-3.5 w-3.5 shrink-0" style={{ color: css.primary }} />
      <span className="text-[10px] font-semibold" style={{ color: css.primary }}>stallio.shop/yourshop</span>
      <div className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[7px] font-bold" style={{ background: css.primaryMix18, color: css.primary }}>Copy</div>
    </div>
    <div className="grid grid-cols-3 gap-1.5">
      {[
        { label: 'Instagram', icon: FaInstagram, color: '#dd2a7b' },
        { label: 'WhatsApp', icon: FaWhatsapp, color: '#25d366' },
        { label: 'Facebook', icon: FaFacebook, color: '#009dfff4' },
      ].map((p) => {
        const Icon = p.icon

        return (
          <div key={p.label} className="flex flex-col items-center gap-1 rounded-xl border py-2" style={{ borderColor: css.border, background: css.surfaceMuted }}>
            <Icon className="h-3.5 w-3.5" style={{ color: p.color }} />
            <span className="text-[7px]" style={{ color: css.mutedFg }}>{p.label}</span>
          </div>
        )
      })}
    </div>
  </div>
)

const OrdersPreview = () => (
  <div className="w-full space-y-1.5">
    {[
      { id: '#1054', item: 'Classic Tee',  amount: '₨ 1,200', status: 'New',     dot: css.primary              },
      { id: '#1053', item: 'Sneakers',     amount: '₨ 6,800', status: 'Shipped', dot: 'oklch(0.58 0.18 145)'  },
      { id: '#1052', item: 'Linen Shirt',  amount: '₨ 1,850', status: 'Done',    dot: css.mutedFg              },
      { id: '#1051', item: 'Summer Kurta', amount: '₨ 2,400', status: 'New',     dot: css.primary              },
    ].map((o) => (
      <div key={o.id} className="flex items-center justify-between gap-2 rounded-xl border px-3 py-2" style={{ borderColor: css.border, background: css.surfaceMuted }}>
        <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: o.dot }} />
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-semibold truncate" style={{ color: css.fg }}>{o.item}</div>
          <div className="text-[7px]" style={{ color: css.mutedFg }}>{o.id}</div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[9px] font-bold" style={{ color: css.primary }}>{o.amount}</div>
          <div
            className="mt-0.5 rounded-full px-1.5 py-px text-[6px] font-bold uppercase tracking-wide inline-block"
            style={{ background: o.status === 'New' ? css.primaryMix10 : css.surfaceMuted, color: o.status === 'New' ? css.primary : css.mutedFg, border: `1px solid ${css.border}` }}
          >
            {o.status}
          </div>
        </div>
      </div>
    ))}
  </div>
)

const ProductsPreview = () => (
  <div className="w-full space-y-1.5">
    {[
      { name: 'Classic Tee',  stock: 38, pct: 76 },
      { name: 'Sneakers',     stock: 12, pct: 42 },
      { name: 'Linen Shirt',  stock: 24, pct: 58 },
    ].map((p) => (
      <div key={p.name} className="flex items-center gap-3 rounded-xl border px-3 py-2" style={{ borderColor: css.border, background: css.surfaceMuted }}>
        <div className="h-7 w-7 shrink-0 rounded-lg" style={{ background: css.primaryMix10 }} />
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-semibold" style={{ color: css.fg }}>{p.name}</div>
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full" style={{ background: css.border }}>
            <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: css.primary }} />
          </div>
        </div>
        <div className="text-[8px] font-bold shrink-0" style={{ color: css.mutedFg }}>{p.stock} left</div>
      </div>
    ))}
  </div>
)

const AnalyticsPreview = () => {
  const bars = [42, 58, 74, 52, 81, 67, 90]
  const days  = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  return (
    <div className="w-full space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <StatChip value="₨84.5k" label="Revenue" />
        <StatChip value="+23%"   label="vs last week" green />
      </div>
      <div className="rounded-xl border p-3" style={{ borderColor: css.border, background: css.surfaceMuted }}>
        <div className="mb-2 text-[8px] font-semibold uppercase tracking-widest" style={{ color: css.mutedFg }}>Weekly sales</div>
        <div className="flex items-end justify-between gap-1" style={{ height: 52 }}>
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 6 ? css.primary : css.primaryMix28 }} />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between">
          {days.map((d, i) => (
            <span key={i} className="text-[7px]" style={{ color: css.mutedFg }}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── STANDARD BENTO CARD ─────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
const BentoCard = ({ feature, index, inView, reducedMotion }) => {
  const [hovered, setHovered] = useState(false)
  const isWide = feature.desktopSpan === 'lg:col-span-6'

  return (
    <motion.article
      className={`group relative col-span-1 overflow-hidden rounded-2xl border flex flex-col ${feature.desktopSpan}`}
      style={{ borderColor: css.border, background: css.surface, willChange: 'transform' }}
      custom={index * 0.07}
      variants={fadeUp}
      initial={reducedMotion ? false : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -4, scale: 1.012 }}
      transition={{ type: 'spring', stiffness: 340, damping: 26 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      aria-label={feature.title}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in oklch, var(--primary) 6%, transparent), transparent 70%)' }}
        aria-hidden="true"
      />

      <div className={`flex flex-col ${isWide ? 'lg:flex-row lg:items-start lg:gap-8' : ''} gap-5 p-6 pb-0 flex-1`}>
        <div className={isWide ? 'lg:w-56 lg:shrink-0' : 'w-full'}>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: css.primary }}>
            {feature.eyebrow}
          </div>
          <h3 className="font-heading font-extrabold leading-tight tracking-[-0.03em]" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: css.fg }}>
            {feature.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: css.mutedFg, maxWidth: '26ch' }}>
            {feature.description}
          </p>
        </div>
        <div className={`flex-1 ${isWide ? 'lg:pt-1' : ''}`}>
          {feature.preview}
        </div>
      </div>

      <div className="pb-6" />

      <motion.div
        className="pointer-events-none absolute bottom-0 left-6 right-6 h-px"
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.4, ease: easePremium }}
        style={{ background: css.primary, transformOrigin: 'left' }}
        aria-hidden="true"
      />
    </motion.article>
  )
}

// ─── Feature config (5 cards — Storefront is its own card above) ──────────────
const FEATURES = [
  {
    id:          'checkout',
    eyebrow:     'Zero friction',
    title:       'Simple Checkout',
    description: 'Customers place orders in seconds. No waiting for DMs.',
    preview:     <CheckoutPreview />,
    desktopSpan: 'lg:col-span-3',
  },
  {
    id:          'link',
    eyebrow:     'One link, everywhere',
    title:       'Shareable Link',
    description: 'Share one link on Instagram, WhatsApp, or anywhere.',
    preview:     <LinkPreview />,
    desktopSpan: 'lg:col-span-3',
  },
  {
    id:          'orders',
    eyebrow:     'Nothing gets lost',
    title:       'Order Dashboard',
    description: 'Every order neatly tracked. Stop managing sales through DMs.',
    preview:     <OrdersPreview />,
    desktopSpan: 'lg:col-span-6',
  },
  {
    id:          'products',
    eyebrow:     'Stay organised',
    title:       'Product Management',
    description: 'Add, edit, and reorder your full catalog in moments.',
    preview:     <ProductsPreview />,
    desktopSpan: 'lg:col-span-5',
  },
  {
    id:          'analytics',
    eyebrow:     'Know your numbers',
    title:       'Analytics',
    description: "See what's selling, when, and how much at a glance.",
    preview:     <AnalyticsPreview />,
    desktopSpan: 'lg:col-span-7',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
const InsidetheBox = () => {
  const sectionRef    = useRef(null)
  const inView        = useInView(sectionRef, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()
  const isVisible     = reducedMotion || inView

  return (
    <section
      ref={sectionRef}
      aria-labelledby="inside-box-heading"
      className="relative overflow-hidden border-b"
      style={{ borderColor: css.border, background: css.bg }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, color-mix(in oklch, var(--primary) 5%, transparent), transparent 65%)' }}
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

        {/* Section header */}
        <motion.div
          className="mb-14 text-center"
          variants={staggerContainer}
          initial={reducedMotion ? false : 'hidden'}
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.div variants={revealSoft} className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: 'var(--primary)' }}>
            
            Inside The Box
          </motion.div>
          <motion.h2
            variants={revealSoft}
            id="inside-box-heading"
            className="font-heading font-extrabold tracking-[-0.05em]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1.04, color: css.fg }}
          >
            Everything in the box.
          </motion.h2>
          <motion.p
            variants={revealSoft}
            className="mx-auto mt-4 max-w-md text-base leading-7"
            style={{ color: css.mutedFg }}
          >
            Six tools, one platform. Everything an Instagram or WhatsApp seller
            needs to go from DMs to a real online business is already built in.
          </motion.p>
        </motion.div>

        {/* ── Bento grid — 12-col desktop  */}
        {/* Row 1 : dashboard mockup (8) │ storefront w/ real images (4)   */}
        {/* Row 2 : checkout (3) │ link (3) │ orders (6)                   */}
        {/* Row 3 : products (5) │ analytics (7)                           */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
          <DashboardMockupCard index={0} inView={isVisible} reducedMotion={reducedMotion} />
          <StorefrontCard      index={1} inView={isVisible} reducedMotion={reducedMotion} />
          {FEATURES.map((feature, i) => (
            <BentoCard
              key={feature.id}
              feature={feature}
              index={i + 2}
              inView={isVisible}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Bottom trust strip */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          variants={revealSoft}
          initial={reducedMotion ? false : 'hidden'}
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {['No domain required', 'No payment gateway setup', 'Free to start', 'Works on any device'].map((t) => (
            <span key={t} className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: css.mutedFg }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: css.primary, opacity: 0.8 }} />
              {t}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default InsidetheBox