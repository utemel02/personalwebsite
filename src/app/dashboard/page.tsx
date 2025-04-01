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

  // Project data fetching
  const { data: projectData, isLoading: isProjectLoading } =
    api.project.getProjectDetails.useQuery(
      { projectPath },
      { enabled: !!projectPath },
    );

  // Task files fetching
  const { data: taskFilesData, isLoading: isTaskFilesLoading } =
    api.fileSystem.getTaskFiles.useQuery(
      { projectPath },
      { enabled: !!projectPath },
    );

  // Task data fetching
  const { data: taskData, isLoading: isTasksLoading } =
    api.fileSystem.parseTaskMarkdown.useQuery(
      { filePath: selectedTaskFile },
      { enabled: !!selectedTaskFile },
    );

  // Update tasks mutation
  const updateTasksMutation = api.fileSystem.updateTasksMarkdown.useMutation({
    onSuccess: () => {
      toast.success("Task status updated");
    },
    onError: (error) => {
      toast.error(`Failed to update task: ${error.message}`);
    },
  });

  // Git worktree mutation
  const createWorktreeMutation = api.git.createWorktree.useMutation({
    onSuccess: (result) => {
      if (result.success) {
        toast.success(`Created worktree at ${result.worktreePath}`);
      } else {
        toast.error(result.error || "Failed to create worktree");
      }
    },
    onError: (error) => {
      toast.error(`Git worktree creation failed: ${error.message}`);
    },
  });

  // Update state based on fetched data
  useEffect(() => {
    if (projectData?.success) {
      setProjectName(projectData.project?.name || "(Unnamed Project)");
    }
  }, [projectData]);

  useEffect(() => {
    if (taskFilesData?.success) {
      setTaskFiles(taskFilesData.files);
    } else if (taskFilesData && !taskFilesData.success) {
      toast.warn(taskFilesData.error || "No task files found");
      setTaskFiles([]);
    }
  }, [taskFilesData]);

  useEffect(() => {
    if (taskData?.success) {
      setTasks(taskData.tasks);
    } else if (taskData && !taskData.success) {
      toast.error(taskData.error || "Failed to parse tasks");
      setTasks([]);
    }
  }, [taskData]);

  // When user picks a new directory, load the project details
  const handleDirectoryChange = (dirPath: string) => {
    setProjectPath(dirPath);
    setSelectedTaskFile("");
    setTasks([]);
  };

  // When user selects a tasks file, set as selected
  const handleSelectTaskFile = (filePath: string) => {
    setSelectedTaskFile(filePath);
    if (!filePath) {
      setTasks([]);
    }
  };

  // Handle task status changes
  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
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
    updateTasksMutation.mutate({
      filePath: selectedTaskFile,
      tasks: updatedTasks,
    });
  };

  // Create git worktree for a task
  const createGitWorktree = (taskId: string, taskTitle: string) => {
    // Create branch name based on task
    const branchName = `feature/${taskId.replace("task-", "")}_${taskTitle
      .toLowerCase()
      .replace(/[^\w-]/g, "-")
      .substring(0, 30)}`;

    // Call git worktree creation endpoint
    createWorktreeMutation.mutate({
      projectPath,
      branchName,
      taskId,
    });
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
        {isProjectLoading && (
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
          {isTasksLoading && (
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
      {selectedTaskFile && !isTasksLoading && tasks.length === 0 && (
        <div className="text-sm text-stone-600 dark:text-amber-200 p-4 bg-amber-50 dark:bg-stone-800 rounded-md border border-amber-200 dark:border-stone-700">
          No tasks found in this file.
        </div>
      )}
    </div>
  );
}
