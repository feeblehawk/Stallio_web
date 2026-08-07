# Stallio — About Page · Agent Sprint Plan

> **How to use this file:** Work through sprints in order. Each sprint is self-contained with exact file paths, exact code, and a done checklist. Do not start Sprint N+1 until every checkbox in Sprint N is ticked. Never hardcode colors, never write inline SVG paths, never write one-off animation objects — the rules in each sprint explain why.

---

## Context (read once, referenced throughout)

- **Stack:** React 19 + Vite + Tailwind v4 + Framer Motion + React Router v7
- **Token system:** All colors live in `src/index.css` as OKLCH CSS vars (`var(--primary)`, `var(--foreground)`, `var(--muted-foreground)`, `var(--border)`, `var(--surface)`, `var(--card)`, `var(--background)`). Dark mode is handled by `html.dark` overriding these vars. **Zero hardcoded hex/rgb anywhere.**
- **Motion system:** All animation variants live in `src/utils/motionVariants.js` — `reveal`, `revealSoft`, `blurReveal`, `staggerHero`, `staggerContainer`, `scaleIn`, `easePremium`. Import from there; never write `initial={{ opacity: 0, y: 20 }}` inline in components.
- **Reduced motion:** `src/hooks/useReducedMotion.js` already exists. Every animated section must import and respect it.
- **Reusable components:** `PrimaryCTA`, `BrandLogo` — never duplicate their logic.
- **Section spacing contract (must match home pages exactly):**
  - Outer padding: `py-24 sm:py-28 lg:py-32`
  - Container: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
  - Section divider: `border-t border-border`
- **Eyebrow label contract:** `text-[11px] font-semibold uppercase tracking-[0.2em]` + `style={{ color: 'var(--primary)' }}`

---

## Sprint 1 — Codebase Cleanup

**Goal:** Remove dead code and scaffold leftovers so the agent starts Sprint 2 with a clean tree. No new features. No UI changes. Pure deletion + one dependency install.

**Estimated time:** ~10 min

### 1.1 Install lucide-react

```bash
npm install lucide-react
```

Verify it appears in `package.json` dependencies before continuing.

### 1.2 Delete dead files

Delete these files entirely — they are either Vite scaffold or confirmed duplicates:

| File | Reason |
|---|---|
| `src/App.css` | Contains only Vite starter styles (`.counter`, `.hero`, `.framework`, `#center`, `#next-steps`). None are used by Stallio. Delete the file. |
| `src/assets/react.svg` | Vite scaffold asset, not used. |
| `src/assets/vite.svg` | Vite scaffold asset, not used. |
| `src/components/hero.jsx` | Lowercase duplicate of `src/components/home/Hero.jsx`. Dead code. |
| `src/components/BeforeAfter.jsx` | Root-level duplicate of `src/components/home/BeforeAfter.jsx`. Dead code. |
| `audit/` | Entire folder. Add `audit/` to `.gitignore`. |

### 1.3 Fix Google Fonts import in `src/index.css`

The current `@import` line in `index.css` loads Inter, Outfit, and Noto Sans Arabic — but `BrandLogo.jsx` uses `Great Vibes` which is missing, causing a silent font fallback.

**Replace** the existing `@import url(...)` line at the top of `src/index.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap');
```

### 1.4 Add `src/hooks/useInViewOnce.js`

Create this new file. It wraps `framer-motion`'s `useInView` with sane defaults so every section doesn't repeat the same `useRef + useInView` boilerplate.

```js
// src/hooks/useInViewOnce.js
import { useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Returns [ref, isInView].
 * Triggers once when the element enters the viewport (never re-fires on scroll back).
 * margin: '-80px' means the element must be 80px inside the viewport before firing.
 */
export const useInViewOnce = (options = {}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px', ...options })
  return [ref, isInView]
}
```

### Sprint 1 done checklist

- [ ] `lucide-react` present in `package.json` dependencies
- [ ] `src/App.css` deleted
- [ ] `src/assets/react.svg` deleted
- [ ] `src/assets/vite.svg` deleted
- [ ] `src/components/hero.jsx` (lowercase) deleted
- [ ] `src/components/BeforeAfter.jsx` (root-level) deleted
- [ ] `audit/` added to `.gitignore`
- [ ] `src/index.css` `@import` includes `Great+Vibes`
- [ ] `src/hooks/useInViewOnce.js` created
- [ ] `npm run dev` starts without errors

