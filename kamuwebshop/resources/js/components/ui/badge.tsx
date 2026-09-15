import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-[4px] border px-2 py-0.5 text-xs font-medium overflow-hidden [&>svg]:size-3 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[[var(--color-ink)]] text-[[var(--color-white)]]",

        secondary:
          "border-transparent bg-[[var(--color-sage-light)]] text-[[var(--color-ink)]]",

        outline:
          "border-[[var(--color-rule)]] bg-transparent text-[[var(--color-ink-mid)]]",

        error:
          "border-transparent bg-[[var(--color-ink)]] text-[[var(--color-white)]]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
