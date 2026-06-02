import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/shared/utils";

const flexVariants = cva("flex", {
  variants: {
    inline: {
      true: "inline-flex",
      false: "flex",
    },
    direction: {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      col: "flex-col",
      "col-reverse": "flex-col-reverse",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
    },
  },
  defaultVariants: {
    direction: "row",
  },
});

function Flex({
  className,
  inline,
  direction,
  align,
  justify,
  wrap,
  gap,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof flexVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="flex"
      className={cn(flexVariants({ inline, direction, align, justify, wrap, gap, className }))}
      {...props}
    />
  );
}

export { Flex, flexVariants };
