"use client";

import React, { useState, useEffect } from "react";
import DirectoryPicker from "@/components/atoms/DirectoryPicker";
import { api } from "@/lib/trpc/react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Button } from "@/components/Button";

// Directory item interface
interface DirectoryItem {
  name: string;
  path: string;
  isDirectory: boolean;
  size: number;
  modified: string;
}

// Task interface
interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  description: string;
}

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
  const [tasks, setTasks] = useState<any[]>([]);
  // Loading states
  const [isLoadingProject, setIsLoadingProject] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  // Function to parse markdown for tasks
  // This is a simplified version, ideally we'd import from a shared util
  const parseTasksFromMarkdown = (markdown: string) => {
    const lines = markdown.split("\n");
    const tasks: any[] = [];

    // Simple parsing logic - find checkbox lines
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check for task markers
      if (line.startsWith("- [ ]")) {
        // To do task
        tasks.push({
          id: `task-${tasks.length + 1}`,
          title: line.substring(5).trim(),
          status: "todo",
          description: "",
        });
      } else if (line.startsWith("- [x]")) {
        // Done task
        tasks.push({
          id: `task-${tasks.length + 1}`,
          title: line.substring(5).trim(),
          status: "done",
          description: "",
        });
      } else if (line.startsWith("- [-]")) {
        // In progress task
        tasks.push({
          id: `task-${tasks.length + 1}`,
          title: line.substring(5).trim(),
          status: "in-progress",
          description: "",
        });
      }
    }

    return tasks;
  };

  // Placeholder function for git worktree creation
  async function initializeGitWorktree(taskId: string, taskTitle: string) {
    console.log(
      `Creating worktree branch: feature/${taskId}_${sanitizeTitle(taskTitle)}`,
    );

    // This is a placeholder - in a real implementation, we would call
    // a tRPC endpoint that would execute Git commands via child_process.exec

    // Example implementation:
    // const branchName = `feature/${taskId}_${sanitizeTitle(taskTitle)}`;
    // const result = await api.git.createWorktree.mutate({
    //   projectPath,
    //   branchName,
    //   taskId
    // });

    console.log("Worktree created successfully (simulated)");
    toast.success("Created new git worktree branch (placeholder)");

    // Simulate calling Claude CLI
    runClaudeCLI(taskId);
  }

  // Helper function to sanitize task titles for branch names
  function sanitizeTitle(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .substring(0, 50);
  }

  // Placeholder for Claude CLI integration
  async function runClaudeCLI(taskId: string) {
    console.log(`AI assistant generating code for task ${taskId}...`);
    // In a real implementation, this would use child_process.exec to call the Claude CLI
    // or make API calls to the Claude API
  }

  // Handle task status change, potentially creating a git worktree
  const handleTaskStatusChange = (
    taskId: string,
    newStatus: "todo" | "in-progress" | "done",
    taskTitle: string,
  ) => {
    // Update task status in UI
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );

    // If task is being moved to in-progress, initialize git worktree
    if (newStatus === "in-progress") {
      initializeGitWorktree(taskId, taskTitle);
    }
  };

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
      const forqResp = await api.fileSystem.listDirectory.useQuery({
        path: dirPath,
      }).data;

      if (!forqResp?.success) {
        throw new Error(`Cannot read directory: ${dirPath}`);
      }

      // Make sure `forq.json` actually is in that directory
      const forqJsonExists = forqResp.items.some(
        (item: DirectoryItem) => item.name === "forq.json" && !item.isDirectory,
      );
      if (!forqJsonExists) {
        throw new Error("No forq.json file found in this folder.");
      }

      // If it exists, read it
      const forqFileData = await api.fileSystem.readFile.useQuery({
        path: forqFilePath,
      }).data;

      if (!forqFileData?.success) {
        throw new Error("Failed to read forq.json file.");
      }
      const projectConfig = JSON.parse(forqFileData.content);
      setProjectName(projectConfig.name || "(Unnamed Project)");

      // Next, look for docs subfolder
      const docsPath = `${dirPath}/docs`;
      const docsResp = await api.fileSystem.listDirectory.useQuery({
        path: docsPath,
      }).data;

      if (!docsResp?.success) {
        // It's possible no docs folder exists
        setTaskFiles([]);
        toast.warn("No docs folder found, or cannot read /docs directory.");
      } else {
        // Filter for tasks_*.md
        const foundTaskFiles = docsResp.items
          .filter((item: DirectoryItem) => {
            const isMd = item.name.endsWith(".md");
            const startsWithTasks = item.name.startsWith("tasks_");
            return !item.isDirectory && isMd && startsWithTasks;
          })
          .map((item: DirectoryItem) => item.name);

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
      const resp = await api.fileSystem.readFile.useQuery({
        path: docsPath,
      }).data;

      if (!resp?.success) {
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

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-stone-800 dark:text-amber-50">
          Project Dashboard
        </h1>
        <Link href="/">
          <Button>Home</Button>
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

      {/* Display tasks */}
      {selectedTaskFile && tasks.length > 0 && (
        <div className="bg-amber-50 dark:bg-stone-800 p-4 rounded-md border border-amber-200 dark:border-stone-700">
          <h3 className="text-lg font-medium mb-4 text-stone-800 dark:text-amber-50">
            Tasks from {selectedTaskFile}
          </h3>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-3 rounded-md ${
                  task.status === "todo"
                    ? "bg-amber-100 dark:bg-stone-700"
                    : task.status === "in-progress"
                    ? "bg-blue-100 dark:bg-blue-900/30"
                    : "bg-green-100 dark:bg-green-900/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{task.title}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-amber-200 dark:bg-stone-600">
                      {task.status}
                    </span>
                    <button
                      onClick={() => {
                        const nextStatus =
                          task.status === "todo"
                            ? "in-progress"
                            : task.status === "in-progress"
                            ? "done"
                            : "todo";
                        handleTaskStatusChange(task.id, nextStatus, task.title);
                      }}
                      className="text-xs px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-md"
                    >
                      {task.status === "todo"
                        ? "Start"
                        : task.status === "in-progress"
                        ? "Complete"
                        : "Reset"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
