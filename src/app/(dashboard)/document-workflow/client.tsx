"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DocumentWorkflowTimeline from "@/components/organisms/DocumentWorkflowTimeline";
import { Button } from "@/components/Button";
import { api } from "@/lib/trpc/react";
import { toast } from "react-toastify";
import { BRDStatus } from "@/components/molecules/BRDStatusIndicator";
import { PRDStatus } from "@/components/molecules/PRDStatusIndicator";
import { TasksStatus } from "@/components/molecules/TasksStatusIndicator";

// Internal status type with more granular states
type InternalStatus = "pending" | "generating" | "completed" | "error";

export default function DocumentWorkflowClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId") || "";
  const projectPath = searchParams.get("projectPath") || "";

  // State to track the internal status of each document
  const [internalBrdStatus, setInternalBrdStatus] =
    useState<InternalStatus>("pending");
  const [internalPrdStatus, setInternalPrdStatus] =
    useState<InternalStatus>("pending");
  const [internalTasksStatus, setInternalTasksStatus] =
    useState<InternalStatus>("pending");

  // Document content state
  const [brdContent, setBrdContent] = useState<string | null>(null);
  const [prdContent, setPrdContent] = useState<string | null>(null);
  const [tasksContent, setTasksContent] = useState<string | null>(null);

  // Preview state
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Map internal status to component status
  const mapToComponentStatus = (
    status: InternalStatus,
  ): "pending" | "in-progress" | "completed" => {
    switch (status) {
      case "generating":
        return "in-progress";
      case "completed":
        return "completed";
      case "error":
        return "pending"; // Fall back to pending for error state
      default:
        return "pending";
    }
  };

  // Computed statuses for the timeline component
  const brdStatus: BRDStatus = mapToComponentStatus(internalBrdStatus);
  const prdStatus: PRDStatus = mapToComponentStatus(internalPrdStatus);
  const tasksStatus: TasksStatus = mapToComponentStatus(internalTasksStatus);

  // Validate project parameters
  useEffect(() => {
    if (!projectId || !projectPath) {
      toast.error(
        "Missing project information. Please create a project first.",
      );
      router.push("/new-project");
    }
  }, [projectId, projectPath, router]);

  // Get project details
  const { data: projectData } = api.project.getProject.useQuery(
    { projectPath },
    { enabled: !!projectPath },
  );

  // BRD generation mutation
  const generateBRD = api.document.generateBRD.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setInternalBrdStatus("completed");
        setBrdContent(data.brdContent || null);
        toast.success("Business Requirements Document generated!");
      } else {
        setInternalBrdStatus("error");
        toast.error(`Failed to generate BRD: ${data.error}`);
      }
    },
    onError: (error) => {
      setInternalBrdStatus("error");
      toast.error(`Error generating BRD: ${error.message}`);
    },
  });

  // PRD generation mutation
  const generatePRD = api.document.generatePRD.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setInternalPrdStatus("completed");
        setPrdContent(data.prdContent || null);
        toast.success("Product Requirements Document generated!");
      } else {
        setInternalPrdStatus("error");
        toast.error(`Failed to generate PRD: ${data.error}`);
      }
    },
    onError: (error) => {
      setInternalPrdStatus("error");
      toast.error(`Error generating PRD: ${error.message}`);
    },
  });

  // Tasks generation mutation
  const generateTasks = api.document.generateTasks.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setInternalTasksStatus("completed");
        setTasksContent(data.taskContent || null);
        toast.success("Task list generated!");
      } else {
        setInternalTasksStatus("error");
        toast.error(`Failed to generate tasks: ${data.error}`);
      }
    },
    onError: (error) => {
      setInternalTasksStatus("error");
      toast.error(`Error generating tasks: ${error.message}`);
    },
  });

  // Handler for BRD generation
  const handleGenerateBRD = async () => {
    if (!projectId || !projectPath) return;

    setInternalBrdStatus("generating");

    generateBRD.mutate({
      projectId,
      projectPath,
      appDescription: projectData?.project?.description || "",
    });
  };

  // Handler for PRD generation
  const handleGeneratePRD = async () => {
    if (!projectId || !projectPath || !brdContent) return;

    setInternalPrdStatus("generating");

    generatePRD.mutate({
      projectId,
      projectPath,
      brdContent,
    });
  };

  // Handler for Tasks generation
  const handleGenerateTasks = async () => {
    if (!projectId || !projectPath || !prdContent) return;

    setInternalTasksStatus("generating");

    generateTasks.mutate({
      projectId,
      projectPath,
      prdContent,
    });
  };

  // Handler for document preview
  const handlePreviewDocument = (content: string | null, title: string) => {
    if (!content) return;

    setPreviewContent(content);
    setPreviewTitle(title);
    setShowPreview(true);
  };

  // Close preview
  const handleClosePreview = () => {
    setShowPreview(false);
  };

  // Determine if PRD generation should be enabled
  const isPRDGenerationEnabled =
    internalBrdStatus === "completed" && brdContent;

  // Determine if Tasks generation should be enabled
  const isTasksGenerationEnabled =
    internalPrdStatus === "completed" && prdContent;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold mb-8 text-stone-800 dark:text-amber-50">
        Document Workflow
      </h1>

      {/* Project info */}
      {projectData?.success && (
        <div className="mb-6 p-4 bg-amber-50/50 dark:bg-stone-800/50 rounded-md border border-amber-200 dark:border-stone-700">
          <h2 className="text-lg font-semibold">{projectData.project.name}</h2>
          <p className="text-sm text-stone-600 dark:text-amber-300">
            {projectData.project.description}
          </p>
        </div>
      )}

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
        {/* BRD Section */}
        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg shadow-sm border border-amber-200 dark:border-stone-700">
          <h2 className="text-xl font-medium mb-4 text-stone-800 dark:text-amber-100">
            Business Requirements Document
          </h2>

          <p className="mb-4 text-stone-600 dark:text-amber-200 text-sm">
            Generate a comprehensive business requirements document based on
            your project description.
          </p>

          <div className="flex space-x-3">
            <Button
              onClick={handleGenerateBRD}
              className={`${
                internalBrdStatus === "generating"
                  ? "opacity-70 cursor-wait"
                  : ""
              }`}
            >
              {internalBrdStatus === "pending" && "Generate BRD"}
              {internalBrdStatus === "generating" && "Generating..."}
              {internalBrdStatus === "completed" && "Regenerate BRD"}
              {internalBrdStatus === "error" && "Retry BRD"}
            </Button>

            {internalBrdStatus === "completed" && (
              <Button
                onClick={() =>
                  handlePreviewDocument(
                    brdContent,
                    "Business Requirements Document",
                  )
                }
                className="bg-amber-100 dark:bg-stone-700 text-stone-800 dark:text-amber-100 hover:bg-amber-200 dark:hover:bg-stone-600"
              >
                Preview BRD
              </Button>
            )}
          </div>
        </div>

        {/* PRD Section */}
        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg shadow-sm border border-amber-200 dark:border-stone-700">
          <h2 className="text-xl font-medium mb-4 text-stone-800 dark:text-amber-100">
            Product Requirements Document
          </h2>

          <p className="mb-4 text-stone-600 dark:text-amber-200 text-sm">
            Create a detailed product requirements document based on the
            business requirements.
          </p>

          <div className="flex space-x-3">
            <Button
              onClick={handleGeneratePRD}
              className={`${
                !isPRDGenerationEnabled || internalPrdStatus === "generating"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {internalPrdStatus === "pending" && "Generate PRD"}
              {internalPrdStatus === "generating" && "Generating..."}
              {internalPrdStatus === "completed" && "Regenerate PRD"}
              {internalPrdStatus === "error" && "Retry PRD"}
            </Button>

            {internalPrdStatus === "completed" && (
              <Button
                onClick={() =>
                  handlePreviewDocument(
                    prdContent,
                    "Product Requirements Document",
                  )
                }
                className="bg-amber-100 dark:bg-stone-700 text-stone-800 dark:text-amber-100 hover:bg-amber-200 dark:hover:bg-stone-600"
              >
                Preview PRD
              </Button>
            )}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg shadow-sm border border-amber-200 dark:border-stone-700">
          <h2 className="text-xl font-medium mb-4 text-stone-800 dark:text-amber-100">
            Task List
          </h2>

          <p className="mb-4 text-stone-600 dark:text-amber-200 text-sm">
            Generate a detailed task list from the product requirements
            document.
          </p>

          <div className="flex space-x-3">
            <Button
              onClick={handleGenerateTasks}
              className={`${
                !isTasksGenerationEnabled ||
                internalTasksStatus === "generating"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {internalTasksStatus === "pending" && "Generate Tasks"}
              {internalTasksStatus === "generating" && "Generating..."}
              {internalTasksStatus === "completed" && "Regenerate Tasks"}
              {internalTasksStatus === "error" && "Retry Tasks"}
            </Button>

            {internalTasksStatus === "completed" && (
              <Button
                onClick={() => handlePreviewDocument(tasksContent, "Task List")}
                className="bg-amber-100 dark:bg-stone-700 text-stone-800 dark:text-amber-100 hover:bg-amber-200 dark:hover:bg-stone-600"
              >
                Preview Tasks
              </Button>
            )}
          </div>
        </div>

        {/* Next steps */}
        {internalTasksStatus === "completed" && (
          <div className="mt-8 pt-6 border-t border-amber-200 dark:border-stone-700 flex justify-end">
            <Button
              onClick={() =>
                router.push(
                  `/dashboard?projectId=${projectId}&projectPath=${encodeURIComponent(
                    projectPath,
                  )}`,
                )
              }
            >
              Go to Project Dashboard
            </Button>
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      {showPreview && previewContent && previewTitle && (
        <div className="fixed inset-0 bg-stone-900/80 flex items-center justify-center z-50 p-4">
          <div className="bg-amber-50 dark:bg-stone-800 rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-amber-200 dark:border-stone-700 flex justify-between items-center">
              <h3 className="text-xl font-medium text-stone-800 dark:text-amber-100">
                {previewTitle}
              </h3>
              <button
                onClick={handleClosePreview}
                className="text-stone-500 hover:text-stone-700 dark:text-amber-300 dark:hover:text-amber-100"
              >
                Close
              </button>
            </div>
            <div className="p-6 overflow-y-auto prose dark:prose-invert prose-stone max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: previewContent.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
