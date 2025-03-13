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
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  columnName,
  status,
  tasks,
  onTaskClick,
}) => {
  // Status-specific header styling
  const headerStyles = {
    todo: "bg-gray-100 dark:bg-gray-700",
    "in-progress": "bg-yellow-50 dark:bg-yellow-900/30",
    done: "bg-green-50 dark:bg-green-900/30",
  };

  // Filter tasks that match this column's status
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div className="flex flex-col w-full min-w-[250px] max-w-sm bg-gray-50 dark:bg-slate-900 rounded-md shadow">
      <div
        className={`p-3 ${headerStyles[status]} rounded-t-md border-b border-gray-200 dark:border-gray-700`}
      >
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">
          {columnName} ({filteredTasks.length})
        </h2>
      </div>

      <div className="p-2 flex-1 overflow-y-auto max-h-[70vh]">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm italic">
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
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
