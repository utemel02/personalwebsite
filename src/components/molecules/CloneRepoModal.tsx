"use client";

import React from "react";
import { X } from "lucide-react";
import ButtonCloneRepo from "../atoms/ButtonCloneRepo";

interface CloneRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmClone: () => void;
  repoUrl?: string;
  isLoading?: boolean;
}

export const CloneRepoModal: React.FC<CloneRepoModalProps> = ({
  isOpen,
  onClose,
  onConfirmClone,
  repoUrl = "https://github.com/username/starter-repo.git",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-white">
            Clone Repository
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You are about to clone the starter repository. This will create a
            new copy in your local environment.
          </p>

          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-4">
            <p className="font-mono text-sm break-all dark:text-gray-300">
              {repoUrl}
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <ButtonCloneRepo
            label={isLoading ? "Cloning..." : "Clone Repository"}
            onClick={onConfirmClone}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default CloneRepoModal;
