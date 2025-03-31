"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/Button";
import TextareaDescription from "@/components/atoms/TextareaDescription";

interface GenerateMoreTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (description: string) => void;
}

export const GenerateMoreTasksModal: React.FC<GenerateMoreTasksModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (description.trim()) {
      onSubmit(description);
      setDescription("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
      <div className="bg-amber-50 dark:bg-stone-800 rounded-lg shadow-xl border border-amber-200 dark:border-stone-700 w-full max-w-xl">
        {/* Header with title and close button */}
        <div className="p-4 border-b border-amber-200 dark:border-stone-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-stone-800 dark:text-amber-50">
            Generate More Tasks
          </h2>
          <button
            onClick={onClose}
            className="text-stone-600 dark:text-amber-200 hover:text-stone-800 dark:hover:text-amber-50 focus:outline-none"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6 space-y-4">
          <p className="text-stone-600 dark:text-amber-200 mb-2">
            Describe additional features or functionality that you would like to
            generate tasks for:
          </p>

          <TextareaDescription
            label="Feature Description"
            placeholder="Describe the additional features or tasks you need..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            name="taskDescription"
          />
        </div>

        {/* Footer with action buttons */}
        <div className="p-4 border-t border-amber-200 dark:border-stone-700 flex justify-end">
          <div className="space-x-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant="primary"
              onClick={handleSubmit}
              className={
                !description.trim() ? "opacity-50 cursor-not-allowed" : ""
              }
            >
              Generate Tasks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateMoreTasksModal;
