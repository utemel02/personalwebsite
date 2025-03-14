"use client";

import { FC, useState } from "react";
import ButtonMarkDone from "../atoms/ButtonMarkDone";
import MergeConflictModal from "../molecules/MergeConflictModal";
import { toast } from "../atoms/ToastNotifications";

interface ConflictFile {
  path: string;
  description?: string;
}

interface TaskCompletionFlowProps {
  taskId: string;
  taskName: string;
  onComplete: (taskId: string) => void;
  onCancel: () => void;
  // This would normally be fetched from a backend
  simulateConflicts?: boolean;
  conflictFiles?: ConflictFile[];
}

const TaskCompletionFlow: FC<TaskCompletionFlowProps> = ({
  taskId,
  taskName,
  onComplete,
  onCancel,
  simulateConflicts = false,
  conflictFiles = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMarkDone = async () => {
    setIsProcessing(true);

    // Simulating a backend check for conflicts
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (simulateConflicts) {
        setIsModalOpen(true);
      } else {
        // No conflicts, complete directly
        toast.success(`Task "${taskName}" marked as complete!`);
        onComplete(taskId);
      }
    } catch (error) {
      toast.error("Failed to complete the task. Please try again.");
      console.error("Task completion error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResolveAndMerge = () => {
    setIsProcessing(true);

    // Here you would normally handle the conflict resolution
    // For this UI demo, we just simulate success
    setTimeout(() => {
      toast.success(`Conflicts resolved and task "${taskName}" completed!`);
      setIsModalOpen(false);
      onComplete(taskId);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-start">
      <ButtonMarkDone
        onClick={handleMarkDone}
        disabled={isProcessing}
        label={isProcessing ? "Processing..." : "Mark as Done"}
      />

      <MergeConflictModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={handleResolveAndMerge}
        onCancel={() => {
          setIsModalOpen(false);
          onCancel();
        }}
        conflictFiles={conflictFiles}
      />
    </div>
  );
};

export default TaskCompletionFlow;
