import React from 'react'

/**
 * Skeleton / Shimmer
 * Reusable animated placeholder for loading states
 */
export const Skeleton = ({
  className = '',
  variant = 'rounded', // 'rounded' | 'circle' | 'text'
  width,
  height,
}) => {
  const variantClasses = {
    rounded: 'rounded-xl',
    circle: 'rounded-full',
    text: 'rounded-md h-4 w-full',
  }[variant] || 'rounded-xl'

  return (
    <div
      className={`animate-pulse bg-muted/70 ${variantClasses} ${className}`}
      style={{
        width: width,
        height: height,
      }}
      aria-hidden="true"
    />
  )
}

export const CardSkeleton = () => (
  <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton variant="text" className="w-24 h-4" />
      <Skeleton variant="circle" className="w-8 h-8" />
    </div>
    <Skeleton variant="text" className="w-36 h-8" />
    <Skeleton variant="text" className="w-20 h-3" />
  </div>
)

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
    <div className="flex items-center justify-between border-b border-border pb-3">
      <Skeleton variant="text" className="w-32 h-4" />
      <Skeleton variant="rounded" className="w-24 h-7" />
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 py-2">
        <Skeleton variant="rounded" className="w-10 h-10 shrink-0" />
        <div className="flex-1 space-y-1.5">
          <Skeleton variant="text" className="w-1/3 h-4" />
          <Skeleton variant="text" className="w-1/4 h-3" />
        </div>
        <Skeleton variant="rounded" className="w-16 h-6" />
      </div>
    ))}
  </div>
)

export default Skeleton
