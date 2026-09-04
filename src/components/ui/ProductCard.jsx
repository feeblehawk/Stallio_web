import React from 'react'
import { Edit3, Trash2, Copy, Eye, EyeOff, Package, TrendingUp } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { useStore } from '../../contexts/StoreContext'

/**
 * ProductCard (Merchant Dashboard Variant)
 * Reusable product card with image zoom, stock stepper, margin calculation, and hover actions
 */
export const ProductCard = ({
  product,
  onEdit,
  onDelete,
  onToggleStatus,
  onAdjustStock,
  onDuplicate,
}) => {
  const { formatPrice } = useStore()
  if (!product) return null

  const isLowStock = product.stock > 0 && product.stock < 5
  const isOutOfStock = product.stock === 0
  const profit = product.costPerItem ? product.price - product.costPerItem : null
  const margin = profit ? Math.round((profit / product.price) * 100) : null

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:border-border/80 hover:shadow-md">
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
        <img
          src={
            product.images?.[0] ||
            'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=700&fit=crop&auto=format&q=80'
          }
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.status === 'draft' ? (
            <span className="rounded-full bg-foreground/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background">
              Draft
            </span>
          ) : isOutOfStock ? (
            <span className="rounded-full bg-destructive backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
              Sold Out
            </span>
          ) : isLowStock ? (
            <span className="rounded-full bg-[var(--warning-bg)] border border-[var(--warning-border)] backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--warning)]">
              Low Stock
            </span>
          ) : null}
        </div>

        {/* Quick Action Overlay on Hover (Desktop) */}
        <div className="absolute inset-0 hidden md:flex items-center justify-center gap-2 bg-black/40 opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(product)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-card text-foreground shadow-md transition-transform hover:scale-105 active:scale-95"
              title="Edit Product"
            >
              <Edit3 size={15} strokeWidth={2} />
            </button>
          )}

          {onDuplicate && (
            <button
              type="button"
              onClick={(e) => onDuplicate(product.id, e)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-card text-foreground shadow-md transition-transform hover:scale-105 active:scale-95"
              title="Duplicate Product"
            >
              <Copy size={15} strokeWidth={2} />
            </button>
          )}

          {onToggleStatus && (
            <button
              type="button"
              onClick={(e) => onToggleStatus(product.id)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-card text-foreground shadow-md transition-transform hover:scale-105 active:scale-95"
              title={product.status === 'active' ? 'Move to Draft' : 'Publish Product'}
            >
              {product.status === 'active' ? (
                <EyeOff size={15} strokeWidth={2} />
              ) : (
                <Eye size={15} strokeWidth={2} />
              )}
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(product)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive text-destructive-foreground shadow-md transition-transform hover:scale-105 active:scale-95"
              title="Delete Product"
            >
              <Trash2 size={15} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-sm text-foreground line-clamp-1 font-heading">
              {product.title}
            </h3>
            <span className="text-sm font-bold text-foreground font-heading shrink-0">
              {formatPrice(product.price)}
            </span>
          </div>
          {product.subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Stock & Margin Bar */}
        <div className="flex items-center justify-between border-t border-border/80 pt-3 text-xs">
          {/* Stock Stepper */}
          <div className="flex items-center gap-1.5">
            {onAdjustStock && (
              <button
                type="button"
                onClick={(e) => onAdjustStock(product.id, -1, e)}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                -
              </button>
            )}
            <span className="min-w-6 text-center font-bold text-foreground">
              {product.stock}
            </span>
            {onAdjustStock && (
              <button
                type="button"
                onClick={(e) => onAdjustStock(product.id, 1, e)}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                +
              </button>
            )}
            <span className="text-[11px] text-muted-foreground ml-1">in stock</span>
          </div>

          {/* Margin Badge */}
          {margin !== null && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--success)] bg-[var(--success-bg)] px-2 py-0.5 rounded-md">
              <TrendingUp size={11} />
              {margin}% margin
            </span>
          )}
        </div>

        {/* Mobile CRUD Actions Bar (Always visible on mobile/touch screens) */}
        {(onEdit || onDuplicate || onToggleStatus || onDelete) && (
          <div className="flex md:hidden items-center gap-1.5 border-t border-border/80 pt-3">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(product)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-muted/60 py-2 px-3 text-xs font-semibold text-foreground hover:bg-accent active:scale-98 transition-colors"
                title="Edit Product"
              >
                <Edit3 size={13} strokeWidth={2} />
                <span>Edit</span>
              </button>
            )}

            {onDuplicate && (
              <button
                type="button"
                onClick={(e) => onDuplicate(product.id, e)}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground active:scale-95 transition-colors shrink-0"
                title="Duplicate Product"
              >
                <Copy size={14} strokeWidth={2} />
              </button>
            )}

            {onToggleStatus && (
              <button
                type="button"
                onClick={(e) => onToggleStatus(product.id)}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground active:scale-95 transition-colors shrink-0"
                title={product.status === 'active' ? 'Move to Draft' : 'Publish Product'}
              >
                {product.status === 'active' ? (
                  <EyeOff size={14} strokeWidth={2} />
                ) : (
                  <Eye size={14} strokeWidth={2} />
                )}
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(product)}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/20 active:scale-95 transition-colors shrink-0"
                title="Delete Product"
              >
                <Trash2 size={14} strokeWidth={2} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
