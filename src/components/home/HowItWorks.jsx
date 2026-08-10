import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'
import { easePremium } from '../../utils/motionVariants'
import { FaInstagram } from 'react-icons/fa6'

const SCENES = [
  {
    id: 'social',
    num: '01',
    label: 'Social Post',
    title: 'Customer sees your product',
    caption: 'Discover your products on Instagram or WhatsApp with a clean, branded look.',
  },
  {
    id: 'link',
    num: '02',
    label: 'One Link',
    title: 'They tap the link in bio',
    caption: 'One memorable link in your bio replaces repetitive DM price inquiries.',
  },
  {
    id: 'store',
    num: '03',
    label: 'Your Store',
    title: 'Storefront opens instantly',
    caption: 'Customers browse your full catalog with real photos, clear prices, and details.',
  },
  {
    id: 'checkout',
    num: '04',
    label: 'Checkout',
    title: 'Frictionless order placement',
    caption: 'Shoppers select options and place orders in seconds without waiting for DMs.',
  },
  {
    id: 'confirmed',
    num: '05',
    label: 'Order Confirmed',
    title: 'You get notified instantly',
    caption: 'Orders land neatly organized in your dashboard with customer notifications sent.',
  },
]

const PRODUCTS = [
  {
    name: 'Classic Tee',
    price: '₨ 1,200',
    img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=340&fit=crop&auto=format&q=80',
    badge: 'New',
  },
  {
    name: 'Sneakers',
    price: '₨ 6,800',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=340&fit=crop&auto=format&q=80',
    badge: 'Hot',
  },
  {
    name: 'Summer Kurta',
    price: '₨ 2,400',
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=340&fit=crop&auto=format&q=80',
    badge: null,
  },
  {
    name: 'Linen Shirt',
    price: '₨ 1,850',
    img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=340&fit=crop&auto=format&q=80',
    badge: 'Sale',
  },
]

