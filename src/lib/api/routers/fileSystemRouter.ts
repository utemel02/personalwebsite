import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import os from "os";

// Define the Task type
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
}

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

  // Get task markdown files from a project's docs directory
  getTaskFiles: publicProcedure
    .input(z.object({ projectPath: z.string() }))
    .query(async ({ input }) => {
      try {
        const docsPath = path.join(input.projectPath, "docs");

        // Check if docs directory exists
        try {
          await fs.access(docsPath);
        } catch (error) {
          return {
            success: false,
            error: "docs directory not found",
            files: [],
          };
        }

        // Read directory contents
        const files = await fs.readdir(docsPath);

        // Filter for task markdown files (tasks_*.md)
        const taskFiles = files
          .filter((file) => file.startsWith("tasks_") && file.endsWith(".md"))
          .map((file) => ({
            name: file,
            path: path.join(docsPath, file),
          }));

        return {
          success: true,
          files: taskFiles,
        };
      } catch (error) {
        console.error("Error getting task files:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          files: [],
        };
      }
    }),

  // Parse task markdown file into task objects
  parseTaskMarkdown: publicProcedure
    .input(z.object({ filePath: z.string() }))
    .query(async ({ input }) => {
      try {
        // Check if file exists
        try {
          await fs.access(input.filePath);
        } catch (error) {
          return {
            success: false,
            error: "Task file not found",
            tasks: [],
          };
        }

        // Read file content
        const content = await fs.readFile(input.filePath, "utf-8");
        const tasks = parseTasksFromMarkdown(content);

        return {
          success: true,
          tasks,
        };
      } catch (error) {
        console.error("Error parsing task markdown:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          tasks: [],
        };
      }
    }),

  // Update tasks in a markdown file
  updateTasksMarkdown: publicProcedure
    .input(
      z.object({
        filePath: z.string(),
        tasks: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().optional(),
            status: z.enum(["todo", "in-progress", "done"]),
          }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Read original file
        const content = await fs.readFile(input.filePath, "utf-8");
        const lines = content.split("\n");

        // Create a map of task IDs to make updates more efficient
        const tasksMap = new Map();
        input.tasks.forEach((task) => {
          tasksMap.set(task.id, task);
        });

        // Parse the original content to find tasks
        const taskIdRegex = /<!-- task-id: (.+) -->/;
        let updatedLines = [];
        let currentTaskId = null;

        for (let i = 0; i < lines.length; i++) {
          let line = lines[i];

          // Check for task ID comment
          const idMatch = line.match(taskIdRegex);
          if (idMatch) {
            currentTaskId = idMatch[1];
            updatedLines.push(line);
            continue;
          }

          // Check for task line with checkbox
          const taskRegex = /^([-*]) \[([ x-])\] (.+)$/;
          const match = line.trim().match(taskRegex);

          if (match && currentTaskId && tasksMap.has(currentTaskId)) {
            const task = tasksMap.get(currentTaskId);
            const marker = match[1]; // - or *
            const status =
              task.status === "todo"
                ? " "
                : task.status === "in-progress"
                ? "-"
                : "x";

            // Replace the line with updated status and title
            updatedLines.push(`${marker} [${status}] ${task.title}`);
            currentTaskId = null;
          } else {
            updatedLines.push(line);
          }
        }

        // Write the updated content back to the file
        await fs.writeFile(input.filePath, updatedLines.join("\n"));

        return {
          success: true,
        };
      } catch (error) {
        console.error("Error updating task markdown:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
});

// Helper function to parse tasks from markdown
function parseTasksFromMarkdown(markdown: string): Task[] {
  const tasks: Task[] = [];
  const lines = markdown.split("\n");

  // Simple regex to match task lines with checkbox format: "- [ ] Task title"
  const taskRegex = /^[-*] \[([ x-])\] (.+)$/;

  // Look for task ID comments
  const taskIdRegex = /<!-- task-id: (.+) -->/;
  let currentTaskId = "";

  lines.forEach((line, index) => {
    // Check for task ID comment
    const idMatch = line.match(taskIdRegex);
    if (idMatch) {
      currentTaskId = idMatch[1];
      return;
    }

    const match = line.trim().match(taskRegex);
    if (match) {
      const checkboxStatus = match[1]; // " ", "x", or "-"
      const taskTitle = match[2].trim();

      // Find any description on the next few lines (indented content)
      let description = "";
      let descriptionIndex = index + 1;

      while (
        descriptionIndex < lines.length &&
        lines[descriptionIndex].trim() !== "" &&
        !lines[descriptionIndex].match(taskRegex) &&
        !lines[descriptionIndex].match(taskIdRegex) &&
        (lines[descriptionIndex].startsWith("  ") ||
          lines[descriptionIndex].startsWith("\t"))
      ) {
        description +=
          (description ? "\n" : "") + lines[descriptionIndex].trim();
        descriptionIndex++;
      }

      // Map checkbox status to our task status
      let status: Task["status"] = "todo";
      if (checkboxStatus === "x") {
        status = "done";
      } else if (checkboxStatus === "-") {
        status = "in-progress";
      }

      tasks.push({
        id: currentTaskId || `task-${index}`, // Use existing ID or generate one
        title: taskTitle,
        description: description || undefined,
        status,
      });

      // Reset current task ID
      currentTaskId = "";
    }
  });

  return tasks;
}
