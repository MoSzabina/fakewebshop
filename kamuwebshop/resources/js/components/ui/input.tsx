import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0",
        "font-inherit text-[14px]",
        "px-[14px] py-[10px]",
        "bg-[var(--color-white)] text-[var(--color-ink)]",
        "border-[1.5px] border-[var(--color-rule)] rounded-[3px]",
        "outline-none",
        "transition-[border-color] duration-150",
        "placeholder:text-[var(--color-ink-mid)]",
        "focus:border-[var(--color-ink)]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:bg-[#FEF2F2]",
        "aria-invalid:border-[#FCA5A5]",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
