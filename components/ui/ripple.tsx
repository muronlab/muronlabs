import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
  /** Ring colour. Defaults to the site's purple accent. */
  color?: string
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  color = "#8b5cf6",
  className,
  style,
  ...props
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 mask-[radial-gradient(circle_at_center,white_30%,transparent_72%)] select-none",
        className
      )}
      style={{ "--ripple-color": color, ...style } as CSSProperties}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70
        const opacity = mainCircleOpacity - i * 0.03
        const animationDelay = `${i * 0.06}s`
        const borderStyle = "solid"

        return (
          <div
            key={i}
            className={`animate-ripple absolute rounded-full border shadow-xl`}
            style={
              {
                "--i": i,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                borderStyle,
                borderWidth: "1px",
                borderColor: "var(--ripple-color)",
                background:
                  "color-mix(in oklab, var(--ripple-color) 22%, transparent)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
})

Ripple.displayName = "Ripple"
