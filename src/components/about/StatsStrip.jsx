import { useInViewOnce } from '../../hooks/useInViewOnce'
import useReducedMotion from '../../hooks/useReducedMotion'
import Stat from '../Stat'

const STATS = [
  { num: '500+',  label: 'Active sellers',  delay: 0    },
  { num: '50+',   label: 'Cities reached',  delay: 0.12 },
  { num: '100K+', label: 'Orders managed',  delay: 0.24 },
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
          className="flex flex-col items-center gap-10 sm:flex-row sm:items-stretch"
        >
          {STATS.map(({ num, label, delay }, i) => (
            <div
              key={label}
              className="flex flex-1 flex-col items-center sm:items-start sm:px-10 first:pl-0 last:pr-0"
              style={
                i > 0
                  ? {
                      borderLeft: '1px solid var(--border)',
                    }
                  : {}
              }
            >
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