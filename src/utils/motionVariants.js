export const easePremium = [0.22, 1, 0.36, 1]
export const easeOut = [0.0, 0.0, 0.2, 1]

// ─── Reveal variants ─────────────────────────────────────────────────────────
// filter:blur() was removed from all variants. It looks great but forces a
// new compositing layer *and* triggers a style recalculation on every frame
// during the reveal sequence, which causes visible jank on initial load before
// the JS engine has fully warmed up. opacity + transform run entirely on the
// compositor thread and produce identical perceived smoothness on modern
// hardware. If you want blur back for a specific element, apply it only after
// the page has loaded (e.g. gate it behind a useEffect + state flag).

export const reveal = {
  hidden: { opacity: 0, y: 52 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easePremium },
  },
}

// ─── Lighter reveal for small UI elements ────────────────────────────────────
export const revealSoft = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easePremium },
  },
}

// ─── Hero headline reveal ────────────────────────────────────────────────────
// Was: blur(12px) + y:60 + scale:0.97. Kept the y+scale for visual weight;
// removed the blur so the compositor doesn't re-rasterize a large text node
// on every frame of the entrance animation.
export const blurReveal = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.0, ease: easePremium },
  },
}

// ─── Stagger container — hierarchy-aware delays ───
// Primary elements: 0s, secondary: 0.09s, tertiary: 0.19s, etc.
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.06 },
  },
}

// ─── Hero stagger — slightly more generous initial delay ───
export const staggerHero = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
}

// ─── Float transition — organic multi-axis movement ───
export const floatTransition = {
  duration: 8,
  repeat: Infinity,
  ease: 'easeInOut',
  repeatType: 'mirror',
}

// ─── Float keyframes — used in PhoneMockup ───
export const floatKeyframes = {
  y: [0, -10, -3, -10, 0],
  x: [0, 1.5, -1, 1.5, 0],
  rotate: [-0.3, 0.4, -0.15, 0.35, -0.3],
}

// ─── Persona transition ───
export const personaTransition = {
  duration: 0.48,
  ease: easePremium,
}

// ─── Scale-in for modal/card appears ───
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easePremium },
  },
}