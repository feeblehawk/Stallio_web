import React from 'react'

/**
 * PageHeader
 * Consistent header across all dashboard screens
 *
 * @param {string} title - Main page heading
 * @param {string} [subtitle] - Descriptive subtitle
 * @param {string} [badge] - Optional badge / live status tag
 * @param {React.ReactNode} [actions] - Action buttons (e.g. Add Product, Export CSV)
 * @param {React.ReactNode} [children] - Optional sub-row (e.g. tabs or filter bar)
 */
export const PageHeader = ({
  title,
  subtitle,
  badge,
  actions,
  children,
}) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading">
              {title}
            </h1>
            {badge && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {actions}
          </div>
        )}
      </div>

      {children && <div>{children}</div>}
    </div>
  )
}

export default PageHeader
