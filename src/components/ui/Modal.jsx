import React, { useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Modal / Dialog
 * Centered responsive dialog for forms and detail inspectors
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'md',
  showClose = true,
}) => {
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
    xl: 'max-w-2xl',
    full: 'max-w-4xl',
  }[size] || 'max-w-md'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
        className={`relative z-10 w-full ${sizeClasses} rounded-2xl border border-border bg-card shadow-2xl overflow-hidden`}
        style={{
          animation: 'modalFadeUp 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="flex items-center justify-between border-b border-border px-6 py-4.5 bg-card">
            <div className="min-w-0 pr-4">
              {title && (
                <h2 className="text-base sm:text-lg font-bold text-foreground font-heading truncate">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-0.5 text-xs text-muted-foreground truncate">
                  {subtitle}
                </p>
              )}
            </div>

            {showClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                aria-label="Close dialog"
              >
                <X size={16} strokeWidth={2.2} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="max-h-[calc(85vh-130px)] overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-border bg-muted/20 px-6 py-3.5 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalFadeUp {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default Modal
