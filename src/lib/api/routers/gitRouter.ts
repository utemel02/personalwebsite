import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { promisify } from "util";

const execPromise = promisify(exec);

export const gitRouter = createTRPCRouter({
  // Create a git worktree for a task
  createWorktree: publicProcedure
    .input(
      z.object({
        projectPath: z.string(),
        branchName: z.string(),
        taskId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Sanitize branch name to ensure it's git-friendly
        const sanitizedBranchName = sanitizeBranchName(input.branchName);

        // First check if the directory is a git repository
        try {
          await execPromise(
            `cd "${input.projectPath}" && git rev-parse --is-inside-work-tree`,
          );
        } catch (error) {
          return {
            success: false,
            error: "The selected directory is not a git repository",
          };
        }

        // Create a new branch for the task if it doesn't exist
        try {
          await execPromise(
            `cd "${input.projectPath}" && git branch --list ${sanitizedBranchName}`,
          );
          // If branch doesn't exist, create it
          await execPromise(
            `cd "${input.projectPath}" && git branch ${sanitizedBranchName}`,
          );
        } catch (error) {
          // Branch creation might fail, but it's possible it already exists
          console.log("Branch creation result:", error);
        }

        // Create a directory for the worktree
        const worktreePath = path.join(
          input.projectPath,
          `${sanitizedBranchName}-worktree`,
        );
        try {
          await fs.mkdir(worktreePath, { recursive: true });
        } catch (error) {
          // Directory might already exist
        }

        // Create the git worktree
        const result = await execPromise(
          `cd "${input.projectPath}" && git worktree add "${worktreePath}" ${sanitizedBranchName}`,
        );

        return {
          success: true,
          worktreePath,
          output: result.stdout,
        };
      } catch (error) {
        console.error("Error creating git worktree:", error);
        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Unknown error creating git worktree",
        };
      }
    }),

  // Remove a git worktree when a task is completed
  removeWorktree: publicProcedure
    .input(
      z.object({
        projectPath: z.string(),
        branchName: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Sanitize branch name to ensure it's git-friendly
        const sanitizedBranchName = sanitizeBranchName(input.branchName);
        const worktreePath = path.join(
          input.projectPath,
          `${sanitizedBranchName}-worktree`,
        );

        // First check if the worktree exists
        try {
          await fs.access(worktreePath);
        } catch (error) {
          return {
            success: false,
            error: "Worktree directory not found",
          };
        }

        // Remove the worktree
        const result = await execPromise(
          `cd "${input.projectPath}" && git worktree remove "${worktreePath}"`,
        );

        return {
          success: true,
          output: result.stdout,
        };
      } catch (error) {
        console.error("Error removing git worktree:", error);
        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Unknown error removing git worktree",
        };
      }
    }),
});

// Helper function to sanitize branch names
function sanitizeBranchName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w-]/g, "-") // Replace non-word chars with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
    .substring(0, 50); // Limit length
}
