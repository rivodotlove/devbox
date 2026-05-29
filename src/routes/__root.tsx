import { AppShell } from "@/components/shell/app-shell";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { HotkeysProvider } from "react-hotkeys-hook";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <HotkeysProvider>
      <TooltipProvider>
        <AppShell>
          <Outlet />
        </AppShell>
        {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
      </TooltipProvider>
    </HotkeysProvider>
  );
}
