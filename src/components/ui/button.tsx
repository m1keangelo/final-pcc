
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-neon-purple to-neon-blue text-white hover:bg-primary/90 shadow-md hover:shadow-glow-purple hover:translate-y-[-1px] active:translate-y-[0px]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md",
        outline:
          "border border-input bg-background/40 backdrop-blur-sm hover:bg-accent/10 hover:text-accent-foreground shadow-sm hover:border-neon-purple/50",
        secondary:
          "bg-secondary/70 backdrop-blur-sm text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:text-white",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-neon-blue underline-offset-4 hover:underline hover:text-neon-purple",
        glow: "bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
