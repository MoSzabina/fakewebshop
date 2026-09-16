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
          "bg-ink text-white border-0 hover:bg-ink-mid",

        secondary:
          "bg-sage text-white border-0 hover:bg-sage",

        outline:
          "bg-transparent text-ink border-[1.5px] border-ink hover:bg-ink hover:text-white",

        muted:
          "bg-transparent text-ink-mid border-[1.5px] border-rule hover:text-ink hover:border-ink-mid",

        link:
          "bg-transparent text-ink border-0 underline underline-offset-[3px] px-0 py-0 hover:no-underline",

        destructive:
          "bg-ink text-white border-0 hover:bg-ink-mid",
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
