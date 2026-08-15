import { motion } from 'framer-motion'
import { useInViewOnce } from '../../../hooks/useInViewOnce'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { reveal, revealSoft, easePremium } from '../../../utils/motionVariants'

const GLOBE_DOTS = [
  // North America
  { x: 32,  y: 72,  major: false },
  { x: 44,  y: 65,  major: true  },
  { x: 28,  y: 88,  major: false },
  { x: 48,  y: 95,  major: true  },
  { x: 22,  y: 108, major: false },
  { x: 38,  y: 118, major: false },
  { x: 52,  y: 112, major: false },
  // South America
  { x: 55,  y: 140, major: false },
  { x: 48,  y: 155, major: false },
  { x: 60,  y: 168, major: false },
  // Europe
  { x: 96,  y: 62,  major: false },
  { x: 104, y: 55,  major: true  },
  { x: 112, y: 60,  major: false },
  { x: 120, y: 66,  major: false },
  { x: 108, y: 72,  major: false },
  // Africa
  { x: 100, y: 95,  major: false },
  { x: 108, y: 110, major: false },
  { x: 96,  y: 125, major: false },
  { x: 106, y: 140, major: false },
  // Middle East / South Asia
  { x: 128, y: 82,  major: false },
  { x: 138, y: 90,  major: true  },
  { x: 144, y: 100, major: true  },
  { x: 136, y: 108, major: false },
  // East Asia / SE Asia
  { x: 158, y: 72,  major: false },
  { x: 166, y: 80,  major: true  },
  { x: 162, y: 92,  major: false },
  { x: 154, y: 100, major: false },
  { x: 160, y: 112, major: false },
  // Oceania
  { x: 164, y: 148, major: false },
  { x: 172, y: 142, major: false },
  // Scattered fill
  { x: 72,  y: 80,  major: false },
  { x: 80,  y: 100, major: false },
  { x: 84,  y: 72,  major: false },
  { x: 148, y: 120, major: false },
  { x: 130, y: 130, major: false },
]

