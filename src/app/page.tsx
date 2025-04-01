"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { ArrowRightIcon, FolderOpenIcon } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  // Handle create new project click
  const handleCreateNew = () => {
    router.push("/new-project");
  };

  // Handle import project click - for now just route to placeholder
  const handleImportProject = () => {
    // This will be implemented in future iterations
    alert(
      "Import project functionality will be implemented in a future update",
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <img src="/logo.png" alt="Forq Logo" className="w-32 h-32 mx-auto" />
      <p className="text-center text-stone-600 dark:text-amber-200 mb-12 max-w-2xl mx-auto">
        Create AI-powered applications from a simple prompt. Generate
        requirements, design specifications, and task lists all in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* New Project Card */}
        <div className="bg-amber-50 dark:bg-stone-800 p-8 rounded-lg shadow-sm border border-amber-200 dark:border-stone-700 hover:shadow-md transition-shadow flex flex-col">
          <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4">
            Start New Project
          </h2>
          <p className="text-stone-600 dark:text-amber-200 mb-6 flex-grow">
            Create a new AI-assisted app from a prompt. Generate requirements,
            specifications, and a detailed task list.
          </p>
          <Button
            onClick={handleCreateNew}
            className="flex items-center justify-center"
          >
            Create New
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Import Project Card */}
        <div className="bg-amber-50 dark:bg-stone-800 p-8 rounded-lg shadow-sm border border-amber-200 dark:border-stone-700 hover:shadow-md transition-shadow flex flex-col">
          <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-100 mb-4">
            Open Existing Project
          </h2>
          <p className="text-stone-600 dark:text-amber-200 mb-6 flex-grow">
            Open and manage an existing Forq workspace. Resume work on a
            previously started project.
          </p>
          <Button
            onClick={handleImportProject}
            className="flex items-center justify-center"
          >
            Import Project
            <FolderOpenIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
