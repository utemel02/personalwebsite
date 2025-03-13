"use client";

import React, { useState } from "react";
import { InputText } from "../atoms/InputText";
import { TextareaDescription } from "../atoms/TextareaDescription";
import { Button } from "../Button";

interface ProjectDetailsFormProps {
  onSubmit: (data: ProjectDetails) => void;
  initialData?: ProjectDetails;
}

export interface ProjectDetails {
  projectName: string;
  folderPath: string;
  description: string;
}

export const ProjectDetailsForm: React.FC<ProjectDetailsFormProps> = ({
  onSubmit,
  initialData = {
    projectName: "",
    folderPath: "",
    description: "",
  },
}) => {
  const [formData, setFormData] = useState<ProjectDetails>(initialData);
  const [errors, setErrors] = useState<Partial<ProjectDetails>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof ProjectDetails]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProjectDetails> = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }

    if (!formData.folderPath.trim()) {
      newErrors.folderPath = "Folder path is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputText
        label="Project Name"
        placeholder="Enter project name"
        value={formData.projectName}
        onChange={handleChange}
        name="projectName"
        error={errors.projectName}
        required
      />

      <InputText
        label="Local Folder Path"
        placeholder="Enter folder path (e.g., ~/projects/my-project)"
        value={formData.folderPath}
        onChange={handleChange}
        name="folderPath"
        error={errors.folderPath}
        required
      />

      <TextareaDescription
        label="Project Description"
        placeholder="Enter a brief description of your project"
        value={formData.description}
        onChange={handleChange}
        name="description"
        rows={5}
      />

      <div className="flex justify-end pt-4">
        <Button variant="primary" size="md" onClick={() => handleSubmit()}>
          Save & Continue
        </Button>
      </div>
    </form>
  );
};

export default ProjectDetailsForm;
