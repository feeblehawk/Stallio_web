import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  HiArrowTopRightOnSquare,
  HiArrowDown,
  HiCheck,
  HiArrowTrendingUp,
} from 'react-icons/hi2'
import { css } from '../utils/cssTokens'

// ─── Curated product images ──────────────────────────────────────────────────
const PRODUCT_IMAGES = {
  p1: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=340&fit=crop&auto=format&q=80',
  p2: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=340&fit=crop&auto=format&q=80',
  p3: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=340&fit=crop&auto=format&q=80',
  p4: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=340&fit=crop&auto=format&q=80',
  p5: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&h=340&fit=crop&auto=format&q=80',
  p6: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=340&fit=crop&auto=format&q=80',
}

const buildProducts = (t) => [
  { id: 'p1', img: PRODUCT_IMAGES.p1, nameKey: 'classicTee',  price: '$15',  badgeKey: 'badgeNew' },
  { id: 'p2', img: PRODUCT_IMAGES.p2, nameKey: 'sneakers',    price: '$100', badgeKey: 'badgeHot' },
  { id: 'p3', img: PRODUCT_IMAGES.p3, nameKey: 'classicSuit', price: '$150', badgeKey: null },
  { id: 'p4', img: PRODUCT_IMAGES.p4, nameKey: 'linenShirt',  price: '$18',  badgeKey: 'badgeSale' },
  { id: 'p5', img: PRODUCT_IMAGES.p5, nameKey: 'casualHoodie',price: '$60',  badgeKey: null },
  { id: 'p6', img: PRODUCT_IMAGES.p6, nameKey: 'summerDress', price: '$20',  badgeKey: 'badgeNew' },
]

// ─── Store header ─────────────────────────────────────────────────────────────
const StoreHeader = ({ titleKey, subtitleKey }) => {
  const { t } = useTranslation('common')
  return (
    <div
      className="flex shrink-0 items-center justify-between border-b px-4 py-3"
      style={{ borderColor: css.border }}
    >
      <div>
        <div
          className="font-heading text-[11px] font-bold"
          style={{ color: css.fg }}
        >
          {t(`StallioStoreUI.${titleKey}`)}
        </div>

        <div
          className="mt-0.5 text-[8px]"
          style={{ color: css.mutedFg }}
        >
          {t(`StallioStoreUI.${subtitleKey}`)}
        </div>
      </div>

      <span
        className="flex h-6 w-6 items-center justify-center rounded-full"
        style={{
          background: css.p10,
          color: css.primary,
        }}
        aria-hidden="true"
      >
        <HiArrowTopRightOnSquare size={12} />
      </span>
    </div>
  )
}

