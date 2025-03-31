"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import InputText from "@/components/atoms/InputText";
import TextareaDescription from "@/components/atoms/TextareaDescription";
import DirectoryPicker from "@/components/atoms/DirectoryPicker";
import RepositoryCloneOption from "@/components/molecules/RepositoryCloneOption";
import { Button } from "@/components/Button";
import { api } from "@/lib/trpc/react";
import { toast } from "react-toastify";

export default function NewProjectPage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [projectPath, setProjectPath] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isRepositoryCloned, setIsRepositoryCloned] = useState(false);

  // Create project mutation
  const createProject = api.project.createProject.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Project created successfully!");
        // Redirect to document workflow page with project ID and path
        router.push(
          `/document-workflow?projectId=${
            data.projectId || ""
          }&projectPath=${encodeURIComponent(data.projectPath || "")}`,
        );
      } else {
        toast.error(`Failed to create project: ${data.error}`);
      }
    },
    onError: (error) => {
      toast.error(`Error creating project: ${error.message}`);
    },
  });

  const handleCreateProject = async () => {
    // Create the project first
    createProject.mutate({
      projectName,
      projectDescription,
      projectPath,
    });
  };

  // Handle repository cloned event
  const handleRepositoryCloned = () => {
    setIsRepositoryCloned(true);
    toast.success("Repository cloned successfully!");
  };

  // Check if form is complete to enable the button
  const isFormComplete = !!(projectName && projectPath && projectDescription);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-stone-800 dark:text-amber-50 mb-8">
        Create New Project
      </h1>

      <div className="space-y-6">
        <InputText
          label="Project Name"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          name="projectName"
        />

        <DirectoryPicker
          label="Project Location"
          value={projectPath}
          onChange={setProjectPath}
          name="projectPath"
        />

        <TextareaDescription
          label="Describe your app idea"
          placeholder="Provide a detailed description of your application idea..."
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          name="projectDescription"
          rows={6}
        />

        {projectPath && (
          <RepositoryCloneOption
            projectPath={projectPath}
            onRepositoryCloned={handleRepositoryCloned}
          />
        )}

        <div className="pt-4">
          <Button
            onClick={handleCreateProject}
            className={!isFormComplete ? "opacity-50 cursor-not-allowed" : ""}
          >
            {createProject.isPending
              ? "Creating Project..."
              : "Create Project & Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
