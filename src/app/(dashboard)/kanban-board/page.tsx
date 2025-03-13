"use client";

import React, { useState, useEffect } from "react";
import KanbanBoard, {
  parseTasksFromMarkdown,
} from "@/components/organisms/KanbanBoard";
import { Task } from "@/components/molecules/KanbanColumn";
import { TaskStatus } from "@/components/atoms/TaskCard";

// Sample tasks for initial state - in a real app, this would come from an API or file system
const sampleTasks: Task[] = [
  {
    id: "task-1",
    title: "Create UI Components",
    description: "Implement all the basic UI components for the application",
    status: "done",
  },
  {
    id: "task-2",
    title: "Build Kanban Board",
    description:
      "Create a functional Kanban board with drag-and-drop functionality",
    status: "in-progress",
  },
  {
    id: "task-3",
    title: "Implement Task Generation",
    description: "Add the ability to generate tasks from project descriptions",
    status: "todo",
  },
  {
    id: "task-4",
    title: "Add Authentication",
    description: "Implement user authentication and authorization",
    status: "todo",
  },
];

export default function KanbanBoardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch tasks from an API or parse a markdown file
    // For now, we're just simulating a loading delay
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // In a real app, you might fetch and parse a tasks_001.md file
        // const response = await fetch('/api/tasks');
        // const markdown = await response.text();
        // const parsedTasks = parseTasksFromMarkdown(markdown);

        setTasks(sampleTasks);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );

    // In a real app, you would also update the backend
    // fetch('/api/tasks/update', {
    //   method: 'POST',
    //   body: JSON.stringify({ taskId, newStatus }),
    //   headers: { 'Content-Type': 'application/json' }
    // });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Project Kanban Board
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500 dark:text-gray-400">
            Loading tasks...
          </div>
        </div>
      ) : (
        <KanbanBoard
          tasks={tasks}
          onTaskStatusChange={handleTaskStatusChange}
        />
      )}
    </div>
  );
}
