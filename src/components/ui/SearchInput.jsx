import React from 'react'
import { Search, X, Loader2 } from 'lucide-react'

/**
 * SearchInput
 * Specialized search field with clear button, loading state, and shortcut tag
 */
export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search…',
  isLoading = false,
  shortcut,
  className = '',
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: 'py-1 pl-8 pr-7 text-xs',
    md: 'py-1.5 pl-9 pr-8 text-xs sm:text-sm',
    lg: 'py-2.5 pl-10 pr-9 text-sm',
  }[size] || 'py-1.5 pl-9 pr-8 text-xs sm:text-sm'

  const iconSizes = { sm: 13, md: 15, lg: 17 }[size] || 15

  return (
    <div className={`relative ${className}`}>
      {/* Leading Search Icon / Loader */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        {isLoading ? (
          <Loader2 size={iconSizes} className="animate-spin text-primary" />
        ) : (
          <Search size={iconSizes} />
        )}
      </span>

      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-2 focus-visible:outline-ring ${sizeClasses}`}
        {...props}
      />

      {/* Trailing Clear Button or Shortcut */}
      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        ) : shortcut ? (
          <kbd className="hidden sm:inline-flex items-center rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
            {shortcut}
          </kbd>
        ) : null}
      </div>
    </div>
  )
}

export default SearchInput
