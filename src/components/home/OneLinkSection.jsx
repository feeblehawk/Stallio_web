import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'

// ─── Only 3 phrases, each occupying a clean 1/3 of scroll ───
// Phase 1: 0.00–0.33 → ONE LINK.
// Phase 2: 0.33–0.66 → ONE STORE.
// Phase 3: 0.66–1.00 → MORE SALES.
const PHRASES = [
  { text: 'ONE LINK.', enterAt: 0.0, exitAt: 0.31, isFirst: true },
  { text: 'ONE STORE.', enterAt: 0.31, exitAt: 0.63 },
  { text: 'MORE SALES.', enterAt: 0.63, exitAt: 1.0, isLast: true },
]

const FADE_SPAN = 0.09 // how long fade-in / fade-out takes

const ScrollPhrase = ({ text, scrollYProgress, enterAt, exitAt, isLast, isFirst, reducedMotion }) => {
  // Opacity
  const opacityKeyframes = reducedMotion
    ? [0, 1]
    : isFirst
      ? [0, exitAt - FADE_SPAN, exitAt]
      : isLast
        ? [enterAt, enterAt + FADE_SPAN, exitAt]
        : [enterAt, enterAt + FADE_SPAN, exitAt - FADE_SPAN, exitAt]

  const opacityValues = reducedMotion
    ? [1, 1]
    : isFirst
      ? [1, 1, 0]
      : isLast
        ? [0, 1, 1]
        : [0, 1, 1, 0]

  const opacity = useTransform(scrollYProgress, opacityKeyframes, opacityValues)

  // Y: slide up on enter, recede upward on exit
  const yKeyframes = reducedMotion
    ? [0, 1]
    : isFirst
      ? [0, exitAt - FADE_SPAN - 0.02, exitAt]
      : isLast
        ? [enterAt, enterAt + FADE_SPAN + 0.02, exitAt]
        : [enterAt, enterAt + FADE_SPAN + 0.02, exitAt - FADE_SPAN - 0.02, exitAt]

  const yValues = reducedMotion
    ? [0, 0]
    : isFirst
      ? [0, 0, -36]
      : isLast
        ? [48, 0, 0]
        : [48, 0, 0, -36]

  const y = useTransform(scrollYProgress, yKeyframes, yValues)

  // Blur: sharp on enter, soft on exit
  const blurKeyframes = reducedMotion
    ? [0, 1]
    : isFirst
      ? [0, exitAt - FADE_SPAN, exitAt]
      : isLast
        ? [enterAt, enterAt + FADE_SPAN, exitAt]
        : [enterAt, enterAt + FADE_SPAN, exitAt - FADE_SPAN, exitAt]

  const blurValues = reducedMotion
    ? ['blur(0px)', 'blur(0px)']
    : isFirst
      ? ['blur(0px)', 'blur(0px)', 'blur(6px)']
      : isLast
        ? ['blur(10px)', 'blur(0px)', 'blur(0px)']
        : ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(6px)']

  const blur = useTransform(scrollYProgress, blurKeyframes, blurValues)

  // Scale: grows in slightly on enter
  const scale = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 1] : [enterAt, enterAt + FADE_SPAN],
    reducedMotion ? [1, 1] : [0.95, 1],
  )

  return (
    <motion.p
      className="absolute inset-x-0 text-center font-heading font-extrabold tracking-[-0.06em]"
      aria-hidden={!isLast}
      style={{
        fontSize: 'clamp(2.5rem, 10vw, 7rem)',
        lineHeight: 1,
        color: 'var(--foreground)',
        opacity,
        y,
        scale,
        filter: blur,
        pointerEvents: 'none',
        willChange: 'transform, opacity, filter',
      }}
    >
      {text}
    </motion.p>
  )
}

// Static stacked version for mobile / reduced motion
const StaticPhrases = ({ className = '' }) => (
  <div className={`flex flex-col gap-6 sm:gap-8 ${className}`}>
    {PHRASES.map(({ text }) => (
      <p
        key={text}
        className="text-center font-heading font-extrabold tracking-[-0.06em]"
        style={{
          fontSize: 'clamp(2.5rem, 10vw, 7rem)',
          lineHeight: 1,
          color: 'var(--foreground)',
        }}
      >
        {text}
      </p>
    ))}
  </div>
)

const OneLinkSection = () => {
  const containerRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const useStaticLayout = reducedMotion

  return (
    <section
      ref={containerRef}
      aria-label="One link, one store, more sales"
      className="relative border-b"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      {/* Visible label for screen readers */}
      <span className="sr-only">One link. One store. More sales.</span>

      <div className={useStaticLayout ? 'py-32 sm:py-40' : 'py-24 md:h-[220vh] md:py-0'}>
        <div
          className={`${
            useStaticLayout ? '' : 'md:sticky md:top-0 md:h-screen'
          } flex flex-col items-center justify-center px-4 sm:px-6`}
        >
          <div className="mb-10 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">One Link</span>
            <h2 className="mt-4 font-heading font-extrabold tracking-[-0.06em] text-4xl sm:text-5xl" style={{ lineHeight: 0.96, color: 'var(--foreground)' }}>
              One link for every sale.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              A single Stallio link customers open from Instagram, WhatsApp, or any social bio — no DMs required.
            </p>
          </div>
          {useStaticLayout ? (
            <StaticPhrases />
          ) : (
            <>
              {/* Mobile: static stacked */}
              <StaticPhrases className="md:hidden" />

              {/* Desktop: scroll-driven one-at-a-time */}
              <div className="relative hidden h-[clamp(4rem,18vw,8.5rem)] w-full max-w-6xl items-center justify-center md:flex">
                {PHRASES.map(({ text, enterAt, exitAt, isLast, isFirst }) => (
                  <ScrollPhrase
                    key={text}
                    text={text}
                    scrollYProgress={scrollYProgress}
                    enterAt={enterAt}
                    exitAt={exitAt}
                    isLast={isLast ?? false}
                    isFirst={isFirst ?? false}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default OneLinkSection
