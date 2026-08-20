import { useTheme } from '../contexts/ThemeContext'

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="h-[14px] w-[14px]"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>
)

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="h-[14px] w-[14px]"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    />
  </svg>
)

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      dir="ltr"
      onClick={toggleTheme}
      className={`relative flex h-8 w-[58px] shrink-0 items-center rounded-full border border-border bg-muted p-1 transition-all duration-300 hover:border-primary/40 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      <span
        className="pointer-events-none absolute left-[7px] text-muted-foreground transition-opacity duration-300"
        style={{ opacity: isDark ? 0 : 1 }}
      >
        <SunIcon />
      </span>
      <span
        className="pointer-events-none absolute right-[7px] text-muted-foreground transition-opacity duration-300"
        style={{ opacity: isDark ? 1 : 0 }}
      >
        <MoonIcon />
      </span>
      <span
        className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-surface shadow-sm border border-border/50 transition-all duration-300"
        style={{ transform: isDark ? 'translateX(26px)' : 'translateX(0px)' }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  )
}

export default ThemeToggle