---

## Sprint 2 — Shared Icon Refactor

**Goal:** Eliminate all inline SVG `<path>` strings from shared components. After this sprint every icon in the project comes from `lucide-react` or a single shared wrapper. This is a consistency and maintainability fix — the visual result should be identical to before.

**Estimated time:** ~20 min

### 2.1 Create `src/components/icons/ArrowIcon.jsx`

The `ArrowRight` arrow is duplicated as a raw SVG in both `PrimaryCTA.jsx` and `FinalCta.jsx`. Extract it once:

```jsx
// src/components/icons/ArrowIcon.jsx
import { ArrowRight } from 'lucide-react'

/**
 * Shared arrow used in CTAs. Animates right on parent group hover.
 * size prop controls px size (default 14).
 */
const ArrowIcon = ({ size = 14, className = '' }) => (
  <ArrowRight
    size={size}
    className={`transition-transform duration-300 group-hover:translate-x-0.5 ${className}`}
    aria-hidden="true"
  />
)

export default ArrowIcon
```

### 2.2 Update `src/components/PrimaryCTA.jsx`

Remove the inline `ArrowIcon` SVG. Import the shared one instead.

**Delete** this block from `PrimaryCTA.jsx`:
```jsx
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    stroke="currentColor"
    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
)
```

**Add** at the top of the file:
```jsx
import ArrowIcon from './icons/ArrowIcon'
```

The `<ArrowIcon />` JSX usage in the return stays exactly the same.

### 2.3 Update `src/components/home/FinalCta.jsx`

Same change as 2.2 — remove the duplicate inline `ArrowIcon` SVG, import from `../icons/ArrowIcon`.

### 2.4 Update `src/components/Navbar.jsx`

Replace the manual hamburger/close spans with Lucide icons.

**Add** to imports:
```jsx
import { Menu, X } from 'lucide-react'
```

**Replace** the `<span className="relative flex h-5 w-5 ...">` block (the three bar spans) inside the mobile menu button with:
```jsx
{isOpen ? (
  <X size={20} aria-hidden="true" />
) : (
  <Menu size={20} aria-hidden="true" />
)}
```

The button's `aria-label` and `aria-expanded` props stay unchanged.

### 2.5 Update `src/components/Footer.jsx`

Replace the five inline SVG social icons with Lucide equivalents.

**Replace** the entire `socialPlatforms` array with:
```jsx
import { Linkedin, Instagram, Twitter, Youtube, Facebook } from 'lucide-react'

const socialPlatforms = [
  { name: 'LinkedIn',   Icon: Linkedin  },
  { name: 'Instagram',  Icon: Instagram },
  { name: 'X',         Icon: Twitter   },
  { name: 'YouTube',   Icon: Youtube   },
  { name: 'Facebook',  Icon: Facebook  },
]
```

**Replace** the social icon render block with:
```jsx
{socialPlatforms.map(({ name, Icon }) => (
  <span
    key={name}
    role="img"
    aria-label={`${name} — coming soon`}
    title={`${name} — coming soon`}
    className="flex h-9 w-9 cursor-default items-center justify-center rounded-lg border border-border bg-background text-muted-foreground opacity-60"
  >
    <Icon size={16} aria-hidden="true" />
  </span>
))}
```

### Sprint 2 done checklist

- [ ] `src/components/icons/ArrowIcon.jsx` created
- [ ] `PrimaryCTA.jsx` — inline SVG `ArrowIcon` removed, imports shared `ArrowIcon`
- [ ] `FinalCta.jsx` — inline SVG `ArrowIcon` removed, imports shared `ArrowIcon`
- [ ] `Navbar.jsx` — hamburger/close spans replaced with `<Menu>` / `<X>` from lucide-react
- [ ] `Footer.jsx` — `socialPlatforms` array uses Lucide icons, no inline SVG paths remain
- [ ] `npm run dev` — visually identical to before, no console errors

---

