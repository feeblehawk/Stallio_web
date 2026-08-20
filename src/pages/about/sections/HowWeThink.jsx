import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInViewOnce } from '../../../hooks/useInViewOnce'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { easePremium } from '../../../utils/motionVariants'

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
  const { t } = useTranslation('about')
  const [ref, isInView] = useInViewOnce({ margin: '-60px' })
  const reducedMotion = useReducedMotion()
  const mp = { isInView, reducedMotion }

  return (
    <section
      ref={ref}
      aria-labelledby="hwt-heading"
      className="border-t border-border bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">

        {/* ── Section header ── */}
        <CardMotion delay={0} {...mp} className="mb-12 text-center sm:text-start">
          <Eyebrow>{t('howWeThink.eyebrow', 'How we think')}</Eyebrow>
          <h2
            id="hwt-heading"
            className="mt-3 font-heading font-extrabold tracking-[-0.035em] text-foreground"
            style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)' }}
          >
            {t('howWeThink.title', 'Principles behind the product')}
          </h2>
        </CardMotion>

        {/* ── Bento grid ── */}
        <div className="overflow-hidden rounded-2xl border border-border">

          {/* Row A+B: hero card left, two small right */}
          <div className="grid grid-cols-2 lg:grid-cols-4">

            {/* CARD 1 — hero, lg:row-span-2 */}
            <CardMotion
              delay={0.05}
              {...mp}
              className="col-span-2 lg:col-span-2 lg:row-span-2 relative overflow-hidden flex flex-col justify-between bg-primary p-8 sm:p-10 text-start"
              style={{ minHeight: 340 }}
            >
              <div style={{ position: 'absolute', inset: 0, borderInlineEnd: '1px solid color-mix(in oklch, var(--primary-foreground) 12%, transparent)', borderBottom: '1px solid color-mix(in oklch, var(--primary-foreground) 12%, transparent)', pointerEvents: 'none' }} />

              <div className="pointer-events-none absolute -end-16 -top-16 h-64 w-64 rounded-full"
                style={{ border: '1px solid color-mix(in oklch, var(--primary-foreground) 8%, transparent)' }}
                aria-hidden="true" />
              <div className="pointer-events-none absolute -end-8 -top-8 h-40 w-40 rounded-full"
                style={{ border: '1px solid color-mix(in oklch, var(--primary-foreground) 6%, transparent)' }}
                aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-20 -start-12 h-56 w-56 rounded-full"
                style={{ background: 'color-mix(in oklch, var(--primary-foreground) 4%, transparent)' }}
                aria-hidden="true" />

              <div className="relative z-10">
                <Eyebrow inverted>{t('howWeThink.card1.eyebrow', 'Built for real sellers')}</Eyebrow>
                <h3
                  className="mt-4 font-heading font-extrabold leading-tight tracking-[-0.03em] text-primary-foreground whitespace-pre-line"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                >
                  {t('howWeThink.card1.title', 'Home kitchens, studios,\nand side hustles.')}
                </h3>
              </div>

              <div className="relative z-10 mt-8">
                <p
                  className="text-sm leading-relaxed max-w-xs"
                  style={{ color: 'color-mix(in oklch, var(--primary-foreground) 72%, transparent)' }}
                >
                  {t('howWeThink.card1.body', 'Not enterprise procurement. Stallio is designed for the seller who runs their business from their phone and ships every day.')}
                </p>
                <div
                  className="mt-8 h-px w-12"
                  style={{ background: 'color-mix(in oklch, var(--primary-foreground) 30%, transparent)' }}
                />
              </div>
            </CardMotion>

            {/* CARD 2 */}
            <CardMotion
              delay={0.12}
              {...mp}
              className="col-span-2 lg:col-span-1 lg:row-span-2 relative overflow-hidden flex flex-col justify-between bg-surface p-6 sm:p-8 text-start"
              style={{
                borderInlineEnd: '1px solid var(--border)',
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
                <h3 className="mt-8 font-heading text-2xl font-bold leading-snug text-foreground whitespace-pre-line">
                  {t('howWeThink.card2.title', 'Straightforward\nby design')}
                </h3>
              </div>
              <p className="relative z-10 mb-6 text-base leading-relaxed text-muted-foreground">
                {t('howWeThink.card2.body', 'Fewer knobs and plugins. A clear path from catalog to order.')}
              </p>
            </CardMotion>

            {/* CARD 3 */}
            <CardMotion
              delay={0.18}
              {...mp}
              className="col-span-2 lg:col-span-1 lg:row-span-2 relative overflow-hidden flex flex-col justify-between bg-card p-6 sm:p-8 text-start"
              style={{
                borderBottom: '1px solid var(--border)',
                borderTop: '1px solid var(--border)',
              }}
            >
              <div className="relative z-10">
                <h3 className="mt-8 font-heading text-2xl font-bold leading-snug text-foreground">
                  {t('howWeThink.card3.title', 'Room to grow')}
                </h3>
              </div>
              <p className="relative z-10 mb-6 text-base leading-relaxed text-muted-foreground">
                {t('howWeThink.card3.body', 'Start small, add products and polish as your audience grows with you.')}
              </p>
            </CardMotion>

          </div>

          {/* Row C: full-width banner */}
          <CardMotion
            delay={0.22}
            {...mp}
            className="relative overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 bg-surface p-8 sm:p-10 text-start"
            style={{
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
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
              <Eyebrow>{t('howWeThink.card4.eyebrow', 'Built for momentum')}</Eyebrow>
              <h3
                className="mt-3 font-heading font-extrabold leading-tight tracking-[-0.03em] text-foreground"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
              >
                {t('howWeThink.card4.title', "Whether you're testing a new line or shipping every week")}
              </h3>
            </div>
            <p className="relative z-10 text-base leading-relaxed text-muted-foreground lg:max-w-xs">
              {t('howWeThink.card4.body', 'Stallio is meant to stay out of the way. Update products, tweak copy, and keep selling without rebuilding a whole site.')}
            </p>
          </CardMotion>

          {/* Row D: vision card (3 col) + stat square (1 col) */}
          <div className="grid grid-cols-2 lg:grid-cols-4">

            {/* CARD 5 — vision */}
            <CardMotion
              delay={0.28}
              {...mp}
              className="col-span-2 lg:col-span-3 relative overflow-hidden flex flex-col justify-between p-8 sm:p-10 text-start"
              style={{
                minHeight: 220,
                background: 'color-mix(in oklch, var(--primary) 22%, var(--surface))',
                borderInlineEnd: '1px solid color-mix(in oklch, var(--primary) 30%, var(--border))',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-35"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, color-mix(in oklch, var(--primary) 25%, transparent) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <Eyebrow muted>{t('howWeThink.card5.eyebrow', 'Our vision')}</Eyebrow>
                <p
                  className="mt-6 font-heading font-bold leading-tight tracking-[-0.025em] text-foreground"
                  style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)' }}
                >
                  {t('howWeThink.card5.title', 'Independent sellers deserve tools that feel premium and honest.')}
                </p>
              </div>

              <p className="relative z-10 mb-6 text-base leading-relaxed text-muted-foreground">
                {t('howWeThink.card5.body', "Clear pricing, clear fulfillment, and a storefront that respects the buyer's time as much as yours.")}
              </p>
            </CardMotion>

            {/* CARD 6 — stat accent square */}
            <CardMotion
              delay={0.34}
              {...mp}
              className="col-span-2 lg:col-span-1 relative overflow-hidden flex flex-col items-center justify-center py-10 text-center"
              style={{
                minHeight: 200,
                background: 'color-mix(in oklch, var(--primary) 9%, var(--surface))',
              }}
            >
            </CardMotion>

          </div>
        </div>
        {/* end bento */}

      </div>
    </section>
  )
}

export default HowWeThink