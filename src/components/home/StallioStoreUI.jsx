import { useState, useEffect } from 'react'

// ─── Curated product images ──────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'p1',
    img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=340&fit=crop&auto=format&q=80',
    name: 'Classic Tee',
    price: '₨ 1,200',
    badge: 'New',
  },
  {
    id: 'p2',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=340&fit=crop&auto=format&q=80',
    name: 'Sneakers',
    price: '₨ 6,800',
    badge: 'Hot',
  },
  {
    id: 'p3',
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=340&fit=crop&auto=format&q=80',
    name: 'Summer Kurta',
    price: '₨ 2,400',
    badge: null,
  },
  {
    id: 'p4',
    img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=340&fit=crop&auto=format&q=80',
    name: 'Linen Shirt',
    price: '₨ 1,850',
    badge: 'Sale',
  },
  {
    id: 'p5',
    img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&h=340&fit=crop&auto=format&q=80',
    name: 'Casual Hoodie',
    price: '₨ 3,200',
    badge: null,
  },
  {
    id: 'p6',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=340&fit=crop&auto=format&q=80',
    name: 'Summer Dress',
    price: '₨ 2,100',
    badge: 'New',
  },
]

// ─── Store header ────────────────────────────────────────────────────────────
const StoreHeader = ({
  title = 'Your Store',
  subtitle = 'stallio.store/yourbrand',
}) => (
  <div
    className="flex shrink-0 items-center justify-between border-b px-4 py-3"
    style={{
      borderColor: 'var(--border)',
    }}
  >
    <div>
      <div
        className="font-heading text-[11px] font-bold"
        style={{
          color: 'var(--foreground)',
        }}
      >
        {title}
      </div>

      <div
        className="mt-0.5 text-[8px]"
        style={{
          color: 'var(--muted-foreground)',
        }}
      >
        {subtitle}
      </div>
    </div>

    <span
      className="flex h-6 w-6 items-center justify-center rounded-full text-[10px]"
      style={{
        background:
          'color-mix(in oklch, var(--primary) 10%, var(--surface))',
        color: 'var(--primary)',
      }}
    >
      ↗
    </span>
  </div>
)

// ─── Product card ────────────────────────────────────────────────────────────
const ProductCard = ({ product, small = false }) => (
  <div
    className="flex h-full flex-col overflow-hidden rounded-xl border"
    style={{
      background: 'var(--surface)',
      borderColor: 'var(--border)',
      width: '100%',
    }}
  >
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio: '1 / 0.9',
      }}
    >
      <img
        src={product.img}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        loading="lazy"
        style={{
          display: 'block',
        }}
        onError={(e) => {
          e.target.style.display = 'none'

          e.target.parentElement.style.background =
            'linear-gradient(135deg, color-mix(in oklch, var(--foreground) 4%, var(--surface)), color-mix(in oklch, var(--primary) 8%, var(--surface)))'
        }}
      />

      {product.badge && (
        <span
          className="absolute left-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide"
          style={{
            background:
              'color-mix(in oklch, var(--primary) 14%, var(--surface))',
            color: 'var(--primary)',
            border:
              '1px solid color-mix(in oklch, var(--primary) 22%, var(--border))',
          }}
        >
          {product.badge}
        </span>
      )}
    </div>

    <div className="flex flex-1 flex-col justify-between p-2">
      <div
        className="text-[9px] font-semibold leading-tight"
        style={{
          color: 'var(--foreground)',
        }}
      >
        {product.name}
      </div>

      <div
        className="mt-0.5 text-[8px] font-bold"
        style={{
          color: 'var(--primary)',
        }}
      >
        {product.price}
      </div>
    </div>
  </div>
)

