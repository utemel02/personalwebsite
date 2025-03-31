"use client";

import { useState } from "react";
import { api } from "@/lib/trpc/react";
import { Button } from "@/components/Button";

interface RepositoryCloneOptionProps {
  projectPath: string;
  onRepositoryCloned: () => void;
}

interface CloneResponseData {
  success: boolean;
  error?: string;
  stderr?: string;
  stdout?: string;
}

export default function RepositoryCloneOption({
  projectPath,
  onRepositoryCloned,
}: RepositoryCloneOptionProps) {
  const [isCloning, setIsCloning] = useState(false);
  const [cloneError, setCloneError] = useState<string | null>(null);

  const cloneRepository = api.project.cloneRepository.useMutation({
    onSuccess: (data: any) => {
      setIsCloning(false);
      if (data.success) {
        onRepositoryCloned();
      } else {
        setCloneError(
          data.error || "Unknown error occurred while cloning repository",
        );
      }
    },
    onError: (error) => {
      setIsCloning(false);
      setCloneError(error.message || "Failed to clone repository");
    },
  });

  const handleCloneRepository = async () => {
    if (!projectPath) {
      setCloneError("Please select a project directory first");
      return;
    }

    setIsCloning(true);
    setCloneError(null);

    cloneRepository.mutate({
      projectPath,
      repositoryUrl: "git@github.com:kleneway/next-ai-starter.git",
    });
  };

  return (
    <div className="mt-6 p-4 border border-amber-200 dark:border-stone-700 rounded-md bg-amber-50/50 dark:bg-stone-800/50">
      <h3 className="text-lg font-medium mb-2 text-stone-800 dark:text-amber-100">
        Initialize from Template
      </h3>

      <p className="text-sm text-stone-600 dark:text-amber-200 mb-4">
        Clone the next-ai-starter template repository to get started quickly
        with a batteries-included Next.js setup optimized for AI applications.
      </p>

      <Button
        onClick={handleCloneRepository}
        className={`${
          isCloning || !projectPath ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isCloning ? "Cloning Repository..." : "Clone Template Repository"}
      </Button>

      {cloneError && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {cloneError}
        </p>
      )}
    </div>
  );
}
