import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: WelcomeScreen,
});

function WelcomeScreen() {
  return (
    <div className="flex h-full w-full items-center justify-center text-(--sidebar-fg)">
      <div className="text-center">
        <h1 className="text-2xl text-(--fg)">devbox</h1>
        <p className="mt-2 text-sm">Welcome screen placeholder</p>
      </div>
    </div>
  );
}
