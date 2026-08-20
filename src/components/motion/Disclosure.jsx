import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import useReducedMotion from '../../hooks/useReducedMotion'
import { easePremium } from '../../utils/motionVariants'

/**
 * Disclosure (Motion Primitives pattern) — accessible accordion row with a
 * smooth height animation. Fully keyboard operable via the native button.
 */
const Disclosure = ({ question, answer, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen)
  const reduced = useReducedMotion()
  const panelId = useId()
  const Icon = open ? Minus : Plus

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start transition-colors duration-200 hover:bg-accent/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      >
        <span
          className="text-[15px] font-semibold"
          style={{ color: 'var(--foreground)' }}
        >
          {question}
        </span>

        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--muted-foreground)',
          }}
          aria-hidden="true"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'minus' : 'plus'}
              initial={
                reduced
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      rotate: open ? -45 : 45,
                      scale: 0.8,
                    }
              }
              animate={
                reduced
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }
              }
              exit={
                reduced
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      rotate: open ? 45 : -45,
                      scale: 0.8,
                    }
              }
              transition={{
                duration: reduced ? 0.15 : 0.2,
                ease: easePremium,
              }}
              className="flex items-center justify-center"
            >
              <Icon size={13} />
            </motion.span>
          </AnimatePresence>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={
              reduced
                ? { opacity: 0 }
                : { height: 0, opacity: 0 }
            }
            animate={
              reduced
                ? { opacity: 1 }
                : { height: 'auto', opacity: 1 }
            }
            exit={
              reduced
                ? { opacity: 0 }
                : { height: 0, opacity: 0 }
            }
            transition={
              reduced
                ? { duration: 0.15 }
                : {
                    height: {
                      duration: 0.4,
                      ease: easePremium,
                    },
                    opacity: {
                      duration: 0.22,
                      ease: 'easeOut',
                    },
                  }
            }
            style={{ overflow: 'hidden' }}
          >
            <motion.p
              initial={
                reduced
                  ? undefined
                  : { y: -6, opacity: 0 }
              }
              animate={
                reduced
                  ? undefined
                  : { y: 0, opacity: 1 }
              }
              exit={
                reduced
                  ? undefined
                  : { y: -4, opacity: 0 }
              }
              transition={{
                duration: reduced ? 0.15 : 0.3,
                ease: easePremium,
              }}
              className="px-5 pb-5 text-sm leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Disclosure