// ─── Hero store UI ───────────────────────────────────────────────────────────
export const HeroStoreUI = () => {
  const [scrollOffset, setScrollOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollOffset((prev) =>
        prev >= PRODUCTS.length - 2 ? 0 : prev + 1,
      )
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const visibleProducts = [
    PRODUCTS[scrollOffset % PRODUCTS.length],
    PRODUCTS[(scrollOffset + 1) % PRODUCTS.length],
    PRODUCTS[(scrollOffset + 2) % PRODUCTS.length],
    PRODUCTS[(scrollOffset + 3) % PRODUCTS.length],
  ]

  return (
    <>
      <StoreHeader />

      {/* Featured banner */}
      <div
        className="mx-3 mt-2 shrink-0 rounded-lg border px-3 py-2"
        style={{
          background: 'var(--surface-muted)',
          borderColor: 'var(--border)',
        }}
      >
        <div
          className="text-[8px] font-semibold uppercase tracking-[0.16em]"
          style={{
            color: 'var(--muted-foreground)',
          }}
        >
          Featured Collection
        </div>

        <div
          className="mt-0.5 font-heading text-[11px] font-extrabold"
          style={{
            color: 'var(--foreground)',
          }}
        >
          Summer '25 Arrivals
        </div>
      </div>

      {/* Product grid */}
      <div className="flex-1 overflow-hidden px-3 py-2">
        <div
          className="grid grid-cols-2 gap-2"
          style={{
            transition:
              'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id + scrollOffset}
              product={product}
            />
          ))}
        </div>
      </div>

      {/* Cart bar */}
      <div
        className="mx-3 mb-3 flex shrink-0 items-center justify-between rounded-lg border px-3 py-2"
        style={{
          background:
            'color-mix(in oklch, var(--primary) 6%, var(--surface))',
          borderColor:
            'color-mix(in oklch, var(--primary) 20%, var(--border))',
        }}
      >
        <span
          className="text-[9px] font-medium"
          style={{
            color: 'var(--foreground)',
          }}
        >
          View cart
        </span>

        <span
          className="font-heading text-[11px] font-bold"
          style={{
            color: 'var(--primary)',
          }}
        >
          ₨ 4,500
        </span>
      </div>
    </>
  )
}

// ─── Starting Out UI ─────────────────────────────────────────────────────────
const FlowStep = ({
  label,
  active,
  done,
  isLast,
}) => (
  <div className="flex flex-col items-center">
    <div
      className="flex h-8 w-full items-center justify-center rounded-lg border text-[9px] font-semibold"
      style={{
        borderColor: active
          ? 'color-mix(in oklch, var(--primary) 35%, var(--border))'
          : 'var(--border)',

        background: active
          ? 'color-mix(in oklch, var(--primary) 8%, var(--surface))'
          : done
            ? 'color-mix(in oklch, var(--primary) 4%, var(--surface))'
            : 'var(--surface-muted)',

        color:
          active || done
            ? 'var(--primary)'
            : 'var(--muted-foreground)',
      }}
    >
      {done && !active ? '✓ ' : ''}
      {label}
    </div>

    {!isLast && (
      <div
        className="my-1 text-[8px]"
        style={{
          color: 'var(--muted-foreground)',
        }}
      >
        ↓
      </div>
    )}
  </div>
)

export const StartingOutUI = () => (
  <>
    <StoreHeader
      title="New Store"
      subtitle="Getting started"
    />

    <div className="flex flex-1 flex-col justify-center px-4 py-6">
      <FlowStep
        label="Create Store"
        done
      />

      <FlowStep
        label="Add Products"
        done
      />

      <FlowStep
        label="Share Link"
        active
        isLast
      />
    </div>
  </>
)

