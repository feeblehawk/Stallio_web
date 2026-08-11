import AnimatedNumber from '../motion/AnimatedNumber'
import AnimatedGroup from '../motion/AnimatedGropu'

const METRICS = [
  { id: 'stores', value: 2000, suffix: '+', label: 'Stores created' },
  { id: 'setup', value: 5, suffix: ' min', label: 'Average setup time' },
  { id: 'skills', value: 0, suffix: '', label: 'Technical skills required' },
]

const ProofMetrics = () => (
  <section
    aria-label="Stallio in numbers"
    className="border-b py-16"
    style={{ borderColor: 'var(--border)', background: 'var(--surface-muted)' }}
  >
    <AnimatedGroup
      className="mx-auto grid max-w-4xl gap-8 px-4 sm:grid-cols-3 sm:px-6 lg:px-8"
      stagger={0.1}
    >
      {METRICS.map((metric) => (
        <div key={metric.id} className="text-center">
          <p
            className="font-heading font-extrabold tracking-[-0.05em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--foreground)', lineHeight: 1 }}
          >
            <AnimatedNumber
              value={metric.value}
              format={(n) => `${n.toLocaleString()}${metric.suffix}`}
            />
          </p>
          <p
            className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {metric.label}
          </p>
        </div>
      ))}
    </AnimatedGroup>
  </section>
)

export default ProofMetrics
