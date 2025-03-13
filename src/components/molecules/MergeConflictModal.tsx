"use client";

import { FC } from "react";
import { AlertTriangle, FileCode, X } from "lucide-react";

interface ConflictFile {
  path: string;
  description?: string;
}

interface MergeConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onCancel: () => void;
  conflictFiles: ConflictFile[];
}

const MergeConflictModal: FC<MergeConflictModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  onCancel,
  conflictFiles = [],
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 flex items-center gap-2 text-amber-600">
          <AlertTriangle className="h-6 w-6" />
          <h2 className="text-xl font-semibold">Merge Conflicts Detected</h2>
        </div>

        <p className="mb-4 text-gray-600 dark:text-gray-300">
          The following files have conflicts that need to be resolved before
          merging:
        </p>

        <div className="mb-6 max-h-60 overflow-auto rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900">
          {conflictFiles.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No conflicts detected
            </p>
          ) : (
            <ul className="space-y-2">
              {conflictFiles.map((file, index) => (
                <li key={index} className="flex items-start gap-2">
                  <FileCode className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {file.path}
                    </p>
                    {file.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {file.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onAccept}
            className="rounded-md bg-amber-600 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-700"
          >
            Resolve & Merge
          </button>
        </div>
      </div>
    </div>
  );
};

export default MergeConflictModal;
