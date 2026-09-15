import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[3px] text-[13px] font-medium tracking-[0.01em] px-[22px] py-[10px] cursor-pointer transition-all duration-150 outline-none disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-ink)] text-[var(--color-white)] border-0 hover:bg-[var(--color-ink-mid)]",

        secondary:
          "bg-[var(--color-sage)] text-[var(--color-white)] border-0 hover:bg-[var(--color-sage)]",

        outline:
          "bg-transparent text-[var(--color-ink)] border-[1.5px] border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-white)]",

        muted:
          "bg-transparent text-[var(--color-ink-mid)] border-[1.5px] border-[var(--color-rule)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-mid)]",

        link:
          "bg-transparent text-[var(--color-ink)] border-0 underline underline-offset-[3px] px-0 py-0 hover:no-underline",

        destructive:
          "bg-[var(--color-ink)] text-[var(--color-white)] border-0 hover:bg-[var(--color-ink-mid)]",
      },

      size: {
        default: "",
        sm: "px-[16px] py-[8px] text-[12px]",
        lg: "px-[26px] py-[12px] text-[14px]",
        icon: "size-9 px-0 py-0",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
