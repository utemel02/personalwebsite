"use client";

import React from "react";
import { X } from "lucide-react";
import ButtonMarkInProgress from "../atoms/ButtonMarkInProgress";

interface InProgressPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskName?: string;
  isLoading?: boolean;
}

export const InProgressPromptModal: React.FC<InProgressPromptModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  taskName = "Selected Task",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-light dark:bg-stone-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-amber-50">
            Start Task
          </h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-stone-600 dark:text-amber-100 mb-4">
            Do you want to create a new Git worktree for &quot;{taskName}&quot;?
            This will allow you to work on this task in isolation.
          </p>

          <div className="bg-amber-100 dark:bg-stone-700 p-3 rounded-md mb-4">
            <p className="font-mono text-sm break-all dark:text-amber-100">
              A new Git branch will be created for this task.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-stone-300 rounded-md text-stone-700 hover:bg-amber-100 dark:border-stone-600 dark:text-amber-100 dark:hover:bg-stone-700"
          >
            Cancel
          </button>
          <ButtonMarkInProgress
            label={isLoading ? "Creating..." : "Create Worktree"}
            onClick={onConfirm}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default InProgressPromptModal;
