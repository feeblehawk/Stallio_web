import React from 'react'

/**
 * FilterTabs
 * Clean segmented filter tabs with active indicators and item count badges
 *
 * @param {Array<{ id: string, label: string, count?: number | string, icon?: React.ComponentType }>} tabs
 * @param {string} activeTab
 * @param {Function} onSelectTab
 * @param {'pills' | 'underline' | 'contained'} [variant]
 */
export const FilterTabs = ({
  tabs = [],
  activeTab,
  onSelectTab,
  variant = 'pills',
  className = '',
}) => {
  return (
    <div
      className={`flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none ${
        variant === 'contained'
          ? 'rounded-2xl border border-border bg-muted/40 p-1'
          : ''
      } ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        const Icon = tab.icon

        if (variant === 'underline') {
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors select-none whitespace-nowrap ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {Icon && <Icon size={14} />}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
            </button>
          )
        }

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all select-none whitespace-nowrap ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-xs'
                : variant === 'contained'
                ? 'text-muted-foreground hover:text-foreground hover:bg-card/70'
                : 'border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            {Icon && <Icon size={14} />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isActive
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default FilterTabs
