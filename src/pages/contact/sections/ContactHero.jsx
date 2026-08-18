import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, Clock, Zap } from 'lucide-react'
import { FaWhatsapp, FaInstagram , FaFacebook, FaLinkedin, FaXTwitter} from 'react-icons/fa6'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { blurReveal, revealSoft, staggerHero } from '../../../utils/motionVariants'
import { css } from '../../../utils/cssTokens'

// ─── Trust pill ───────────────────────────────────────────────────────────────
const ResponsePill = ({ icon: Icon, iconStyle, children }) => (
  <motion.span
    variants={revealSoft}
    className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium"
    style={{
      borderColor: css.border,
      background: 'color-mix(in oklch, var(--surface) 82%, transparent)',
      backdropFilter: 'blur(10px)',
      color: css.mutedFg,
    }}
  >
    <Icon size={13} style={iconStyle} aria-hidden="true" />
    {children}
  </motion.span>
)

// ─── Floating social orb ──────────────────────────────────────────────────────
const SocialOrb = ({ icon: Icon, color, delay, top, left, right, bottom, size = 40 }) => (
  <motion.div
    className="absolute pointer-events-none hidden md:block"
    style={{ top, left, right, bottom }}
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    <motion.div
      animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
      className="flex items-center justify-center rounded-2xl border backdrop-blur-sm"
      style={{
        width: size,
        height: size,
        background: `color-mix(in oklch, ${color} 12%, var(--surface))`,
        borderColor: `color-mix(in oklch, ${color} 28%, var(--border))`,
        boxShadow: `0 8px 32px color-mix(in oklch, ${color} 20%, transparent)`,
        color,
      }}
      aria-hidden="true"
    >
      <Icon size={size * 0.42} />
    </motion.div>
  </motion.div>
)

// ─── ContactHero ──────────────────────────────────────────────────────────────
const ContactHero = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const isVisible = reduced || inView

  const motionProps = reduced
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isVisible ? 'visible' : 'hidden' }

  return (
    <section
      ref={ref}
      aria-labelledby="contact-hero-heading"
      className="relative isolate overflow-hidden border-b"
      style={{ borderColor: css.border }}
    >
      {/* ── Background radial glows ── */}
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 50%, color-mix(in oklch, var(--primary) 9%, transparent), transparent 72%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 35% at 50% 0%, color-mix(in oklch, var(--primary) 5%, transparent), transparent 68%)',
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* ── Glowing top border line ── */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, color-mix(in oklch, var(--primary) 55%, transparent) 50%, transparent 100%)',
        }}
      />

      {/* ── Floating social orbs — decorative ── */}
      {!reduced && (
        <>
          <SocialOrb icon={FaWhatsapp} color="oklch(0.58 0.22 150)" delay={0.8} top="22%" left="15%" size={44} />
          <SocialOrb icon={FaInstagram} color="oklch(0.62 0.20 350)" delay={0.55} top="70%" left="9%" size={36} />
          <SocialOrb icon={FaXTwitter} color="oklch(0.65 0.18 100)" delay={0.45} top="45%" right="20%" size={40} />
          <SocialOrb icon={FaLinkedin} color="oklch(0.55 0.18 240)" delay={0.25} top="25%" right="10%" size={44} />
          <SocialOrb icon={FaFacebook} color="oklch(0.68 0.20 220)" delay={0.15} top="50%" left="18%" size={40} />
          <SocialOrb icon={MessageCircle} color="var(--primary)" delay={0.35} top="72%" right="10%" size={36} />
         
        </>
      )}

      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={staggerHero}
          {...motionProps}
        >
          {/* Eyebrow badge */}
          <motion.div variants={revealSoft}>
            <div
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 backdrop-blur-sm"
              style={{
                borderColor: css.border,
                background: 'color-mix(in oklch, var(--surface) 80%, transparent)',
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Get in Touch
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="contact-hero-heading"
            variants={blurReveal}
            className="font-heading font-extrabold tracking-[-0.04em] text-foreground"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)', lineHeight: 1.0 }}
          >
            Have a question?
            <br/>
            <span style={{ color: css.primary }}>Let's Talk.</span>
            
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={revealSoft}
            className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            Whether you have a question about your store, need help setting things up,
            or just want to say hello, We are here.
          </motion.p>

          {/* Trust pills */}
          <motion.div
            variants={revealSoft}
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
          >
            <ResponsePill icon={Clock} iconStyle={{ color: css.primary }}>
              Replies within 24 hours
            </ResponsePill>
            <ResponsePill icon={FaWhatsapp} iconStyle={{ color: 'oklch(0.58 0.22 150)' }}>
              WhatsApp support
            </ResponsePill>
            <ResponsePill icon={MessageCircle} iconStyle={{ color: css.primary }}>
              No ticket queues
            </ResponsePill>
          </motion.div>

          {/* Accent divider */}
          <motion.div
            variants={revealSoft}
            className="mt-10 h-px w-16 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${css.primary}, transparent)` }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default ContactHero