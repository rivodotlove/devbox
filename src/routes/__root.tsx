import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { HotkeysProvider } from "react-hotkeys-hook";
import { AppShell } from "@/components/shell/app-shell";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <HotkeysProvider>
      <AppShell>
        <Outlet />
      </AppShell>
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </HotkeysProvider>
  );
}
