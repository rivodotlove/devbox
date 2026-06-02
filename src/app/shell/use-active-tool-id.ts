import { useRouterState } from "@tanstack/react-router";

const TOOL_PATH = /^\/tool\/([^/]+)\/?$/;

/** Active tool id derived from the current route, or undefined off a tool route. */
export function useActiveToolId(): string | undefined {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return TOOL_PATH.exec(pathname)?.[1];
}
