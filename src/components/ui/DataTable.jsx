import React from 'react'
import EmptyState from './EmptyState'
import { TableSkeleton } from './Skeleton'

/**
 * DataTable
 * Responsive data table that renders a desktop table and mobile card adapter
 *
 * @param {Array<{ key: string, label: string, render?: Function, className?: string }>} columns
 * @param {Array<Object>} data
 * @param {Function} [keyExtractor] - (item) => item.id
 * @param {Function} [onRowClick] - (item) => void
 * @param {boolean} [isLoading]
 * @param {React.ReactNode} [emptyState]
 */
export const DataTable = ({
  columns = [],
  data = [],
  keyExtractor = (item) => item.id,
  onRowClick,
  isLoading = false,
  emptyState,
  renderMobileCard,
}) => {
  if (isLoading) {
    return <TableSkeleton rows={5} />
  }

  if (!data || data.length === 0) {
    return (
      emptyState || (
        <EmptyState
          title="No records found"
          description="There is no data to display right now."
        />
      )
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-muted/40 text-muted-foreground">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 font-semibold uppercase tracking-wider text-[10px] ${
                    col.className || ''
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((item, rowIndex) => {
              const key = keyExtractor(item) || rowIndex
              return (
                <tr
                  key={key}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={`transition-colors ${
                    onRowClick ? 'cursor-pointer hover:bg-accent/40' : ''
                  }`}
                >
                  {columns.map((col) => {
                    const content = col.render
                      ? col.render(item[col.key], item, rowIndex)
                      : item[col.key]

                    return (
                      <td
                        key={col.key}
                        className={`px-4 py-3.5 ${col.className || ''}`}
                      >
                        {content}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Adapter View */}
      <div className="divide-y divide-border md:hidden">
        {data.map((item, rowIndex) => {
          const key = keyExtractor(item) || rowIndex

          if (renderMobileCard) {
            return (
              <div key={key} onClick={() => onRowClick && onRowClick(item)}>
                {renderMobileCard(item, rowIndex)}
              </div>
            )
          }

          return (
            <div
              key={key}
              onClick={() => onRowClick && onRowClick(item)}
              className={`p-4 space-y-2 text-xs ${
                onRowClick ? 'cursor-pointer active:bg-muted/50' : ''
              }`}
            >
              {columns.map((col) => {
                const content = col.render
                  ? col.render(item[col.key], item, rowIndex)
                  : item[col.key]

                return (
                  <div
                    key={col.key}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                      {col.label}:
                    </span>
                    <div className="text-right font-medium text-foreground">
                      {content}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DataTable
