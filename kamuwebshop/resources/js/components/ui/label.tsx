import * as LabelPrimitive from "@radix-ui/react-label"
import * as React from "react"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "block",
        "text-[12px]",
        "font-medium",
        "text-[var(--color-ink)]",
        "tracking-[0.02em]",
        "mb-[6px]",
        "select-none",
        "group-data-[disabled=true]:pointer-events-none",
        "group-data-[disabled=true]:opacity-50",
        "peer-disabled:cursor-not-allowed",
        "peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
