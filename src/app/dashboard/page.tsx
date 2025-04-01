"use client";

import React, { useState, useEffect } from "react";
import DirectoryPicker from "@/components/atoms/DirectoryPicker";
import KanbanBoard from "@/components/organisms/KanbanBoard";
import { api } from "@/lib/trpc/react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Task } from "@/lib/api/routers/fileSystemRouter";
import { TaskStatus } from "@/components/atoms/TaskCard";

export default function DashboardPage() {
  // State: selected directory
  const [projectPath, setProjectPath] = useState("");
  // State: project name
  const [projectName, setProjectName] = useState("");
  // State: list of tasks_ files
  const [taskFiles, setTaskFiles] = useState<{ name: string; path: string }[]>(
    [],
  );
  // State: currently selected tasks file
  const [selectedTaskFile, setSelectedTaskFile] = useState("");
  // State: tasks to display
  const [tasks, setTasks] = useState<Task[]>([]);
  // Loading states
  const [isLoadingProject, setIsLoadingProject] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  // Setup mutations
  const updateTasksMutation = api.fileSystem.updateTasksMarkdown.useMutation();
  const createWorktreeMutation = api.git.createWorktree.useMutation();

  // 1) When user picks a new directory, load the project details
  const handleDirectoryChange = async (dirPath: string) => {
    setProjectPath(dirPath);
    setProjectName("");
    setTaskFiles([]);
    setSelectedTaskFile("");
    setTasks([]);

    if (dirPath) {
      await loadProject(dirPath);
    }
  };

  // 2) Load the project by reading forq.json and tasks_*.md files
  const loadProject = async (dirPath: string) => {
    try {
      setIsLoadingProject(true);

      // Get project details from forq.json
      const projectDetailsResp = await api.project.getProjectDetails.useQuery({
        projectPath: dirPath,
      }).data;

      if (!projectDetailsResp?.success) {
        throw new Error(
          projectDetailsResp?.error || "Failed to load project details",
        );
      }

      setProjectName(projectDetailsResp.project?.name || "(Unnamed Project)");

      // Get task files from docs directory
      const taskFilesResp = await api.fileSystem.getTaskFiles.useQuery({
        projectPath: dirPath,
      }).data;

      if (!taskFilesResp?.success) {
        toast.warn(taskFilesResp?.error || "No task files found");
        setTaskFiles([]);
      } else {
        setTaskFiles(taskFilesResp.files);
      }
    } catch (error: any) {
      toast.error(`Failed to load project: ${error.message}`);
      console.error(error);
    } finally {
      setIsLoadingProject(false);
    }
  };

  // 3) If user selects a tasks file, load tasks from that file
  const handleSelectTaskFile = async (filePath: string) => {
    if (!filePath) {
      setSelectedTaskFile("");
      setTasks([]);
      return;
    }

    try {
      setIsLoadingTasks(true);
      setSelectedTaskFile(filePath);

      const tasksResp = await api.fileSystem.parseTaskMarkdown.useQuery({
        filePath,
      }).data;

      if (!tasksResp?.success) {
        throw new Error(tasksResp?.error || "Failed to parse tasks");
      }

      setTasks(tasksResp.tasks);
    } catch (error: any) {
      console.error(error);
      toast.error(`Could not load tasks from file: ${error.message}`);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  // 4) Handle task status changes
  const handleTaskStatusChange = async (
    taskId: string,
    newStatus: TaskStatus,
  ) => {
    try {
      // Find task by ID and get its title
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      // Update task in state (optimistic update)
      const updatedTasks = tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t,
      );
      setTasks(updatedTasks);

      // If transitioning to in-progress, create git worktree
      if (newStatus === "in-progress" && task.status !== "in-progress") {
        createGitWorktree(taskId, task.title);
      }

      // Update the task file on the server
      await updateTasksMutation.mutateAsync({
        filePath: selectedTaskFile,
        tasks: updatedTasks,
      });
    } catch (error: any) {
      toast.error(`Failed to update task: ${error.message}`);
      console.error(error);
    }
  };

  // 5) Create git worktree for a task
  const createGitWorktree = async (taskId: string, taskTitle: string) => {
    try {
      // Create branch name based on task
      const branchName = `feature/${taskId.replace("task-", "")}_${taskTitle
        .toLowerCase()
        .replace(/[^\w-]/g, "-")
        .substring(0, 30)}`;

      // Call git worktree creation endpoint
      const result = await createWorktreeMutation.mutateAsync({
        projectPath,
        branchName,
        taskId,
      });

      if (result.success) {
        toast.success(`Created worktree at ${result.worktreePath}`);
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast.error(`Git worktree creation failed: ${error.message}`);
      console.error("Git worktree error:", error);
    }
  };

  // Get selected task file name from path
  const getSelectedFileName = () => {
    if (!selectedTaskFile) return "";
    const parts = selectedTaskFile.split("/");
    return parts[parts.length - 1];
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
              <option key={file.path} value={file.path}>
                {file.name}
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

      {/* Kanban Board for Tasks */}
      {selectedTaskFile && tasks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4 text-stone-800 dark:text-amber-50">
            Tasks from {getSelectedFileName()}
          </h3>
          <KanbanBoard
            tasks={tasks}
            onTaskStatusChange={handleTaskStatusChange}
          />
        </div>
      )}

      {/* If no tasks found but we have a selected file */}
      {selectedTaskFile && !isLoadingTasks && tasks.length === 0 && (
        <div className="text-sm text-stone-600 dark:text-amber-200 p-4 bg-amber-50 dark:bg-stone-800 rounded-md border border-amber-200 dark:border-stone-700">
          No tasks found in this file.
        </div>
      )}
    </div>
  );
}
