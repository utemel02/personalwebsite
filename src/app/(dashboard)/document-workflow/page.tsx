"use client";

import React, { useState, useEffect } from "react";
import DocumentWorkflowTimeline from "@/components/organisms/DocumentWorkflowTimeline";
import BRDGenerationSection from "@/components/organisms/BRDGenerationSection";
import PRDGenerationSection from "@/components/organisms/PRDGenerationSection";
import TasksGenerationSection from "@/components/organisms/TasksGenerationSection";
import { BRDStatus } from "@/components/molecules/BRDStatusIndicator";
import { PRDStatus } from "@/components/molecules/PRDStatusIndicator";
import { TasksStatus } from "@/components/molecules/TasksStatusIndicator";

export default function DocumentWorkflowPage() {
  // State to track the status of each document
  const [brdStatus, setBrdStatus] = useState<BRDStatus>("pending");
  const [prdStatus, setPrdStatus] = useState<PRDStatus>("pending");
  const [tasksStatus, setTasksStatus] = useState<TasksStatus>("pending");

  // Handlers for BRD generation
  const handleGenerateBRD = async (): Promise<void> => {
    // This would contain the actual BRD generation logic in a real implementation
    console.log("Generating BRD...");
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay

    // This is just to update our parent state
    setBrdStatus("completed");
    return Promise.resolve();
  };

  // Handler for PRD generation
  const handleGeneratePRD = async (): Promise<void> => {
    console.log("Generating PRD...");
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay

    // Update the parent state
    setPrdStatus("completed");
    return Promise.resolve();
  };

  // Handler for Tasks generation
  const handleGenerateTasks = async (): Promise<void> => {
    console.log("Generating Tasks...");
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay

    // Update the parent state
    setTasksStatus("completed");
    return Promise.resolve();
  };

  // Monitor the child component states
  useEffect(() => {
    console.log(
      `Status updated: BRD=${brdStatus}, PRD=${prdStatus}, Tasks=${tasksStatus}`,
    );
  }, [brdStatus, prdStatus, tasksStatus]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold mb-8 text-stone-800 dark:text-amber-50">
        Document Workflow
      </h1>

      {/* Timeline visualization */}
      <div className="mb-10">
        <DocumentWorkflowTimeline
          brdStatus={brdStatus}
          prdStatus={prdStatus}
          tasksStatus={tasksStatus}
        />
      </div>

      {/* Document generation sections */}
      <div className="space-y-8">
        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg shadow-sm border border-amber-200 dark:border-stone-700">
          <BRDGenerationSection
            initialStatus={brdStatus}
            onGenerateBRD={handleGenerateBRD}
          />
        </div>

        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg shadow-sm border border-amber-200 dark:border-stone-700">
          <PRDGenerationSection
            initialStatus={prdStatus}
            onGeneratePRD={handleGeneratePRD}
          />
        </div>

        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg shadow-sm border border-amber-200 dark:border-stone-700">
          <TasksGenerationSection
            initialStatus={tasksStatus}
            onGenerateTasks={handleGenerateTasks}
          />
        </div>
      </div>
    </div>
  );
}