const Mission = () => {
  const [ref, isInView] = useInViewOnce()
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <section
      aria-labelledby="mission-heading"
      className="border-t border-border bg-surface"
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div
          ref={ref}
          className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_360px] lg:gap-20"
        >

          {/* ── Left: quote block ── */}
          <div>
            <motion.span
              variants={revealSoft}
              {...motionProps}
              className="mb-10 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary"
            >
              Our mission
            </motion.span>

            <motion.blockquote
              variants={reveal}
              {...motionProps}
              className="max-w-2xl border-l-[3px] border-primary pl-8 sm:pl-12"
            >
              <p
                id="mission-heading"
                className="font-heading font-bold leading-tight text-foreground"
                style={{ fontSize: 'clamp(1.7rem, 4vw, 3rem)' }}
              >
                Commerce moves through DMs.
                <br />
                <span className="font-semibold text-muted-foreground">
                  We built the store for that.
                </span>
              </p>
            </motion.blockquote>

            <motion.p
              variants={revealSoft}
              {...motionProps}
              className="mt-10 max-w-xl pl-8 text-sm leading-7 text-muted-foreground sm:text-base"
            >
              We're not building a marketplace. We're building the simplest, most powerful
              store a solo seller can run from their phone, because that's where real
              commerce actually happens.
            </motion.p>
          </div>

          {/* ── Right: Globe coverage card ── */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, ease: easePremium, delay: 0.25 }}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background"
          >
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <div className="flex items-center gap-2">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-primary"
                  animate={reducedMotion ? {} : { opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Global reach
                </span>
              </div>
              <motion.span
                className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary"
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: easePremium, delay: 0.7 }}
              >
                Worldwide
              </motion.span>
            </div>

            {/* Globe SVG */}
            <div className="relative flex items-center justify-center px-6 py-8">
              {/* Radial glow — color-mix() must stay as style */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 65% 65% at 50% 50%, color-mix(in oklch, var(--primary) 9%, transparent), transparent 70%)',
                }}
                aria-hidden="true"
              />

              <svg
                viewBox="0 0 200 200"
                className="w-full max-w-[220px]"
                aria-label="Globe showing worldwide commerce reach"
                role="img"
              >
                <defs>
                  <clipPath id="globe-clip">
                    <circle cx="100" cy="100" r="88" />
                  </clipPath>
                  <radialGradient id="globe-shade" cx="38%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.07" />
                    <stop offset="100%" stopColor="black" stopOpacity="0.18" />
                  </radialGradient>
                </defs>

                <circle
                  cx="100" cy="100" r="91"
                  fill="none"
                  stroke="color-mix(in oklch, var(--primary) 20%, transparent)"
                  strokeWidth="1"
                />
                <circle
                  cx="100" cy="100" r="88"
                  fill="color-mix(in oklch, var(--primary) 7%, var(--surface))"
                  stroke="color-mix(in oklch, var(--primary) 30%, var(--border))"
                  strokeWidth="1"
                />

                <g clipPath="url(#globe-clip)" opacity="0.18">
                  {[-55, -35, -15, 5, 25, 45, 65].map((offset, i) => {
                    const y = 100 + offset
                    const rx = Math.sqrt(Math.max(0, 88 * 88 - offset * offset))
                    return (
                      <ellipse
                        key={`lat-${i}`}
                        cx="100" cy={y}
                        rx={rx} ry={rx * 0.28}
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="0.6"
                      />
                    )
                  })}
                  {[0, 25, 50, 75, 100, 125, 150].map((xOffset, i) => (
                    <ellipse
                      key={`lng-${i}`}
                      cx="100" cy="100"
                      rx={Math.abs(xOffset - 75) < 5 ? 88 : 88 * Math.sin((xOffset / 175) * Math.PI)}
                      ry="88"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="0.6"
                    />
                  ))}
                </g>

                <circle
                  cx="100" cy="100" r="88"
                  fill="url(#globe-shade)"
                  clipPath="url(#globe-clip)"
                />

                <g clipPath="url(#globe-clip)">
                  {GLOBE_DOTS.map(({ x, y, major }, i) => (
                    <motion.g
                      key={i}
                      initial={reducedMotion ? false : { opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.35,
                        ease: easePremium,
                        delay: 0.5 + i * 0.04,
                      }}
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    >
                      {major && !reducedMotion && (
                        <motion.circle
                          cx={x} cy={y} r="8"
                          fill="none"
                          stroke="var(--primary)"
                          strokeWidth="0.7"
                          animate={{ r: [5, 12, 5], opacity: [0.6, 0, 0.6] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.4,
                          }}
                        />
                      )}
                      <circle
                        cx={x} cy={y}
                        r={major ? 3 : 1.8}
                        fill="var(--primary)"
                        opacity={major ? 0.95 : 0.55}
                      />
                    </motion.g>
                  ))}
                </g>

                <line
                  x1="12" y1="100" x2="188" y2="100"
                  stroke="color-mix(in oklch, var(--primary) 22%, transparent)"
                  strokeWidth="0.5"
                  clipPath="url(#globe-clip)"
                />
              </svg>
            </div>

            {/* Footer stat strip */}
            <div className="grid grid-cols-3 border-t border-border">
              {[
                { num: '500+',  label: 'Sellers'  },
                { num: '50+',   label: 'Cities'   },
                { num: '100K+', label: 'Orders'   },
              ].map(({ num, label }, i) => (
                <motion.div
                  key={label}
                  className={`flex flex-col items-center gap-0.5 py-4 ${i < 2 ? 'border-r border-border' : ''}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: easePremium, delay: 0.75 + i * 0.08 }}
                >
                  <span
                    className="font-heading font-extrabold tracking-[-0.03em] leading-none text-primary"
                    style={{ fontSize: '1.05rem' }}
                  >
                    {num}
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Mission
