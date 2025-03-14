"use client";

import React, { useState } from "react";
import ButtonMarkInProgress from "../atoms/ButtonMarkInProgress";
import InProgressPromptModal from "../molecules/InProgressPromptModal";

interface TaskInProgressFlowProps {
  taskName: string;
  taskId: string;
  onTaskStarted?: (taskId: string) => void;
}

export const TaskInProgressFlow: React.FC<TaskInProgressFlowProps> = ({
  taskName,
  taskId,
  onTaskStarted,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmStart = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would make an API call or trigger a Git worktree creation
      // Simulating a slight delay for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Notify parent component that the task has been started
      if (onTaskStarted) {
        onTaskStarted(taskId);
      }

      // Close the modal after success
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error starting task:", error);
      // Error handling could be added here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-stone-800 rounded-lg shadow border border-amber-200 dark:border-stone-700">
        <div>
          <h3 className="font-medium text-stone-800 dark:text-amber-50">
            {taskName}
          </h3>
          <p className="text-sm text-stone-600 dark:text-amber-200">
            Click Start to create a Git worktree for this task
          </p>
        </div>
        <ButtonMarkInProgress onClick={handleStartTask} />
      </div>

      <InProgressPromptModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmStart}
        taskName={taskName}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TaskInProgressFlow;
