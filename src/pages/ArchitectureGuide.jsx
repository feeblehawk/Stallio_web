import { useState } from "react";

const tabs = ["Overview", "Folder Structure", "Styling System", "Component Patterns", "Migration Plan"];

const sectionColor = "bg-[#0f0f18]";
const cardBg = "bg-[#16162a]";
const border = "border border-[#2a2a45]";
const accent = "#7c6cf0";
const accentLight = "#a89cf5";
const green = "#4ade80";
const yellow = "#facc15";
const red = "#f87171";
const blue = "#60a5fa";

function Tag({ color = accent, children }) {
  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide"
      style={{ background: color + "22", color: color, border: `1px solid ${color}44` }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-white">{children}</h2>
      {sub && <p className="mt-1 text-sm text-[#8888aa]">{sub}</p>}
    </div>
  );
}

function CodeBlock({ code, label, lang = "jsx" }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className={`rounded-xl ${border} overflow-hidden mb-4`}>
      {label && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a30] border-b border-[#2a2a45]">
          <span className="text-[11px] font-mono text-[#8888aa]">{label}</span>
          <button onClick={copy} className="text-[11px] text-[#6666aa] hover:text-white transition-colors">
            {copied ? "✓ copied" : "copy"}
          </button>
        </div>
      )}
      <pre className="p-4 text-[12px] font-mono text-[#c8c8e8] bg-[#111122] overflow-x-auto leading-relaxed whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

function ProblemFix({ problem, fix, severity = "medium" }) {
  const colors = { high: red, medium: yellow, low: green };
  const c = colors[severity];
  return (
    <div className={`rounded-xl ${border} p-4 mb-3 bg-[#13131f]`}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-base" style={{ color: c }}>⚠</span>
        <div className="flex-1">
          <div className="text-[12px] font-semibold mb-1" style={{ color: c }}>PROBLEM</div>
          <p className="text-[12px] text-[#9999bb] mb-2">{problem}</p>
          <div className="text-[12px] font-semibold mb-1" style={{ color: green }}>✓ FIX</div>
          <p className="text-[12px] text-[#9999bb]">{fix}</p>
        </div>
      </div>
    </div>
  );
}