// ─── Product card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product }) => {
  const { t } = useTranslation('common')
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-xl border"
      style={{
        background: css.surface,
        borderColor: css.border,
        width: '100%',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '1 / 0.9' }}
      >
        <img
          src={product.img}
          alt={t(`StallioStoreUI.${product.nameKey}`)}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
          style={{ display: 'block' }}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.style.background =
              'linear-gradient(135deg, color-mix(in oklch, var(--foreground) 4%, var(--surface)), color-mix(in oklch, var(--primary) 8%, var(--surface)))'
          }}
        />

        {product.badgeKey && (
          <span
            className="absolute left-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide"
            style={{
              background: css.p14,
              color: css.primary,
              border: `1px solid ${css.p20}`,
            }}
          >
            {t(`StallioStoreUI.${product.badgeKey}`)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-2">
        <div
          className="text-[9px] font-semibold leading-tight"
          style={{ color: css.fg }}
        >
          {t(`StallioStoreUI.${product.nameKey}`)}
        </div>

        <div
          className="mt-0.5 text-[8px] font-bold"
          style={{ color: css.primary }}
        >
          {product.price}
        </div>
      </div>
    </div>
  )
}

// ─── Hero store UI ────────────────────────────────────────────────────────────
export const HeroStoreUI = () => {
  const { t } = useTranslation('common')
  const [scrollOffset, setScrollOffset] = useState(0)
  const PRODUCTS = buildProducts(t)

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollOffset((prev) =>
        prev >= PRODUCTS.length - 2 ? 0 : prev + 1,
      )
    }, 2500)
    return () => clearInterval(interval)
  }, [PRODUCTS.length])

  const visibleProducts = [
    PRODUCTS[scrollOffset % PRODUCTS.length],
    PRODUCTS[(scrollOffset + 1) % PRODUCTS.length],
    PRODUCTS[(scrollOffset + 2) % PRODUCTS.length],
    PRODUCTS[(scrollOffset + 3) % PRODUCTS.length],
  ]

  return (
    <>
      <StoreHeader titleKey="headerYourStore" subtitleKey="headerStoreUrl" />

      {/* Featured banner */}
      <div
        className="mx-3 mt-2 shrink-0 rounded-lg border px-3 py-2"
        style={{
          background: css.surfaceMuted,
          borderColor: css.border,
        }}
      >
        <div
          className="text-[8px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: css.mutedFg }}
        >
          {t('StallioStoreUI.featuredCollection')}
        </div>

        <div
          className="mt-0.5 font-heading text-[11px] font-extrabold"
          style={{ color: css.fg }}
        >
          {t('StallioStoreUI.summerArrivals')}
        </div>
      </div>

      {/* Product grid */}
      <div className="flex-1 overflow-hidden px-3 py-2">
        <div
          className="grid grid-cols-2 gap-2"
          style={{ transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
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
          background: css.p8,
          borderColor: css.p20,
        }}
      >
        <span
          className="text-[9px] font-medium"
          style={{ color: css.fg }}
        >
          {t('StallioStoreUI.viewCart')}
        </span>

        <span
          className="font-heading text-[11px] font-bold"
          style={{ color: css.primary }}
        >
          $500
        </span>
      </div>
    </>
  )
}

// ─── Flow step ────────────────────────────────────────────────────────────────
const FlowStep = ({ label, active, done, isLast }) => (
  <div className="flex flex-col items-center">
    <div
      className="flex h-8 w-full items-center justify-center rounded-lg border gap-1 text-[9px] font-semibold"
      style={{
        borderColor: active ? css.p35 : css.border,
        background: active
          ? css.p8
          : done
          ? css.p8
          : css.surfaceMuted,
        color: active || done ? css.primary : css.mutedFg,
      }}
    >
      {done && !active && (
        <HiCheck size={10} aria-hidden="true" />
      )}
      {label}
    </div>

    {!isLast && (
      <div
        className="my-1 flex items-center justify-center"
        style={{ color: css.mutedFg }}
        aria-hidden="true"
      >
        <HiArrowDown size={10} />
      </div>
    )}
  </div>
)

// ─── Starting Out UI ──────────────────────────────────────────────────────────
export const StartingOutUI = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <StoreHeader titleKey="headerNewStore" subtitleKey="headerGettingStarted" />

      <div className="flex flex-1 flex-col justify-center px-4 py-6">
        <FlowStep label={t('StallioStoreUI.stepCreateStore')} done />
        <FlowStep label={t('StallioStoreUI.stepAddProducts')} done />
        <FlowStep label={t('StallioStoreUI.stepShareLink')} active isLast />
      </div>
    </>
  )
}

