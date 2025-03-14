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
    todo: "bg-amber-50 dark:bg-stone-700 border-l-4 border-amber-300",
    "in-progress":
      "bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500",
    done: "bg-emerald-50 dark:bg-emerald-900/30 border-l-4 border-emerald-500",
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
    <div className="flex flex-col w-full min-w-[280px] max-w-sm bg-white dark:bg-stone-900 rounded-md shadow-sm border border-amber-100 dark:border-stone-700 hover:shadow-md transition-shadow">
      <div
        className={`p-4 ${headerStyles[status]} rounded-t-md border-b border-amber-200 dark:border-stone-700`}
      >
        <h2 className="font-semibold text-stone-800 dark:text-amber-50">
          {columnName}{" "}
          <span className="ml-1 text-sm font-normal text-stone-500 dark:text-amber-300">
            ({filteredTasks.length})
          </span>
        </h2>
      </div>

      <div className="p-4 flex-1 overflow-y-auto max-h-[65vh] space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-10 text-stone-500 dark:text-amber-300 text-sm italic rounded-md border border-dashed border-amber-300 dark:border-stone-600">
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
