export const easePremium = [0.22, 1, 0.36, 1]
export const easeOut = [0.0, 0.0, 0.2, 1]

// ─── Reveal variants — increased distance + blur for premium feel ───
export const reveal = {
  hidden: { opacity: 0, y: 52, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: easePremium },
  },
}

// ─── Lighter reveal for small UI elements ───
export const revealSoft = {
  hidden: { opacity: 0, y: 28, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: easePremium },
  },
}

// ─── Heavy blur reveal for hero headline ───
export const blurReveal = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 60, scale: 0.97 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
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
