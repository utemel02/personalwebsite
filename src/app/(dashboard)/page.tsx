"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import KanbanBoard from "@/components/organisms/KanbanBoard";
import { Task } from "@/components/molecules/KanbanColumn";
import { TaskStatus } from "@/components/atoms/TaskCard";
import RepoSetupSection from "@/components/organisms/RepoSetupSection";
import Link from "next/link";

// Sample tasks for initial state - in a real app, this would come from an API or file system
const sampleTasks: Task[] = [
  {
    id: "task-1",
    title: "Setup Project Repository",
    description: "Clone the starter repository and configure basic settings",
    status: "todo",
  },
  {
    id: "task-2",
    title: "Generate BRD Document",
    description:
      "Create the Business Requirements Document based on project description",
    status: "todo",
  },
  {
    id: "task-3",
    title: "Generate PRD Document",
    description: "Create the Product Requirements Document based on BRD",
    status: "todo",
  },
];

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

  const handleCloneSuccess = () => {
    toast.success("Repository cloned successfully!");
    // Update the first task status after successful cloning
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === "task-1" ? { ...task, status: "done" } : task,
      ),
    );
  };

  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold mb-8 text-stone-800 dark:text-amber-50">
        Project Dashboard
      </h1>

      <div className="space-y-12">
        {/* Repo Setup Section */}
        <section className="bg-amber-50 dark:bg-stone-800 rounded-lg shadow p-6 border border-amber-200 dark:border-stone-700">
          <h2 className="text-xl font-display font-semibold mb-4 text-stone-800 dark:text-amber-50">
            Project Setup
          </h2>
          <RepoSetupSection onCloneSuccess={handleCloneSuccess} />
        </section>

        {/* Kanban Board Section */}
        <section className="bg-amber-50 dark:bg-stone-800 rounded-lg shadow p-6 border border-amber-200 dark:border-stone-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-display font-semibold text-stone-800 dark:text-amber-50">
              Task Progress
            </h2>
            <Link
              href="/kanban-board"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors text-sm"
            >
              View Full Board
            </Link>
          </div>
          <KanbanBoard
            tasks={tasks}
            onTaskStatusChange={handleTaskStatusChange}
          />
        </section>

        {/* Additional Sections (Document Generation, etc.) */}
        <section className="bg-amber-50 dark:bg-stone-800 rounded-lg shadow p-6 border border-amber-200 dark:border-stone-700">
          <h2 className="text-xl font-display font-semibold mb-4 text-stone-800 dark:text-amber-50">
            Document Generation
          </h2>
          <Link
            href="/document-workflow"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors text-sm"
          >
            Go to Document Workflow
          </Link>
        </section>
      </div>
    </div>
  );
}
