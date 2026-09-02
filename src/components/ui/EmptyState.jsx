import React from 'react'
import { Plus } from 'lucide-react'

/**
 * EmptyState
 * Polished empty state with icon, title, description, and action CTA
 */
export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon: ActionIcon = Plus,
  secondaryActionLabel,
  onSecondaryAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center sm:py-16">
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 shadow-sm">
          <Icon size={24} strokeWidth={1.8} />
        </div>
      )}

      <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
        {title}
      </h3>

      {description && (
        <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {(actionLabel || secondaryActionLabel) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {actionLabel && (
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/25 transition-all duration-150 hover:shadow-md hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-ring"
            >
              {ActionIcon && <ActionIcon size={16} strokeWidth={2.2} />}
              <span>{actionLabel}</span>
            </button>
          )}

          {secondaryActionLabel && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted px-4 py-2.5 text-xs sm:text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              <span>{secondaryActionLabel}</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default EmptyState
