import React from 'react'
import { AlertTriangle, AlertCircle, Info } from 'lucide-react'
import Modal from './Modal'

/**
 * ConfirmDialog
 * Dedicated confirmation modal for destructive or important actions
 */
export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger', // 'danger' | 'warning' | 'info'
  isLoading = false,
}) => {
  const iconConfig = {
    danger: {
      Icon: AlertTriangle,
      bg: 'bg-destructive/10',
      text: 'text-destructive',
      btn: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    },
    warning: {
      Icon: AlertCircle,
      bg: 'bg-[var(--warning-bg)]',
      text: 'text-[var(--warning)]',
      btn: 'bg-[var(--warning)] text-background hover:opacity-90',
    },
    info: {
      Icon: Info,
      bg: 'bg-[var(--info-bg)]',
      text: 'text-[var(--info)]',
      btn: 'bg-primary text-primary-foreground hover:bg-primary/90',
    },
  }[variant] || iconConfig.danger

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showClose={false}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`rounded-xl px-4 py-2 text-xs font-semibold shadow-xs transition-all focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50 ${iconConfig.btn}`}
          >
            {isLoading ? 'Processing…' : confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center pt-2 pb-1 space-y-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconConfig.bg} ${iconConfig.text} shadow-xs`}
        >
          <iconConfig.Icon size={24} strokeWidth={2} />
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
            {title}
          </h3>
          {description && (
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