## Sprint 3 — Shared `Stat` Component

**Goal:** Extract the `Stat` component from `WhyStallio.jsx` into a shared file so it can be reused on the About page without code duplication.

**Estimated time:** ~10 min

### 3.1 Create `src/components/Stat.jsx`

Copy the `Stat` component out of `WhyStallio.jsx` and into a standalone file:

```jsx
// src/components/Stat.jsx
import { motion } from 'framer-motion'
import { easePremium } from '../utils/motionVariants'

/**
 * A single stat display: large number + small label.
 * Used in WhyStallio (home) and StatsStrip (about).
 *
 * Props:
 *   num          — string, e.g. "500+"
 *   label        — string, e.g. "Sellers"
 *   delay        — number, animation delay in seconds
 *   isVisible    — boolean, drives the animate state
 *   reducedMotion — boolean, from useReducedMotion()
 */
const Stat = ({ num, label, delay = 0, isVisible, reducedMotion }) => (
  <motion.div
    className="flex flex-col gap-0.5"
    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
    animate={isVisible ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.65, ease: easePremium, delay }}
  >
    <span
      className="font-heading font-extrabold leading-none tracking-[-0.04em]"
      style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--primary)' }}
    >
      {num}
    </span>
    <span
      className="text-[11px] font-semibold uppercase tracking-[0.14em]"
      style={{ color: 'var(--muted-foreground)' }}
    >
      {label}
    </span>
  </motion.div>
)

export default Stat
```

### 3.2 Update `src/components/home/WhyStallio.jsx`

Remove the local `Stat` definition and import the shared one instead.

**Delete** the `const Stat = ...` block from `WhyStallio.jsx`.

**Add** to imports:
```jsx
import Stat from '../Stat'
```

Everything else in `WhyStallio.jsx` stays unchanged.

### Sprint 3 done checklist

- [ ] `src/components/Stat.jsx` created
- [ ] `WhyStallio.jsx` — local `Stat` definition removed, imports from `../Stat`
- [ ] `npm run dev` — home page stats render identically, no console errors

---

## Sprint 4 — About Page Scaffold

**Goal:** Create the folder structure and empty component files for the About page. Wire them into `src/pages/About.jsx`. No visual content yet — just the skeleton so `npm run dev` and visiting `/about` shows the Navbar + Footer with empty section placeholders.

**Estimated time:** ~15 min

### 4.1 Create `src/components/about/` folder with empty components

Create each file below with just a named default export returning `null` for now. The content is built section by section in Sprint 5.

**`src/components/about/AboutHero.jsx`**
```jsx
const AboutHero = () => null
export default AboutHero
```

**`src/components/about/Mission.jsx`**
```jsx
const Mission = () => null
export default Mission
```

**`src/components/about/Story.jsx`**
```jsx
const Story = () => null
export default Story
```

**`src/components/about/Values.jsx`**
```jsx
const Values = () => null
export default Values
```

**`src/components/about/StatsStrip.jsx`**
```jsx
const StatsStrip = () => null
export default StatsStrip
```

**`src/components/about/AboutCta.jsx`**
```jsx
const AboutCta = () => null
export default AboutCta
```

### 4.2 Replace `src/pages/About.jsx`

Replace the current one-liner (`import ComingSoon from './ComingSoon'; const About = () => <ComingSoon />`) with:

```jsx
// src/pages/About.jsx
import AboutHero from '../components/about/AboutHero'
import Mission from '../components/about/Mission'
import Story from '../components/about/Story'
import Values from '../components/about/Values'
import StatsStrip from '../components/about/StatsStrip'
import AboutCta from '../components/about/AboutCta'

const About = () => (
  <>
    <AboutHero />
    <Mission />
    <Story />
    <Values />
    <StatsStrip />
    <AboutCta />
  </>
)

export default About
```

### Sprint 4 done checklist

- [ ] `src/components/about/` folder exists
- [ ] `AboutHero.jsx`, `Mission.jsx`, `Story.jsx`, `Values.jsx`, `StatsStrip.jsx`, `AboutCta.jsx` all created (returning `null`)
- [ ] `src/pages/About.jsx` updated to import and render all six
- [ ] `/about` route renders blank page (no ComingSoon), Navbar and Footer visible
- [ ] No console errors

