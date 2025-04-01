```markdown
# Step-by-Step Instructions for AI Coding Agent

Below is a detailed plan to update the **`/dashboard`** page so that it:

1. Lets the user pick a project folder (only folders, not files).
2. Reads **`forq.json`** in that folder to get the project name.
3. Lists any **`tasks_*.md`** files in the **`docs`** subfolder.
4. Displays those tasks (with statuses) on a Kanban board.

Finally, you will run `npm run build` to verify everything is working.

---

## 1. **Create or Update the Dashboard Page**

1. **Open** the file:
```

src/app/(dashboard)/page.tsx

````
2. **Delete** all placeholder code (the existing static markup).
3. **Add** the following React client component structure:

```tsx
"use client";

import React, { useState, useEffect } from "react";
import DirectoryPicker from "@/components/atoms/DirectoryPicker";
import { api } from "@/lib/trpc/react";
import { toast } from "react-toastify";
import { parseTasksFromMarkdown } from "@/components/organisms/KanbanBoard"; // We'll reuse the existing parser
import KanbanBoard, { Task } from "@/components/organisms/KanbanBoard";
import { TaskStatus } from "@/components/atoms/TaskCard";
import Link from "next/link";

export default function DashboardPage() {
  // State: selected directory
  const [projectPath, setProjectPath] = useState("");
  // State: project name (from forq.json)
  const [projectName, setProjectName] = useState("");
  // State: list of tasks_ files
  const [taskFiles, setTaskFiles] = useState<string[]>([]);
  // State: currently selected tasks file
  const [selectedTaskFile, setSelectedTaskFile] = useState("");
  // State: tasks to display
  const [tasks, setTasks] = useState<Task[]>([]);
  // Loading states
  const [isLoadingProject, setIsLoadingProject] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  // 1) When user picks a new directory, load the project details
  const handleDirectoryChange = (dirPath: string) => {
    setProjectPath(dirPath);
    setProjectName("");
    setTaskFiles([]);
    setSelectedTaskFile("");
    setTasks([]);
    if (dirPath) {
      loadProject(dirPath).catch((err) => {
        console.error(err);
      });
    }
  };

  // 2) Load the project by reading forq.json and tasks_*.md files
  const loadProject = async (dirPath: string) => {
    try {
      setIsLoadingProject(true);

      // Check if `forq.json` exists, read it
      const forqFilePath = `${dirPath}/forq.json`;
      const forqResp = await api.fileSystem.listDirectory.fetch({
        path: dirPath,
      });
      if (!forqResp.success) {
        throw new Error(`Cannot read directory: ${dirPath}`);
      }

      // Make sure `forq.json` actually is in that directory
      const forqJsonExists = forqResp.items.some(
        (item) => item.name === "forq.json" && !item.isDirectory
      );
      if (!forqJsonExists) {
        throw new Error("No forq.json file found in this folder.");
      }

      // If it exists, read it
      const forqFileData = await api.fileSystem.readFile.fetch({
        path: forqFilePath,
      });
      if (!forqFileData.success) {
        throw new Error("Failed to read forq.json file.");
      }
      const projectConfig = JSON.parse(forqFileData.content);
      setProjectName(projectConfig.name || "(Unnamed Project)");

      // Next, look for docs subfolder
      const docsPath = `${dirPath}/docs`;
      const docsResp = await api.fileSystem.listDirectory.fetch({
        path: docsPath,
      });
      if (!docsResp.success) {
        // It's possible no docs folder exists
        setTaskFiles([]);
        toast.warn("No docs folder found, or cannot read /docs directory.");
      } else {
        // Filter for tasks_*.md
        const foundTaskFiles = docsResp.items
          .filter((item) => {
            const isMd = item.name.endsWith(".md");
            const startsWithTasks = item.name.startsWith("tasks_");
            return !item.isDirectory && isMd && startsWithTasks;
          })
          .map((item) => item.name);

        setTaskFiles(foundTaskFiles);
      }
    } catch (error: any) {
      toast.error(`Failed to load project: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoadingProject(false);
    }
  };

  // 3) If user selects a tasks file, load tasks from that file
  const handleSelectTaskFile = async (fileName: string) => {
    setSelectedTaskFile(fileName);
    setTasks([]);
    if (!fileName) return;

    try {
      setIsLoadingTasks(true);
      const docsPath = `${projectPath}/docs/${fileName}`;
      const resp = await api.fileSystem.readFile.fetch({ path: docsPath });
      if (!resp.success) {
        throw new Error("Failed to read tasks file");
      }

      const content = resp.content;
      // Use parseTasksFromMarkdown
      const parsedTasks = parseTasksFromMarkdown(content);
      setTasks(parsedTasks);
    } catch (error: any) {
      console.error(error);
      toast.error(`Could not load tasks from ${fileName}`);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  // 4) Kanban Board callback: if user changes status, update tasks in memory
  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    );
    // If you want to persist, add code to write back to the file
    // (that is optional for now)
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-stone-800 dark:text-amber-50">
          Project Dashboard
        </h1>
        <Link href="/">
          <button className="bg-stone-300 dark:bg-stone-700 px-3 py-2 rounded-md text-stone-800 dark:text-amber-50 hover:bg-stone-400 dark:hover:bg-stone-600 transition-colors">
            Home
          </button>
        </Link>
      </div>

      {/* Directory Picker */}
      <div className="bg-amber-50 dark:bg-stone-800 p-4 rounded-md border border-amber-200 dark:border-stone-700">
        <DirectoryPicker
          label="Select Project Folder"
          value={projectPath}
          onChange={handleDirectoryChange}
          name="projectDirectory"
        />
        {isLoadingProject && (
          <p className="mt-2 text-sm text-stone-600 dark:text-amber-200">
            Loading project info...
          </p>
        )}
      </div>

      {/* If we have a project, show its name */}
      {projectName && (
        <div className="bg-amber-100 dark:bg-stone-700 p-4 rounded-md border border-amber-200 dark:border-stone-600">
          <h2 className="text-xl font-medium text-stone-800 dark:text-amber-50">
            Project: {projectName}
          </h2>
        </div>
      )}

      {/* Task Files dropdown */}
      {taskFiles.length > 0 && (
        <div className="p-4 bg-amber-50 dark:bg-stone-800 rounded-md border border-amber-200 dark:border-stone-700 space-y-2">
          <label
            htmlFor="taskFileSelect"
            className="block text-sm font-medium text-stone-700 dark:text-amber-100"
          >
            Select a Task File:
          </label>
          <select
            id="taskFileSelect"
            className="w-full rounded-md border border-amber-300 dark:border-stone-600 bg-amber-50 dark:bg-stone-900 px-2 py-1"
            value={selectedTaskFile}
            onChange={(e) => handleSelectTaskFile(e.target.value)}
          >
            <option value="">-- Choose --</option>
            {taskFiles.map((file) => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </select>
          {isLoadingTasks && (
            <p className="mt-2 text-sm text-stone-600 dark:text-amber-200">
              Loading tasks...
            </p>
          )}
        </div>
      )}

      {/* Kanban Board */}
      {selectedTaskFile && tasks.length > 0 && (
        <div>
          <KanbanBoard
            tasks={tasks}
            onTaskStatusChange={handleTaskStatusChange}
          />
        </div>
      )}

      {/* If no tasks found but we have a selected file */}
      {selectedTaskFile && !isLoadingTasks && tasks.length === 0 && (
        <div className="text-sm text-stone-600 dark:text-amber-200">
          No tasks found in this file.
        </div>
      )}
    </div>
  );
}
````

4. **Save** your changes to **`page.tsx`** in the **`/dashboard`** folder.

---

## 2. **Extend File System Router to Read File Contents**

1. **Open** or **create** the file:

   ```
   src/lib/api/routers/fileSystemRouter.ts
   ```

   > It already exists with some endpoints, but we need a readFile endpoint if it doesn’t exist.

2. **Ensure** there is a `readFile` procedure. If not present, **add**:

   ```ts
   import fs from "fs/promises";
   import { z } from "zod";
   import path from "path";
   import { createTRPCRouter, publicProcedure } from "../trpc";

   // Inside fileSystemRouter:
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
   ```

3. **Save** the changes. Now your `/dashboard` page can call `readFile`.

---

## 3. **Confirm the `DirectoryPicker` Only Shows Folders**

1. **Open** the file:
   ```
   src/components/atoms/DirectoryPicker.tsx
   ```
2. **Locate** the line that maps the directory items. We want to ensure we only show directory entries in the interface. If it already filters for directories in the listing, **no changes** needed. Otherwise, ensure you filter out files:

   ```tsx
   const directoryContents = await api.fileSystem.listDirectory.useQuery({
     path: currentPath,
   });
   // Filter items: we only show directories in the listing for pick/selection
   ```

   > If you see `.filter((item) => item.isDirectory)`, that’s perfect. If not, add it to the displayed items.

3. **Ensure** there’s a “Select” button that calls `selectDirectory(item.path)` only for directories.

4. **Save** changes if needed.

---

## 4. **Implement (Optional) Placeholder for Git Worktree Logic**

> The user requests that starting a task would do:  
> “Initialize a new git worktree branch; call some Claude CLI.”  
> For now, we add a placeholder function that logs to console.

**Optional** Steps:

1. **Open** a file like **`TaskCard.tsx`** or `TaskViewModal.tsx`, or any place you want to represent starting a task.
2. **Add** a placeholder function:

   ```ts
   async function initializeGitWorktree(taskId: string) {
     console.log("Placeholder: create new Git worktree for task", taskId);
     // In the future, call some CLI command or an API route
   }
   ```

3. **Call** it when the user changes a task from “todo” to “in-progress”, or in any “Start Task” button. This is out of scope for now, but ensures we have the structure in place.

---

## 5. **(Optional) Basic Error Handling**

The main code already wraps operations in try/catch and uses `toast.error(...)`. If you want to add more error boundaries, you can. The instructions do mention “Add Basic Error Handling,” which we have done with `toast.error`. This is sufficient for now.

---

## 6. **Run a Build**

Finally, **run**:

```
npm run build
```

to ensure that everything compiles successfully and that there are no TypeScript errors.

That completes the instructions for implementing the working version of the main application based on the requested functionality.

```

```

# Enhancement: Dashboard Project Selection and Task Loading

Below is a very detailed breakdown of each subtask. Each item is a 1-story-point user story or task, covering everything needed to add the new functionality in the `/dashboard` page. Remember that we are only focusing on the tasks needed for this specific new feature. We also must implement a placeholder for Git worktree creation.

---

## Story 1: Directory Selection for Project Folder

- [ ] **(1.1)** As a developer, I want to update the `DirectoryPicker` so that it only displays folders (not files), so that users only select valid project directories.

  - Acceptance Criteria:
    - Only directories appear in the file/folder tree.
    - The "Select" button for picking the folder is disabled or hidden if the item is a file.
    - The user can navigate back up to parent directories.

- [ ] **(1.2)** As a user, I want to see a “Directory Picker” on the `/dashboard` page, so that I can choose the project folder.
  - Acceptance Criteria:
    - `DirectoryPicker` appears at the top of the page.
    - When the user picks a directory, it triggers the logic to load the project.
    - The currently chosen path is displayed in a read-only textbox.

---

## Story 2: Reading `forq.json` from the Selected Directory

- [ ] **(2.1)** As a user, I want the system to search for a `forq.json` file in the selected folder, so that the project info can be displayed.

  - Acceptance Criteria:
    - If `forq.json` is missing, show an error toast: "No forq.json file found."
    - If `forq.json` is found, read it and parse the JSON.

- [ ] **(2.2)** As a user, I want to see the `name` field from `forq.json` displayed as the project name on the `/dashboard` page, so I know which project I'm working on.

  - Acceptance Criteria:
    - If `forq.json` has `"name": "My Project"`, display "Project: My Project" in the UI.
    - If the file lacks a name, show "(Unnamed Project)."

- [ ] **(2.3)** As a developer, I want to implement a new `readFile` procedure in the `fileSystemRouter` if it doesn’t exist, so I can fetch file contents.
  - Acceptance Criteria:
    - `readFile` returns `content` string.
    - If the file read fails, `success: false` is returned, with an error message.
    - The code is TypeScript-friendly; no type errors.

---

## Story 3: Listing `tasks_*.md` in the `/docs` Folder

- [ ] **(3.1)** As a user, I want the system to look inside the selected folder's `docs` subfolder for `tasks_*.md` files, so that I can choose which tasks file I want to load.

  - Acceptance Criteria:
    - System tries to read `[selectedFolder]/docs` with `listDirectory`.
    - Any files matching the pattern `tasks_*.md` are stored in a `taskFiles` array in state.
    - If the `docs` folder is missing or unreachable, show a warning toast: "No docs folder found."

- [ ] **(3.2)** As a user, I want a dropdown list in the dashboard that shows each discovered `tasks_*.md` file, so I can pick which one to load.
  - Acceptance Criteria:
    - A `<select>` element lists each `tasks_*.md` file by filename.
    - Initially no file is selected, so the user must choose.
    - If no `tasks_*.md` files are found, the select remains empty and a helpful message is displayed.

---

## Story 4: Parsing Tasks from the Selected `tasks_*.md` File

- [ ] **(4.1)** As a user, I want to load the markdown content from the chosen `tasks_*.md` file, so that I can see tasks on the Kanban board.

  - Acceptance Criteria:
    - On selecting a file from the dropdown, the system calls `readFile` with `[selectedFolder]/docs/[fileName].`
    - The content is stored locally in state if the read is successful.
    - If the read fails, show a toast error: "Could not load tasks from X."

- [ ] **(4.2)** As a developer, I want to parse the markdown content to extract tasks, so that each line with `- [ ]`, `- [x]`, or `- [-]` becomes a task object.
  - Acceptance Criteria:
    - Use the existing `parseTasksFromMarkdown` function from `KanbanBoard` or a shared utility.
    - For lines with `- [ ]`, set status to `"todo"`.
    - For lines with `- [x]`, set status to `"done"`.
    - For lines with `- [-]`, set status to `"in-progress"`.
    - The title is the text after the checkbox markup.
    - If the next lines are indented or have bullet points, store them in `description`.

---

## Story 5: Displaying Tasks on a Kanban Board

- [ ] **(5.1)** As a user, I want to see all parsed tasks from the selected file shown in columns: To Do, In Progress, and Done, so that I can manage my tasks.

  - Acceptance Criteria:
    - Use `KanbanBoard` or `KanbanColumn` to display tasks in three columns.
    - Task status is automatically assigned from the markdown parse (`todo`, `in-progress`, `done`).
    - If no tasks are found, display a "No tasks found in this file" message.

- [ ] **(5.2)** As a user, I want to be able to change a task’s status by toggling the checkbox, so I can manage tasks easily.
  - Acceptance Criteria:
    - A single click toggles the checkbox in the cycle: todo → in-progress → done → todo.
    - The internal state is updated in memory. (No writing back to the file is required at this time.)
    - The UI updates instantly to reflect the new status.

---

## Story 6: Implement Git Worktree Creation for Task Start

- [ ] **(6.1)** As a developer, I want a new function named `initializeGitWorktree(taskId: string, taskTitle: string)` in the code, so that I can call it when a task is moved to “in-progress” to create a branch.

  - Acceptance Criteria:
    - The function is declared in an appropriate place (e.g., `TaskCard.tsx`, a utility, or inside a relevant click handler).
    - It logs to the console: `"Creating worktree branch: feature/<taskId>_<sanitizedTitle>"`.
    - The actual worktree creation uses `child_process.exec` or a tRPC endpoint. (If out of scope, stub it out.)
    - If successful, console log: `"Worktree created successfully."`
    - If an error occurs, show a toast or console error.

- [ ] **(6.2)** As a developer, I want a placeholder function that calls the “Claude CLI tool” to handle AI code generation, so we can stub out future expansions.

  - Acceptance Criteria:
    - The code includes a comment or function like `async function runClaudeCLI(taskId) { /* TODO: Implement real Claude CLI call */ }`.
    - The function logs or returns a fake “AI generating code…” message for now.

- [ ] **(6.3)** As a user, I want the “Start Task” or “In-Progress” status change to call `initializeGitWorktree`, so that a new branch is created for the task automatically.
  - Acceptance Criteria:
    - If the user toggles from “todo” → “in-progress” in the UI, it calls `initializeGitWorktree`.
    - The function is only called once (avoid re-calling if the user toggles statuses multiple times quickly).
    - The UI does not freeze, it is non-blocking.

---

## Story 7: Basic Error Handling

- [ ] **(7.1)** As a user, I want to be shown a toast notification if any errors occur in loading or parsing tasks, so that I know why something failed.

  - Acceptance Criteria:
    - `toast.error("Failed to load tasks")` or a similar error message is used for read file issues.
    - `toast.warn("No docs folder found")` is used if the docs directory can’t be read.
    - If no `forq.json`, show `toast.error("No forq.json file found")`.

- [ ] **(7.2)** As a developer, I want to gracefully handle any uncaught errors in the console, so debugging is easier.
  - Acceptance Criteria:
    - All relevant try/catch blocks log to console, as well as show a toast for the user.

---

## Story 8: Final Validation (Build & Testing)

- [ ] **(8.1)** As a developer, I want to verify the code compiles without errors, so that it is production-ready.

  - Acceptance Criteria:
    - Run `npm run build` with no errors.
    - Confirm the local dev environment runs correctly with `npm run dev`.

- [ ] **(8.2)** As a developer, I want to do quick checks manually:
  - Acceptance Criteria:
    - Confirm picking a directory with no `forq.json` yields an error toast.
    - Confirm picking a directory with valid `forq.json` loads the project name.
    - Confirm tasks from a `tasks_001.md` file appear in the Kanban columns.
    - Confirm toggling statuses updates tasks in the UI.

---

### Definition of Done

- All tasks in this list must be checked.
- The `/dashboard` page shows a Directory Picker, a project name from `forq.json`, a tasks file dropdown, and a functional Kanban board with tasks from `tasks_*.md`.
- A stub for Git worktree creation is implemented.
- No TypeScript build errors exist.
- No major errors in the browser console for normal usage.
