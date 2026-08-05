import { useEffect, useRef, useState } from 'react'

const beforePoints = [
  'Selling through scattered posts and messages',
  'Manually sharing product photos, prices, and details with every customer',
  'Managing orders manually makes it easy to miss sales',
]

const afterPoints = [
  'A professional online storefront, ready in minutes.',
  'Share your storefront anywhere — social media, bio, messages, or ads.',
  'Give shoppers a clear, trustworthy path from product discovery to purchase.',
]

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="rotate-90 md:rotate-0 transition-transform duration-200">
    <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
  </svg>
)

const BeforeAfter = () => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} aria-labelledby="before-after-heading" className="relative w-full overflow-hidden border-b" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: 'var(--primary)' }}>Before → After</span>
          <h2 id="before-after-heading" className="mt-4 font-heading font-extrabold tracking-[-0.045em]" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.02, color: 'var(--foreground)' }}>
            Make your business look <br className="hidden sm:block" /> as good as what you sell.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7" style={{ color: 'var(--muted-foreground)' }}>
            Stallio turns the messy part of social selling into a simple customer journey — without changing the way you reach people.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className={`grid gap-4 transition-all duration-1000 ease-out md:grid-cols-[1fr_auto_1fr] md:items-stretch ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="group rounded-[2rem] border p-6 sm:p-8" style={{ background: 'var(--surface-muted)', borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'var(--muted-foreground)' }}>Before</span>
                <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Chat-only selling</span>
              </div>
              <div className="mt-7 space-y-3">
                {beforePoints.map((point, i) => (
                  <div key={point} className="flex items-start gap-3 rounded-xl border p-3 transition-transform duration-300 group-hover:translate-x-1" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]" style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>{i + 1}</span>
                    <span className="text-sm leading-6" style={{ color: 'var(--foreground)' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center py-1 md:px-2 md:py-0">
              <div className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-700 delay-300 ${visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`} style={{ background: 'var(--background)', borderColor: 'var(--border)', color: 'var(--primary)' }}>
                <Arrow />
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[2rem] border p-6 shadow-sm sm:p-8" style={{ background: 'var(--background)', borderColor: 'color-mix(in oklch, var(--primary) 28%, var(--border))' }}>
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full opacity-[0.07] blur-3xl" style={{ background: 'var(--primary)' }} />
              <div className="relative flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'var(--primary)' }}>After</span>
                <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>With Stallio</span>
              </div>
              <div className="relative mt-7 space-y-3">
                {afterPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-xl border p-3 transition-transform duration-300 group-hover:-translate-x-1" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: 'color-mix(in oklch, var(--primary) 10%, var(--surface))', color: 'var(--primary)' }}>✓</span>
                    <span className="text-sm leading-6" style={{ color: 'var(--foreground)' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`mt-8 flex items-center justify-center gap-3 transition-all duration-700 delay-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>
            <span className="h-px w-10" style={{ background: 'var(--border)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>One link replaces the back-and-forth</span>
            <span className="h-px w-10" style={{ background: 'var(--border)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeforeAfter
