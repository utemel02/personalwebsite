"use client";

import React from "react";
import KanbanBoard from "@/components/organisms/KanbanBoard";
import { Task } from "@/components/molecules/KanbanColumn";
import { TaskStatus } from "@/components/atoms/TaskCard";
import ButtonAddTaskSet from "@/components/atoms/ButtonAddTaskSet";
import { Button } from "@/components/Button";

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
  return (
    <div className="flex h-full min-h-screen">
      {/* Sidebar (Left Column) */}
      <div className="w-64 bg-amber-50 dark:bg-stone-800 border-r border-amber-200 dark:border-stone-700 p-6 shrink-0">
        <div className="space-y-6">
          {/* Project Name */}
          <div>
            <h2 className="text-xl font-bold text-stone-800 dark:text-amber-50 mb-2">
              Project Name
            </h2>
            <p className="text-stone-600 dark:text-amber-200">
              My Forq Project
            </p>
          </div>

          {/* Tasklist Dropdown */}
          <div>
            <label
              htmlFor="taskset-select"
              className="block text-sm font-medium text-stone-700 dark:text-amber-100 mb-2"
            >
              Tasklist
            </label>
            <select
              id="taskset-select"
              defaultValue="tasks_001.md"
              className="w-full border border-amber-200 dark:border-stone-700 rounded-md py-2 px-3 bg-white dark:bg-stone-700 text-stone-700 dark:text-amber-100"
            >
              <option value="tasks_001.md">tasks_001.md</option>
            </select>
          </div>

          {/* Generate More Tasks Button */}
          <div>
            <ButtonAddTaskSet label="Generate More Tasks" />
          </div>

          {/* Open in IDE Buttons */}
          <div className="space-y-2">
            <Button variant="secondary" size="sm" className="w-full">
              Open in Cursor
            </Button>

            <Button variant="secondary" size="sm" className="w-full">
              Open in Windsurf
            </Button>
          </div>
        </div>
      </div>

      {/* Main Area (Right Column) */}
      <div className="flex-1 p-6 bg-amber-100/30 dark:bg-stone-900">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-stone-800 dark:text-amber-50">
            Project Dashboard
          </h1>
        </div>

        <div className="space-y-6">
          {/* Kanban Board placed in the main area */}
          <div className="bg-amber-50 dark:bg-stone-800 rounded-lg shadow-md p-6 border border-amber-200 dark:border-stone-700">
            <h2 className="text-xl font-semibold text-stone-800 dark:text-amber-50 mb-4">
              Task Progress
            </h2>
            <KanbanBoard tasks={sampleTasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
