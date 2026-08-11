/**
 * Shared CSS design-token shorthand — single source of truth.
 * Maps to CSS custom properties defined in index.css (:root).
 * Import { css } in any component that uses inline style tokens.
 */
export const css = {
  // Core palette
  primary:       'var(--primary)',
  primaryFg:     'var(--primary-foreground)',
  fg:            'var(--foreground)',
  mutedFg:       'var(--muted-foreground)',
  bg:            'var(--background)',
  surface:       'var(--surface)',
  surfaceMuted:  'var(--surface-muted)',
  border:        'var(--border)',
  ring:          'var(--ring)',

  // Primary tints (computed in index.css via color-mix)
  p8:            'var(--p-8)',
  p10:           'var(--p-10)',
  p12:           'var(--p-12)',
  p14:           'var(--p-14)',
  p20:           'var(--p-20)',
  p30:           'var(--p-30)',
  p35:           'var(--p-35)',
  p45:           'var(--p-45)',

  // Semantic status
  success:       'var(--success)',
  successBg:     'var(--success-bg)',
  successBorder: 'var(--success-border)',
  info:          'var(--info)',
  infoBg:        'var(--info-bg)',
  infoBorder:    'var(--info-border)',

  // Elevation
  float:         'var(--float-shadow)',
}
