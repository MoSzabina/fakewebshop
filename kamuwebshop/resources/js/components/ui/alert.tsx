import * as React from "react"

import { cn } from "@/lib/utils"

interface AlertProps extends React.ComponentProps<"div"> {
  variant?: "default" | "success" | "error"
}

function Alert({
  variant = "default",
  className,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "w-full border px-4 py-3 text-sm",
        variant === "default" && [
          "border-[var(--color-rule)]",
          "bg-[var(--color-parchment)]",
          "text-[var(--color-ink)]",
        ],
        variant === "success" && [
          "border-[var(--color-sage)]",
          "bg-[var(--color-sage-light)]",
          "text-[var(--color-ink)]",
        ],
        variant === "error" && [
          "border-[#FCA5A5]",
          "bg-[#FEF2F2]",
          "text-[#B91C1C]",
        ],
        className
      )}
      {...props}
    />
  )
}

function AlertTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mb-1 font-medium",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-sm leading-relaxed opacity-80",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
