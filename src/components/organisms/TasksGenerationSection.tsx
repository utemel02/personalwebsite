"use client";

import React, { useState } from "react";
import { ButtonGenerateTasks } from "../atoms/ButtonGenerateTasks";
import {
  TasksStatusIndicator,
  TasksStatus,
} from "../molecules/TasksStatusIndicator";

interface TasksGenerationSectionProps {
  initialStatus?: TasksStatus;
  isPRDGenerated?: boolean;
  onGenerateTasks?: () => Promise<void>;
}

export const TasksGenerationSection: React.FC<TasksGenerationSectionProps> = ({
  initialStatus = "pending",
  isPRDGenerated = false,
  onGenerateTasks,
}) => {
  const [status, setStatus] = useState<TasksStatus>(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateTasks = async () => {
    if (isLoading || status === "completed" || !isPRDGenerated) return;

    setIsLoading(true);
    setStatus("in-progress");

    try {
      if (onGenerateTasks) {
        await onGenerateTasks();
      } else {
        // Mock delay for demo purposes
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      setStatus("completed");
    } catch (error) {
      setStatus("pending");
      console.error("Error generating tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 border border-amber-200 rounded-lg bg-light dark:bg-stone-800 dark:border-stone-700 shadow-sm">
      <h3 className="text-lg font-medium text-stone-800 dark:text-amber-50 mb-3">
        Tasks Markdown File
      </h3>

      <p className="text-sm text-stone-600 dark:text-amber-200 mb-4">
        Generate a structured tasks markdown file based on your PRD. This will
        create a breakdown of development tasks in the `tasks_001.md` file.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <ButtonGenerateTasks
          onClick={handleGenerateTasks}
          disabled={!isPRDGenerated || isLoading || status === "completed"}
          label={
            !isPRDGenerated
              ? "Generate PRD First"
              : status === "completed"
              ? "Tasks Generated"
              : "Generate Tasks"
          }
        />
        <TasksStatusIndicator status={status} />
      </div>
    </div>
  );
};

export default TasksGenerationSection;
