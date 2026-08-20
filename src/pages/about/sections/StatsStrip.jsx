import { useTranslation } from 'react-i18next'
import { useInViewOnce } from '../../../hooks/useInViewOnce'
import useReducedMotion from '../../../hooks/useReducedMotion'
import Stat from '../../../components/Stat'

const StatsStrip = () => {
  const { t } = useTranslation('about')
  const [ref, isInView] = useInViewOnce()
  const reducedMotion = useReducedMotion()

  const stats = [
    { num: t('statsStrip.sellers.num', '500+'),  label: t('statsStrip.sellers.label', 'Active sellers'),  delay: 0    },
    { num: t('statsStrip.cities.num', '50+'),   label: t('statsStrip.cities.label', 'Cities reached'),  delay: 0.12 },
    { num: t('statsStrip.orders.num', '100K+'), label: t('statsStrip.orders.label', 'Orders managed'),  delay: 0.24 },
  ]

  return (
    <section
      aria-label={t('statsStrip.ariaLabel', 'Stallio by the numbers')}
      className="border-t border-border bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div
          ref={ref}
          className="flex flex-col items-center gap-10 sm:flex-row sm:items-stretch"
        >
          {stats.map(({ num, label, delay }, i) => (
            <div
              key={label}
              className={`flex flex-1 flex-col items-center sm:items-start sm:px-10 first:ps-0 last:pe-0 ${i > 0 ? 'border-s border-border' : ''}`}
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
