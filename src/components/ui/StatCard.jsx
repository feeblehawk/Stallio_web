import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

/**
 * StatCard
 * Clean metric card with trend pill, subtle elevation, and currency formatting
 */
export const StatCard = ({
  label,
  value,
  change,
  isPositive = true,
  period = 'vs yesterday',
  icon: Icon,
  badge,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-5 transition-all duration-150 hover:border-border/80">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {Icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <Icon size={16} strokeWidth={2.2} />
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading">
          {value}
        </span>
        {badge && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-primary/10 text-primary uppercase">
            {badge}
          </span>
        )}
      </div>

      {(change || period) && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          {change && (
            <span
              className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-semibold text-[11px] ${
                isPositive
                  ? 'bg-[var(--success-bg)] text-[var(--success)]'
                  : 'bg-destructive/10 text-destructive'
              }`}
            >
              {isPositive ? (
                <TrendingUp size={12} strokeWidth={2.5} />
              ) : (
                <TrendingDown size={12} strokeWidth={2.5} />
              )}
              {change}
            </span>
          )}
          {period && <span className="text-muted-foreground">{period}</span>}
        </div>
      )}
    </div>
  )
}

export default StatCard
