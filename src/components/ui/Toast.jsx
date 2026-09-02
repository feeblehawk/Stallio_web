import React, { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(
    ({ title, message, type = 'success', duration = 3500 }) => {
      const id = Date.now() + Math.random().toString(36).substring(2, 7)
      const newToast = { id, title, message, type }

      setToasts((prev) => [...prev, newToast])

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, duration)
      }
      return id
    },
    []
  )

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const success = (message, title) => addToast({ message, title, type: 'success' })
  const error = (message, title) => addToast({ message, title, type: 'error' })
  const warning = (message, title) => addToast({ message, title, type: 'warning' })
  const info = (message, title) => addToast({ message, title, type: 'info' })

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info }}>
      {children}

      {/* Floating Toast Container */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const ToastItem = ({ toast, onDismiss }) => {
  const config = {
    success: {
      Icon: CheckCircle2,
      color: 'text-[var(--success)]',
      border: 'border-[var(--success-border)]',
      bg: 'bg-card',
    },
    error: {
      Icon: AlertCircle,
      color: 'text-destructive',
      border: 'border-destructive/30',
      bg: 'bg-card',
    },
    warning: {
      Icon: AlertTriangle,
      color: 'text-[var(--warning)]',
      border: 'border-[var(--warning-border)]',
      bg: 'bg-card',
    },
    info: {
      Icon: Info,
      color: 'text-[var(--info)]',
      border: 'border-[var(--info-border)]',
      bg: 'bg-card',
    },
  }[toast.type] || {
    Icon: Info,
    color: 'text-primary',
    border: 'border-border',
    bg: 'bg-card',
  }

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex items-start gap-3 rounded-2xl border ${config.border} ${config.bg} p-3.5 shadow-xl transition-all`}
      style={{
        animation: 'toastSlideIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <config.Icon size={18} className={`${config.color} shrink-0 mt-0.5`} />

      <div className="flex-1 min-w-0">
        {toast.title && (
          <h4 className="text-xs font-bold text-foreground font-heading">
            {toast.title}
          </h4>
        )}
        <p className="text-xs text-muted-foreground leading-snug">
          {toast.message}
        </p>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="text-muted-foreground hover:text-foreground p-0.5 rounded-md"
        aria-label="Close notification"
      >
        <X size={14} />
      </button>

      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    // Graceful fallback if used outside provider
    return {
      success: (msg) => console.log('Toast (success):', msg),
      error: (msg) => console.error('Toast (error):', msg),
      warning: (msg) => console.warn('Toast (warning):', msg),
      info: (msg) => console.info('Toast (info):', msg),
      addToast: () => {},
      removeToast: () => {},
    }
  }
  return context
}

export default ToastProvider
