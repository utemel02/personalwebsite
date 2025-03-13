"use client";

import React, { useState } from "react";
import { ButtonGenerateTasks } from "../atoms/ButtonGenerateTasks";
import {
  TasksStatusIndicator,
  TasksStatus,
} from "../molecules/TasksStatusIndicator";

interface TasksGenerationSectionProps {
  initialStatus?: TasksStatus;
  onGenerateTasks?: () => Promise<void>;
}

export const TasksGenerationSection: React.FC<TasksGenerationSectionProps> = ({
  initialStatus = "pending",
  onGenerateTasks,
}) => {
  const [status, setStatus] = useState<TasksStatus>(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateTasks = async () => {
    if (isLoading || status === "completed") return;

    setIsLoading(true);
    setStatus("in-progress");

    try {
      if (onGenerateTasks) {
        await onGenerateTasks();
      } else {
        // Mock delay for demo purposes - would be removed in actual implementation
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      setStatus("completed");
    } catch (error) {
      // In case of error, revert to pending
      setStatus("pending");
      console.error("Error generating tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
        Tasks Markdown Generation
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Generate a tasks markdown file (tasks_001.md) based on the Product
        Requirements Document. This will create a structured list of development
        tasks for your project.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <ButtonGenerateTasks
          onClick={handleGenerateTasks}
          disabled={isLoading || status === "completed"}
          label={status === "completed" ? "Tasks Generated" : "Generate Tasks"}
        />
        <TasksStatusIndicator status={status} />
      </div>
    </div>
  );
};

export default TasksGenerationSection;