export const SocialSellerUI = () => (
  <>
    <StoreHeader
      title="Orders"
      subtitle="Today"
    />

    <div className="flex flex-1 flex-col justify-center gap-1 px-4 py-4">
      <FlowStep
        label="Instagram DM"
        done
      />

      <FlowStep
        label="Stallio Store"
        done
        active={false}
      />

      <FlowStep
        label="New Order"
        active
        isLast
      />

      <div
        className="mt-4 rounded-lg border p-3"
        style={{
          background: 'var(--surface-muted)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-[9px] font-semibold"
            style={{
              color: 'var(--muted-foreground)',
            }}
          >
            Latest order
          </span>

          <span
            className="text-[8px] font-bold"
            style={{
              color: 'var(--primary)',
            }}
          >
            #1042
          </span>
        </div>

        <div
          className="mt-2 font-heading text-base font-extrabold"
          style={{
            color: 'var(--foreground)',
          }}
        >
          ₨ 2,800
        </div>
      </div>
    </div>
  </>
)

export const GrowingBusinessUI = () => (
  <>
    <StoreHeader
      title="Dashboard"
      subtitle="This month"
    />

    <div className="flex-1 px-4 py-4">
      <div
        className="rounded-xl border p-4"
        style={{
          background:
            'color-mix(in oklch, var(--primary) 5%, var(--surface))',
          borderColor:
            'color-mix(in oklch, var(--primary) 18%, var(--border))',
        }}
      >
        <div
          className="text-[8px] font-semibold uppercase tracking-[0.18em]"
          style={{
            color: 'var(--muted-foreground)',
          }}
        >
          Revenue
        </div>

        <div
          className="mt-1 font-heading text-2xl font-extrabold tracking-tight"
          style={{
            color: 'var(--foreground)',
          }}
        >
          ₨84,500
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          {
            label: '42 Orders',
            sub: '↑ 8.2%',
          },
          {
            label: '128 Products',
            sub: '↑ 12.4%',
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border p-3"
            style={{
              background: 'var(--surface-muted)',
              borderColor: 'var(--border)',
            }}
          >
            <div
              className="text-[10px] font-semibold"
              style={{
                color: 'var(--foreground)',
              }}
            >
              {item.label}
            </div>

            <div
              className="mt-0.5 text-[8px] font-medium"
              style={{
                color: 'var(--primary)',
              }}
            >
              {item.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border p-2"
            style={{
              borderColor: 'var(--border)',
            }}
          >
            <div
              className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-md"
              style={{
                background: 'var(--border)',
              }}
            >
              <img
                src={PRODUCTS[i].img}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div
                className="h-1 w-16 rounded-full"
                style={{
                  background: 'var(--foreground)',
                  opacity: 0.1,
                }}
              />

              <div
                className="mt-1 h-1 w-10 rounded-full"
                style={{
                  background: 'var(--primary)',
                  opacity: 0.4,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
)

// ─── Store Transform UI ──────────────────────────────────────────────────────
export const StoreTransformUI = () => (
  <>
    <StoreHeader
      title="YOUR STORE"
      subtitle="stallio.store/yourbrand"
    />

    <div className="flex flex-col px-3 py-3">

      {/* Featured section */}
      <div
        className="mb-2 rounded-lg border px-3 py-2"
        style={{
          background: 'var(--surface-muted)',
          borderColor: 'var(--border)',
        }}
      >
        <div
          className="text-[7px] font-semibold uppercase tracking-[0.14em]"
          style={{
            color: 'var(--muted-foreground)',
          }}
        >
          Featured
        </div>

        <div
          className="mt-0.5 font-heading text-[10px] font-extrabold"
          style={{
            color: 'var(--foreground)',
          }}
        >
          Summer Collection
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {PRODUCTS.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {/* Store CTA */}
      <div
        className="mt-2 flex items-center justify-between rounded-lg border px-3 py-2"
        style={{
          background:
            'color-mix(in oklch, var(--primary) 6%, var(--surface))',
          borderColor:
            'color-mix(in oklch, var(--primary) 20%, var(--border))',
        }}
      >
        <span
          className="text-[8px] font-medium"
          style={{
            color: 'var(--foreground)',
          }}
        >
          4 products
        </span>

        <span
          className="text-[9px] font-bold"
          style={{
            color: 'var(--primary)',
          }}
        >
          View store →
        </span>
      </div>
    </div>
  </>
)

// ─── Screen variants ─────────────────────────────────────────────────────────
const screens = {
  hero: HeroStoreUI,
  'starting-out': StartingOutUI,
  'social-seller': SocialSellerUI,
  'growing-business': GrowingBusinessUI,
  store: StoreTransformUI,
}

const StallioStoreUI = ({ variant = 'hero' }) => {
  const Screen = screens[variant] ?? HeroStoreUI

  return <Screen />
}

export default StallioStoreUI