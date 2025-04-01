import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import os from "os";

export const fileSystemRouter = createTRPCRouter({
  // Get home directory
  getHomeDirectory: publicProcedure.query(async () => {
    try {
      const homeDir = os.homedir();
      return {
        success: true,
        path: homeDir,
      };
    } catch (error) {
      console.error("Error getting home directory:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),

  // Read file contents
  readFile: publicProcedure
    .input(z.object({ path: z.string() }))
    .query(async ({ input }) => {
      try {
        const content = await fs.readFile(input.path, "utf-8");
        return {
          success: true,
          content,
        };
      } catch (error) {
        console.error("Error reading file:", error);
        return {
          success: false,
          content: "",
          error:
            error instanceof Error ? error.message : "Unknown readFile error",
        };
      }
    }),

  // List directory contents
  listDirectory: publicProcedure
    .input(
      z.object({
        path: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const entries = await fs.readdir(input.path, { withFileTypes: true });

        const items = await Promise.all(
          entries.map(async (entry) => {
            const entryPath = path.join(input.path, entry.name);
            const stats = await fs.stat(entryPath);

            return {
              name: entry.name,
              path: entryPath,
              isDirectory: entry.isDirectory(),
              size: stats.size,
              modified: stats.mtime.toISOString(),
            };
          }),
        );

        // Sort directories first, then by name
        items.sort((a, b) => {
          if (a.isDirectory && !b.isDirectory) return -1;
          if (!a.isDirectory && b.isDirectory) return 1;
          return a.name.localeCompare(b.name);
        });

        return {
          success: true,
          items,
          path: input.path,
        };
      } catch (error) {
        console.error("Error listing directory:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          items: [],
          path: input.path,
        };
      }
    }),

  // Check if directory exists and is writable
  checkDirectoryAccess: publicProcedure
    .input(
      z.object({
        path: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        // Check if directory exists
        try {
          await fs.access(input.path, fs.constants.F_OK);
        } catch {
          // Directory doesn't exist, check if parent is writable
          const parentDir = path.dirname(input.path);
          await fs.access(parentDir, fs.constants.W_OK);

          return {
            success: true,
            exists: false,
            isWritable: true,
            canCreate: true,
          };
        }

        // Directory exists, check if it's writable
        try {
          await fs.access(input.path, fs.constants.W_OK);
          return {
            success: true,
            exists: true,
            isWritable: true,
            canCreate: false, // Already exists
          };
        } catch {
          return {
            success: true,
            exists: true,
            isWritable: false,
            canCreate: false,
          };
        }
      } catch (error) {
        console.error("Error checking directory access:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          exists: false,
          isWritable: false,
          canCreate: false,
        };
      }
    }),

  // Create directory
  createDirectory: publicProcedure
    .input(
      z.object({
        path: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await fs.mkdir(input.path, { recursive: true });
        return {
          success: true,
          path: input.path,
        };
      } catch (error) {
        console.error("Error creating directory:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
});
