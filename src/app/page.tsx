import React from "react";
import { Button } from "@/components/Button";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 dark:bg-stone-900 p-4">
      <h1 className="text-4xl font-bold text-stone-800 dark:text-amber-50 mb-10">
        Forq
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Card 1: Start New Project */}
        <div className="bg-amber-50 dark:bg-stone-800 rounded-lg shadow p-6 border border-amber-200 dark:border-stone-700">
          <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-50 mb-2">
            Start New Project
          </h2>
          <p className="text-stone-600 dark:text-amber-200 mb-6">
            Create a new AI-assisted app from a prompt.
          </p>
          <Button variant="primary">Create New</Button>
        </div>

        {/* Card 2: Open Existing Project */}
        <div className="bg-amber-50 dark:bg-stone-800 rounded-lg shadow p-6 border border-amber-200 dark:border-stone-700">
          <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-50 mb-2">
            Open Existing Project
          </h2>
          <p className="text-stone-600 dark:text-amber-200 mb-6">
            Open and manage an existing Forq workspace.
          </p>
          <Button variant="secondary">Browse Folder</Button>
        </div>
      </div>
    </div>
  );
}
