import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Served from a subpath on GitHub Pages. Setting basepath makes TanStack
    // Router apply rewriteBasepath internally, so both the prerender crawler
    // and the client router resolve routes under the base path.
    basepath: "/ivi-s-luxury-haven",
  });

  return router;
};
