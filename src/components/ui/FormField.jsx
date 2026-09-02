import React from 'react'

/**
 * FormField
 * Clean form input wrapper with label, error feedback, and helper captions
 */
export const FormField = ({
  label,
  required = false,
  optional = false,
  error,
  helper,
  className = '',
  children,
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-foreground">
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </label>
          {optional && (
            <span className="text-[11px] text-muted-foreground">Optional</span>
          )}
        </div>
      )}

      {children}

      {error ? (
        <p className="text-[11px] font-medium text-destructive animate-fade-in">
          {error}
        </p>
      ) : helper ? (
        <p className="text-[11px] text-muted-foreground">{helper}</p>
      ) : null}
    </div>
  )
}

export default FormField
