"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const ratingVariants = cva(
  "flex items-center gap-1",
  {
    variants: {
      size: {
        sm: "gap-0.5",
        md: "gap-1",
        lg: "gap-1.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const starVariants = cva(
  "",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const valueVariants = cva(
  "ms-2 text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface RatingProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof ratingVariants> {
  rating: number
  maxRating?: number
  showValue?: boolean
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ rating, maxRating = 5, size, className, showValue = false, ...props }, ref) => {
    const renderStars = () => {
      const stars = []

      for (let i = 1; i <= maxRating; i++) {
        const filled = rating >= i
        const partiallyFilled = rating > i - 1 && rating < i
        const fillPercentage = partiallyFilled ? (rating - (i - 1)) * 100 : 0

        stars.push(
          <div key={i} className="relative">
            {/* Background star (empty) */}
            <Star className={cn(starVariants({ size }), "text-muted-foreground/30")} />

            {/* Filled star */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                width: filled ? "100%" : `${fillPercentage}%`,
              }}
            >
              <Star className={cn(starVariants({ size }), "text-yellow-400 fill-yellow-400")} />
            </div>
          </div>,
        )
      }

      return stars
    }

    return (
      <div ref={ref} className={cn(ratingVariants({ size }), className)} {...props}>
        <div className="flex items-center">{renderStars()}</div>
        {showValue && (
          <span className={cn(valueVariants({ size }))}>{rating.toFixed(1)}</span>
        )}
      </div>
    )
  },
)

Rating.displayName = "Rating"

export { Rating }
