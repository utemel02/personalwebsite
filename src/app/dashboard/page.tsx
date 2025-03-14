"use client";

import React from "react";
import { toast } from "react-toastify";
import RepoSetupSection from "@/components/organisms/RepoSetupSection";

export default function DashboardPage() {
  const handleCloneSuccess = () => {
    toast.success("Repository cloned successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold mb-8 text-stone-800 dark:text-amber-50">
        Project Dashboard
      </h1>

      <div className="space-y-8">
        <RepoSetupSection onCloneSuccess={handleCloneSuccess} />

        {/* Other sections will be added as we implement more features */}
      </div>
    </div>
  );
}
