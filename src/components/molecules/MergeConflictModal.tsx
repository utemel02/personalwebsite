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
      <div className="relative w-full max-w-lg rounded-lg bg-light p-6 shadow-lg dark:bg-stone-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-500 hover:text-stone-700 dark:text-amber-300 dark:hover:text-amber-200"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 flex items-center gap-2 text-amber-600">
          <AlertTriangle className="h-6 w-6" />
          <h2 className="text-xl font-semibold">Merge Conflicts Detected</h2>
        </div>

        <p className="mb-4 text-stone-600 dark:text-amber-100">
          The following files have conflicts that need to be resolved before
          merging:
        </p>

        <div className="mb-6 max-h-60 overflow-auto rounded-md border border-amber-200 bg-amber-100 p-3 dark:border-stone-700 dark:bg-stone-900">
          {conflictFiles.length === 0 ? (
            <p className="text-stone-500 dark:text-amber-300">
              No conflicts detected
            </p>
          ) : (
            <ul className="space-y-2">
              {conflictFiles.map((file, index) => (
                <li key={index} className="flex items-start gap-2">
                  <FileCode className="mt-0.5 h-5 w-5 flex-shrink-0 text-stone-500 dark:text-amber-300" />
                  <div>
                    <p className="font-medium text-stone-800 dark:text-amber-50">
                      {file.path}
                    </p>
                    {file.description && (
                      <p className="text-sm text-stone-500 dark:text-amber-300">
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
            className="rounded-md border border-stone-300 px-4 py-2 font-medium text-stone-700 transition-colors hover:bg-amber-100 dark:border-stone-600 dark:text-amber-100 dark:hover:bg-stone-700"
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
