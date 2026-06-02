import { type ComponentProps } from "react";
import { Dialog as DialogPrimitive, VisuallyHidden } from "radix-ui";
import { cn } from "@/shared/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogOverlay({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn("fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]", className)}
      {...props}
    />
  );
}

interface DialogContentProps extends ComponentProps<typeof DialogPrimitive.Content> {
  /** Extra classes for the backdrop overlay. */
  overlayClassName?: string;
}

/**
 * Modal surface styled to the devbox theme vars. Radix supplies focus-trap,
 * Escape-to-close and click-outside; positioning is centered by default and can
 * be overridden via `className` (tailwind-merge lets `top-*`/`translate-*` win).
 */
export function DialogContent({
  className,
  overlayClassName,
  children,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        aria-describedby={undefined}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden",
          "rounded-lg border border-border bg-background shadow-2xl",
          "focus:outline-hidden",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export { VisuallyHidden };
