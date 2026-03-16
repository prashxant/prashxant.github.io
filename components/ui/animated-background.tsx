"use client"
import {
  AnimatePresence,
  Transition,
  motion,
  MotionConfig,
  Variant,
} from "motion/react"
import {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useState,
  useId,
} from "react"
import { cn } from "@/lib/utils"

export type AnimatedBackgroundProps = {
  children:
    | ReactElement<{ "data-id": string }>
    | ReactElement<{ "data-id": string }>[]
  defaultValue?: string
  onValueChange?: (newActiveId: string | null) => void
  className?: string
  transition?: Transition
  enableHover?: boolean
}

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const uniqueId = useId()

  const handleActiveChange = (newActiveId: string | null) => {
    setActiveId(newActiveId)
    if (onValueChange) {
      onValueChange(newActiveId)
    }
  }

  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue)
    }
  }, [defaultValue])

  return (
    <div className={cn("relative flex w-full", className)}>
      <AnimatePresence>
        {Children.map(children, (child: any, index) => {
          const id = child.props["data-id"]

          return cloneElement(child, {
            key: index,
            className: cn("relative z-10", child.props.className),
            onMouseEnter: () => {
              if (enableHover) handleActiveChange(id)
            },
            onMouseLeave: () => {
              if (enableHover) handleActiveChange(null)
            },
            onClick: () => {
              if (!enableHover) handleActiveChange(id)
            },
            "data-checked": activeId === id ? "true" : "false",
            children: (
              <>
                <AnimatePresence>
                  {activeId === id && (
                    <motion.div
                      layoutId={uniqueId}
                      className={cn("absolute inset-0 z-0", className)}
                      transition={transition}
                      initial={{ opacity: defaultValue ? 1 : 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">{child.props.children}</span>
              </>
            ),
          })
        })}
      </AnimatePresence>
    </div>
  )
}
