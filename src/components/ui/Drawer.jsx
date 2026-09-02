import React, { useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Drawer / SidePanel
 * Right-side sliding panel for contextual forms, detail views, and carts
 *
 * @param {boolean} isOpen - Whether the drawer is visible
 * @param {Function} onClose - Callback when drawer is closed
 * @param {string} [title] - Drawer header title
 * @param {string} [subtitle] - Drawer header subtitle
 * @param {React.ReactNode} [footer] - Optional sticky footer content
 * @param {'sm' | 'md' | 'lg' | 'xl' | 'full'} [size] - Drawer width
 * @param {React.ReactNode} children - Drawer scrollable body content
 */
export const Drawer = ({
  isOpen,
  onClose,
  title,
  subtitle,
  footer,
  size = 'md',
  children,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-3xl',
  }[size] || 'max-w-md'

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Side panel'}
        className={`relative z-10 flex h-full w-full ${sizeClasses} flex-col border-l border-border bg-card shadow-2xl overflow-hidden`}
        style={{
          animation: 'drawerSlideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="flex items-center justify-between border-b border-border px-6 py-4.5 shrink-0 bg-card">
            <div className="min-w-0 pr-4">
              {title && (
                <h2 className="text-base font-bold text-foreground font-heading truncate">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-0.5 text-xs text-muted-foreground truncate">
                  {subtitle}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              aria-label="Close drawer"
            >
              <X size={16} strokeWidth={2.2} />
            </button>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {children}
        </div>

        {/* Optional Sticky Footer */}
        {footer && (
          <div className="border-t border-border bg-card px-6 py-3.5 shrink-0">
            {footer}
          </div>
        )}
      </aside>

      <style>{`
        @keyframes drawerSlideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

export default Drawer
