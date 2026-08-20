import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mail, Send, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react'
import { FaWhatsapp, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa6'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { easePremium, staggerContainer, revealSoft, blurReveal } from '../../../utils/motionVariants'
import { css } from '../../../utils/cssTokens'

// ─── Contact channel card ─────────────────────────────────────────────────────
const ChannelCard = ({ icon: Icon, label, value, href, iconColor, iconBg, delay, isVisible, reduced }) => (
  <motion.a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    className="group relative flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring text-start"
    style={{ borderColor: css.border, background: css.surface }}
    initial={reduced ? false : { opacity: 0, x: -18, filter: 'blur(4px)' }}
    animate={isVisible ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
    transition={{ duration: 0.65, ease: easePremium, delay }}
    whileHover={{ boxShadow: `0 8px 32px color-mix(in oklch, ${iconColor} 16%, transparent), 0 2px 8px color-mix(in oklch, var(--foreground) 4%, transparent)` }}
  >
    {/* Icon */}
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
      style={{ background: iconBg, color: iconColor }}
    >
      <Icon size={18} aria-hidden="true" />
    </span>

    {/* Text */}
    <div className="min-w-0 flex-1 text-start">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: css.mutedFg }}>{label}</p>
      <p className="mt-0.5 truncate text-[13px] font-semibold" style={{ color: css.fg }}>{value}</p>
    </div>

    {/* Arrow hint */}
    <span
      className="shrink-0 text-[10px] font-bold uppercase tracking-wider opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 rtl:rotate-180"
      style={{ color: iconColor }}
      aria-hidden="true"
    >
      →
    </span>

    {/* Hover border glow */}
    <span
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${iconColor} 40%, transparent)` }}
      aria-hidden="true"
    />
  </motion.a>
)

// ─── Social icon button ───────────────────────────────────────────────────────
const SocialButton = ({ icon: Icon, href, label, color, delay, isVisible, reduced }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="group flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
    style={{ borderColor: css.border, background: css.surface, color: css.mutedFg }}
    initial={reduced ? false : { opacity: 0, scale: 0.8 }}
    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.5, ease: easePremium, delay }}
    whileHover={{
      color,
      borderColor: `color-mix(in oklch, ${color} 40%, var(--border))`,
      background: `color-mix(in oklch, ${color} 10%, var(--surface))`,
      boxShadow: `0 4px 16px color-mix(in oklch, ${color} 22%, transparent)`,
    }}
  >
    <Icon size={16} aria-hidden="true" />
  </motion.a>
)

// ─── Floating label input ─────────────────────────────────────────────────────
const FloatingInput = ({ id, label, type = 'text', value, onChange, required, error }) => {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="peer w-full rounded-xl border bg-transparent px-4 pb-3 pt-6 text-sm font-medium outline-none transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-0 text-start"
        style={{
          borderColor: error ? 'var(--destructive)' : focused ? css.primary : css.border,
          color: css.fg,
          boxShadow: focused
            ? `0 0 0 3px color-mix(in oklch, var(--primary) 12%, transparent)`
            : error
            ? `0 0 0 3px color-mix(in oklch, var(--destructive) 10%, transparent)`
            : 'none',
        }}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute start-4 font-medium transition-all duration-200"
        style={{
          top: lifted ? '10px' : '50%',
          transform: lifted ? 'translateY(0)' : 'translateY(-50%)',
          fontSize: lifted ? '10px' : '13px',
          letterSpacing: lifted ? '0.08em' : 'normal',
          textTransform: lifted ? 'uppercase' : 'none',
          color: error ? 'var(--destructive)' : focused ? css.primary : css.mutedFg,
        }}
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-start" style={{ color: 'var(--destructive)' }}>
          <AlertCircle size={11} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

// ─── Floating label textarea ──────────────────────────────────────────────────
const FloatingTextarea = ({ id, label, value, onChange, required, error }) => {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        rows={5}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full resize-none rounded-xl border bg-transparent px-4 pb-4 pt-8 text-sm font-medium outline-none transition-all duration-200 text-start"
        style={{
          borderColor: error ? 'var(--destructive)' : focused ? css.primary : css.input,
          color: css.fg,
          boxShadow: focused
            ? `0 0 0 3px color-mix(in oklch, var(--primary) 12%, transparent)`
            : 'none',
        }}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute start-4 font-medium transition-all duration-200"
        style={{
          top: lifted ? '10px' : '24px',
          fontSize: lifted ? '10px' : '13px',
          letterSpacing: lifted ? '0.08em' : 'normal',
          textTransform: lifted ? 'uppercase' : 'none',
          color: error ? 'var(--destructive)' : focused ? css.primary : css.mutedFg,
        }}
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-start" style={{ color: 'var(--destructive)' }}>
          <AlertCircle size={11} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

// ─── Custom Select ────────────────────────────────────────────────────────────
const FloatingSelect = ({ id, label, value, onChange, options, placeholder, error }) => {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={!!error}
        className="w-full appearance-none rounded-xl border bg-transparent px-4 pb-3 pt-6 text-sm font-medium outline-none transition-all duration-200 cursor-pointer text-start"
        style={{
          borderColor: error ? 'var(--destructive)' : focused ? css.primary : css.input,
          color: value ? css.fg : 'transparent',
          boxShadow: focused ? `0 0 0 3px color-mix(in oklch, var(--primary) 12%, transparent)` : 'none',
        }}
      >
        <option value="" disabled style={{ color: css.mutedFg }}>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: 'var(--surface)', color: css.fg }}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="pointer-events-none absolute start-4 font-medium transition-all duration-200"
        style={{
          top: lifted ? '10px' : '50%',
          transform: lifted ? 'translateY(0)' : 'translateY(-50%)',
          fontSize: lifted ? '10px' : '13px',
          letterSpacing: lifted ? '0.08em' : 'normal',
          textTransform: lifted ? 'uppercase' : 'none',
          color: error ? 'var(--destructive)' : focused ? css.primary : css.mutedFg,
        }}
      >
        {label}
      </label>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 transition-transform duration-200"
        style={{ color: css.mutedFg, transform: `translateY(-50%) rotate(${focused ? 180 : 0}deg)` }}
        aria-hidden="true"
      />
    </div>
  )
}

// ─── Main ContactForm section ─────────────────────────────────────────────────
const ContactForm = () => {
  const { t } = useTranslation('contact')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const isVisible = reduced || inView

  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const channels = [
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: '+92 300 000 0000',
      href: 'https://wa.me/923000000000',
      iconColor: 'oklch(0.58 0.22 150)',
      iconBg: 'color-mix(in oklch, oklch(0.58 0.22 150) 12%, var(--surface))',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@stallio.shop',
      href: 'mailto:contact@stallio.shop',
      iconColor: css.primary,
      iconBg: 'color-mix(in oklch, var(--primary) 12%, var(--surface))',
    },
    {
      icon: FaInstagram,
      label: 'Instagram',
      value: '@stallio.shop',
      href: 'https://instagram.com/stallio.shop',
      iconColor: 'oklch(0.62 0.20 350)',
      iconBg: 'color-mix(in oklch, oklch(0.62 0.20 350) 12%, var(--surface))',
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: '@stallio.shop',
      href: 'https://linkedin.com/company/stallio',
      iconColor: 'oklch(0.62 0.18 240)',
      iconBg: 'color-mix(in oklch, oklch(0.62 0.18 240) 12%, var(--surface))',
    },
  ]

  const socials = [
    { icon: FaWhatsapp, href: 'https://wa.me/923000000000', label: 'WhatsApp', color: 'oklch(0.58 0.22 150)' },
    { icon: FaInstagram, href: 'https://instagram.com/stallio.shop', label: 'Instagram', color: 'oklch(0.62 0.20 350)' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/stallio', label: 'LinkedIn', color: 'oklch(0.55 0.18 240)' },
    { icon: FaFacebook, href: 'https://facebook.com/stallio', label: 'Facebook', color: 'oklch(0.68 0.20 220)' },
  ]

  const topics = [
    { value: 'general',     label: t('form.topics.general', 'General enquiry') },
    { value: 'support',     label: t('form.topics.support', 'Store support') },
    { value: 'pricing',     label: t('form.topics.pricing', 'Pricing & plans') },
    { value: 'partnership', label: t('form.topics.partnership', 'Partnership') },
    { value: 'bug',         label: t('form.topics.bug', 'Report a bug') },
    { value: 'other',       label: t('form.topics.other', 'Something else') },
  ]

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = t('form.errors.name', 'Please enter your name')
    if (!form.email.trim()) e.email = t('form.errors.email', 'Please enter your email')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t('form.errors.emailInvalid', 'Enter a valid email address')
    if (!form.topic) e.topic = t('form.errors.topic', 'Please choose a topic')
    if (!form.message.trim()) e.message = t('form.errors.message', "Tell us what's on your mind")
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setErrors({})
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1400)
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="contact-form-heading"
      className="relative overflow-hidden border-b"
      style={{ borderColor: css.border, background: 'var(--background)' }}
    >
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 0% 50%, color-mix(in oklch, var(--primary) 5%, transparent), transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] lg:gap-16 xl:gap-20">

          {/* ── LEFT: Contact channels panel ── */}
          <div className="text-start">
            <motion.div
              variants={staggerContainer}
              initial={reduced ? false : 'hidden'}
              animate={isVisible ? 'visible' : 'hidden'}
            >
              {/* Heading */}
              <motion.span
                variants={revealSoft}
                className="text-[11px] font-semibold uppercase tracking-[0.25em]"
                style={{ color: css.primary }}
              >
                {t('form.channels.eyebrow', 'Contact channels')}
              </motion.span>
              <motion.h2
                id="contact-form-heading"
                variants={blurReveal}
                className="mt-3 font-heading font-extrabold tracking-[-0.04em]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.06, color: css.fg }}
              >
                {t('form.channels.headline', 'Pick the channel')}
                <br />
                <span style={{ color: css.primary }}>{t('form.channels.headlineHighlight', 'that works for you.')}</span>
              </motion.h2>
              <motion.p
                variants={revealSoft}
                className="mt-3 text-sm leading-7"
                style={{ color: css.mutedFg }}
              >
                {t('form.channels.subtext', "Questions, ideas, or need a hand? Tell us what you're working on and we'll take it from there.")}
              </motion.p>

              {/* Divider */}
              <motion.div
                variants={revealSoft}
                className="my-6 h-px"
                style={{ background: css.border }}
                aria-hidden="true"
              />
            </motion.div>

            {/* Channel cards */}
            <div className="flex flex-col gap-3">
              {channels.map((ch, i) => (
                <ChannelCard
                  key={ch.label}
                  {...ch}
                  delay={0.15 + i * 0.08}
                  isVisible={isVisible}
                  reduced={reduced}
                />
              ))}
            </div>

            {/* Socials row */}
            <motion.div
              className="mt-8"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easePremium, delay: 0.55 }}
            >
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: css.mutedFg }}>
                {t('form.channels.findUs', 'Find us on')}
              </p>
              <div className="flex items-center gap-2">
                {socials.map((s, i) => (
                  <SocialButton
                    key={s.label}
                    {...s}
                    delay={0.6 + i * 0.06}
                    isVisible={isVisible}
                    reduced={reduced}
                  />
                ))}
              </div>
            </motion.div>

            {/* Response time badge */}
            <motion.div
              className="mt-7"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: easePremium, delay: 0.72 }}
            >
              <div
                className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs font-medium"
                style={{
                  borderColor: 'color-mix(in oklch, oklch(0.58 0.18 145) 28%, var(--border))',
                  background: 'color-mix(in oklch, oklch(0.58 0.18 145) 9%, var(--surface))',
                  color: 'oklch(0.42 0.14 145)',
                }}
              >
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: 'oklch(0.58 0.18 145)' }}
                  aria-hidden="true"
                />
                {t('form.channels.replyBadge', 'Average reply time: under 24 hours')}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Contact form ── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.85, ease: easePremium, delay: 0.18 }}
          >
            <div
              className="relative rounded-2xl border p-7 sm:p-8 lg:p-10 text-start"
              style={{
                borderColor: css.border,
                background: css.surface,
                boxShadow: '0 8px 40px color-mix(in oklch, var(--foreground) 4%, transparent), 0 2px 8px color-mix(in oklch, var(--foreground) 3%, transparent)',
              }}
            >
              {/* Top-right glow */}
              <div
                className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl"
                style={{ background: css.primary }}
                aria-hidden="true"
              />

              {status === 'success' ? (
                /* ── Success state ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: easePremium }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: 'color-mix(in oklch, oklch(0.58 0.18 145) 12%, var(--surface))', color: 'oklch(0.58 0.18 145)' }}
                  >
                    <CheckCircle2 size={28} />
                  </span>
                  <h3 className="mt-5 font-heading text-2xl font-extrabold tracking-tight" style={{ color: css.fg }}>
                    {t('form.success.title', 'Message sent!')}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-6" style={{ color: css.mutedFg }}>
                    {t('form.success.desc', 'Your message has been sent. We will reach out to you as soon as possible. Check your inbox (and spam, just in case).')}
                  </p>
                  <button
                    type="button"
                    onClick={() => { setForm({ name: '', email: '', topic: '', message: '', phone: '' }); setStatus('idle') }}
                    className="mt-6 text-xs font-semibold underline underline-offset-2 transition-opacity hover:opacity-70 cursor-pointer"
                    style={{ color: css.primary }}
                  >
                    {t('form.success.sendAnother', 'Send another message')}
                  </button>
                </motion.div>
              ) : (
                /* ── Form ── */
                <>
                  {/* Form heading */}
                  <div className="mb-7">
                    <h3 className="font-heading text-xl font-extrabold tracking-tight" style={{ color: css.fg }}>
                      {t('form.formHeading.title', 'Send us a message')}
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: css.mutedFg }}>
                      {t('form.formHeading.subtitle', 'All fields marked with * are required.')}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    {/* Name + Email row */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FloatingInput
                        id="contact-name"
                        label={t('form.fields.name', 'Your name *')}
                        value={form.name}
                        onChange={set('name')}
                        required
                        error={errors.name}
                      />
                      <FloatingInput
                        id="contact-email"
                        label={t('form.fields.email', 'Email address *')}
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        required
                        error={errors.email}
                      />
                    </div>

                    {/* Topic select */}
                    <FloatingSelect
                      id="contact-topic"
                      label={t('form.fields.topic', "What's this about? *")}
                      value={form.topic}
                      onChange={set('topic')}
                      options={topics}
                      placeholder={t('form.fields.topicPlaceholder', 'Select a topic')}
                      error={errors.topic}
                    />

                    {/* Message textarea */}
                    <FloatingTextarea
                      id="contact-message"
                      label={t('form.fields.message', 'Your message *')}
                      value={form.message}
                      onChange={set('message')}
                      required
                      error={errors.message}
                    />

                    {/* Phone (optional) */}
                    <FloatingInput
                      id="contact-phone"
                      label={t('form.fields.phone', 'WhatsApp / phone (optional)')}
                      type="tel"
                      value={form.phone || ''}
                      onChange={set('phone')}
                      error={errors.phone}
                    />

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      className="group relative mt-1 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-bold shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
                      style={{
                        background: css.primary,
                        color: css.primaryFg,
                        boxShadow: `0 4px 14px color-mix(in oklch, var(--primary) 30%, transparent)`,
                      }}
                      whileTap={reduced ? {} : { scale: 0.98 }}
                    >
                      <span
                        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-[200%]"
                        aria-hidden="true"
                      />
                      {status === 'loading' ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="8" />
                          </svg>
                          {t('form.sending', 'Sending…')}
                        </>
                      ) : (
                        <>
                          <Send size={15} aria-hidden="true" className="rtl:rotate-180" />
                          {t('form.submit', 'Send Message')}
                        </>
                      )}
                    </motion.button>

                    {/* Privacy note */}
                    <p className="mt-1 text-center text-[11px] leading-5" style={{ color: css.mutedFg }}>
                      {t('form.privacy', 'We keep your details private and never share them with third parties.')}
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm