import { Collapsible as CollapsiblePrimitive } from "radix-ui";

/**
 * Radix Collapsible re-exported as the project's base primitive. Behavior only;
 * callers style the trigger/content with theme vars.
 */
export const Collapsible = CollapsiblePrimitive.Root;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;
export const CollapsibleContent = CollapsiblePrimitive.Content;
