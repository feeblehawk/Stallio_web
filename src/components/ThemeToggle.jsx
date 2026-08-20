import { useTheme } from '../contexts/ThemeContext'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      dir="ltr"
      onClick={toggleTheme}
      className={`relative flex h-8 w-[58px] shrink-0 cursor-pointer items-center rounded-full border border-border bg-muted p-1 transition-all duration-300 hover:border-primary/40 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      {/* Background Sun Icon */}
      <span
        className="pointer-events-none absolute left-[7px] text-muted-foreground transition-opacity duration-300"
        style={{ opacity: isDark ? 0 : 1 }}
        aria-hidden="true"
      >
        <Sun size={14} strokeWidth={2} />
      </span>

      {/* Background Moon Icon */}
      <span
        className="pointer-events-none absolute right-[7px] text-muted-foreground transition-opacity duration-300"
        style={{ opacity: isDark ? 1 : 0 }}
        aria-hidden="true"
      >
        <Moon size={14} strokeWidth={2} />
      </span>

      {/* Sliding Thumb */}
      <span
        className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border/50 bg-surface shadow-sm transition-transform duration-300"
        style={{
          transform: isDark ? 'translateX(26px)' : 'translateX(0px)',
        }}
        aria-hidden="true"
      >
        {isDark ? (
          <Moon size={14} strokeWidth={2} />
        ) : (
          <Sun size={14} strokeWidth={2} />
        )}
      </span>
    </button>
  )
}

export default ThemeToggle