import { motion } from 'framer-motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'
import { easePremium } from '../../utils/motionVariants'

// ─── Card reveal ──────────────────────────────────────────────────────────────
const CardMotion = ({ children, delay = 0, isInView, reducedMotion, className = '', style = {} }) => (
  <motion.div
    className={className}
    style={style}
    initial={reducedMotion ? false : { opacity: 0, y: 28, filter: 'blur(6px)' }}
    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
    transition={{ duration: 0.75, ease: easePremium, delay }}
  >
    {children}
  </motion.div>
)

// ─── Eyebrow ─────────────────────────────────────────────────────────────────
const Eyebrow = ({ children, inverted = false, muted = false }) => (
  <span
    className="inline-block text-[10px] font-bold uppercase tracking-[0.22em]"
    style={{
      color: inverted
        ? 'color-mix(in oklch, var(--primary-foreground) 55%, transparent)'
        : muted
        ? 'color-mix(in oklch, var(--primary) 60%, var(--muted-foreground))'
        : 'var(--primary)',
    }}
  >
    {children}
  </span>
)

// ─── Section ─────────────────────────────────────────────────────────────────
const HowWeThink = () => {
  const [ref, isInView] = useInViewOnce({ margin: '-60px' })
  const reducedMotion = useReducedMotion()
  const mp = { isInView, reducedMotion }

  return (
    <section
      ref={ref}
      aria-labelledby="hwt-heading"
      className="border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">

        {/* ── Section header ── */}
        <CardMotion delay={0} {...mp} className="mb-12 text-center sm:text-left">
          <Eyebrow>How we think</Eyebrow>
          <h2
            id="hwt-heading"
            className="mt-3 font-heading font-extrabold tracking-[-0.035em]"
            style={{
              fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
              color: 'var(--foreground)',
            }}
          >
            Principles behind the product
          </h2>
        </CardMotion>

        {/* ── Bento grid ── */}
        {/*
          Layout (lg, 4 cols):
          [  CARD 1 (2 col, 2 row)  ] [ CARD 2 (1 col) ] [ CARD 3 (1 col) ]
          [  CARD 1 (continues)     ] [ CARD 2 (cont.) ] [ CARD 3 (cont.) ]
          [       CARD 4 (4 col, full-width banner)                        ]
          [   CARD 5 (3 col, vision — muted primary)   ] [ CARD 6 (1 col) ]

          Mobile (2 cols):
          [  CARD 1 (2 col, full-width)                ]
          [  CARD 2 (2 col, full-width, stacks below)  ]
          [  CARD 3 (2 col, full-width, stacks below)  ]
          [  CARD 4 (2 col, full-width banner)         ]
          [  CARD 5 (2 col, full-width)                ]
          [  CARD 6 (2 col, full-width)                ]
        */}
        <div
          className="overflow-hidden rounded-2xl border"
          style={{ borderColor: 'var(--border)' }}
        >
          {/* Row A+B: hero card left, two small right */}
          {/*
            FIX: On mobile this is a 2-col grid. Card 1 spans 2 cols (full-width).
            Cards 2 & 3 must also span 2 cols on mobile so they stack full-width,
            then revert to col-span-1 at lg to sit side-by-side in the 4-col grid.
            row-span-2 is only applied at lg breakpoint for the same reason —
            on mobile there's no concept of a spanning hero, cards just stack.
          */}
          <div className="grid grid-cols-2 lg:grid-cols-4">

            {/* CARD 1 — hero, lg:row-span-2 */}
            <CardMotion
              delay={0.05}
              {...mp}
              className="col-span-2 lg:col-span-2 lg:row-span-2 relative overflow-hidden flex flex-col justify-between p-8 sm:p-10"
              style={{
                minHeight: 340,
                background: 'var(--primary)',
                borderRight: '1px solid color-mix(in oklch, var(--primary-foreground) 12%, transparent)',
                borderBottom: '1px solid color-mix(in oklch, var(--primary-foreground) 12%, transparent)',
              }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full"
                style={{ border: '1px solid color-mix(in oklch, var(--primary-foreground) 8%, transparent)' }}
                aria-hidden="true" />
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full"
                style={{ border: '1px solid color-mix(in oklch, var(--primary-foreground) 6%, transparent)' }}
                aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full"
                style={{ background: 'color-mix(in oklch, var(--primary-foreground) 4%, transparent)' }}
                aria-hidden="true" />

              <div className="relative z-10">
                <Eyebrow inverted>Built for real sellers</Eyebrow>
                <h3
                  className="mt-4 font-heading font-extrabold leading-tight tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--primary-foreground)' }}
                >
                  Home kitchens, studios,<br />and side hustles.
                </h3>
              </div>

              <div className="relative z-10 mt-8">
                <p className="text-sm leading-relaxed max-w-xs"
                  style={{ color: 'color-mix(in oklch, var(--primary-foreground) 72%, transparent)' }}>
                  Not enterprise procurement. Stallio is designed for the seller who runs their
                  business from their phone and ships every day.
                </p>
                <div className="mt-8 h-px w-12"
                  style={{ background: 'color-mix(in oklch, var(--primary-foreground) 30%, transparent)' }} />
              </div>
            </CardMotion>

            {/* CARD 2 — Straightforward
                FIX: col-span-2 on mobile (full-width, stacks below Card 1)
                     col-span-1 + row-span-2 restored at lg for the bento layout.
                FIX: mb-15 → mb-6 (mb-15 is not a default Tailwind utility;
                     it silently compiles to nothing, collapsing the bottom spacing
                     and causing justify-between to glue the paragraph to the bottom
                     edge with zero padding — visually clipped on short viewports).
            */}
            <CardMotion
              delay={0.12}
              {...mp}
              className="col-span-2 lg:col-span-1 lg:row-span-2 relative overflow-hidden flex flex-col justify-between p-6 sm:p-8"
              style={{
                background: 'var(--surface)',
                borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                borderTop: '1px solid var(--border)',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <Eyebrow>02</Eyebrow>
                <h1 className="mt-8 font-heading text-2xl font-bold leading-snug"
                  style={{ color: 'var(--foreground)' }}>
                  Straightforward<br />by design
                </h1>
              </div>
              {/* FIX: mb-15 → mb-6 */}
              <p className="relative z-10 mb-6 text-md leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}>
                Fewer knobs and plugins. A clear path from catalog to order.
              </p>
            </CardMotion>

            {/* CARD 3 — Room to grow
                FIX: col-span-2 on mobile (full-width, stacks below Card 2)
                     col-span-1 + row-span-2 restored at lg.
                FIX: mb-15 → mb-6 (same invalid-utility issue as Card 2).
                FIX: borderTop added so the card has a visible separator from
                     Card 2 when they stack vertically on mobile.
            */}
            <CardMotion
              delay={0.18}
              {...mp}
              className="col-span-2 lg:col-span-1 lg:row-span-2 relative overflow-hidden flex flex-col justify-between p-6 sm:p-8"
              style={{
                background: 'var(--card)',
                borderBottom: '1px solid var(--border)',
                borderTop: '1px solid var(--border)',
              }}
            >
              <div className="relative z-10">
                <Eyebrow>03</Eyebrow>
                <h1 className="mt-8 font-heading text-2xl font-bold leading-snug"
                  style={{ color: 'var(--foreground)' }}>
                  Room to grow
                </h1>
              </div>
              {/* FIX: mb-15 → mb-6 */}
              <p className="relative z-10 mb-6 text-md leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}>
                Start small, add products and polish as your audience grows with you.
              </p>
            </CardMotion>

          </div>

          {/* Row C: full-width banner */}
          <CardMotion
            delay={0.22}
            {...mp}
            className="relative overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-8 sm:p-10"
            style={{
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              background: 'var(--surface)',
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 50% 80% at 80% 50%, color-mix(in oklch, var(--primary) 6%, transparent), transparent 70%)',
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 lg:max-w-lg">
              <Eyebrow>Built for momentum</Eyebrow>
              <h3
                className="mt-3 font-heading font-extrabold leading-tight tracking-[-0.03em]"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: 'var(--foreground)' }}
              >
                Whether you're testing a new line or shipping every week
              </h3>
            </div>
            <p className="relative z-10 text-md leading-relaxed lg:max-w-xs"
              style={{ color: 'var(--muted-foreground)' }}>
              Stallio is meant to stay out of the way. Update products, tweak copy, and keep
              selling without rebuilding a whole site.
            </p>
          </CardMotion>

          {/* Row D: vision card (3 col) + stat square (1 col) */}
          <div className="grid grid-cols-2 lg:grid-cols-4">

            
            <CardMotion
              delay={0.28}
              {...mp}
              className="col-span-2 lg:col-span-3 relative overflow-hidden flex flex-col justify-between p-8 sm:p-10"
              style={{
                minHeight: 220,
                background: 'color-mix(in oklch, var(--primary) 22%, var(--surface))',
                borderRight: '1px solid color-mix(in oklch, var(--primary) 30%, var(--border))',
              }}
            >
              {/* Dot grid — echoes Card 1 rings language */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, color-mix(in oklch, var(--primary) 25%, transparent) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                  opacity: 0.35,
                }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <Eyebrow muted>Our vision</Eyebrow>
                <p
                  className="mt-6 font-heading font-bold leading-tight tracking-[-0.025em]"
                  style={{
                    fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)',
                    color: 'var(--foreground)',
                  }}
                >
                  Independent sellers deserve tools that feel premium and honest.
                </p>
              </div>

              {/* FIX: mb-15 → mb-6 */}
              <p
                className="relative z-10 mb-6 text-md leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Clear pricing, clear fulfillment, and a storefront that respects the buyer's time
                as much as yours.
              </p>
            </CardMotion>

            {/* CARD 6 — stat accent square */}
            <CardMotion
              delay={0.34}
              {...mp}
              className="col-span-2 lg:col-span-1 relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8 text-center"
              style={{
                minHeight: 200,
                background: 'color-mix(in oklch, var(--primary) 9%, var(--surface))',
              }}
            >
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="h-32 w-32 rounded-full"
                  style={{ border: '1px solid color-mix(in oklch, var(--primary) 18%, transparent)' }} />
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="h-20 w-20 rounded-full"
                  style={{ background: 'color-mix(in oklch, var(--primary) 8%, transparent)' }} />
              </div>
              <span
                className="relative z-10 font-heading font-extrabold leading-none tracking-[-0.04em]"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--primary)' }}
              >
                500+
              </span>
              <span
                className="relative z-10 mt-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: 'var(--muted-foreground)' }}
              >
                active sellers
              </span>
            </CardMotion>

          </div>
        </div>
        {/* end bento */}

      </div>
    </section>
  )
}

export default HowWeThink