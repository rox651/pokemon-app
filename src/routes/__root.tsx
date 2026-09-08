import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <main >
      <div className="max-w-[1100px] mx-auto px-4">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </main>
  ),
});
