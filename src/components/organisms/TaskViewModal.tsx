"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/Button";
import ClaudeCLIOutput from "@/components/molecules/ClaudeCLIOutput";

interface TaskViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  promptText?: string;
  cliLogs?: string[];
  onRetry?: () => void;
  onMarkDone?: () => void;
  onOpenInIDE?: () => void;
}

export const TaskViewModal: React.FC<TaskViewModalProps> = ({
  isOpen,
  onClose,
  title = "Task Title",
  promptText = "No prompt available for this task.",
  cliLogs = [],
  onRetry,
  onMarkDone,
  onOpenInIDE,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
      <div className="bg-amber-50 dark:bg-stone-800 rounded-lg shadow-xl border border-amber-200 dark:border-stone-700 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with title and close button */}
        <div className="p-4 border-b border-amber-200 dark:border-stone-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-stone-800 dark:text-amber-50">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-stone-600 dark:text-amber-200 hover:text-stone-800 dark:hover:text-amber-50 focus:outline-none"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal content with scrollable area */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Prompt text section */}
          <div>
            <h3 className="text-lg font-semibold text-stone-800 dark:text-amber-50 mb-2">
              Task Prompt
            </h3>
            <div className="bg-amber-100/50 dark:bg-stone-700/50 rounded-md p-4 text-stone-700 dark:text-amber-200">
              {promptText}
            </div>
          </div>

          {/* Claude CLI Output section */}
          <div>
            <h3 className="text-lg font-semibold text-stone-800 dark:text-amber-50 mb-2">
              Output Log
            </h3>
            <ClaudeCLIOutput cliLogs={cliLogs} />
          </div>
        </div>

        {/* Footer with action buttons */}
        <div className="p-4 border-t border-amber-200 dark:border-stone-700 flex justify-between items-center">
          <Button variant="secondary" onClick={onRetry} size="sm">
            Retry
          </Button>

          <div className="flex space-x-3">
            <Button variant="secondary" onClick={onOpenInIDE} size="sm">
              Open Worktree in IDE
            </Button>

            <Button variant="primary" onClick={onMarkDone} size="sm">
              Mark as Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskViewModal;