---

## Sprint 5 — Build About Sections (one sub-task per section)

**Goal:** Build each About section with full content, matching the home page's design language exactly. Work through 5.1 → 5.6 in order. Each sub-task is independent once the scaffold from Sprint 4 is in place.

**Global rules for every section in this sprint:**
- All colors via CSS vars only — `var(--primary)`, `var(--foreground)`, etc.
- All animations imported from `src/utils/motionVariants.js`
- `useReducedMotion()` imported and respected in every animated component
- `useInViewOnce` from `src/hooks/useInViewOnce.js` for scroll-triggered sections
- Lucide icons only — no inline SVG paths
- Spacing: `py-24 sm:py-28 lg:py-32` + `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
- Every `<section>` has `aria-labelledby` pointing to the section's `<h2>` id

---

### 5.1 `AboutHero.jsx`

Design: Full-width text hero. Left-aligned headline, eyebrow badge, one paragraph. Subtle radial gradient background (mirrored from `home/Hero.jsx` but gradient origin shifted to left). No phone mockup — this page is about the company, not the product.

```jsx
// src/components/about/AboutHero.jsx
import { motion } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'
import { blurReveal, reveal, revealSoft, staggerHero } from '../../utils/motionVariants'

const AboutHero = () => {
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: 'visible' }

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative isolate overflow-hidden border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Background — radial gradient, origin shifted left to differ from Home */}
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 55% at 20% 30%, color-mix(in oklch, var(--primary) 7%, transparent), transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <motion.div className="max-w-3xl" variants={staggerHero} {...motionProps}>

          {/* Eyebrow */}
          <motion.div variants={revealSoft}>
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
              style={{
                borderColor: 'var(--border)',
                background: 'color-mix(in oklch, var(--surface) 78%, transparent)',
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--primary)' }}
              />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--muted-foreground)' }}
              >
                About Stallio
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="about-hero-heading"
            variants={blurReveal}
            className="font-heading font-extrabold tracking-[-0.04em]"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.0,
              color: 'var(--foreground)',
            }}
          >
            Built for sellers
            <br />who move fast.
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={reveal}
            className="mt-6 max-w-xl text-base leading-7 sm:text-lg"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Stallio started with one observation: Pakistan's best sellers were already
            selling on Instagram and WhatsApp — they just needed a real store to match.
            We built exactly that.
          </motion.p>

        </motion.div>
      </div>
    </section>
  )
}

export default AboutHero
```

**Done:** `/about` shows a hero section that visually matches the home hero's typographic style.

---

### 5.2 `Mission.jsx`

Design: Full-width typographic statement. A single bold quote with a left primary-color border accent. No card, no image — pure type. This is the emotional core of the page.

```jsx
// src/components/about/Mission.jsx
import { motion } from 'framer-motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'
import { reveal, revealSoft } from '../../utils/motionVariants'

const Mission = () => {
  const [ref, isInView] = useInViewOnce()
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <section
      aria-labelledby="mission-heading"
      className="border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div ref={ref}>

          {/* Eyebrow */}
          <motion.span
            variants={revealSoft}
            {...motionProps}
            className="mb-8 inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: 'var(--primary)' }}
          >
            Our mission
          </motion.span>

          {/* Quote block */}
          <motion.blockquote
            variants={reveal}
            {...motionProps}
            className="border-l-2 pl-8 max-w-3xl"
            style={{ borderColor: 'var(--primary)' }}
          >
            <p
              className="font-heading font-bold leading-tight"
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
                color: 'var(--foreground)',
              }}
            >
              Commerce moves through DMs.
              <br />We built the store for that.
            </p>
            <footer
              className="mt-6 text-sm font-medium"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <cite style={{ fontStyle: 'normal' }}>Stallio, 2024</cite>
            </footer>
          </motion.blockquote>

        </div>
      </div>
    </section>
  )
}

export default Mission
```

---

### 5.3 `Story.jsx`

Design: Two-column layout on desktop. Left column: sparse vertical timeline (year + connector line). Right column: narrative prose. Single column on mobile (timeline above prose). Background: `var(--background)` to alternate with Mission's `var(--surface)`.

```jsx
// src/components/about/Story.jsx
import { motion } from 'framer-motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'
import { reveal, revealSoft, staggerContainer } from '../../utils/motionVariants'

