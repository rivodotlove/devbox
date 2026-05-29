import { useRouterState } from "@tanstack/react-router";

export function useActiveToolId(): string | undefined {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const match = /^\/tool\/([^/]+)\/?$/.exec(pathname);
  return match?.[1];
}
