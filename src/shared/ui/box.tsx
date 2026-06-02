import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/shared/utils";

const boxVariants = cva("block", {
  variants: {
    display: {
      block: "block",
      "inline-block": "inline-block",
      inline: "inline",
      none: "hidden",
    },
  },
  defaultVariants: {
    display: "block",
  },
});

function Box({
  className,
  display,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof boxVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "div";

  return <Comp data-slot="box" className={cn(boxVariants({ display, className }))} {...props} />;
}

export { Box, boxVariants };