// ─── Social Seller UI ─────────────────────────────────────────────────────────
export const SocialSellerUI = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <StoreHeader titleKey="headerOrders" subtitleKey="headerToday" />

      <div className="flex flex-1 flex-col justify-center gap-1 px-4 py-4">
        <FlowStep label={t('StallioStoreUI.stepInstagramDm')} done />
        <FlowStep label={t('StallioStoreUI.stepStallioStore')} done active={false} />
        <FlowStep label={t('StallioStoreUI.stepNewOrder')} active isLast />

        <div
          className="mt-4 rounded-lg border p-3"
          style={{
            background: css.surfaceMuted,
            borderColor: css.border,
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-[9px] font-semibold"
              style={{ color: css.mutedFg }}
            >
              {t('StallioStoreUI.latestOrder')}
            </span>

            <span
              className="text-[8px] font-bold"
              style={{ color: css.primary }}
            >
              #1042
            </span>
          </div>

          <div
            className="mt-2 font-heading text-base font-extrabold"
            style={{ color: css.fg }}
          >
            ₨ 2,800
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Growing Business UI ──────────────────────────────────────────────────────
export const GrowingBusinessUI = () => {
  const { t } = useTranslation('common')
  const PRODUCTS = buildProducts(t)

  const stats = [
    { labelKey: 'stat42Orders',    sub: '↑ 8.2%' },
    { labelKey: 'stat128Products', sub: '↑ 12.4%' },
  ]

  return (
    <>
      <StoreHeader titleKey="headerDashboard" subtitleKey="headerThisMonth" />

      <div className="flex-1 px-4 py-4">
        <div
          className="rounded-xl border p-4"
          style={{
            background: css.p8,
            borderColor: css.p20,
          }}
        >
          <div
            className="text-[8px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: css.mutedFg }}
          >
            {t('StallioStoreUI.revenue')}
          </div>

          <div
            className="mt-1 font-heading text-2xl font-extrabold tracking-tight"
            style={{ color: css.fg }}
          >
            ₨84,500
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {stats.map((item) => (
            <div
              key={item.labelKey}
              className="rounded-lg border p-3"
              style={{
                background: css.surfaceMuted,
                borderColor: css.border,
              }}
            >
              <div
                className="text-[10px] font-semibold"
                style={{ color: css.fg }}
              >
                {t(`StallioStoreUI.${item.labelKey}`)}
              </div>

              <div
                className="mt-0.5 flex items-center gap-0.5 text-[8px] font-medium"
                style={{ color: css.primary }}
              >
                <HiArrowTrendingUp size={9} aria-hidden="true" />
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
              style={{ borderColor: css.border }}
            >
              <div
                className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-md"
                style={{ background: css.border }}
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
                  style={{ background: css.fg, opacity: 0.1 }}
                />
                <div
                  className="mt-1 h-1 w-10 rounded-full"
                  style={{ background: css.primary, opacity: 0.4 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── Store Transform UI ───────────────────────────────────────────────────────
export const StoreTransformUI = () => {
  const { t } = useTranslation('common')
  const PRODUCTS = buildProducts(t)

  return (
    <>
      <StoreHeader titleKey="headerYourStore" subtitleKey="headerStoreUrl" />

      <div className="flex flex-col px-3 py-3">

        {/* Featured section */}
        <div
          className="mb-2 rounded-lg border px-3 py-2"
          style={{
            background: css.surfaceMuted,
            borderColor: css.border,
          }}
        >
          <div
            className="text-[7px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: css.mutedFg }}
          >
            {t('StallioStoreUI.featured')}
          </div>

          <div
            className="mt-0.5 font-heading text-[10px] font-extrabold"
            style={{ color: css.fg }}
          >
            {t('StallioStoreUI.summerCollection')}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Store CTA */}
        <div
          className="mt-2 flex items-center justify-between rounded-lg border px-3 py-2"
          style={{
            background: css.p8,
            borderColor: css.p20,
          }}
        >
          <span
            className="text-[8px] font-medium"
            style={{ color: css.fg }}
          >
            {t('StallioStoreUI.nProducts', { count: 4 })}
          </span>

          <span
            className="flex items-center gap-0.5 text-[9px] font-bold"
            style={{ color: css.primary }}
          >
            {t('StallioStoreUI.viewStore')}
            <HiArrowTopRightOnSquare size={9} aria-hidden="true" />
          </span>
        </div>
      </div>
    </>
  )
}

// ─── Screen variants ──────────────────────────────────────────────────────────
const screens = {
  hero:              HeroStoreUI,
  'starting-out':    StartingOutUI,
  'social-seller':   SocialSellerUI,
  'growing-business':GrowingBusinessUI,
  store:             StoreTransformUI,
}

const StallioStoreUI = ({ variant = 'hero' }) => {
  const Screen = screens[variant] ?? HeroStoreUI
  return <Screen />
}

export default StallioStoreUI