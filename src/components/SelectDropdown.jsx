
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, Check, X } from 'lucide-react'
import { css } from '../utils/cssTokens'
import { easePremium } from '../utils/motionVariants'

// ─── Shared focus ring — consistent with the rest of auth forms ────────────────
const FOCUS_RING = '0 0 0 3px color-mix(in oklch, var(--primary) 22%, transparent)'
const NO_RING    = '0 0 0 0px transparent'

// ─── Flag image — flagcdn.com for ISO codes, emoji fallback ───────────────────
const FlagImage = ({ code, emoji, label, size = 20 }) =>
  code ? (
    <img
      src={`https://flagcdn.com/${size}x${Math.round(size * 0.75)}/${code.toLowerCase()}.png`}
      width={size}
      height={Math.round(size * 0.75)}
      alt={label}
      className="shrink-0 rounded-sm object-cover"
    />
  ) : (
    <span className="select-none text-base leading-none" aria-hidden="true"
      style={{ width: size, textAlign: 'center', display: 'inline-block' }}>
      {emoji}
    </span>
  )

// ─── Badge pill ───────────────────────────────────────────────────────────────
const BadgePill = ({ label, selected }) => (
  <span
    className="ms-auto shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular-nums"
    style={{
      background: selected ? 'var(--p-20)' : 'var(--p-12)',
      color: 'var(--primary)',
    }}
  >
    {label}
  </span>
)

// ─── SelectDropdown ───────────────────────────────────────────────────────────
const SelectDropdown = ({
  items = [],
  value,
  onChange,
  placeholder = 'Select an option',
  icon: Icon,
  searchPlaceholder = 'Search…',
  noResultsText,
}) => {
  const [open,    setOpen]    = useState(false)
  const [query,   setQuery]   = useState('')
  const [focused, setFocused] = useState(false)

  const containerRef = useRef(null)
  const searchRef    = useRef(null)

  const selected = items.find(i => i.id === value) ?? null

  // ── Close on outside click ──
  useEffect(() => {
    const onDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  // ── Focus search input when panel opens ──
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => searchRef.current?.focus(), 40)
      return () => clearTimeout(t)
    }
    setQuery('')
  }, [open])

  const filtered = query
    ? items.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          (item.badge && item.badge.toLowerCase().includes(query.toLowerCase()))
      )
    : items

  const handleSelect = useCallback((id) => {
    onChange(id)
    setOpen(false)
    setQuery('')
    setFocused(false)
  }, [onChange])

  const handleTriggerClick = () => {
    setOpen(prev => !prev)
    setFocused(true)
  }

  const handleTriggerBlur = (e) => {
    if (!containerRef.current?.contains(e.relatedTarget)) setFocused(false)
  }

  const isActive = open || focused

  return (
    <div ref={containerRef} className="relative">

      {/* ── Trigger button ── */}
      <button
        type="button"
        onClick={handleTriggerClick}
        onBlur={handleTriggerBlur}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={placeholder}
        className="flex w-full items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-start"
        style={{
          background: css.surface,
          borderColor: isActive ? 'var(--primary)' : css.border,
          boxShadow: isActive ? FOCUS_RING : NO_RING,
          minHeight: 42,
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
      >
        {/* Leading icon */}
        {Icon && (
          <Icon
            size={15}
            strokeWidth={2}
            aria-hidden="true"
            style={{
              color: isActive ? 'var(--primary)' : css.mutedFg,
              flexShrink: 0,
              transition: 'color 0.15s',
            }}
          />
        )}

        {/* Selected value or placeholder */}
        {selected ? (
          <span className="flex flex-1 min-w-0 items-center gap-2">
            <FlagImage code={selected._code} emoji={selected.flag} label={selected.label} />
            <span className="truncate text-sm font-medium" style={{ color: css.fg }}>
              {selected.label}
            </span>
            {selected.badge && <BadgePill label={selected.badge} selected />}
          </span>
        ) : (
          <span className="flex-1 text-sm text-start" style={{ color: css.mutedFg }}>
            {placeholder}
          </span>
        )}

        {/* Chevron */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: easePremium }}
          className="shrink-0"
          aria-hidden="true"
        >
          <ChevronDown size={14} strokeWidth={2} style={{ color: css.mutedFg }} />
        </motion.span>
      </button>

      {/* ── Dropdown panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{ opacity: 0,   y: -4,  scale: 0.98 }}
            transition={{ duration: 0.18, ease: easePremium }}
            className="absolute left-0 right-0 mt-1.5 overflow-hidden rounded-lg border"
            style={{
              zIndex: 50,
              background: css.surface,
              borderColor: css.border,
              boxShadow:
                '0 8px 32px -4px color-mix(in oklch, var(--foreground) 12%, transparent), 0 2px 8px -2px color-mix(in oklch, var(--foreground) 6%, transparent)',
            }}
          >
            {/* Search row */}
            <div
              className="flex items-center gap-2 border-b px-3 py-2"
              style={{ borderColor: css.border }}
            >
              <Search size={13} strokeWidth={2} style={{ color: css.mutedFg, flexShrink: 0 }} aria-hidden="true" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Search options"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-start"
                style={{ color: css.fg }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="shrink-0 rounded p-0.5 transition-opacity duration-100 hover:opacity-70"
                  style={{ color: css.mutedFg }}
                >
                  <X size={12} strokeWidth={2} />
                </button>
              )}
            </div>

            {/* Options list */}
            <ul className="max-h-52 overflow-y-auto py-1" style={{ scrollbarWidth: 'thin' }}>
              {filtered.length === 0 ? (
                <li className="px-3 py-5 text-center text-sm" style={{ color: css.mutedFg }}>
                  {noResultsText ? noResultsText(query) : `No results for "${query}"`}
                </li>
              ) : (
                filtered.map((item) => {
                  const isSelected = item.id === value
                  return (
                    <li
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(item.id)}
                      className="flex cursor-pointer items-center gap-2.5 px-3 py-2 transition-colors duration-100"
                      style={{
                        background: isSelected ? 'var(--p-10)' : 'transparent',
                        color: css.fg,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'var(--accent)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isSelected ? 'var(--p-10)' : 'transparent'
                      }}
                    >
                      <FlagImage code={item._code} emoji={item.flag} label={item.label} />
                      <span className="flex-1 truncate text-sm font-medium">{item.label}</span>
                      {item.badge && <BadgePill label={item.badge} selected={isSelected} />}
                      {isSelected && (
                        <Check
                          size={13}
                          strokeWidth={2.5}
                          style={{ color: 'var(--primary)', flexShrink: 0 }}
                          aria-hidden="true"
                        />
                      )}
                    </li>
                  )
                })
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SelectDropdown
