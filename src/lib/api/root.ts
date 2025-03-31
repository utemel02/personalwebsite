import { createCallerFactory, createTRPCRouter } from "./trpc";
import { documentRouter } from "./routers/documentRouter";
import { projectRouter } from "./routers/projectRouter";
import { fileSystemRouter } from "./routers/fileSystemRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  document: documentRouter,
  project: projectRouter,
  fileSystem: fileSystemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
