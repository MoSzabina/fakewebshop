import * as React from "react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type="checkbox"
      className={cn(
        "size-[18px] shrink-0 cursor-pointer appearance-none rounded-[3px] border border-[#DDD8D0] bg-transparent outline-none transition-colors",
        "checked:border-[#6B7C65] checked:bg-[#6B7C65]",
        "focus-visible:border-[#1C1917]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Checkbox }
