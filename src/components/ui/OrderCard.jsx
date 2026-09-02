import React from 'react'
import { ChevronRight, Phone, MapPin, CreditCard } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { useStore } from '../../contexts/StoreContext'

/**
 * OrderCard
 * Mobile-first / feed card for incoming orders with customer details and quick actions
 */
export const OrderCard = ({
  order,
  isExpanded = false,
  onToggleExpand,
  onConfirm,
  onMarkShipped,
  onClick,
}) => {
  const { formatPrice } = useStore()
  if (!order) return null

  return (
    <div
      onClick={onClick || onToggleExpand}
      className="group rounded-2xl border border-border bg-card p-4 transition-all duration-150 hover:border-border/80 hover:shadow-sm cursor-pointer space-y-3"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground text-sm font-heading">
            {order.id}
          </span>
          <StatusBadge status={order.status} size="sm" />
        </div>
        <span className="text-[11px] text-muted-foreground">{order.time}</span>
      </div>

      {/* Customer & Total */}
      <div className="flex items-center justify-between text-xs">
        <div className="min-w-0 pr-2">
          <div className="font-semibold text-foreground truncate">
            {order.customer?.name}
          </div>
          <div className="text-[11px] text-muted-foreground truncate">
            {order.customer?.city}
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="font-bold text-foreground text-sm font-heading">
            {typeof order.total === 'number' ? formatPrice(order.total) : order.total}
          </div>
          <div className="text-[10px] text-muted-foreground">
            {order.paymentMethod?.split(' ')[0] || 'COD'}
          </div>
        </div>
      </div>

      {/* Thumbnails Row */}
      {order.items?.length > 0 && (
        <div className="flex items-center gap-1.5 pt-1">
          {order.items.map((item, idx) => (
            <img
              key={idx}
              src={item.img}
              alt={item.name}
              className="h-8 w-8 rounded-lg border border-border object-cover"
            />
          ))}
          <span className="text-[11px] text-muted-foreground ml-1">
            {order.items.reduce((sum, it) => sum + (it.qty || 1), 0)} items
          </span>
        </div>
      )}

      {/* Expanded Details */}
      {isExpanded && (
        <div className="pt-3 border-t border-border/80 text-xs space-y-2.5 animate-fade-in">
          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin size={13} className="shrink-0 mt-0.5" />
            <span>{order.customer?.address}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone size={13} className="shrink-0" />
            <span>{order.customer?.phone}</span>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex gap-2">
            {order.status === 'pending' && onConfirm && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onConfirm(order.id)
                }}
                className="w-full rounded-xl bg-[var(--info-bg)] border border-[var(--info-border)] py-2 text-xs font-semibold text-[var(--info)] hover:opacity-80 transition-opacity"
              >
                Confirm Order
              </button>
            )}

            {order.status === 'confirmed' && onMarkShipped && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onMarkShipped(order.id)
                }}
                className="w-full rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Mark Shipped
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderCard
