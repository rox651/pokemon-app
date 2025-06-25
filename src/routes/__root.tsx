import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
