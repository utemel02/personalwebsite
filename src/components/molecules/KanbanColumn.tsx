"use client";

import React from "react";
import TaskCard, { TaskCardProps, TaskStatus } from "../atoms/TaskCard";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
}

export interface KanbanColumnProps {
  columnName: string;
  status: TaskStatus;
  tasks: Task[];
  onTaskClick?: (taskId: string) => void;
  onTaskStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  columnName,
  status,
  tasks,
  onTaskClick,
  onTaskStatusChange,
}) => {
  // Status-specific header styling
  const headerStyles = {
    todo: "bg-neutral-100 dark:bg-neutral-700 border-l-4 border-info",
    "in-progress":
      "bg-warning-light/20 dark:bg-warning-dark/30 border-l-4 border-warning",
    done: "bg-success-light/20 dark:bg-success-dark/30 border-l-4 border-success",
  };

  // Filter tasks that match this column's status
  const filteredTasks = tasks.filter((task) => task.status === status);

  // Handle task status change
  const handleTaskStatusChange =
    (taskId: string) => (newStatus: TaskStatus) => {
      if (onTaskStatusChange) {
        onTaskStatusChange(taskId, newStatus);
      }
    };

  return (
    <div className="flex flex-col w-full min-w-[280px] max-w-sm bg-surface-light dark:bg-neutral-800 rounded-md shadow-md">
      <div
        className={`p-4 ${headerStyles[status]} rounded-t-md border-b border-neutral-200 dark:border-neutral-700`}
      >
        <h2 className="font-semibold text-neutral-800 dark:text-neutral-200">
          {columnName}{" "}
          <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
            ({filteredTasks.length})
          </span>
        </h2>
      </div>

      <div className="p-3 flex-1 overflow-y-auto max-h-[70vh] space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-6 text-neutral-500 dark:text-neutral-400 text-sm italic rounded-md border border-dashed border-neutral-300 dark:border-neutral-600">
            No tasks in this column
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              onClick={() => onTaskClick && onTaskClick(task.id)}
              onStatusChange={handleTaskStatusChange(task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
