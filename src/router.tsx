import { QueryClient } from "@tanstack/react-query";
import { createRouter, rewriteBasepath } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Served from a subpath on GitHub Pages. rewriteBasepath makes both the
    // prerender crawler and the client router respect the base path.
    rewrite: rewriteBasepath({
      basepath: "/ivi-s-luxury-haven",
    }),
  });

  return router;
};
