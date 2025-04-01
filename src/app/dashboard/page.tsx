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

  // Remove worktree mutation
  const removeWorktreeMutation = api.git.removeWorktree.useMutation({
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Worktree removed successfully");
      } else {
        toast.error(result.error || "Failed to remove worktree");
      }
    },
    onError: (error) => {
      toast.error(`Git worktree removal failed: ${error.message}`);
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
    // If transitioning to done, remove git worktree
    else if (newStatus === "done" && task.status !== "done") {
      const branchName = `feature/${taskId.replace("task-", "")}_${task.title
        .toLowerCase()
        .replace(/[^\w-]/g, "-")
        .substring(0, 30)}`;

      removeWorktreeMutation.mutate({
        projectPath,
        branchName,
      });
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
    <div className="min-h-screen bg-amber-50 dark:bg-stone-900">
      <div className=" flex gap-0 h-[calc(100vh-4rem)]">
        {/* Left Sidebar */}
        <div className="w-80 flex-shrink-0 space-y-4 bg-primary-light dark:bg-stone-800 p-4  ">
          {/* Project Selection */}
          <div className="bg-white/40 rounded-sm dark:bg-stone-800 p-4 border border-amber-200 dark:border-stone-700 space-y-4">
            {isProjectLoading ? (
              <div className="animate-pulse h-6 bg-amber-100 dark:bg-stone-700 rounded" />
            ) : (
              projectName && (
                <div className="text-sm font-medium text-stone-600 dark:text-amber-200">
                  Current Project: {projectName}
                </div>
              )
            )}
            {projectPath?.length > 0 ? (
              // add a button to change the project
              <a
                className="text-xs text-blue-500 underline cursor-pointer"
                onClick={() => {
                  setProjectPath("");
                  setProjectName("");
                }}
              >
                Change Project
              </a>
            ) : (
              <DirectoryPicker
                label="Select Project Folder"
                value={projectPath}
                onChange={handleDirectoryChange}
                name="projectDirectory"
              />
            )}
          </div>

          {/* Task Files Selection */}
          {taskFiles.length > 0 && (
            <div className="bg-white/40 rounded-sm dark:bg-stone-800 p-4 border border-amber-200 dark:border-stone-700 space-y-3">
              <label
                htmlFor="taskFileSelect"
                className="block text-sm font-medium text-stone-700 dark:text-amber-100"
              >
                Task Files
              </label>
              <select
                id="taskFileSelect"
                className="w-full rounded-md border border-amber-300 dark:border-stone-600 bg-amber-50 dark:bg-stone-900 px-3 py-2 text-sm"
                value={selectedTaskFile}
                onChange={(e) => handleSelectTaskFile(e.target.value)}
              >
                <option value="">-- Select a file --</option>
                {taskFiles.map((file) => (
                  <option key={file.path} value={file.path}>
                    {file.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 h-full">
          {!projectPath ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-4xl mb-4">📁</div>
                <h2 className="text-xl font-medium text-stone-800 dark:text-amber-50">
                  Select a Project
                </h2>
                <p className="text-sm text-stone-600 dark:text-amber-200">
                  Choose a project folder to get started
                </p>
              </div>
            </div>
          ) : !selectedTaskFile ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-4xl mb-4">📋</div>
                <h2 className="text-xl font-medium text-stone-800 dark:text-amber-50">
                  Select a Task File
                </h2>
                <p className="text-sm text-stone-600 dark:text-amber-200">
                  Choose a task file to view and manage tasks
                </p>
              </div>
            </div>
          ) : isTasksLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-pulse space-y-4">
                <div className="h-8 w-64 bg-amber-100 dark:bg-stone-700 rounded" />
                <div className="h-32 w-96 bg-amber-100 dark:bg-stone-700 rounded" />
              </div>
            </div>
          ) : tasks.length > 0 ? (
            <KanbanBoard
              tasks={tasks}
              onTaskStatusChange={handleTaskStatusChange}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-4xl mb-4">📭</div>
                <h2 className="text-xl font-medium text-stone-800 dark:text-amber-50">
                  No Tasks Found
                </h2>
                <p className="text-sm text-stone-600 dark:text-amber-200">
                  This file doesn't contain any tasks
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
