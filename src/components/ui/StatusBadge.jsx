import React from 'react'

const STATUS_CONFIGS = {
  // Order statuses
  pending: {
    label: 'Pending',
    className: 'bg-[var(--warning-bg)] text-[var(--warning)] border-[var(--warning-border)]',
    dotClass: 'bg-[var(--warning)]',
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-[var(--info-bg)] text-[var(--info)] border-[var(--info-border)]',
    dotClass: 'bg-[var(--info)]',
  },
  shipped: {
    label: 'Shipped',
    className: 'bg-primary/10 text-primary border-primary/20',
    dotClass: 'bg-primary',
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-[var(--success-bg)] text-[var(--success)] border-[var(--success-border)]',
    dotClass: 'bg-[var(--success)]',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
    dotClass: 'bg-destructive',
  },

  // Product / Inventory statuses
  active: {
    label: 'Active',
    className: 'bg-[var(--success-bg)] text-[var(--success)] border-[var(--success-border)]',
    dotClass: 'bg-[var(--success)]',
  },
  draft: {
    label: 'Draft',
    className: 'bg-muted text-muted-foreground border-border',
    dotClass: 'bg-muted-foreground',
  },
  low_stock: {
    label: 'Low Stock',
    className: 'bg-[var(--warning-bg)] text-[var(--warning)] border-[var(--warning-border)]',
    dotClass: 'bg-[var(--warning)]',
  },
  out_of_stock: {
    label: 'Out of Stock',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
    dotClass: 'bg-destructive',
  },
}

/**
 * StatusBadge
 * Unified status pill badge with semantic theme tokens
 */
export const StatusBadge = ({
  status = 'pending',
  label,
  showDot = true,
  size = 'md',
}) => {
  const normalizedStatus = String(status).toLowerCase().replace(/\s+/g, '_')
  const config = STATUS_CONFIGS[normalizedStatus] || {
    label: label || status,
    className: 'bg-muted text-muted-foreground border-border',
    dotClass: 'bg-muted-foreground',
  }

  const displayText = label || config.label

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  }[size] || 'text-xs px-2.5 py-1 gap-1.5'

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${config.className} ${sizeClasses} select-none whitespace-nowrap`}
    >
      {showDot && (
        <span
          className={`h-1.5 w-1.5 rounded-full shrink-0 ${config.dotClass}`}
          aria-hidden="true"
        />
      )}
      <span>{displayText}</span>
    </span>
  )
}

export default StatusBadge
