import { Flex, Label, Typography } from "@/shared/ui";
import type { ReactNode } from "react";

export interface SettingFieldProps {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}

export function SettingField(props: Readonly<SettingFieldProps>) {
  const { id, label, hint, children } = props;

  return (
    <Flex align="center" justify="between" className="px-4 py-3">
      <Flex direction="col" className="gap-0.5">
        <Label htmlFor={id} className="text-sm text-foreground">
          {label}
        </Label>
        {hint && (
          <Typography variant="span" className="text-xs text-sidebar-foreground">
            {hint}
          </Typography>
        )}
      </Flex>
      {children}
    </Flex>
  );
}
