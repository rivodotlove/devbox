interface HotkeyDef {
  command: string | string[];
  label: string;
  keys: string[];
}

export const HOTKEYS = {
  palette: {
    command: ["meta+k", "meta+shift+p"],
    label: "Open command palette",
    keys: ["⌘K", "⌘⇧P"],
  },
  sidebar: {
    command: "meta+b",
    label: "Toggle sidebar",
    keys: ["⌘B"],
  },
  cheatsheet: {
    command: "shift+slash",
    label: "Show keyboard shortcuts",
    keys: ["?"],
  },
  settings: {
    command: "meta+alt+comma",
    label: "Open settings",
    keys: ["⌘⌥,"],
  },
  closeTab: {
    command: "meta+alt+w",
    label: "Close active tab",
    keys: ["⌘⌥W"],
  },
  nextTab: {
    command: "meta+alt+arrowright",
    label: "Next tab",
    keys: ["⌘⌥→"],
  },
  prevTab: {
    command: "meta+alt+arrowleft",
    label: "Previous tab",
    keys: ["⌘⌥←"],
  },
} as const satisfies Record<string, HotkeyDef>;
