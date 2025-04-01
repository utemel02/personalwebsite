"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputText from "@/components/atoms/InputText";
import TextareaDescription from "@/components/atoms/TextareaDescription";
import DirectoryPicker from "@/components/atoms/DirectoryPicker";
import RepositoryCloneOption from "@/components/molecules/RepositoryCloneOption";
import { Button } from "@/components/Button";
import { api } from "@/lib/trpc/react";
import { toast } from "react-toastify";
import { sanitizeFileName, joinPaths } from "@/lib/utils/shared";
import path from "path";

export default function NewProjectPage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [baseDirectory, setBaseDirectory] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isRepositoryCloned, setIsRepositoryCloned] = useState(false);
  const [sanitizedName, setSanitizedName] = useState("");
  const [fullProjectPath, setFullProjectPath] = useState("");

  // Update sanitized name and full project path when inputs change
  useEffect(() => {
    if (projectName) {
      const sanitized = sanitizeFileName(projectName);
      setSanitizedName(sanitized);

      if (baseDirectory) {
        setFullProjectPath(path.join(baseDirectory, sanitized));
      }
    } else {
      setSanitizedName("");
      setFullProjectPath(baseDirectory);
    }
  }, [projectName, baseDirectory]);

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
      projectPath: fullProjectPath,
    });
  };

  // Handle repository cloned event
  const handleRepositoryCloned = () => {
    setIsRepositoryCloned(true);
    toast.success("Repository cloned successfully!");
  };

  // Check if form is complete to enable the button
  const isFormComplete = !!(
    projectName &&
    baseDirectory &&
    projectDescription &&
    sanitizedName
  );

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

        {projectName && sanitizedName && (
          <div className="px-3 py-2 rounded bg-amber-50/50 dark:bg-stone-800/50 text-sm text-stone-600 dark:text-amber-200 border border-amber-200 dark:border-stone-700">
            <p>
              <span className="font-medium">Directory name:</span>{" "}
              {sanitizedName}
            </p>
            {fullProjectPath && (
              <p className="mt-1">
                <span className="font-medium">Full path:</span>{" "}
                {fullProjectPath}
              </p>
            )}
          </div>
        )}

        <DirectoryPicker
          label="Select Parent Directory"
          value={baseDirectory}
          onChange={setBaseDirectory}
          name="baseDirectory"
        />

        <TextareaDescription
          label="Describe your app idea"
          placeholder="Provide a detailed description of your application idea..."
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          name="projectDescription"
          rows={6}
        />

        {baseDirectory && projectName && sanitizedName && (
          <RepositoryCloneOption
            baseDirectory={baseDirectory}
            projectName={sanitizedName}
            fullProjectPath={fullProjectPath}
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
