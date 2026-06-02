import { FONTS } from "@/shared/lib/fonts";
import { THEMES } from "@/shared/lib/themes";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Flex,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

import { useSettingsStore } from "../stores/use-settings-store";

import { SettingField } from "./setting-field";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

/** Settings modal: theme + font apply live; editor knobs are stubbed until editors land. */
export function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const { theme, font, fontSize, tabSize, setTheme, setFont, reset } = useSettingsStore();

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="w-full max-w-md">
        <Flex align="center" justify="between" className="border-b border-border px-4 py-3">
          <DialogTitle className="text-sm font-medium text-foreground">Settings</DialogTitle>
          <DialogClose className="text-xs outline-none text-sidebar-foreground hover:text-foreground">
            Esc
          </DialogClose>
        </Flex>
        <DialogDescription className="sr-only">
          Configure theme, font, and editor preferences.
        </DialogDescription>

        <div className="divide-y divide-border">
          <SettingField id="setting-theme" label="Theme">
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {THEMES.map((theme) => (
                    <SelectItem value={theme.id}>{theme.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SettingField>

          <SettingField id="setting-font" label="Font">
            <Select value={font} onValueChange={setFont}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {FONTS.map((font) => (
                    <SelectItem value={font.id}>{font.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SettingField>

          <SettingField id="setting-font-size" label="Font size" hint="Available once editors land">
            <Select value={fontSize.toString()} disabled>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={fontSize.toString()}>{fontSize}px</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </SettingField>

          <SettingField id="setting-tab-size" label="Tab size" hint="Available once editors land">
            <Select value={tabSize.toString()} disabled>
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={tabSize.toString()}>{tabSize}px</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </SettingField>
        </div>

        <Flex justify="end" className="border-t border-border px-4 py-3">
          <Button variant="outline" size="sm" onClick={reset}>
            Reset to defaults
          </Button>
        </Flex>
      </DialogContent>
    </Dialog>
  );
}
