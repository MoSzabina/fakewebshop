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
        "size-[18px] shrink-0 cursor-pointer appearance-none rounded-[3px] border border-rule bg-transparent outline-none transition-colors",
        "checked:border-sage checked:bg-sage",
        "focus-visible:border-ink",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Checkbox }
