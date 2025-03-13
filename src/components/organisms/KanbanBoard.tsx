"use client";

import React, { useState, useEffect } from "react";
import KanbanColumn, { Task } from "../molecules/KanbanColumn";
import { TaskStatus } from "../atoms/TaskCard";

export interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick?: (taskId: string) => void;
  onTaskStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  onTaskClick,
  onTaskStatusChange,
}) => {
  // State for sorted tasks (could be expanded to handle updates)
  const [boardTasks, setBoardTasks] = useState<Task[]>(tasks);

  // Update board tasks when tasks prop changes
  useEffect(() => {
    setBoardTasks(tasks);
  }, [tasks]);

  // Handle task status changes internally if no external handler is provided
  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
    if (onTaskStatusChange) {
      // If an external handler is provided, use it
      onTaskStatusChange(taskId, newStatus);
    } else {
      // Otherwise, update internal state
      const updatedTasks = boardTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      );
      setBoardTasks(updatedTasks);
    }
  };

  return (
    <div className="w-full overflow-x-auto bg-bg-light rounded-lg shadow-md">
      <div className="flex flex-row gap-6 p-6 min-w-fit">
        <KanbanColumn
          columnName="To Do"
          status="todo"
          tasks={boardTasks}
          onTaskClick={onTaskClick}
          onTaskStatusChange={handleTaskStatusChange}
        />

        <KanbanColumn
          columnName="In Progress"
          status="in-progress"
          tasks={boardTasks}
          onTaskClick={onTaskClick}
          onTaskStatusChange={handleTaskStatusChange}
        />

        <KanbanColumn
          columnName="Done"
          status="done"
          tasks={boardTasks}
          onTaskClick={onTaskClick}
          onTaskStatusChange={handleTaskStatusChange}
        />
      </div>
    </div>
  );
};

// Helper function to parse tasks from a markdown file content
export const parseTasksFromMarkdown = (markdown: string): Task[] => {
  const tasks: Task[] = [];
  const lines = markdown.split("\n");

  // Simple regex to match task lines with checkbox format: "- [ ] Task title"
  const taskRegex = /^[-*] \[([ x-])\] (.+)$/;

  lines.forEach((line, index) => {
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
        id: `task-${index}`, // Generate a simple ID based on line number
        title: taskTitle,
        description: description || undefined,
        status,
      });
    }
  });

  return tasks;
};

export default KanbanBoard;