// ── TAB 1: Overview ──────────────────────────────────────────────────────────
function OverviewTab() {
  return (
    <div>
      <SectionTitle
        children="What You Have vs. What You Need"
        sub="An honest diagnosis of your current codebase and the target architecture"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Current state */}
        <div className={`rounded-xl ${border} p-5 bg-[#1a0a0a]`}>
          <div className="flex items-center gap-2 mb-4">
            <span style={{ color: red }}>✗</span>
            <span className="text-sm font-bold text-white">Current State (Issues)</span>
          </div>
          {[
            ["Inline style= everywhere", "Hard to maintain, breaks dark mode, can't be purged by Tailwind"],
            ["Local css={} objects per file", "Duplicated in InsidetheBox, WhatYouGet, HowItWorks, etc."],
            ["react-icons AND lucide-react", "Two icon libraries = bundle bloat. Pick one."],
            ["Giant section files (38KB!)", "HowItWorks.jsx and InsidetheBox.jsx need to be split"],
            ["No shared primitive components", "Button, Badge, Card — all re-implemented per section"],
            ["No services/api layer", "src/api/ folder exists but is empty — APIs will live in components"],
          ].map(([title, desc]) => (
            <div key={title} className="mb-3">
              <div className="text-[12px] font-semibold text-[#ff9999] mb-0.5">{title}</div>
              <div className="text-[11px] text-[#776677]">{desc}</div>
            </div>
          ))}
        </div>

        {/* Target state */}
        <div className={`rounded-xl ${border} p-5 bg-[#0a1a0a]`}>
          <div className="flex items-center gap-2 mb-4">
            <span style={{ color: green }}>✓</span>
            <span className="text-sm font-bold text-white">Target Architecture</span>
          </div>
          {[
            ["Tailwind-first styling", "CSS tokens in @theme, utility classes in JSX, no inline style"],
            ["Single source of truth tokens", "One cssTokens.js — already started, needs full adoption"],
            ["lucide-react only", "Remove react-icons, map all icons to lucide equivalents"],
            ["UI primitive library", "src/components/ui/ — Button, Badge, Card, EyebrowBadge etc."],
            ["Feature-colocated code", "Each page owns its hooks, types, and services"],
            ["Typed API layer", "src/services/ — one file per domain (orders, products, auth…)"],
          ].map(([title, desc]) => (
            <div key={title} className="mb-3">
              <div className="text-[12px] font-semibold text-[#99ff99] mb-0.5">{title}</div>
              <div className="text-[11px] text-[#557755]">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture diagram */}
      <div className={`rounded-xl ${border} p-5 mb-6 ${cardBg}`}>
        <div className="text-sm font-bold text-white mb-4">Architecture Layers</div>
        <div className="space-y-2">
          {[
            { layer: "Pages", desc: "Route-level components — thin orchestrators only", files: "src/pages/", color: blue },
            { layer: "Sections", desc: "Page-specific layout chunks, colocated with their page", files: "src/pages/home/sections/", color: accentLight },
            { layer: "UI Components", desc: "Design-system primitives — Button, Card, Badge, Icon", files: "src/components/ui/", color: accent },
            { layer: "Feature Components", desc: "Domain widgets — Navbar, Footer, PhoneMockup", files: "src/components/", color: yellow },
            { layer: "Hooks", desc: "Shared custom hooks — useInViewOnce, useReducedMotion", files: "src/hooks/", color: green },
            { layer: "Services", desc: "API calls, data fetching — one file per domain", files: "src/services/", color: "#f97316" },
            { layer: "Design Tokens", desc: "CSS custom props in index.css, JS aliases in cssTokens.js", files: "src/utils/cssTokens.js", color: "#e879f9" },
          ].map(({ layer, desc, files, color }) => (
            <div key={layer} className="flex items-center gap-3 rounded-lg px-4 py-3 bg-[#111122]">
              <div className="w-28 shrink-0 text-[11px] font-bold" style={{ color }}>{layer}</div>
              <div className="flex-1 text-[11px] text-[#9999bb]">{desc}</div>
              <div className="text-[10px] font-mono text-[#555577] hidden md:block">{files}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TAB 2: Folder Structure ───────────────────────────────────────────────────
function FolderTab() {
  return (
    <div>
      <SectionTitle
        children="Professional Folder Structure"
        sub="Feature-colocated architecture — the industry standard for growing apps"
      />

      <CodeBlock
        label="src/ — target structure"
        code={`src/
├── App.jsx                    # Routes only — already clean ✓
├── main.jsx
├── index.css                  # @theme tokens — already solid ✓
│
├── assets/                    # Static: images, fonts, icons (SVG)
│   └── images/
│
├── components/
│   ├── ui/                    # ← NEW: Design-system primitives
│   │   ├── Button.jsx         #   Variants: primary | ghost | outline
│   │   ├── Badge.jsx          #   EyebrowBadge, StatusPill, Tag
│   │   ├── Card.jsx           #   Surface wrapper with border/shadow
│   │   ├── SectionWrapper.jsx #   max-w, px, py — replaces per-section divs
│   │   └── index.js           #   Barrel export
│   │
│   ├── motion/                # Already exists ✓ — keep as-is
│   │   ├── AnimatedGroup.jsx
│   │   ├── AnimatedNumber.jsx
│   │   ├── Disclosure.jsx
│   │   └── TiltCard.jsx
│   │
│   ├── icons/                 # ← Only if custom SVG icons needed
│   │   └── (remove ArrowIcon — use lucide <ArrowRight>)
│   │
│   ├── BrandLogo.jsx          # ✓
│   ├── Footer.jsx             # ✓
│   ├── Navbar.jsx             # ✓
│   ├── PhoneMockup.jsx        # ✓
│   ├── PrimaryCTA.jsx         # ✓
│   ├── SectionHeading.jsx     # ✓
│   ├── Stat.jsx               # ✓
│   └── ThemeToggle.jsx        # ✓
│
├── pages/
│   ├── home/
│   │   ├── Home.jsx           # Thin page: imports sections only
│   │   ├── sections/          # ✓ Already colocated — good pattern!
│   │   │   ├── Hero.jsx
│   │   │   ├── HowItWorks/    # ← Split big files into subfolders
│   │   │   │   ├── index.jsx
│   │   │   │   ├── SceneSocial.jsx
│   │   │   │   ├── SceneStore.jsx
│   │   │   │   └── constants.js  # SCENES[], PRODUCTS[]
│   │   │   └── ...
│   │   └── home.constants.js  # Page-specific data arrays
│   │
│   ├── about/                 # ✓ Already colocated
│   ├── features/              # ✓
│   └── howitworks/            # ✓
│
├── hooks/                     # Shared hooks only
│   ├── useInViewOnce.js       # ✓
│   └── useReducedMotion.js    # ✓
│
├── contexts/
│   └── ThemeContext.jsx       # ✓
│
├── layouts/
│   └── MainLayout.jsx         # ✓
│
├── services/                  # ← NEW: API layer (when you add backend)
│   ├── api.js                 #   Base fetch/axios config
│   ├── products.service.js    #   getProducts(), getProduct(id)
│   ├── orders.service.js      #   createOrder(), getOrders()
│   └── auth.service.js        #   login(), logout(), getMe()
│
└── utils/
    ├── cssTokens.js           # ✓ Centralise — stop local css={} objects
    ├── motionVariants.js      # ✓
    └── cn.js                  # ← NEW: className merge helper`}
      />

      <div className={`rounded-xl ${border} p-4 ${cardBg} mb-4`}>
        <div className="text-sm font-bold text-white mb-3">The Golden Rule: Colocation</div>
        <p className="text-[12px] text-[#9999bb] mb-3">
          You already do this well with <code className="text-[#a89cf5] bg-[#1a1a35] px-1 rounded">pages/home/sections/</code>. The principle: 
          <strong className="text-white"> if a file is only used by one page, it lives inside that page's folder.</strong>
          Only promote to <code className="text-[#a89cf5] bg-[#1a1a35] px-1 rounded">src/components/</code> when two+ pages need it.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg bg-[#0a1a0a] p-3">
            <div className="text-[11px] text-green-400 font-bold mb-1">✓ Stays in page folder</div>
            <div className="text-[11px] text-[#557755] font-mono">pages/home/sections/Hero.jsx<br/>pages/about/sections/Mission.jsx<br/>pages/home/home.constants.js</div>
          </div>
          <div className="rounded-lg bg-[#1a1a0a] p-3">
            <div className="text-[11px] text-yellow-400 font-bold mb-1">↑ Promote to components/</div>
            <div className="text-[11px] text-[#775500] font-mono">EyebrowBadge (used everywhere)<br/>StatChip (multiple pages)<br/>SectionWrapper div pattern</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TAB 3: Styling System ─────────────────────────────────────────────────────
function StylingTab() {
  return (
    <div>
      <SectionTitle
        children="The Styling Hierarchy"
        sub="A clear decision tree: reach for the right tool in the right order"
      />

      {/* Decision tree */}
      <div className={`rounded-xl ${border} p-5 mb-6 ${cardBg}`}>
        <div className="text-sm font-bold text-white mb-4">When to use what — in order of preference</div>
        <div className="space-y-2">
          {[
            { n: "1", label: "Tailwind utility class", use: "90% of all styling", example: `className="rounded-xl border px-4 py-3 text-sm font-medium"`, color: green },
            { n: "2", label: "CSS token via Tailwind", use: "Themed colours from your @theme", example: `className="bg-primary text-primary-foreground border-border"`, color: accentLight },
            { n: "3", label: "CSS token shorthand (cn helper)", use: "Computed token values (color-mix)", example: `style={{ background: css.p10 }}   ← only for color-mix values`, color: yellow },
            { n: "4", label: "CSS custom property in index.css", use: "Global overrides, scrollbar, transitions", example: `html.dark { --primary: oklch(0.58 0.18 268); }  ← already correct`, color: blue },
            { n: "✗", label: "Hard-coded colour / px value", use: "Never", example: `style={{ color: '#ff0000', fontSize: '14px' }}  ← remove all of these`, color: red },
          ].map(({ n, label, use, example, color }) => (
            <div key={n} className="rounded-lg bg-[#111122] p-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5" style={{ background: color + "22", color }}>{n}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] font-semibold text-white">{label}</span>
                    <Tag color={color}>{use}</Tag>
                  </div>
                  <code className="text-[10px] font-mono text-[#7777aa]">{example}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The big problem: local css objects */}
      <ProblemFix
        severity="high"
        problem="You have a local css = { primary: 'var(--primary)', ... } object defined inside InsidetheBox.jsx, WhatYouGet.jsx, and several other files. This is copy-pasted duplication — if you rename a token, you must find every file."
        fix="Import from the single cssTokens.js you already have: import { css } from '../../../utils/cssTokens'. Then delete the local css object from every component."
      />

      <ProblemFix
        severity="high"
        problem="Hard-coded oklch values scattered in JSX: style={{ color: 'oklch(0.58 0.18 145)' }} for success green, inline in StatChip, StatusPill etc."
        fix="These are already in cssTokens.js as css.success. Use the import. For Tailwind: map them in @theme as --color-success so you can write className='text-success'."
      />

      <ProblemFix
        severity="medium"
        problem="react-icons (FaInstagram, FaWhatsapp, FaLink) coexists with lucide-react — you're bundling two icon libraries."
        fix="Lucide has no brand icons (Instagram, WhatsApp). For brand icons use a tiny dedicated package like react-icons/fa6 only for social logos, and lucide-react for all UI icons (arrows, check, menu, x, etc.)."
      />

      <CodeBlock
        label="utils/cn.js — add this utility (classname merger)"
        code={`// Install: npm i clsx tailwind-merge
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Usage in components:
// <div className={cn("rounded-xl border px-4", isActive && "bg-primary text-white", className)} />`}
      />

      <CodeBlock
        label="index.css — extend your @theme to eliminate hard-coded token JS"
        code={`@theme {
  /* Already have these — great ✓ */
  --color-primary: var(--primary);
  --color-border: var(--border);

  /* ADD: semantic status colours as Tailwind classes */
  --color-success: var(--success);
  --color-success-bg: var(--success-bg);
  --color-info: var(--info);
  --color-muted: var(--muted);
  --color-surface: var(--surface);
  --color-surface-muted: var(--surface-muted);
}

/* Result: replace style={{ color: css.success }} with className="text-success" */`}
      />

      <CodeBlock
        label="The inline style you can't avoid — and how to contain it"
        code={`// color-mix() values can't yet be expressed as Tailwind utilities.
// This is the ONLY acceptable use of style={} in your codebase:
// ✓ Acceptable — dynamic computed colour
<div style={{ background: css.p10 }}>

// ✗ Never — hard-coded value should be a class or token
<div style={{ background: '#f0f0f5' }}>
<div style={{ fontSize: '14px' }}>
<div style={{ padding: '16px 24px' }}>
<div style={{ borderRadius: '12px' }}>

// All of the above → Tailwind classes:
<div className="bg-surface-muted text-sm px-6 py-4 rounded-xl">`}
      />
    </div>
  );
}

// ── TAB 4: Component Patterns ─────────────────────────────────────────────────
function ComponentsTab() {
  return (
    <div>
      <SectionTitle
        children="Reusable Component Patterns"
        sub="The primitives you keep re-building — extract them once, use everywhere"
      />

      <CodeBlock
        label="components/ui/Badge.jsx — replaces 5+ local implementations"
        code={`import { cn } from '../../utils/cn'

// Replaces: EyebrowBadge in InsidetheBox, WhatYouGet, HowItWorks, Hero...
export function EyebrowBadge({ children, className }) {
  return (
    <div className={cn(
      "mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
      "border-border bg-[--p-10]",
      className
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
        {children}
      </span>
    </div>
  )
}

// Replaces: StatusPill in multiple sections
export function StatusPill({ children, variant = 'success' }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
      variant === 'success' && "bg-success-bg text-success border border-[--success-border]",
      variant === 'info'    && "bg-info-bg text-info border border-[--info-border]",
    )}>
      {children}
    </span>
  )
}`}
      />

      <CodeBlock
        label="components/ui/Button.jsx — variants via CVA or cn"
        code={`import { cn } from '../../utils/cn'

const variants = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  ghost:   "bg-transparent border border-border hover:bg-muted",
  outline: "border border-primary text-primary hover:bg-[--p-8]",
}

const sizes = {
  sm:  "px-3 py-1.5 text-xs rounded-lg",
  md:  "px-5 py-2.5 text-sm rounded-xl",
  lg:  "px-7 py-3.5 text-base rounded-xl",
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// Usage:
// <Button>Get Started</Button>
// <Button variant="ghost" size="sm">Learn more</Button>`}
      />

      <CodeBlock
        label="components/ui/SectionWrapper.jsx — kills repeated max-w + padding div"
        code={`import { cn } from '../../utils/cn'

// Replaces the repeated: mx-auto max-w-7xl px-4 sm:px-6 lg:px-8
export function SectionWrapper({ children, className, as: Tag = 'section', ...props }) {
  return (
    <Tag
      className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

// Usage — before:
// <section className="relative isolate overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
//   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

// After:
// <section className="relative isolate overflow-hidden border-b border-border">
//   <SectionWrapper>`}
      />

      <CodeBlock
        label="Splitting giant files — HowItWorks.jsx (38KB) pattern"
        code={`// src/pages/home/sections/HowItWorks/
// ├── index.jsx          ← main orchestrator (imports scenes)
// ├── constants.js       ← SCENES[], PRODUCTS[] data
// ├── SceneSocial.jsx    ← <SceneSocial /> UI
// ├── SceneStore.jsx     ← <SceneStore /> UI
// ├── SceneCheckout.jsx
// └── SceneConfirmed.jsx

// constants.js
export const SCENES = [
  { id: 'social', num: '01', label: 'Social Post', ... },
  ...
]

// index.jsx — clean orchestrator
import { SCENES } from './constants'
import SceneSocial from './SceneSocial'
// ... imports

export default function HowItWorks() {
  const [active, setActive] = useState(0)
  return (
    <section> 
      {/* tab strip — SCENES.map */}
      {/* scene renderer — switch active */}
    </section>
  )
}`}
      />
    </div>
  );
}

// ── TAB 5: Migration Plan ─────────────────────────────────────────────────────
function MigrationTab() {
  const steps = [
    {
      phase: "Phase 1",
      title: "Stop the bleeding — 1–2 days",
      color: red,
      tasks: [
        { done: true,  task: "Ensure cssTokens.js is the single source of truth" },
        { done: false, task: "Delete local css = {} objects from every component file" },
        { done: false, task: "Replace all hard-coded px/em values with Tailwind utilities" },
        { done: false, task: "Replace hard-coded colour strings with css.* tokens" },
        { done: true,  task: "Migrate icon imports: keep react-icons/fa6 for brand logos only" },
      ],
    },
    {
      phase: "Phase 2",
      title: "Build the design system — 2–3 days",
      color: yellow,
      tasks: [
        { done: false, task: "Create src/components/ui/ folder" },
        { done: false, task: "Extract EyebrowBadge → components/ui/Badge.jsx" },
        { done: false, task: "Extract StatusPill → components/ui/Badge.jsx" },
        { done: false, task: "Extract StatChip → components/ui/Stat.jsx (or extend existing)" },
        { done: false, task: "Create components/ui/Button.jsx with variant props" },
        { done: false, task: "Create components/ui/SectionWrapper.jsx" },
        { done: false, task: "Add utils/cn.js (install clsx + tailwind-merge)" },
        { done: false, task: "Extend @theme in index.css with --color-success, --color-info" },
      ],
    },
    {
      phase: "Phase 3",
      title: "Split large files — 2 days",
      color: blue,
      tasks: [
        { done: false, task: "HowItWorks.jsx (38KB) → HowItWorks/ subfolder + scene files" },
        { done: false, task: "InsidetheBox.jsx (38KB) → extract data constants, sub-components" },
        { done: false, task: "WhatYouGet.jsx (22KB) → extract FeatureGroup, FeatureChip" },
        { done: false, task: "FeatureHero.jsx (22KB) → split hero + sub-sections" },
      ],
    },
    {
      phase: "Phase 4",
      title: "Services & API layer — when you add backend",
      color: green,
      tasks: [
        { done: false, task: "Create src/services/api.js — base fetch config, interceptors" },
        { done: false, task: "Create src/services/products.service.js" },
        { done: false, task: "Create src/services/orders.service.js" },
        { done: false, task: "Add TanStack Query (React Query) for data fetching + caching" },
        { done: false, task: "Move any future data fetching OUT of components into services" },
      ],
    },
  ];

  return (
    <div>
      <SectionTitle
        children="Prioritized Migration Plan"
        sub="Ordered by impact — do Phase 1 before you write another new component"
      />

      <div className="space-y-5">
        {steps.map(({ phase, title, color, tasks }) => (
          <div key={phase} className={`rounded-xl ${border} overflow-hidden`}>
            <div className="flex items-center gap-3 px-5 py-3" style={{ background: color + "18" }}>
              <Tag color={color}>{phase}</Tag>
              <span className="text-sm font-bold text-white">{title}</span>
            </div>
            <div className="p-4 bg-[#111122]">
              {tasks.map(({ done, task }) => (
                <div key={task} className="flex items-start gap-3 py-1.5">
                  <span className="mt-0.5 text-sm" style={{ color: done ? green : "#444466" }}>
                    {done ? "✓" : "○"}
                  </span>
                  <span className="text-[12px]" style={{ color: done ? "#557755" : "#9999bb", textDecoration: done ? "line-through" : "none" }}>
                    {task}
                  </span>
                  {done && <Tag color={green}>done</Tag>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`rounded-xl ${border} p-5 mt-6 ${cardBg}`}>
        <div className="text-sm font-bold text-white mb-3">Recommended Additions as You Scale</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: "TypeScript", why: "Catches prop errors, self-documents component APIs", priority: "High" },
            { name: "TanStack Query", why: "Server state, caching, background refetch — replaces manual fetch", priority: "High" },
            { name: "clsx + tailwind-merge", why: "Clean conditional classNames, avoids Tailwind conflicts", priority: "High" },
            { name: "Zustand", why: "Lightweight global state (cart, user) when Context isn't enough", priority: "Medium" },
            { name: "React Hook Form + Zod", why: "Form state + validation when you add checkout/contact forms", priority: "Medium" },
            { name: "Storybook", why: "Document and preview your ui/ component library in isolation", priority: "Low" },
          ].map(({ name, why, priority }) => (
            <div key={name} className="rounded-lg bg-[#0f0f1e] border border-[#22223a] p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] font-bold text-white">{name}</span>
                <Tag color={priority === "High" ? red : priority === "Medium" ? yellow : blue}>{priority}</Tag>
              </div>
              <p className="text-[11px] text-[#7777aa]">{why}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function ArchitectureGuide() {
  const [active, setActive] = useState(0);
  const content = [<OverviewTab />, <FolderTab />, <StylingTab />, <ComponentsTab />, <MigrationTab />];

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white font-sans">
      {/* Header */}
      <div className="border-b border-[#1e1e35] px-6 py-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
            <span className="text-[11px] font-mono text-[#6666aa] uppercase tracking-widest">Stallio Frontend</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Architecture & Styling Guide</h1>
          <p className="mt-1 text-sm text-[#6666aa]">Professional patterns for a growing React + Tailwind v4 app</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1e1e35] px-6">
        <div className="max-w-4xl mx-auto flex gap-1 overflow-x-auto">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActive(i)}
              className="px-4 py-3 text-[12px] font-semibold whitespace-nowrap transition-colors border-b-2"
              style={{
                color: active === i ? accent : "#6666aa",
                borderColor: active === i ? accent : "transparent",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {content[active]}
      </div>
    </div>
  );
}
