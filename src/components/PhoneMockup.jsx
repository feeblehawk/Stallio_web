import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'
import { floatKeyframes, floatTransition } from '../utils/motionVariants'

const PhoneMockup = ({ children, className = '', size = 'default', float = true }) => {
  const reducedMotion = useReducedMotion()

  const sizeClasses = {
    default: 'w-[min(180px,80vw)] sm:w-[min(220px,68vw)] lg:w-[min(240px,52vw)]',
    large: 'w-[min(180px,84vw)] sm:w-[min(220px,64vw)] lg:w-[min(240px,54vw)]',
    compact: 'w-[min(160px,80vw)] sm:w-[min(180px,62vw)]',
  }

  const Wrapper = float && !reducedMotion ? motion.div : 'div'
  const floatProps =
    float && !reducedMotion
      ? {
          animate: floatKeyframes,
          transition: floatTransition,
        }
      : {}

  return (
    <Wrapper className={`relative ${sizeClasses[size] ?? sizeClasses.default} ${className}`} {...floatProps}>
      {/* Ambient glow behind the phone */}
      <div
        className="absolute -inset-4 -z-10 rounded-[4rem] opacity-[0.07] blur-3xl"
        style={{ background: 'var(--primary)' }}
        aria-hidden="true"
      />

      <div
        className="relative w-full rounded-[3rem] border shadow-2xl"
        style={{
          aspectRatio: '9 / 19.5',
          background: 'var(--foreground)',
          borderColor: 'color-mix(in oklch, var(--foreground) 28%, var(--border))',
          boxShadow:
            '0 48px 120px color-mix(in oklch, var(--foreground) 18%, transparent), 0 8px 24px color-mix(in oklch, var(--foreground) 8%, transparent)',
        }}
      >
        <div
          className="absolute inset-[4px] overflow-hidden rounded-[2.65rem]"
          style={{
            background: 'var(--surface)',
            boxShadow: 'inset 0 1px 0 color-mix(in oklch, white 14%, transparent)',
          }}
        >
          <div
            className="absolute left-1/2 top-3 z-20 h-[14px] w-[68px] -translate-x-1/2 rounded-full"
            style={{ background: 'var(--foreground)' }}
          />
          <div className="absolute inset-0 flex flex-col overflow-hidden pt-7">{children}</div>
          <div className="pointer-events-none absolute inset-0 rounded-[2.65rem] border border-white/8" />
        </div>

        {/* Side buttons */}
        <div
          className="absolute -left-[3px] top-[27%] h-8 w-[3px] rounded-l"
          style={{ background: 'color-mix(in oklch, var(--muted-foreground) 80%, var(--foreground))' }}
        />
        <div
          className="absolute -left-[3px] top-[37%] h-6 w-[3px] rounded-l"
          style={{ background: 'color-mix(in oklch, var(--muted-foreground) 80%, var(--foreground))' }}
        />
        <div
          className="absolute -right-[3px] top-[32%] h-12 w-[3px] rounded-r"
          style={{ background: 'color-mix(in oklch, var(--muted-foreground) 80%, var(--foreground))' }}
        />
      </div>
    </Wrapper>
  )
}

export default PhoneMockup