// ─── Scene 1: Social Post ───────────────────────────────────────────────────
function SceneSocial({ reducedMotion }) {
  return (
    <div className="flex h-full flex-col justify-between p-0.5 sm:p-1">
      <div className="flex items-center justify-between pb-1.5 sm:pb-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-bold text-white shadow-sm"
            style={{ background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)' }}
          >
            <FaInstagram />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-bold" style={{ color: 'var(--foreground)' }}>
              yourshop
            </div>
            <div className="text-[8px] sm:text-[9px]" style={{ color: 'var(--muted-foreground)' }}>
              Instagram Post • 2h ago
            </div>
          </div>
        </div>
        <span
          className="rounded-full px-1.5 sm:px-2 py-0.5 text-[7px] sm:text-[8px] font-semibold"
          style={{
            background: 'color-mix(in oklch, var(--primary) 10%, var(--surface))',
            color: 'var(--primary)',
            border: '1px solid color-mix(in oklch, var(--primary) 20%, var(--border))',
          }}
        >
          Featured
        </span>
      </div>

      <div className="relative mb-1.5 sm:mb-2 flex-1 overflow-hidden rounded-lg sm:rounded-xl border" style={{ borderColor: 'var(--border)' }}>
        <img src={PRODUCTS[0].img} alt={PRODUCTS[0].name} className="h-full w-full object-cover" />
        <div
          className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 rounded-full px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-bold shadow-md"
          style={{
            background: 'color-mix(in oklch, var(--surface) 90%, transparent)',
            color: 'var(--foreground)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {PRODUCTS[0].name} • {PRODUCTS[0].price}
        </div>
      </div>

      <div className="space-y-1 sm:space-y-1.5">
        <p className="text-[9px] sm:text-[10px] leading-tight sm:leading-relaxed truncate" style={{ color: 'var(--muted-foreground)' }}>
          <span className="font-semibold" style={{ color: 'var(--foreground)' }}>yourshop</span> Summer collection is live! 👇
        </p>

        <motion.div
          className="flex items-center justify-between rounded-lg sm:rounded-xl border px-2 sm:px-2.5 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-semibold shadow-sm"
          style={{
            borderColor: 'color-mix(in oklch, var(--primary) 30%, var(--border))',
            background: 'color-mix(in oklch, var(--primary) 8%, var(--surface))',
            color: 'var(--primary)',
          }}
          animate={reducedMotion ? undefined : { scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        >
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--primary)' }} />
            <span className="truncate max-w-[110px] sm:max-w-none">stallio.shop/yourshop</span>
          </div>
          <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider shrink-0">Bio ↗</span>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Scene 2: Bio Link Tap ──────────────────────────────────────────────────
function SceneLink({ reducedMotion }) {
  return (
    <div className="flex h-full flex-col justify-between p-0.5 sm:p-1">
      <div className="text-center">
        <div
          className="mx-auto mb-1 sm:mb-1.5 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl border font-heading text-[10px] sm:text-[11px] font-extrabold tracking-widest"
          style={{
            background: 'color-mix(in oklch, var(--primary) 10%, var(--surface))',
            borderColor: 'color-mix(in oklch, var(--primary) 25%, var(--border))',
            color: 'var(--primary)',
          }}
        >
          STL
        </div>
        <div className="text-[11px] sm:text-xs font-bold" style={{ color: 'var(--foreground)' }}>
          @yourshop
        </div>
        <div className="text-[8px] sm:text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
          Official Stallio Store Link
        </div>
      </div>

      <div className="relative my-1.5 sm:my-2 space-y-1.5 sm:space-y-2">
        <motion.div
          className="relative flex items-center justify-between rounded-lg sm:rounded-xl border p-2 sm:p-2.5 shadow-md"
          style={{
            borderColor: 'var(--primary)',
            background: 'color-mix(in oklch, var(--primary) 12%, var(--surface))',
          }}
          animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg text-xs"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              🛍️
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-bold" style={{ color: 'var(--foreground)' }}>
                Visit Storefront
              </div>
              <div className="text-[8px] sm:text-[9px]" style={{ color: 'var(--primary)' }}>
                stallio.shop/yourshop
              </div>
            </div>
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold" style={{ color: 'var(--primary)' }}>
            Open ↗
          </span>
        </motion.div>

        <div
          className="flex items-center justify-between rounded-lg border px-2 sm:px-2.5 py-1 sm:py-1.5 text-[8px] sm:text-[10px]"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
        >
          <span style={{ color: 'var(--muted-foreground)' }}>⚡ Instant loading</span>
          <span className="font-semibold" style={{ color: 'var(--foreground)' }}>No app needed</span>
        </div>

        <div
          className="flex items-center justify-between rounded-lg border px-2 sm:px-2.5 py-1 sm:py-1.5 text-[8px] sm:text-[10px]"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
        >
          <span style={{ color: 'var(--muted-foreground)' }}>📦 COD & Card</span>
          <span className="font-semibold" style={{ color: 'var(--foreground)' }}>Verified Store</span>
        </div>
      </div>

      <div className="text-center text-[8px] sm:text-[9px]" style={{ color: 'var(--muted-foreground)' }}>
        Powered by <span className="font-bold" style={{ color: 'var(--foreground)' }}>Stallio</span>
      </div>
    </div>
  )
}

// ─── Scene 3: Stallio Storefront ────────────────────────────────────────────
function SceneStore() {
  return (
    <div className="flex h-full flex-col justify-between p-0.5 sm:p-1">
      <div className="flex items-center justify-between border-b pb-1 sm:pb-1.5" style={{ borderColor: 'var(--border)' }}>
        <div>
          <div className="font-heading text-[10px] sm:text-[11px] font-bold" style={{ color: 'var(--foreground)' }}>
            Your Shop
          </div>
          <div className="text-[7px] sm:text-[8px]" style={{ color: 'var(--muted-foreground)' }}>
            stallio.shop/yourshop
          </div>
        </div>
        <span
          className="rounded-full px-1.5 sm:px-2 py-0.5 text-[7px] sm:text-[8px] font-bold"
          style={{
            background: 'color-mix(in oklch, var(--primary) 12%, var(--surface))',
            color: 'var(--primary)',
          }}
        >
          Verified
        </span>
      </div>

      <div
        className="my-1 sm:my-1.5 flex items-center gap-1 sm:gap-1.5 rounded-lg border px-1.5 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-[10px]"
        style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)', color: 'var(--muted-foreground)' }}
      >
        <span>🔍</span>
        <span>Search collection…</span>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-1 sm:gap-1.5 overflow-hidden">
        {PRODUCTS.slice(0, 4).map((product) => (
          <div
            key={product.name}
            className="flex flex-col overflow-hidden rounded-md sm:rounded-lg border"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-between p-0.5 sm:p-1">
              <div className="text-[8px] sm:text-[9px] font-semibold leading-tight truncate" style={{ color: 'var(--foreground)' }}>
                {product.name}
              </div>
              <div className="text-[7px] sm:text-[8px] font-bold" style={{ color: 'var(--primary)' }}>
                {product.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-1 sm:mt-1.5 flex items-center justify-between rounded-lg border px-2 sm:px-2.5 py-1 sm:py-1.5 shadow-sm"
        style={{
          background: 'color-mix(in oklch, var(--primary) 8%, var(--surface))',
          borderColor: 'color-mix(in oklch, var(--primary) 22%, var(--border))',
        }}
      >
        <span className="text-[8px] sm:text-[9px] font-medium" style={{ color: 'var(--foreground)' }}>
          1 item in cart
        </span>
        <span className="font-heading text-[9px] sm:text-[10px] font-bold" style={{ color: 'var(--primary)' }}>
          ₨ 1,200 →
        </span>
      </div>
    </div>
  )
}

// ─── Scene 4: Frictionless Checkout ─────────────────────────────────────────
function SceneCheckout() {
  const fields = [
    { label: 'Full Name', value: 'Amna Khan' },
    { label: 'City / Delivery', value: 'Lahore (Cash on Delivery)' },
    { label: 'Phone / WhatsApp', value: '0300-1234567' },
  ]

  return (
    <div className="flex h-full flex-col justify-between p-0.5 sm:p-1">
      <div className="flex items-center justify-between border-b pb-1 sm:pb-1.5" style={{ borderColor: 'var(--border)' }}>
        <div className="text-[10px] sm:text-[11px] font-bold" style={{ color: 'var(--foreground)' }}>
          Order Checkout
        </div>
        <span className="text-[8px] sm:text-[9px] font-medium" style={{ color: 'var(--muted-foreground)' }}>
          Step 2 of 2
        </span>
      </div>

      <div
        className="my-1 sm:my-1.5 flex items-center gap-1.5 sm:gap-2 rounded-lg border p-1.5 sm:p-2"
        style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)' }}
      >
        <img src={PRODUCTS[0].img} alt={PRODUCTS[0].name} className="h-6 w-6 sm:h-8 sm:w-8 rounded-md object-cover" />
        <div className="flex-1 min-w-0">
          <div className="text-[9px] sm:text-[10px] font-bold truncate" style={{ color: 'var(--foreground)' }}>
            {PRODUCTS[0].name}
          </div>
          <div className="text-[8px] sm:text-[9px]" style={{ color: 'var(--muted-foreground)' }}>
            Qty: 1 • Size: M
          </div>
        </div>
        <div className="font-heading text-[9px] sm:text-[10px] font-bold shrink-0" style={{ color: 'var(--primary)' }}>
          {PRODUCTS[0].price}
        </div>
      </div>

      <div className="space-y-0.5 sm:space-y-1">
        {fields.map((field) => (
          <div key={field.label} className="space-y-0.5">
            <div className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
              {field.label}
            </div>
            <div
              className="rounded-md sm:rounded-lg border px-1.5 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-medium truncate"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--foreground)' }}
            >
              {field.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-1.5 sm:mt-2">
        <div
          className="flex items-center justify-center gap-1 sm:gap-1.5 rounded-lg py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-bold shadow-md"
          style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          <span>Complete Order</span>
          <span>→</span>
        </div>
      </div>
    </div>
  )
}

// ─── Scene 5: Order Confirmed ────────────────────────────────────────────────
function SceneConfirmed() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-1 sm:p-2 text-center">
      <motion.div
        className="mb-1.5 sm:mb-2 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full border shadow-lg"
        style={{
          borderColor: 'var(--primary)',
          background: 'color-mix(in oklch, var(--primary) 12%, var(--surface))',
          boxShadow: '0 0 24px color-mix(in oklch, var(--primary) 25%, transparent)',
        }}
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        <span className="text-base sm:text-xl font-bold" style={{ color: 'var(--primary)' }}>
          ✓
        </span>
      </motion.div>

      <h3 className="font-heading text-xs sm:text-sm font-extrabold" style={{ color: 'var(--foreground)' }}>
        Order Confirmed!
      </h3>
      <div
        className="mt-1 inline-flex items-center gap-1 rounded-full border px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-bold tracking-wider"
        style={{
          borderColor: 'color-mix(in oklch, var(--primary) 25%, var(--border))',
          background: 'color-mix(in oklch, var(--primary) 8%, var(--surface))',
          color: 'var(--primary)',
        }}
      >
        Order #STL-2847
      </div>

      <p className="mt-1 max-w-[180px] sm:max-w-[200px] text-[8px] sm:text-[10px] leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
        Confirmation sent to <span className="font-semibold" style={{ color: 'var(--foreground)' }}>Amna Khan</span> via WhatsApp automatically.
      </p>

      <motion.div
        className="mt-2 flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border px-2 sm:px-2.5 py-1 sm:py-1.5 shadow-lg"
        style={{
          background: 'color-mix(in oklch, var(--surface) 95%, transparent)',
          borderColor: 'color-mix(in oklch, var(--primary) 25%, var(--border))',
        }}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <span
          className="flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-md text-[8px] sm:text-[9px]"
          style={{ background: 'color-mix(in oklch, var(--primary) 14%, var(--surface))', color: 'var(--primary)' }}
        >
          🔔
        </span>
        <div className="text-left">
          <div className="text-[8px] sm:text-[9px] font-bold" style={{ color: 'var(--foreground)' }}>
            New Order Received
          </div>
          <div className="text-[7px] sm:text-[8px]" style={{ color: 'var(--muted-foreground)' }}>
            ₨ 1,200 • Just now
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const SCENE_COMPONENTS = [SceneSocial, SceneLink, SceneStore, SceneCheckout, SceneConfirmed]

export default function HowItWorks() {
  const containerRef = useRef(null)
  const stageRef = useRef(null)
  const trackRef = useRef(null)
  const mobileTrackRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const [isMobile, setIsMobile] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [stageDimensions, setStageDimensions] = useState({ stageWidth: 0, cardWidth: 340, gap: 24 })

  // Track window resize and measure stage dimensions dynamically without magic hardcoded numbers
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      if (stageRef.current && trackRef.current) {
        const stageW = stageRef.current.clientWidth
        const firstCard = trackRef.current.firstElementChild
        const cWidth = firstCard ? firstCard.offsetWidth : 340
        setStageDimensions({ stageWidth: stageW, cardWidth: cWidth, gap: 24 })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ResizeObserver for exact stage dimension updates
  useEffect(() => {
    if (!stageRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const stageW = entry.contentRect.width
        const firstCard = trackRef.current?.firstElementChild
        const cWidth = firstCard ? firstCard.offsetWidth : 340
        setStageDimensions({ stageWidth: stageW, cardWidth: cWidth, gap: 24 })
      }
    })
    observer.observe(stageRef.current)
    return () => observer.disconnect()
  }, [isMobile])

  // Calculate dynamic horizontal slide offset so the active card is 100% centered in the right stage.
  // paddingLeft = paddingRight = xStart gives symmetrical scroll range for all cards.
  const { stageWidth, cardWidth, gap } = stageDimensions
  const xStart = stageWidth > 0 ? stageWidth / 2 - cardWidth / 2 : 0
  const endPadding = xStart

  // Desktop horizontal scroll handler (updates activeStep when user scrolls horizontally)
  const handleDesktopScroll = () => {
    if (!stageRef.current || !trackRef.current) return
    const el = stageRef.current
    const scrollLeft = el.scrollLeft
    const firstCard = trackRef.current.firstElementChild
    const itemWidth = firstCard ? firstCard.offsetWidth + gap : trackRef.current.scrollWidth / SCENES.length
    const newStep = Math.min(Math.floor((scrollLeft + itemWidth / 2) / itemWidth), SCENES.length - 1)
    if (newStep !== activeStep) setActiveStep(newStep)
  }

  // Mobile horizontal scroll listener to update active step pill as user swipes left/right
  const handleMobileScroll = () => {
    if (!mobileTrackRef.current) return
    const el = mobileTrackRef.current
    const scrollLeft = el.scrollLeft
    const itemWidth = el.scrollWidth / SCENES.length
    const newStep = Math.min(Math.floor((scrollLeft + itemWidth / 2) / itemWidth), SCENES.length - 1)
    if (newStep !== activeStep) {
      setActiveStep(newStep)
    }
  }

  // Scroll to step programmatically (for desktop step buttons or mobile pill taps)
  const scrollToStep = (idx) => {
    setActiveStep(idx)
    if (isMobile && mobileTrackRef.current) {
      const el = mobileTrackRef.current
      const itemWidth = el.scrollWidth / SCENES.length
      el.scrollTo({ left: itemWidth * idx, behavior: 'smooth' })
    } else if (stageRef.current && trackRef.current) {
      const el = stageRef.current
      const firstCard = trackRef.current.firstElementChild
      const itemWidth = firstCard ? firstCard.offsetWidth + gap : trackRef.current.scrollWidth / SCENES.length
      el.scrollTo({ left: itemWidth * idx, behavior: 'smooth' })
    } else if (containerRef.current) {
      const elementTop = containerRef.current.offsetTop
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight
      const targetY = elementTop + totalHeight * (idx / (SCENES.length - 1))
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
  }

  const activeScene = SCENES[activeStep]

  return (
    <section
      ref={containerRef}
      aria-labelledby="how-it-works-heading"
      className="relative border-b overflow-hidden"
      style={{
        background: 'var(--background)',
        borderColor: 'var(--border)',
        minHeight: isMobile || reducedMotion ? 'auto' : '100vh',
      }}
    >
      {/* ──────────────────────────────────────────────────────────────────────────
          MOBILE VIEW (< 768px): Natural Vertical Page Scroll + Horizontal Snap Carousel
         ────────────────────────────────────────────────────────────────────────── */}
      {isMobile ? (
        <div className="py-8 px-4 flex flex-col items-center gap-5 text-center">
          {/* Header */}
          <div>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.25em]"
              style={{ color: 'var(--primary)' }}
            >
              How It Works
            </span>
            <h2
              id="how-it-works-heading"
              className="mt-1 font-heading font-extrabold tracking-[-0.04em] text-2xl"
              style={{ color: 'var(--foreground)' }}
            >
              From a tap to a sale, <span style={{ color: 'var(--primary)' }}>in seconds.</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Follow the quick buyer journey that turns social traffic into orders without extra setup.
            </p>
          </div>

          {/* Mobile Horizontal Carousel (~78vw width with peeking next card) */}
          <div
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
            className="w-full overflow-x-auto flex gap-3 snap-x snap-mandatory py-2 scrollbar-none"
            style={{
              WebkitOverflowScrolling: 'touch',
              paddingLeft: '15vw',
              paddingRight: '15vw',
            }}
          >
            {SCENES.map((scene, idx) => {
              const SceneComp = SCENE_COMPONENTS[idx]
              const isActive = activeStep === idx

              return (
                <div
                  key={scene.id}
                  className="w-[70vw] max-w-[320px] shrink-0 snap-center transition-all duration-300"
                  style={{
                    opacity: isActive ? 1 : 0.65,
                    transform: isActive ? 'scale(1)' : 'scale(0.96)',
                  }}
                >
                  <div
                    className="relative aspect-[9/13] w-full overflow-hidden rounded-2xl border p-3 shadow-md transition-all duration-300"
                    style={{
                      background: isActive
                        ? 'color-mix(in oklch, var(--surface) 98%, transparent)'
                        : 'color-mix(in oklch, var(--surface) 80%, transparent)',
                      borderColor: isActive
                        ? 'color-mix(in oklch, var(--primary) 40%, var(--border))'
                        : 'var(--border)',
                    }}
                  >
                    <SceneComp reducedMotion={reducedMotion} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile Active Story Description Card */}
          <div
            className="w-full max-w-[320px] rounded-xl border p-4 shadow-sm text-left space-y-2"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between pb-1 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
                <span>{activeScene.num}</span>
                <span className="opacity-40">/</span>
                <span>{activeScene.label}</span>
              </div>
              <span className="text-[10px] font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                {activeStep + 1} of {SCENES.length}
              </span>
            </div>

            <h3 className="text-xs font-bold" style={{ color: 'var(--foreground)' }}>
              {activeScene.title}
            </h3>

            <p className="text-[10px] leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              {activeScene.caption}
            </p>

            {/* Mobile Step Dots */}
            <div className="pt-2 flex items-center justify-center gap-1.5">
              {SCENES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToStep(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: activeStep === i ? '18px' : '6px',
                    background: activeStep === i ? 'var(--primary)' : 'var(--border)',
                  }}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ──────────────────────────────────────────────────────────────────────────
            DESKTOP VIEW (≥ 768px): Pinned Two-Column Storytelling Stage (Concept 2)
           ────────────────────────────────────────────────────────────────────────── */
        <div className="sticky top-0 h-[100dvh] flex items-center justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 py-6">
            <div className="grid grid-cols-12 items-center gap-8 lg:gap-12">
              
              {/* Left Column (~40%): Storytelling, Typography, Progress Timeline */}
              <div className="col-span-12 md:col-span-5 lg:col-span-5 flex flex-col justify-between space-y-6 lg:space-y-8">
                {/* Header */}
                <div>
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.28em]"
                    style={{ color: 'var(--primary)' }}
                  >
                    How it works
                  </span>
                  <motion.h2
                    id="how-it-works-heading"
                    className="mt-2 font-heading font-extrabold tracking-[-0.04em] text-3xl lg:text-4xl leading-[1.1]"
                    style={{ color: 'var(--foreground)' }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: easePremium }}
                  >
                    From a tap to a sale,{' '}
                    <span style={{ color: 'var(--primary)' }}>in seconds.</span>
                  </motion.h2>
                </div>

                {/* Animated Active Step Description Panel */}
                <div className="min-h-[140px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScene.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: easePremium }}
                      className="space-y-2"
                    >
                      <div
                        className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider shadow-sm"
                        style={{
                          background: 'color-mix(in oklch, var(--primary) 10%, var(--surface))',
                          borderColor: 'color-mix(in oklch, var(--primary) 25%, var(--border))',
                          color: 'var(--primary)',
                        }}
                      >
                        <span>{activeScene.num}</span>
                        <span className="opacity-40">/</span>
                        <span>{activeScene.label}</span>
                      </div>

                      <h3
                        className="font-heading text-xl lg:text-2xl font-extrabold tracking-tight"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {activeScene.title}
                      </h3>

                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {activeScene.caption}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Interactive Story Progress Timeline */}
                <div className="space-y-3 pt-2">
                  <div className="relative flex items-center justify-between">
                    {/* Base track line */}
                    <div
                      className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 -z-10 rounded-full"
                      style={{ background: 'var(--border)' }}
                    />
                    {/* Continuous active fill line */}
                    <motion.div
                      className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 -z-10 rounded-full"
                      style={{
                        background: 'var(--primary)',
                        width: `${(activeStep / (SCENES.length - 1)) * 100}%`,
                        transition: 'width 0.4s ease-out',
                      }}
                    />

                    {SCENES.map((scene, i) => {
                      const isCurrent = activeStep === i
                      const isPast = activeStep > i

                      return (
                        <button
                          key={scene.id}
                          type="button"
                          onClick={() => scrollToStep(i)}
                          className="group relative flex flex-col items-center focus:outline-none"
                          aria-label={`Go to step ${i + 1}: ${scene.label}`}
                        >
                          <div
                            className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 border"
                            style={{
                              background: isCurrent
                                ? 'var(--primary)'
                                : isPast
                                ? 'color-mix(in oklch, var(--primary) 20%, var(--surface))'
                                : 'var(--surface)',
                              color: isCurrent
                                ? 'var(--primary-foreground)'
                                : isPast
                                ? 'var(--primary)'
                                : 'var(--muted-foreground)',
                              borderColor: isCurrent
                                ? 'var(--primary)'
                                : isPast
                                ? 'color-mix(in oklch, var(--primary) 40%, var(--border))'
                                : 'var(--border)',
                              transform: isCurrent ? 'scale(1.15)' : 'scale(1)',
                              boxShadow: isCurrent
                                ? '0 0 12px color-mix(in oklch, var(--primary) 40%, transparent)'
                                : 'none',
                            }}
                          >
                            {scene.num}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Subtle navigation helper caption */}
                  <div className="flex items-center justify-between text-[11px] font-medium" style={{ color: 'var(--muted-foreground)' }}>
                    <span>Step {activeStep + 1} of {SCENES.length}</span>
                    <span className="flex items-center gap-1 text-[10px] opacity-75">
                      Scroll to explore →
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column (~60%): Pinned 3D Focal Deck Stage */}
                      <div
                        ref={stageRef}
                        onScroll={handleDesktopScroll}
                        className="relative col-span-12 md:col-span-7 lg:col-span-7 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-none"
                      >
                {/* Ambient dynamic primary glow aura behind active focal card */}
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[320px] w-[320px] rounded-full opacity-25 blur-3xl transition-opacity duration-700"
                  style={{ background: 'var(--primary)' }}
                  aria-hidden="true"
                />

                <motion.div
                  ref={trackRef}
                  className="flex items-center gap-6"
                  style={{
                    paddingLeft: xStart,
                    paddingRight: endPadding,
                    minWidth: '100%',
                  }}
                >
                  {SCENES.map((scene, idx) => {
                    const SceneComp = SCENE_COMPONENTS[idx]
                    const isActive = activeStep === idx

                    return (
                      <motion.div
                        key={scene.id}
                        className="relative w-[300px] sm:w-[330px] lg:w-[350px] shrink-0 transition-all duration-500 snap-center"
                        animate={{
                          scale: isActive ? 1 : 0.92,
                          opacity: isActive ? 1 : 0.35,
                        }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {/* Focal Glass Card */}
                        <div
                          className="relative aspect-[9/13.5] w-full overflow-hidden rounded-2xl lg:rounded-3xl border p-4 shadow-xl transition-all duration-500"
                          style={{
                            background: isActive
                              ? 'color-mix(in oklch, var(--surface) 98%, transparent)'
                              : 'color-mix(in oklch, var(--surface) 75%, transparent)',
                            borderColor: isActive
                              ? 'color-mix(in oklch, var(--primary) 45%, var(--border))'
                              : 'var(--border)',
                            boxShadow: isActive
                              ? '0 20px 50px -10px color-mix(in oklch, var(--primary) 20%, transparent), 0 10px 25px color-mix(in oklch, var(--foreground) 8%, transparent)'
                              : 'none',
                            backdropFilter: 'blur(12px)',
                          }}
                        >
                          <SceneComp reducedMotion={reducedMotion} />
                        </div>
                      </motion.div>
                    )
                  })}
                
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  )
}