const TIMELINE = [
  { year: '2023', label: 'The problem' },
  { year: '2024', label: 'First version' },
  { year: '2025', label: 'Growing fast' },
]

const Story = () => {
  const [ref, isInView] = useInViewOnce()
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <section
      aria-labelledby="story-heading"
      className="border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        {/* Eyebrow */}
        <motion.span
          variants={revealSoft}
          {...motionProps}
          className="mb-10 inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: 'var(--primary)' }}
        >
          Our story
        </motion.span>

        <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-20">

          {/* Left: Timeline */}
          <motion.div
            variants={staggerContainer}
            {...motionProps}
            className="flex flex-row gap-8 lg:flex-col lg:gap-0"
          >
            {TIMELINE.map(({ year, label }, i) => (
              <motion.div key={year} variants={revealSoft} className="flex lg:flex-col">
                <div className="flex items-start gap-3 lg:flex-row">
                  {/* Dot + connector line (vertical on desktop) */}
                  <div className="flex flex-col items-center lg:flex-col">
                    <span
                      className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full"
                      style={{ background: 'var(--primary)' }}
                    />
                    {i < TIMELINE.length - 1 && (
                      <span
                        className="hidden lg:block w-px flex-1 mt-2"
                        style={{
                          height: '48px',
                          background:
                            'linear-gradient(to bottom, var(--primary), var(--border))',
                          opacity: 0.4,
                        }}
                      />
                    )}
                  </div>
                  <div className="pb-8 lg:pb-10">
                    <div
                      className="font-heading text-sm font-bold"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {year}
                    </div>
                    <div
                      className="mt-0.5 text-xs font-medium"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Narrative */}
          <motion.div variants={reveal} {...motionProps} className="space-y-6">
            <h2
              id="story-heading"
              className="font-heading font-extrabold tracking-[-0.03em]"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                color: 'var(--foreground)',
              }}
            >
              Why we built Stallio
            </h2>
            <div
              className="space-y-5 text-base leading-7 sm:text-lg"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <p>
                We watched talented sellers spend their days copy-pasting product details
                into WhatsApp DMs, tracking orders in handwritten notebooks, and losing
                buyers to a checkout process that didn't exist.
              </p>
              <p>
                The tools they had were built for warehouses, not for someone running a
                boutique from their phone. So in 2024, we built Stallio — a store that
                lives at a single link and fits the way social selling actually works
                in Pakistan.
              </p>
              <p>
                No domains to configure. No payment gateways to negotiate. Just your
                products, your buyers, and one link you share everywhere.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Story
```

---

### 5.4 `Values.jsx`

Design: 4-card grid. Each card: Lucide icon in a tinted pill, title, one-line description. Background: `var(--surface)` to alternate with Story.

```jsx
// src/components/about/Values.jsx
import { motion } from 'framer-motion'
import { Zap, Shield, Users, Smartphone } from 'lucide-react'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'
import { revealSoft, staggerContainer } from '../../utils/motionVariants'

const VALUES = [
  {
    Icon: Zap,
    title: 'Speed over ceremony',
    desc: 'If it takes more than a minute to set up, we rethink it.',
  },
  {
    Icon: Shield,
    title: 'Sellers keep control',
    desc: 'Your payments, your buyers, your data. We stay out of the middle.',
  },
  {
    Icon: Users,
    title: 'Built for this market',
    desc: 'Designed for how social commerce actually works in Pakistan.',
  },
  {
    Icon: Smartphone,
    title: 'Mobile first, always',
    desc: 'Your buyers are on their phones. So is every pixel we write.',
  },
]

const Values = () => {
  const [ref, isInView] = useInViewOnce()
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <section
      aria-labelledby="values-heading"
      className="border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">

        {/* Header */}
        <div className="mb-14 max-w-xl">
          <span
            className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: 'var(--primary)' }}
          >
            What we believe
          </span>
          <h2
            id="values-heading"
            className="font-heading font-extrabold tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: 'var(--foreground)',
            }}
          >
            Our values
          </h2>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          {...motionProps}
        >
          {VALUES.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={revealSoft}
              className="flex flex-col gap-4 rounded-2xl border p-6 transition-shadow duration-200 hover:shadow-md"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--card)',
              }}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: 'color-mix(in oklch, var(--primary) 10%, var(--surface))',
                  color: 'var(--primary)',
                }}
              >
                <Icon size={18} aria-hidden="true" />
              </span>
              <div>
                <h3
                  className="font-heading text-base font-semibold"
                  style={{ color: 'var(--foreground)' }}
                >
                  {title}
                </h3>
                <p
                  className="mt-1.5 text-sm leading-relaxed"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default Values
