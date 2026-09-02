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
          "bg-[#1C1917] text-[#FAF8F5] border-0 hover:bg-[#333]",
        
        secondary:
          "bg-[#6B7C65] text-[#FAF8F5] border-0 hover:bg-[#5A6955]",

        outline:
          "bg-transparent text-[#1C1917] border-[1.5px] border-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5]",

        muted:
          "bg-transparent text-[#6B6460] border-[1.5px] border-[#DDD8D0] hover:text-[#1C1917] hover:border-[#6B6460]",

        link:
          "bg-transparent text-[#1C1917] border-0 underline underline-offset-[3px] px-0 py-0 hover:no-underline",

        destructive:
          "bg-[#1C1917] text-white border-0 hover:bg-destructive/90",
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