```

---

### 5.5 `StatsStrip.jsx`

Design: Horizontal strip of 3 stats using the shared `Stat` component (built in Sprint 3). Clean divider lines between stats on desktop.

```jsx
// src/components/about/StatsStrip.jsx
import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'
import Stat from '../Stat'

const STATS = [
  { num: '500+',   label: 'Active sellers',   delay: 0    },
  { num: '50+',    label: 'Cities reached',   delay: 0.12 },
  { num: '100K+',  label: 'Orders managed',   delay: 0.24 },
]

const StatsStrip = () => {
  const [ref, isInView] = useInViewOnce()
  const reducedMotion = useReducedMotion()

  return (
    <section
      aria-label="Stallio by the numbers"
      className="border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div
          ref={ref}
          className="flex flex-col items-center gap-10 sm:flex-row sm:justify-around sm:divide-x"
          style={{ '--tw-divide-opacity': 1 }}
        >
          {STATS.map(({ num, label, delay }) => (
            <div key={label} className="flex-1 text-center sm:text-left sm:px-8 first:pl-0 last:pr-0">
              <Stat
                num={num}
                label={label}
                delay={delay}
                isVisible={isInView}
                reducedMotion={reducedMotion}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsStrip
```

---

### 5.6 `AboutCta.jsx`

Design: Mirrors the structure and gradient of `home/FinalCta.jsx`. Uses `PrimaryCTA` — no new CTA button logic. Consistency is the goal here.

```jsx
// src/components/about/AboutCta.jsx
import { motion } from 'framer-motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'
import { reveal, revealSoft } from '../../utils/motionVariants'
import PrimaryCTA from '../PrimaryCTA'

const AboutCta = () => {
  const [ref, isInView] = useInViewOnce()
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <section
      aria-labelledby="about-cta-heading"
      className="border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Gradient background — matches FinalCta */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 100%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 70%), var(--surface)',
        }}
      >
        <div
          ref={ref}
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32 text-center"
        >
          <motion.span
            variants={revealSoft}
            {...motionProps}
            className="mb-6 inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: 'var(--primary)' }}
          >
            Get started
          </motion.span>

          <motion.h2
            id="about-cta-heading"
            variants={reveal}
            {...motionProps}
            className="font-heading font-extrabold tracking-[-0.04em]"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.05,
              color: 'var(--foreground)',
            }}
          >
            Ready to open your store?
          </motion.h2>

          <motion.p
            variants={reveal}
            {...motionProps}
            className="mx-auto mt-5 max-w-md text-base leading-7 sm:text-lg"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Join hundreds of sellers who launched their store in minutes — no domain,
            no gateway, no code.
          </motion.p>

          <motion.div
            variants={revealSoft}
            {...motionProps}
            className="mt-8 flex justify-center"
          >
            <PrimaryCTA size="lg" className="text-base shadow-lg shadow-black/5" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutCta
```

### Sprint 5 done checklist

- [ ] `AboutHero.jsx` — hero section renders, matches home hero typography scale
- [ ] `Mission.jsx` — blockquote with left primary border renders
- [ ] `Story.jsx` — two-column layout on desktop, timeline + narrative visible
- [ ] `Values.jsx` — 4-card grid renders with Lucide icons
- [ ] `StatsStrip.jsx` — 3 stats render using shared `Stat` component
- [ ] `AboutCta.jsx` — gradient CTA section renders with `PrimaryCTA`
- [ ] All sections: **zero hardcoded colors** (grep for `#`, `rgb(`, `oklch(` in `src/components/about/` — only CSS vars allowed)
- [ ] All sections: **zero inline SVG paths** (grep for `<path d=` in `src/components/about/`)
- [ ] All sections: **animations use motionVariants** (grep for `initial={{` in `src/components/about/` — should be zero hits)
- [ ] Dark mode: toggle dark mode in browser — all sections render correctly
- [ ] Mobile: check `/about` at 375px width — no horizontal overflow, all sections stack correctly
- [ ] `npm run dev` — no console errors or warnings

---

## Sprint 6 — QA & Polish

**Goal:** Final pass for consistency, accessibility, and performance. No new features.

**Estimated time:** ~20 min

### 6.1 Accessibility audit

Run through `/about` with keyboard only:
- [ ] Tab order is logical (Navbar → page sections → Footer)
- [ ] Every interactive element has a visible focus ring (the `focus-visible:outline-2` classes from the design system handle this)
- [ ] Every `<section>` has `aria-labelledby` pointing to a real `id` on an `h1`/`h2`

### 6.2 Cross-theme check

Toggle between light and dark mode on every section:
- [ ] `AboutHero` — background gradient, text, border all switch correctly
- [ ] `Mission` — blockquote border and text switch correctly
- [ ] `Story` — timeline dots, connector, card backgrounds switch correctly
- [ ] `Values` — card backgrounds, icon tint, borders switch correctly
- [ ] `StatsStrip` — stat colors and labels switch correctly
- [ ] `AboutCta` — gradient and text switch correctly

### 6.3 Mobile check at 375px

- [ ] `AboutHero` — headline doesn't overflow, `clamp` handles font scaling
- [ ] `Mission` — blockquote `pl-8` doesn't cause overflow on narrow screens. If it does, reduce to `pl-6`
- [ ] `Story` — timeline items stack vertically above narrative. `lg:grid-cols` collapses to single column
- [ ] `Values` — 4 cards become 2×2 at `sm:`, then 1-col at mobile
- [ ] `StatsStrip` — 3 stats stack vertically, centered

### 6.4 Animation performance check

Open Chrome DevTools → Performance → record a scroll through `/about`:
- [ ] No `layout` or `paint` entries triggered by animations (only `composite` — confirms we're only animating `opacity`, `transform`, `filter`)
- [ ] No `motion.div` re-animates when scrolling back up (confirms `once: true` in `useInViewOnce`)

### 6.5 Reduced motion check

In Chrome: Settings → Accessibility → Enable emulate prefers-reduced-motion:
- [ ] All `motion.div` elements render in their final state immediately — no animation plays
- [ ] Page is fully usable and readable

### Sprint 6 done checklist

- [ ] Keyboard navigation passes
- [ ] All sections verified in light mode
- [ ] All sections verified in dark mode
- [ ] Mobile layout verified at 375px
- [ ] No layout-shift animations in DevTools
- [ ] Reduced motion passes
- [ ] `npm run build` completes with no errors

---

## Final File Tree After All Sprints

```
src/
├── assets/
│   └── hero.png
├── components/
│   ├── about/
│   │   ├── AboutCta.jsx
│   │   ├── AboutHero.jsx
│   │   ├── Mission.jsx
│   │   ├── Story.jsx
│   │   ├── StatsStrip.jsx
│   │   └── Values.jsx
│   ├── home/
│   │   └── [unchanged, WhyStallio.jsx now imports Stat from ../Stat]
│   ├── icons/
│   │   └── ArrowIcon.jsx
│   ├── BrandLogo.jsx
│   ├── Footer.jsx          ← lucide social icons
│   ├── Navbar.jsx          ← lucide Menu/X icons
│   ├── PrimaryCTA.jsx      ← imports shared ArrowIcon
│   ├── Stat.jsx            ← extracted from WhyStallio
│   └── ThemeToggle.jsx
├── hooks/
│   ├── useInViewOnce.js    ← new
│   └── useReducedMotion.js
├── pages/
│   ├── About.jsx           ← replaced
│   ├── ComingSoon.jsx
│   └── Home.jsx
└── [everything else unchanged]
```
